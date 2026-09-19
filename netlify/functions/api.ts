import { handleApiRequest, type ApiRequest } from "../../src/lib/api-router";
import { ensureNetlifyContext } from "../../src/lib/storage-provider";

// CORS & Anti-Cache Headers
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
  "Access-Control-Allow-Headers":
    "Content-Type, Authorization, X-Requested-With, Accept, Origin, x-tsr-serverFn, x-tsr-data",
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
  "Surrogate-Control": "no-store",
  "Netlify-CDN-Cache-Control": "no-store",
};

export interface ApiResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

/**
 * Main API request processor.
 * Always guarantees 100% valid JSON responses — never Netlify 404 HTML.
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

  // Normalize path (handle Netlify functions prefix)
  let cleanPath = pathname;
  if (cleanPath.startsWith("/.netlify/functions/api")) {
    cleanPath = cleanPath.slice("/.netlify/functions/api".length);
  }
  if (!cleanPath.startsWith("/")) {
    cleanPath = `/${cleanPath}`;
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

  // Extract query parameters if available
  const query: Record<string, string> = {};
  if (rawRequest && rawRequest.url) {
    try {
      const url = new URL(rawRequest.url);
      url.searchParams.forEach((val, key) => {
        query[key] = val;
      });
    } catch {
      // Ignore
    }
  }

  // Extract headers
  const headers: Record<string, string | undefined> = {};
  if (rawRequest && rawRequest.headers) {
    rawRequest.headers.forEach((val, key) => {
      headers[key] = val;
    });
  }

  // If path doesn't start with /api and doesn't start with /_server, prepend /api for convenience
  let normalizedPath = cleanPath;
  if (!normalizedPath.startsWith("/api") && !normalizedPath.startsWith("/_server")) {
    normalizedPath = `/api${normalizedPath}`;
  }

  const apiReq: ApiRequest = {
    method,
    pathname: normalizedPath,
    body,
    query,
    headers,
  };

  const response = await handleApiRequest(apiReq);

  const mergedHeaders: Record<string, string> = {
    ...CORS_HEADERS,
    ...(response.headers || {}),
  };

  return {
    statusCode: response.statusCode,
    headers: mergedHeaders,
    body: typeof response.body === "string" ? response.body : JSON.stringify(response.body),
  };
}

// Netlify Functions v1 export
export const handler = async (event: {
  httpMethod: string;
  path: string;
  body: string | null;
  headers?: Record<string, string | undefined>;
  blobs?: string;
}): Promise<ApiResponse> => {
  ensureNetlifyContext(event);
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
  ensureNetlifyContext();
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
