import { createServerFn } from "@tanstack/react-start";
import { verifyAdminKey } from "./admin-auth-server";
import {
  readStorageData,
  writeStorageData,
  getBlobStore,
  readBlobSafe,
  writeBlobSafe,
  isNetlifyProduction,
} from "./storage-provider";
import * as fs from "node:fs/promises";
import * as path from "node:path";

export interface VisitorRecord {
  visitorId: string;
  firstSeen: string; // ISO 8601
  lastSeen: string; // ISO 8601
  totalVisits: number;
  daysVisited: string[]; // List of YYYY-MM-DD
}

export interface VisitEvent {
  id: string;
  visitorId: string;
  sessionId: string;
  timestamp: string; // ISO 8601
  date: string; // YYYY-MM-DD
}

export interface StoredAnalyticsData {
  visitors: Record<string, VisitorRecord>;
  visits: VisitEvent[];
  lastActivity: string; // ISO 8601
  watermarkTotalUsers?: number;
  watermarkTotalVisits?: number;
}

export interface AnalyticsWatermark {
  highestTotalUsers: number;
  highestTotalVisits: number;
  lastUpdated: string;
}

export interface ActivityBucket {
  periodKey: string;
  label: string;
  subLabel?: string;
  uniqueUsers: number;
  visits: number;
}

export interface AnalyticsSummary {
  totalUsers: number;
  totalVisits: number;
  todayUsers: number;
  todayVisits: number;
  lastActivity: string | null;
  dailyVisitors: ActivityBucket[];
  weeklyVisitors: ActivityBucket[];
  monthlyVisitors: ActivityBucket[];
}

// In-process monotonic watermark to strictly prevent any instance from returning lower numbers
let processMonotonicWatermark: StoredAnalyticsData | null = null;

export function updateMonotonicWatermark(incoming: StoredAnalyticsData): StoredAnalyticsData {
  if (!processMonotonicWatermark) {
    processMonotonicWatermark = incoming;
    return incoming;
  }
  processMonotonicWatermark = mergeAnalyticsData(processMonotonicWatermark, incoming);
  return processMonotonicWatermark;
}

// Get current date string formatted as YYYY-MM-DD
function getLocalDateString(d: Date = new Date()): string {
  return d.toISOString().split("T")[0];
}

const DEFAULT_ANALYTICS: StoredAnalyticsData = {
  visitors: {},
  visits: [],
  lastActivity: new Date().toISOString(),
};

/**
 * Pure CRDT-style monotonic set-union merge for analytics data.
 * Guarantees that:
 * 1. Total unique users NEVER decreases.
 * 2. Total visits NEVER decreases.
 * 3. Concurrent requests or cold-started serverless instances never overwrite each other.
 */
