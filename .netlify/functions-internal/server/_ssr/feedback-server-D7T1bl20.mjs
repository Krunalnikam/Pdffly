import { i as createServerFn } from "./server-D9M2U8KA.mjs";
import { t as createServerRpc } from "./createServerRpc-Cjk0Xsty.mjs";
import * as fs from "node:fs/promises";
import * as path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/feedback-server-D7T1bl20.js
var DATA_DIR = path.join(process.cwd(), "data");
var FEEDBACK_FILE = path.join(DATA_DIR, "feedback.json");
function getAdminKey() {
	return process.env.FEEDBACK_ADMIN_KEY?.trim() || "pdfmaker-admin";
}
async function readFeedbacksFromFile() {
	try {
		await fs.mkdir(DATA_DIR, { recursive: true });
		const content = await fs.readFile(FEEDBACK_FILE, "utf-8");
		const parsed = JSON.parse(content);
		if (Array.isArray(parsed)) return parsed;
		return [];
	} catch (err) {
		if (err.code === "ENOENT") return [];
		console.error("Error reading feedback file:", err);
		return [];
	}
}
async function writeFeedbacksToFile(items) {
	await fs.mkdir(DATA_DIR, { recursive: true });
	await fs.writeFile(FEEDBACK_FILE, JSON.stringify(items, null, 2), "utf-8");
}
/**
* Server Function: Submit new student feedback (Public CREATE only)
*/
var submitFeedbackServerFn_createServerFn_handler = createServerRpc({
	id: "c8b82f55d12c2f949b941daf3a01f3a12f217656703e51bec334b7a77d2038e1",
	name: "submitFeedbackServerFn",
	filename: "src/lib/feedback-server.ts"
}, (opts) => submitFeedbackServerFn.__executeServer(opts));
var submitFeedbackServerFn = createServerFn({ method: "POST" }).validator((data) => {
	if (typeof data !== "object" || data === null) throw new Error("Invalid request body");
	const d = data;
	const type = String(d.type || "general");
	const rating = Math.min(5, Math.max(1, Math.round(Number(d.rating) || 5)));
	const message = String(d.message || "").trim();
	const email = d.email ? String(d.email).trim() : void 0;
	const language = String(d.language || "en");
	if (!message) throw new Error("Feedback message cannot be empty");
	if (message.length > 1e3) throw new Error("Feedback message exceeds 1000 characters limit");
	if (email) {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error("Invalid email address format");
	}
	return {
		type: [
			"bug",
			"feature",
			"improvement",
			"general"
		].includes(type) ? type : "general",
		rating,
		message,
		email,
		language
	};
}).handler(submitFeedbackServerFn_createServerFn_handler, async ({ data }) => {
	const id = `fb_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
	const timestamp = (/* @__PURE__ */ new Date()).toISOString();
	await writeFeedbacksToFile([{
		id,
		type: data.type,
		rating: data.rating,
		message: data.message,
		email: data.email,
		timestamp,
		language: data.language
	}, ...await readFeedbacksFromFile()]);
	const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || process.env.FEEDBACK_OWNER_EMAIL;
	if (ownerEmail) console.log(`[FEEDBACK OWNER NOTIFICATION] 📧 New Feedback #${id} sent by ${data.email || "Anonymous Student"} -> Owner (${ownerEmail}) | Type: [${data.type.toUpperCase()}] | Rating: ${data.rating}/5 | Msg: "${data.message.substring(0, 80)}..."`);
	return {
		success: true,
		id
	};
});
var verifyAdminKeyServerFn_createServerFn_handler = createServerRpc({
	id: "173f2a8e038204192418cf18f677d4967725ae5d95058d74d75b3fb81419b956",
	name: "verifyAdminKeyServerFn",
	filename: "src/lib/feedback-server.ts"
}, (opts) => verifyAdminKeyServerFn.__executeServer(opts));
var verifyAdminKeyServerFn = createServerFn({ method: "POST" }).validator((data) => {
	return { adminKey: String(data?.adminKey || "").trim() };
}).handler(verifyAdminKeyServerFn_createServerFn_handler, async ({ data }) => {
	const expectedKey = getAdminKey();
	return { authorized: Boolean(data.adminKey && data.adminKey === expectedKey) };
});
var getAdminFeedbackListServerFn_createServerFn_handler = createServerRpc({
	id: "38595fd69ce4a9dd967f09cf0482f5bd54a622301df7d445edf46ce1b2eea374",
	name: "getAdminFeedbackListServerFn",
	filename: "src/lib/feedback-server.ts"
}, (opts) => getAdminFeedbackListServerFn.__executeServer(opts));
var getAdminFeedbackListServerFn = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	return {
		adminKey: String(d?.adminKey || "").trim(),
		filterType: d?.filterType ? String(d.filterType) : "all"
	};
}).handler(getAdminFeedbackListServerFn_createServerFn_handler, async ({ data }) => {
	const expectedKey = getAdminKey();
	if (!data.adminKey || data.adminKey !== expectedKey) throw new Error("Unauthorized: Invalid Admin Security Key");
	const items = await readFeedbacksFromFile();
	const total = items.length;
	const totalRatingSum = items.reduce((acc, item) => acc + item.rating, 0);
	const stats = {
		total,
		averageRating: total > 0 ? Number((totalRatingSum / total).toFixed(1)) : 0,
		bugsCount: items.filter((i) => i.type === "bug").length,
		featuresCount: items.filter((i) => i.type === "feature").length,
		improvementsCount: items.filter((i) => i.type === "improvement").length,
		generalCount: items.filter((i) => i.type === "general").length
	};
	let filtered = items;
	if (data.filterType && data.filterType !== "all") filtered = items.filter((i) => i.type === data.filterType);
	return {
		success: true,
		stats,
		items: filtered
	};
});
var deleteFeedbackServerFn_createServerFn_handler = createServerRpc({
	id: "2ae761f96464d98f2ddb3b5208fd2b111aa6eb63608a00da85484e730b631e8c",
	name: "deleteFeedbackServerFn",
	filename: "src/lib/feedback-server.ts"
}, (opts) => deleteFeedbackServerFn.__executeServer(opts));
var deleteFeedbackServerFn = createServerFn({ method: "POST" }).validator((data) => {
	const d = data;
	return {
		adminKey: String(d?.adminKey || "").trim(),
		id: String(d?.id || "").trim()
	};
}).handler(deleteFeedbackServerFn_createServerFn_handler, async ({ data }) => {
	const expectedKey = getAdminKey();
	if (!data.adminKey || data.adminKey !== expectedKey) throw new Error("Unauthorized: Invalid Admin Security Key");
	await writeFeedbacksToFile((await readFeedbacksFromFile()).filter((i) => i.id !== data.id));
	return { success: true };
});
//#endregion
export { deleteFeedbackServerFn_createServerFn_handler, getAdminFeedbackListServerFn_createServerFn_handler, submitFeedbackServerFn_createServerFn_handler, verifyAdminKeyServerFn_createServerFn_handler };
