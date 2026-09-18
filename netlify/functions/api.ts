import * as crypto from "node:crypto";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import {
  verifyAdminKey,
  executeVerifyRecoveryCode,
  executeAdminPasswordReset,
  getRegisteredAdminEmail,
  maskEmail,
  readStoredAuth,
} from "../../src/lib/admin-auth-store";

// CORS Headers
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With, Accept, Origin",
  "Content-Type": "application/json; charset=utf-8",
};

interface ApiResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

function getDataDir(): string {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "pdfly-data");
  }
  return path.join(process.cwd(), "data");
}

interface StoredItemRecord {
  id: string;
  type?: string;
  rating?: number;
  message?: string;
  email?: string;
  timestamp?: string;
  language?: string;
  [key: string]: unknown;
}

// Helpers for feedback data
async function readFeedbacks(): Promise<StoredItemRecord[]> {
  const primaryPath = path.join(getDataDir(), "feedback.json");
  try {
    const content = await fs.readFile(primaryPath, "utf-8");
    const parsed = JSON.parse(content);
    if (Array.isArray(parsed)) return parsed as StoredItemRecord[];
  } catch {
    const seedPath = path.join(process.cwd(), "data", "feedback.json");
    try {
      const content = await fs.readFile(seedPath, "utf-8");
      const parsed = JSON.parse(content);
      if (Array.isArray(parsed)) return parsed as StoredItemRecord[];
    } catch {
      // not found
    }
  }
  return [];
}

async function writeFeedbacks(items: StoredItemRecord[]): Promise<void> {
  const primaryPath = path.join(getDataDir(), "feedback.json");
  try {
    await fs.mkdir(getDataDir(), { recursive: true });
    await fs.writeFile(primaryPath, JSON.stringify(items, null, 2), "utf-8");
  } catch {
    const tmp = path.join(os.tmpdir(), "pdfly-data", "feedback.json");
    await fs.mkdir(path.dirname(tmp), { recursive: true });
    await fs.writeFile(tmp, JSON.stringify(items, null, 2), "utf-8");
  }
}

