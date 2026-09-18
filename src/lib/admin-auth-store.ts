import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import * as crypto from "node:crypto";
import { getStore } from "@netlify/blobs";

export interface StoredAdminAuth {
  passwordHash: string;
  salt: string;
  iterations: number;
  updatedAt: string;
  changedVia: string;
}

export interface ResetTokenSession {
  expiresAt: number;
}

/**
 * Permanent Fixed Salt and PBKDF2-SHA512 Hash for the Admin Recovery Code:
 * Code: PDFLY-ADMIN-8472-X9K6
 * Permanent, reusable indefinitely, never expires across password resets.
 */
export const PERMANENT_RECOVERY_SALT = "pdfly_fixed_recovery_salt_2026_s8472x9k6";
export const PERMANENT_RECOVERY_HASH =
  "908ff98e2639c4960009ed3a55249a1cc543806b7a46d41730a0dc3596c2e4b2a2dfc606b3aad0f8c25b83593fc7d06ebc35e4d2e6e57cf50b553e0ded7861d9";

// Active in-memory reset token sessions (valid for 15 minutes during recovery modal flow)
const activeResetTokens = new Map<string, ResetTokenSession>();

// Netlify Blobs store client instance
const BLOB_STORE_NAME = "pdfly-admin-storage";
const BLOB_AUTH_KEY = "admin-auth-credentials";

let cachedBlobStore: ReturnType<typeof getStore> | null = null;
let blobsDisabled = false;

/**
 * Safely obtain the Netlify Blobs store client.
 * Supports auto-detected Netlify environment as well as explicit credentials.
 */
function getAdminBlobStore(): ReturnType<typeof getStore> | null {
  if (blobsDisabled) return null;
  if (!cachedBlobStore) {
    try {
      const siteID = process.env.NETLIFY_SITE_ID || process.env.SITE_ID;
      const token = process.env.NETLIFY_BLOBS_TOKEN || process.env.NETLIFY_AUTH_TOKEN;
      if (siteID && token) {
        cachedBlobStore = getStore({ name: BLOB_STORE_NAME, siteID, token });
      } else {
        cachedBlobStore = getStore({ name: BLOB_STORE_NAME });
      }
    } catch {
      // Blobs not configured (e.g. running in local Vite dev server / preview container)
      cachedBlobStore = null;
      blobsDisabled = true;
    }
  }
  return cachedBlobStore;
}

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
export function getDefaultAdminKey(): string {
  return process.env.FEEDBACK_ADMIN_KEY?.trim() || "Krunal21128q";
}

/**
 * Helper to mask email for security: e.g. k***@gmail.com
 */
export function maskEmail(email: string): string {
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
export function hashPassword(password: string, salt: string, iterations = 100000): string {
  return crypto.pbkdf2Sync(password, salt, iterations, 64, "sha512").toString("hex");
}

/**
 * Read stored custom admin credentials from:
 * 1. Netlify Blobs (persisted across all serverless invocations and deployments)
 * 2. Primary local filesystem path
 * 3. Fallback data folder or /tmp/ cache
 */
export async function readStoredAuth(): Promise<StoredAdminAuth | null> {
  // 1. First priority: Try Netlify Blobs persistent cloud storage
  const store = getAdminBlobStore();
  if (store) {
    try {
      const data = await store.get(BLOB_AUTH_KEY, { type: "json" });
      if (data && typeof data === "object" && (data as StoredAdminAuth).passwordHash) {
        return data as StoredAdminAuth;
      }
    } catch {
      // Blobs unavailable or unconfigured in current environment
    }
  }

  // 2. Second priority: Check local filesystem storage
  const primaryFile = getAuthFilePath();
  try {
    const content = await fs.readFile(primaryFile, "utf-8");
    const parsed = JSON.parse(content) as StoredAdminAuth;
    if (parsed && parsed.passwordHash && parsed.salt) {
      return parsed;
    }
  } catch {
    // continue to fallbacks
  }

  // Fallback in project root data/ directory
  const seedFile = path.join(process.cwd(), "data", "admin-auth.json");
  try {
    const content = await fs.readFile(seedFile, "utf-8");
    const parsed = JSON.parse(content) as StoredAdminAuth;
    if (parsed && parsed.passwordHash && parsed.salt) {
      return parsed;
    }
  } catch {
    // continue
  }

  // Fallback in /tmp/ cache
  try {
    const tmpFile = path.join(os.tmpdir(), "pdfly-data", "admin-auth.json");
    const content = await fs.readFile(tmpFile, "utf-8");
    const parsed = JSON.parse(content) as StoredAdminAuth;
    if (parsed && parsed.passwordHash && parsed.salt) {
      return parsed;
    }
  } catch {
    // none found
  }

  return null;
}

/**
 * Save new hashed admin credentials securely across all environments:
 * 1. Netlify Blobs (durable cloud storage across all Lambda instances)
 * 2. Filesystem primary path
 * 3. /tmp/ cache for fast container reads
 * 4. process.cwd()/data if writable
 */
export async function writeStoredAuth(auth: StoredAdminAuth): Promise<void> {
  // 1. Netlify Blobs cloud persistence
  const store = getAdminBlobStore();
  if (store) {
    try {
      await store.setJSON(BLOB_AUTH_KEY, auth);
      console.log("[AdminAuth] Credentials successfully stored in Netlify Blobs.");
    } catch (blobErr) {
      console.warn("[AdminAuth] Netlify Blobs write warning:", blobErr);
    }
  }

  // 2. Filesystem primary path
  const dir = getDataDir();
  const filePath = getAuthFilePath();
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(auth, null, 2), "utf-8");
  } catch {
    // Will fall through to /tmp
  }

  // 3. Container /tmp/ cache
  try {
    const tmpDir = path.join(os.tmpdir(), "pdfly-data");
    await fs.mkdir(tmpDir, { recursive: true });
    await fs.writeFile(
      path.join(tmpDir, "admin-auth.json"),
      JSON.stringify(auth, null, 2),
      "utf-8",
    );
  } catch {
    // non-fatal
  }

  // 4. Project cwd/data directory (Preview environment persistence)
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
 * Verifies any candidate admin key / password.
 * 1. If custom credentials exist in stored auth, verifies ONLY against custom credentials.
 * 2. If NO custom credentials exist yet, verifies against default passkey (Krunal21128q).
 */
