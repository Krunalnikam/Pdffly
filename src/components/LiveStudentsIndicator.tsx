import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/i18n";
import {
  pingActiveStudentHeartbeatServerFn,
  leaveActiveStudentServerFn,
} from "@/lib/analytics-server";
import { getOrCreateVisitorId } from "@/lib/analytics";

const HEARTBEAT_INTERVAL_MS = 15000; // 15 seconds for timely updates
const THRESHOLD_COUNT = 50; // Only display if 50 or more active students

export function LiveStudentsIndicator() {
  const { t } = useLanguage();
  const [liveCount, setLiveCount] = useState<number>(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    const visitorId = getOrCreateVisitorId();

    const sendHeartbeat = async () => {
      if (typeof navigator !== "undefined" && !navigator.onLine) return;

      // 1. Try REST endpoint
      try {
        const resp = await fetch("/api/live/heartbeat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ visitorId }),
        });
        if (resp.ok) {
          const json = await resp.json();
          if (isMountedRef.current && json && typeof json.activeCount === "number") {
            setLiveCount(json.activeCount);
            return;
          }
        }
      } catch {
        // Fall back to serverFn
      }

      // 2. Server function fallback
      try {
        const res = await pingActiveStudentHeartbeatServerFn({
          data: { visitorId },
        });
        if (isMountedRef.current && res && typeof res.activeCount === "number") {
          setLiveCount(res.activeCount);
        }
      } catch {
        // Silently ignore network failures to avoid disturbing the student
      }
    };

    // Initial ping on load
    sendHeartbeat();

    // Periodic heartbeat every 15 seconds for real-time tracking
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        sendHeartbeat();
      }
    }, HEARTBEAT_INTERVAL_MS);

    // Immediate ping on visibility change (student returns to tab)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        sendHeartbeat();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Notify server when student closes or navigates away
    const handleUnload = () => {
      try {
        if (typeof navigator !== "undefined" && navigator.sendBeacon) {
          navigator.sendBeacon(
            "/api/live/leave",
            new Blob([JSON.stringify({ visitorId })], { type: "application/json" }),
          );
        } else {
          leaveActiveStudentServerFn({
            data: { visitorId },
          }).catch(() => {});
        }
      } catch {
        // ignore
      }
    };
    window.addEventListener("pagehide", handleUnload);
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      isMountedRef.current = false;
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handleUnload);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  // Display Rule:
  // - If active students < 50: Completely hide the badge.
  // - If active students >= 50: Show "🟢 [REAL COUNT] students are currently using PDFly"
  // - If the count falls below 50, immediately hide the badge again.
  // Never show any static, hard-coded, or simulated fallback number.
  if (liveCount < THRESHOLD_COUNT) {
    return null;
  }

  return (
    <div
      id="indicator-live-students"
      className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/25 shadow-2xs transition-all duration-300 animate-fade-in select-none"
      role="status"
      aria-live="polite"
      title={`${liveCount} students are currently using PDFly`}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <span className="tabular-nums font-medium">
        {t("liveStudentsUsing", { count: liveCount })}
      </span>
    </div>
  );
}
