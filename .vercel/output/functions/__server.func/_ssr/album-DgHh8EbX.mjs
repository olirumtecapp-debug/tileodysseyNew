import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as useSave, s as totalStars, t as AppFrame } from "./GameButton-grPVHCKw.mjs";
import { n as Header } from "./Header-CW2qyBua.mjs";
import { n as WORLDS, t as SYMBOLS } from "./data-BQohRghz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/album-DgHh8EbX.js
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"Frutas",
	"Flores",
	"Gemas",
	"Tesouros",
	"Criaturas"
];
function AlbumPage() {
	const save = useSave();
	const stars = totalStars(save);
	const achievements = [
		{
			icon: "🏁",
			name: "Primeiros passos",
			done: save.stats.wins >= 1,
			hint: "Vença 1 fase"
		},
		{
			icon: "🔥",
			name: "Combo Mestre",
			done: save.stats.bestCombo >= 4,
			hint: "Combo x4"
		},
		{
			icon: "⭐",
			name: "Colecionador",
			done: stars >= 15,
			hint: "15 estrelas"
		},
		{
			icon: "🧭",
			name: "Explorador",
			done: Object.keys(save.results).length >= 8,
			hint: "8 fases"
		},
		{
			icon: "💎",
			name: "Garimpeiro",
			done: save.gems >= 20,
			hint: "20 diamantes"
		},
		{
			icon: "🌍",
			name: "Volta ao mundo",
			done: WORLDS.every((w) => save.results[`${w.id}-1`]),
			hint: "Jogue em todas as ilhas"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		sky: ["#c9b8ff", "#f1ecff"],
		ground: "#8d9b6a",
		accent: "#8467e0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			title: "Álbum das Descobertas",
			back: "/"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl px-4 pb-20 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-3xl glass p-4 text-sm font-bold shadow-soft",
					children: [
						save.discovered.length,
						" de ",
						SYMBOLS.length,
						" descobertas coletadas"
					]
				}),
				CATEGORIES.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-black",
						children: cat
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6",
						children: SYMBOLS.filter((s) => s.category === cat).map((s) => {
							const found = save.discovered.includes(s.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl p-1 text-center shadow-soft ${found ? "glass" : "bg-foreground/10"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: `text-3xl ${found ? "" : "opacity-25 grayscale"}`,
									children: found ? s.glyph : "❔"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "line-clamp-2 text-[10px] font-bold leading-tight text-muted-foreground",
									children: found ? s.name : "???"
								})]
							}, s.id);
						})
					})]
				}, cat)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-black",
						children: "Conquistas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 grid gap-2 sm:grid-cols-2",
						children: achievements.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `flex items-center gap-3 rounded-2xl p-3 shadow-soft ${a.done ? "glass" : "bg-foreground/10"}`,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `text-2xl ${a.done ? "" : "opacity-40 grayscale"}`,
								children: a.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate font-display text-sm font-black",
									children: a.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-xs font-semibold text-muted-foreground",
									children: a.done ? "Concluída!" : a.hint
								})]
							})]
						}, a.name))
					})]
				})
			]
		})]
	});
}
//#endregion
export { AlbumPage as component };
