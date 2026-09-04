import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as require_jsx_dev_runtime } from "../_libs/react.mjs";
import { a as useLanguage, n as getAdminAnalyticsServerFn } from "./router-DDjsreg3.mjs";
import { $ as ArrowLeft, A as KeyRound, D as LoaderCircle, E as Lock, F as Funnel, G as ChartColumn, H as CircleAlert, K as Calendar, M as Heart, O as Lightbulb, S as MessageSquareQuote, T as LogOut, X as Bug, c as Trash2, d as Sparkles, k as Languages, m as ShieldAlert, p as ShieldCheck, u as Star, w as Mail, y as RefreshCw } from "../_libs/lucide-react.mjs";
import { i as Input, l as verifyAdminKeyServerFn, n as Badge, o as deleteFeedbackServerFn, r as Button, s as getAdminFeedbackListServerFn, t as AdminAnalyticsView } from "./AdminAnalyticsView-BH3LYJN6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-C9XXJ8gw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_dev_runtime = require_jsx_dev_runtime();
var _jsxFileName = "/app/applet/src/routes/admin.tsx?tsr-split=component";
var ADMIN_STORAGE_KEY = "pdfmaker_admin_passkey";
function AdminDashboardPage() {
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
		try {
			const saved = sessionStorage.getItem(ADMIN_STORAGE_KEY);
			if (saved) {
				setActivePasskey(saved);
				loadData(saved, selectedFilter);
			}
		} catch {}
	}, [loadData, selectedFilter]);
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
	return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
		className: "min-h-screen bg-background text-foreground flex flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("header", {
			className: "sticky top-0 z-30 border-b border-border bg-card/80 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						className: "h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ArrowLeft, { className: "h-3.5 w-3.5" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 183,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Back to App" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 184,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 182,
						columnNumber: 13
					}, this)
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 181,
					columnNumber: 11
				}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldCheck, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 190,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 189,
						columnNumber: 13
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h1", {
						className: "text-sm sm:text-base font-bold text-foreground leading-tight",
						children: t("adminDashboard")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 193,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
						className: "text-[11px] text-muted-foreground hidden sm:block",
						children: "PDFMaker Owner Administration"
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 196,
						columnNumber: 15
					}, this)] }, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 192,
						columnNumber: 13
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 188,
					columnNumber: 11
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 180,
				columnNumber: 9
			}, this), activePasskey && /* @__PURE__ */ (void 0)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (void 0)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => loadData(activePasskey, selectedFilter),
					disabled: isLoadingList || isLoadingAnalytics,
					className: "h-8 gap-1.5 text-xs",
					title: t("adminRefresh"),
					children: [/* @__PURE__ */ (void 0)(RefreshCw, { className: `h-3.5 w-3.5 ${isLoadingList || isLoadingAnalytics ? "animate-spin" : ""}` }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 205,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("span", {
						className: "hidden sm:inline",
						children: t("adminRefresh")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 206,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 204,
					columnNumber: 13
				}, this), /* @__PURE__ */ (void 0)(Button, {
					type: "button",
					variant: "ghost",
					size: "sm",
					onClick: handleLogout,
					className: "h-8 gap-1 text-xs text-muted-foreground hover:text-destructive",
					title: t("adminLogoutBtn"),
					children: [/* @__PURE__ */ (void 0)(LogOut, { className: "h-3.5 w-3.5" }, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 209,
						columnNumber: 15
					}, this), /* @__PURE__ */ (void 0)("span", {
						className: "hidden sm:inline",
						children: t("adminLogoutBtn")
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 210,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 208,
					columnNumber: 13
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 203,
				columnNumber: 27
			}, this)]
		}, void 0, true, {
			fileName: _jsxFileName,
			lineNumber: 179,
			columnNumber: 7
		}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("main", {
			className: "flex-1 max-w-5xl w-full mx-auto p-4 sm:p-8",
			children: !activePasskey ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "max-w-md mx-auto py-12 px-6 rounded-2xl border border-border bg-card shadow-lg flex flex-col items-center text-center space-y-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-8 ring-primary/5",
						children: /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Lock, { className: "h-8 w-8" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 220,
							columnNumber: 15
						}, this)
					}, void 0, false, {
						fileName: _jsxFileName,
						lineNumber: 219,
						columnNumber: 13
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
						className: "space-y-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("h2", {
							className: "text-lg font-bold text-foreground",
							children: t("adminAuthTitle")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 224,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
							className: "text-xs text-muted-foreground",
							children: t("adminAuthDesc")
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 225,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 223,
						columnNumber: 13
					}, this),
					authError && /* @__PURE__ */ (void 0)("div", {
						className: "w-full flex items-center gap-2 p-3 text-xs rounded-xl bg-destructive/10 text-destructive border border-destructive/20 text-left",
						children: [/* @__PURE__ */ (void 0)(CircleAlert, { className: "h-4 w-4 shrink-0" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 229,
							columnNumber: 17
						}, this), /* @__PURE__ */ (void 0)("span", { children: authError }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 230,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 228,
						columnNumber: 27
					}, this),
					/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("form", {
						onSubmit: handleLogin,
						className: "w-full space-y-4 pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-1.5 text-left",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("label", {
								className: "text-xs font-semibold text-muted-foreground flex items-center gap-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(KeyRound, { className: "h-3.5 w-3.5 text-primary" }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 236,
									columnNumber: 19
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("adminPasskeyLabel") }, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 237,
									columnNumber: 19
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 235,
								columnNumber: 17
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Input, {
								type: "password",
								value: passkeyInput,
								onChange: (e) => {
									setPasskeyInput(e.target.value);
									if (authError) setAuthError(null);
								},
								placeholder: t("adminPasskeyPlaceholder"),
								className: "text-sm bg-background border-border/80",
								autoFocus: true,
								required: true
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 239,
								columnNumber: 17
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 234,
							columnNumber: 15
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
							type: "submit",
							disabled: isVerifying || !passkeyInput.trim(),
							className: "w-full font-semibold shadow-sm text-xs py-4",
							children: isVerifying ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(import_jsx_dev_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin mr-1.5" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 247,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: "Verifying Passkey..." }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 248,
								columnNumber: 21
							}, this)] }, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 246,
								columnNumber: 32
							}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("adminLoginBtn") }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 249,
								columnNumber: 25
							}, this)
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 245,
							columnNumber: 15
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 233,
						columnNumber: 13
					}, this)
				]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 218,
				columnNumber: 7
			}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
				className: "space-y-6",
				children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "flex items-center gap-2 border-b border-border/80 pb-3",
					children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						id: "tab-admin-analytics",
						onClick: () => setActiveTab("analytics"),
						className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "analytics" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ChartColumn, { className: "h-4 w-4" }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 257,
							columnNumber: 17
						}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("adminTabAnalytics") }, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 258,
							columnNumber: 17
						}, this)]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 256,
						columnNumber: 15
					}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("button", {
						type: "button",
						id: "tab-admin-feedback",
						onClick: () => setActiveTab("feedback"),
						className: `flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === "feedback" ? "bg-primary text-primary-foreground shadow-xs" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(MessageSquareQuote, { className: "h-4 w-4" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 262,
								columnNumber: 17
							}, this),
							/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: t("adminTabFeedback") }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 263,
								columnNumber: 17
							}, this),
							stats && stats.total > 0 && /* @__PURE__ */ (void 0)("span", {
								className: `text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === "feedback" ? "bg-primary-foreground/20 text-primary-foreground" : "bg-secondary text-foreground"}`,
								children: stats.total
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 264,
								columnNumber: 46
							}, this)
						]
					}, void 0, true, {
						fileName: _jsxFileName,
						lineNumber: 261,
						columnNumber: 15
					}, this)]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 255,
					columnNumber: 13
				}, this), activeTab === "analytics" ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(AdminAnalyticsView, {
					analytics,
					isLoading: isLoadingAnalytics
				}, void 0, false, {
					fileName: _jsxFileName,
					lineNumber: 271,
					columnNumber: 42
				}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
					className: "space-y-6",
					children: [
						stats && /* @__PURE__ */ (void 0)("div", {
							className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
							children: [
								/* @__PURE__ */ (void 0)("div", {
									className: "p-4 rounded-xl border border-border/80 bg-card shadow-xs",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: t("adminTotalFeedback")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 276,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-2xl sm:text-3xl font-bold text-foreground mt-1 font-mono",
										children: stats.total
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 279,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 275,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "p-4 rounded-xl border border-border/80 bg-card shadow-xs",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: t("adminAverageRating")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 285,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-2xl sm:text-3xl font-bold text-amber-500 mt-1 flex items-center gap-1 font-mono",
										children: [/* @__PURE__ */ (void 0)("span", { children: stats.averageRating }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 289,
											columnNumber: 25
										}, this), /* @__PURE__ */ (void 0)(Star, { className: "h-5 w-5 fill-amber-400 text-amber-400" }, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 290,
											columnNumber: 25
										}, this)]
									}, void 0, true, {
										fileName: _jsxFileName,
										lineNumber: 288,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 284,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "p-4 rounded-xl border border-border/80 bg-card shadow-xs",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: t("adminFilterBugs")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 295,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-2xl sm:text-3xl font-bold text-rose-500 mt-1 font-mono",
										children: stats.bugsCount
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 298,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 294,
									columnNumber: 21
								}, this),
								/* @__PURE__ */ (void 0)("div", {
									className: "p-4 rounded-xl border border-border/80 bg-card shadow-xs",
									children: [/* @__PURE__ */ (void 0)("span", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: t("adminFilterFeatures")
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 304,
										columnNumber: 23
									}, this), /* @__PURE__ */ (void 0)("div", {
										className: "text-2xl sm:text-3xl font-bold text-primary mt-1 font-mono",
										children: stats.featuresCount
									}, void 0, false, {
										fileName: _jsxFileName,
										lineNumber: 307,
										columnNumber: 23
									}, this)]
								}, void 0, true, {
									fileName: _jsxFileName,
									lineNumber: 303,
									columnNumber: 21
								}, this)
							]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 274,
							columnNumber: 27
						}, this),
						/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Funnel, { className: "h-4 w-4 text-muted-foreground shrink-0 mr-1" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 315,
								columnNumber: 19
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
								className: `px-3.5 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all ${selectedFilter === f.id ? "bg-primary text-primary-foreground border-primary shadow-xs" : "bg-card text-muted-foreground border-border/80 hover:bg-secondary hover:text-foreground"}`,
								children: f.label
							}, f.id, false, {
								fileName: _jsxFileName,
								lineNumber: 331,
								columnNumber: 25
							}, this))]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 314,
							columnNumber: 17
						}, this),
						isLoadingList ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "py-16 flex flex-col items-center justify-center text-center space-y-2 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-7 w-7 animate-spin text-primary" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 338,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
								className: "text-xs",
								children: "Loading feedback submissions from database..."
							}, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 339,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 337,
							columnNumber: 34
						}, this) : items.length === 0 ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "py-16 flex flex-col items-center justify-center text-center space-y-3 text-muted-foreground border border-dashed rounded-2xl border-border/80 bg-card/40",
							children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(ShieldAlert, { className: "h-10 w-10 text-muted-foreground/40" }, void 0, false, {
								fileName: _jsxFileName,
								lineNumber: 341,
								columnNumber: 21
							}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
								className: "space-y-1",
								children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-sm font-semibold text-foreground",
									children: selectedFilter === "all" ? t("adminNoFeedback") : t("adminNoFeedbackMatch")
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 343,
									columnNumber: 23
								}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
									className: "text-xs text-muted-foreground",
									children: "Student feedback submissions will show up here automatically."
								}, void 0, false, {
									fileName: _jsxFileName,
									lineNumber: 346,
									columnNumber: 23
								}, this)]
							}, void 0, true, {
								fileName: _jsxFileName,
								lineNumber: 342,
								columnNumber: 21
							}, this)]
						}, void 0, true, {
							fileName: _jsxFileName,
							lineNumber: 340,
							columnNumber: 49
						}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
							className: "space-y-3.5",
							children: items.map((item) => {
								const meta = getTypeMeta(item.type);
								const Icon = meta.icon;
								const formattedDate = new Date(item.timestamp).toLocaleString(void 0, {
									dateStyle: "medium",
									timeStyle: "short"
								});
								return /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
									className: "p-5 rounded-2xl border border-border bg-card hover:border-primary/40 transition-colors space-y-3 shadow-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
											className: "flex flex-wrap items-center justify-between gap-2",
											children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-2.5",
												children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Badge, {
													variant: "outline",
													className: `gap-1 text-xs font-semibold py-0.5 px-2.5 ${meta.badgeClass}`,
													children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Icon, { className: "h-3.5 w-3.5" }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 363,
														columnNumber: 33
													}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: meta.label }, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 364,
														columnNumber: 33
													}, this)]
												}, void 0, true, {
													fileName: _jsxFileName,
													lineNumber: 362,
													columnNumber: 31
												}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
													className: "flex items-center gap-0.5",
													title: `${item.rating} / 5`,
													children: [
														1,
														2,
														3,
														4,
														5
													].map((star) => /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Star, { className: `h-4 w-4 ${star <= item.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30 fill-transparent"}` }, star, false, {
														fileName: _jsxFileName,
														lineNumber: 369,
														columnNumber: 62
													}, this))
												}, void 0, false, {
													fileName: _jsxFileName,
													lineNumber: 368,
													columnNumber: 31
												}, this)]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 361,
												columnNumber: 29
											}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("div", {
												className: "flex items-center gap-2 text-xs text-muted-foreground",
												children: [
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "flex items-center gap-1",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Calendar, { className: "h-3.5 w-3.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 375,
															columnNumber: 33
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: formattedDate }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 376,
															columnNumber: 33
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 374,
														columnNumber: 31
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", {
														className: "flex items-center gap-1 uppercase font-mono text-[10px] bg-secondary px-2 py-0.5 rounded font-semibold",
														children: [/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Languages, { className: "h-3 w-3" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 380,
															columnNumber: 33
														}, this), /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("span", { children: item.language }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 381,
															columnNumber: 33
														}, this)]
													}, void 0, true, {
														fileName: _jsxFileName,
														lineNumber: 379,
														columnNumber: 31
													}, this),
													/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Button, {
														type: "button",
														variant: "ghost",
														size: "sm",
														onClick: () => handleDelete(item.id),
														disabled: deletingId === item.id,
														className: "h-8 w-8 p-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10",
														title: t("adminDeleteConfirm"),
														children: deletingId === item.id ? /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(LoaderCircle, { className: "h-3.5 w-3.5 animate-spin" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 385,
															columnNumber: 59
														}, this) : /* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)(Trash2, { className: "h-3.5 w-3.5" }, void 0, false, {
															fileName: _jsxFileName,
															lineNumber: 385,
															columnNumber: 110
														}, this)
													}, void 0, false, {
														fileName: _jsxFileName,
														lineNumber: 384,
														columnNumber: 31
													}, this)
												]
											}, void 0, true, {
												fileName: _jsxFileName,
												lineNumber: 373,
												columnNumber: 29
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 360,
											columnNumber: 27
										}, this),
										/* @__PURE__ */ (0, import_jsx_dev_runtime.jsxDEV)("p", {
											className: "text-sm text-foreground whitespace-pre-wrap leading-relaxed",
											children: item.message
										}, void 0, false, {
											fileName: _jsxFileName,
											lineNumber: 391,
											columnNumber: 27
										}, this),
										item.email && /* @__PURE__ */ (void 0)("div", {
											className: "pt-1 flex items-center gap-1.5 text-xs text-primary font-medium",
											children: [/* @__PURE__ */ (void 0)(Mail, { className: "h-3.5 w-3.5 text-primary/70" }, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 397,
												columnNumber: 31
											}, this), /* @__PURE__ */ (void 0)("a", {
												href: `mailto:${encodeURIComponent(item.email)}`,
												className: "underline hover:opacity-80 font-mono",
												children: item.email
											}, void 0, false, {
												fileName: _jsxFileName,
												lineNumber: 398,
												columnNumber: 31
											}, this)]
										}, void 0, true, {
											fileName: _jsxFileName,
											lineNumber: 396,
											columnNumber: 42
										}, this)
									]
								}, item.id, true, {
									fileName: _jsxFileName,
									lineNumber: 358,
									columnNumber: 22
								}, this);
							})
						}, void 0, false, {
							fileName: _jsxFileName,
							lineNumber: 350,
							columnNumber: 28
						}, this)
					]
				}, void 0, true, {
					fileName: _jsxFileName,
					lineNumber: 272,
					columnNumber: 9
				}, this)]
			}, void 0, true, {
				fileName: _jsxFileName,
				lineNumber: 253,
				columnNumber: 7
			}, this)
		}, void 0, false, {
			fileName: _jsxFileName,
			lineNumber: 216,
			columnNumber: 7
		}, this)]
	}, void 0, true, {
		fileName: _jsxFileName,
		lineNumber: 177,
		columnNumber: 10
	}, this);
}
//#endregion
export { AdminDashboardPage as component };
