import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import type { PromotionItem } from "@/types";
import { verifyAdminKey } from "./admin-auth-server";

export interface PromotionStats {
  total: number;
  activeCount: number;
  inactiveCount: number;
  totalClicks: number;
}

function getDataDir(): string {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "pdfly-data");
  }
  return path.join(process.cwd(), "data");
}

function getPromotionsFilePath(): string {
  return path.join(getDataDir(), "promotions.json");
}

// Helper to normalize and sanitize URLs
function sanitizeUrl(rawUrl: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed) return "";
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

// Fallback seed promotions if no file exists yet
const SEED_PROMOTIONS: PromotionItem[] = [
  {
    id: "promo_gtu_papers",
    name: "GTU Study Hub & Question Papers",
    url: "https://gtu.ac.in",
    imageUrl: "",
    shortDescription: "Free past question papers, syllabus guides, and engineering solution sets.",
    fullDetails:
      "Access thousands of verified past university exam papers, detailed marking schemes, practical lab manuals, and chapter-wise study notes curated for engineering and diploma students. Keep this resource bookmarked for mid-terms and finals.",
    customButtonName: "Explore Study Papers",
    isActive: true,
    createdAt: "2026-09-01T10:00:00.000Z",
    updatedAt: "2026-09-01T10:00:00.000Z",
    clicksCount: 14,
  },
  {
    id: "promo_student_notes",
    name: "Classroom Notes & Assignment Portal",
    url: "https://classroom.google.com",
    imageUrl: "",
    shortDescription: "Quick access to lecture notes, assignment schedules, and reference PDFs.",
    fullDetails:
      "Direct gateway for students to check pending lab assignments, professor announcements, and lecture slides. Pair your scanned PDF submissions with classroom submissions seamlessly.",
    customButtonName: "Open Classroom",
    isActive: true,
    createdAt: "2026-09-02T12:00:00.000Z",
    updatedAt: "2026-09-02T12:00:00.000Z",
    clicksCount: 8,
  },
];

// Helper to read promotions safely
async function readPromotionsFromFile(): Promise<PromotionItem[]> {
  const primaryPath = getPromotionsFilePath();
  try {
    const content = await fs.readFile(primaryPath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) {
      return parsed;
    }
  } catch {
    // If not in primary path, check repository data/promotions.json
    const repoPath = path.join(process.cwd(), "data", "promotions.json");
    try {
      const content = await fs.readFile(repoPath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      // Return seeds
    }
  }
  return [...SEED_PROMOTIONS];
}

// Helper to write promotions safely
async function writePromotionsToFile(items: PromotionItem[]): Promise<void> {
  const dir = getDataDir();
  const filePath = getPromotionsFilePath();
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(items, null, 2), "utf-8");
  } catch (err) {
    const tmpDir = path.join(os.tmpdir(), "pdfly-data");
    if (dir !== tmpDir) {
      await fs.mkdir(tmpDir, { recursive: true });
      await fs.writeFile(
        path.join(tmpDir, "promotions.json"),
        JSON.stringify(items, null, 2),
        "utf-8",
      );
    } else {
      console.error("Failed to write promotions file:", err);
    }
  }
}

/**
 * Server Function: Get all ACTIVE promotions for PDFfly first page
 * Public, ultra-lightweight and cached-friendly
 */
export const getActivePromotionsServerFn = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const items = await readPromotionsFromFile();
    const active = items.filter((p) => p.isActive);
    return {
      success: true,
      items: active,
    };
  } catch (err) {
    console.error("Failed to read active promotions:", err);
    return {
      success: true,
      items: SEED_PROMOTIONS.filter((p) => p.isActive),
    };
  }
});

/**
 * Server Function: Get all promotions for Admin Dashboard (requires adminKey)
 */
export const getAdminPromotionsListServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { adminKey?: string };
    return {
      adminKey: String(d?.adminKey || "").trim(),
    };
  })
  .handler(async ({ data }) => {
    const isAuthorized = await verifyAdminKey(data.adminKey);
    if (!isAuthorized) {
      throw new Error("Unauthorized: Invalid Admin Security Key");
    }

    const items = await readPromotionsFromFile();
    const total = items.length;
    const activeCount = items.filter((i) => i.isActive).length;
    const inactiveCount = total - activeCount;
    const totalClicks = items.reduce((acc, i) => acc + (i.clicksCount || 0), 0);

    const stats: PromotionStats = {
      total,
      activeCount,
      inactiveCount,
      totalClicks,
    };

    return {
      success: true,
      items,
      stats,
    };
  });

/**
 * Server Function: Save (Create or Update) Promotion (requires adminKey)
 */
