import { StudentProfile } from "@/types";
import { saveStudentProfileServerFn } from "@/lib/student-profiles-server";

export const STUDENT_PROFILE_STORAGE_KEY = "pdfmaker_student_profile";

/**
 * Synchronizes student profile to the backend store asynchronously.
 * Safely ignores errors if offline or network unavailable.
 */
export async function syncProfileToServer(profile: StudentProfile): Promise<void> {
  if (!profile || !profile.enrollmentNumber || !profile.branch) return;
  try {
    await saveStudentProfileServerFn({
      data: {
        enrollmentNumber: profile.enrollmentNumber.trim(),
        branch: profile.branch.trim().toUpperCase(),
      },
    });
  } catch (err) {
    // Non-blocking background sync failure
    console.warn("Could not sync student profile to server:", err);
  }
}

/**
 * Retrieves the saved student profile from localStorage.
 * Returns null if no profile is saved or if data is invalid.
 */
export function getSavedProfile(): StudentProfile | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STUDENT_PROFILE_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (
      parsed &&
      typeof parsed.branch === "string" &&
      parsed.branch.trim().length > 0 &&
      typeof parsed.enrollmentNumber === "string" &&
      parsed.enrollmentNumber.trim().length > 0
    ) {
      return {
        branch: parsed.branch.trim().toUpperCase(),
        enrollmentNumber: parsed.enrollmentNumber.trim(),
      };
    }
    return null;
  } catch (err) {
    console.error("Failed to load student profile from localStorage:", err);
    return null;
  }
}

/**
 * Saves or updates the student profile in localStorage and syncs to backend.
 */
export function saveStudentProfile(profile: StudentProfile): StudentProfile {
  const cleanProfile: StudentProfile = {
    branch: profile.branch.trim().toUpperCase(),
    enrollmentNumber: profile.enrollmentNumber.trim(),
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(STUDENT_PROFILE_STORAGE_KEY, JSON.stringify(cleanProfile));
    try {
      window.dispatchEvent(new CustomEvent("pdfly:profile-saved", { detail: cleanProfile }));
    } catch {
      // ignore
    }
  }

  // Sync to database in background
  syncProfileToServer(cleanProfile);

  return cleanProfile;
}

/**
 * Clears the saved student profile from localStorage.
 */
export function clearStudentProfile(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STUDENT_PROFILE_STORAGE_KEY);
  }
}
