import { createServerFn } from "@tanstack/react-start";
import { verifyAdminKey } from "./admin-auth-server";
import { readStorageData, writeStorageData } from "./storage-provider";

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

// Helper to read analytics safely
export async function readAnalyticsFromFile(): Promise<StoredAnalyticsData> {
  const parsed = await readStorageData<StoredAnalyticsData>(
    "analytics-data",
    "analytics.json",
    DEFAULT_ANALYTICS,
  );
  if (parsed && typeof parsed === "object") {
    return {
      visitors: parsed.visitors || {},
      visits: Array.isArray(parsed.visits) ? parsed.visits : [],
      lastActivity: parsed.lastActivity || new Date().toISOString(),
    };
  }
  return DEFAULT_ANALYTICS;
}

// Helper to write analytics safely
export async function writeAnalyticsToFile(data: StoredAnalyticsData): Promise<void> {
  // Keep maximum recent 5,000 visit events to prevent unbounded storage growth
  if (data.visits.length > 5000) {
    data.visits = data.visits.slice(-5000);
  }
  await writeStorageData("analytics-data", "analytics.json", data);
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

export async function recordVisitDirect(data: {
  visitorId: string;
  sessionId: string;
  isNewSession: boolean;
}): Promise<{ success: boolean; recorded: boolean }> {
  const rawVisitorId = String(data.visitorId || "").trim();
  const rawSessionId = String(data.sessionId || "").trim();
  const isNewSession = Boolean(data.isNewSession);

  const visitorId = rawVisitorId.slice(0, 64) || `v_${Date.now()}`;
  const sessionId = rawSessionId.slice(0, 64) || `s_${Date.now()}`;

  const now = new Date();
  const nowIso = now.toISOString();
  const todayStr = getLocalDateString(now);

  const store = await readAnalyticsFromFile();

  const existingVisitor = store.visitors[visitorId];
  if (existingVisitor) {
    existingVisitor.lastSeen = nowIso;
    if (!existingVisitor.daysVisited.includes(todayStr)) {
      existingVisitor.daysVisited.push(todayStr);
    }
    if (isNewSession) {
      existingVisitor.totalVisits += 1;
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

  if (isNewSession) {
    store.visits.push({
      id: `vt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      visitorId,
      sessionId,
      timestamp: nowIso,
      date: todayStr,
    });
  }

  store.lastActivity = nowIso;

  await writeAnalyticsToFile(store);
  await recordActiveStudentHeartbeat(visitorId);

  return {
    success: true,
    recorded: true,
  };
}

export async function getAdminAnalyticsDirect(adminKey: string): Promise<{
  success: boolean;
  analytics: AnalyticsSummary;
}> {
  const isAuthorized = await verifyAdminKey(adminKey);
  if (!isAuthorized) {
    throw new Error("Unauthorized: Invalid Admin Security Key");
  }

  const store = await readAnalyticsFromFile();
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
