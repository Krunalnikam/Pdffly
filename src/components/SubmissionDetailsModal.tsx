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
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  GraduationCap,
  Building2,
  Hash,
  BookOpen,
  Calendar,
  CheckCircle2,
  Edit3,
  UserCheck,
  ArrowDown,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { saveStudentProfile } from "@/lib/profile";
import type { StudentProfile } from "@/types";

interface SubmissionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: StudentProfile | null;
  onOpenProfileModal: () => void;
  onSaveProfile: (profile: StudentProfile) => void;
  branchInput: string;
  setBranchInput: (val: string) => void;
  enrollmentInput: string;
  setEnrollmentInput: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  examPhase: string;
  setExamPhase: (val: string) => void;
  errors?: {
    branch?: string;
    enrollmentNumber?: string;
    subject?: string;
    examPhase?: string;
  };
  onScrollToSection?: () => void;
}

export function SubmissionDetailsModal({
  isOpen,
  onClose,
  profile,
  onOpenProfileModal,
  onSaveProfile,
  branchInput,
  setBranchInput,
  enrollmentInput,
  setEnrollmentInput,
  subject,
  setSubject,
  examPhase,
  setExamPhase,
  errors = {},
  onScrollToSection,
}: SubmissionDetailsModalProps) {
  const { t } = useLanguage();
  const [localBranch, setLocalBranch] = useState(branchInput);
  const [localEnrollment, setLocalEnrollment] = useState(enrollmentInput);
  const [localSubject, setLocalSubject] = useState(subject);
  const [localExamPhase, setLocalExamPhase] = useState(examPhase);

  // Sync state with parent props when opened
  useEffect(() => {
    if (isOpen) {
      setLocalBranch(branchInput);
      setLocalEnrollment(enrollmentInput);
      setLocalSubject(subject);
      setLocalExamPhase(examPhase);
    }
  }, [isOpen, branchInput, enrollmentInput, subject, examPhase]);

  const activeBranch = profile ? profile.branch : localBranch.trim().toUpperCase();
  const activeEnrollmentNumber = profile ? profile.enrollmentNumber : localEnrollment.trim();

  const handleSaveAndClose = () => {
    setBranchInput(localBranch);
    setEnrollmentInput(localEnrollment);
    setSubject(localSubject);
    setExamPhase(localExamPhase);
    onClose();
  };

  const handleSaveInlineProfile = () => {
    if (localBranch.trim() && localEnrollment.trim()) {
      const saved = saveStudentProfile({
        branch: localBranch.trim().toUpperCase(),
        enrollmentNumber: localEnrollment.trim(),
      });
      onSaveProfile(saved);
      setBranchInput(saved.branch);
      setEnrollmentInput(saved.enrollmentNumber);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleSaveAndClose()}>
      <DialogContent
        id="modal-quick-submission-details"
        className="max-w-lg p-0 overflow-hidden sm:rounded-2xl gap-0 max-h-[90vh] flex flex-col"
      >
        <DialogHeader className="p-4 sm:p-5 border-b border-border/80 bg-muted/20 shrink-0">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <GraduationCap className="h-4 w-4" />
              </div>
              <DialogTitle className="text-base font-bold">
                {t("quickSubmissionDetails")}
              </DialogTitle>
            </div>
            {profile && (
              <Badge variant="outline" className="text-[11px] text-primary bg-primary/5">
                {t("profileActive")}
              </Badge>
            )}
          </div>
          <DialogDescription className="text-xs text-muted-foreground mt-1">
            {t("quickSubmissionDesc")}
          </DialogDescription>
        </DialogHeader>

        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* OPTION 1: Student Profile (Branch & Enrollment Number) */}
          <div className="space-y-2 rounded-xl border border-border/80 bg-card p-3.5 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5 text-primary" />
                1. {t("savedStudentProfile")}
              </span>
              <span className="text-[10px] text-muted-foreground font-normal">
                {profile ? t("savedInBrowser") : t("savesInBrowser")}
              </span>
            </div>

            {profile ? (
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-2.5 flex items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1 rounded bg-background px-2 py-0.5 text-xs font-medium border border-border text-foreground">
                    <Building2 className="h-3 w-3 text-primary" />
                    {t("branchLabel")}: <strong className="text-primary">{profile.branch}</strong>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded bg-background px-2 py-0.5 text-xs font-medium border border-border text-foreground">
                    <Hash className="h-3 w-3 text-primary" />
                    {t("enrollNoLabel")}:{" "}
                    <strong className="font-mono text-primary">{profile.enrollmentNumber}</strong>
                  </span>
                </div>
                <Button
                  id="btn-quick-edit-profile"
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-7 gap-1 shrink-0 bg-background"
                  onClick={() => {
                    onClose();
                    onOpenProfileModal();
                  }}
                >
                  <Edit3 className="h-3 w-3" />
                  {t("editDetailsBtn")}
                </Button>
              </div>
            ) : (
              <div className="space-y-3 pt-1">
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <Label htmlFor="quick-branch" className="text-[11px] font-semibold">
                      {t("branchRequired")}
                    </Label>
                    <Input
                      id="quick-branch"
                      value={localBranch}
                      onChange={(e) => {
                        const val = e.target.value.toUpperCase();
                        setLocalBranch(val);
                        setBranchInput(val);
                      }}
                      placeholder={t("branchPlaceholder")}
                      maxLength={20}
                      className="text-xs uppercase h-8"
                    />
                    {errors.branch && (
                      <p className="text-[10px] text-destructive">{errors.branch}</p>
                    )}
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="quick-enrollment" className="text-[11px] font-semibold">
                      {t("enrollmentRequired")}
                    </Label>
                    <Input
                      id="quick-enrollment"
                      value={localEnrollment}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalEnrollment(val);
                        setEnrollmentInput(val);
                      }}
                      placeholder={t("enrollmentPlaceholder")}
                      maxLength={40}
                      className="text-xs font-mono h-8"
                    />
                    {errors.enrollmentNumber && (
                      <p className="text-[10px] text-destructive">{errors.enrollmentNumber}</p>
                    )}
                  </div>
                </div>
                {localBranch.trim() && localEnrollment.trim() && (
                  <div className="flex justify-end">
                    <Button
                      id="btn-save-quick-profile"
                      type="button"
                      variant="secondary"
                      size="sm"
                      className="text-xs h-7 gap-1"
                      onClick={handleSaveInlineProfile}
                    >
                      <UserCheck className="h-3 w-3 text-primary" />
                      {t("saveDetailsFuture")}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* OPTION 2: Assignment & Exam Details (Subject & Exam Phase) */}
          <div className="space-y-3 rounded-xl border border-border/80 bg-card p-3.5 shadow-2xs">
            <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5 text-primary" />
              2. Subject & Exam Details
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="quick-subject" className="text-[11px] font-semibold">
                  {t("subjectRequired")}
                </Label>
                <Input
                  id="quick-subject"
                  value={localSubject}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase();
                    setLocalSubject(val);
                    setSubject(val);
                  }}
                  placeholder={t("subjectPlaceholder")}
                  maxLength={80}
                  className="text-xs h-8"
                />
                <p className="text-[10px] text-muted-foreground">{t("subjectExample")}</p>
                {errors.subject && <p className="text-[10px] text-destructive">{errors.subject}</p>}
              </div>

              <div className="space-y-1">
                <Label htmlFor="quick-examPhase" className="text-[11px] font-semibold">
                  {t("examPhaseRequired")}
                </Label>
                <Input
                  id="quick-examPhase"
                  value={localExamPhase}
                  onChange={(e) => {
                    const val = e.target.value.toUpperCase();
                    setLocalExamPhase(val);
                    setExamPhase(val);
                  }}
                  placeholder={t("examPhasePlaceholder")}
                  maxLength={20}
                  className="text-xs h-8"
                />
                <p className="text-[10px] text-muted-foreground">{t("examPhaseExample")}</p>
                {errors.examPhase && (
                  <p className="text-[10px] text-destructive">{errors.examPhase}</p>
                )}
              </div>
            </div>
          </div>

          {/* Live Filename Preview */}
          <div className="rounded-lg border border-border/80 bg-secondary/30 p-2.5 space-y-1">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground">
              {t("targetFilename")}
            </span>
            <p className="text-xs font-mono font-semibold text-primary break-all">
              {`${activeBranch || "BRANCH"}_${activeEnrollmentNumber || "ENROLL"}_${localSubject.trim() || "SUBJECT"}_${localExamPhase.trim() || "PHASE"}.pdf`}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-3 sm:p-4 border-t border-border/80 bg-muted/20 flex items-center justify-between gap-2 shrink-0">
          {onScrollToSection ? (
            <Button
              id="btn-jump-to-submission-section"
              type="button"
              variant="ghost"
              size="sm"
              className="text-xs h-8 gap-1 text-muted-foreground hover:text-foreground"
              onClick={() => {
                handleSaveAndClose();
                onScrollToSection();
              }}
            >
              <ArrowDown className="h-3 w-3" />
              {t("jumpToFullSection")}
            </Button>
          ) : (
            <div />
          )}

          <Button
            id="btn-done-submission-details"
            type="button"
            size="sm"
            className="text-xs h-8 px-4 gap-1.5 font-semibold"
            onClick={handleSaveAndClose}
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Done
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
