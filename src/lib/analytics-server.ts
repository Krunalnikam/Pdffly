import { createServerFn } from "@tanstack/react-start";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import * as os from "node:os";
import { verifyAdminKey } from "./admin-auth-server";

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

function getDataDir(): string {
  if (process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join(os.tmpdir(), "pdfly-data");
  }
  return path.join(process.cwd(), "data");
}

function getAnalyticsFilePath(): string {
  return path.join(getDataDir(), "analytics.json");
}

// Get current date string formatted as YYYY-MM-DD
function getLocalDateString(d: Date = new Date()): string {
  return d.toISOString().split("T")[0];
}

// Helper to ensure data file exists and read analytics safely
async function readAnalyticsFromFile(): Promise<StoredAnalyticsData> {
  const primaryFile = getAnalyticsFilePath();
  try {
    const content = await fs.readFile(primaryFile, "utf-8");
    const parsed = JSON.parse(content);
    if (parsed && typeof parsed === "object") {
      return {
        visitors: parsed.visitors || {},
        visits: Array.isArray(parsed.visits) ? parsed.visits : [],
        lastActivity: parsed.lastActivity || new Date().toISOString(),
      };
    }
  } catch {
    // If not in primary path, fallback to reading bundled seed file if available
    const seedFile = path.join(process.cwd(), "data", "analytics.json");
    try {
      const content = await fs.readFile(seedFile, "utf-8");
      const parsed = JSON.parse(content);
      if (parsed && typeof parsed === "object") {
        return {
          visitors: parsed.visitors || {},
          visits: Array.isArray(parsed.visits) ? parsed.visits : [],
          lastActivity: parsed.lastActivity || new Date().toISOString(),
        };
      }
    } catch {
      // ignore
    }
  }

  return {
    visitors: {},
    visits: [],
    lastActivity: new Date().toISOString(),
  };
}

// Helper to write analytics file safely
async function writeAnalyticsToFile(data: StoredAnalyticsData): Promise<void> {
  const dir = getDataDir();
  const filePath = getAnalyticsFilePath();

  // Keep maximum recent 5,000 visit events to prevent unbounded file growth
  if (data.visits.length > 5000) {
    data.visits = data.visits.slice(-5000);
  }

  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    // Fallback to tmp directory if process.cwd() is read-only
    const tmpDir = path.join(os.tmpdir(), "pdfly-data");
    if (dir !== tmpDir) {
      await fs.mkdir(tmpDir, { recursive: true });
      await fs.writeFile(
        path.join(tmpDir, "analytics.json"),
        JSON.stringify(data, null, 2),
        "utf-8",
      );
    } else {
      console.error("Failed to write analytics file:", err);
    }
  }
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
    const rawVisitorId = String(d.visitorId || "").trim();
    const rawSessionId = String(d.sessionId || "").trim();
    const isNewSession = Boolean(d.isNewSession);

    // Sanitize and ensure format
    const visitorId = rawVisitorId.slice(0, 64) || `v_${Date.now()}`;
    const sessionId = rawSessionId.slice(0, 64) || `s_${Date.now()}`;

    return {
      visitorId,
      sessionId,
      isNewSession,
    };
  })
  .handler(async ({ data }) => {
    const now = new Date();
    const nowIso = now.toISOString();
    const todayStr = getLocalDateString(now);

    const store = await readAnalyticsFromFile();

    const existingVisitor = store.visitors[data.visitorId];
    if (existingVisitor) {
      existingVisitor.lastSeen = nowIso;
      if (!existingVisitor.daysVisited.includes(todayStr)) {
        existingVisitor.daysVisited.push(todayStr);
      }
      if (data.isNewSession) {
        existingVisitor.totalVisits += 1;
      }
    } else {
      store.visitors[data.visitorId] = {
        visitorId: data.visitorId,
        firstSeen: nowIso,
        lastSeen: nowIso,
        totalVisits: 1,
        daysVisited: [todayStr],
      };
    }

    if (data.isNewSession) {
      store.visits.push({
        id: `vt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
        visitorId: data.visitorId,
        sessionId: data.sessionId,
        timestamp: nowIso,
        date: todayStr,
      });
    }

    store.lastActivity = nowIso;

    await writeAnalyticsToFile(store);

    // Keep in-memory active students map updated
    await recordActiveStudentHeartbeat(data.visitorId);

    return {
      success: true,
      recorded: true,
    };
  });

// Active window threshold: A student is considered active if a heartbeat was received within 45 seconds
const ACTIVE_STUDENT_TIMEOUT_MS = 45 * 1000;
const activeStudentsMap = new Map<string, number>();
let isSessionsInitialized = false;

function getActiveSessionsFilePath(): string {
  return path.join(getDataDir(), "active-sessions.json");
}

async function loadActiveSessionsFromFile(): Promise<void> {
  if (isSessionsInitialized) return;
  isSessionsInitialized = true;
  const filePath = getActiveSessionsFilePath();
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(content);
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
    // File doesn't exist yet or is empty; start clean
  }
}

async function persistActiveSessionsToFile(): Promise<void> {
  const filePath = getActiveSessionsFilePath();
  const dir = getDataDir();
  const serialized: Record<string, number> = {};
  for (const [id, lastSeen] of activeStudentsMap.entries()) {
    serialized[id] = lastSeen;
  }
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(serialized, null, 2), "utf-8");
  } catch {
    // Ignore persistence failures in read-only environments
  }
}

export async function recordActiveStudentHeartbeat(visitorId: string): Promise<number> {
  await loadActiveSessionsFromFile();
  if (visitorId && typeof visitorId === "string" && visitorId.trim()) {
    activeStudentsMap.set(visitorId.trim(), Date.now());
  }
  const count = cleanAndGetActiveStudentsCount();
  await persistActiveSessionsToFile();
  return count;
}

export async function removeActiveStudent(visitorId: string): Promise<number> {
  await loadActiveSessionsFromFile();
  if (visitorId && typeof visitorId === "string" && visitorId.trim()) {
    activeStudentsMap.delete(visitorId.trim());
  }
  const count = cleanAndGetActiveStudentsCount();
  await persistActiveSessionsToFile();
  return count;
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

/**
 * Server Function: Live Student Heartbeat
 * Records student presence and returns the current number of active students.
 */
export const pingActiveStudentHeartbeatServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = (data || {}) as Record<string, unknown>;
    const rawVisitorId = String(d.visitorId || "")
      .trim()
      .slice(0, 64);
    return {
      visitorId: rawVisitorId,
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
    const rawVisitorId = String(d.visitorId || "")
      .trim()
      .slice(0, 64);
    return {
      visitorId: rawVisitorId,
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
    const isAuthorized = await verifyAdminKey(data.adminKey);
    if (!isAuthorized) {
      throw new Error("Unauthorized: Invalid Admin Security Key");
    }

    const store = await readAnalyticsFromFile();
    const now = new Date();
    const todayStr = getLocalDateString(now);

    const allVisitors = Object.values(store.visitors);
    const totalUsers = allVisitors.length;
    const totalVisits = store.visits.length;

    // Today's metrics
    const todayUsers = allVisitors.filter((v) => v.daysVisited.includes(todayStr)).length;
    const todayVisits = store.visits.filter((v) => v.date === todayStr).length;

    // 1. Daily visitors (Past 14 days)
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

    // 2. Weekly visitors (Past 8 weeks)
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

    // 3. Monthly visitors (Past 6 months)
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
  });
