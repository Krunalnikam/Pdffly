import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  KeyRound,
  ShieldCheck,
  AlertCircle,
  Loader2,
  CheckCircle2,
  Eye,
  EyeOff,
  ArrowRight,
  ArrowLeft,
  Lock,
} from "lucide-react";
import {
  verifyAdminRecoveryCodeServerFn,
  resetAdminPasswordServerFn,
} from "@/lib/admin-auth-server";

interface AdminForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordResetSuccess?: () => void;
}

type ResetStep = "recovery_code" | "new_password" | "success";

export function AdminForgotPasswordModal({
  isOpen,
  onClose,
  onPasswordResetSuccess,
}: AdminForgotPasswordModalProps) {
  const [step, setStep] = useState<ResetStep>("recovery_code");

  // Step 1: Recovery Code
  const [recoveryCodeInput, setRecoveryCodeInput] = useState("");
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [resetToken, setResetToken] = useState("");

  // Step 2: New Password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Error feedback
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Reset states when modal is opened/closed
  useEffect(() => {
    if (isOpen) {
      setStep("recovery_code");
      setRecoveryCodeInput("");
      setNewPassword("");
      setConfirmPassword("");
      setErrorMessage(null);
      setResetToken("");
    }
  }, [isOpen]);

  // Helper to sanitize any error message preventing HTML leakage (such as Netlify 404 HTML)
  const sanitizeErrorMessage = (err: unknown, fallback: string): string => {
    if (!err) return fallback;
    const msg = err instanceof Error ? err.message : String(err);
    if (
      msg.includes("<!DOCTYPE") ||
      msg.includes("<html") ||
      msg.includes("Page not found") ||
      msg.includes("<body")
    ) {
      return "Unable to connect to the authentication service. Please check your network and try again.";
    }
    return msg || fallback;
  };

  // Step 1: Handle Verifying Recovery Code
  const handleVerifyRecoveryCode = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = recoveryCodeInput.trim().toUpperCase();
    if (!trimmed) {
      setErrorMessage("Please enter the Admin Recovery Code.");
      return;
    }

    setIsVerifyingCode(true);
    setErrorMessage(null);

    try {
      let resetTokenReceived = "";

      // 1. Primary: Call the production REST API endpoint
      try {
        const response = await fetch("/api/admin/verify-recovery-code", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ recoveryCode: trimmed }),
        });

        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await response.json();
          if (data && data.success && data.resetToken) {
            resetTokenReceived = data.resetToken;
          } else if (data && data.error) {
            throw new Error(data.error);
          }
        }
      } catch (apiErr: unknown) {
        // If API explicitly returned a validation error message from JSON, re-throw it
        const apiMsg = apiErr instanceof Error ? apiErr.message : "";
        if (apiMsg && !apiMsg.includes("<html") && !apiMsg.includes("<!DOCTYPE")) {
          throw apiErr;
        }
      }

      // 2. Secondary fallback: Call TanStack Start server function if direct REST did not return token
      if (!resetTokenReceived) {
        const res = await verifyAdminRecoveryCodeServerFn({
          data: { recoveryCode: trimmed },
        });

        if (res && res.success && res.resetToken) {
          resetTokenReceived = res.resetToken;
        }
      }

      if (resetTokenReceived) {
        setResetToken(resetTokenReceived);
        setStep("new_password");
      } else {
        throw new Error("Invalid Recovery Code. Please check the code and try again.");
      }
    } catch (err: unknown) {
      setErrorMessage(sanitizeErrorMessage(err, "Invalid Recovery Code. Please try again."));
    } finally {
      setIsVerifyingCode(false);
    }
  };

  // Step 2: Handle Password Reset Submission
  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (newPassword.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
      return;
    }

    const hasLetter = /[a-zA-Z]/.test(newPassword);
    const hasNumber = /[0-9]/.test(newPassword);
    if (!hasLetter || !hasNumber) {
      setErrorMessage("Password must contain at least one letter and one number.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsChangingPassword(true);

    try {
      let resetSuccess = false;

      // 1. Primary: Call the production REST API endpoint
      try {
        const response = await fetch("/api/admin/reset-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            resetToken,
            newPassword,
            confirmPassword,
          }),
        });

        const contentType = response.headers.get("content-type") || "";
        if (contentType.includes("application/json")) {
          const data = await response.json();
          if (data && data.success) {
            resetSuccess = true;
          } else if (data && data.error) {
            throw new Error(data.error);
          }
        }
      } catch (apiErr: unknown) {
        const apiMsg = apiErr instanceof Error ? apiErr.message : "";
        if (apiMsg && !apiMsg.includes("<html") && !apiMsg.includes("<!DOCTYPE")) {
          throw apiErr;
        }
      }

      // 2. Secondary fallback: Call TanStack Start server function
      if (!resetSuccess) {
        const res = await resetAdminPasswordServerFn({
          data: {
            resetToken,
            newPassword,
            confirmPassword,
          },
        });

        if (res && res.success) {
          resetSuccess = true;
        }
      }

      if (resetSuccess) {
        setStep("success");
      } else {
        throw new Error("Failed to change password. Please try again.");
      }
    } catch (err: unknown) {
      setErrorMessage(sanitizeErrorMessage(err, "Failed to change password."));
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleFinish = () => {
    onClose();
    if (onPasswordResetSuccess) {
      onPasswordResetSuccess();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md w-full p-6 sm:p-7 rounded-2xl bg-card border border-border shadow-xl">
        {/* Step Indicator Header */}
        <DialogHeader className="space-y-2 text-center items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5">
            {step === "success" ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            ) : step === "new_password" ? (
              <Lock className="h-6 w-6 text-primary" />
            ) : (
              <ShieldCheck className="h-6 w-6 text-primary" />
            )}
          </div>

          <DialogTitle className="text-lg font-bold text-foreground">
            {step === "recovery_code" && "Reset Admin Password"}
            {step === "new_password" && "Create New Password"}
            {step === "success" && "Password Changed"}
          </DialogTitle>

          <DialogDescription className="text-xs text-muted-foreground max-w-sm">
            {step === "recovery_code" &&
              "Enter your permanent Admin Recovery Code to verify authorization and reset your password."}
            {step === "new_password" &&
              "Create a strong, secure new password for your PDFly Admin Dashboard."}
            {step === "success" &&
              "Your admin credentials have been updated securely. You can now log in with your new password."}
          </DialogDescription>
        </DialogHeader>

        {/* Global Error Banner */}
        {errorMessage && (
          <div className="mt-4 flex items-start gap-2 p-3 text-xs rounded-xl bg-destructive/10 text-destructive border border-destructive/20 text-left">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: Enter Permanent Admin Recovery Code */}
        {step === "recovery_code" && (
          <form onSubmit={handleVerifyRecoveryCode} className="space-y-4 mt-4">
            <div className="space-y-1.5 text-left">
              <label className="text-xs font-semibold text-muted-foreground flex items-center gap-1.5">
                <KeyRound className="h-3.5 w-3.5 text-primary" />
                <span>Admin Recovery Code</span>
              </label>
              <Input
                type="text"
                value={recoveryCodeInput}
                onChange={(e) => {
                  setRecoveryCodeInput(e.target.value.toUpperCase());
                  if (errorMessage) setErrorMessage(null);
                }}
                placeholder="e.g. PDFLY-ADMIN-XXXX-XXXX"
                className="text-sm font-mono tracking-wider bg-background border-border/80 h-11 uppercase"
                autoFocus
                required
                autoComplete="off"
                spellCheck="false"
              />
              <p className="text-[11px] text-muted-foreground">
                This permanent recovery code never expires and remains reusable across multiple
                password resets.
              </p>
            </div>

            <Button
              type="submit"
              disabled={isVerifyingCode || !recoveryCodeInput.trim()}
              className="w-full font-semibold shadow-sm text-xs py-4 h-10 gap-1.5"
            >
              {isVerifyingCode ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Verifying Code...</span>
                </>
              ) : (
                <>
                  <span>Verify Recovery Code</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </Button>

            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="h-3 w-3" />
                <span>Back to Admin Login</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Create New Password */}
        {step === "new_password" && (
          <form onSubmit={handleChangePassword} className="space-y-4 mt-4">
            <div className="space-y-3 text-left">
              {/* New Password */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-muted-foreground">
                    New Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-primary flex items-center gap-1 hover:underline focus:outline-none"
                  >
                    {showPassword ? (
                      <>
                        <EyeOff className="h-3 w-3" />
                        <span>Hide</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3" />
                        <span>Show</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      if (errorMessage) setErrorMessage(null);
                    }}
                    placeholder="Enter new admin password"
                    className="text-sm bg-background border-border/80 pr-10 h-10"
                    autoFocus
                    required
                  />
                  <KeyRound className="h-4 w-4 absolute right-3 top-3 text-muted-foreground/50 pointer-events-none" />
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-muted-foreground">
                  Confirm New Password
                </label>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errorMessage) setErrorMessage(null);
                  }}
                  placeholder="Re-enter new admin password"
                  className="text-sm bg-background border-border/80 h-10"
                  required
                />
              </div>

              {/* Requirements Checklist */}
              <div className="p-3 rounded-xl bg-secondary/50 border border-border/60 text-[11px] space-y-1 text-muted-foreground">
                <p className="font-semibold text-foreground">Password requirements:</p>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      newPassword.length >= 8 ? "bg-emerald-500" : "bg-muted-foreground/40"
                    }`}
                  />
                  <span>At least 8 characters in length</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      /[a-zA-Z]/.test(newPassword) && /[0-9]/.test(newPassword)
                        ? "bg-emerald-500"
                        : "bg-muted-foreground/40"
                    }`}
                  />
                  <span>Contains both letters and numbers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      newPassword && confirmPassword && newPassword === confirmPassword
                        ? "bg-emerald-500"
                        : "bg-muted-foreground/40"
                    }`}
                  />
                  <span>Passwords match</span>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={
                isChangingPassword ||
                !newPassword ||
                !confirmPassword ||
                newPassword !== confirmPassword ||
                newPassword.length < 8
              }
              className="w-full font-semibold shadow-sm text-xs py-4 h-10 gap-1.5"
            >
              {isChangingPassword ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Changing Password...</span>
                </>
              ) : (
                <>
                  <span>Change Password</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </>
              )}
            </Button>
          </form>
        )}

        {/* STEP 3: Success Message */}
        {step === "success" && (
          <div className="space-y-5 mt-4 text-center">
            <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 space-y-1">
              <p className="font-bold text-sm">Password changed successfully.</p>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The old password has been updated immediately. You can now access your dashboard
                using your new credentials. Your Admin Recovery Code remains active and permanent
                for any future use.
              </p>
            </div>

            <Button
              type="button"
              onClick={handleFinish}
              className="w-full font-semibold shadow-sm text-xs py-4 h-10 gap-1.5"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back to Admin Login</span>
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
