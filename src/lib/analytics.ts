import { recordVisitServerFn } from "./analytics-server";

export const VISITOR_ID_KEY = "pdfly_anon_visitor_id";
export const LEGACY_VISITOR_ID_KEY = "pdfmaker_anon_visitor_id";
export const COOKIE_NAME = "pdfly_vid";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[2]) : null;
  } catch {
    return null;
  }
}

function setCookie(name: string, value: string, days: number = 365): void {
  if (typeof document === "undefined") return;
  try {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
  } catch {
    // Cookie write blocked
  }
}

function generateRandomId(prefix: string): string {
  const rand = Math.random().toString(36).substring(2, 10);
  const time = Date.now().toString(36);
  return `${prefix}_${time}_${rand}`;
}

/**
 * Gets or creates a persistent anonymous user ID stored in both localStorage and first-party cookie.
 * Ensures the same user on the same device/browser remains ONE unique user across reloads,
 * browser restarts, and return visits.
 */
export function getOrCreateVisitorId(): string {
  if (typeof window === "undefined") return "vis_anon";

  let visitorId = "";

  // 1. Try modern localStorage key
  try {
    visitorId = localStorage.getItem(VISITOR_ID_KEY) || "";
  } catch {
    // localStorage may be disabled
  }

  // 2. Try legacy localStorage key for backwards compatibility
  if (!visitorId) {
    try {
      visitorId = localStorage.getItem(LEGACY_VISITOR_ID_KEY) || "";
    } catch {
      // ignore
    }
  }

  // 3. Try first-party cookie
  if (!visitorId) {
    visitorId = getCookie(COOKIE_NAME) || "";
  }

  // 4. Generate new stable anonymous ID if not found
  if (!visitorId) {
    visitorId = generateRandomId("vis");
  }

  // Synchronize across both localStorage and Cookie for maximum persistence
  try {
    localStorage.setItem(VISITOR_ID_KEY, visitorId);
    localStorage.setItem(LEGACY_VISITOR_ID_KEY, visitorId);
  } catch {
    // ignore
  }
  setCookie(COOKIE_NAME, visitorId, 365);

  return visitorId;
}

/**
 * Unique identifier for THIS specific page load execution context.
 * - Refreshing, reopening the tab, or reopening the browser creates a new JS execution context
 *   which generates a new event ID, counting as a new visit.
 * - Accidental duplicate requests during the same page load (React StrictMode, re-renders,
 *   retries, component lifecycle) share this exact event ID and are deduplicated on the server.
 */
export const CURRENT_PAGE_VISIT_EVENT_ID: string =
  typeof window !== "undefined" ? generateRandomId("pve") : "pve_init";

// In-memory guard to deduplicate tracking calls during the same page load
let hasTrackedThisPageLoad = false;
let trackingPromise: Promise<void> | null = null;

/**
 * Initializes and records website visitor analytics in the background.
 * Privacy-friendly: Does not collect PII, passwords, documents, or personal data.
 *
 * Rules:
 * 1. Same browser/device = ONE unique user.
 * 2. EVERY new website page load/entry = ONE visit.
 * 3. Multiple identical tracking requests from the same page load = ONE visit (deduplicated by event ID).
 * 4. Admin activity = strictly excluded.
 */
export function trackWebsiteVisit(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (typeof navigator !== "undefined" && !navigator.onLine) return Promise.resolve();

  // STRICT ADMIN EXCLUSION: Admin dashboard access must NEVER count as a public visitor or visit
  const pathname = window.location.pathname.toLowerCase();
  if (
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname.includes("/admin") ||
    window.location.hash.toLowerCase().includes("admin")
  ) {
    return Promise.resolve();
  }
  try {
    if (sessionStorage.getItem("pdfmaker_admin_passkey")) {
      return Promise.resolve();
    }
  } catch {
    // ignore
  }

  // Deduplicate calls within the same page load on the client side
  if (hasTrackedThisPageLoad && trackingPromise) {
    return trackingPromise;
  }
  hasTrackedThisPageLoad = true;

  const runTracking = async () => {
    try {
      const visitorId = getOrCreateVisitorId();
      const visitEventId = CURRENT_PAGE_VISIT_EVENT_ID;

      const payload = {
        visitorId,
        visitEventId,
        sessionId: visitEventId, // backwards compatibility alias
      };

      // 1. Dispatch to REST endpoint
      try {
        const resp = await fetch("/api/analytics/visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (resp.ok) return;
      } catch {
        // Fall back to serverFn
      }

      // 2. Server function fallback
      await recordVisitServerFn({
        data: payload,
      });
    } catch {
      // Silently ignore analytics network failures to maintain smooth user experience
    }
  };

  trackingPromise = new Promise<void>((resolve) => {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => {
        runTracking().finally(resolve);
      });
    } else {
      setTimeout(() => {
        runTracking().finally(resolve);
      }, 300);
    }
  });

  return trackingPromise;
}
