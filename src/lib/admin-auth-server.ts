import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import * as crypto from "node:crypto";

interface StoredAdminAuth {
  passwordHash: string;
  salt: string;
  iterations: number;
  updatedAt: string;
  changedVia: string;
}

interface ResetTokenSession {
  expiresAt: number;
}

// In-memory active reset token sessions
const activeResetTokens = new Map<string, ResetTokenSession>();

/**
 * Permanent Fixed Salt and PBKDF2-SHA512 Hash for the Admin Recovery Code:
 * Code: PDFLY-ADMIN-8472-X9K6
 * Permanent, reusable indefinitely, never expires across password resets.
 */
const PERMANENT_RECOVERY_SALT = "pdfly_fixed_recovery_salt_2026_s8472x9k6";
const PERMANENT_RECOVERY_HASH =
  "908ff98e2639c4960009ed3a55249a1cc543806b7a46d41730a0dc3596c2e4b2a2dfc606b3aad0f8c25b83593fc7d06ebc35e4d2e6e57cf50b553e0ded7861d9";

function getDataDir(): string {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "pdfly-data");
  }
  return path.join(process.cwd(), "data");
}

function getAuthFilePath(): string {
  return path.join(getDataDir(), "admin-auth.json");
}

/**
 * Returns registered owner/admin Gmail address.
 * Defaults to krunalnikam021@gmail.com as established in PDFly repository.
 */
export function getRegisteredAdminEmail(): string {
  const envEmail =
    process.env.ADMIN_EMAIL ||
    process.env.FEEDBACK_OWNER_EMAIL ||
    process.env.OWNER_NOTIFICATION_EMAIL;
  return (envEmail?.trim() || "krunalnikam021@gmail.com").toLowerCase();
}

/**
 * Fallback admin key from environment or default repository passkey.
 */
function getDefaultAdminKey(): string {
  return process.env.FEEDBACK_ADMIN_KEY?.trim() || "Krunal21128q";
}

/**
 * Helper to mask email for security: e.g. k***@gmail.com
 */
function maskEmail(email: string): string {
  const parts = email.split("@");
  if (parts.length !== 2) return "k***@gmail.com";
  const name = parts[0] || "";
  const domain = parts[1] || "";
  const visible = name.length > 2 ? name.substring(0, 2) : name.substring(0, 1);
  return `${visible}***@${domain}`;
}

/**
 * Hash password with PBKDF2 using SHA-512 and 100,000 iterations.
 */
function hashPassword(password: string, salt: string, iterations = 100000): string {
  return crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
}

/**
 * Read stored custom admin credentials from persistent JSON file if present.
 */
async function readStoredAuth(): Promise<StoredAdminAuth | null> {
  const primaryFile = getAuthFilePath();
  try {
    const content = await fs.readFile(primaryFile, "utf-8");
    const parsed = JSON.parse(content) as StoredAdminAuth;
    if (parsed && parsed.passwordHash && parsed.salt) {
      return parsed;
    }
  } catch {
    // Check fallback in cwd data folder
    const seedFile = path.join(process.cwd(), "data", "admin-auth.json");
    try {
      const content = await fs.readFile(seedFile, "utf-8");
      const parsed = JSON.parse(content) as StoredAdminAuth;
      if (parsed && parsed.passwordHash && parsed.salt) {
        return parsed;
      }
    } catch {
      // Not yet set
    }
  }
  return null;
}

/**
 * Save new hashed admin credentials securely.
 */
async function writeStoredAuth(auth: StoredAdminAuth): Promise<void> {
  const dir = getDataDir();
  const filePath = getAuthFilePath();

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(auth, null, 2), "utf-8");
  } catch (err) {
    const tmpDir = path.join(os.tmpdir(), "pdfly-data");
    if (dir !== tmpDir) {
      await fs.mkdir(tmpDir, { recursive: true });
      await fs.writeFile(
        path.join(tmpDir, "admin-auth.json"),
        JSON.stringify(auth, null, 2),
        "utf-8",
      );
    } else {
      console.error("Failed to write admin auth file:", err);
      throw err;
    }
  }

  // Also sync to cwd/data if writable
  try {
    const cwdDataDir = path.join(process.cwd(), "data");
    await fs.mkdir(cwdDataDir, { recursive: true });
    await fs.writeFile(
      path.join(cwdDataDir, "admin-auth.json"),
      JSON.stringify(auth, null, 2),
      "utf-8",
    );
  } catch {
    // non-fatal
  }
}

