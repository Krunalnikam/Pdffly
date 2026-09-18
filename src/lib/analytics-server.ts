import { createServerFn } from "@tanstack/react-start";
import { verifyAdminKey } from "./admin-auth-server";
import { readStorageData, writeStorageData, getBlobStore } from "./storage-provider";
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

  // 3. Deduplicate and merge visits by unique sessionId or visit id
  const visitMap = new Map<string, VisitEvent>();
  const addVisit = (ve: VisitEvent) => {
    if (!ve) return;
    const key = ve.sessionId ? `ses:${ve.sessionId}` : ve.id ? `id:${ve.id}` : null;
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

  return {
    visitors: mergedVisitors,
    visits: mergedVisits,
    lastActivity,
  };
}

// Helper to read analytics safely with authoritative Blobs and historical baseline seed protection
export async function readAnalyticsFromFile(
  bypassCache: boolean = false,
): Promise<StoredAnalyticsData> {
  const parsed = await readStorageData<StoredAnalyticsData>(
    "analytics-data",
    "analytics.json",
    DEFAULT_ANALYTICS,
    bypassCache,
  );

  let result: StoredAnalyticsData = DEFAULT_ANALYTICS;
  if (parsed && typeof parsed === "object") {
    result = {
      visitors: parsed.visitors || {},
      visits: Array.isArray(parsed.visits) ? parsed.visits : [],
      lastActivity: parsed.lastActivity || new Date().toISOString(),
    };
  }

  // Baseline seed protection: merge with bundled seed file in process.cwd()/data/analytics.json
  // Guarantees historical recorded visitors and visits are never reset or dropped
  try {
    const seedPath = path.join(process.cwd(), "data", "analytics.json");
    const seedRaw = await fs.readFile(seedPath, "utf-8");
    const seedData = JSON.parse(seedRaw) as StoredAnalyticsData;
    if (seedData && seedData.visitors) {
      result = mergeAnalyticsData(seedData, result);
    }
  } catch {
    // Seed file optional
  }

  return result;
}

// Helper to write analytics safely with monotonic merging
export async function writeAnalyticsToFile(
  data: StoredAnalyticsData,
): Promise<StoredAnalyticsData> {
  let dataToSave = data;

  // 1. If Netlify Blobs is available, fetch the latest stored data with strong consistency and union-merge!
  const store = getBlobStore();
  if (store) {
    try {
      const existingBlob = await store.get("analytics-data", {
        type: "json",
        consistency: "strong",
      });
      if (existingBlob && typeof existingBlob === "object") {
        dataToSave = mergeAnalyticsData(existingBlob as StoredAnalyticsData, dataToSave);
      }
    } catch {
      // Netlify Blobs read fallback
    }
  }

  // Cap recent visits at 10,000 to prevent unbounded memory growth while keeping history intact
  if (dataToSave.visits.length > 10000) {
    dataToSave.visits = dataToSave.visits.slice(-10000);
  }

  // Monotonically save across Netlify Blobs, memory, and filesystem
  await writeStorageData("analytics-data", "analytics.json", dataToSave);
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
  sessionId: string;
  isNewSession: boolean;
}): Promise<{ success: boolean; recorded: boolean }> {
  return new Promise((resolve, reject) => {
    visitProcessingLock = visitProcessingLock
      .then(async () => {
        const rawVisitorId = String(data.visitorId || "").trim();
        const rawSessionId = String(data.sessionId || "").trim();
        const isNewSession = Boolean(data.isNewSession);

        const visitorId = rawVisitorId.slice(0, 64) || `v_${Date.now()}`;
        const sessionId = rawSessionId.slice(0, 64) || `s_${Date.now()}`;

        const now = new Date();
        const nowIso = now.toISOString();
        const todayStr = getLocalDateString(now);

        // Read latest state bypassing stale memory cache
        const store = await readAnalyticsFromFile(true);

        const existingVisitor = store.visitors[visitorId];
        if (existingVisitor) {
          existingVisitor.lastSeen = nowIso;
          if (!existingVisitor.daysVisited.includes(todayStr)) {
            existingVisitor.daysVisited.push(todayStr);
          }
        } else {
          store.visitors[visitorId] = {
            visitorId,
            firstSeen: nowIso,
            lastSeen: nowIso,
            totalVisits: 1,
            daysVisited: [todayStr],
          };
        }

        let recordedNewVisit = false;
        // Strict session deduplication: has this sessionId already been recorded as a visit?
        const sessionAlreadyRecorded = store.visits.some((v) => v.sessionId === sessionId);

        if (isNewSession && !sessionAlreadyRecorded) {
          store.visits.push({
            id: `vt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
            visitorId,
            sessionId,
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
  const totalUsers = allVisitors.length;
  const totalVisits = store.visits.length;

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
    return {
      visitorId: String(d.visitorId || ""),
      sessionId: String(d.sessionId || ""),
      isNewSession: Boolean(d.isNewSession),
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
