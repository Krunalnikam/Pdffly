/**
 * Canonical Site URL resolver for Open Graph, Twitter Cards, and SEO meta tags.
 * Works across:
 * - Netlify deployments (auto-detects Netlify's `process.env.URL` and `DEPLOY_PRIME_URL`)
 * - Custom domain or user-defined `process.env.SITE_URL` or `VITE_SITE_URL`
 * - Real-time incoming SSR request host/headers via `src/server.ts`
 * - Client-side browser navigation (`window.location.origin`)
 * - Container development/shared preview environments
 */

let requestOrigin = "";

export function setRequestOrigin(origin: string | undefined | null): void {
  if (!origin) return;
  const cleaned = origin.trim().replace(/\/$/, "");
  if (!cleaned) return;
  // Prefer non-localhost origins if already set, but keep if nothing else
  if (!requestOrigin || (!cleaned.includes("localhost") && !cleaned.includes("127.0.0.1"))) {
    requestOrigin = formatUrl(cleaned);
  }
}

export function formatUrl(urlStr: string): string {
  let formatted = urlStr.trim().replace(/\/$/, "");
  if (
    formatted.startsWith("http://") &&
    !formatted.includes("localhost") &&
    !formatted.includes("127.0.0.1")
  ) {
    formatted = formatted.replace(/^http:\/\//, "https://");
  } else if (!formatted.startsWith("http://") && !formatted.startsWith("https://")) {
    formatted = `https://${formatted}`;
  }
  return formatted;
}

export function getSiteUrl(): string {
  // 1. Explicit user/hosting environment variables
  if (typeof process !== "undefined" && process.env) {
    if (process.env.SITE_URL) return formatUrl(process.env.SITE_URL);
    // Netlify automatically provides URL in production builds & runtime functions
    if (process.env.URL) return formatUrl(process.env.URL);
    if (process.env.DEPLOY_PRIME_URL) return formatUrl(process.env.DEPLOY_PRIME_URL);
  }

  // 2. Vite client environment variables
  try {
    if (
      typeof import.meta !== "undefined" &&
      (import.meta as { env?: Record<string, string> }).env
    ) {
      const vUrl = (import.meta as { env?: Record<string, string> }).env?.VITE_SITE_URL;
      if (vUrl) return formatUrl(vUrl);
    }
  } catch {
    // ignore
  }

  // 3. Dynamic origin captured from the incoming HTTP request during SSR
  if (requestOrigin) {
    return requestOrigin;
  }

  // 4. Cloud Run / AI Studio container environment
  if (typeof process !== "undefined" && process.env && process.env.APP_URL) {
    return formatUrl(process.env.APP_URL);
  }

  // 5. Browser runtime fallback
  if (typeof window !== "undefined" && window.location?.origin) {
    return formatUrl(window.location.origin);
  }

  // 6. Fallback
  return "";
}