/**
 * Verify whether a provided admin passkey/password is correct.
 * Checks against custom hashed password if configured, or default env passkey.
 */
export async function verifyAdminKey(providedKey: string): Promise<boolean> {
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

  // If no password reset has occurred yet, verify against default key
  const defaultKey = getDefaultAdminKey();
  return trimmed === defaultKey;
}

/**
 * Server Function: Verify Admin Passkey
 */
export const verifyAdminKeyServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { adminKey?: string };
    return {
      adminKey: String(d?.adminKey || "").trim(),
    };
  })
  .handler(async ({ data }): Promise<{ authorized: boolean }> => {
    const isAuthorized = await verifyAdminKey(data.adminKey);
    return {
      authorized: isAuthorized,
    };
  });

/**
 * Validates the permanent Admin Recovery Code server-side.
 * Never exposes the code or hash to the frontend.
 */
export function verifyRecoveryCode(candidate: string): boolean {
  if (!candidate || typeof candidate !== "string") return false;
  const normalized = candidate.trim().toUpperCase();
  if (!normalized) return false;

  // 1. Check optional environment variable override if provided
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

  // 2. Validate against permanent PBKDF2-SHA512 hash
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

/**
 * Server Function: Verify Admin Recovery Code
 * Step 1: Validates the permanent recovery code and issues a short-lived reset token.
 */
export const verifyAdminRecoveryCodeServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid request payload");
    }
    const d = data as { recoveryCode?: string };
    const recoveryCode = String(d?.recoveryCode || "").trim();

    if (!recoveryCode) {
      throw new Error("Please enter your Admin Recovery Code.");
    }
    return { recoveryCode };
  })
  .handler(async ({ data }): Promise<{ success: boolean; resetToken: string }> => {
    const isValid = verifyRecoveryCode(data.recoveryCode);
    if (!isValid) {
      throw new Error("Invalid Recovery Code. Please check the code and try again.");
    }

    const now = Date.now();
    const resetToken = crypto.randomBytes(32).toString("hex");
    activeResetTokens.set(resetToken, {
      expiresAt: now + 15 * 60 * 1000, // 15 minutes to enter new password
    });

    return {
      success: true,
      resetToken,
    };
  });

/**
 * Server Function: Reset Admin Password
 * Step 2: Validates reset token and password requirements, hashes password with salt, updates credentials.
 */
export const resetAdminPasswordServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid request payload");
    }
    const d = data as { resetToken?: string; newPassword?: string; confirmPassword?: string };
    const resetToken = String(d?.resetToken || "").trim();
    const newPassword = String(d?.newPassword || "");
    const confirmPassword = String(d?.confirmPassword || "");

    if (!resetToken) {
      throw new Error("Invalid or missing reset session. Please re-enter your Recovery Code.");
    }
    if (!newPassword) {
      throw new Error("New password cannot be empty.");
    }
    if (newPassword !== confirmPassword) {
      throw new Error("Passwords do not match.");
    }

    return { resetToken, newPassword, confirmPassword };
  })
  .handler(async ({ data }): Promise<{ success: boolean; message: string }> => {
    const tokenSession = activeResetTokens.get(data.resetToken);
    const now = Date.now();

    if (!tokenSession || now > tokenSession.expiresAt) {
      if (tokenSession) activeResetTokens.delete(data.resetToken);
      throw new Error("Your reset session has expired. Please re-enter your Recovery Code.");
    }

    // Validate secure password requirements
    if (data.newPassword.length < 8) {
      throw new Error("Password must be at least 8 characters long.");
    }
    const hasLetter = /[a-zA-Z]/.test(data.newPassword);
    const hasNumber = /[0-9]/.test(data.newPassword);
    if (!hasLetter || !hasNumber) {
      throw new Error("Password must contain at least one letter and one number.");
    }

    // Generate salt and PBKDF2 hash
    const salt = crypto.randomBytes(16).toString("hex");
    const iterations = 100000;
    const passwordHash = hashPassword(data.newPassword, salt, iterations);

    const storedAuth: StoredAdminAuth = {
      passwordHash,
      salt,
      iterations,
      updatedAt: new Date().toISOString(),
      changedVia: "recovery_code",
    };

    await writeStoredAuth(storedAuth);

    // Invalidate reset token immediately
    activeResetTokens.delete(data.resetToken);

    return {
      success: true,
      message: "Password changed successfully.",
    };
  });