// Helpers for analytics data
async function readAnalytics(): Promise<Record<string, unknown> | null> {
  const primaryPath = path.join(getDataDir(), "analytics.json");
  try {
    const content = await fs.readFile(primaryPath, "utf-8");
    return JSON.parse(content) as Record<string, unknown>;
  } catch {
    const seedPath = path.join(process.cwd(), "data", "analytics.json");
    try {
      const content = await fs.readFile(seedPath, "utf-8");
      return JSON.parse(content) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
}

interface SsrHandler {
  default: {
    fetch: (req: Request) => Promise<Response>;
  };
}

// Lazy loaded TanStack Start SSR module for handling /_serverFn RPC
let ssrModule: SsrHandler | null = null;
let ssrLoadAttempted = false;

async function getSsr(): Promise<SsrHandler | null> {
  if (!ssrLoadAttempted) {
    ssrLoadAttempted = true;
    try {
      const ssrPath = path.resolve(process.cwd(), "dist/server/_ssr/ssr.mjs");
      ssrModule = (await import(ssrPath)) as SsrHandler;
    } catch {
      try {
        const fallbackPath = "./_ssr/ssr.mjs";
        ssrModule = (await import(fallbackPath)) as SsrHandler;
      } catch {
        ssrModule = null;
      }
    }
  }
  return ssrModule;
}

/**
 * Main API request processor.
 * Always guarantees JSON responses.
 */
export async function processRequest(
  method: string,
  pathname: string,
  bodyText: string | null,
  rawRequest?: Request,
): Promise<ApiResponse> {
  // Handle OPTIONS preflight
  if (method === "OPTIONS") {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: "",
    };
  }

  // Normalize path
  let cleanPath = pathname;
  if (cleanPath.startsWith("/.netlify/functions/api")) {
    cleanPath = cleanPath.slice("/.netlify/functions/api".length);
  }
  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
  }
  if (cleanPath.endsWith("/") && cleanPath.length > 1) {
    cleanPath = cleanPath.slice(0, -1);
  }

  // 0. Forward /_serverFn or /_server requests to TanStack Start SSR runner if available
  if (cleanPath.startsWith("/_serverFn") || cleanPath.startsWith("/_server")) {
    const ssr = await getSsr();
    if (ssr && ssr.default && typeof ssr.default.fetch === "function") {
      try {
        const fetchReq =
          rawRequest ||
          new Request(`http://localhost:3000${cleanPath}`, {
            method,
            headers: {
              "content-type": "application/json",
              origin: "http://localhost:3000",
              referer: "http://localhost:3000/",
            },
            body: bodyText,
          });
        const ssrRes = await ssr.default.fetch(fetchReq);
        const resText = await ssrRes.text();
        const headersMap: Record<string, string> = { ...CORS_HEADERS };
        ssrRes.headers.forEach((val, key) => {
          headersMap[key] = val;
        });
        return {
          statusCode: ssrRes.status,
          headers: headersMap,
          body: resText,
        };
      } catch (err: unknown) {
        console.error("SSR dispatch error:", err);
      }
    }
  }

  // Parse JSON body if present
  let body: Record<string, unknown> = {};
  if (bodyText && bodyText.trim()) {
    try {
      body = JSON.parse(bodyText) as Record<string, unknown>;
    } catch {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: "Malformed JSON in request body",
        }),
      };
    }
  }

  // 1. POST /api/admin/verify-key
  if (cleanPath === "/admin/verify-key" || cleanPath.endsWith("/verify-key")) {
    const adminKey = String(body.adminKey || "").trim();
    const authorized = await verifyAdminKey(adminKey);
    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        authorized,
      }),
    };
  }

  // 2. POST /api/admin/verify-recovery-code
  if (cleanPath === "/admin/verify-recovery-code" || cleanPath.endsWith("/verify-recovery-code")) {
    const recoveryCode = String(body.recoveryCode || "").trim();
    const result = await executeVerifyRecoveryCode(recoveryCode);

    if (!result.success) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: result.error || "Invalid Recovery Code.",
        }),
      };
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        resetToken: result.resetToken,
        registeredEmail: result.registeredEmail,
        message: "Recovery Code validated successfully.",
      }),
    };
  }

  // 3. POST /api/admin/reset-password
  if (cleanPath === "/admin/reset-password" || cleanPath.endsWith("/reset-password")) {
    const resetToken = String(body.resetToken || "").trim();
    const newPassword = String(body.newPassword || "");
    const confirmPassword = String(body.confirmPassword || "");

    const result = await executeAdminPasswordReset({
      resetToken,
      newPassword,
      confirmPassword,
    });

    if (!result.success) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: result.error || "Failed to reset password.",
        }),
      };
    }

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        message: result.message || "Admin password reset and persisted successfully.",
      }),
    };
  }

  // 4. POST /api/admin/data (Consolidated data loader for admin dashboard)
  if (cleanPath === "/admin/data" || cleanPath.endsWith("/admin/data")) {
    const adminKey = String(body.adminKey || "").trim();
    const isAuthorized = await verifyAdminKey(adminKey);
    if (!isAuthorized) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: "Unauthorized: Invalid admin credentials",
        }),
      };
    }

    const items = await readFeedbacks();
    const filterType = String(body.filterType || "all");

    // Calculate statistics
    const total = items.length;
    const totalRatingSum = items.reduce((acc, item) => acc + (Number(item.rating) || 0), 0);
    const averageRating = total > 0 ? Number((totalRatingSum / total).toFixed(1)) : 0;
    const bugsCount = items.filter((i) => i.type === "bug").length;
    const featuresCount = items.filter((i) => i.type === "feature").length;
    const improvementsCount = items.filter((i) => i.type === "improvement").length;
    const generalCount = items.filter((i) => i.type === "general").length;

    const stats = {
      total,
      averageRating,
      bugsCount,
      featuresCount,
      improvementsCount,
      generalCount,
    };

    let filtered = items;
    if (filterType && filterType !== "all") {
      filtered = items.filter((i) => i.type === filterType);
    }

    const analytics = await readAnalytics();

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        items: filtered,
        stats,
        analytics,
      }),
    };
  }

  // 5. POST /api/admin/delete-feedback
  if (cleanPath === "/admin/delete-feedback" || cleanPath.endsWith("/delete-feedback")) {
    const adminKey = String(body.adminKey || "").trim();
    const isAuthorized = await verifyAdminKey(adminKey);
    if (!isAuthorized) {
      return {
        statusCode: 401,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          success: false,
          error: "Unauthorized: Invalid admin credentials",
        }),
      };
    }

    const id = String(body.id || "");
    const items = await readFeedbacks();
    const updated = items.filter((i) => i.id !== id);
    await writeFeedbacks(updated);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: true, message: "Feedback deleted" }),
    };
  }

  // Fallback for unhandled API routes — ALWAYS JSON, NEVER HTML!
  return {
    statusCode: 404,
    headers: CORS_HEADERS,
    body: JSON.stringify({
      success: false,
      error: `API route not found: ${cleanPath}`,
    }),
  };
}

// Netlify Functions v1 export
export const handler = async (event: {
  httpMethod: string;
  path: string;
  body: string | null;
}): Promise<ApiResponse> => {
  try {
    return await processRequest(event.httpMethod, event.path, event.body);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({ success: false, error: msg }),
    };
  }
};

// Netlify Functions v2 default export (Web standard Request / Response)
export default async function (request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const bodyText =
      request.method !== "GET" && request.method !== "HEAD" && request.method !== "OPTIONS"
        ? await request.text()
        : null;

    const res = await processRequest(request.method, url.pathname, bodyText, request);
    return new Response(res.body, {
      status: res.statusCode,
      headers: res.headers,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal Server Error";
    return new Response(JSON.stringify({ success: false, error: msg }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}
