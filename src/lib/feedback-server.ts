import { createServerFn } from "@tanstack/react-start";
import { verifyAdminKey, verifyAdminKeyServerFn } from "./admin-auth-server";
import { readStorageData, writeStorageData } from "./storage-provider";
export { verifyAdminKeyServerFn };

export type FeedbackType = "bug" | "feature" | "improvement" | "general";

export interface StoredFeedbackItem {
  id: string;
  type: FeedbackType;
  rating: number; // 1 to 5
  message: string;
  email?: string;
  timestamp: string; // ISO 8601
  language: string;
}

export interface FeedbackStats {
  total: number;
  averageRating: number;
  bugsCount: number;
  featuresCount: number;
  improvementsCount: number;
  generalCount: number;
}

// Helper to ensure data file exists and read contents safely
export async function readFeedbacksFromFile(): Promise<StoredFeedbackItem[]> {
  return await readStorageData<StoredFeedbackItem[]>("feedback-items", "feedback.json", []);
}

// Helper to write feedback file safely
export async function writeFeedbacksToFile(items: StoredFeedbackItem[]): Promise<void> {
  await writeStorageData("feedback-items", "feedback.json", items);
}

export async function submitFeedbackDirect(data: {
  type?: string;
  rating?: number;
  message?: string;
  email?: string;
  language?: string;
}): Promise<{ success: boolean; id: string }> {
  const type = String(data.type || "general") as FeedbackType;
  const rating = Math.min(5, Math.max(1, Math.round(Number(data.rating) || 5)));
  const message = String(data.message || "").trim();
  const email = data.email ? String(data.email).trim() : undefined;
  const language = String(data.language || "en");

  if (!message) {
    throw new Error("Feedback message cannot be empty");
  }
  if (message.length > 1000) {
    throw new Error("Feedback message exceeds 1000 characters limit");
  }
  if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new Error("Invalid email address format");
    }
  }

  const validTypes: FeedbackType[] = ["bug", "feature", "improvement", "general"];
  const resolvedType = validTypes.includes(type) ? type : "general";

  const id = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
  const timestamp = new Date().toISOString();

  const newItem: StoredFeedbackItem = {
    id,
    type: resolvedType,
    rating,
    message,
    email,
    timestamp,
    language,
  };

  const existing = await readFeedbacksFromFile();
  const updated = [newItem, ...existing];
  await writeFeedbacksToFile(updated);

  const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || process.env.FEEDBACK_OWNER_EMAIL;
  if (ownerEmail) {
    console.log(
      `[FEEDBACK OWNER NOTIFICATION] 📧 New Feedback #${id} sent by ${email || "Anonymous Student"} -> Owner (${ownerEmail}) | Type: [${resolvedType.toUpperCase()}] | Rating: ${rating}/5 | Msg: "${message.substring(0, 80)}..."`,
    );
  }

  return {
    success: true,
    id,
  };
}

export async function getAdminFeedbackListDirect(data: {
  adminKey?: string;
  filterType?: string;
}): Promise<{
  success: boolean;
  stats: FeedbackStats;
  items: StoredFeedbackItem[];
}> {
  const isAuthorized = await verifyAdminKey(data.adminKey);
  if (!isAuthorized) {
    throw new Error("Unauthorized: Invalid Admin Security Key");
  }

  const items = await readFeedbacksFromFile();

  const total = items.length;
  const totalRatingSum = items.reduce((acc, item) => acc + item.rating, 0);
  const averageRating = total > 0 ? Number((totalRatingSum / total).toFixed(1)) : 0;
  const bugsCount = items.filter((i) => i.type === "bug").length;
  const featuresCount = items.filter((i) => i.type === "feature").length;
  const improvementsCount = items.filter((i) => i.type === "improvement").length;
  const generalCount = items.filter((i) => i.type === "general").length;

  const stats: FeedbackStats = {
    total,
    averageRating,
    bugsCount,
    featuresCount,
    improvementsCount,
    generalCount,
  };

  let filtered = items;
  if (data.filterType && data.filterType !== "all") {
    filtered = items.filter((i) => i.type === data.filterType);
  }

  return {
    success: true,
    stats,
    items: filtered,
  };
}

export async function deleteFeedbackDirect(data: {
  adminKey?: string;
  id?: string;
}): Promise<{ success: boolean }> {
  const isAuthorized = await verifyAdminKey(data.adminKey);
  if (!isAuthorized) {
    throw new Error("Unauthorized: Invalid Admin Security Key");
  }

  const items = await readFeedbacksFromFile();
  const updated = items.filter((i) => i.id !== data.id);
  await writeFeedbacksToFile(updated);

  return {
    success: true,
  };
}

/**
 * Server Function: Submit new student feedback (Public CREATE only)
 */
export const submitFeedbackServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid request body");
    }
    return data as Record<string, unknown>;
  })
  .handler(async ({ data }) => {
    return await submitFeedbackDirect(data);
  });

/**
 * Server Function: Fetch all feedback items for Admin Dashboard (Owner ONLY)
 */
export const getAdminFeedbackListServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { adminKey?: string; filterType?: string };
    return {
      adminKey: String(d?.adminKey || "").trim(),
      filterType: d?.filterType ? String(d.filterType) : "all",
    };
  })
  .handler(async ({ data }) => {
    return await getAdminFeedbackListDirect(data);
  });

/**
 * Server Function: Delete a feedback item (Owner ONLY)
 */
export const deleteFeedbackServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { adminKey?: string; id?: string };
    return {
      adminKey: String(d?.adminKey || "").trim(),
      id: String(d?.id || "").trim(),
    };
  })
  .handler(async ({ data }) => {
    return await deleteFeedbackDirect(data);
  });
