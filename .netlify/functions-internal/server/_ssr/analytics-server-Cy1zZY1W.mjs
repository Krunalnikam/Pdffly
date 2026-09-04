import { i as createServerFn } from "./server-DhCfMIF9.mjs";
import { t as createServerRpc } from "./createServerRpc-DGeOwSHE.mjs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-server-Cy1zZY1W.js
var DATA_DIR = path.join(process.cwd(), "data");
var ANALYTICS_FILE = path.join(DATA_DIR, "analytics.json");
function getAdminKey() {
	return process.env.FEEDBACK_ADMIN_KEY?.trim() || "pdfmaker-admin";
}
function getLocalDateString(d = /* @__PURE__ */ new Date()) {
	return d.toISOString().split("T")[0];
}
async function readAnalyticsFromFile() {
	try {
		await fs.mkdir(DATA_DIR, { recursive: true });
		const content = await fs.readFile(ANALYTICS_FILE, "utf-8");
		const parsed = JSON.parse(content);
		if (parsed && typeof parsed === "object") return {
			visitors: parsed.visitors || {},
			visits: Array.isArray(parsed.visits) ? parsed.visits : [],
			lastActivity: parsed.lastActivity || (/* @__PURE__ */ new Date()).toISOString()
		};
	} catch (err) {
		if (err.code !== "ENOENT") console.error("Error reading analytics file:", err);
	}
	return {
		visitors: {},
		visits: [],
		lastActivity: (/* @__PURE__ */ new Date()).toISOString()
	};
}
async function writeAnalyticsToFile(data) {
	await fs.mkdir(DATA_DIR, { recursive: true });
	if (data.visits.length > 5e3) data.visits = data.visits.slice(-5e3);
	await fs.writeFile(ANALYTICS_FILE, JSON.stringify(data, null, 2), "utf-8");
}
/**
* Server Function: Record Visitor Activity / Session (Public Non-PII ping)
*/
var recordVisitServerFn_createServerFn_handler = createServerRpc({
	id: "ef9aa207e48c8f5071d331221e7d63efcb7879b49339979aeab2d5d322143b8e",
	name: "recordVisitServerFn",
	filename: "src/lib/analytics-server.ts"
}, (opts) => recordVisitServerFn.__executeServer(opts));
var recordVisitServerFn = createServerFn({ method: "POST" }).validator((data) => {
	if (typeof data !== "object" || data === null) throw new Error("Invalid request body");
	const d = data;
	const rawVisitorId = String(d.visitorId || "").trim();
	const rawSessionId = String(d.sessionId || "").trim();
	const isNewSession = Boolean(d.isNewSession);
	return {
		visitorId: rawVisitorId.slice(0, 64) || `v_${Date.now()}`,
		sessionId: rawSessionId.slice(0, 64) || `s_${Date.now()}`,
		isNewSession
	};
}).handler(recordVisitServerFn_createServerFn_handler, async ({ data }) => {
	const now = /* @__PURE__ */ new Date();
	const nowIso = now.toISOString();
	const todayStr = getLocalDateString(now);
	const store = await readAnalyticsFromFile();
	const existingVisitor = store.visitors[data.visitorId];
	if (existingVisitor) {
		existingVisitor.lastSeen = nowIso;
		if (!existingVisitor.daysVisited.includes(todayStr)) existingVisitor.daysVisited.push(todayStr);
		if (data.isNewSession) existingVisitor.totalVisits += 1;
	} else store.visitors[data.visitorId] = {
		visitorId: data.visitorId,
		firstSeen: nowIso,
		lastSeen: nowIso,
		totalVisits: 1,
		daysVisited: [todayStr]
	};
	if (data.isNewSession) store.visits.push({
		id: `vt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
		visitorId: data.visitorId,
		sessionId: data.sessionId,
		timestamp: nowIso,
		date: todayStr
	});
	store.lastActivity = nowIso;
	await writeAnalyticsToFile(store);
	return {
		success: true,
		recorded: true
	};
});
var getAdminAnalyticsServerFn_createServerFn_handler = createServerRpc({
	id: "faaebff2d70e5b18714d9db4222348d01323dcadb4e5aee1826980ac0d48b37b",
	name: "getAdminAnalyticsServerFn",
	filename: "src/lib/analytics-server.ts"
}, (opts) => getAdminAnalyticsServerFn.__executeServer(opts));
var getAdminAnalyticsServerFn = createServerFn({ method: "POST" }).validator((data) => {
	return { adminKey: String(data?.adminKey || "").trim() };
}).handler(getAdminAnalyticsServerFn_createServerFn_handler, async ({ data }) => {
	const expectedKey = getAdminKey();
	if (!data.adminKey || data.adminKey !== expectedKey) throw new Error("Unauthorized: Invalid Admin Security Key");
	const store = await readAnalyticsFromFile();
	const now = /* @__PURE__ */ new Date();
	const todayStr = getLocalDateString(now);
	const allVisitors = Object.values(store.visitors);
	const totalUsers = allVisitors.length;
	const totalVisits = store.visits.length;
	const todayUsers = allVisitors.filter((v) => v.daysVisited.includes(todayStr)).length;
	const todayVisits = store.visits.filter((v) => v.date === todayStr).length;
	const dailyVisitors = [];
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
			visits: visitsInDay
		});
	}
	const weeklyVisitors = [];
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
		const label = startMonth === endMonth ? `${startMonth} ${weekStart.getDate()}-${weekEnd.getDate()}` : `${startMonth} ${weekStart.getDate()} - ${endMonth} ${weekEnd.getDate()}`;
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
			visits: visitsInWeek.length
		});
	}
	const monthlyVisitors = [];
	for (let m = 5; m >= 0; m--) {
		const targetDate = new Date(now.getFullYear(), now.getMonth() - m, 1);
		const year = targetDate.getFullYear();
		const month = targetDate.getMonth();
		const monthStr = `${year}-${String(month + 1).padStart(2, "0")}`;
		const label = targetDate.toLocaleString("en-US", {
			month: "short",
			year: "numeric"
		});
		const uniqueInMonth = allVisitors.filter((v) => {
			return v.daysVisited.some((d) => d.startsWith(monthStr));
		}).length;
		const visitsInMonth = store.visits.filter((v) => v.date.startsWith(monthStr)).length;
		monthlyVisitors.push({
			periodKey: monthStr,
			label,
			uniqueUsers: uniqueInMonth,
			visits: visitsInMonth
		});
	}
	return {
		success: true,
		analytics: {
			totalUsers,
			totalVisits,
			todayUsers,
			todayVisits,
			lastActivity: store.lastActivity || (totalVisits > 0 ? store.visits[store.visits.length - 1].timestamp : null),
			dailyVisitors,
			weeklyVisitors,
			monthlyVisitors
		}
	};
});
//#endregion
export { getAdminAnalyticsServerFn_createServerFn_handler, recordVisitServerFn_createServerFn_handler };
