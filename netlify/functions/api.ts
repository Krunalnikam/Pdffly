import * as crypto from "node:crypto";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";

// CORS Headers
const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept",
  "Content-Type": "application/json; charset=utf-8",
};

// Permanent Fixed Salt and PBKDF2-SHA512 Hash for the Admin Recovery Code:
// Code: PDFLY-ADMIN-8472-X9K6
const PERMANENT_RECOVERY_SALT = "pdfly_fixed_recovery_salt_2026_s8472x9k6";
const PERMANENT_RECOVERY_HASH =
  "908ff98e2639c4960009ed3a55249a1cc543806b7a46d41730a0dc3596c2e4b2a2dfc606b3aad0f8c25b83593fc7d06ebc35e4d2e6e57cf50b553e0ded7861d9";

// Active in-memory reset sessions
const activeResetTokens = new Map<string, { expiresAt: number }>();

function getDataDir(): string {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "pdfly-data");
  }
  return path.join(process.cwd(), "data");
}

function getAuthFilePath(): string {
  return path.join(getDataDir(), "admin-auth.json");
}

interface StoredAdminAuth {
  passwordHash: string;
  salt: string;
  iterations: number;
  updatedAt: string;
  changedVia: string;
}

function hashPassword(password: string, salt: string, iterations = 100000): string {
  return crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
}

async function readStoredAuth(): Promise<StoredAdminAuth | null> {
  const primaryPath = getAuthFilePath();
  try {
    const raw = await fs.readFile(primaryPath, "utf-8");
    return JSON.parse(raw) as StoredAdminAuth;
  } catch {
    const repoPath = path.join(process.cwd(), "data", "admin-auth.json");
    try {
      const raw = await fs.readFile(repoPath, "utf-8");
      return JSON.parse(raw) as StoredAdminAuth;
    } catch {
      return null;
    }
  }
}

async function writeStoredAuth(auth: StoredAdminAuth): Promise<void> {
  const dir = getDataDir();
  const filePath = getAuthFilePath();
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(auth, null, 2), "utf-8");
  } catch (err) {
    const tmpDir = path.join(os.tmpdir(), "pdfly-data");
    await fs.mkdir(tmpDir, { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "admin-auth.json"),
      JSON.stringify(auth, null, 2),
      "utf-8",
    );
  }
}

function verifyRecoveryCode(candidate: string): boolean {
  if (!candidate || typeof candidate !== "string") return false;
  const normalized = candidate.trim().toUpperCase();
  if (!normalized) return false;

  if (process.env.ADMIN_RECOVERY_CODE) {
    const envNormalized = process.env.ADMIN_RECOVERY_CODE.trim().toUpperCase();
    try {
      const a = Buffer.from(normalized);
      const b = Buffer.from(envNormalized);
      if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
        return true;
      }
    } catch {
      // ignore
    }
  }

  try {
    const candidateHash = crypto
      .pbkdf2Sync(normalized, PERMANENT_RECOVERY_SALT, 100000, 64, "sha512")
      .toString("hex");
    const a = Buffer.from(candidateHash, "hex");
    const b = Buffer.from(PERMANENT_RECOVERY_HASH, "hex");
    return a.length === b.length && crypto.timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

async function verifyAdminKey(providedKey: string): Promise<boolean> {
  if (!providedKey || typeof providedKey !== "string") return false;
  const trimmed = providedKey.trim();
  if (!trimmed) return false;

  const customAuth = await readStoredAuth();
  if (customAuth) {
    const computedHash = hashPassword(trimmed, customAuth.salt, customAuth.iterations || 100000);
    try {
      const a = Buffer.from(computedHash, "hex");
      const b = Buffer.from(customAuth.passwordHash, "hex");
      if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
        return true;
      }
    } catch {
      return false;
    }
    return false;
  }

  const defaultKey = process.env.FEEDBACK_ADMIN_KEY?.trim() || "Krunal21128q";
  return trimmed === defaultKey;
}

interface ApiResponse {
  statusCode: number;
  body: string;
  headers: Record<string, string>;
}

