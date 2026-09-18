import { createServerFn } from "@tanstack/react-start";
import type { SavedStudentProfileRecord } from "@/types";
import { verifyAdminKey } from "./admin-auth-server";
import { readStorageData, writeStorageData } from "./storage-provider";

export async function readProfilesFromFile(): Promise<SavedStudentProfileRecord[]> {
  return await readStorageData<SavedStudentProfileRecord[]>(
    "student-profiles",
    "student-profiles.json",
    [],
  );
}

export async function writeProfilesToFile(profiles: SavedStudentProfileRecord[]): Promise<void> {
  await writeStorageData("student-profiles", "student-profiles.json", profiles);
}

export async function saveStudentProfileDirect(
  enrollmentNumber: string,
  branch: string,
): Promise<{ success: boolean; isNew: boolean }> {
  const rawEnrollment = String(enrollmentNumber || "").trim();
  const rawBranch = String(branch || "").trim();

  if (!rawEnrollment) {
    throw new Error("Enrollment Number is required");
  }
  if (!rawBranch) {
    throw new Error("Branch is required");
  }

  const cleanEnrollment = rawEnrollment.slice(0, 64);
  const cleanBranch = rawBranch.slice(0, 64).toUpperCase();

  const nowIso = new Date().toISOString();
  const profiles = await readProfilesFromFile();

  const normalizedEnrollment = cleanEnrollment.toUpperCase();
  const existingIndex = profiles.findIndex(
    (p) => p.enrollmentNumber.trim().toUpperCase() === normalizedEnrollment,
  );

  let isNew = false;
  if (existingIndex >= 0) {
    const existing = profiles[existingIndex];
    profiles[existingIndex] = {
      enrollmentNumber: cleanEnrollment,
      branch: cleanBranch,
      savedAt: existing.savedAt || nowIso,
      updatedAt: nowIso,
    };
  } else {
    isNew = true;
    profiles.unshift({
      enrollmentNumber: cleanEnrollment,
      branch: cleanBranch,
      savedAt: nowIso,
      updatedAt: nowIso,
    });
  }

  await writeProfilesToFile(profiles);

  return {
    success: true,
    isNew,
  };
}

export async function getSavedStudentProfilesDirect(adminKey: string): Promise<{
  success: boolean;
  profiles: SavedStudentProfileRecord[];
  totalCount: number;
}> {
  const isAuthorized = await verifyAdminKey(adminKey);
  if (!isAuthorized) {
    throw new Error("Unauthorized: Invalid Admin Security Key");
  }

  const profiles = await readProfilesFromFile();

  const sorted = [...profiles].sort((a, b) => {
    const timeA = new Date(b.updatedAt || b.savedAt).getTime();
    const timeB = new Date(a.updatedAt || a.savedAt).getTime();
    return timeA - timeB;
  });

  return {
    success: true,
    profiles: sorted,
    totalCount: sorted.length,
  };
}

/**
 * Server Function: Save or Update Student Profile Record
 */
export const saveStudentProfileServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid request payload");
    }
    const d = data as Record<string, unknown>;
    return {
      enrollmentNumber: String(d.enrollmentNumber || "").trim(),
      branch: String(d.branch || "").trim(),
    };
  })
  .handler(async ({ data }): Promise<{ success: boolean; isNew: boolean }> => {
    return await saveStudentProfileDirect(data.enrollmentNumber, data.branch);
  });

/**
 * Server Function: Get List of Saved Student Profiles (Admin Protected)
 */
export const getSavedStudentProfilesServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { adminKey?: string };
    return {
      adminKey: String(d?.adminKey || "").trim(),
    };
  })
  .handler(
    async ({
      data,
    }): Promise<{
      success: boolean;
      profiles: SavedStudentProfileRecord[];
      totalCount: number;
    }> => {
      return await getSavedStudentProfilesDirect(data.adminKey);
    },
  );
