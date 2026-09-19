import {
  verifyAdminKey,
  executeVerifyRecoveryCode,
  executeAdminPasswordReset,
} from "./admin-auth-server";
import {
  submitFeedbackDirect,
  getAdminFeedbackListDirect,
  deleteFeedbackDirect,
} from "./feedback-server";
import {
  getActivePromotionsDirect,
  getAdminPromotionsListDirect,
  savePromotionDirect,
  reorderPromotionsDirect,
  togglePromotionActiveDirect,
  deletePromotionDirect,
  recordPromotionClickDirect,
} from "./promotions-server";
import { saveStudentProfileDirect, getSavedStudentProfilesDirect } from "./student-profiles-server";
import {
  recordVisitDirect,
  recordActiveStudentHeartbeat,
  removeActiveStudent,
  getAdminAnalyticsDirect,
} from "./analytics-server";

export interface ApiRequest {
  method: string;
  pathname: string;
  body?: Record<string, unknown>;
  query?: Record<string, string>;
  headers?: Record<string, string | undefined>;
}

export interface ApiResponse {
  statusCode: number;
  headers?: Record<string, string>;
  body: unknown;
}

const NO_CACHE_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "Surrogate-Control": "no-store",
  "Netlify-CDN-Cache-Control": "no-store",
};

// Known serverFn IDs mapping to direct handlers
type RpcHandler = (payload: Record<string, unknown> | undefined) => Promise<unknown>;

const SERVER_FN_ID_MAP: Record<string, RpcHandler> = {
  // Admin auth
  fbb703f73942f8482600f969345d6f6f71c4c71820658a249df2a3dec3fb66d1: async (d) => ({
    authorized: await verifyAdminKey(String(d?.adminKey || "")),
  }),
  b0e26fbbc25655a00214e312a5e86fc29e83cc72d19580f87c2ecc4f31286c15: async (d) =>
    await executeVerifyRecoveryCode(String(d?.recoveryCode || "")),
  "2729959e3da7ab36f831816ba81ef696c7b7b26eb92579755dc87c0056555c77": async (d) =>
    await executeAdminPasswordReset(
      String(d?.resetToken || ""),
      String(d?.newPassword || ""),
      String(d?.confirmPassword || ""),
    ),

  // Feedback
  c8b82f55d12c2f949b941daf3a01f3a12f217656703e51bec334b7a77d2038e1: async (d) =>
    await submitFeedbackDirect(d || {}),
  "38595fd69ce4a9dd967f09cf0482f5bd54a622301df7d445edf46ce1b2eea374": async (d) =>
    await getAdminFeedbackListDirect(d || {}),
  "2ae761f96464d98f2ddb3b5208fd2b111aa6eb63608a00da85484e730b631e8c": async (d) =>
    await deleteFeedbackDirect(d || {}),

  // Promotions
  "42130a68f6a3c71ca81de1ea8c34141339118281b5b6786b535a49ceda8d0f80": async () =>
    await getActivePromotionsDirect(),
  "8929758784e6c8051ab89ec587b674ef34a066a703e5e87b4ba78b7e78eaedb5": async (d) =>
    await getAdminPromotionsListDirect(String(d?.adminKey || "")),
  f421f5941c4b50a8359c124a225c847e1300db8e25e4ddf4af2a2f212a12b069: async (d) =>
    await savePromotionDirect(String(d?.adminKey || ""), d?.promotion || {}),
  a8e715225bd86c777ea6bf26ca36d6fc3f63e560d82bf95a3224483e7a0b878b: async (d) =>
    await reorderPromotionsDirect(String(d?.adminKey || ""), d?.orderedIds || []),
  "73e00123ba91908f5f0e62d01ef14f7c0f91742e1a615105590fa87b126d787f": async (d) =>
    await togglePromotionActiveDirect(
      String(d?.adminKey || ""),
      String(d?.id || ""),
      Boolean(d?.isActive),
    ),
  "30e8998e0db6f0be91a5b7b16fd68665b023f21f687e41874dd42ee7906bfa5b": async (d) =>
    await deletePromotionDirect(String(d?.adminKey || ""), String(d?.id || "")),
  b0f3c3a934a620f75b0592b4946299e54a06b218e833be64a77e695b63c95641: async (d) =>
    await recordPromotionClickDirect(String(d?.id || "")),

  // Student Profiles
  e69907172b4ecf13d9af4a6747d505f49d50f010cd99501fbe7daec67669cfa4: async (d) =>
    await saveStudentProfileDirect(String(d?.enrollmentNumber || ""), String(d?.branch || "")),
  "38c699554ab33a3f3fe52a7461703d9d2efe007732920f8c51ab552f7d21948f": async (d) =>
    await getSavedStudentProfilesDirect(String(d?.adminKey || "")),

  // Analytics
  ef9aa207e48c8f5071d331221e7d63efcb7879b49339979aeab2d5d322143b8e: async (d) =>
    await recordVisitDirect(d || {}),
  d689009276d6444765313717954dbf9fd5acaba126aa1172d4c0b4ceea00a324: async (d) => ({
    success: true,
    activeCount: await recordActiveStudentHeartbeat(String(d?.visitorId || "")),
  }),
  "950ff7ef9721476bdceb4595910a210c8764d28af8d23ac18e39a6f8c88513d5": async (d) => ({
    success: true,
    activeCount: await removeActiveStudent(String(d?.visitorId || "")),
  }),
  faaebff2d70e5b18714d9db4222348d01323dcadb4e5aee1826980ac0d48b37b: async (d) =>
    await getAdminAnalyticsDirect(String(d?.adminKey || "")),
};

