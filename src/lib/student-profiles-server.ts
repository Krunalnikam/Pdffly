import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import type { SavedStudentProfileRecord } from "@/types";
import { verifyAdminKey } from "./admin-auth-server";

function getDataDir(): string {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "pdfly-data");
  }
  return path.join(process.cwd(), "data");
}

function getProfilesFilePath(): string {
  return path.join(getDataDir(), "student-profiles.json");
}

async function readProfilesFromFile(): Promise<SavedStudentProfileRecord[]> {
  const primaryPath = getProfilesFilePath();
  try {
    const content = await fs.readFile(primaryPath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    const seedPath = path.join(process.cwd(), "data", "student-profiles.json");
    try {
      const content = await fs.readFile(seedPath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // ignore
    }
  }
  return [];
}

async function writeProfilesToFile(profiles: SavedStudentProfileRecord[]): Promise<void> {
  const dir = getDataDir();
  const filePath = getProfilesFilePath();

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(profiles, null, 2), "utf-8");
  } catch (err) {
    const tmpDir = path.join(os.tmpdir(), "pdfly-data");
    if (dir !== tmpDir) {
      try {
        await fs.mkdir(tmpDir, { recursive: true });
        await fs.writeFile(
          path.join(tmpDir, "student-profiles.json"),
          JSON.stringify(profiles, null, 2),
          "utf-8",
        );
      } catch (tmpErr) {
        console.error("Failed to write student profiles to tmp dir:", tmpErr);
      }
    } else {
      console.error("Failed to write student profiles file:", err);
    }
  }
}

/**
 * Server Function: Save or Update Student Profile Record
 * Stores only Enrollment Number and Branch with timestamp.
 * Strictly avoids collecting or storing any assignments, documents, or personal PII.
 */
export const saveStudentProfileServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid request payload");
    }
    const d = data as Record<string, unknown>;
    const rawEnrollment = String(d.enrollmentNumber || "").trim();
    const rawBranch = String(d.branch || "").trim();

    if (!rawEnrollment) {
      throw new Error("Enrollment Number is required");
    }
    if (!rawBranch) {
      throw new Error("Branch is required");
    }

    return {
      enrollmentNumber: rawEnrollment.slice(0, 64),
      branch: rawBranch.slice(0, 64).toUpperCase(),
    };
  })
  .handler(async ({ data }): Promise<{ success: boolean; isNew: boolean }> => {
    const nowIso = new Date().toISOString();
    const profiles = await readProfilesFromFile();

    const normalizedEnrollment = data.enrollmentNumber.trim().toUpperCase();
    const existingIndex = profiles.findIndex(
      (p) => p.enrollmentNumber.trim().toUpperCase() === normalizedEnrollment,
    );

    let isNew = false;
    if (existingIndex >= 0) {
      // Update existing record without creating a duplicate
      const existing = profiles[existingIndex];
      profiles[existingIndex] = {
        enrollmentNumber: data.enrollmentNumber.trim(),
        branch: data.branch.trim().toUpperCase(),
        savedAt: existing.savedAt || nowIso,
        updatedAt: nowIso,
      };
    } else {
      // Create new profile record
      isNew = true;
      profiles.unshift({
        enrollmentNumber: data.enrollmentNumber.trim(),
        branch: data.branch.trim().toUpperCase(),
        savedAt: nowIso,
        updatedAt: nowIso,
      });
    }

    await writeProfilesToFile(profiles);

    return {
      success: true,
      isNew,
    };
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
      const isAuthorized = await verifyAdminKey(data.adminKey);
      if (!isAuthorized) {
        throw new Error("Unauthorized: Invalid Admin Security Key");
      }

      const profiles = await readProfilesFromFile();

      // Sort by latest activity (updatedAt or savedAt) descending
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
    },
  );