export function mergeAnalyticsData(
  base: StoredAnalyticsData,
  incoming: StoredAnalyticsData,
): StoredAnalyticsData {
  const mergedVisitors: Record<string, VisitorRecord> = {};

  // 1. Copy base visitors
  for (const [vid, v] of Object.entries(base.visitors || {})) {
    if (v && v.visitorId) {
      mergedVisitors[vid] = {
        visitorId: v.visitorId,
        firstSeen: v.firstSeen || new Date().toISOString(),
        lastSeen: v.lastSeen || new Date().toISOString(),
        totalVisits: Number(v.totalVisits) || 1,
        daysVisited: Array.isArray(v.daysVisited) ? [...v.daysVisited] : [],
      };
    }
  }

  // 2. Union incoming visitors monotonically
  for (const [vid, v] of Object.entries(incoming.visitors || {})) {
    if (!v || !v.visitorId) continue;
    const existing = mergedVisitors[vid];
    if (!existing) {
      mergedVisitors[vid] = {
        visitorId: v.visitorId,
        firstSeen: v.firstSeen || new Date().toISOString(),
        lastSeen: v.lastSeen || new Date().toISOString(),
        totalVisits: Number(v.totalVisits) || 1,
        daysVisited: Array.isArray(v.daysVisited) ? [...v.daysVisited] : [],
      };
    } else {
      const firstSeen =
        existing.firstSeen && existing.firstSeen < v.firstSeen ? existing.firstSeen : v.firstSeen;
      const lastSeen =
        existing.lastSeen && existing.lastSeen > v.lastSeen ? existing.lastSeen : v.lastSeen;
      const allDays = Array.from(
        new Set([...(existing.daysVisited || []), ...(v.daysVisited || [])]),
      ).sort();
      mergedVisitors[vid] = {
        visitorId: vid,
        firstSeen,
        lastSeen,
        totalVisits: Math.max(existing.totalVisits, Number(v.totalVisits) || 1),
        daysVisited: allDays,
      };
    }
  }

  // 3. Deduplicate and merge visits by unique visit event ID (primary) or session id (secondary)
  const visitMap = new Map<string, VisitEvent>();
  const addVisit = (ve: VisitEvent) => {
    if (!ve) return;
    const key = ve.id ? `id:${ve.id}` : ve.sessionId ? `ses:${ve.sessionId}` : null;
    if (key && !visitMap.has(key)) {
      visitMap.set(key, ve);
    }
  };

  for (const v of base.visits || []) {
    addVisit(v);
  }
  for (const v of incoming.visits || []) {
    addVisit(v);
  }

  const mergedVisits = Array.from(visitMap.values()).sort(
    (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
  );

  // 4. Reconcile totalVisits for each visitor
  for (const visitor of Object.values(mergedVisitors)) {
    const userVisitsCount = mergedVisits.filter((v) => v.visitorId === visitor.visitorId).length;
    visitor.totalVisits = Math.max(visitor.totalVisits, userVisitsCount, 1);
  }

  const lastActivity =
    (base.lastActivity || "") > (incoming.lastActivity || "")
      ? base.lastActivity
      : incoming.lastActivity || new Date().toISOString();

  const watermarkTotalUsers = Math.max(
    base.watermarkTotalUsers || 0,
    incoming.watermarkTotalUsers || 0,
    Object.keys(base.visitors || {}).length,
    Object.keys(incoming.visitors || {}).length,
    Object.keys(mergedVisitors).length,
  );

  const watermarkTotalVisits = Math.max(
    base.watermarkTotalVisits || 0,
    incoming.watermarkTotalVisits || 0,
    (base.visits || []).length,
    (incoming.visits || []).length,
    mergedVisits.length,
  );

  return {
    visitors: mergedVisitors,
    visits: mergedVisits,
    lastActivity,
    watermarkTotalUsers,
    watermarkTotalVisits,
  };
}

/**
 * Authoritatively reads analytics data:
 * - In Netlify production, Netlify Blobs is the ONLY authoritative source of truth.
 * - Production reads NEVER fall back to bundled JSON, data/analytics.json, or /tmp.
 * - Applies monotonic watermark protection so counts can never decrease.
 */
export async function readAnalyticsFromFile(
  bypassCache: boolean = false,
): Promise<StoredAnalyticsData> {
  // 1. Authoritative Production Storage: Netlify Blobs direct read
  if (isNetlifyProduction()) {
    const blobData = await readBlobSafe<StoredAnalyticsData>("analytics-data", true);
    if (
      blobData &&
      typeof blobData === "object" &&
      blobData.visitors &&
      typeof blobData.visitors === "object"
    ) {
      const cleanBlob: StoredAnalyticsData = {
        visitors: blobData.visitors,
        visits: Array.isArray(blobData.visits) ? blobData.visits : [],
        lastActivity: blobData.lastActivity || new Date().toISOString(),
        watermarkTotalUsers: Math.max(
          blobData.watermarkTotalUsers || 0,
          Object.keys(blobData.visitors).length,
        ),
        watermarkTotalVisits: Math.max(
          blobData.watermarkTotalVisits || 0,
          Array.isArray(blobData.visits) ? blobData.visits.length : 0,
        ),
      };
      // Reconcile monotonically with process watermark
      return updateMonotonicWatermark(cleanBlob);
    }

    // In production, if Blobs is empty or initializing, check if a persisted watermark blob exists
    let persistedWatermark: AnalyticsWatermark | null = null;
    try {
      persistedWatermark = await readBlobSafe<AnalyticsWatermark>("analytics-watermark", true);
    } catch {
      // Non-fatal
    }

    if (processMonotonicWatermark) {
      if (persistedWatermark) {
        processMonotonicWatermark.watermarkTotalUsers = Math.max(
          processMonotonicWatermark.watermarkTotalUsers || 0,
          persistedWatermark.highestTotalUsers || 0,
        );
        processMonotonicWatermark.watermarkTotalVisits = Math.max(
          processMonotonicWatermark.watermarkTotalVisits || 0,
          persistedWatermark.highestTotalVisits || 0,
        );
      }
      return processMonotonicWatermark;
    }

    // Production MUST NEVER fall back to bundled JSON (data/analytics.json) or /tmp!
    const cleanDefault: StoredAnalyticsData = {
      ...DEFAULT_ANALYTICS,
      watermarkTotalUsers: persistedWatermark?.highestTotalUsers || 0,
      watermarkTotalVisits: persistedWatermark?.highestTotalVisits || 0,
    };
    return updateMonotonicWatermark(cleanDefault);
  }

  // 2. In non-production environments (local Vite dev server or unit tests), read local storage
  const localParsed = await readStorageData<StoredAnalyticsData>(
    "analytics-data",
    "analytics.json",
    DEFAULT_ANALYTICS,
    bypassCache,
  );

  let result: StoredAnalyticsData = DEFAULT_ANALYTICS;
  if (localParsed && typeof localParsed === "object") {
    result = {
      visitors: localParsed.visitors || {},
      visits: Array.isArray(localParsed.visits) ? localParsed.visits : [],
      lastActivity: localParsed.lastActivity || new Date().toISOString(),
      watermarkTotalUsers: localParsed.watermarkTotalUsers,
      watermarkTotalVisits: localParsed.watermarkTotalVisits,
    };
  }
  return updateMonotonicWatermark(result);
}

/**
 * Writes analytics safely with authoritative Blobs persistence and monotonic union merging.
 */
export async function writeAnalyticsToFile(
  data: StoredAnalyticsData,
): Promise<StoredAnalyticsData> {
  let dataToSave = data;

  // 1. Fetch latest authoritative state from Netlify Blobs with strong consistency and merge monotonically
  try {
    const existingBlob = await readBlobSafe<StoredAnalyticsData>("analytics-data", true);
    if (existingBlob && typeof existingBlob === "object" && existingBlob.visitors) {
      dataToSave = mergeAnalyticsData(existingBlob, dataToSave);
    }
  } catch {
    // Non-fatal
  }

  // 2. Check persisted watermark from Netlify Blobs
  let highestUsers = Math.max(
    dataToSave.watermarkTotalUsers || 0,
    Object.keys(dataToSave.visitors || {}).length,
  );
  let highestVisits = Math.max(
    dataToSave.watermarkTotalVisits || 0,
    (dataToSave.visits || []).length,
    Object.values(dataToSave.visitors || {}).reduce((acc, v) => acc + (v.totalVisits || 0), 0),
  );

  try {
    const wm = await readBlobSafe<AnalyticsWatermark>("analytics-watermark", true);
    if (wm) {
      highestUsers = Math.max(highestUsers, wm.highestTotalUsers || 0);
      highestVisits = Math.max(highestVisits, wm.highestTotalVisits || 0);
    }
  } catch {
    // Non-fatal
  }

  dataToSave.watermarkTotalUsers = highestUsers;
  dataToSave.watermarkTotalVisits = highestVisits;

  // Reconcile with process monotonic watermark
  dataToSave = updateMonotonicWatermark(dataToSave);

  // Cap recent visits at 10,000 to prevent unbounded memory growth while keeping history intact
  if (dataToSave.visits.length > 10000) {
    dataToSave.visits = dataToSave.visits.slice(-10000);
  }

  // 3. Persist to Netlify Blobs as authoritative cloud storage
  await writeBlobSafe("analytics-data", dataToSave);

  // 4. Persist separate monotonic watermark to Netlify Blobs
  const watermarkPayload: AnalyticsWatermark = {
    highestTotalUsers: highestUsers,
    highestTotalVisits: highestVisits,
    lastUpdated: new Date().toISOString(),
  };
  await writeBlobSafe("analytics-watermark", watermarkPayload);

  // 5. In local dev environment only, write to storage provider
  if (!isNetlifyProduction()) {
    await writeStorageData("analytics-data", "analytics.json", dataToSave);
  }

  return dataToSave;
}

// Active window threshold: A student is considered active if a heartbeat was received within 45 seconds
const ACTIVE_STUDENT_TIMEOUT_MS = 45 * 1000;
const activeStudentsMap = new Map<string, number>();
let isSessionsInitialized = false;

async function loadActiveSessions(): Promise<void> {
  if (isSessionsInitialized) return;
  isSessionsInitialized = true;
  try {
    const parsed = await readStorageData<Record<string, number>>(
      "active-sessions",
      "active-sessions.json",
      {},
    );
    if (parsed && typeof parsed === "object") {
      const now = Date.now();
      for (const [id, lastSeen] of Object.entries(parsed)) {
        const ts = Number(lastSeen);
        if (id && Number.isFinite(ts) && now - ts <= ACTIVE_STUDENT_TIMEOUT_MS) {
          activeStudentsMap.set(id, ts);
        }
      }
    }
  } catch {
    // Clean start
  }
}

async function persistActiveSessions(): Promise<void> {
  const serialized: Record<string, number> = {};
  for (const [id, lastSeen] of activeStudentsMap.entries()) {
    serialized[id] = lastSeen;
  }
  await writeStorageData("active-sessions", "active-sessions.json", serialized);
}

export function cleanAndGetActiveStudentsCount(): number {
  const now = Date.now();
  for (const [id, lastSeen] of activeStudentsMap.entries()) {
    if (now - lastSeen > ACTIVE_STUDENT_TIMEOUT_MS) {
      activeStudentsMap.delete(id);
    }
  }
  return activeStudentsMap.size;
}

export async function recordActiveStudentHeartbeat(visitorId: string): Promise<number> {
  await loadActiveSessions();
  if (visitorId && typeof visitorId === "string" && visitorId.trim()) {
    activeStudentsMap.set(visitorId.trim(), Date.now());
  }
  const count = cleanAndGetActiveStudentsCount();
  await persistActiveSessions();
  return count;
}

export async function removeActiveStudent(visitorId: string): Promise<number> {
  await loadActiveSessions();
  if (visitorId && typeof visitorId === "string" && visitorId.trim()) {
    activeStudentsMap.delete(visitorId.trim());
  }
  const count = cleanAndGetActiveStudentsCount();
  await persistActiveSessions();
  return count;
}

// In-process sequential queue lock to prevent local race conditions during concurrent requests
let visitProcessingLock = Promise.resolve();

export async function recordVisitDirect(data: {
  visitorId: string;
  visitEventId?: string;
  sessionId?: string;
  isNewSession?: boolean;
}): Promise<{ success: boolean; recorded: boolean }> {
  return new Promise((resolve, reject) => {
    visitProcessingLock = visitProcessingLock
      .then(async () => {
        const rawVisitorId = String(data.visitorId || "").trim();
        const rawEventId = String(data.visitEventId || data.sessionId || "").trim();

        const visitorId = rawVisitorId.slice(0, 64) || `v_${Date.now()}`;
        const visitEventId =
          rawEventId.slice(0, 64) ||
          `pve_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

        const now = new Date();
        const nowIso = now.toISOString();
        const todayStr = getLocalDateString(now);

        // Read latest state directly (bypassing stale memory cache)
        const store = await readAnalyticsFromFile(true);

        const existingVisitor = store.visitors[visitorId];
        if (existingVisitor) {
          existingVisitor.lastSeen = nowIso;
          if (!existingVisitor.daysVisited.includes(todayStr)) {
            existingVisitor.daysVisited.push(todayStr);
          }
        } else {
          // New unique anonymous user on a new browser/device
          store.visitors[visitorId] = {
            visitorId,
            firstSeen: nowIso,
            lastSeen: nowIso,
            totalVisits: 0, // incremented below when the visit event is recorded
            daysVisited: [todayStr],
          };
        }

        let recordedNewVisit = false;
        // DUPLICATE REQUEST PROTECTION:
        // A single page load has one unique visitEventId.
        // If multiple requests with this same event ID arrive (React re-render, retries, etc.),
        // only the first request records a visit.
        const eventAlreadyRecorded = store.visits.some(
          (v) => v.id === visitEventId || v.sessionId === visitEventId,
        );

        if (!eventAlreadyRecorded) {
          // Every intentional new page load/entry creates exactly ONE visit
          store.visits.push({
            id: visitEventId,
            sessionId: visitEventId,
            visitorId,
            timestamp: nowIso,
            date: todayStr,
          });

          const targetVisitor = store.visitors[visitorId];
          if (targetVisitor) {
            targetVisitor.totalVisits = (targetVisitor.totalVisits || 0) + 1;
          }
          recordedNewVisit = true;
        }

        store.lastActivity = nowIso;

        // Monotonically write to storage (merges with Netlify Blobs if remote has newer items)
        await writeAnalyticsToFile(store);
        await recordActiveStudentHeartbeat(visitorId);

        resolve({
          success: true,
          recorded: recordedNewVisit,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export async function getAdminAnalyticsDirect(adminKey: string): Promise<{
  success: boolean;
  analytics: AnalyticsSummary;
}> {
  const isAuthorized = await verifyAdminKey(adminKey);
  if (!isAuthorized) {
    throw new Error("Unauthorized: Invalid Admin Security Key");
  }

  // Read authoritative data directly
  const store = await readAnalyticsFromFile(true);
  const now = new Date();
  const todayStr = getLocalDateString(now);

  const allVisitors = Object.values(store.visitors);
  const computedUsers = allVisitors.length;
  const computedVisits = Math.max(
    store.visits.length,
    allVisitors.reduce((sum, v) => sum + (v.totalVisits || 0), 0),
  );

  let watermarkUsers = store.watermarkTotalUsers || 0;
  let watermarkVisits = store.watermarkTotalVisits || 0;
  try {
    const wm = await readBlobSafe<AnalyticsWatermark>("analytics-watermark", true);
    if (wm) {
      watermarkUsers = Math.max(watermarkUsers, wm.highestTotalUsers || 0);
      watermarkVisits = Math.max(watermarkVisits, wm.highestTotalVisits || 0);
    }
  } catch {
    // Non-fatal
  }

  const totalUsers = Math.max(computedUsers, watermarkUsers);
  const totalVisits = Math.max(computedVisits, watermarkVisits);

  const todayUsers = allVisitors.filter((v) => v.daysVisited.includes(todayStr)).length;
  const todayVisits = store.visits.filter((v) => v.date === todayStr).length;

  const dailyVisitors: ActivityBucket[] = [];
  for (let i = 13; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dateStr = getLocalDateString(d);
    const monthShort = d.toLocaleString("en-US", { month: "short" });
    const dayNum = d.getDate();

    const uniqueInDay = allVisitors.filter((v) => v.daysVisited.includes(dateStr)).length;
    const visitsInDay = store.visits.filter((v) => v.date === dateStr).length;

    dailyVisitors.push({
      periodKey: dateStr,
      label: `${monthShort} ${dayNum}`,
      subLabel: d.toLocaleString("en-US", { weekday: "short" }),
      uniqueUsers: uniqueInDay,
      visits: visitsInDay,
    });
  }

  const weeklyVisitors: ActivityBucket[] = [];
  for (let w = 7; w >= 0; w--) {
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - (w * 7 + weekStart.getDay()));
    weekStart.setHours(0, 0, 0, 0);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weekEnd.setHours(23, 59, 59, 999);

    const startStr = getLocalDateString(weekStart);
    const endStr = getLocalDateString(weekEnd);

    const startMonth = weekStart.toLocaleString("en-US", { month: "short" });
    const endMonth = weekEnd.toLocaleString("en-US", { month: "short" });

    const label =
      startMonth === endMonth
        ? `${startMonth} ${weekStart.getDate()}-${weekEnd.getDate()}`
        : `${startMonth} ${weekStart.getDate()} - ${endMonth} ${weekEnd.getDate()}`;

    const visitsInWeek = store.visits.filter((v) => {
      const vt = new Date(v.timestamp);
      return vt >= weekStart && vt <= weekEnd;
    });

    const uniqueUsersInWeek = allVisitors.filter((v) => {
      return v.daysVisited.some((d) => d >= startStr && d <= endStr);
    }).length;

    weeklyVisitors.push({
      periodKey: `W_${startStr}`,
      label: w === 0 ? "This Week" : label,
      subLabel: `${startStr} to ${endStr}`,
      uniqueUsers: uniqueUsersInWeek,
      visits: visitsInWeek.length,
    });
  }

  const monthlyVisitors: ActivityBucket[] = [];
  for (let m = 5; m >= 0; m--) {
    const targetDate = new Date(now.getFullYear(), now.getMonth() - m, 1);
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth();
    const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
    const label = targetDate.toLocaleString("en-US", { month: "short", year: "numeric" });

    const uniqueInMonth = allVisitors.filter((v) => {
      return v.daysVisited.some((d) => d.startsWith(monthStr));
    }).length;

    const visitsInMonth = store.visits.filter((v) => v.date.startsWith(monthStr)).length;

    monthlyVisitors.push({
      periodKey: monthStr,
      label,
      uniqueUsers: uniqueInMonth,
      visits: visitsInMonth,
    });
  }

  const summary: AnalyticsSummary = {
    totalUsers,
    totalVisits,
    todayUsers,
    todayVisits,
    lastActivity:
      store.lastActivity ||
      (totalVisits > 0 ? store.visits[store.visits.length - 1].timestamp : null),
    dailyVisitors,
    weeklyVisitors,
    monthlyVisitors,
  };

  return {
    success: true,
    analytics: summary,
  };
}

/**
 * Server Function: Record Visitor Activity / Session (Public Non-PII ping)
 */
export const recordVisitServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid request body");
    }
    const d = data as Record<string, unknown>;
    const eventId = String(d.visitEventId || d.sessionId || "").trim();
    return {
      visitorId: String(d.visitorId || "").trim(),
      visitEventId: eventId,
      sessionId: eventId,
    };
  })
  .handler(async ({ data }) => {
    return await recordVisitDirect(data);
  });

/**
 * Server Function: Live Student Heartbeat
 */
export const pingActiveStudentHeartbeatServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = (data || {}) as Record<string, unknown>;
    return {
      visitorId: String(d.visitorId || "").trim(),
    };
  })
  .handler(async ({ data }): Promise<{ success: boolean; activeCount: number }> => {
    const count = await recordActiveStudentHeartbeat(data.visitorId);
    return {
      success: true,
      activeCount: count,
    };
  });

/**
 * Server Function: Student Disconnect / Leave
 */
export const leaveActiveStudentServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = (data || {}) as Record<string, unknown>;
    return {
      visitorId: String(d.visitorId || "").trim(),
    };
  })
  .handler(async ({ data }): Promise<{ success: boolean; activeCount: number }> => {
    const count = await removeActiveStudent(data.visitorId);
    return {
      success: true,
      activeCount: count,
    };
  });

/**
 * Server Function: Get Admin Analytics Summary (Owner ONLY)
 */
export const getAdminAnalyticsServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { adminKey?: string };
    return {
      adminKey: String(d?.adminKey || "").trim(),
    };
  })
  .handler(async ({ data }): Promise<{ success: boolean; analytics: AnalyticsSummary }> => {
    return await getAdminAnalyticsDirect(data.adminKey);
  });
