import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { d as useBlocker } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as useLanguage, i as SUPPORTED_LANGUAGES, n as getAdminAnalyticsServerFn, o as useTheme } from "./router-DDjsreg3.mjs";
import { A as KeyRound, B as Circle, C as Maximize2, D as LoaderCircle, E as Lock, F as Funnel, G as ChartColumn, H as CircleAlert, I as FileDown, K as Calendar, L as Eye, M as Heart, N as Hash, O as Lightbulb, P as GraduationCap, Q as ArrowUpDown, R as Crop, S as MessageSquareQuote, T as LogOut, U as ChevronRight, V as CircleCheck, W as Check, X as Bug, Y as Building2, Z as ArrowUp, _ as RotateCw, a as Undo2, b as PenLine, c as Trash2, d as Sparkles, et as ArrowDown, f as SlidersVertical, g as Send, h as Settings, i as UserCheck, j as ImagePlus, k as Languages, l as Sun, m as ShieldAlert, n as WandSparkles, o as TriangleAlert, p as ShieldCheck, t as X, u as Star, v as RotateCcw, w as Mail, x as Moon, y as RefreshCw } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { a as cn, c as submitFeedbackServerFn, i as Input, l as verifyAdminKeyServerFn, n as Badge, o as deleteFeedbackServerFn, r as Button, s as getAdminFeedbackListServerFn, t as AdminAnalyticsView } from "./AdminAnalyticsView-BH3LYJN6.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
import { a as ItemIndicator2, c as RadioItem2, d as SubContent2, f as SubTrigger2, i as Item2, l as Root2, n as Content2, o as Label2, p as Trigger, r as Group2, s as Portal2, t as CheckboxItem2, u as Separator2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-3OWqiOsm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName$11 = "/app/applet/src/components/ui/card.tsx";
var Card = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 7,
	columnNumber: 5
}, void 0));
Card.displayName = "Card";
var CardHeader = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("flex flex-col space-y-1.5 p-6", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 18,
	columnNumber: 5
}, void 0));
CardHeader.displayName = "CardHeader";
var CardTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("font-semibold leading-none tracking-tight", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 25,
	columnNumber: 5
}, void 0));
CardTitle.displayName = "CardTitle";
var CardDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 36,
	columnNumber: 5
}, void 0));
CardDescription.displayName = "CardDescription";
var CardContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("p-6 pt-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 43,
	columnNumber: 5
}, void 0));
CardContent.displayName = "CardContent";
var CardFooter = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	ref,
	className: cn("flex items-center p-6 pt-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$11,
	lineNumber: 50,
	columnNumber: 5
}, void 0));
CardFooter.displayName = "CardFooter";
var _jsxFileName$10 = "/app/applet/src/components/ui/label.tsx";
var labelVariants = cva("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70");
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Root, {
	ref,
	className: cn(labelVariants(), className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$10,
	lineNumber: 17,
	columnNumber: 3
}, void 0));
Label.displayName = Root.displayName;
var _jsxFileName$9 = "/app/applet/src/components/ui/switch.tsx";
var Switch = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch$1, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SwitchThumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") }, void 0, false, {
		fileName: _jsxFileName$9,
		lineNumber: 18,
		columnNumber: 5
	}, void 0)
}, void 0, false, {
	fileName: _jsxFileName$9,
	lineNumber: 10,
	columnNumber: 3
}, void 0));
Switch.displayName = Switch$1.displayName;
/**
* Analyzes luminance distribution of the image.
* Uses a fast subsampled histogram (stride 2) for maximum speed.
*/
function analyzeDocumentLuminance(data, width, height) {
	const hist = /* @__PURE__ */ new Int32Array(256);
	let totalSamples = 0;
	let sumLuma = 0;
	const stride = 2;
	for (let y = 0; y < height; y += stride) {
		const rowOffset = y * width * 4;
		for (let x = 0; x < width; x += stride) {
			const idx = rowOffset + x * 4;
			const r = data[idx];
			const g = data[idx + 1];
			const b = data[idx + 2];
			const luma = r * 2 + g * 5 + b >> 3;
			hist[luma]++;
			sumLuma += luma;
			totalSamples++;
		}
	}
	const p05Count = totalSamples * .05;
	const p15Count = totalSamples * .15;
	const p50Count = totalSamples * .5;
	const p90Count = totalSamples * .9;
	const p98Count = totalSamples * .98;
	let cum = 0;
	let inkLuma = 40;
	let medianLuma = 128;
	let paperLuma = 220;
	for (let i = 0; i < 256; i++) {
		cum += hist[i];
		if (cum >= p05Count && inkLuma === 40 && cum - hist[i] < p15Count) inkLuma = i;
		if (cum >= p50Count && medianLuma === 128) medianLuma = i;
		if (cum >= p90Count && paperLuma === 220 && cum - hist[i] < p98Count) paperLuma = i;
	}
	inkLuma = Math.max(0, Math.min(180, inkLuma));
	paperLuma = Math.max(inkLuma + 25, Math.min(255, paperLuma));
	const meanLuma = totalSamples > 0 ? sumLuma / totalSamples : 128;
	const contrastRatio = paperLuma / Math.max(1, inkLuma);
	return {
		paperLuma,
		inkLuma,
		medianLuma,
		meanLuma,
		contrastRatio,
		isDarkPhoto: paperLuma < 160 || meanLuma < 130,
		isFaint: inkLuma > 110 || contrastRatio < 2
	};
}
/**
* Builds an adaptive non-linear Look-Up Table (LUT) based on the image's dynamic range.
* - Whitens the paper background up towards ~248-255 without blowing out faint marks.
* - Deepens the ink/text strokes smoothly to make words dark, punchy, and readable.
* - Smoothly curves mid-tones to retain pastel diagrams, colored pens, and highlighters.
*/
function buildAdaptiveDocumentLUT(stats) {
	const lut = /* @__PURE__ */ new Uint8ClampedArray(256);
	const { paperLuma, inkLuma, isDarkPhoto, isFaint } = stats;
	const targetBlack = 20;
	const inBlack = Math.max(0, inkLuma - (isFaint ? 10 : 15));
	const inWhite = Math.min(255, Math.max(inBlack + 40, paperLuma + (isDarkPhoto ? 2 : 5)));
	let gamma = 1;
	if (isDarkPhoto) gamma = .82;
	else if (isFaint) gamma = 1.15;
	else gamma = .95;
	for (let i = 0; i < 256; i++) {
		let norm = (i - inBlack) / Math.max(1, inWhite - inBlack);
		norm = Math.max(0, Math.min(1, norm));
		norm = Math.pow(norm, gamma);
		const sCurve = norm * norm * (3 - 2 * norm);
		const val = targetBlack + (norm * .65 + sCurve * .35) * 232;
		lut[i] = Math.max(0, Math.min(255, Math.round(val)));
	}
	return lut;
}
/**
* Smart automatic document enhancement:
* Analyzes the image and applies optimal exposure, background normalization,
* text contrast boost, and controlled detail sharpening.
*/
function enhanceImageData(imageData) {
	const { width, height, data } = imageData;
	const pixelCount = width * height;
	if (pixelCount === 0) return imageData;
	const stats = analyzeDocumentLuminance(data, width, height);
	const lut = buildAdaptiveDocumentLUT(stats);
	for (let i = 0; i < pixelCount; i++) {
		const off = i * 4;
		data[off] = lut[data[off]];
		data[off + 1] = lut[data[off + 1]];
		data[off + 2] = lut[data[off + 2]];
	}
	let sharpAmount = .28;
	if (stats.isFaint) sharpAmount = .36;
	else if (stats.isDarkPhoto) sharpAmount = .3;
	const orig = new Uint8ClampedArray(data);
	for (let y = 1; y < height - 1; y++) {
		const row = y * width;
		const rowPrev = (y - 1) * width;
		const rowNext = (y + 1) * width;
		for (let x = 1; x < width - 1; x++) {
			const idx = (row + x) * 4;
			for (let c = 0; c < 3; c++) {
				const center = orig[idx + c];
				const up = orig[(rowPrev + x) * 4 + c];
				const down = orig[(rowNext + x) * 4 + c];
				const left = orig[(row + x - 1) * 4 + c];
				const right = orig[(row + x + 1) * 4 + c];
				const detail = center - (up + down + left + right) * .25;
				const enhanced = center + sharpAmount * detail;
				data[idx + c] = Math.max(0, Math.min(255, Math.round(enhanced)));
			}
		}
	}
	return imageData;
}
var QUALITY_PRESETS = {
	standard: {
		id: "standard",
		label: "Standard",
		badge: "Recommended",
		description: "Great balance of crisp text and manageable file size",
		targetSizeDesc: "~400–700 KB/page",
		maxDimension: 1800,
		jpegQuality: .82
	},
	high: {
		id: "high",
		label: "High Quality",
		description: "Maximum resolution & sharp details for complex diagrams",
		targetSizeDesc: "~1.2–2.5 MB/page",
		maxDimension: 2400,
		jpegQuality: .92
	},
	compact: {
		id: "compact",
		label: "Small File",
		description: "Strong compression for email or tight portal upload limits",
		targetSizeDesc: "~150–350 KB/page",
		maxDimension: 1200,
		jpegQuality: .65
	}
};
var sanitize = (value) => value.trim().replace(/[^a-zA-Z0-9-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "") || "Unknown";
var buildFileName = (d) => `${sanitize(d.branch)}_${sanitize(d.enrollmentNumber)}_${sanitize(d.subject)}_${sanitize(d.examPhase)}.pdf`;
var decodeImage = async (dataUrl, pageIndex, imageName) => {
	if (typeof createImageBitmap === "function") try {
		const blob = await (await fetch(dataUrl)).blob();
		const bitmap = await createImageBitmap(blob);
		return {
			naturalWidth: bitmap.width,
			naturalHeight: bitmap.height,
			draw: (ctx, w, h) => {
				ctx.drawImage(bitmap, 0, 0, w, h);
			},
			cleanup: () => {
				try {
					bitmap.close();
				} catch {}
			}
		};
	} catch {}
	return new Promise((resolve, reject) => {
		const img = new Image();
		img.onload = () => {
			resolve({
				naturalWidth: img.naturalWidth || img.width,
				naturalHeight: img.naturalHeight || img.height,
				draw: (ctx, w, h) => {
					ctx.drawImage(img, 0, 0, w, h);
				},
				cleanup: () => {
					img.onload = null;
					img.onerror = null;
					img.src = "";
				}
			});
		};
		img.onerror = () => reject(/* @__PURE__ */ new Error(`Page ${pageIndex + 1} (${imageName || "Image"}) could not be read or decoded. Please verify the image file.`));
		img.src = dataUrl;
	});
};
/**
* Concurrently maps an array with a worker limit to optimize throughput
* while preventing main-thread lockup and memory exhaustion.
* Preserves strict input order in the returned array.
*/
async function pMap(items, concurrency, mapper, onItemCompleted) {
	const total = items.length;
	const results = new Array(total);
	let currentIndex = 0;
	let completedCount = 0;
	const poolSize = Math.min(concurrency, total);
	const workers = Array.from({ length: poolSize }, async () => {
		while (true) {
			const idx = currentIndex++;
			if (idx >= total) break;
			const item = items[idx];
			const res = await mapper(item, idx);
			results[idx] = res;
			completedCount++;
			onItemCompleted?.(completedCount, total);
			await new Promise((resolve) => setTimeout(resolve, 0));
		}
	});
	await Promise.all(workers);
	return results;
}
/**
* Optimizes an uploaded assignment image based on user-selected quality:
* - Scales resolution based on selected compression preset while strictly preserving aspect ratio
* - Cleanses heavy camera metadata bloat
* - Preserves handwriting and diagrams
* - Zero white margins or padding
*/
var optimizeImageForPdf = async (image, index, enableSmartFilter = true, qualityPreset = "standard") => {
	const decoded = await decodeImage(image.dataUrl, index, image.name);
	try {
		const rawWidth = decoded.naturalWidth;
		const rawHeight = decoded.naturalHeight;
		if (!rawWidth || !rawHeight || rawWidth <= 0 || rawHeight <= 0) throw new Error(`Page ${index + 1} (${image.name || "Image"}) has invalid dimensions.`);
		const preset = QUALITY_PRESETS[qualityPreset] || QUALITY_PRESETS.standard;
		const maxSide = Math.max(rawWidth, rawHeight);
		const scale = maxSide > preset.maxDimension ? preset.maxDimension / maxSide : 1;
		const targetWidth = Math.max(1, Math.round(rawWidth * scale));
		const targetHeight = Math.max(1, Math.round(rawHeight * scale));
		if (typeof OffscreenCanvas !== "undefined") try {
			const offCanvas = new OffscreenCanvas(targetWidth, targetHeight);
			const ctx = offCanvas.getContext("2d");
			if (ctx) {
				ctx.imageSmoothingEnabled = true;
				ctx.imageSmoothingQuality = "high";
				ctx.fillStyle = "#ffffff";
				ctx.fillRect(0, 0, targetWidth, targetHeight);
				decoded.draw(ctx, targetWidth, targetHeight);
				if (enableSmartFilter) {
					const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
					enhanceImageData(imgData);
					ctx.putImageData(imgData, 0, 0);
				}
				const blob = await offCanvas.convertToBlob({
					type: "image/jpeg",
					quality: preset.jpegQuality
				});
				return {
					dataUrl: await new Promise((res, rej) => {
						const reader = new FileReader();
						reader.onloadend = () => res(reader.result);
						reader.onerror = rej;
						reader.readAsDataURL(blob);
					}),
					width: targetWidth,
					height: targetHeight
				};
			}
		} catch {}
		const canvas = document.createElement("canvas");
		canvas.width = targetWidth;
		canvas.height = targetHeight;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error(`Page ${index + 1}: Canvas graphics context is unavailable.`);
		ctx.imageSmoothingEnabled = true;
		ctx.imageSmoothingQuality = "high";
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, targetWidth, targetHeight);
		decoded.draw(ctx, targetWidth, targetHeight);
		if (enableSmartFilter) {
			const imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
			enhanceImageData(imgData);
			ctx.putImageData(imgData, 0, 0);
		}
		const optimizedDataUrl = canvas.toDataURL("image/jpeg", preset.jpegQuality);
		canvas.width = 1;
		canvas.height = 1;
		return {
			dataUrl: optimizedDataUrl,
			width: targetWidth,
			height: targetHeight
		};
	} finally {
		decoded.cleanup();
	}
};
async function generateAssignmentPdf(details, images, enableSmartFilter = false, qualityPreset = "compact", onProgress) {
	const validImages = images.filter((img) => Boolean(img?.dataUrl));
	if (validImages.length === 0) throw new Error("No images provided to generate PDF. Please upload at least one page.");
	onProgress?.({
		stage: "preparing",
		percent: 20,
		total: validImages.length
	});
	await new Promise((resolve) => setTimeout(resolve, 30));
	const { jsPDF } = await import("../_libs/jspdf.mjs").then((n) => /* @__PURE__ */ __toESM(n.t()));
	const total = validImages.length;
	const concurrency = typeof navigator !== "undefined" && navigator.hardwareConcurrency ? Math.max(2, Math.min(4, navigator.hardwareConcurrency)) : 3;
	onProgress?.({
		stage: "processing",
		percent: 20,
		current: 0,
		total
	});
	const optimizedImages = await pMap(validImages, concurrency, async (item, idx) => {
		try {
			return await optimizeImageForPdf(item, idx, enableSmartFilter, qualityPreset);
		} catch (err) {
			const msg = err instanceof Error ? err.message : `Page ${idx + 1} failed to process.`;
			throw new Error(msg);
		}
	}, (completedCount) => {
		const currentPercent = Math.min(70, Math.round(20 + completedCount / total * 50));
		onProgress?.({
			stage: "processing",
			percent: currentPercent,
			current: completedCount,
			total
		});
	});
	onProgress?.({
		stage: "creating",
		percent: 75,
		current: 1,
		total
	});
	await new Promise((resolve) => setTimeout(resolve, 20));
	const first = optimizedImages[0];
	const firstOrientation = first.width > first.height ? "landscape" : "portrait";
	const doc = new jsPDF({
		unit: "pt",
		format: [first.width, first.height],
		orientation: firstOrientation,
		compress: true
	});
	doc.addImage(first.dataUrl, "JPEG", 0, 0, first.width, first.height, void 0, "FAST");
	for (let i = 1; i < optimizedImages.length; i++) {
		const { dataUrl, width, height } = optimizedImages[i];
		const orientation = width > height ? "landscape" : "portrait";
		doc.addPage([width, height], orientation);
		doc.addImage(dataUrl, "JPEG", 0, 0, width, height, void 0, "FAST");
		const pagePercent = Math.min(90, Math.round(75 + (i + 1) / total * 15));
		onProgress?.({
			stage: "creating",
			percent: pagePercent,
			current: i + 1,
			total
		});
		if (i % 3 === 0) await new Promise((resolve) => setTimeout(resolve, 10));
	}
	onProgress?.({
		stage: "finalizing",
		percent: 95
	});
	await new Promise((resolve) => setTimeout(resolve, 25));
	const blob = doc.output("blob");
	onProgress?.({
		stage: "ready",
		percent: 100
	});
	return {
		blob,
		fileName: buildFileName(details)
	};
}
var formatBytes = (bytes) => {
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / 1048576).toFixed(2)} MB`;
};
var CONFIDENCE_THRESHOLD$1 = .48;
var FULL_QUAD$1 = () => [
	{
		x: 0,
		y: 0
	},
	{
		x: 1,
		y: 0
	},
	{
		x: 1,
		y: 1
	},
	{
		x: 0,
		y: 1
	}
];
var dist$1 = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
var cross = (o, a, b) => (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
var convexHull = (pts) => {
	if (pts.length < 4) return pts.slice();
	const sorted = [...pts].sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x);
	const build = (input) => {
		const out = [];
		for (const p of input) {
			while (out.length >= 2 && cross(out[out.length - 2], out[out.length - 1], p) <= 0) out.pop();
			out.push(p);
		}
		return out;
	};
	const lower = build(sorted);
	const upper = build(sorted.slice().reverse());
	return [...lower.slice(0, -1), ...upper.slice(0, -1)];
};
var polyArea$1 = (q) => {
	let a = 0;
	for (let i = 0; i < q.length; i++) {
		const p = q[i];
		const n = q[(i + 1) % q.length];
		a += p.x * n.y - n.x * p.y;
	}
	return Math.abs(a) / 2;
};
var orderQuad = (pts) => {
	const cx = pts.reduce((s, p) => s + p.x, 0) / pts.length;
	const cy = pts.reduce((s, p) => s + p.y, 0) / pts.length;
	const sorted = [...pts].sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx));
	let best = 0;
	let bestScore = Infinity;
	sorted.forEach((p, i) => {
		const s = p.x + p.y;
		if (s < bestScore) {
			bestScore = s;
			best = i;
		}
	});
	const rot = [...sorted.slice(best), ...sorted.slice(0, best)];
	return [
		rot[0],
		rot[1],
		rot[2],
		rot[3]
	];
};
var padQuad$1 = (quad, factor = .008) => {
	const cx = quad.reduce((s, p) => s + p.x, 0) / 4;
	const cy = quad.reduce((s, p) => s + p.y, 0) / 4;
	return quad.map((c) => ({
		x: Math.min(1, Math.max(0, c.x + (c.x - cx) * factor)),
		y: Math.min(1, Math.max(0, c.y + (c.y - cy) * factor))
	}));
};
var fastBlur = (src, w, h) => {
	const tmp = new Float32Array(src.length);
	const out = new Float32Array(src.length);
	for (let y = 0; y < h; y++) {
		const rowOff = y * w;
		for (let x = 0; x < w; x++) {
			const left = x > 0 ? x - 1 : 0;
			const right = x < w - 1 ? x + 1 : w - 1;
			tmp[rowOff + x] = (src[rowOff + left] + src[rowOff + x] * 2 + src[rowOff + right]) * .25;
		}
	}
	for (let y = 0; y < h; y++) {
		const top = y > 0 ? y - 1 : 0;
		const bot = y < h - 1 ? y + 1 : h - 1;
		const topOff = top * w;
		const midOff = y * w;
		const botOff = bot * w;
		for (let x = 0; x < w; x++) out[midOff + x] = (tmp[topOff + x] + tmp[midOff + x] * 2 + tmp[botOff + x]) * .25;
	}
	return out;
};
var fastSobel = (gray, w, h) => {
	const mag = new Float32Array(w * h);
	for (let y = 1; y < h - 1; y++) {
		const rowPrev = (y - 1) * w;
		const rowCurr = y * w;
		const rowNext = (y + 1) * w;
		for (let x = 1; x < w - 1; x++) {
			const gx = -gray[rowPrev + x - 1] - 2 * gray[rowCurr + x - 1] - gray[rowNext + x - 1] + gray[rowPrev + x + 1] + 2 * gray[rowCurr + x + 1] + gray[rowNext + x + 1];
			const gy = -gray[rowPrev + x - 1] - 2 * gray[rowPrev + x] - gray[rowPrev + x + 1] + gray[rowNext + x - 1] + 2 * gray[rowNext + x] + gray[rowNext + x + 1];
			mag[rowCurr + x] = Math.hypot(gx, gy);
		}
	}
	return mag;
};
var checkBlurry = (gray, w, h) => {
	let sum = 0;
	let sumSq = 0;
	let n = 0;
	for (let y = 1; y < h - 1; y++) {
		const row = y * w;
		for (let x = 1; x < w - 1; x++) {
			const i = row + x;
			const v = 4 * gray[i] - gray[i - 1] - gray[i + 1] - gray[i - w] - gray[i + w];
			sum += v;
			sumSq += v * v;
			n++;
		}
	}
	if (!n) return false;
	const mean = sum / n;
	return sumSq / n - mean * mean < 32;
};
var fastOtsu = (values, maxValue = 255) => {
	const bins = 256;
	const hist = new Int32Array(bins);
	const total = values.length;
	for (let i = 0; i < total; i++) {
		const b = Math.max(0, Math.min(255, Math.round(values[i] / maxValue * 255)));
		hist[b]++;
	}
	let sumAll = 0;
	for (let t = 0; t < bins; t++) sumAll += t * hist[t];
	let wB = 0;
	let sumB = 0;
	let best = 0;
	let bestVar = -1;
	for (let t = 0; t < bins; t++) {
		wB += hist[t];
		if (!wB) continue;
		const wF = total - wB;
		if (!wF) break;
		sumB += t * hist[t];
		const between = wB * wF * (sumB / wB - (sumAll - sumB) / wF) ** 2;
		if (between > bestVar) {
			bestVar = between;
			best = t;
		}
	}
	return best / 255 * maxValue;
};
/** Fast separable morphological closing (Dilation -> Erosion) */
var morphCloseSeparable = (mask, w, h, r = 3) => {
	const hDilated = new Uint8Array(mask.length);
	for (let y = 0; y < h; y++) {
		const rowOff = y * w;
		for (let x = 0; x < w; x++) {
			let hit = 0;
			const minX = Math.max(0, x - r);
			const maxX = Math.min(w - 1, x + r);
			for (let xx = minX; xx <= maxX; xx++) if (mask[rowOff + xx]) {
				hit = 1;
				break;
			}
			hDilated[rowOff + x] = hit;
		}
	}
	const dilated = new Uint8Array(mask.length);
	for (let y = 0; y < h; y++) {
		const minY = Math.max(0, y - r);
		const maxY = Math.min(h - 1, y + r);
		for (let x = 0; x < w; x++) {
			let hit = 0;
			for (let yy = minY; yy <= maxY; yy++) if (hDilated[yy * w + x]) {
				hit = 1;
				break;
			}
			dilated[y * w + x] = hit;
		}
	}
	const hEroded = new Uint8Array(mask.length);
	for (let y = 0; y < h; y++) {
		const rowOff = y * w;
		for (let x = 0; x < w; x++) {
			let all = 1;
			const minX = Math.max(0, x - r);
			const maxX = Math.min(w - 1, x + r);
			for (let xx = minX; xx <= maxX; xx++) if (!dilated[rowOff + xx]) {
				all = 0;
				break;
			}
			hEroded[rowOff + x] = all;
		}
	}
	const closed = new Uint8Array(mask.length);
	for (let y = 0; y < h; y++) {
		const minY = Math.max(0, y - r);
		const maxY = Math.min(h - 1, y + r);
		for (let x = 0; x < w; x++) {
			let all = 1;
			for (let yy = minY; yy <= maxY; yy++) if (!hEroded[yy * w + x]) {
				all = 0;
				break;
			}
			closed[y * w + x] = all;
		}
	}
	return closed;
};
/** Fast typed queue flood-fill for hole closure */
var fillHolesAndConnectPaperFast = (mask, w, h) => {
	const bg = new Uint8Array(mask.length);
	const queue = new Int32Array(mask.length);
	let qHead = 0;
	let qTail = 0;
	const pushIfBg = (idx) => {
		if (mask[idx] === 0 && bg[idx] === 0) {
			bg[idx] = 1;
			queue[qTail++] = idx;
		}
	};
	const lastRow = (h - 1) * w;
	for (let x = 0; x < w; x++) {
		pushIfBg(x);
		pushIfBg(lastRow + x);
	}
	for (let y = 1; y < h - 1; y++) {
		const row = y * w;
		pushIfBg(row);
		pushIfBg(row + (w - 1));
	}
	while (qHead < qTail) {
		const p = queue[qHead++];
		const x = p % w;
		const y = (p - x) / w;
		if (x > 0) pushIfBg(p - 1);
		if (x < w - 1) pushIfBg(p + 1);
		if (y > 0) pushIfBg(p - w);
		if (y < h - 1) pushIfBg(p + w);
	}
	const solidPaper = new Uint8Array(mask.length);
	for (let i = 0; i < mask.length; i++) solidPaper[i] = bg[i] ? 0 : 1;
	return solidPaper;
};
/** Direct outer boundary point extraction from solid paper mask */
var getPaperBoundaryFast = (mask, w, h) => {
	const boundary = [];
	let area = 0;
	for (let y = 0; y < h; y++) {
		const row = y * w;
		for (let x = 0; x < w; x++) {
			const idx = row + x;
			if (mask[idx]) {
				area++;
				if (x === 0 || y === 0 || x === w - 1 || y === h - 1 || mask[idx - 1] === 0 || mask[idx + 1] === 0 || mask[idx - w] === 0 || mask[idx + w] === 0) boundary.push({
					x,
					y
				});
			}
		}
	}
	return {
		boundary,
		area
	};
};
var extract4SheetCorners = (hull) => {
	if (hull.length < 4) return null;
	const cx = hull.reduce((s, p) => s + p.x, 0) / hull.length;
	const cy = hull.reduce((s, p) => s + p.y, 0) / hull.length;
	let tl = null;
	let tr = null;
	let br = null;
	let bl = null;
	let scoreTL = -Infinity;
	let scoreTR = -Infinity;
	let scoreBR = -Infinity;
	let scoreBL = -Infinity;
	for (const p of hull) {
		const dx = p.x - cx;
		const dy = p.y - cy;
		const sTL = -dx - dy;
		const sTR = dx - dy;
		const sBR = dx + dy;
		const sBL = -dx + dy;
		if (sTL > scoreTL) {
			scoreTL = sTL;
			tl = p;
		}
		if (sTR > scoreTR) {
			scoreTR = sTR;
			tr = p;
		}
		if (sBR > scoreBR) {
			scoreBR = sBR;
			br = p;
		}
		if (sBL > scoreBL) {
			scoreBL = sBL;
			bl = p;
		}
	}
	if (!tl || !tr || !br || !bl) return null;
	return orderQuad([
		tl,
		tr,
		br,
		bl
	]);
};
var scorePaperQuad = (quad, gray, mag, paperMask, w, h) => {
	const areaRatio = polyArea$1(quad) / (w * h);
	if (areaRatio < .28 || areaRatio > .999) return 0;
	let angleScore = 0;
	let convex = true;
	let signRef = 0;
	for (let i = 0; i < 4; i++) {
		const p = quad[i];
		const prev = quad[(i + 3) % 4];
		const next = quad[(i + 1) % 4];
		const v1 = {
			x: prev.x - p.x,
			y: prev.y - p.y
		};
		const v2 = {
			x: next.x - p.x,
			y: next.y - p.y
		};
		const l1 = Math.hypot(v1.x, v1.y) || 1;
		const l2 = Math.hypot(v2.x, v2.y) || 1;
		const cosA = (v1.x * v2.x + v1.y * v2.y) / (l1 * l2);
		const deg = Math.acos(Math.max(-1, Math.min(1, cosA))) * 180 / Math.PI;
		angleScore += Math.max(0, 1 - Math.abs(deg - 90) / 45);
		const c = cross(prev, p, next);
		const s = Math.sign(c);
		if (!signRef) signRef = s;
		else if (s && s !== signRef) convex = false;
	}
	angleScore /= 4;
	if (!convex) return 0;
	const s01 = dist$1(quad[0], quad[1]);
	const s12 = dist$1(quad[1], quad[2]);
	const s23 = dist$1(quad[2], quad[3]);
	const s30 = dist$1(quad[3], quad[0]);
	if (Math.min(s01, s12, s23, s30) < Math.min(w, h) * .2) return 0;
	const parallelism = Math.min(s01, s23) / Math.max(s01, s23) * (Math.min(s12, s30) / Math.max(s12, s30));
	const cx = quad.reduce((s, p) => s + p.x, 0) / 4;
	const cy = quad.reduce((s, p) => s + p.y, 0) / 4;
	let transitionScore = 0;
	let gradientHits = 0;
	let totalSamples = 0;
	for (let i = 0; i < 4; i++) {
		const a = quad[i];
		const b = quad[(i + 1) % 4];
		const steps = Math.max(12, Math.round(dist$1(a, b) * .7));
		for (let s = 1; s < steps; s++) {
			const t = s / steps;
			const px = a.x + (b.x - a.x) * t;
			const py = a.y + (b.y - a.y) * t;
			const inX = Math.round(cx + (px - cx) * .94);
			const inY = Math.round(cy + (py - cy) * .94);
			const outX = Math.round(cx + (px - cx) * 1.06);
			const outY = Math.round(cy + (py - cy) * 1.06);
			if (inX >= 0 && inX < w && inY >= 0 && inY < h && outX >= 0 && outX < w && outY >= 0 && outY < h) {
				const inMask = paperMask[inY * w + inX];
				const outMask = paperMask[outY * w + outX];
				const inG = gray[inY * w + inX];
				const outG = gray[outY * w + outX];
				if (inMask === 1 && outMask === 0) transitionScore += 1;
				else if (Math.abs(inG - outG) > 22) transitionScore += .7;
				const midX = Math.min(w - 1, Math.max(0, Math.round(px)));
				if (mag[Math.min(h - 1, Math.max(0, Math.round(py))) * w + midX] > 20) gradientHits++;
				totalSamples++;
			}
		}
	}
	const boundaryTransition = totalSamples ? transitionScore / totalSamples : 0;
	const gradientSupport = totalSamples ? gradientHits / totalSamples : 0;
	return boundaryTransition * .4 + gradientSupport * .25 + angleScore * .15 + parallelism * .1 + Math.min(1, areaRatio / .5) * .1;
};
function processDocumentPixels(data, w, h) {
	const pixelCount = w * h;
	const gray = new Float32Array(pixelCount);
	const sat = new Float32Array(pixelCount);
	for (let i = 0; i < pixelCount; i++) {
		const off = i * 4;
		const r = data[off];
		const g = data[off + 1];
		const b = data[off + 2];
		gray[i] = .299 * r + .587 * g + .114 * b;
		sat[i] = Math.max(r, g, b) - Math.min(r, g, b);
	}
	const smooth = fastBlur(gray, w, h);
	const mag = fastSobel(smooth, w, h);
	const blurry = checkBlurry(gray, w, h);
	const grayOtsu = fastOtsu(smooth);
	const satOtsu = Math.max(16, fastOtsu(sat));
	const candidateMasks = [];
	for (const multiplier of [
		.98,
		.9,
		1.08
	]) {
		const raw = new Uint8Array(pixelCount);
		const threshold = grayOtsu * multiplier;
		for (let i = 0; i < pixelCount; i++) raw[i] = smooth[i] >= threshold ? 1 : 0;
		const filled = fillHolesAndConnectPaperFast(morphCloseSeparable(raw, w, h, 3), w, h);
		candidateMasks.push(filled);
	}
	{
		const raw = new Uint8Array(pixelCount);
		for (let i = 0; i < pixelCount; i++) raw[i] = sat[i] <= satOtsu && smooth[i] > grayOtsu * .8 ? 1 : 0;
		const filled = fillHolesAndConnectPaperFast(morphCloseSeparable(raw, w, h, 3), w, h);
		candidateMasks.push(filled);
	}
	const candidates = [];
	for (const mask of candidateMasks) {
		const { boundary, area } = getPaperBoundaryFast(mask, w, h);
		const areaRatio = area / pixelCount;
		if (areaRatio > .82) return {
			quad: FULL_QUAD$1(),
			confidence: .95,
			blurry,
			isConfident: true
		};
		if (areaRatio < .28 || boundary.length < 8) continue;
		const quad = extract4SheetCorners(convexHull(boundary));
		if (!quad) continue;
		const score = scorePaperQuad(quad, smooth, mag, mask, w, h);
		if (score > 0) {
			candidates.push({
				quad,
				score,
				areaRatio
			});
			if (score >= .85) break;
		}
	}
	if (candidates.length === 0) return {
		quad: FULL_QUAD$1(),
		confidence: 0,
		blurry,
		isConfident: false
	};
	candidates.sort((a, b) => b.score - a.score);
	const best = candidates[0];
	let confidence = best.score;
	if (blurry) confidence *= .85;
	if (!(confidence >= CONFIDENCE_THRESHOLD$1)) return {
		quad: FULL_QUAD$1(),
		confidence: Math.min(1, confidence),
		blurry,
		isConfident: false
	};
	const safePaddedQuad = padQuad$1(best.quad.map((c) => ({
		x: Math.max(0, Math.min(1, c.x / w)),
		y: Math.max(0, Math.min(1, c.y / h))
	})), .008);
	if (safePaddedQuad.filter((c) => c.x <= .035 || c.x >= .965 || c.y <= .035 || c.y >= .965).length >= 2 || best.areaRatio > .8) return {
		quad: FULL_QUAD$1(),
		confidence: .95,
		blurry,
		isConfident: true
	};
	return {
		quad: safePaddedQuad,
		confidence: Math.min(1, confidence),
		blurry,
		isConfident: true
	};
}
if (typeof self !== "undefined" && typeof self.postMessage === "function") self.onmessage = (e) => {
	const { id, buffer, width, height } = e.data;
	try {
		const result = processDocumentPixels(new Uint8ClampedArray(buffer), width, height);
		self.postMessage({
			id,
			result,
			success: true
		});
	} catch {
		self.postMessage({
			id,
			result: {
				quad: FULL_QUAD$1(),
				confidence: 0,
				blurry: false,
				isConfident: false
			},
			success: false
		});
	}
};
var AUTO_CROP_PAD_FACTOR = .012;
/** The entire uncropped image frame (0-1 in all dimensions). */
var FULL_QUAD = () => [
	{
		x: 0,
		y: 0
	},
	{
		x: 1,
		y: 0
	},
	{
		x: 1,
		y: 1
	},
	{
		x: 0,
		y: 1
	}
];
var imageCache = /* @__PURE__ */ new Map();
var loadImage = (src) => new Promise((resolve, reject) => {
	if (imageCache.has(src)) {
		const cached = imageCache.get(src);
		if (cached.complete && cached.naturalWidth > 0) {
			resolve(cached);
			return;
		}
	}
	const img = new Image();
	img.onload = () => {
		if (imageCache.size > 8) {
			const firstKey = imageCache.keys().next().value;
			if (firstKey) imageCache.delete(firstKey);
		}
		imageCache.set(src, img);
		resolve(img);
	};
	img.onerror = () => reject(/* @__PURE__ */ new Error("Could not read image"));
	img.src = src;
});
var makeCanvas = (w, h) => {
	const canvas = document.createElement("canvas");
	canvas.width = Math.max(1, w);
	canvas.height = Math.max(1, h);
	const ctx = canvas.getContext("2d", { willReadFrequently: true });
	if (!ctx) throw new Error("Canvas not available");
	return {
		canvas,
		ctx
	};
};
var dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
var polyArea = (q) => {
	let a = 0;
	for (let i = 0; i < q.length; i++) {
		const p = q[i];
		const n = q[(i + 1) % q.length];
		a += p.x * n.y - n.x * p.y;
	}
	return Math.abs(a) / 2;
};
/** Validates that 4 points form a strictly convex, non-self-intersecting quadrilateral. */
var isConvexQuad = (pts) => {
	if (!pts || pts.length !== 4) return false;
	let sign = 0;
	for (let i = 0; i < 4; i++) {
		const p0 = pts[i];
		const p1 = pts[(i + 1) % 4];
		const p2 = pts[(i + 2) % 4];
		const cross = (p1.x - p0.x) * (p2.y - p0.y) - (p1.y - p0.y) * (p2.x - p0.x);
		if (Math.abs(cross) < 1e-7) return false;
		const s = Math.sign(cross);
		if (sign === 0) sign = s;
		else if (s !== sign) return false;
	}
	return polyArea(pts) > .005;
};
/**
* Expands a quad slightly outwards from its center so that all outer paper edges,
* blank margins, and corner borders are completely preserved.
*/
var padQuad = (quad, factor = .008) => {
	const cx = quad.reduce((s, p) => s + p.x, 0) / 4;
	const cy = quad.reduce((s, p) => s + p.y, 0) / 4;
	return quad.map((c) => ({
		x: Math.min(1, Math.max(0, c.x + (c.x - cx) * factor)),
		y: Math.min(1, Math.max(0, c.y + (c.y - cy) * factor))
	}));
};
/** Rotates normalized quad coordinates according to image rotations. */
var rotateQuad = (quad, degrees) => {
	if (degrees === 90 || degrees === -270) {
		const mapped = quad.map((c) => ({
			x: Math.max(0, Math.min(1, 1 - c.y)),
			y: Math.max(0, Math.min(1, c.x))
		}));
		return [
			mapped[3],
			mapped[0],
			mapped[1],
			mapped[2]
		];
	} else if (degrees === 180 || degrees === -180) {
		const mapped = quad.map((c) => ({
			x: Math.max(0, Math.min(1, 1 - c.x)),
			y: Math.max(0, Math.min(1, 1 - c.y))
		}));
		return [
			mapped[2],
			mapped[3],
			mapped[0],
			mapped[1]
		];
	} else {
		const mapped = quad.map((c) => ({
			x: Math.max(0, Math.min(1, c.y)),
			y: Math.max(0, Math.min(1, 1 - c.x))
		}));
		return [
			mapped[1],
			mapped[2],
			mapped[3],
			mapped[0]
		];
	}
};
var detectorWorker = null;
var workerTaskId = 0;
var workerCallbacks = /* @__PURE__ */ new Map();
function getWorker() {
	if (typeof window === "undefined" || typeof Worker === "undefined") return null;
	if (!detectorWorker) try {
		detectorWorker = new Worker(new URL("./detector-worker.ts", import.meta.url), { type: "module" });
		detectorWorker.onmessage = (e) => {
			const { id, result } = e.data;
			const cb = workerCallbacks.get(id);
			if (cb) {
				workerCallbacks.delete(id);
				cb(result);
			}
		};
		detectorWorker.onerror = () => {
			detectorWorker = null;
		};
	} catch {
		detectorWorker = null;
	}
	return detectorWorker;
}
var DETECT_DIM = 400;
async function detectDocument(dataUrl) {
	const img = await loadImage(dataUrl);
	const scale = Math.min(DETECT_DIM / Math.max(img.naturalWidth, img.naturalHeight), 1);
	const w = Math.max(1, Math.round(img.naturalWidth * scale));
	const h = Math.max(1, Math.round(img.naturalHeight * scale));
	const { ctx } = makeCanvas(w, h);
	ctx.drawImage(img, 0, 0, w, h);
	const imageData = ctx.getImageData(0, 0, w, h);
	const worker = getWorker();
	if (worker) return new Promise((resolve) => {
		const taskId = ++workerTaskId;
		workerCallbacks.set(taskId, (result) => resolve(result));
		const buffer = imageData.data.buffer;
		worker.postMessage({
			id: taskId,
			buffer,
			width: w,
			height: h
		}, [buffer]);
	});
	await new Promise((r) => setTimeout(r, 0));
	return processDocumentPixels(imageData.data, w, h);
}
var solve8 = (a, b) => {
	const n = 8;
	const m = a.map((row, i) => [...row, b[i]]);
	for (let col = 0; col < n; col++) {
		let pivot = col;
		for (let r = col + 1; r < n; r++) if (Math.abs(m[r][col]) > Math.abs(m[pivot][col])) pivot = r;
		if (Math.abs(m[pivot][col]) < 1e-12) return null;
		[m[col], m[pivot]] = [m[pivot], m[col]];
		for (let r = 0; r < n; r++) {
			if (r === col) continue;
			const f = m[r][col] / m[col][col];
			for (let c = col; c <= n; c++) m[r][c] -= f * m[col][c];
		}
	}
	return m.map((row, i) => row[n] / m[i][i]);
};
/**
* Applies a high-precision 4-point perspective warp.
* Straightens the angled sheet into a clean rectangular document while preserving all handwritten details.
*/
async function warpQuad(dataUrl, quad, maxDim = 2400) {
	const img = await loadImage(dataUrl);
	const iw = img.naturalWidth || img.width;
	const ih = img.naturalHeight || img.height;
	if (!iw || !ih || iw <= 0 || ih <= 0) return {
		dataUrl,
		width: 1,
		height: 1
	};
	if (!isConvexQuad(quad)) {
		console.warn("Invalid non-convex quadrilateral detected, using unwarped frame.");
		return {
			dataUrl,
			width: iw,
			height: ih
		};
	}
	if (quad[0].x <= .008 && quad[0].y <= .008 && quad[1].x >= .992 && quad[1].y <= .008 && quad[2].x >= .992 && quad[2].y >= .992 && quad[3].x <= .008 && quad[3].y >= .992) return {
		dataUrl,
		width: iw,
		height: ih
	};
	const px = quad.map((c) => ({
		x: Math.max(0, Math.min(iw, c.x * iw)),
		y: Math.max(0, Math.min(ih, c.y * ih))
	}));
	const outW = Math.max(10, Math.round(Math.max(dist(px[0], px[1]), dist(px[3], px[2]))));
	const outH = Math.max(10, Math.round(Math.max(dist(px[0], px[3]), dist(px[1], px[2]))));
	const scale = Math.min(maxDim / Math.max(outW, outH), 1);
	const w = Math.max(10, Math.round(outW * scale));
	const h = Math.max(10, Math.round(outH * scale));
	const { canvas: scanvas, ctx: sctx } = makeCanvas(iw, ih);
	sctx.drawImage(img, 0, 0);
	const srcData = sctx.getImageData(0, 0, iw, ih).data;
	scanvas.width = 1;
	scanvas.height = 1;
	const dst = [
		{
			x: 0,
			y: 0
		},
		{
			x: w,
			y: 0
		},
		{
			x: w,
			y: h
		},
		{
			x: 0,
			y: h
		}
	];
	const A = [];
	const B = [];
	for (let i = 0; i < 4; i++) {
		const u = dst[i].x;
		const v = dst[i].y;
		const x = px[i].x;
		const y = px[i].y;
		A.push([
			u,
			v,
			1,
			0,
			0,
			0,
			-u * x,
			-v * x
		]);
		B.push(x);
		A.push([
			0,
			0,
			0,
			u,
			v,
			1,
			-u * y,
			-v * y
		]);
		B.push(y);
	}
	const sol = solve8(A, B);
	const { canvas: out, ctx: octx } = makeCanvas(w, h);
	if (!sol) {
		octx.drawImage(img, 0, 0, w, h);
		return {
			dataUrl: out.toDataURL("image/jpeg", .95),
			width: w,
			height: h
		};
	}
	const [h11, h12, h13, h21, h22, h23, h31, h32] = sol;
	const outImage = octx.createImageData(w, h);
	const od = outImage.data;
	const maxSrcX = iw - 1;
	const maxSrcY = ih - 1;
	for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
		const den = h31 * x + h32 * y + 1;
		const o = (y * w + x) * 4;
		if (Math.abs(den) < 1e-6) {
			od[o] = od[o + 1] = od[o + 2] = 255;
			od[o + 3] = 255;
			continue;
		}
		const rawSx = (h11 * x + h12 * y + h13) / den;
		const rawSy = (h21 * x + h22 * y + h23) / den;
		if (isNaN(rawSx) || isNaN(rawSy) || !isFinite(rawSx) || !isFinite(rawSy)) {
			od[o] = od[o + 1] = od[o + 2] = 255;
			od[o + 3] = 255;
			continue;
		}
		const sx = Math.max(0, Math.min(maxSrcX, rawSx));
		const sy = Math.max(0, Math.min(maxSrcY, rawSy));
		const x0 = Math.floor(sx);
		const y0 = Math.floor(sy);
		const x1 = Math.min(maxSrcX, x0 + 1);
		const y1 = Math.min(maxSrcY, y0 + 1);
		const fx = sx - x0;
		const fy = sy - y0;
		for (let c = 0; c < 3; c++) {
			const i00 = (y0 * iw + x0) * 4 + c;
			const i10 = (y0 * iw + x1) * 4 + c;
			const i01 = (y1 * iw + x0) * 4 + c;
			const i11 = (y1 * iw + x1) * 4 + c;
			const top = srcData[i00] * (1 - fx) + srcData[i10] * fx;
			const bottom = srcData[i01] * (1 - fx) + srcData[i11] * fx;
			od[o + c] = Math.round(top * (1 - fy) + bottom * fy);
		}
		od[o + 3] = 255;
	}
	octx.putImageData(outImage, 0, 0);
	const resultDataUrl = out.toDataURL("image/jpeg", .95);
	out.width = 1;
	out.height = 1;
	return {
		dataUrl: resultDataUrl,
		width: w,
		height: h
	};
}
/** Rotates an image by 90, 180, 270, or -90 degrees. */
async function rotateImage(dataUrl, degrees) {
	if (degrees === 0) return dataUrl;
	const img = await loadImage(dataUrl);
	const iw = img.naturalWidth;
	const ih = img.naturalHeight;
	const isPerpendicular = Math.abs(degrees) === 90 || Math.abs(degrees) === 270;
	const { canvas, ctx } = makeCanvas(isPerpendicular ? ih : iw, isPerpendicular ? iw : ih);
	ctx.translate(canvas.width / 2, canvas.height / 2);
	ctx.rotate(degrees * Math.PI / 180);
	ctx.drawImage(img, -iw / 2, -ih / 2);
	const rotated = canvas.toDataURL("image/jpeg", .95);
	canvas.width = 1;
	canvas.height = 1;
	return rotated;
}
/**
* Automatically crops and straightens a document image by detecting outer paper sheet boundaries.
* Preserves the full physical sheet of paper, margins, and content.
*/
async function autoCropImage(dataUrl) {
	const detection = await detectDocument(dataUrl);
	if (detection.isConfident && detection.confidence >= .48) {
		const paddedQuad = padQuad(detection.quad, AUTO_CROP_PAD_FACTOR);
		return {
			dataUrl: (await warpQuad(dataUrl, paddedQuad, 2200)).dataUrl,
			isCropped: true,
			quad: paddedQuad,
			confidence: detection.confidence
		};
	}
	return {
		dataUrl,
		isCropped: false,
		quad: FULL_QUAD(),
		confidence: detection.confidence
	};
}
var _jsxFileName$8 = "/app/applet/src/components/DocumentScannerModal.tsx";
var CORNER_ABBR = [
	"TL",
	"TR",
	"BR",
	"BL"
];
var DocumentScannerModal = (props) => {
	if (!props.isOpen || !props.image) return null;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ScannerModalDialog, {
		...props,
		image: props.image
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 52,
		columnNumber: 10
	}, void 0);
};
var ScannerModalDialog = ({ image, pageNumber, onClose, onApply, onRevertToOriginal }) => {
	const { t } = useLanguage();
	const CORNER_NAMES = [
		t("cornerTopLeft"),
		t("cornerTopRight"),
		t("cornerBottomRight"),
		t("cornerBottomLeft")
	];
	const [workingDataUrl, setWorkingDataUrl] = (0, import_react.useState)(image.originalDataUrl || image.dataUrl);
	const [corners, setCorners] = (0, import_react.useState)(image.currentQuad || FULL_QUAD());
	const [initialCorners, setInitialCorners] = (0, import_react.useState)(image.currentQuad || FULL_QUAD());
	const [confidence, setConfidence] = (0, import_react.useState)(image.confidence ?? null);
	const [isDetecting, setIsDetecting] = (0, import_react.useState)(false);
	const [isWarping, setIsWarping] = (0, import_react.useState)(false);
	const [activeTab, setActiveTab] = (0, import_react.useState)("edit");
	const [previewWarpUrl, setPreviewWarpUrl] = (0, import_react.useState)(null);
	const [draggingIndex, setDraggingIndex] = (0, import_react.useState)(null);
	const [dragPos, setDragPos] = (0, import_react.useState)(null);
	const [imageDims, setImageDims] = (0, import_react.useState)({
		width: 800,
		height: 1e3
	});
	const containerRef = (0, import_react.useRef)(null);
	const imageRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let isMounted = true;
		const initDataUrl = image.originalDataUrl || image.dataUrl;
		setWorkingDataUrl(initDataUrl);
		const img = new Image();
		img.onload = async () => {
			if (!isMounted) return;
			setImageDims({
				width: img.naturalWidth || 800,
				height: img.naturalHeight || 1e3
			});
			if (image.currentQuad) {
				setCorners(image.currentQuad);
				setInitialCorners(image.currentQuad);
				setConfidence(image.confidence ?? .9);
			} else {
				setIsDetecting(true);
				try {
					const res = await detectDocument(initDataUrl);
					if (isMounted) {
						if (res.isConfident && res.confidence >= .48) {
							const padded = padQuad(res.quad, AUTO_CROP_PAD_FACTOR);
							setCorners(padded);
							setInitialCorners(padded);
						} else {
							const fallback = FULL_QUAD();
							setCorners(fallback);
							setInitialCorners(fallback);
						}
						setConfidence(res.confidence);
					}
				} catch {
					if (isMounted) {
						const fallback = FULL_QUAD();
						setCorners(fallback);
						setInitialCorners(fallback);
						setConfidence(0);
					}
				} finally {
					if (isMounted) setIsDetecting(false);
				}
			}
		};
		img.src = initDataUrl;
		return () => {
			isMounted = false;
		};
	}, [image]);
	(0, import_react.useEffect)(() => {
		if (activeTab === "preview") {
			let isMounted = true;
			setIsWarping(true);
			warpQuad(workingDataUrl, corners, 1e3).then((res) => {
				if (isMounted) {
					setPreviewWarpUrl(res.dataUrl);
					setIsWarping(false);
				}
			}).catch(() => {
				if (isMounted) setIsWarping(false);
			});
			return () => {
				isMounted = false;
			};
		}
	}, [
		activeTab,
		workingDataUrl,
		corners
	]);
	const runAutoDetect = async () => {
		if (isDetecting) return;
		setIsDetecting(true);
		try {
			const res = await detectDocument(workingDataUrl);
			if (res.isConfident && res.confidence >= .48) {
				const padded = padQuad(res.quad, AUTO_CROP_PAD_FACTOR);
				setCorners(padded);
			} else setCorners(FULL_QUAD());
			setConfidence(res.confidence);
		} catch {
			setCorners(FULL_QUAD());
			setConfidence(0);
		} finally {
			setIsDetecting(false);
		}
	};
	const handleRotate = async (degrees) => {
		setIsDetecting(true);
		try {
			const rotatedUrl = await rotateImage(workingDataUrl, degrees);
			setWorkingDataUrl(rotatedUrl);
			setCorners((prev) => rotateQuad(prev, degrees));
			setInitialCorners((prev) => rotateQuad(prev, degrees));
			setImageDims((prev) => ({
				width: prev.height,
				height: prev.width
			}));
		} finally {
			setIsDetecting(false);
		}
	};
	const handleResetCorners = () => {
		setCorners(initialCorners);
	};
	const handleSetFullPage = () => {
		setCorners(FULL_QUAD());
	};
	const handleUseOriginal = () => {
		onRevertToOriginal(image.id);
		onClose();
	};
	const handleApplyCrop = async () => {
		setIsWarping(true);
		try {
			const warped = await warpQuad(workingDataUrl, corners, 2400);
			onApply({
				id: image.id,
				dataUrl: warped.dataUrl,
				isCropped: true,
				currentQuad: corners,
				confidence: confidence ?? 1
			});
			onClose();
		} catch {
			onApply({
				id: image.id,
				dataUrl: workingDataUrl,
				isCropped: true,
				currentQuad: corners,
				confidence: confidence ?? .8
			});
			onClose();
		} finally {
			setIsWarping(false);
		}
	};
	const handlePointerDown = (index, e) => {
		e.preventDefault();
		e.stopPropagation();
		e.target.setPointerCapture(e.pointerId);
		setDraggingIndex(index);
		updateCornerPos(index, e.clientX, e.clientY);
	};
	const updateCornerPos = (0, import_react.useCallback)((index, clientX, clientY) => {
		if (!containerRef.current) return;
		const rect = containerRef.current.getBoundingClientRect();
		let x = (clientX - rect.left) / rect.width;
		let y = (clientY - rect.top) / rect.height;
		if (x < .025) x = 0;
		else if (x > .975) x = 1;
		else x = Math.max(0, Math.min(1, x));
		if (y < .025) y = 0;
		else if (y > .975) y = 1;
		else y = Math.max(0, Math.min(1, y));
		setDragPos({
			x: clientX - rect.left,
			y: clientY - rect.top
		});
		setCorners((prev) => {
			const next = [...prev];
			next[index] = {
				x,
				y
			};
			return next;
		});
	}, []);
	const handlePointerMove = (e) => {
		if (draggingIndex === null) return;
		updateCornerPos(draggingIndex, e.clientX, e.clientY);
	};
	const handlePointerUp = (e) => {
		if (draggingIndex !== null) {
			try {
				e.target.releasePointerCapture(e.pointerId);
			} catch {}
			setDraggingIndex(null);
			setDragPos(null);
		}
	};
	const isLowConfidence = confidence !== null && confidence < .42;
	const pTL = {
		x: corners[0].x * 100,
		y: corners[0].y * 100
	};
	const pTR = {
		x: corners[1].x * 100,
		y: corners[1].y * 100
	};
	const pBR = {
		x: corners[2].x * 100,
		y: corners[2].y * 100
	};
	const pBL = {
		x: corners[3].x * 100,
		y: corners[3].y * 100
	};
	const cutoutPath = `M 0 0 H 100 V 100 H 0 Z M ${pTL.x} ${pTL.y} L ${pTR.x} ${pTR.y} L ${pBR.x} ${pBR.y} L ${pBL.x} ${pBL.y} Z`;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		id: "document-scanner-modal",
		className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-2 backdrop-blur-sm sm:p-4 md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
			className: "flex h-full max-h-[96vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-border/40 bg-card text-card-foreground shadow-2xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
					className: "flex flex-wrap items-center justify-between gap-3 border-b border-border/50 bg-secondary/30 px-4 py-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crop, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 306,
								columnNumber: 15
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 305,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
								className: "text-base font-semibold sm:text-lg",
								children: t("scannerTitle", { page: pageNumber })
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 310,
								columnNumber: 17
							}, void 0), image.isCropped && /* @__PURE__ */ (void 0)(Badge, {
								variant: "outline",
								className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
								children: t("croppedBadge")
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 314,
								columnNumber: 19
							}, void 0)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 309,
							columnNumber: 15
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: t("scannerDesc")
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 322,
							columnNumber: 15
						}, void 0)] }, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 308,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 304,
						columnNumber: 11
					}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex rounded-lg border border-border bg-background p-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setActiveTab("edit"),
								className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === "edit" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Crop, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 338,
									columnNumber: 17
								}, void 0), t("adjustCornersTab")]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 329,
								columnNumber: 15
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
								type: "button",
								onClick: () => setActiveTab("preview"),
								className: `flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === "preview" ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"}`,
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Eye, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 350,
									columnNumber: 17
								}, void 0), t("straightenedPreviewTab")]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 341,
								columnNumber: 15
							}, void 0)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 328,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							variant: "ghost",
							size: "icon",
							onClick: onClose,
							className: "h-8 w-8 text-muted-foreground hover:text-foreground",
							"aria-label": t("closeScanner"),
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 362,
								columnNumber: 15
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 355,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 326,
						columnNumber: 11
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 303,
					columnNumber: 9
				}, void 0),
				isLowConfidence && !isDetecting && activeTab === "edit" && /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2.5 border-b border-amber-500/20 bg-amber-500/10 px-4 py-2 text-xs text-amber-700 dark:text-amber-300 sm:px-6",
					children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" }, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 370,
						columnNumber: 13
					}, void 0), /* @__PURE__ */ (void 0)("p", { children: t("lowConfidenceWarning") }, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 371,
						columnNumber: 13
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 369,
					columnNumber: 11
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "relative flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-zinc-950/90 p-3 sm:p-5",
					children: [isDetecting && /* @__PURE__ */ (void 0)("div", {
						className: "absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-xs",
						children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 379,
							columnNumber: 15
						}, void 0), /* @__PURE__ */ (void 0)("p", {
							className: "mt-2 text-sm font-medium text-white",
							children: t("detectingBoundary")
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 380,
							columnNumber: 15
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 378,
						columnNumber: 13
					}, void 0), activeTab === "edit" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						ref: containerRef,
						onPointerMove: handlePointerMove,
						onPointerUp: handlePointerUp,
						onPointerLeave: handlePointerUp,
						className: "relative select-none",
						style: {
							maxWidth: "100%",
							maxHeight: "100%",
							aspectRatio: `${imageDims.width} / ${imageDims.height}`,
							touchAction: "none"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								ref: imageRef,
								src: workingDataUrl,
								alt: "Scanner source",
								className: "pointer-events-none h-full w-full rounded-md object-contain shadow-lg",
								draggable: false
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 399,
								columnNumber: 15
							}, void 0),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("svg", {
								viewBox: "0 0 100 100",
								preserveAspectRatio: "none",
								className: "pointer-events-none absolute inset-0 h-full w-full",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("path", {
									d: cutoutPath,
									fill: "rgba(0, 0, 0, 0.48)",
									fillRule: "evenodd"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 414,
									columnNumber: 17
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("polygon", {
									points: `${pTL.x},${pTL.y} ${pTR.x},${pTR.y} ${pBR.x},${pBR.y} ${pBL.x},${pBL.y}`,
									fill: "rgba(16, 185, 129, 0.08)",
									stroke: "#10b981",
									strokeWidth: "0.8",
									strokeDasharray: "2 1",
									className: "transition-all duration-75"
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 417,
									columnNumber: 17
								}, void 0)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 408,
								columnNumber: 15
							}, void 0),
							corners.map((c, i) => {
								const isDragging = draggingIndex === i;
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									id: `corner-handle-${CORNER_ABBR[i].toLowerCase()}`,
									onPointerDown: (e) => handlePointerDown(i, e),
									style: {
										left: `${c.x * 100}%`,
										top: `${c.y * 100}%`,
										transform: "translate(-50%, -50%)",
										touchAction: "none"
									},
									className: `group absolute z-20 flex h-11 w-11 cursor-grab items-center justify-center active:cursor-grabbing ${isDragging ? "z-30 scale-110" : ""}`,
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `flex h-6 w-6 items-center justify-center rounded-full border-2 border-white shadow-md transition-transform ${isDragging ? "bg-emerald-500 ring-4 ring-emerald-400/40" : "bg-emerald-600 hover:scale-110 hover:bg-emerald-500"}`,
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[9px] font-bold text-white leading-none",
											children: CORNER_ABBR[i]
										}, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 453,
											columnNumber: 23
										}, void 0)
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 446,
										columnNumber: 21
									}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: `pointer-events-none absolute -top-6 rounded bg-black/80 px-1.5 py-0.5 text-[9px] font-semibold text-white uppercase tracking-wider whitespace-nowrap shadow opacity-0 transition-opacity group-hover:opacity-100 ${isDragging ? "opacity-100" : ""}`,
										children: CORNER_NAMES[i]
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 459,
										columnNumber: 21
									}, void 0)]
								}, CORNER_NAMES[i], true, {
									fileName: _jsxFileName$8,
									lineNumber: 431,
									columnNumber: 19
								}, void 0);
							}),
							draggingIndex !== null && dragPos && /* @__PURE__ */ (void 0)("div", {
								className: "pointer-events-none absolute z-40 h-28 w-28 overflow-hidden rounded-full border-2 border-white bg-black shadow-2xl ring-4 ring-emerald-500/50",
								style: {
									left: `${dragPos.x}px`,
									top: `${dragPos.y - 75}px`,
									transform: "translate(-50%, -50%)"
								},
								children: [/* @__PURE__ */ (void 0)("img", {
									src: workingDataUrl,
									alt: "Zoom loupe",
									className: "absolute",
									style: {
										width: `${imageDims.width}px`,
										height: `${imageDims.height}px`,
										maxWidth: "none",
										maxHeight: "none",
										left: `-${corners[draggingIndex].x * imageDims.width - 56}px`,
										top: `-${corners[draggingIndex].y * imageDims.height - 56}px`,
										transformOrigin: "0 0"
									}
								}, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 480,
									columnNumber: 19
								}, void 0), /* @__PURE__ */ (void 0)("div", {
									className: "absolute inset-0 flex items-center justify-center",
									children: [
										/* @__PURE__ */ (void 0)("div", { className: "h-4 w-4 rounded-full border border-emerald-400 bg-emerald-400/30" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 496,
											columnNumber: 21
										}, void 0),
										/* @__PURE__ */ (void 0)("div", { className: "absolute h-full w-[1px] bg-emerald-400/40" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 497,
											columnNumber: 21
										}, void 0),
										/* @__PURE__ */ (void 0)("div", { className: "absolute h-[1px] w-full bg-emerald-400/40" }, void 0, false, {
											fileName: _jsxFileName$8,
											lineNumber: 498,
											columnNumber: 21
										}, void 0)
									]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 495,
									columnNumber: 19
								}, void 0)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 472,
								columnNumber: 17
							}, void 0)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 385,
						columnNumber: 13
					}, void 0) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-full w-full items-center justify-center",
						children: isWarping ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex flex-col items-center justify-center text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 508,
								columnNumber: 19
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "mt-2 text-xs font-medium",
								children: t("applyingWarp")
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 509,
								columnNumber: 19
							}, void 0)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 507,
							columnNumber: 17
						}, void 0) : previewWarpUrl ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex max-h-full max-w-full flex-col items-center justify-center",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
								src: previewWarpUrl,
								alt: "Straightened document scan",
								className: "max-h-[68vh] max-w-full rounded-md border border-border/50 object-contain shadow-2xl"
							}, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 513,
								columnNumber: 19
							}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "mt-2 flex items-center gap-1.5 text-xs text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5 text-emerald-500" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 519,
									columnNumber: 21
								}, void 0), t("perspectiveStraightenedSuccess")]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 518,
								columnNumber: 19
							}, void 0)]
						}, void 0, true, {
							fileName: _jsxFileName$8,
							lineNumber: 512,
							columnNumber: 17
						}, void 0) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: t("previewFailed")
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 524,
							columnNumber: 17
						}, void 0)
					}, void 0, false, {
						fileName: _jsxFileName$8,
						lineNumber: 505,
						columnNumber: 13
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 376,
					columnNumber: 9
				}, void 0),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("footer", {
					className: "flex flex-wrap items-center justify-between gap-3 border-t border-border/50 bg-secondary/20 p-3 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								id: "btn-scanner-autocrop",
								variant: "outline",
								size: "sm",
								onClick: runAutoDetect,
								disabled: isDetecting || activeTab === "preview",
								className: "gap-1.5 text-xs",
								title: t("scannerDesc"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 543,
									columnNumber: 15
								}, void 0), t("autoDetectPage")]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 534,
								columnNumber: 13
							}, void 0),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								id: "btn-scanner-fullpage",
								variant: "outline",
								size: "sm",
								onClick: handleSetFullPage,
								disabled: isDetecting || activeTab === "preview",
								className: "gap-1.5 text-xs text-muted-foreground hover:text-foreground",
								title: t("fullFrame"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Maximize2, { className: "h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 556,
									columnNumber: 15
								}, void 0), t("fullFrame")]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 547,
								columnNumber: 13
							}, void 0),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center rounded-md border border-border bg-background p-0.5 shadow-2xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									id: "btn-scanner-rotate-left",
									variant: "ghost",
									size: "sm",
									onClick: () => handleRotate(-90),
									disabled: isDetecting || isWarping,
									className: "h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1",
									title: t("rotateLeftTitle"),
									"aria-label": t("rotateLeftTitle"),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCcw, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 571,
										columnNumber: 17
									}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "hidden sm:inline text-[11px]",
										children: t("rotateLeft")
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 572,
										columnNumber: 17
									}, void 0)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 561,
									columnNumber: 15
								}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									id: "btn-scanner-rotate-right",
									variant: "ghost",
									size: "sm",
									onClick: () => handleRotate(90),
									disabled: isDetecting || isWarping,
									className: "h-7 px-2 text-xs text-muted-foreground hover:text-foreground gap-1",
									title: t("rotateRightTitle"),
									"aria-label": t("rotateRightTitle"),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RotateCw, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 585,
										columnNumber: 17
									}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "hidden sm:inline text-[11px]",
										children: t("rotateRight")
									}, void 0, false, {
										fileName: _jsxFileName$8,
										lineNumber: 586,
										columnNumber: 17
									}, void 0)]
								}, void 0, true, {
									fileName: _jsxFileName$8,
									lineNumber: 575,
									columnNumber: 15
								}, void 0)]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 560,
								columnNumber: 13
							}, void 0),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								id: "btn-scanner-reset",
								variant: "ghost",
								size: "sm",
								onClick: handleResetCorners,
								disabled: isDetecting || activeTab === "preview",
								className: "h-8 text-xs text-muted-foreground hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Undo2, { className: "mr-1 h-3.5 w-3.5" }, void 0, false, {
									fileName: _jsxFileName$8,
									lineNumber: 598,
									columnNumber: 15
								}, void 0), t("reset")]
							}, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 590,
								columnNumber: 13
							}, void 0)
						]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 533,
						columnNumber: 11
					}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							id: "btn-scanner-use-original",
							variant: "ghost",
							size: "sm",
							onClick: handleUseOriginal,
							className: "text-xs text-muted-foreground hover:text-foreground",
							children: t("useOriginalNoCrop")
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 605,
							columnNumber: 13
						}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							id: "btn-scanner-apply",
							onClick: handleApplyCrop,
							disabled: isWarping || isDetecting,
							size: "sm",
							className: "gap-1.5 bg-primary px-4 text-xs font-semibold text-primary-foreground shadow",
							children: isWarping ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 624,
								columnNumber: 19
							}, void 0), t("applyingScan")] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 623,
								columnNumber: 17
							}, void 0) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-3.5 w-3.5" }, void 0, false, {
								fileName: _jsxFileName$8,
								lineNumber: 629,
								columnNumber: 19
							}, void 0), t("applyScan")] }, void 0, true, {
								fileName: _jsxFileName$8,
								lineNumber: 628,
								columnNumber: 17
							}, void 0)
						}, void 0, false, {
							fileName: _jsxFileName$8,
							lineNumber: 615,
							columnNumber: 13
						}, void 0)]
					}, void 0, true, {
						fileName: _jsxFileName$8,
						lineNumber: 604,
						columnNumber: 11
					}, void 0)]
				}, void 0, true, {
					fileName: _jsxFileName$8,
					lineNumber: 531,
					columnNumber: 9
				}, void 0)
			]
		}, void 0, true, {
			fileName: _jsxFileName$8,
			lineNumber: 301,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$8,
		lineNumber: 297,
		columnNumber: 5
	}, void 0);
};
var _jsxFileName$7 = "/app/applet/src/components/ui/dialog.tsx";
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay$1, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 21,
	columnNumber: 3
}, void 0));
DialogOverlay.displayName = DialogOverlay$1.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogOverlay, {}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 37,
	columnNumber: 5
}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent$1, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogClose, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(X, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 48,
			columnNumber: 9
		}, void 0), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
			className: "sr-only",
			children: "Close"
		}, void 0, false, {
			fileName: _jsxFileName$7,
			lineNumber: 49,
			columnNumber: 9
		}, void 0)]
	}, void 0, true, {
		fileName: _jsxFileName$7,
		lineNumber: 47,
		columnNumber: 7
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$7,
	lineNumber: 38,
	columnNumber: 5
}, void 0)] }, void 0, true, {
	fileName: _jsxFileName$7,
	lineNumber: 36,
	columnNumber: 3
}, void 0));
DialogContent.displayName = DialogContent$1.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 57,
	columnNumber: 3
}, void 0);
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 62,
	columnNumber: 3
}, void 0);
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle$1, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 73,
	columnNumber: 3
}, void 0));
DialogTitle.displayName = DialogTitle$1.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription$1, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$7,
	lineNumber: 85,
	columnNumber: 3
}, void 0));
DialogDescription.displayName = DialogDescription$1.displayName;
var STUDENT_PROFILE_STORAGE_KEY = "pdfmaker_student_profile";
/**
* Retrieves the saved student profile from localStorage.
* Returns null if no profile is saved or if data is invalid.
*/
function getSavedProfile() {
	if (typeof window === "undefined") return null;
	try {
		const raw = localStorage.getItem(STUDENT_PROFILE_STORAGE_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (parsed && typeof parsed.branch === "string" && parsed.branch.trim().length > 0 && typeof parsed.enrollmentNumber === "string" && parsed.enrollmentNumber.trim().length > 0) return {
			branch: parsed.branch.trim().toUpperCase(),
			enrollmentNumber: parsed.enrollmentNumber.trim()
		};
		return null;
	} catch (err) {
		console.error("Failed to load student profile from localStorage:", err);
		return null;
	}
}
/**
* Saves or updates the student profile in localStorage.
*/
function saveStudentProfile(profile) {
	const cleanProfile = {
		branch: profile.branch.trim().toUpperCase(),
		enrollmentNumber: profile.enrollmentNumber.trim()
	};
	if (typeof window !== "undefined") localStorage.setItem(STUDENT_PROFILE_STORAGE_KEY, JSON.stringify(cleanProfile));
	return cleanProfile;
}
var _jsxFileName$6 = "/app/applet/src/components/ProfileEditModal.tsx";
function ProfileEditModal({ isOpen, onClose, currentProfile, onSave, title, description }) {
	const { t } = useLanguage();
	const [branch, setBranch] = (0, import_react.useState)("");
	const [enrollmentNumber, setEnrollmentNumber] = (0, import_react.useState)("");
	const [errors, setErrors] = (0, import_react.useState)({});
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			if (currentProfile) {
				setBranch(currentProfile.branch);
				setEnrollmentNumber(currentProfile.enrollmentNumber);
			} else {
				setBranch("");
				setEnrollmentNumber("");
			}
			setErrors({});
		}
	}, [isOpen, currentProfile]);
	const handleSubmit = (e) => {
		e.preventDefault();
		const newErrors = {};
		if (!branch.trim()) newErrors.branch = t("branchRequiredError");
		if (!enrollmentNumber.trim()) newErrors.enrollmentNumber = t("enrollmentRequiredError");
		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}
		onSave(saveStudentProfile({
			branch: branch.trim().toUpperCase(),
			enrollmentNumber: enrollmentNumber.trim()
		}));
		onClose();
	};
	const isEditing = Boolean(currentProfile);
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			className: "sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-2 mb-1",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "h-5 w-5" }, void 0, false, {
						fileName: _jsxFileName$6,
						lineNumber: 85,
						columnNumber: 15
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 84,
					columnNumber: 13
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
					className: "text-lg",
					children: title || (isEditing ? t("editStudentDetailsTitle") : t("studentProfileRegistrationTitle"))
				}, void 0, false, {
					fileName: _jsxFileName$6,
					lineNumber: 87,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 83,
				columnNumber: 11
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
				className: "text-xs text-muted-foreground",
				children: description || (isEditing ? t("editStudentDetailsDesc") : t("studentProfileRegistrationDesc"))
			}, void 0, false, {
				fileName: _jsxFileName$6,
				lineNumber: 92,
				columnNumber: 11
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 82,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
				onSubmit: handleSubmit,
				className: "space-y-4 pt-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "modal-branch",
								className: "text-xs font-semibold flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 104,
									columnNumber: 15
								}, this), t("branchRequired")]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 100,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "modal-branch",
								value: branch,
								onChange: (e) => {
									setBranch(e.target.value.toUpperCase());
									if (errors.branch) setErrors((prev) => ({
										...prev,
										branch: void 0
									}));
								},
								placeholder: "e.g. CE, IT, ME, EC",
								maxLength: 20,
								className: "text-xs uppercase",
								"aria-invalid": Boolean(errors.branch),
								autoFocus: !isEditing
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 107,
								columnNumber: 13
							}, this),
							errors.branch ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-destructive",
								children: errors.branch
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 121,
								columnNumber: 15
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] text-muted-foreground",
								children: t("branchCodeHelp")
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 123,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 99,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								htmlFor: "modal-enrollment",
								className: "text-xs font-semibold flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hash, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
									fileName: _jsxFileName$6,
									lineNumber: 132,
									columnNumber: 15
								}, this), t("enrollmentRequired")]
							}, void 0, true, {
								fileName: _jsxFileName$6,
								lineNumber: 128,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								id: "modal-enrollment",
								value: enrollmentNumber,
								onChange: (e) => {
									setEnrollmentNumber(e.target.value);
									if (errors.enrollmentNumber) setErrors((prev) => ({
										...prev,
										enrollmentNumber: void 0
									}));
								},
								placeholder: "e.g. 25002170110091",
								maxLength: 40,
								className: "text-xs font-mono",
								"aria-invalid": Boolean(errors.enrollmentNumber)
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 135,
								columnNumber: 13
							}, this),
							errors.enrollmentNumber ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-destructive",
								children: errors.enrollmentNumber
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 149,
								columnNumber: 15
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-[10px] text-muted-foreground",
								children: t("enrollmentHelp")
							}, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 151,
								columnNumber: 15
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 127,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "rounded-lg bg-muted/50 p-2.5 border border-border text-[11px] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-semibold text-foreground",
							children: "Example generated filename: "
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 156,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
							className: "font-mono text-primary font-medium",
							children: `${branch.trim() || "BRANCH"}_${enrollmentNumber.trim() || "ENROLL"}_DS_T1.pdf`
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 157,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 155,
						columnNumber: 11
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogFooter, {
						className: "gap-2 sm:gap-0 pt-2",
						children: [isEditing && /* @__PURE__ */ (void 0)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							onClick: onClose,
							children: t("cancel")
						}, void 0, false, {
							fileName: _jsxFileName$6,
							lineNumber: 164,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							size: "sm",
							className: "gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$6,
								lineNumber: 169,
								columnNumber: 15
							}, this), t("saveStudentDetailsBtn")]
						}, void 0, true, {
							fileName: _jsxFileName$6,
							lineNumber: 168,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$6,
						lineNumber: 162,
						columnNumber: 11
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName$6,
				lineNumber: 98,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$6,
			lineNumber: 81,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$6,
		lineNumber: 80,
		columnNumber: 5
	}, this);
}
var _jsxFileName$5 = "/app/applet/src/components/ui/textarea.tsx";
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("textarea", {
		className: cn("flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", className),
		ref,
		...props
	}, void 0, false, {
		fileName: _jsxFileName$5,
		lineNumber: 8,
		columnNumber: 7
	}, void 0);
});
Textarea.displayName = "Textarea";
/**
* Persistently submits feedback to the secure server database.
*/
async function submitFeedback(data) {
	const trimmedMessage = data.message.trim();
	if (!trimmedMessage) return {
		success: false,
		id: "",
		error: "Message cannot be empty"
	};
	if (trimmedMessage.length > 1e3) return {
		success: false,
		id: "",
		error: "Message exceeds 1000 characters limit"
	};
	const trimmedEmail = data.email?.trim();
	if (trimmedEmail) {
		if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) return {
			success: false,
			id: "",
			error: "Invalid email address format"
		};
	}
	const rating = Math.min(5, Math.max(1, Math.round(data.rating || 5)));
	try {
		const res = await submitFeedbackServerFn({ data: {
			type: data.type,
			rating,
			message: trimmedMessage,
			email: trimmedEmail || void 0,
			language: data.language || "en"
		} });
		if (res && res.success) return {
			success: true,
			id: res.id
		};
		return {
			success: false,
			id: "",
			error: "Failed to save feedback to server"
		};
	} catch (err) {
		console.error("Failed to submit feedback to backend:", err);
		return {
			success: false,
			id: "",
			error: err instanceof Error ? err.message : "Failed to connect to backend"
		};
	}
}
var _jsxFileName$4 = "/app/applet/src/components/FeedbackModal.tsx";
var FEEDBACK_TYPES = [
	{
		id: "bug",
		labelKey: "feedbackTypeBug",
		icon: Bug,
		colorClass: "text-rose-500"
	},
	{
		id: "feature",
		labelKey: "feedbackTypeFeature",
		icon: Lightbulb,
		colorClass: "text-amber-500"
	},
	{
		id: "improvement",
		labelKey: "feedbackTypeImprovement",
		icon: Sparkles,
		colorClass: "text-blue-500"
	},
	{
		id: "general",
		labelKey: "feedbackTypeGeneral",
		icon: Heart,
		colorClass: "text-emerald-500"
	}
];
function FeedbackModal({ isOpen, onClose }) {
	const { t, language } = useLanguage();
	const [feedbackType, setFeedbackType] = (0, import_react.useState)("improvement");
	const [rating, setRating] = (0, import_react.useState)(5);
	const [hoveredRating, setHoveredRating] = (0, import_react.useState)(null);
	const [message, setMessage] = (0, import_react.useState)("");
	const [email, setEmail] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [isSuccess, setIsSuccess] = (0, import_react.useState)(false);
	const [errorMessage, setErrorMessage] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (isOpen) {
			setFeedbackType("improvement");
			setRating(5);
			setHoveredRating(null);
			setMessage("");
			setEmail("");
			setIsSubmitting(false);
			setIsSuccess(false);
			setErrorMessage(null);
		}
	}, [isOpen]);
	const handleRatingClick = (val) => {
		setRating(val);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (isSubmitting) return;
		const trimmedMsg = message.trim();
		if (!trimmedMsg) {
			setErrorMessage(t("feedbackEmptyError"));
			return;
		}
		if (trimmedMsg.length > 1e3) {
			setErrorMessage("Feedback message is too long (maximum 1000 characters).");
			return;
		}
		const trimmedEmail = email.trim();
		if (trimmedEmail) {
			if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
				setErrorMessage(t("feedbackEmailInvalid"));
				return;
			}
		}
		setErrorMessage(null);
		setIsSubmitting(true);
		try {
			const result = await submitFeedback({
				type: feedbackType,
				rating,
				message: trimmedMsg,
				email: trimmedEmail || void 0,
				language
			});
			if (result.success) setIsSuccess(true);
			else setErrorMessage(result.error || t("feedbackSubmitError"));
		} catch {
			setErrorMessage(t("feedbackSubmitError"));
		} finally {
			setIsSubmitting(false);
		}
	};
	const handleResetForAnother = () => {
		setIsSuccess(false);
		setMessage("");
		setErrorMessage(null);
		setRating(5);
	};
	const displayRating = hoveredRating !== null ? hoveredRating : rating;
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			id: "modal-feedback",
			className: "sm:max-w-lg max-h-[92vh] flex flex-col p-0 overflow-hidden bg-card border-border shadow-2xl rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "px-6 pt-6 pb-4 border-b border-border/70 bg-secondary/30",
				children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
					className: "text-left space-y-1.5",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquareQuote, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 169,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 168,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-lg font-bold text-foreground",
							children: t("feedbackModalTitle")
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 172,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground mt-0.5",
							children: t("feedbackModalSubtitle")
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 175,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 171,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$4,
						lineNumber: 167,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$4,
					lineNumber: 166,
					columnNumber: 11
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 165,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-6 overflow-y-auto flex-1 space-y-5",
				children: isSuccess ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					id: "feedback-success-state",
					className: "py-6 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in-50 zoom-in-95 duration-200",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 ring-8 ring-emerald-500/10 shadow-sm",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CircleCheck, { className: "h-9 w-9" }, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 192,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 191,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 max-w-sm",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-base font-bold text-foreground",
								children: t("feedbackSuccessTitle")
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 196,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground leading-relaxed",
								children: t("feedbackSuccessDesc")
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 197,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 195,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-3 w-full max-w-xs flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								id: "btn-feedback-done",
								type: "button",
								size: "default",
								onClick: onClose,
								className: "w-full font-semibold shadow-sm",
								children: t("done")
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 203,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								onClick: handleResetForAnother,
								className: "text-xs text-muted-foreground hover:text-foreground",
								children: t("sendAnotherFeedback")
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 212,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 202,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 187,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
					id: "feedback-form",
					onSubmit: handleSubmit,
					className: "space-y-4",
					children: [
						errorMessage && /* @__PURE__ */ (void 0)("div", {
							id: "feedback-error-banner",
							className: "flex items-start gap-2.5 rounded-xl border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive animate-in fade-in duration-150",
							role: "alert",
							children: [
								/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 233,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "flex-1 leading-snug",
									children: errorMessage
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 234,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (void 0)("button", {
									type: "button",
									onClick: () => setErrorMessage(null),
									className: "shrink-0 text-destructive/70 hover:text-destructive",
									"aria-label": "Dismiss error",
									children: /* @__PURE__ */ (void 0)(X, { className: "h-3.5 w-3.5" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 241,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 235,
									columnNumber: 19
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 228,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
								className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5",
								children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["1. ", t("feedbackTypeLabel")] }, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 249,
									columnNumber: 19
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 248,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid grid-cols-2 gap-2 sm:grid-cols-2",
								children: FEEDBACK_TYPES.map((item) => {
									const isSelected = feedbackType === item.id;
									const Icon = item.icon;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										id: `btn-feedback-type-${item.id}`,
										onClick: () => {
											setFeedbackType(item.id);
											if (errorMessage) setErrorMessage(null);
										},
										className: `flex items-center gap-2 p-2.5 rounded-xl border text-left text-xs transition-all ${isSelected ? "border-primary bg-primary/10 text-foreground font-semibold shadow-xs ring-1 ring-primary" : "border-border/80 bg-secondary/30 text-muted-foreground hover:bg-secondary/70 hover:text-foreground"}`,
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: `h-4 w-4 shrink-0 ${isSelected ? "text-primary" : item.colorClass}` }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 270,
											columnNumber: 25
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "truncate",
											children: t(item.labelKey)
										}, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 273,
											columnNumber: 25
										}, this)]
									}, item.id, true, {
										fileName: _jsxFileName$4,
										lineNumber: 256,
										columnNumber: 23
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 251,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 247,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-2 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
									children: ["2. ", t("ratingLabel")]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 283,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-semibold font-mono text-primary",
									children: [displayRating, " / 5"]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 286,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 282,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2 p-2.5 rounded-xl border border-border/70 bg-secondary/20 justify-center sm:justify-start",
								role: "radiogroup",
								"aria-label": "Rating out of 5 stars",
								children: [[
									1,
									2,
									3,
									4,
									5
								].map((starValue) => {
									const isFilled = starValue <= displayRating;
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
										type: "button",
										id: `btn-star-rating-${starValue}`,
										onClick: () => handleRatingClick(starValue),
										onMouseEnter: () => setHoveredRating(starValue),
										onMouseLeave: () => setHoveredRating(null),
										className: "p-1 rounded-lg transition-transform hover:scale-115 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
										"aria-label": `${starValue} star${starValue > 1 ? "s" : ""}`,
										title: `${starValue} / 5`,
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: `h-6 w-6 sm:h-7 sm:w-7 transition-colors ${isFilled ? "fill-amber-400 text-amber-500 dark:fill-amber-400 dark:text-amber-400" : "fill-transparent text-muted-foreground/40 hover:text-amber-400/80"}` }, void 0, false, {
											fileName: _jsxFileName$4,
											lineNumber: 310,
											columnNumber: 25
										}, this)
									}, starValue, false, {
										fileName: _jsxFileName$4,
										lineNumber: 299,
										columnNumber: 23
									}, this);
								}), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "ml-2 text-xs font-medium text-muted-foreground hidden xs:inline",
									children: displayRating === 5 ? "⭐⭐⭐⭐⭐" : displayRating >= 4 ? "⭐⭐⭐⭐" : displayRating >= 3 ? "⭐⭐⭐" : displayRating >= 2 ? "⭐⭐" : "⭐"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 320,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 291,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 281,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 pt-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "feedback-message",
									className: "text-xs font-semibold flex items-center gap-1",
									children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["3. ", t("feedbackMessageLabel")] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 341,
										columnNumber: 21
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 337,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: `text-[11px] font-mono ${message.length > 900 ? "text-amber-500 font-semibold" : message.length >= 1e3 ? "text-destructive font-bold" : "text-muted-foreground"}`,
									children: t("charCount", { current: message.length })
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 343,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$4,
								lineNumber: 336,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Textarea, {
								id: "feedback-message",
								value: message,
								onChange: (e) => {
									setMessage(e.target.value);
									if (errorMessage) setErrorMessage(null);
								},
								placeholder: t("feedbackMessagePlaceholder"),
								maxLength: 1e3,
								rows: 4,
								className: "resize-y text-xs sm:text-sm bg-background border-border/80 focus-visible:ring-primary min-h-[90px]",
								required: true
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 356,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 335,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 pt-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
									htmlFor: "feedback-email",
									className: "text-xs font-semibold flex items-center gap-1.5 text-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Mail, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
										fileName: _jsxFileName$4,
										lineNumber: 377,
										columnNumber: 19
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["4. ", t("feedbackEmailLabel")] }, void 0, true, {
										fileName: _jsxFileName$4,
										lineNumber: 378,
										columnNumber: 19
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 373,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "feedback-email",
									type: "email",
									value: email,
									onChange: (e) => {
										setEmail(e.target.value);
										if (errorMessage) setErrorMessage(null);
									},
									placeholder: t("feedbackEmailPlaceholder"),
									maxLength: 120,
									className: "text-xs sm:text-sm bg-background border-border/80"
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 380,
									columnNumber: 17
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-[10px] text-muted-foreground leading-tight",
									children: t("feedbackEmailHelp")
								}, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 392,
									columnNumber: 17
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$4,
							lineNumber: 372,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "pt-3",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								id: "btn-submit-feedback",
								type: "submit",
								disabled: isSubmitting || !message.trim(),
								className: "w-full gap-2 font-semibold shadow-md py-5 text-sm",
								children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-4 w-4 animate-spin" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 407,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("submittingFeedback") }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 408,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 406,
									columnNumber: 21
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Send, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 412,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("submitFeedback") }, void 0, false, {
									fileName: _jsxFileName$4,
									lineNumber: 413,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$4,
									lineNumber: 411,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$4,
								lineNumber: 399,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$4,
							lineNumber: 398,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$4,
					lineNumber: 225,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$4,
				lineNumber: 184,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$4,
			lineNumber: 160,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$4,
		lineNumber: 159,
		columnNumber: 5
	}, this);
}
var _jsxFileName$3 = "/app/applet/src/components/AdminFeedbackModal.tsx";
var ADMIN_STORAGE_KEY = "pdfmaker_admin_passkey";
function AdminFeedbackModal({ isOpen, onClose }) {
	const { t } = useLanguage();
	const [activeTab, setActiveTab] = (0, import_react.useState)("analytics");
	const [passkeyInput, setPasskeyInput] = (0, import_react.useState)("");
	const [activePasskey, setActivePasskey] = (0, import_react.useState)(null);
	const [isVerifying, setIsVerifying] = (0, import_react.useState)(false);
	const [authError, setAuthError] = (0, import_react.useState)(null);
	const [analytics, setAnalytics] = (0, import_react.useState)(null);
	const [isLoadingAnalytics, setIsLoadingAnalytics] = (0, import_react.useState)(false);
	const [items, setItems] = (0, import_react.useState)([]);
	const [stats, setStats] = (0, import_react.useState)(null);
	const [selectedFilter, setSelectedFilter] = (0, import_react.useState)("all");
	const [isLoadingList, setIsLoadingList] = (0, import_react.useState)(false);
	const [deletingId, setDeletingId] = (0, import_react.useState)(null);
	const loadData = (0, import_react.useCallback)(async (key, filter) => {
		setIsLoadingList(true);
		setIsLoadingAnalytics(true);
		try {
			const [feedbackRes, analyticsRes] = await Promise.all([getAdminFeedbackListServerFn({ data: {
				adminKey: key,
				filterType: filter
			} }), getAdminAnalyticsServerFn({ data: { adminKey: key } })]);
			if (feedbackRes && feedbackRes.success) {
				setItems(feedbackRes.items);
				setStats(feedbackRes.stats);
			}
			if (analyticsRes && analyticsRes.success) setAnalytics(analyticsRes.analytics);
			setAuthError(null);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Failed to load admin data";
			if (msg.toLowerCase().includes("unauthorized")) {
				setActivePasskey(null);
				try {
					sessionStorage.removeItem(ADMIN_STORAGE_KEY);
				} catch {}
				setAuthError(t("adminInvalidKey"));
			} else setAuthError(msg);
		} finally {
			setIsLoadingList(false);
			setIsLoadingAnalytics(false);
		}
	}, [t]);
	(0, import_react.useEffect)(() => {
		if (isOpen) try {
			const saved = sessionStorage.getItem(ADMIN_STORAGE_KEY);
			if (saved) {
				setActivePasskey(saved);
				loadData(saved, selectedFilter);
			}
		} catch {}
	}, [
		isOpen,
		loadData,
		selectedFilter
	]);
	const handleLogin = async (e) => {
		e.preventDefault();
		const trimmed = passkeyInput.trim();
		if (!trimmed) return;
		setIsVerifying(true);
		setAuthError(null);
		try {
			const verifyRes = await verifyAdminKeyServerFn({ data: { adminKey: trimmed } });
			if (verifyRes && verifyRes.authorized) {
				setActivePasskey(trimmed);
				try {
					sessionStorage.setItem(ADMIN_STORAGE_KEY, trimmed);
				} catch {}
				await loadData(trimmed, selectedFilter);
			} else setAuthError(t("adminInvalidKey"));
		} catch {
			setAuthError(t("adminInvalidKey"));
		} finally {
			setIsVerifying(false);
		}
	};
	const handleLogout = () => {
		setActivePasskey(null);
		setPasskeyInput("");
		setItems([]);
		setStats(null);
		setAnalytics(null);
		setAuthError(null);
		try {
			sessionStorage.removeItem(ADMIN_STORAGE_KEY);
		} catch {}
	};
	const handleFilterChange = (filter) => {
		setSelectedFilter(filter);
		if (activePasskey) loadData(activePasskey, filter);
	};
	const handleDelete = async (id) => {
		if (!activePasskey) return;
		if (!window.confirm(t("adminDeleteConfirm"))) return;
		setDeletingId(id);
		try {
			await deleteFeedbackServerFn({ data: {
				adminKey: activePasskey,
				id
			} });
			await loadData(activePasskey, selectedFilter);
		} catch (err) {
			console.error("Failed to delete feedback:", err);
		} finally {
			setDeletingId(null);
		}
	};
	const getTypeMeta = (type) => {
		switch (type) {
			case "bug": return {
				icon: Bug,
				label: t("feedbackTypeBug"),
				badgeClass: "bg-rose-500/10 text-rose-600 border-rose-500/30 dark:text-rose-400"
			};
			case "feature": return {
				icon: Lightbulb,
				label: t("feedbackTypeFeature"),
				badgeClass: "bg-amber-500/10 text-amber-600 border-amber-500/30 dark:text-amber-400"
			};
			case "improvement": return {
				icon: Sparkles,
				label: t("feedbackTypeImprovement"),
				badgeClass: "bg-blue-500/10 text-blue-600 border-blue-500/30 dark:text-blue-400"
			};
			default: return {
				icon: Heart,
				label: t("feedbackTypeGeneral"),
				badgeClass: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30 dark:text-emerald-400"
			};
		}
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Dialog, {
		open: isOpen,
		onOpenChange: (open) => !open && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogContent, {
			id: "modal-admin-feedback",
			className: "sm:max-w-4xl max-h-[92vh] flex flex-col p-0 overflow-hidden bg-card border-border shadow-2xl rounded-2xl",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "px-6 py-4 border-b border-border/80 bg-secondary/30 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogHeader, {
					className: "text-left space-y-1",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary shadow-xs",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-5 w-5" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 251,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 250,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogTitle, {
							className: "text-base sm:text-lg font-bold text-foreground flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("adminDashboard") }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 255,
								columnNumber: 19
							}, this), activePasskey && /* @__PURE__ */ (void 0)(Badge, {
								variant: "outline",
								className: "text-[10px] bg-emerald-500/10 text-emerald-600 border-emerald-500/30 py-0 h-4",
								children: "Live"
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 257,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 254,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DialogDescription, {
							className: "text-xs text-muted-foreground",
							children: t("adminSecurityNotice")
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 265,
							columnNumber: 17
						}, this)] }, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 253,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 249,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName$3,
					lineNumber: 248,
					columnNumber: 11
				}, this), activePasskey && /* @__PURE__ */ (void 0)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (void 0)(Button, {
						id: "btn-admin-refresh",
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => loadData(activePasskey, selectedFilter),
						disabled: isLoadingList || isLoadingAnalytics,
						className: "h-8 gap-1 text-xs",
						title: t("adminRefresh"),
						children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: `h-3.5 w-3.5 ${isLoadingList || isLoadingAnalytics ? "animate-spin" : ""}` }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 284,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", {
							className: "hidden xs:inline",
							children: t("adminRefresh")
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 287,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 274,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)(Button, {
						id: "btn-admin-logout",
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: handleLogout,
						className: "h-8 gap-1 text-xs text-muted-foreground hover:text-destructive",
						title: t("adminLogoutBtn"),
						children: /* @__PURE__ */ (void 0)(LogOut, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 298,
							columnNumber: 17
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 289,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 273,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$3,
				lineNumber: 247,
				columnNumber: 9
			}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "p-6 overflow-y-auto flex-1 space-y-5",
				children: !activePasskey ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "py-6 max-w-sm mx-auto flex flex-col items-center text-center space-y-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5",
							children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-7 w-7" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 310,
								columnNumber: 17
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName$3,
							lineNumber: 309,
							columnNumber: 15
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h3", {
								className: "text-base font-bold text-foreground",
								children: t("adminAuthTitle")
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 314,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
								className: "text-xs text-muted-foreground",
								children: t("adminAuthDesc")
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 315,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 313,
							columnNumber: 15
						}, this),
						authError && /* @__PURE__ */ (void 0)("div", {
							className: "w-full flex items-center gap-2 p-3 text-xs rounded-xl bg-destructive/10 text-destructive border border-destructive/20 text-left",
							children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-4 w-4 shrink-0" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 320,
								columnNumber: 19
							}, this), /* @__PURE__ */ (void 0)("span", { children: authError }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 321,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 319,
							columnNumber: 17
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
							onSubmit: handleLogin,
							className: "w-full space-y-3 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1.5 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
									className: "text-xs font-semibold text-muted-foreground flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 328,
										columnNumber: 21
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("adminPasskeyLabel") }, void 0, false, {
										fileName: _jsxFileName$3,
										lineNumber: 329,
										columnNumber: 21
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 327,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
									id: "admin-passkey-input",
									type: "password",
									value: passkeyInput,
									onChange: (e) => {
										setPasskeyInput(e.target.value);
										if (authError) setAuthError(null);
									},
									placeholder: t("adminPasskeyPlaceholder"),
									className: "text-xs sm:text-sm bg-background border-border/80",
									autoFocus: true,
									required: true
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 331,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 326,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								id: "btn-admin-submit-passkey",
								type: "submit",
								disabled: isVerifying || !passkeyInput.trim(),
								className: "w-full font-semibold shadow-sm text-xs py-4",
								children: isVerifying ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin mr-1.5" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 354,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Checking..." }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 355,
									columnNumber: 23
								}, this)] }, void 0, true, {
									fileName: _jsxFileName$3,
									lineNumber: 353,
									columnNumber: 21
								}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("adminLoginBtn") }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 358,
									columnNumber: 21
								}, this)
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 346,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 325,
							columnNumber: 15
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 308,
					columnNumber: 13
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex items-center gap-2 border-b border-border/80 pb-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							id: "tab-admin-analytics",
							onClick: () => setActiveTab("analytics"),
							className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "analytics" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 378,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("adminTabAnalytics") }, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 379,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 368,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
							type: "button",
							id: "tab-admin-feedback",
							onClick: () => setActiveTab("feedback"),
							className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "feedback" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquareQuote, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 392,
									columnNumber: 19
								}, this),
								/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("adminTabFeedback") }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 393,
									columnNumber: 19
								}, this),
								stats && stats.total > 0 && /* @__PURE__ */ (void 0)("span", {
									className: `text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === "feedback" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-foreground"}`,
									children: stats.total
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 395,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName$3,
							lineNumber: 382,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 367,
						columnNumber: 15
					}, this), activeTab === "analytics" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminAnalyticsView, {
						analytics,
						isLoading: isLoadingAnalytics
					}, void 0, false, {
						fileName: _jsxFileName$3,
						lineNumber: 410,
						columnNumber: 17
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-5",
						children: [
							stats && /* @__PURE__ */ (void 0)("div", {
								className: "grid grid-cols-2 sm:grid-cols-4 gap-2.5",
								children: [
									/* @__PURE__ */ (void 0)("div", {
										className: "p-3 rounded-xl border border-border/80 bg-secondary/30",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] font-semibold uppercase text-muted-foreground",
											children: t("adminTotalFeedback")
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 418,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "text-xl sm:text-2xl font-bold text-foreground mt-0.5 font-mono",
											children: stats.total
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 421,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 417,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "p-3 rounded-xl border border-border/80 bg-secondary/30",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] font-semibold uppercase text-muted-foreground",
											children: t("adminAverageRating")
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 427,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "text-xl sm:text-2xl font-bold text-amber-500 mt-0.5 flex items-center gap-1 font-mono",
											children: [/* @__PURE__ */ (void 0)("span", { children: stats.averageRating }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 431,
												columnNumber: 27
											}, this), /* @__PURE__ */ (void 0)(Star, { className: "h-4 w-4 fill-amber-400 text-amber-400" }, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 432,
												columnNumber: 27
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName$3,
											lineNumber: 430,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 426,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "p-3 rounded-xl border border-border/80 bg-secondary/30",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] font-semibold uppercase text-muted-foreground",
											children: t("adminFilterBugs")
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 437,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "text-xl sm:text-2xl font-bold text-rose-500 mt-0.5 font-mono",
											children: stats.bugsCount
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 440,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 436,
										columnNumber: 23
									}, this),
									/* @__PURE__ */ (void 0)("div", {
										className: "p-3 rounded-xl border border-border/80 bg-secondary/30",
										children: [/* @__PURE__ */ (void 0)("span", {
											className: "text-[11px] font-semibold uppercase text-muted-foreground",
											children: t("adminFilterFeatures")
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 446,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "text-xl sm:text-2xl font-bold text-primary mt-0.5 font-mono",
											children: stats.featuresCount
										}, void 0, false, {
											fileName: _jsxFileName$3,
											lineNumber: 449,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName$3,
										lineNumber: 445,
										columnNumber: 23
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 416,
								columnNumber: 21
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Funnel, { className: "h-3.5 w-3.5 text-muted-foreground shrink-0 mr-1" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 458,
									columnNumber: 21
								}, this), [
									{
										id: "all",
										label: t("adminFilterAll")
									},
									{
										id: "bug",
										label: t("adminFilterBugs")
									},
									{
										id: "feature",
										label: t("adminFilterFeatures")
									},
									{
										id: "improvement",
										label: t("adminFilterImprovements")
									},
									{
										id: "general",
										label: t("adminFilterGeneral")
									}
								].map((f) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
									type: "button",
									onClick: () => handleFilterChange(f.id),
									className: `px-3 py-1.5 rounded-lg border font-medium whitespace-nowrap transition-all ${selectedFilter === f.id ? "bg-primary text-primary-foreground border-primary shadow-xs" : "bg-secondary/40 text-muted-foreground border-border/80 hover:bg-secondary hover:text-foreground"}`,
									children: f.label
								}, f.id, false, {
									fileName: _jsxFileName$3,
									lineNumber: 466,
									columnNumber: 23
								}, this))]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 457,
								columnNumber: 19
							}, this),
							isLoadingList ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "py-12 flex flex-col items-center justify-center text-center space-y-2 text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-6 w-6 animate-spin text-primary" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 484,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs",
									children: "Loading feedback submissions..."
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 485,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 483,
								columnNumber: 21
							}, this) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "py-12 flex flex-col items-center justify-center text-center space-y-2 text-muted-foreground border border-dashed rounded-xl border-border/80",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "h-8 w-8 text-muted-foreground/50" }, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 489,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-xs font-medium",
									children: selectedFilter === "all" ? t("adminNoFeedback") : t("adminNoFeedbackMatch")
								}, void 0, false, {
									fileName: _jsxFileName$3,
									lineNumber: 490,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$3,
								lineNumber: 488,
								columnNumber: 21
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-3",
								children: items.map((item) => {
									const meta = getTypeMeta(item.type);
									const Icon = meta.icon;
									const formattedDate = new Date(item.timestamp).toLocaleString(void 0, {
										dateStyle: "medium",
										timeStyle: "short"
									});
									return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "p-4 rounded-xl border border-border/80 bg-card hover:border-primary/40 transition-colors space-y-2.5 shadow-xs",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
														variant: "outline",
														className: `gap-1 text-xs font-semibold py-0.5 px-2 ${meta.badgeClass}`,
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-3 w-3" }, void 0, false, {
															fileName: _jsxFileName$3,
															lineNumber: 518,
															columnNumber: 35
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: meta.label }, void 0, false, {
															fileName: _jsxFileName$3,
															lineNumber: 519,
															columnNumber: 35
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName$3,
														lineNumber: 514,
														columnNumber: 33
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
														className: "flex items-center gap-0.5",
														title: `${item.rating} / 5`,
														children: [
															1,
															2,
															3,
															4,
															5
														].map((star) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: `h-3.5 w-3.5 ${star <= item.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30 fill-transparent"}` }, star, false, {
															fileName: _jsxFileName$3,
															lineNumber: 528,
															columnNumber: 37
														}, this))
													}, void 0, false, {
														fileName: _jsxFileName$3,
														lineNumber: 523,
														columnNumber: 33
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName$3,
													lineNumber: 513,
													columnNumber: 31
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center gap-2 text-[11px] text-muted-foreground",
													children: [
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "flex items-center gap-1",
															children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "h-3 w-3" }, void 0, false, {
																fileName: _jsxFileName$3,
																lineNumber: 542,
																columnNumber: 35
															}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: formattedDate }, void 0, false, {
																fileName: _jsxFileName$3,
																lineNumber: 543,
																columnNumber: 35
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$3,
															lineNumber: 541,
															columnNumber: 33
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "flex items-center gap-1 uppercase font-mono text-[10px] bg-secondary px-1.5 py-0.5 rounded",
															children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Languages, { className: "h-2.5 w-2.5" }, void 0, false, {
																fileName: _jsxFileName$3,
																lineNumber: 547,
																columnNumber: 35
															}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.language }, void 0, false, {
																fileName: _jsxFileName$3,
																lineNumber: 548,
																columnNumber: 35
															}, this)]
														}, void 0, true, {
															fileName: _jsxFileName$3,
															lineNumber: 546,
															columnNumber: 33
														}, this),
														/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
															type: "button",
															variant: "ghost",
															size: "sm",
															onClick: () => handleDelete(item.id),
															disabled: deletingId === item.id,
															className: "h-7 w-7 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
															title: t("adminDeleteConfirm"),
															children: deletingId === item.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-3 w-3 animate-spin" }, void 0, false, {
																fileName: _jsxFileName$3,
																lineNumber: 561,
																columnNumber: 37
															}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3 w-3" }, void 0, false, {
																fileName: _jsxFileName$3,
																lineNumber: 563,
																columnNumber: 37
															}, this)
														}, void 0, false, {
															fileName: _jsxFileName$3,
															lineNumber: 551,
															columnNumber: 33
														}, this)
													]
												}, void 0, true, {
													fileName: _jsxFileName$3,
													lineNumber: 540,
													columnNumber: 31
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 512,
												columnNumber: 29
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-xs sm:text-sm text-foreground whitespace-pre-wrap leading-relaxed",
												children: item.message
											}, void 0, false, {
												fileName: _jsxFileName$3,
												lineNumber: 570,
												columnNumber: 29
											}, this),
											item.email && /* @__PURE__ */ (void 0)("div", {
												className: "pt-1 flex items-center gap-1.5 text-xs text-primary font-medium",
												children: [/* @__PURE__ */ (void 0)(Mail, { className: "h-3.5 w-3.5 text-primary/70" }, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 577,
													columnNumber: 33
												}, this), /* @__PURE__ */ (void 0)("a", {
													href: `mailto:${encodeURIComponent(item.email)}`,
													className: "underline hover:opacity-80",
													children: item.email
												}, void 0, false, {
													fileName: _jsxFileName$3,
													lineNumber: 578,
													columnNumber: 33
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName$3,
												lineNumber: 576,
												columnNumber: 31
											}, this)
										]
									}, item.id, true, {
										fileName: _jsxFileName$3,
										lineNumber: 507,
										columnNumber: 27
									}, this);
								})
							}, void 0, false, {
								fileName: _jsxFileName$3,
								lineNumber: 497,
								columnNumber: 21
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName$3,
						lineNumber: 413,
						columnNumber: 17
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$3,
					lineNumber: 365,
					columnNumber: 13
				}, this)
			}, void 0, false, {
				fileName: _jsxFileName$3,
				lineNumber: 305,
				columnNumber: 9
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName$3,
			lineNumber: 242,
			columnNumber: 7
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$3,
		lineNumber: 241,
		columnNumber: 5
	}, this);
}
var _jsxFileName$2 = "/app/applet/src/components/ui/dropdown-menu.tsx";
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuGroup = Group2;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChevronRight, { className: "ml-auto" }, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 37,
		columnNumber: 5
	}, void 0)]
}, void 0, true, {
	fileName: _jsxFileName$2,
	lineNumber: 27,
	columnNumber: 3
}, void 0));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 46,
	columnNumber: 3
}, void 0));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 62,
	columnNumber: 5
}, void 0) }, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 61,
	columnNumber: 3
}, void 0));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 82,
	columnNumber: 3
}, void 0));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Check, { className: "h-4 w-4" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 108,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 107,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 106,
		columnNumber: 5
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$2,
	lineNumber: 98,
	columnNumber: 3
}, void 0));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Circle, { className: "h-2 w-2 fill-current" }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 130,
			columnNumber: 9
		}, void 0) }, void 0, false, {
			fileName: _jsxFileName$2,
			lineNumber: 129,
			columnNumber: 7
		}, void 0)
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 128,
		columnNumber: 5
	}, void 0), children]
}, void 0, true, {
	fileName: _jsxFileName$2,
	lineNumber: 120,
	columnNumber: 3
}, void 0));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 144,
	columnNumber: 3
}, void 0));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}, void 0, false, {
	fileName: _jsxFileName$2,
	lineNumber: 156,
	columnNumber: 3
}, void 0));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	}, void 0, false, {
		fileName: _jsxFileName$2,
		lineNumber: 166,
		columnNumber: 5
	}, void 0);
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var _jsxFileName$1 = "/app/applet/src/components/SettingsMenu.tsx";
function SettingsMenu({ onOpenFeedback, onOpenAdminFeedback }) {
	const { theme, setTheme } = useTheme();
	const { language, setLanguage, t } = useLanguage();
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
			id: "btn-open-settings",
			type: "button",
			variant: "outline",
			size: "sm",
			className: "h-9 gap-1.5 text-xs font-medium border-border/80 bg-card text-foreground hover:bg-accent/50 shadow-xs",
			title: t("settings"),
			"aria-label": t("settings"),
			children: [
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Settings, { className: "h-4 w-4 text-muted-foreground transition-transform group-hover:rotate-45" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 45,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "hidden sm:inline",
					children: t("settings")
				}, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 46,
					columnNumber: 11
				}, this),
				/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
					className: "flex items-center gap-1 text-[11px] text-muted-foreground border-l border-border pl-1.5 ml-0.5",
					children: [theme === "dark" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { className: "h-3 w-3" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 48,
						columnNumber: 33
					}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: "h-3 w-3" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 48,
						columnNumber: 64
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
						className: "font-semibold uppercase tracking-wider text-[10px]",
						children: language.toUpperCase()
					}, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 49,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 47,
					columnNumber: 11
				}, this)
			]
		}, void 0, true, {
			fileName: _jsxFileName$1,
			lineNumber: 36,
			columnNumber: 9
		}, this)
	}, void 0, false, {
		fileName: _jsxFileName$1,
		lineNumber: 35,
		columnNumber: 7
	}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuContent, {
		align: "end",
		className: "w-56 p-2 rounded-xl border border-border bg-popover text-popover-foreground shadow-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuLabel, {
				className: "flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 62,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("theme") }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 63,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 61,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "grid grid-cols-2 gap-1 p-1 bg-secondary/50 rounded-lg border border-border/50",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					id: "btn-theme-light",
					onClick: () => setTheme("light"),
					className: `flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${theme === "light" ? "bg-card text-foreground shadow-xs font-semibold border border-border" : "text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Sun, { className: "h-3.5 w-3.5 text-amber-500" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 77,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("lightMode") }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 78,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 67,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
					type: "button",
					id: "btn-theme-dark",
					onClick: () => setTheme("dark"),
					className: `flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-md text-xs font-medium transition-all ${theme === "dark" ? "bg-card text-foreground shadow-xs font-semibold border border-border" : "text-muted-foreground hover:text-foreground"}`,
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Moon, { className: "h-3.5 w-3.5 text-blue-400" }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 91,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("darkMode") }, void 0, false, {
						fileName: _jsxFileName$1,
						lineNumber: 92,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 81,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 66,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuSeparator, { className: "my-2" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 96,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuLabel, {
				className: "flex items-center gap-1.5 px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Languages, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 100,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("language") }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 101,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 99,
				columnNumber: 9
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuGroup, {
				className: "space-y-0.5",
				children: SUPPORTED_LANGUAGES.map((lang) => {
					const isSelected = language === lang.code;
					return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(DropdownMenuItem, {
						id: `btn-lang-${lang.code}`,
						onClick: () => setLanguage(lang.code),
						className: `flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs cursor-pointer transition-colors ${isSelected ? "bg-primary/10 text-primary font-semibold" : "text-foreground hover:bg-muted/60"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-sm leading-none",
								children: lang.flag
							}, void 0, false, {
								fileName: _jsxFileName$1,
								lineNumber: 119,
								columnNumber: 19
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "leading-tight",
									children: lang.nativeLabel
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 121,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
									className: "text-[10px] text-muted-foreground leading-tight",
									children: lang.label
								}, void 0, false, {
									fileName: _jsxFileName$1,
									lineNumber: 122,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName$1,
								lineNumber: 120,
								columnNumber: 19
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName$1,
							lineNumber: 118,
							columnNumber: 17
						}, this), isSelected && /* @__PURE__ */ (void 0)(Check, { className: "h-3.5 w-3.5 text-primary shrink-0" }, void 0, false, {
							fileName: _jsxFileName$1,
							lineNumber: 127,
							columnNumber: 32
						}, this)]
					}, lang.code, true, {
						fileName: _jsxFileName$1,
						lineNumber: 108,
						columnNumber: 15
					}, this);
				})
			}, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 104,
				columnNumber: 9
			}, this),
			onOpenFeedback && /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(DropdownMenuSeparator, { className: "my-2" }, void 0, false, {
				fileName: _jsxFileName$1,
				lineNumber: 135,
				columnNumber: 13
			}, this), /* @__PURE__ */ (void 0)(DropdownMenuItem, {
				id: "btn-settings-open-feedback",
				onClick: onOpenFeedback,
				className: "flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs cursor-pointer text-foreground hover:bg-primary/10 hover:text-primary transition-colors font-medium",
				children: [/* @__PURE__ */ (void 0)(MessageSquareQuote, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 141,
					columnNumber: 15
				}, this), /* @__PURE__ */ (void 0)("span", { children: ["💬 ", t("feedbackBtn")] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 142,
					columnNumber: 15
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 136,
				columnNumber: 13
			}, this)] }, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 134,
				columnNumber: 11
			}, this),
			onOpenAdminFeedback && /* @__PURE__ */ (void 0)(DropdownMenuItem, {
				id: "btn-settings-open-admin-feedback",
				onClick: onOpenAdminFeedback,
				className: "flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs cursor-pointer text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors font-medium",
				children: [/* @__PURE__ */ (void 0)(ShieldCheck, { className: "h-3.5 w-3.5 text-muted-foreground" }, void 0, false, {
					fileName: _jsxFileName$1,
					lineNumber: 153,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)("span", { children: ["🔒 ", t("adminPortal")] }, void 0, true, {
					fileName: _jsxFileName$1,
					lineNumber: 154,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName$1,
				lineNumber: 148,
				columnNumber: 11
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 56,
		columnNumber: 7
	}, this)] }, void 0, true, {
		fileName: _jsxFileName$1,
		lineNumber: 34,
		columnNumber: 5
	}, this);
}
var _jsxFileName = "/app/applet/src/routes/index.tsx?tsr-split=component";
function Index() {
	const { t } = useLanguage();
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [profileModalOpen, setProfileModalOpen] = (0, import_react.useState)(false);
	const [feedbackModalOpen, setFeedbackModalOpen] = (0, import_react.useState)(false);
	const [adminFeedbackModalOpen, setAdminFeedbackModalOpen] = (0, import_react.useState)(false);
	const [branchInput, setBranchInput] = (0, import_react.useState)("");
	const [enrollmentInput, setEnrollmentInput] = (0, import_react.useState)("");
	const [subject, setSubject] = (0, import_react.useState)("");
	const [examPhase, setExamPhase] = (0, import_react.useState)("");
	const [images, setImages] = (0, import_react.useState)([]);
	const [smartFilterEnabled, setSmartFilterEnabled] = (0, import_react.useState)(false);
	const [qualityPreset, setQualityPreset] = (0, import_react.useState)("compact");
	const [rotatingId, setRotatingId] = (0, import_react.useState)(null);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [isGenerating, setIsGenerating] = (0, import_react.useState)(false);
	const [isBatchScanning, setIsBatchScanning] = (0, import_react.useState)(false);
	const [batchProgress, setBatchProgress] = (0, import_react.useState)("");
	const [scannerTarget, setScannerTarget] = (0, import_react.useState)(null);
	const [generationProgress, setGenerationProgress] = (0, import_react.useState)(null);
	const [generationError, setGenerationError] = (0, import_react.useState)(null);
	const [result, setResult] = (0, import_react.useState)(null);
	const [notices, setNotices] = (0, import_react.useState)([]);
	const inputRef = (0, import_react.useRef)(null);
	const createdBlobUrlsRef = (0, import_react.useRef)(/* @__PURE__ */ new Set());
	const activeBranch = profile ? profile.branch : branchInput.trim().toUpperCase();
	const activeEnrollmentNumber = profile ? profile.enrollmentNumber : enrollmentInput.trim();
	const hasUnsavedImages = images.length > 0;
	const hasUnsavedFields = Boolean(subject.trim()) || Boolean(examPhase.trim()) || !profile && (Boolean(branchInput.trim()) || Boolean(enrollmentInput.trim()));
	const hasUnsavedWork = (hasUnsavedImages || hasUnsavedFields) && result === null;
	(0, import_react.useEffect)(() => {
		const handleBeforeUnload = (e) => {
			if (hasUnsavedWork) {
				e.preventDefault();
				e.returnValue = t("unsavedWorkWarning");
				return t("unsavedWorkWarning");
			}
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, [hasUnsavedWork, t]);
	useBlocker({ shouldBlockFn: () => {
		if (!hasUnsavedWork) return false;
		return !window.confirm(t("unsavedWorkWarning"));
	} });
	const getProgressLabel = () => {
		if (!generationProgress) return t("generatingPdf");
		switch (generationProgress.stage) {
			case "preparing": return t("pdfStagePreparing");
			case "processing": return t("pdfStageProcessing", {
				current: generationProgress.current ?? 1,
				total: generationProgress.total ?? images.length
			});
			case "creating": return t("pdfStageCreating");
			case "finalizing": return t("pdfStageFinalizing");
			case "ready": return t("pdfStageReady");
			default: return t("generatingPdf");
		}
	};
	(0, import_react.useEffect)(() => {
		const saved = getSavedProfile();
		if (saved) {
			setProfile(saved);
			setBranchInput(saved.branch);
			setEnrollmentInput(saved.enrollmentNumber);
		}
	}, []);
	const handleSaveProfile = (newProfile) => {
		setProfile(newProfile);
		setBranchInput(newProfile.branch);
		setEnrollmentInput(newProfile.enrollmentNumber);
		setErrors((prev) => ({
			...prev,
			branch: void 0,
			enrollmentNumber: void 0
		}));
		notify(t("savedDetailsNotify", {
			branch: newProfile.branch,
			enrollment: newProfile.enrollmentNumber
		}));
	};
	(0, import_react.useEffect)(() => {
		const urls = createdBlobUrlsRef.current;
		return () => {
			urls.forEach((url) => {
				try {
					URL.revokeObjectURL(url);
				} catch {}
			});
			urls.clear();
		};
	}, []);
	const notify = (message) => setNotices((prev) => [message, ...prev].slice(0, 4));
	const handleFiles = (files) => {
		if (!files || files.length === 0) return;
		const accepted = Array.from(files).filter((f) => f.type.startsWith("image/") || /\.(jpe?g|png|webp|bmp|gif|jfif|heic)$/i.test(f.name));
		if (accepted.length === 0) return;
		const reversedBatch = [...accepted.map((file, idx) => {
			const id = `img-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 9)}`;
			const objectUrl = URL.createObjectURL(file);
			createdBlobUrlsRef.current.add(objectUrl);
			return {
				id,
				name: file.name,
				dataUrl: objectUrl,
				originalDataUrl: objectUrl,
				size: file.size,
				isCropped: false
			};
		})].reverse();
		setImages((prev) => [...prev, ...reversedBatch]);
		setErrors(({ images: _omit, ...rest }) => rest);
		setResult(null);
		if (inputRef.current) inputRef.current.value = "";
		processAutoCropForImages(reversedBatch);
	};
	const processAutoCropForImages = async (targetImages) => {
		if (targetImages.length === 0) return;
		const concurrency = Math.min(3, targetImages.length);
		let index = 0;
		const workers = Array.from({ length: concurrency }, async () => {
			while (index < targetImages.length) {
				const item = targetImages[index++];
				if (!item) continue;
				try {
					const res = await autoCropImage(item.originalDataUrl);
					if (res.isCropped && res.quad) setImages((prev) => prev.map((img) => img.id === item.id ? {
						...img,
						dataUrl: res.dataUrl,
						isCropped: true,
						currentQuad: res.quad,
						confidence: res.confidence
					} : img));
				} catch {}
				await new Promise((r) => setTimeout(r, 0));
			}
		});
		await Promise.all(workers);
	};
	const removeImage = (id) => {
		const target = images.find((image) => image.id === id);
		if (target) {
			if (target.dataUrl.startsWith("blob:")) try {
				URL.revokeObjectURL(target.dataUrl);
				createdBlobUrlsRef.current.delete(target.dataUrl);
			} catch {}
			if (target.originalDataUrl.startsWith("blob:") && target.originalDataUrl !== target.dataUrl) try {
				URL.revokeObjectURL(target.originalDataUrl);
				createdBlobUrlsRef.current.delete(target.originalDataUrl);
			} catch {}
		}
		setImages((prev) => prev.filter((image) => image.id !== id));
		if (scannerTarget?.image.id === id) setScannerTarget(null);
	};
	const moveImage = (index, direction) => {
		setImages((prev) => {
			const copy = [...prev];
			const targetIndex = direction === "up" ? index - 1 : index + 1;
			if (targetIndex < 0 || targetIndex >= copy.length) return prev;
			const [item] = copy.splice(index, 1);
			if (item) copy.splice(targetIndex, 0, item);
			return copy;
		});
	};
	const reverseImagesOrder = () => {
		if (images.length < 2) return;
		setImages((prev) => [...prev].reverse());
		notify(t("orderReversedNotify", { count: images.length }));
	};
	const handleQuickRotate = async (id, degrees) => {
		if (rotatingId || isBatchScanning) return;
		const img = images.find((i) => i.id === id);
		if (!img) return;
		setRotatingId(id);
		try {
			const nextDataUrl = await rotateImage(img.dataUrl, degrees);
			const nextOrigUrl = img.originalDataUrl === img.dataUrl ? nextDataUrl : await rotateImage(img.originalDataUrl, degrees);
			const nextQuad = img.currentQuad ? rotateQuad(img.currentQuad, degrees) : void 0;
			setImages((prev) => prev.map((item) => item.id === id ? {
				...item,
				dataUrl: nextDataUrl,
				originalDataUrl: nextOrigUrl,
				currentQuad: nextQuad
			} : item));
			const pageIdx = images.findIndex((i) => i.id === id);
			const pageLabel = pageIdx >= 0 ? t("pageWord", { num: pageIdx + 1 }) : t("pageSingle");
			notify(t("pageRotatedNotify", {
				page: pageLabel,
				direction: degrees === 90 ? t("rotateRightDir") : t("rotateLeftDir")
			}));
		} catch {
			notify(t("rotateFailedNotify"));
		} finally {
			setRotatingId(null);
		}
	};
	const handleRevertToOriginal = (id) => {
		setImages((prev) => prev.map((img) => img.id === id ? {
			...img,
			dataUrl: img.originalDataUrl,
			isCropped: false,
			currentQuad: void 0,
			confidence: void 0
		} : img));
		notify(t("revertedNotify"));
	};
	const handleApplyScannerCrop = (updated) => {
		setImages((prev) => prev.map((img) => img.id === updated.id ? {
			...img,
			dataUrl: updated.dataUrl,
			isCropped: updated.isCropped,
			currentQuad: updated.currentQuad,
			confidence: updated.confidence
		} : img));
		notify(t("cropAppliedNotify"));
	};
	const handleBatchAutoCrop = async () => {
		if (images.length === 0 || isBatchScanning) return;
		setIsBatchScanning(true);
		let successCount = 0;
		let completedCount = 0;
		const total = images.length;
		try {
			setBatchProgress(t("autoCroppingPages"));
			const concurrency = Math.min(3, total);
			let idx = 0;
			const workers = Array.from({ length: concurrency }, async () => {
				while (idx < total) {
					const currentIdx = idx++;
					const item = images[currentIdx];
					if (!item) continue;
					try {
						const res = await autoCropImage(item.originalDataUrl);
						if (res.isCropped && res.quad) {
							setImages((prev) => prev.map((img) => img.id === item.id ? {
								...img,
								dataUrl: res.dataUrl,
								isCropped: true,
								currentQuad: res.quad,
								confidence: res.confidence
							} : img));
							successCount++;
						}
					} catch {} finally {
						completedCount++;
						setBatchProgress(t("processingPage", {
							current: completedCount,
							total
						}));
					}
					await new Promise((r) => setTimeout(r, 0));
				}
			});
			await Promise.all(workers);
			notify(t("autoCropSuccessNotify", {
				count: successCount,
				total: images.length
			}));
		} finally {
			setIsBatchScanning(false);
			setBatchProgress("");
		}
	};
	const validate = () => {
		const next = {};
		if (!activeBranch) next.branch = t("branchRequiredError");
		if (!activeEnrollmentNumber) next.enrollmentNumber = t("enrollmentRequiredError");
		if (!subject.trim()) next.subject = t("subjectRequiredError");
		if (!examPhase.trim()) next.examPhase = t("examPhaseRequiredError");
		if (images.length === 0) next.images = t("uploadAtLeastOneError");
		setErrors(next);
		return Object.keys(next).length === 0;
	};
	const handleGenerate = async () => {
		setGenerationError(null);
		setResult(null);
		if (!validate()) {
			if (!profile && (!activeBranch || !activeEnrollmentNumber)) setProfileModalOpen(true);
			return;
		}
		if (!profile && activeBranch && activeEnrollmentNumber) {
			const saved = saveStudentProfile({
				branch: activeBranch,
				enrollmentNumber: activeEnrollmentNumber
			});
			setProfile(saved);
		}
		setIsGenerating(true);
		setGenerationProgress({
			stage: "preparing",
			percent: 20,
			total: images.length
		});
		try {
			const totalOriginalSize = images.reduce((acc, img) => acc + (img.size || 0), 0);
			const { blob, fileName } = await generateAssignmentPdf({
				branch: activeBranch,
				enrollmentNumber: activeEnrollmentNumber,
				subject: subject.trim().toUpperCase(),
				examPhase: examPhase.trim().toUpperCase()
			}, images, smartFilterEnabled, qualityPreset, (progress) => {
				setGenerationProgress(progress);
			});
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = fileName;
			document.body.appendChild(link);
			link.click();
			link.remove();
			window.setTimeout(() => URL.revokeObjectURL(url), 1e4);
			setResult({
				fileName,
				size: blob.size,
				originalSize: totalOriginalSize > 0 ? totalOriginalSize : void 0,
				pageCount: images.length,
				blob
			});
			setGenerationProgress(null);
			notify(t("pdfCreatedNotify"));
		} catch (err) {
			console.error("PDF Generation error:", err);
			const msg = err instanceof Error ? err.message : t("pdfGenerateFailed");
			setGenerationError(msg);
			setGenerationProgress(null);
			setErrors((prev) => ({
				...prev,
				images: msg
			}));
			notify(msg);
		} finally {
			setIsGenerating(false);
		}
	};
	const handleShareWhatsApp = async () => {
		if (!result?.blob) return;
		const fileName = result.fileName || "assignment.pdf";
		const file = new File([result.blob], fileName, { type: "application/pdf" });
		if (typeof navigator !== "undefined" && navigator.canShare && navigator.canShare({ files: [file] })) try {
			await navigator.share({
				files: [file],
				title: fileName
			});
			return;
		} catch (err) {
			if (err instanceof Error && err.name === "AbortError") return;
		}
		const url = URL.createObjectURL(result.blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = fileName;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 1e4);
		window.open("https://api.whatsapp.com/send", "_blank", "noopener,noreferrer");
		notify(t("whatsappNotify"));
	};
	const handleManualDownload = () => {
		if (!result?.blob) return;
		const url = URL.createObjectURL(result.blob);
		const link = document.createElement("a");
		link.href = url;
		link.download = result.fileName;
		document.body.appendChild(link);
		link.click();
		link.remove();
		window.setTimeout(() => URL.revokeObjectURL(url), 1e4);
	};
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
		className: "min-h-screen bg-background px-4 py-10 sm:px-6 lg:px-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "mx-auto max-w-5xl",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
					className: "mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs font-semibold uppercase tracking-[0.2em] text-accent-foreground",
							children: t("appTagline")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 493,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
							className: "mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl",
							children: t("appTitle")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 496,
							columnNumber: 13
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "mt-2 text-sm text-muted-foreground sm:text-base",
							children: t("appDescription")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 499,
							columnNumber: 13
						}, this)
					] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 492,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "shrink-0 flex items-center gap-2 flex-wrap sm:flex-nowrap",
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SettingsMenu, {
								onOpenFeedback: () => setFeedbackModalOpen(true),
								onOpenAdminFeedback: () => setAdminFeedbackModalOpen(true)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 504,
								columnNumber: 13
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								id: "btn-open-feedback",
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => setFeedbackModalOpen(true),
								className: "h-9 gap-1.5 text-xs font-medium border-border/80 bg-card text-foreground hover:bg-accent/50 shadow-xs",
								title: t("feedbackBtn"),
								"aria-label": t("feedbackBtn"),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquareQuote, { className: "h-4 w-4 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 507,
									columnNumber: 15
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: ["💬 ", t("feedbackBtn")] }, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 508,
									columnNumber: 15
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 506,
								columnNumber: 13
							}, this),
							profile ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center gap-2.5 rounded-xl border border-border/80 bg-card p-2 shadow-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 513,
											columnNumber: 19
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 512,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "text-left pr-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs font-semibold text-foreground",
												children: t("savedProfile")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 517,
												columnNumber: 21
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: "outline",
												className: "text-[9px] px-1 py-0 h-3.5 border-primary/40 text-primary",
												children: profile.branch
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 520,
												columnNumber: 21
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 516,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[11px] font-mono text-muted-foreground leading-tight",
											children: profile.enrollmentNumber
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 524,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 515,
										columnNumber: 17
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										id: "btn-edit-profile-header",
										type: "button",
										variant: "ghost",
										size: "sm",
										className: "h-8 text-xs text-muted-foreground hover:text-foreground gap-1 border-l border-border pl-2",
										onClick: () => setProfileModalOpen(true),
										title: t("editProfileTitle"),
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PenLine, { className: "h-3.5 w-3.5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 529,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("editProfile") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 530,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 528,
										columnNumber: 17
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 511,
								columnNumber: 24
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
								id: "btn-setup-profile-header",
								type: "button",
								variant: "outline",
								size: "sm",
								className: "h-9 gap-1.5 text-xs font-medium border-primary/30 text-primary hover:bg-primary/5 shadow-xs",
								onClick: () => setProfileModalOpen(true),
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "h-4 w-4" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 533,
									columnNumber: 17
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("saveStudentProfile") }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 534,
									columnNumber: 17
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 532,
								columnNumber: 24
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 503,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 491,
					columnNumber: 9
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "grid gap-6 lg:grid-cols-5",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-6 lg:col-span-3",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
							className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
								className: "text-lg",
								children: t("step1Title")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 544,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									id: "toggle-smart-filter-container",
									className: "flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-2.5 py-1 text-xs",
									title: t("smartFilterTooltip"),
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(WandSparkles, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 548,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "switch-smart-filter",
											className: "cursor-pointer text-xs font-semibold select-none flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("smartFilter") }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 550,
												columnNumber: 23
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
												variant: smartFilterEnabled ? "default" : "secondary",
												className: "text-[9px] px-1 py-0 h-4 font-bold uppercase tracking-wider",
												children: smartFilterEnabled ? t("on") : t("off")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 551,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 549,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Switch, {
											id: "switch-smart-filter",
											checked: smartFilterEnabled,
											onCheckedChange: (checked) => setSmartFilterEnabled(checked),
											"aria-label": t("smartFilter")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 555,
											columnNumber: 21
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 547,
									columnNumber: 19
								}, this), images.length > 0 && /* @__PURE__ */ (void 0)(Button, {
									id: "btn-autocrop-all",
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: handleBatchAutoCrop,
									disabled: isBatchScanning,
									className: "gap-1.5 text-xs text-primary border-primary/30 hover:bg-primary/10 h-8",
									children: isBatchScanning ? /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 560,
										columnNumber: 27
									}, this), batchProgress || t("scanningPages")] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 559,
										columnNumber: 42
									}, this) : /* @__PURE__ */ (void 0)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (void 0)(Sparkles, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 563,
										columnNumber: 27
									}, this), t("autoCropAll")] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 562,
										columnNumber: 31
									}, this)
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 558,
									columnNumber: 41
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 545,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 543,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, { children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								htmlFor: "assignment-files",
								className: "flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-border bg-secondary/40 px-6 py-8 text-center transition-colors hover:border-primary/50 hover:bg-secondary",
								onDragOver: (e) => {
									e.preventDefault();
									e.stopPropagation();
								},
								onDrop: (e) => {
									e.preventDefault();
									e.stopPropagation();
									handleFiles(e.dataTransfer.files);
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ImagePlus, {
										className: "h-8 w-8 text-primary",
										"aria-hidden": "true"
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 578,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "mt-3 text-sm font-medium text-foreground",
										children: t("uploadPrompt")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 579,
										columnNumber: 19
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
										className: "mt-1 text-xs text-muted-foreground",
										children: t("uploadSubtext")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 582,
										columnNumber: 19
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 570,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("input", {
								ref: inputRef,
								id: "assignment-files",
								type: "file",
								accept: "image/jpeg,image/png,image/webp",
								multiple: true,
								className: "sr-only",
								onChange: (event) => handleFiles(event.target.files)
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 584,
								columnNumber: 17
							}, this),
							errors.images && /* @__PURE__ */ (void 0)("p", {
								className: "mt-3 text-sm text-destructive",
								children: errors.images
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 585,
								columnNumber: 35
							}, this),
							images.length > 0 && /* @__PURE__ */ (void 0)("div", {
								className: "mt-5 space-y-3",
								children: [/* @__PURE__ */ (void 0)("div", {
									className: "flex items-center justify-between gap-2 flex-wrap",
									children: [/* @__PURE__ */ (void 0)("p", {
										className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
										children: t("uploadedPagesHeader", { count: images.length })
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 590,
										columnNumber: 23
									}, this), images.length >= 2 && /* @__PURE__ */ (void 0)(Button, {
										id: "btn-reverse-page-order",
										type: "button",
										variant: "outline",
										size: "sm",
										onClick: reverseImagesOrder,
										disabled: isBatchScanning || isGenerating,
										className: "h-7 gap-1.5 px-2.5 text-xs font-medium text-foreground hover:bg-secondary border-border/80 cursor-pointer shadow-2xs",
										title: t("reverseOrderTooltip"),
										children: [/* @__PURE__ */ (void 0)(ArrowUpDown, { className: "h-3.5 w-3.5 text-primary shrink-0" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 596,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("span", { children: t("reverseOrder") }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 597,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 595,
										columnNumber: 46
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 589,
									columnNumber: 21
								}, this), /* @__PURE__ */ (void 0)("ul", {
									className: "divide-y divide-border/60 rounded-lg border border-border bg-card",
									children: images.map((image, index) => /* @__PURE__ */ (void 0)("li", {
										className: "flex flex-wrap items-center justify-between gap-3 p-3 sm:flex-nowrap",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ (void 0)("div", {
												className: "relative flex h-14 w-12 shrink-0 items-center justify-center overflow-hidden rounded border border-border bg-secondary/40",
												children: [/* @__PURE__ */ (void 0)("img", {
													src: image.dataUrl,
													alt: `Page ${index + 1}`,
													className: "h-full w-full object-contain"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 604,
													columnNumber: 31
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "absolute left-0.5 top-0.5 rounded bg-primary px-1 text-[9px] font-bold text-primary-foreground",
													children: index + 1
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 605,
													columnNumber: 31
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 603,
												columnNumber: 29
											}, this), /* @__PURE__ */ (void 0)("div", {
												className: "min-w-0",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2",
													children: [/* @__PURE__ */ (void 0)("p", {
														className: "truncate text-xs font-medium text-foreground max-w-[140px] sm:max-w-[200px]",
														children: image.name
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 612,
														columnNumber: 33
													}, this), image.isCropped ? /* @__PURE__ */ (void 0)(Badge, {
														variant: "outline",
														className: "border-emerald-500/40 bg-emerald-500/10 text-[10px] text-emerald-600 dark:text-emerald-400 py-0",
														children: t("scannedAndCropped")
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 615,
														columnNumber: 52
													}, this) : /* @__PURE__ */ (void 0)(Badge, {
														variant: "secondary",
														className: "text-[10px] py-0 text-muted-foreground",
														children: t("originalPhoto")
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 617,
														columnNumber: 46
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 611,
													columnNumber: 31
												}, this), /* @__PURE__ */ (void 0)("p", {
													className: "text-[11px] text-muted-foreground",
													children: [
														t("pageInPdf", { num: index + 1 }),
														" ",
														image.size ? `· ${formatBytes(image.size)}` : ""
													]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 621,
													columnNumber: 31
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 610,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 602,
											columnNumber: 27
										}, this), /* @__PURE__ */ (void 0)("div", {
											className: "flex items-center gap-1.5",
											children: [
												/* @__PURE__ */ (void 0)(Button, {
													id: `btn-crop-page-${index + 1}`,
													type: "button",
													variant: "outline",
													size: "sm",
													disabled: isBatchScanning || rotatingId === image.id,
													onClick: () => setScannerTarget({
														image,
														pageNumber: index + 1
													}),
													className: "h-8 gap-1.5 text-xs text-primary hover:text-primary",
													title: t("scanCropBtn"),
													children: [/* @__PURE__ */ (void 0)(Crop, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 636,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "hidden sm:inline",
														children: t("scanCropBtn")
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 637,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 632,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center rounded-md border border-border bg-secondary/30 p-0.5 shadow-2xs",
													children: [/* @__PURE__ */ (void 0)(Button, {
														id: `btn-rotate-left-page-${index + 1}`,
														type: "button",
														variant: "ghost",
														size: "icon",
														disabled: isBatchScanning || rotatingId === image.id,
														onClick: () => handleQuickRotate(image.id, -90),
														className: "h-7 w-7 text-muted-foreground hover:text-foreground",
														title: t("rotateLeftTitle"),
														"aria-label": `Rotate page ${index + 1} left 90 degrees`,
														children: rotatingId === image.id ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-primary" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 643,
															columnNumber: 60
														}, this) : /* @__PURE__ */ (void 0)(RotateCcw, { className: "h-3.5 w-3.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 643,
															columnNumber: 124
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 642,
														columnNumber: 31
													}, this), /* @__PURE__ */ (void 0)(Button, {
														id: `btn-rotate-right-page-${index + 1}`,
														type: "button",
														variant: "ghost",
														size: "icon",
														disabled: isBatchScanning || rotatingId === image.id,
														onClick: () => handleQuickRotate(image.id, 90),
														className: "h-7 w-7 text-muted-foreground hover:text-foreground",
														title: t("rotateRightTitle"),
														"aria-label": `Rotate page ${index + 1} right 90 degrees`,
														children: rotatingId === image.id ? /* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin text-primary" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 647,
															columnNumber: 60
														}, this) : /* @__PURE__ */ (void 0)(RotateCw, { className: "h-3.5 w-3.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 647,
															columnNumber: 124
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 646,
														columnNumber: 31
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 641,
													columnNumber: 29
												}, this),
												image.isCropped && /* @__PURE__ */ (void 0)(Button, {
													id: `btn-revert-page-${index + 1}`,
													type: "button",
													variant: "ghost",
													size: "icon",
													disabled: isBatchScanning || rotatingId === image.id,
													onClick: () => handleRevertToOriginal(image.id),
													className: "h-8 w-8 text-muted-foreground hover:text-foreground",
													title: t("revertToOriginalTitle"),
													children: /* @__PURE__ */ (void 0)(Undo2, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 652,
														columnNumber: 33
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 651,
													columnNumber: 49
												}, this),
												/* @__PURE__ */ (void 0)(Button, {
													id: `btn-move-up-page-${index + 1}`,
													type: "button",
													variant: "ghost",
													size: "icon",
													onClick: () => moveImage(index, "up"),
													disabled: index === 0 || isBatchScanning || rotatingId === image.id,
													className: "h-8 w-8 text-muted-foreground hover:text-foreground",
													title: t("moveUpTitle"),
													children: /* @__PURE__ */ (void 0)(ArrowUp, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 656,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 655,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)(Button, {
													id: `btn-move-down-page-${index + 1}`,
													type: "button",
													variant: "ghost",
													size: "icon",
													onClick: () => moveImage(index, "down"),
													disabled: index === images.length - 1 || isBatchScanning || rotatingId === image.id,
													className: "h-8 w-8 text-muted-foreground hover:text-foreground",
													title: t("moveDownTitle"),
													children: /* @__PURE__ */ (void 0)(ArrowDown, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 660,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 659,
													columnNumber: 29
												}, this),
												/* @__PURE__ */ (void 0)(Button, {
													id: `btn-delete-page-${index + 1}`,
													type: "button",
													variant: "ghost",
													size: "icon",
													disabled: isBatchScanning || rotatingId === image.id,
													onClick: () => removeImage(image.id),
													className: "h-8 w-8 text-destructive hover:bg-destructive/10",
													title: t("deletePhotoTitle"),
													children: /* @__PURE__ */ (void 0)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 664,
														columnNumber: 31
													}, this)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 663,
													columnNumber: 29
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 631,
											columnNumber: 27
										}, this)]
									}, image.id, true, {
										fileName: _jsxFileName,
										lineNumber: 601,
										columnNumber: 53
									}, this))
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 600,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 588,
								columnNumber: 39
							}, this),
							notices.length > 0 && /* @__PURE__ */ (void 0)("ul", {
								className: "mt-3 space-y-1",
								children: notices.map((notice, i) => /* @__PURE__ */ (void 0)("li", {
									className: "flex items-start gap-2 text-xs text-muted-foreground",
									children: [notice.includes("applied") || notice.includes("scanned") ? /* @__PURE__ */ (void 0)(CircleCheck, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 673,
										columnNumber: 85
									}, this) : /* @__PURE__ */ (void 0)(TriangleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-accent-foreground" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 673,
										columnNumber: 161
									}, this), /* @__PURE__ */ (void 0)("span", {
										className: "break-all",
										children: notice
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 674,
										columnNumber: 25
									}, this)]
								}, `${notice}-${i}`, true, {
									fileName: _jsxFileName,
									lineNumber: 672,
									columnNumber: 65
								}, this))
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 671,
								columnNumber: 40
							}, this)
						] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 569,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 542,
							columnNumber: 13
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, {
							className: "pb-3",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
									className: "text-lg flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(GraduationCap, { className: "h-5 w-5 text-primary" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 685,
										columnNumber: 21
									}, this), t("step2Title")]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 684,
									columnNumber: 19
								}, this), profile && /* @__PURE__ */ (void 0)(Badge, {
									variant: "outline",
									className: "text-xs text-primary bg-primary/5",
									children: t("profileActive")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 688,
									columnNumber: 31
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 683,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardDescription, {
								className: "text-xs",
								children: profile ? t("step2DescSaved") : t("step2DescNew")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 692,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 682,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
							className: "space-y-4",
							children: [profile ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl border border-primary/20 bg-primary/5 p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold shrink-0",
										children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(UserCheck, { className: "h-5 w-5" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 701,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 700,
										columnNumber: 23
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-xs font-semibold text-foreground",
											children: t("savedStudentProfile")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 705,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] text-muted-foreground font-normal",
											children: [
												"(",
												t("savedInBrowser"),
												")"
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 708,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 704,
										columnNumber: 25
									}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex flex-wrap items-center gap-2 mt-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex items-center gap-1 rounded bg-background px-2 py-0.5 text-xs font-medium border border-border text-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "h-3 w-3 text-primary" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 714,
													columnNumber: 29
												}, this),
												t("branchLabel"),
												":",
												" ",
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
													className: "text-primary",
													children: profile.branch
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 716,
													columnNumber: 29
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 713,
											columnNumber: 27
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "inline-flex items-center gap-1 rounded bg-background px-2 py-0.5 text-xs font-medium border border-border text-foreground",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Hash, { className: "h-3 w-3 text-primary" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 719,
													columnNumber: 29
												}, this),
												t("enrollNoLabel"),
												":",
												" ",
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("strong", {
													className: "font-mono text-primary",
													children: profile.enrollmentNumber
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 721,
													columnNumber: 29
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 718,
											columnNumber: 27
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 712,
										columnNumber: 25
									}, this)] }, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 703,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 699,
									columnNumber: 21
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
									id: "btn-edit-student-details",
									type: "button",
									variant: "outline",
									size: "sm",
									className: "text-xs h-8 shrink-0 gap-1.5 bg-background shadow-xs hover:bg-muted",
									onClick: () => setProfileModalOpen(true),
									children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(PenLine, { className: "h-3 w-3" }, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 729,
										columnNumber: 23
									}, this), t("editDetailsBtn")]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 728,
									columnNumber: 21
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 698,
								columnNumber: 28
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "rounded-xl border border-border/80 bg-muted/30 p-3.5 space-y-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Building2, { className: "h-4 w-4 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 736,
												columnNumber: 25
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
												className: "text-xs font-semibold text-foreground",
												children: t("oneTimeSetup")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 737,
												columnNumber: 25
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 735,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] text-muted-foreground",
											children: t("savesInBrowser")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 741,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 734,
										columnNumber: 21
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "grid gap-3 sm:grid-cols-2",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
													htmlFor: "branch",
													className: "text-xs font-semibold",
													children: t("branchRequired")
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 747,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
													id: "branch",
													value: branchInput,
													onChange: (e) => {
														setBranchInput(e.target.value.toUpperCase());
														if (errors.branch) setErrors((prev) => ({
															...prev,
															branch: void 0
														}));
													},
													placeholder: t("branchPlaceholder"),
													maxLength: 20,
													className: "text-xs uppercase",
													"aria-invalid": Boolean(errors.branch)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 750,
													columnNumber: 25
												}, this),
												errors.branch && /* @__PURE__ */ (void 0)("p", {
													className: "text-xs text-destructive",
													children: errors.branch
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 757,
													columnNumber: 43
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 746,
											columnNumber: 23
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "space-y-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
													htmlFor: "enrollmentNumber",
													className: "text-xs font-semibold",
													children: t("enrollmentRequired")
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 760,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
													id: "enrollmentNumber",
													value: enrollmentInput,
													onChange: (e) => {
														setEnrollmentInput(e.target.value);
														if (errors.enrollmentNumber) setErrors((prev) => ({
															...prev,
															enrollmentNumber: void 0
														}));
													},
													placeholder: t("enrollmentPlaceholder"),
													maxLength: 40,
													className: "text-xs font-mono",
													"aria-invalid": Boolean(errors.enrollmentNumber)
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 763,
													columnNumber: 25
												}, this),
												errors.enrollmentNumber && /* @__PURE__ */ (void 0)("p", {
													className: "text-xs text-destructive",
													children: errors.enrollmentNumber
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 770,
													columnNumber: 53
												}, this)
											]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 759,
											columnNumber: 23
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 745,
										columnNumber: 21
									}, this),
									branchInput.trim() && enrollmentInput.trim() && /* @__PURE__ */ (void 0)("div", {
										className: "flex justify-end pt-1",
										children: /* @__PURE__ */ (void 0)(Button, {
											id: "btn-save-profile-inline",
											type: "button",
											variant: "secondary",
											size: "sm",
											className: "text-xs h-7 gap-1",
											onClick: () => {
												const saved = saveStudentProfile({
													branch: branchInput,
													enrollmentNumber: enrollmentInput
												});
												handleSaveProfile(saved);
											},
											children: [/* @__PURE__ */ (void 0)(UserCheck, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 781,
												columnNumber: 27
											}, this), t("saveDetailsFuture")]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 774,
											columnNumber: 25
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 773,
										columnNumber: 70
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 733,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "grid gap-4 sm:grid-cols-2 pt-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "subject",
											className: "text-xs font-semibold",
											children: t("subjectRequired")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 790,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											id: "subject",
											value: subject,
											onChange: (e) => setSubject(e.target.value.toUpperCase()),
											placeholder: t("subjectPlaceholder"),
											maxLength: 80,
											"aria-invalid": Boolean(errors.subject),
											className: "text-sm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 793,
											columnNumber: 21
										}, this),
										errors.subject ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-destructive",
											children: errors.subject
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 794,
											columnNumber: 39
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[10px] text-muted-foreground",
											children: t("subjectExample")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 794,
											columnNumber: 102
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 789,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "space-y-1.5",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Label, {
											htmlFor: "examPhase",
											className: "text-xs font-semibold",
											children: t("examPhaseRequired")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 797,
											columnNumber: 21
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
											id: "examPhase",
											value: examPhase,
											onChange: (e) => setExamPhase(e.target.value.toUpperCase()),
											placeholder: t("examPhasePlaceholder"),
											maxLength: 20,
											"aria-invalid": Boolean(errors.examPhase),
											className: "text-sm"
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 800,
											columnNumber: 21
										}, this),
										errors.examPhase ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs text-destructive",
											children: errors.examPhase
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 801,
											columnNumber: 41
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-[10px] text-muted-foreground",
											children: t("examPhaseExample")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 801,
											columnNumber: 106
										}, this)
									]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 796,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 788,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 696,
							columnNumber: 15
						}, this)] }, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 681,
							columnNumber: 13
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 540,
						columnNumber: 11
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "lg:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Card, {
							className: "lg:sticky lg:top-8",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardTitle, {
								className: "text-lg",
								children: t("step3Title")
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 812,
								columnNumber: 17
							}, this), images.length > 0 && /* @__PURE__ */ (void 0)("p", {
								className: "text-xs text-muted-foreground",
								children: t("pagesInFinalPdf", {
									count: images.length,
									pageWord: images.length === 1 ? t("pageSingle") : t("pagePlural")
								})
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 813,
								columnNumber: 39
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 811,
								columnNumber: 15
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(CardContent, {
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "rounded-lg border border-border/80 bg-secondary/30 p-2.5 space-y-1",
										children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
											className: "text-[10px] uppercase tracking-wider font-semibold text-muted-foreground",
											children: t("targetFilename")
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 823,
											columnNumber: 19
										}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-xs font-mono font-semibold text-primary break-all",
											children: `${activeBranch || "BRANCH"}_${activeEnrollmentNumber || "ENROLL"}_${subject.trim() || "SUBJECT"}_${examPhase.trim() || "PHASE"}.pdf`
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 826,
											columnNumber: 19
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 822,
										columnNumber: 17
									}, this),
									images.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
										className: "rounded-lg bg-secondary/50 px-4 py-6 text-center text-sm text-muted-foreground",
										children: t("emptyPreviewPlaceholder")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 831,
										columnNumber: 40
									}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("ul", {
										className: "grid grid-cols-3 gap-2.5",
										children: images.map((image, index) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("li", {
											className: "group relative cursor-pointer",
											onClick: () => setScannerTarget({
												image,
												pageNumber: index + 1
											}),
											title: t("scanCropBtn"),
											children: [
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("img", {
													src: image.dataUrl,
													alt: `Assignment page ${index + 1}: ${image.name}`,
													className: "aspect-3/4 w-full rounded-lg border border-border bg-secondary/30 object-contain p-0.5 transition-all group-hover:border-primary group-hover:shadow",
													loading: "lazy"
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 838,
													columnNumber: 25
												}, this),
												/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "absolute left-1 top-1 rounded bg-primary px-1.5 text-[10px] font-semibold text-primary-foreground shadow",
													children: index + 1
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 839,
													columnNumber: 25
												}, this),
												image.isCropped && /* @__PURE__ */ (void 0)("span", {
													className: "absolute right-1 bottom-1 rounded bg-emerald-600/90 px-1 text-[9px] font-bold text-white shadow",
													children: t("scannedBadgeSmall")
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 842,
													columnNumber: 45
												}, this)
											]
										}, image.id, true, {
											fileName: _jsxFileName,
											lineNumber: 834,
											columnNumber: 51
										}, this))
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 833,
										columnNumber: 26
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
										className: "space-y-2 rounded-xl border border-border/80 bg-secondary/30 p-3",
										children: [
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center gap-1.5",
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(SlidersVertical, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 852,
														columnNumber: 23
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "text-xs font-semibold text-foreground",
														children: t("compressionAndQuality")
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 853,
														columnNumber: 23
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 851,
													columnNumber: 21
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
													className: "text-[10px] text-muted-foreground font-mono",
													children: QUALITY_PRESETS[qualityPreset].targetSizeDesc
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 857,
													columnNumber: 21
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 850,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "grid grid-cols-3 gap-1.5 pt-0.5",
												children: [
													"standard",
													"high",
													"compact"
												].map((presetKey) => {
													const isSelected = qualityPreset === presetKey;
													const presetLabel = presetKey === "standard" ? t("standardPreset") : presetKey === "high" ? t("highPreset") : t("compactPreset");
													const presetBadge = presetKey === "standard" ? t("standardQualityBadge") : presetKey === "high" ? t("highQualityBadge") : t("compactQualityBadge");
													return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
														id: `btn-quality-${presetKey}`,
														type: "button",
														onClick: () => setQualityPreset(presetKey),
														className: `flex flex-col items-center justify-center rounded-lg p-2 text-center transition-all border ${isSelected ? "border-primary bg-primary/10 text-primary font-semibold shadow-2xs" : "border-border/60 bg-card hover:bg-muted/50 text-muted-foreground hover:text-foreground"}`,
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "text-xs font-semibold leading-tight flex items-center gap-1",
															children: presetLabel
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 868,
															columnNumber: 27
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
															className: "text-[10px] opacity-80 mt-0.5 leading-none",
															children: presetBadge
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 871,
															columnNumber: 27
														}, this)]
													}, presetKey, true, {
														fileName: _jsxFileName,
														lineNumber: 867,
														columnNumber: 28
													}, this);
												})
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 862,
												columnNumber: 19
											}, this),
											/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
												className: "text-[11px] text-muted-foreground leading-snug",
												children: qualityPreset === "standard" ? t("standardQualityDesc") : qualityPreset === "high" ? t("highQualityDesc") : t("compactQualityDesc")
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 877,
												columnNumber: 19
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 849,
										columnNumber: 17
									}, this),
									isGenerating && /* @__PURE__ */ (void 0)("div", {
										className: "space-y-3 rounded-xl border border-primary/30 bg-primary/5 p-3.5 animate-in fade-in duration-200",
										children: [
											/* @__PURE__ */ (void 0)("div", {
												className: "flex items-center justify-between text-xs font-semibold",
												children: [/* @__PURE__ */ (void 0)("div", {
													className: "flex items-center gap-2 text-primary min-w-0",
													children: [/* @__PURE__ */ (void 0)(LoaderCircle, { className: "h-4 w-4 animate-spin shrink-0" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 886,
														columnNumber: 25
													}, this), /* @__PURE__ */ (void 0)("span", {
														className: "truncate",
														children: getProgressLabel()
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 887,
														columnNumber: 25
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 885,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)("span", {
													className: "font-mono text-primary font-bold text-xs shrink-0 ml-2",
													children: [generationProgress?.percent || 20, "%"]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 889,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 884,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "h-2.5 w-full overflow-hidden rounded-full bg-secondary/80 border border-border/40",
												children: /* @__PURE__ */ (void 0)("div", {
													className: "h-full bg-primary transition-all duration-300 ease-out",
													style: { width: `${Math.max(8, generationProgress?.percent || 20)}%` }
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 896,
													columnNumber: 23
												}, this)
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 895,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "grid grid-cols-4 gap-1 text-[10px] text-muted-foreground pt-0.5",
												children: [
													/* @__PURE__ */ (void 0)("div", {
														className: `text-center font-medium truncate ${generationProgress?.stage === "preparing" ? "text-primary font-bold" : (generationProgress?.percent || 0) >= 20 ? "text-foreground" : ""}`,
														children: "1. Prepare"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 903,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: `text-center font-medium truncate ${generationProgress?.stage === "processing" ? "text-primary font-bold" : (generationProgress?.percent || 0) >= 70 ? "text-foreground" : ""}`,
														children: "2. Process"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 906,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: `text-center font-medium truncate ${generationProgress?.stage === "creating" ? "text-primary font-bold" : (generationProgress?.percent || 0) >= 90 ? "text-foreground" : ""}`,
														children: "3. Build"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 909,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (void 0)("div", {
														className: `text-center font-medium truncate ${generationProgress?.stage === "finalizing" ? "text-primary font-bold" : (generationProgress?.percent || 0) >= 100 ? "text-foreground" : ""}`,
														children: "4. Finalize"
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 912,
														columnNumber: 23
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 902,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 883,
										columnNumber: 34
									}, this),
									generationError && !isGenerating && /* @__PURE__ */ (void 0)("div", {
										className: "space-y-2.5 rounded-lg border border-destructive/40 bg-destructive/10 p-3.5 text-destructive animate-in fade-in duration-200",
										children: [/* @__PURE__ */ (void 0)("div", {
											className: "flex items-start gap-2 text-xs font-semibold",
											children: [/* @__PURE__ */ (void 0)(TriangleAlert, { className: "h-4 w-4 shrink-0 mt-0.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 921,
												columnNumber: 23
											}, this), /* @__PURE__ */ (void 0)("span", {
												className: "leading-snug",
												children: generationError
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 922,
												columnNumber: 23
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 920,
											columnNumber: 21
										}, this), /* @__PURE__ */ (void 0)(Button, {
											id: "btn-retry-generate-pdf",
											type: "button",
											variant: "destructive",
											size: "sm",
											className: "w-full text-xs font-semibold shadow-xs cursor-pointer",
											onClick: handleGenerate,
											children: [/* @__PURE__ */ (void 0)(RotateCcw, { className: "mr-1.5 h-3.5 w-3.5" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 925,
												columnNumber: 23
											}, this), t("retryGeneratePdf")]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 924,
											columnNumber: 21
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 919,
										columnNumber: 54
									}, this),
									/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
										id: "btn-generate-pdf",
										type: "button",
										className: "w-full font-semibold shadow",
										onClick: handleGenerate,
										disabled: isGenerating,
										children: isGenerating ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-4 w-4 animate-spin" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 932,
											columnNumber: 23
										}, this), getProgressLabel()] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 931,
											columnNumber: 35
										}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FileDown, { className: "h-4 w-4" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 935,
											columnNumber: 23
										}, this), t("generateDownloadPdf")] }, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 934,
											columnNumber: 27
										}, this)
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 930,
										columnNumber: 17
									}, this),
									result && /* @__PURE__ */ (void 0)("div", {
										className: "space-y-3 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-4",
										children: [
											/* @__PURE__ */ (void 0)("p", {
												className: "flex items-center gap-2 text-sm font-semibold text-foreground",
												children: [/* @__PURE__ */ (void 0)(CircleCheck, { className: "h-4 w-4 text-emerald-500" }, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 942,
													columnNumber: 23
												}, this), t("pdfReadyTitle")]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 941,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("p", {
												className: "break-all text-xs font-medium text-foreground",
												children: result.fileName
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 945,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex flex-wrap items-center gap-2 text-xs text-muted-foreground",
												children: [
													/* @__PURE__ */ (void 0)("span", { children: [
														result.pageCount,
														" ",
														result.pageCount === 1 ? t("pageSingle") : t("pagePlural")
													] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 949,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (void 0)("span", { children: "·" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 953,
														columnNumber: 23
													}, this),
													/* @__PURE__ */ (void 0)("span", { children: [
														t("fileSize"),
														":",
														" ",
														/* @__PURE__ */ (void 0)("strong", {
															className: "text-foreground",
															children: formatBytes(result.size)
														}, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 956,
															columnNumber: 25
														}, this)
													] }, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 954,
														columnNumber: 23
													}, this),
													result.originalSize && result.originalSize > result.size && /* @__PURE__ */ (void 0)("span", {
														className: "rounded bg-emerald-500/20 px-1.5 py-0.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300",
														children: t("smallerBadge", { percent: Math.round((1 - result.size / result.originalSize) * 100) })
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 958,
														columnNumber: 84
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 948,
												columnNumber: 21
											}, this),
											/* @__PURE__ */ (void 0)("div", {
												className: "flex flex-col gap-2 pt-1",
												children: [/* @__PURE__ */ (void 0)(Button, {
													id: "btn-share-whatsapp",
													type: "button",
													className: "w-full font-semibold shadow bg-[#25D366] hover:bg-[#20bd5a] text-white",
													onClick: handleShareWhatsApp,
													children: t("shareWhatsApp")
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 966,
													columnNumber: 23
												}, this), /* @__PURE__ */ (void 0)(Button, {
													id: "btn-download-pdf-again",
													type: "button",
													variant: "outline",
													size: "sm",
													className: "w-full text-xs font-medium border-emerald-600/30 hover:bg-emerald-500/10",
													onClick: handleManualDownload,
													children: [/* @__PURE__ */ (void 0)(FileDown, { className: "mr-1.5 h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 970,
														columnNumber: 25
													}, this), t("downloadPdfAgain")]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 969,
													columnNumber: 23
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 965,
												columnNumber: 21
											}, this)
										]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 940,
										columnNumber: 28
									}, this)
								]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 820,
								columnNumber: 15
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 810,
							columnNumber: 13
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 809,
						columnNumber: 11
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 539,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 490,
				columnNumber: 7
			}, this),
			scannerTarget && /* @__PURE__ */ (void 0)(DocumentScannerModal, {
				image: scannerTarget.image,
				pageNumber: scannerTarget.pageNumber,
				isOpen: Boolean(scannerTarget),
				onClose: () => setScannerTarget(null),
				onApply: handleApplyScannerCrop,
				onRevertToOriginal: handleRevertToOriginal
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 982,
				columnNumber: 25
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ProfileEditModal, {
				isOpen: profileModalOpen,
				onClose: () => setProfileModalOpen(false),
				currentProfile: profile,
				onSave: handleSaveProfile
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 985,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(FeedbackModal, {
				isOpen: feedbackModalOpen,
				onClose: () => setFeedbackModalOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 988,
				columnNumber: 7
			}, this),
			/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminFeedbackModal, {
				isOpen: adminFeedbackModalOpen,
				onClose: () => setAdminFeedbackModalOpen(false)
			}, void 0, false, {
				fileName: _jsxFileName,
				lineNumber: 991,
				columnNumber: 7
			}, this)
		]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 489,
		columnNumber: 10
	}, this);
}
//#endregion
export { Index as component };
