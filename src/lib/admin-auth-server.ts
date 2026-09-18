import { createServerFn } from "@tanstack/react-start";
import {
  type StoredAdminAuth,
  type ResetTokenSession,
  PERMANENT_RECOVERY_SALT,
  PERMANENT_RECOVERY_HASH,
  getRegisteredAdminEmail,
  getDefaultAdminKey,
  maskEmail,
  hashPassword,
  readStoredAuth,
  writeStoredAuth,
  verifyAdminKey,
  verifyRecoveryCode,
  executeVerifyRecoveryCode,
  executeAdminPasswordReset,
} from "./admin-auth-store";

export type { StoredAdminAuth, ResetTokenSession };
export {
  PERMANENT_RECOVERY_SALT,
  PERMANENT_RECOVERY_HASH,
  getRegisteredAdminEmail,
  getDefaultAdminKey,
  maskEmail,
  hashPassword,
  readStoredAuth,
  writeStoredAuth,
  verifyAdminKey,
  verifyRecoveryCode,
  executeVerifyRecoveryCode,
  executeAdminPasswordReset,
};

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
    const result = await executeVerifyRecoveryCode(data.recoveryCode);
    if (!result.success || !result.resetToken) {
      throw new Error(
        result.error || "Invalid Recovery Code. Please check the code and try again.",
      );
    }

    return {
      success: true,
      resetToken: result.resetToken,
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

    return { resetToken, newPassword, confirmPassword };
  })
  .handler(async ({ data }): Promise<{ success: boolean; message: string }> => {
    const result = await executeAdminPasswordReset(
      data.resetToken,
      data.newPassword,
      data.confirmPassword,
    );
    if (!result.success || !result.message) {
      throw new Error(result.error || "Failed to reset password.");
    }

    return {
      success: true,
      message: result.message,
    };
  });