export async function verifyAdminKey(key?: string | null): Promise<boolean> {
  if (!key || typeof key !== "string") {
    return false;
  }
  const candidate = key.trim();
  if (!candidate) {
    return false;
  }

  try {
    const customAuth = await readStoredAuth();
    if (customAuth && customAuth.passwordHash && customAuth.salt) {
      const candidateHash = hashPassword(
        candidate,
        customAuth.salt,
        customAuth.iterations || 100000,
      );
      const bufA = Buffer.from(candidateHash, "hex");
      const bufB = Buffer.from(customAuth.passwordHash, "hex");
      if (bufA.length === bufB.length && crypto.timingSafeEqual(bufA, bufB)) {
        return true;
      }
      return false;
    }
  } catch (err) {
    console.error("Error reading stored admin credentials:", err);
  }

  // Fallback: Default repository passkey if no custom password was set yet
  const defaultKey = getDefaultAdminKey();
  const bufCandidate = Buffer.from(candidate);
  const bufDefault = Buffer.from(defaultKey);
  if (bufCandidate.length !== bufDefault.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufCandidate, bufDefault);
}

/**
 * Validates the permanent admin recovery code: PDFLY-ADMIN-8472-X9K6.
 */
export function verifyRecoveryCode(inputCode?: string | null): boolean {
  if (!inputCode || typeof inputCode !== "string") {
    return false;
  }
  const normalized = inputCode.trim().toUpperCase().replace(/\s+/g, "");
  if (!normalized) {
    return false;
  }

  const computedHash = crypto
    .pbkdf2Sync(normalized, PERMANENT_RECOVERY_SALT, 100000, 64, "sha512")
    .toString("hex");

  const bufA = Buffer.from(computedHash, "hex");
  const bufB = Buffer.from(PERMANENT_RECOVERY_HASH, "hex");

  if (bufA.length !== bufB.length) {
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

/**
 * Execute recovery code verification and generate a temporary reset session token.
 */
export async function executeVerifyRecoveryCode(recoveryCode: string): Promise<{
  success: boolean;
  resetToken?: string;
  registeredEmail?: string;
  error?: string;
}> {
  const isValid = verifyRecoveryCode(recoveryCode);
  if (!isValid) {
    return {
      success: false,
      error: "Invalid Recovery Code. Please check and re-enter your official recovery code.",
    };
  }

  const resetToken = `reset_${crypto.randomBytes(24).toString("hex")}`;
  const expiresAt = Date.now() + 15 * 60 * 1000; // 15 minutes
  activeResetTokens.set(resetToken, { expiresAt });

  const adminEmail = getRegisteredAdminEmail();
  return {
    success: true,
    resetToken,
    registeredEmail: maskEmail(adminEmail),
  };
}

/**
 * Execute password reset using an active reset session token.
 * Persists the new password hash immediately to Netlify Blobs & storage.
 * Supports both object params and positional arguments.
 */
export async function executeAdminPasswordReset(
  arg1:
    | string
    | {
        resetToken: string;
        newPassword?: string;
        confirmPassword?: string;
      },
  arg2?: string,
  arg3?: string,
): Promise<{
  success: boolean;
  message?: string;
  error?: string;
}> {
  let resetToken = "";
  let newPassword = "";
  let confirmPassword = "";

  if (typeof arg1 === "object" && arg1 !== null) {
    resetToken = String(arg1.resetToken || "").trim();
    newPassword = String(arg1.newPassword || "");
    confirmPassword = String(arg1.confirmPassword || "");
  } else {
    resetToken = String(arg1 || "").trim();
    newPassword = String(arg2 || "");
    confirmPassword = String(arg3 || "");
  }

  if (!resetToken) {
    return {
      success: false,
      error: "Reset session token missing. Please re-enter your Recovery Code.",
    };
  }

  const session = activeResetTokens.get(resetToken);
  const now = Date.now();
  if (!session || now > session.expiresAt) {
    if (session) activeResetTokens.delete(resetToken);
    return {
      success: false,
      error: "Your reset session has expired. Please re-enter your Recovery Code.",
    };
  }

  if (!newPassword) {
    return {
      success: false,
      error: "New password cannot be empty.",
    };
  }

  if (newPassword !== confirmPassword) {
    return {
      success: false,
      error: "Passwords do not match.",
    };
  }

  if (newPassword.length < 8) {
    return {
      success: false,
      error: "Password must be at least 8 characters long.",
    };
  }

  const hasLetter = /[a-zA-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  if (!hasLetter || !hasNumber) {
    return {
      success: false,
      error: "Password must contain at least one letter and one number.",
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
    success: true,
    message: "Admin password updated and persisted successfully.",
  };
}
