import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn, c as useSave, l as xpForLevel, o as levelFromXp, r as GameButton, s as totalStars } from "./GameButton-grPVHCKw.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as Maximize, r as Minimize, s as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Header-CW2qyBua.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Fullscreen toggle with iOS-safe fallbacks. */
function useFullscreen() {
	const [isFullscreen, setIsFullscreen] = (0, import_react.useState)(false);
	const [supported, setSupported] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const sync = () => setIsFullscreen(!!document.fullscreenElement);
		document.addEventListener("fullscreenchange", sync);
		setSupported(!!document.documentElement.requestFullscreen);
		sync();
		return () => document.removeEventListener("fullscreenchange", sync);
	}, []);
	return {
		isFullscreen,
		supported,
		toggle: (0, import_react.useCallback)(async () => {
			try {
				if (document.fullscreenElement) await document.exitFullscreen();
				else await document.documentElement.requestFullscreen();
			} catch {}
		}, [])
	};
}
/** Rough device family, used only to show the right install instructions. */
function useDeviceKind() {
	const [kind, setKind] = (0, import_react.useState)("desktop");
	(0, import_react.useEffect)(() => {
		const ua = navigator.userAgent;
		if (/iPad|iPhone|iPod/.test(ua) || navigator.maxTouchPoints > 1 && /Macintosh/.test(ua)) setKind("ios");
		else if (/Android/i.test(ua)) setKind("android");
		else setKind("desktop");
	}, []);
	return kind;
}
function FullscreenButton({ label = false, className }) {
	const { isFullscreen, supported, toggle } = useFullscreen();
	if (!supported) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameButton, {
		variant: "soft",
		size: label ? "md" : "icon",
		className,
		onClick: toggle,
		"aria-label": isFullscreen ? "Sair da tela cheia" : "Tela cheia",
		title: isFullscreen ? "Sair da tela cheia" : "Tela cheia",
		children: [isFullscreen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minimize, { className: "h-5 w-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize, { className: "h-5 w-5" }), label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: isFullscreen ? "Sair da tela cheia" : "Tela cheia" })]
	});
}
function InstallButton({ className }) {
	return null;
}
function CurrencyPill({ icon, value, variant = "gold" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex items-center gap-1 rounded-2xl border bg-gradient-to-br px-2 py-1 shadow-soft backdrop-blur-md sm:gap-1.5 sm:px-3 sm:py-1.5", {
			gold: "from-gold/20 to-gold/5 border-gold/30",
			turquoise: "from-turquoise/20 to-turquoise/5 border-turquoise/30",
			coral: "from-coral/20 to-coral/5 border-coral/30",
			emerald: "from-emerald/20 to-emerald/5 border-emerald/30"
		}[variant]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			"aria-hidden": true,
			className: "text-sm leading-none sm:text-lg filter drop-shadow-sm",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "font-display text-xs font-black tabular-nums sm:text-base",
			children: value
		})]
	});
}
function Header({ title, back }) {
	const save = useSave();
	const lvl = levelFromXp(save.xp);
	const cur = save.xp - xpForLevel(lvl);
	const need = xpForLevel(lvl + 1) - xpForLevel(lvl);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-30 px-3 pt-3",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-4xl items-center gap-2 rounded-[2rem] border-2 border-white/40 bg-white/60 px-3 py-2.5 shadow-pop backdrop-blur-xl sm:justify-between sm:gap-4 sm:px-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-1.5 sm:gap-3",
				children: [back && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
					asChild: true,
					variant: "soft",
					size: "icon",
					className: "h-10 w-10 shrink-0 border-white/60 bg-white/40 shadow-soft sm:h-12 sm:w-12",
					"aria-label": "Voltar",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: back,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "h-6 w-6" })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-display text-[15px] font-black leading-tight tracking-tight text-foreground/90 sm:text-xl",
						children: title ?? save.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5 sm:gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "shrink-0 rounded-lg bg-turquoise px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-sm sm:text-[11px]",
							children: ["LVL ", lvl]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-2 w-14 overflow-hidden rounded-full bg-foreground/10 shadow-inner sm:w-24",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-700 ease-out",
								style: { width: `${Math.min(100, cur / need * 100)}%` }
							})
						})]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 items-center justify-end gap-1.5 sm:gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyPill, {
						icon: "⭐",
						value: totalStars(save),
						variant: "gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyPill, {
						icon: "🪙",
						value: save.coins,
						variant: "gold"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden md:flex items-center gap-1.5 sm:gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CurrencyPill, {
							icon: "💎",
							value: save.gems,
							variant: "turquoise"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ml-auto flex items-center gap-1.5 sm:ml-4 sm:gap-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullscreenButton, { className: "shadow-soft hover:shadow-pop transition-all" })
					})
				]
			})]
		})
	});
}
//#endregion
export { useDeviceKind as i, Header as n, InstallButton as r, FullscreenButton as t };
