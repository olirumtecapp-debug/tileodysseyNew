import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as useSave, l as xpForLevel, o as levelFromXp, s as totalStars, t as AppFrame } from "./GameButton-grPVHCKw.mjs";
import { n as Header } from "./Header-CW2qyBua.mjs";
import { t as Mascot } from "./Mascot-DYaoyM_y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BN0FEgqd.js
var import_jsx_runtime = require_jsx_runtime();
function ProfilePage() {
	const save = useSave();
	const lvl = levelFromXp(save.xp);
	const cur = save.xp - xpForLevel(lvl);
	const need = xpForLevel(lvl + 1) - xpForLevel(lvl);
	const played = save.stats.levelsPlayed || 1;
	const winRate = Math.round(save.stats.wins / played * 100);
	const avg = Math.round(save.stats.totalSeconds / played);
	const stats = [
		{
			icon: "🏁",
			label: "Fases concluídas",
			value: Object.keys(save.results).length
		},
		{
			icon: "📈",
			label: "Taxa de vitória",
			value: `${winRate}%`
		},
		{
			icon: "🔥",
			label: "Maior combo",
			value: `x${save.stats.bestCombo}`
		},
		{
			icon: "🧩",
			label: "Peças removidas",
			value: save.stats.tilesCleared
		},
		{
			icon: "⏱️",
			label: "Tempo médio",
			value: `${avg}s`
		},
		{
			icon: "🎁",
			label: "Power-ups usados",
			value: save.stats.powerupsUsed
		},
		{
			icon: "⭐",
			label: "Estrelas",
			value: totalStars(save)
		},
		{
			icon: "🕹️",
			label: "Tempo jogado",
			value: `${Math.floor(save.stats.totalSeconds / 60)} min`
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		sky: ["#8ee6ff", "#e6fbff"],
		ground: "#f2dfae",
		accent: "#22b8c9",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			title: "Perfil",
			back: "/"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl px-4 pb-20 pt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "flex flex-col items-center rounded-4xl glass p-6 text-center shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mascot, {
						mood: "happy",
						size: 120
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-2xl font-black",
						children: save.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm font-bold text-muted-foreground",
						children: [
							"Nível ",
							lvl,
							" · ",
							save.xp,
							" XP totais"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-3 w-full max-w-sm overflow-hidden rounded-full bg-foreground/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-gold transition-all duration-700",
							style: { width: `${Math.min(100, cur / need * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs font-bold text-muted-foreground",
						children: [
							cur,
							"/",
							need,
							" XP para o próximo nível"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap justify-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								icon: "🔥",
								text: `${save.streak.count} dias seguidos`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								icon: "🗝️",
								text: `${save.keys} chaves`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								icon: "💎",
								text: `${save.gems} diamantes`
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4",
				children: stats.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-3xl glass p-4 text-center shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl",
							children: s.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl font-black tabular-nums",
							children: s.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-bold text-muted-foreground",
							children: s.label
						})
					]
				}, s.label))
			})]
		})]
	});
}
function Badge({ icon, text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "rounded-full bg-card/80 px-3 py-1 text-xs font-bold shadow-soft",
		children: [
			icon,
			" ",
			text
		]
	});
}
//#endregion
export { ProfilePage as component };
