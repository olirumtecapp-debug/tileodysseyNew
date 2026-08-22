import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as useSave, o as levelFromXp, r as GameButton, s as totalStars, t as AppFrame } from "./GameButton-grPVHCKw.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Header, t as FullscreenButton } from "./Header-CW2qyBua.mjs";
import { n as WORLDS } from "./data-BQohRghz.mjs";
import { t as Mascot } from "./Mascot-DYaoyM_y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BQ7UJX9b.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const save = useSave();
	const stars = totalStars(save);
	const completed = Object.keys(save.results).length;
	const nextWorld = WORLDS.find((w) => Array.from({ length: w.levels }, (_, i) => `${w.id}-${i + 1}`).some((id) => !save.results[id])) ?? WORLDS[0];
	const nextIndex = Array.from({ length: nextWorld.levels }, (_, i) => i + 1).find((i) => !save.results[`${nextWorld.id}-${i}`]) ?? 1;
	const missions = [
		{
			id: "wins",
			label: "Vença 3 fases",
			goal: 3,
			value: Math.min(3, save.stats.wins % 4)
		},
		{
			id: "combo",
			label: "Faça um combo x3",
			goal: 3,
			value: Math.min(3, save.stats.bestCombo)
		},
		{
			id: "tiles",
			label: "Remova 60 peças",
			goal: 60,
			value: Math.min(60, save.stats.tilesCleared % 61)
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto w-full max-w-3xl px-4 pb-16 pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "relative overflow-hidden rounded-4xl glass p-6 text-center shadow-soft",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-black uppercase tracking-[0.3em] text-turquoise filter drop-shadow-sm",
						children: "Aventura de peças"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-6xl font-black text-emerald filter drop-shadow-[0_4px_0_rgba(0,0,0,0.15)] sm:text-7xl",
						children: "Tile Odyssey"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mx-auto mt-3 max-w-sm text-base font-semibold text-muted-foreground",
						children: "Ajude o Tilo a explorar 12 ilhas mágicas combinando trios de peças."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 flex justify-center animate-float-soft",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mascot, {
							mood: "happy",
							size: 150
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
						asChild: true,
						variant: "gold",
						size: "xl",
						className: "mt-4 w-full max-w-xs scale-110 border-b-8 border-gold-foreground/20 shadow-pop animate-glow-pulse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/play/$worldId/$levelIndex",
							params: {
								worldId: nextWorld.id,
								levelIndex: String(nextIndex)
							},
							children: "▶ JOGAR"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-xs font-bold text-muted-foreground",
						children: [
							"Continuar: ",
							nextWorld.emoji,
							" ",
							nextWorld.name,
							" · Fase ",
							nextIndex
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: "⭐",
						value: stars,
						label: "Estrelas"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: "🏁",
						value: completed,
						label: "Fases"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Kpi, {
						icon: "🔥",
						value: save.streak.count,
						label: "Dias seguidos"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-4xl border-2 border-white/50 bg-white/40 p-5 shadow-soft backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-black",
					children: "Missões diárias"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-2",
					children: missions.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl bg-card/70 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-bold",
								children: m.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-sm font-black tabular-nums",
								children: [
									m.value,
									"/",
									m.goal
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 h-2 overflow-hidden rounded-full bg-foreground/10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-full rounded-full bg-turquoise transition-all duration-500",
								style: { width: `${m.value / m.goal * 100}%` }
							})
						})]
					}, m.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile2, {
						to: "/map",
						icon: "🗺️",
						label: "Mapa",
						hint: "12 mundos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile2, {
						to: "/album",
						icon: "📖",
						label: "Álbum",
						hint: `${save.discovered.length} descobertas`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile2, {
						to: "/store",
						icon: "🛍️",
						label: "Loja",
						hint: "Cosméticos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile2, {
						to: "/profile",
						icon: "🦊",
						label: "Perfil",
						hint: `Nível ${levelFromXp(save.xp)}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile2, {
						to: "/settings",
						icon: "⚙️",
						label: "Ajustes",
						hint: "Acessibilidade"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile2, {
						to: "/album",
						icon: "🏆",
						label: "Conquistas",
						hint: "Coleções"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile2, {
						to: "/instalar",
						icon: "📲",
						label: "Instalar app",
						hint: "Celular e PC"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 rounded-4xl border-2 border-white/50 bg-white/40 p-6 text-center shadow-soft backdrop-blur-md",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-bold text-muted-foreground",
					children: "Tile Odyssey · Aventura de Combinação de Peças"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullscreenButton, { label: true })
				})]
			})
		]
	})] });
}
function Kpi({ icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[2rem] border-2 border-white/50 bg-white/40 p-4 text-center shadow-soft backdrop-blur-sm transition-transform hover:scale-105",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-2xl",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-black tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-bold text-muted-foreground",
				children: label
			})
		]
	});
}
function Tile2({ to, icon, label, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group flex items-center gap-3 rounded-[2rem] border-2 border-white/60 bg-white/40 p-4 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-pop hover:bg-white/60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/25 text-2xl",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate font-display text-base font-black",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block truncate text-xs font-semibold text-muted-foreground",
				children: hint
			})]
		})]
	});
}
//#endregion
export { Home as component };