async function processRequest(
  httpMethod: string,
  pathname: string,
  bodyString?: string | null,
): Promise<ApiResponse> {
  // Normalize path
  const cleanPath = pathname
    .replace(/^\/\.netlify\/functions\/api/, "")
    .replace(/^\/api/, "")
    .replace(/\/$/, "");

  if (httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  let body: Record<string, unknown> = {};
  if (bodyString) {
    try {
      body = JSON.parse(bodyString);
    } catch {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: "Invalid JSON payload" }),
      };
    }
  }

  // 1. POST /admin/verify-recovery-code
  if (cleanPath === "/admin/verify-recovery-code" || cleanPath.endsWith("/verify-recovery-code")) {
    if (httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: "Method not allowed. Use POST." }),
      };
    }

    const code = String(body.recoveryCode || "").trim();
    if (!code) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: "Please enter your Admin Recovery Code.",
        }),
      };
    }

    const isValid = verifyRecoveryCode(code);
    if (!isValid) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: "Invalid Recovery Code. Please check the code and try again.",
        }),
      };
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    activeResetTokens.set(resetToken, {
      expiresAt: Date.now() + 15 * 60 * 1000,
    });

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        resetToken,
      }),
    };
  }

  // 2. POST /admin/reset-password
  if (cleanPath === "/admin/reset-password" || cleanPath.endsWith("/reset-password")) {
    if (httpMethod !== "POST") {
      return {
        statusCode: 405,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: "Method not allowed. Use POST." }),
      };
    }

    const resetToken = String(body.resetToken || "").trim();
    const newPassword = String(body.newPassword || "");
    const confirmPassword = String(body.confirmPassword || "");

    if (!resetToken) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: "Invalid or missing reset session. Please re-enter your Recovery Code.",
        }),
      };
    }

    const session = activeResetTokens.get(resetToken);
    const now = Date.now();
    if (!session || now > session.expiresAt) {
      if (session) activeResetTokens.delete(resetToken);
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: "Your reset session has expired. Please re-enter your Recovery Code.",
        }),
      };
    }

    if (!newPassword) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: "New password cannot be empty." }),
      };
    }

    if (newPassword !== confirmPassword) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ success: false, error: "Passwords do not match." }),
      };
    }

    if (newPassword.length < 8) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: "Password must be at least 8 characters long.",
        }),
      };
    }

    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    if (!hasLetter || !hasNumber) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: "Password must contain at least one letter and one number.",
        }),
      };
    }

    const salt = crypto.randomBytes(16).toString("hex");
    const iterations = 100000;
    const passwordHash = hashPassword(newPassword, salt, iterations);

    const storedAuth: StoredAdminAuth = {
      passwordHash,
      salt,
      iterations,
      updatedAt: new Date().toISOString(),
      changedVia: "recovery_code",
    };

    await writeStoredAuth(storedAuth);
    activeResetTokens.delete(resetToken);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        message: "Password changed successfully.",
      }),
    };
  }

  // 3. POST /admin/verify-key
  if (cleanPath === "/admin/verify-key" || cleanPath.endsWith("/verify-key")) {
    const adminKey = String(body.adminKey || "").trim();
    const authorized = await verifyAdminKey(adminKey);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        authorized,
      }),
    };
  }

  // Fallback for unhandled API routes — ALWAYS JSON, NEVER HTML!
  return {
    statusCode: 404,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: false,
      error: `API route not found: ${pathname}`,
    }),
  };
}

// Netlify Functions v1 export
export const handler = async (event: {
  httpMethod: string;
  path: string;
  body: string | null;
}): Promise<ApiResponse> => {
  try {
    return await processRequest(event.httpMethod, event.path, event.body);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: msg }),
    };
  }
};

// Netlify Functions v2 default export (Web standard Request / Response)
export default async function (request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const bodyText =
      request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS"
        ? await request.text()
        : null;

    const res = await processRequest(request.method, url.pathname, bodyText);
    return new Response(res.body, {
      status: res.statusCode,
      headers: res.headers,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}
