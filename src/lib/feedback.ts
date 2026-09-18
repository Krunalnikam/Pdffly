import {
  submitFeedbackServerFn,
  type FeedbackType,
  type StoredFeedbackItem,
} from "./feedback-server";

export type { FeedbackType, StoredFeedbackItem as FeedbackItem };

/**
 * Persistently submits feedback to the secure server database.
 * Dual resilient: Uses direct REST endpoint first, falling back to TanStack Start serverFn.
 */
export async function submitFeedback(data: {
  type: FeedbackType;
  rating: number;
  message: string;
  email?: string;
  language?: string;
}): Promise<{ success: boolean; id: string; error?: string }> {
  // Validate message
  const trimmedMessage = data.message.trim();
  if (!trimmedMessage) {
    return { success: false, id: "", error: "Message cannot be empty" };
  }
  if (trimmedMessage.length > 1000) {
    return { success: false, id: "", error: "Message exceeds 1000 characters limit" };
  }

  // Validate optional email format
  const trimmedEmail = data.email?.trim();
  if (trimmedEmail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return { success: false, id: "", error: "Invalid email address format" };
    }
  }

  // Ensure rating is within 1-5
  const rating = Math.min(5, Math.max(1, Math.round(data.rating || 5)));
  const payload = {
    type: data.type,
    rating,
    message: trimmedMessage,
    email: trimmedEmail || undefined,
    language: data.language || "en",
  };

  // 1. Primary REST Endpoint
  try {
    const resp = await fetch("/api/feedback/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (resp.ok) {
      const json = await resp.json();
      if (json && json.success) {
        return { success: true, id: json.id };
      }
    }
  } catch {
    // Fall back to serverFn
  }

  // 2. Server Function Fallback
  try {
    const res = await submitFeedbackServerFn({ data: payload });
    if (res && res.success) {
      return { success: true, id: res.id };
    }
    return { success: false, id: "", error: "Failed to save feedback to server" };
  } catch (err: unknown) {
    console.error("Failed to submit feedback to backend:", err);
    return {
      success: false,
      id: "",
      error: err instanceof Error ? err.message : "Failed to connect to backend",
    };
  }
}
