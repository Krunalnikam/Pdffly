import { recordVisitServerFn } from "./analytics-server";

export const VISITOR_ID_KEY = "pdfly_anon_visitor_id";
export const LEGACY_VISITOR_ID_KEY = "pdfmaker_anon_visitor_id";
export const COOKIE_NAME = "pdfly_vid";

export const SESSION_ID_KEY = "pdfly_anon_session_id";
export const SESSION_LAST_ACTIVE_KEY = "pdfly_session_last_active";

// 30 minutes in milliseconds for session inactivity expiration
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

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
 * Ensures the same user on the same device/browser remains ONE unique user across reloads and visits.
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

// In-memory guard to deduplicate tracking calls during the same page load
let hasTrackedThisPageLoad = false;
let trackingPromise: Promise<void> | null = null;

/**
 * Initializes and records website visitor analytics in the background.
 * Privacy-friendly: Does not collect PII, passwords, documents, or personal data.
 * - Same browser/device: 1 unique user.
 * - Refresh: same active session (Visits stays unchanged).
 * - Leave and return in a new session (>30 min or after tab close): Visits +1.
 * - Admin route access: strictly excluded.
 */
export function trackWebsiteVisit(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  if (typeof navigator !== "undefined" && !navigator.onLine) return Promise.resolve();

  // STRICT ADMIN EXCLUSION: Admin dashboard access must NEVER count as a public visitor or session
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

  // Deduplicate calls within the same page load
  if (hasTrackedThisPageLoad && trackingPromise) {
    return trackingPromise;
  }
  hasTrackedThisPageLoad = true;

  const runTracking = async () => {
    try {
      const visitorId = getOrCreateVisitorId();
      const now = Date.now();

      // Check session status
      let sessionId = "";
      let isNewSession = false;

      let storedSession: string | null = null;
      let lastActive = 0;

      try {
        storedSession = sessionStorage.getItem(SESSION_ID_KEY);
        const lastActiveStr =
          localStorage.getItem(SESSION_LAST_ACTIVE_KEY) ||
          sessionStorage.getItem(SESSION_LAST_ACTIVE_KEY);
        lastActive = lastActiveStr ? parseInt(lastActiveStr, 10) : 0;
      } catch {
        // Storage access error
      }

      if (!storedSession || isNaN(lastActive) || now - lastActive > SESSION_TIMEOUT_MS) {
        // Brand new session: either first visit, or user returned after > 30 minutes of inactivity
        sessionId = generateRandomId("ses");
        isNewSession = true;
        try {
          sessionStorage.setItem(SESSION_ID_KEY, sessionId);
          sessionStorage.setItem(SESSION_LAST_ACTIVE_KEY, String(now));
          localStorage.setItem(SESSION_LAST_ACTIVE_KEY, String(now));
        } catch {
          // ignore
        }
      } else {
        // Existing active session within 30 minutes timeout
        sessionId = storedSession;
        isNewSession = false;
        try {
          sessionStorage.setItem(SESSION_LAST_ACTIVE_KEY, String(now));
          localStorage.setItem(SESSION_LAST_ACTIVE_KEY, String(now));
        } catch {
          // ignore
        }
      }

      const payload = {
        visitorId,
        sessionId,
        isNewSession,
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
      }, 500);
    }
  });

  return trackingPromise;
}