export const savePromotionServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as {
      adminKey?: string;
      promotion?: {
        id?: string;
        name?: string;
        url?: string;
        imageUrl?: string;
        subject?: string;
        shortDescription?: string;
        fullDetails?: string;
        customButtonName?: string;
        isActive?: boolean;
      };
    };

    if (!d || !d.promotion) {
      throw new Error("Invalid request payload");
    }

    return {
      adminKey: String(d.adminKey || "").trim(),
      promotion: d.promotion,
    };
  })
  .handler(async ({ data }) => {
    const isAuthorized = await verifyAdminKey(data.adminKey);
    if (!isAuthorized) {
      throw new Error("Unauthorized: Invalid Admin Security Key");
    }

    const { promotion } = data;
    const name = (promotion.name || "").trim();
    if (!name) {
      throw new Error("Website name is required");
    }

    const rawUrl = (promotion.url || "").trim();
    if (!rawUrl) {
      throw new Error("Website URL is required");
    }
    const cleanUrl = sanitizeUrl(rawUrl);

    const shortDescription = (promotion.shortDescription || "").trim();
    if (!shortDescription) {
      throw new Error("Short description is required");
    }

    const fullDetails = (promotion.fullDetails || "").trim();
    if (!fullDetails) {
      throw new Error("Full details are required");
    }

    const customButtonName = (promotion.customButtonName || "").trim() || "Visit Website →";
    const isActive = promotion.isActive !== false;
    const imageUrl = (promotion.imageUrl || "").trim();
    const subject = (promotion.subject || "").trim();

    const items = await readPromotionsFromFile();
    const now = new Date().toISOString();

    let savedItem: PromotionItem;
    if (promotion.id) {
      // Update existing
      const index = items.findIndex((i) => i.id === promotion.id);
      if (index !== -1) {
        const existing = items[index];
        savedItem = {
          ...existing,
          name,
          url: cleanUrl,
          imageUrl,
          subject,
          shortDescription,
          fullDetails,
          customButtonName,
          isActive,
          updatedAt: now,
        };
        items[index] = savedItem;
      } else {
        savedItem = {
          id: promotion.id,
          name,
          url: cleanUrl,
          imageUrl,
          subject,
          shortDescription,
          fullDetails,
          customButtonName,
          isActive,
          createdAt: now,
          updatedAt: now,
          clicksCount: 0,
        };
        items.unshift(savedItem);
      }
    } else {
      // Create new
      const newId = `promo_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
      savedItem = {
        id: newId,
        name,
        url: cleanUrl,
        imageUrl,
        subject,
        shortDescription,
        fullDetails,
        customButtonName,
        isActive,
        createdAt: now,
        updatedAt: now,
        clicksCount: 0,
      };
      items.unshift(savedItem);
    }

    await writePromotionsToFile(items);

    return {
      success: true,
      item: savedItem,
    };
  });

/**
 * Server Function: Manually change / reorder promotion positions (requires adminKey)
 */
export const reorderPromotionsServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { adminKey?: string; orderedIds?: string[] };
    return {
      adminKey: String(d?.adminKey || "").trim(),
      orderedIds: Array.isArray(d?.orderedIds) ? d.orderedIds.map((id) => String(id)) : [],
    };
  })
  .handler(async ({ data }) => {
    const isAuthorized = await verifyAdminKey(data.adminKey);
    if (!isAuthorized) {
      throw new Error("Unauthorized: Invalid Admin Security Key");
    }

    const items = await readPromotionsFromFile();
    const itemMap = new Map<string, PromotionItem>();
    for (const it of items) {
      itemMap.set(it.id, it);
    }

    const reordered: PromotionItem[] = [];
    // Place items in the provided order
    for (const id of data.orderedIds) {
      const item = itemMap.get(id);
      if (item) {
        reordered.push(item);
        itemMap.delete(id);
      }
    }
    // Append any items that weren't in orderedIds (safety net)
    for (const item of itemMap.values()) {
      reordered.push(item);
    }

    await writePromotionsToFile(reordered);

    return {
      success: true,
      items: reordered,
    };
  });

/**
 * Server Function: Toggle Active / Inactive status
 */
export const togglePromotionActiveServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { adminKey?: string; id?: string; isActive?: boolean };
    return {
      adminKey: String(d?.adminKey || "").trim(),
      id: String(d?.id || "").trim(),
      isActive: Boolean(d?.isActive),
    };
  })
  .handler(async ({ data }) => {
    const isAuthorized = await verifyAdminKey(data.adminKey);
    if (!isAuthorized) {
      throw new Error("Unauthorized: Invalid Admin Security Key");
    }

    const items = await readPromotionsFromFile();
    const index = items.findIndex((i) => i.id === data.id);
    if (index === -1) {
      throw new Error("Promotion not found");
    }

    items[index].isActive = data.isActive;
    items[index].updatedAt = new Date().toISOString();

    await writePromotionsToFile(items);

    return {
      success: true,
      item: items[index],
    };
  });

/**
 * Server Function: Delete a promotion (requires adminKey)
 */
export const deletePromotionServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { adminKey?: string; id?: string };
    return {
      adminKey: String(d?.adminKey || "").trim(),
      id: String(d?.id || "").trim(),
    };
  })
  .handler(async ({ data }) => {
    const isAuthorized = await verifyAdminKey(data.adminKey);
    if (!isAuthorized) {
      throw new Error("Unauthorized: Invalid Admin Security Key");
    }

    const items = await readPromotionsFromFile();
    const updated = items.filter((i) => i.id !== data.id);
    await writePromotionsToFile(updated);

    return {
      success: true,
    };
  });

/**
 * Server Function: Record a click on a promotion
 */
export const recordPromotionClickServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { id?: string };
    return {
      id: String(d?.id || "").trim(),
    };
  })
  .handler(async ({ data }) => {
    if (!data.id) return { success: false };

    try {
      const items = await readPromotionsFromFile();
      const item = items.find((i) => i.id === data.id);
      if (item) {
        item.clicksCount = (item.clicksCount || 0) + 1;
        await writePromotionsToFile(items);
      }
    } catch {
      // Non-blocking telemetry
    }

    return {
      success: true,
    };
  });