export async function handleApiRequest(req: ApiRequest): Promise<ApiResponse> {
  const method = req.method.toUpperCase();
  let pathname = req.pathname || "/";
  // Strip trailing slash if present
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }

  const body = req.body || {};
  const query = req.query || {};

  try {
    // -------------------------------------------------------------
    // Health Check
    // -------------------------------------------------------------
    if (pathname === "/api/health") {
      return {
        statusCode: 200,
        body: { status: "ok", timestamp: new Date().toISOString() },
      };
    }

    // -------------------------------------------------------------
    // Admin Auth Endpoints
    // -------------------------------------------------------------
    if (pathname === "/api/admin/verify-key" && method === "POST") {
      const authorized = await verifyAdminKey(String(body.adminKey || ""));
      return {
        statusCode: 200,
        body: { success: true, authorized },
      };
    }

    if (pathname === "/api/admin/verify-recovery-code" && method === "POST") {
      const result = await executeVerifyRecoveryCode(String(body.recoveryCode || ""));
      return {
        statusCode: result.success ? 200 : 400,
        body: result,
      };
    }

    if (pathname === "/api/admin/reset-password" && method === "POST") {
      const result = await executeAdminPasswordReset(
        String(body.resetToken || ""),
        String(body.newPassword || ""),
        String(body.confirmPassword || ""),
      );
      return {
        statusCode: result.success ? 200 : 400,
        body: result,
      };
    }

    // -------------------------------------------------------------
    // Consolidated Admin Data (Dashboard initial fetch)
    // -------------------------------------------------------------
    if (pathname === "/api/admin/data" && method === "POST") {
      const isAuthorized = await verifyAdminKey(String(body.adminKey || ""));
      if (!isAuthorized) {
        return {
          statusCode: 401,
          body: { success: false, error: "Unauthorized: Invalid Admin Security Key" },
        };
      }

      const feedbackData = await getAdminFeedbackListDirect({
        adminKey: String(body.adminKey || ""),
        filterType: String(body.filterType || "all"),
      });

      const analyticsData = await getAdminAnalyticsDirect(String(body.adminKey || ""));

      return {
        statusCode: 200,
        headers: NO_CACHE_HEADERS,
        body: {
          success: true,
          items: feedbackData.items,
          stats: feedbackData.stats,
          analytics: analyticsData.analytics,
        },
      };
    }

    if (pathname === "/api/admin/delete-feedback" && method === "POST") {
      const result = await deleteFeedbackDirect({
        adminKey: String(body.adminKey || ""),
        id: String(body.id || ""),
      });
      return {
        statusCode: 200,
        body: result,
      };
    }

    // -------------------------------------------------------------
    // Feedback Endpoints
    // -------------------------------------------------------------
    if (
      (pathname === "/api/feedback/submit" || pathname === "/api/feedback") &&
      method === "POST"
    ) {
      const result = await submitFeedbackDirect(body);
      return {
        statusCode: 200,
        body: result,
      };
    }

    // -------------------------------------------------------------
    // Promotions Endpoints
    // -------------------------------------------------------------
    if (pathname === "/api/promotions/active") {
      const result = await getActivePromotionsDirect();
      return {
        statusCode: 200,
        body: result,
      };
    }

    if (pathname === "/api/promotions/click" && method === "POST") {
      const result = await recordPromotionClickDirect(String(body.id || ""));
      return {
        statusCode: 200,
        body: result,
      };
    }

    if (
      (pathname === "/api/promotions/admin-list" || pathname === "/api/admin/promotions/list") &&
      method === "POST"
    ) {
      const result = await getAdminPromotionsListDirect(String(body.adminKey || ""));
      return {
        statusCode: 200,
        body: result,
      };
    }

    if (pathname === "/api/promotions/save" && method === "POST") {
      const result = await savePromotionDirect(
        String(body.adminKey || ""),
        (body.promotion as Record<string, unknown>) || body,
      );
      return {
        statusCode: 200,
        body: result,
      };
    }

    if (pathname === "/api/promotions/reorder" && method === "POST") {
      const result = await reorderPromotionsDirect(
        String(body.adminKey || ""),
        Array.isArray(body.orderedIds) ? body.orderedIds.map(String) : [],
      );
      return {
        statusCode: 200,
        body: result,
      };
    }

    if (pathname === "/api/promotions/toggle-active" && method === "POST") {
      const result = await togglePromotionActiveDirect(
        String(body.adminKey || ""),
        String(body.id || ""),
        Boolean(body.isActive),
      );
      return {
        statusCode: 200,
        body: result,
      };
    }

    if (pathname === "/api/promotions/delete" && method === "POST") {
      const result = await deletePromotionDirect(
        String(body.adminKey || ""),
        String(body.id || ""),
      );
      return {
        statusCode: 200,
        body: result,
      };
    }

    // -------------------------------------------------------------
    // Student Profiles Endpoints
    // -------------------------------------------------------------
    if (pathname === "/api/profile/save" && method === "POST") {
      const result = await saveStudentProfileDirect(
        String(body.enrollmentNumber || ""),
        String(body.branch || ""),
      );
      return {
        statusCode: 200,
        body: result,
      };
    }

    if (
      (pathname === "/api/profile/admin-list" || pathname === "/api/admin/profiles/list") &&
      method === "POST"
    ) {
      const result = await getSavedStudentProfilesDirect(String(body.adminKey || ""));
      return {
        statusCode: 200,
        body: result,
      };
    }

    // -------------------------------------------------------------
    // Analytics & Live Sessions Endpoints
    // -------------------------------------------------------------
    if (pathname === "/api/analytics/visit" && method === "POST") {
      const eventId = String(body.visitEventId || body.sessionId || "").trim();
      const result = await recordVisitDirect({
        visitorId: String(body.visitorId || ""),
        visitEventId: eventId,
        sessionId: eventId,
        isNewSession: Boolean(body.isNewSession),
      });
      return {
        statusCode: 200,
        headers: NO_CACHE_HEADERS,
        body: result,
      };
    }

    if (
      (pathname === "/api/analytics/admin-summary" ||
        pathname === "/api/admin/analytics/summary") &&
      method === "POST"
    ) {
      const result = await getAdminAnalyticsDirect(String(body.adminKey || ""));
      return {
        statusCode: 200,
        headers: NO_CACHE_HEADERS,
        body: result,
      };
    }

    if (pathname === "/api/live/heartbeat" && method === "POST") {
      const activeCount = await recordActiveStudentHeartbeat(String(body.visitorId || ""));
      return {
        statusCode: 200,
        headers: NO_CACHE_HEADERS,
        body: { success: true, activeCount },
      };
    }

    if (pathname === "/api/live/leave" && method === "POST") {
      const activeCount = await removeActiveStudent(String(body.visitorId || ""));
      return {
        statusCode: 200,
        headers: NO_CACHE_HEADERS,
        body: { success: true, activeCount },
      };
    }

    // -------------------------------------------------------------
    // TanStack Start RPC (/_serverFn/:id or /_server/*)
    // -------------------------------------------------------------
    if (pathname.startsWith("/_serverFn/") || pathname.startsWith("/_server/")) {
      const prefix = pathname.startsWith("/_serverFn/") ? "/_serverFn/" : "/_server/";
      const serverFnId = pathname.slice(prefix.length).split("/")[0].trim();

      // TanStack Start sends payload in { data: ... } or raw body or query
      const rpcPayload = (body && "data" in body ? body.data : body) || query;

      const handler = SERVER_FN_ID_MAP[serverFnId];
      if (handler) {
        const result = await handler(rpcPayload);
        return {
          statusCode: 200,
          headers: NO_CACHE_HEADERS,
          body: result,
        };
      }

      // If ID is not in direct map, return a graceful response rather than 404 HTML
      console.warn(`[ApiRouter] Unrecognized serverFn ID: ${serverFnId}`);
      return {
        statusCode: 200,
        headers: NO_CACHE_HEADERS,
        body: { success: false, error: `Handler not registered for ${serverFnId}` },
      };
    }

    // Default 404 for unmatched API routes
    return {
      statusCode: 404,
      headers: NO_CACHE_HEADERS,
      body: { success: false, error: `API route not found: ${pathname}` },
    };
  } catch (err: unknown) {
    console.error(`[ApiRouter] Error handling ${pathname}:`, err);
    const message = err instanceof Error ? err.message : "Internal Server Error";
    return {
      statusCode: 500,
      headers: NO_CACHE_HEADERS,
      body: { success: false, error: message },
    };
  }
}
