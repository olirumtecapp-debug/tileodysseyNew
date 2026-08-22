import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { a as cn, c as useSave, i as SaveManager, n as AudioManager, r as GameButton, t as AppFrame } from "./GameButton-grPVHCKw.mjs";
import { _ as Link, v as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as worldById, i as symbolById, n as WORLDS, r as buildLevel } from "./data-BQohRghz.mjs";
import { n as Route } from "./router-D87MqcwO.mjs";
import { n as MascotSpeech, t as Mascot } from "./Mascot-DYaoyM_y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/play._worldId._levelIndex-C7sqWl-b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function mulberry32(seed) {
	return function() {
		seed |= 0;
		seed = seed + 1831565813 | 0;
		let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
		t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
		return ((t ^ t >>> 14) >>> 0) / 4294967296;
	};
}
function hashSeed(s) {
	let h = 2166136261;
	for (let i = 0; i < s.length; i++) {
		h ^= s.charCodeAt(i);
		h = Math.imul(h, 16777619);
	}
	return h >>> 0;
}
var SHAPES = {
	full: () => true,
	pyramid: (u, v) => Math.abs(u) <= (v + 1) / 2 + .12,
	heart: (u, v) => {
		const x = u * 1.15;
		const y = -v * 1.1;
		const a = x * x + y * y - .62;
		return a * a * a - x * x * y * y * y <= .02;
	},
	diamond: (u, v) => Math.abs(u) + Math.abs(v) <= 1.05,
	ring: (u, v) => Math.max(Math.abs(u), Math.abs(v)) >= .42,
	cross: (u, v) => Math.abs(u) <= .38 || Math.abs(v) <= .38,
	hourglass: (u, v) => Math.abs(u) <= Math.abs(v) * .9 + .28,
	tower: (u, v) => Math.abs(u) <= .55 || v >= .45,
	butterfly: (u, v) => Math.abs(u) >= .18 * (1 - Math.abs(v)) && Math.abs(u) + Math.abs(v) * .6 <= 1.1
};
var SHAPE_ORDER = [
	"pyramid",
	"heart",
	"full",
	"diamond",
	"cross",
	"ring",
	"hourglass",
	"butterfly",
	"tower"
];
function shapeForLevel(level) {
	return SHAPE_ORDER[(Math.abs(hashSeed(level.worldId)) % SHAPE_ORDER.length + level.index) % SHAPE_ORDER.length];
}
function generateBoard(level, salt = 0) {
	const world = worldById(level.worldId);
	const rand = mulberry32(hashSeed(level.id) + salt * 7919);
	const pool = world.pool.slice(0, level.kinds);
	const total = level.triples * 3;
	const bag = [];
	const target = level.objective.symbolId;
	if (target) {
		const need = Math.ceil((level.objective.amount ?? 0) / 3);
		for (let i = 0; i < need; i++) bag.push(target, target, target);
	}
	while (bag.length < total) {
		const s = pool[Math.floor(rand() * pool.length)];
		bag.push(s, s, s);
	}
	bag.length = total;
	for (let i = bag.length - 1; i > 0; i--) {
		const j = Math.floor(rand() * (i + 1));
		[bag[i], bag[j]] = [bag[j], bag[i]];
	}
	const cols = 9;
	const rows = 7;
	const mask = SHAPES[shapeForLevel(level)];
	const layers = [];
	for (let z = 0; z < level.layers; z++) {
		const inset = z * .5;
		const lc = cols - z;
		const lr = rows - z;
		const layer = [];
		for (let r = 0; r < lr; r++) for (let c = 0; c < lc; c++) {
			if (!mask(lc > 1 ? c / (lc - 1) * 2 - 1 : 0, lr > 1 ? r / (lr - 1) * 2 - 1 : 0, z, level.layers)) continue;
			layer.push({
				x: c + inset,
				y: r + inset,
				z
			});
		}
		const cx = (lc - 1) / 2 + inset;
		const cy = (lr - 1) / 2 + inset;
		layer.sort((a, b) => Math.hypot(a.x - cx, a.y - cy) - Math.hypot(b.x - cx, b.y - cy) || a.y - b.y);
		layers.push(layer);
	}
	const slotTotal = layers.reduce((a, l) => a + l.length, 0);
	const fit = Math.min(total, Math.floor(slotTotal / 3) * 3);
	bag.length = fit;
	const chosen = [];
	layers.forEach((layer, i) => {
		const quota = i === layers.length - 1 ? fit - chosen.length : Math.min(layer.length, Math.round(fit * layer.length / slotTotal));
		chosen.push(...layer.slice(0, Math.max(0, quota)));
	});
	for (const layer of layers) for (const slot of layer) {
		if (chosen.length >= fit) break;
		if (!chosen.includes(slot)) chosen.push(slot);
	}
	const frozenIdx = /* @__PURE__ */ new Set();
	const chainedIdx = /* @__PURE__ */ new Set();
	while (frozenIdx.size < Math.min(level.obstacles.frozen, fit)) frozenIdx.add(Math.floor(rand() * fit));
	while (chainedIdx.size < Math.min(level.obstacles.chained, fit)) {
		const k = Math.floor(rand() * fit);
		if (!frozenIdx.has(k)) chainedIdx.add(k);
	}
	return chosen.slice(0, fit).map((s, idx) => ({
		uid: idx + 1,
		symbolId: bag[idx],
		x: s.x,
		y: s.y,
		z: s.z,
		frozen: frozenIdx.has(idx),
		chained: chainedIdx.has(idx)
	}));
}
function isCovered(tile, tiles) {
	return tiles.some((t) => t.uid !== tile.uid && t.z > tile.z && Math.abs(t.x - tile.x) < 1 && Math.abs(t.y - tile.y) < 1);
}
function starsFor(level, moves, seconds, maxCombo) {
	let stars = 1;
	if (moves <= level.moveGoal && seconds <= level.timeGoal) stars = 2;
	if (stars === 2 && (maxCombo >= 3 || seconds <= level.timeGoal * .6)) stars = 3;
	return stars;
}
var PLATE = {
	Frutas: [
		"#fffdf3",
		"#ffe3b0",
		"#f4903a"
	],
	Flores: [
		"#fff8fc",
		"#ffc9e4",
		"#e8559b"
	],
	Gemas: [
		"#f4fbff",
		"#b9dcff",
		"#3d8fe0"
	],
	Tesouros: [
		"#fffaea",
		"#ffd982",
		"#e0a51f"
	],
	Criaturas: [
		"#f4fff8",
		"#b9ecd0",
		"#2fae72"
	]
};
var Tile = (0, import_react.memo)(function Tile({ tile, covered, colorblind, onSelect }) {
	const sym = symbolById(tile.symbolId);
	const locked = covered || tile.frozen || tile.chained;
	const [c1, c2, frame] = PLATE[sym.category] ?? [
		"#fffdf3",
		"#ffe3b0",
		"#f4903a"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		"aria-label": `${sym.name}${covered ? " (bloqueada)" : ""}`,
		disabled: locked,
		onClick: () => onSelect(tile),
		className: cn("absolute rounded-[24%] p-[3px] transition-all duration-150", "animate-pop-in", locked ? "cursor-not-allowed brightness-[.75] saturate-[.6]" : "hover:-translate-y-1.5 active:translate-y-0.5 hover:brightness-105"),
		style: {
			width: 48,
			height: 48,
			left: tile.x * 46.08 + tile.z * 5,
			top: tile.y * 46.08 - tile.z * 5,
			zIndex: 10 + tile.z * 10,
			background: `linear-gradient(180deg, #ffffff 0%, #f0f0f0 45%, #d9d9d9 100%)`,
			boxShadow: `
          0 ${3 + tile.z}px 0 #b3b3b3, 
          0 ${6 + tile.z}px ${12 + tile.z * 4}px rgba(0,0,0,0.25),
          inset 0 1px 1px rgba(255,255,255,1),
          inset 0 -1px 2px rgba(0,0,0,0.1)
        `
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "relative flex h-full w-full items-center justify-center overflow-hidden rounded-[20%]",
				style: {
					background: `linear-gradient(165deg, ${c1} 0%, ${c2} 100%)`,
					boxShadow: `
            inset 0 -2px 4px rgba(0,0,0,0.15), 
            inset 0 2px 4px rgba(255,255,255,0.8),
            0 0 0 2px ${frame}22
          `
				},
				"aria-hidden": true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute inset-x-[15%] top-[8%] h-[25%] rounded-full bg-white/80 blur-[1px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "pointer-events-none absolute right-[10%] top-[10%] h-[15%] w-[15%] rounded-full bg-white/40 blur-[2px]" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "relative drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] transition-transform",
						style: {
							fontSize: 48 * .6,
							lineHeight: 1
						},
						children: sym.glyph
					})
				]
			}),
			colorblind && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute bottom-1 right-1.5 text-[8px] font-black text-foreground/60",
				children: sym.id.slice(0, 2).toUpperCase()
			}),
			tile.frozen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-0 grid place-items-center rounded-[24%] bg-sky-200/60 backdrop-blur-[1px] border-2 border-white/50",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl drop-shadow-md",
					children: "❄️"
				})
			}),
			tile.chained && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute inset-0 grid place-items-center rounded-[24%] bg-slate-900/30",
				"aria-hidden": true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xl drop-shadow-md",
					children: "⛓️"
				})
			})
		]
	});
});
function Board({ tiles, colorblind, onSelect, shaking }) {
	const width = 432 * .96 + 34;
	const height = 356.56;
	const wrapRef = (0, import_react.useRef)(null);
	const [scale, setScale] = (0, import_react.useState)(1);
	(0, import_react.useLayoutEffect)(() => {
		const el = wrapRef.current;
		if (!el) return;
		const fit = () => {
			const w = el.clientWidth;
			const h = el.clientHeight || window.innerHeight * .5;
			const next = Math.min(1.5, Math.max(.42, Math.min(w / width, h / height)));
			setScale(Number.isFinite(next) ? next : 1);
		};
		fit();
		const ro = new ResizeObserver(fit);
		ro.observe(el);
		return () => ro.disconnect();
	}, [width, height]);
	(0, import_react.useEffect)(() => {
		const onResize = () => wrapRef.current?.dispatchEvent(new Event("resize"));
		window.addEventListener("orientationchange", onResize);
		return () => window.removeEventListener("orientationchange", onResize);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: wrapRef,
		className: `flex min-h-0 w-full flex-1 self-stretch items-center justify-center ${shaking ? "animate-shake" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				width: width * scale,
				height: height * scale
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative origin-top-left",
				style: {
					width,
					height,
					transform: `scale(${scale})`
				},
				children: [tiles.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					tile: t,
					covered: isCovered(t, tiles),
					colorblind,
					onSelect
				}, t.uid)), tiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-full place-items-center font-display text-xl text-foreground/70",
					children: "Tabuleiro limpo!"
				})]
			})
		})
	});
}
function Tray({ items, clearing }) {
	const slots = Array.from({ length: 7 });
	const danger = items.length >= 6;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `mx-auto flex w-fit max-w-full items-center gap-1 rounded-[2rem] border-2 px-2 py-2 shadow-soft transition-colors duration-300 backdrop-blur-md ${danger ? "border-coral bg-coral/30 ring-4 ring-coral/20" : "border-white/50 bg-white/40"}`,
		children: slots.map((_, i) => {
			const tile = items[i];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid h-11 w-11 place-items-center rounded-2xl bg-white/30 border border-white/40 shadow-inner sm:h-12 sm:w-12",
				children: tile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `text-2xl ${clearing.includes(tile.uid) ? "animate-burst" : "animate-pop-in"}`,
					"aria-label": symbolById(tile.symbolId).name,
					children: symbolById(tile.symbolId).glyph
				})
			}, i);
		})
	});
}
var POWERUPS = [
	{
		id: "undo",
		icon: "↩️",
		name: "Voltar",
		hint: "Devolve a última peça"
	},
	{
		id: "shuffle",
		icon: "🔀",
		name: "Super Shuffle",
		hint: "Embaralha o tabuleiro"
	},
	{
		id: "magnet",
		icon: "🧲",
		name: "Ímã",
		hint: "Puxa um trio para a bandeja"
	},
	{
		id: "hammer",
		icon: "🔨",
		name: "Martelo",
		hint: "Quebra gelo e correntes"
	},
	{
		id: "freeze",
		icon: "⏱️",
		name: "Congelar",
		hint: "+20s no cronômetro"
	}
];
function PowerUpBar({ charges, onUse, disabled }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto flex w-fit max-w-full flex-wrap justify-center gap-2",
		children: POWERUPS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			disabled: disabled || charges[p.id] <= 0,
			onClick: () => onUse(p.id),
			title: `${p.name} — ${p.hint}`,
			"aria-label": `${p.name}: ${p.hint}`,
			className: cn("relative grid h-14 w-14 place-items-center rounded-2xl border-2 border-white/60 bg-white/40 shadow-soft backdrop-blur-sm transition-all active:translate-y-1.5 active:shadow-none", charges[p.id] > 0 ? "hover:-translate-y-0.5 hover:brightness-105" : "opacity-40"),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-2xl",
				"aria-hidden": true,
				children: p.icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold font-display text-xs font-black text-gold-foreground shadow-soft",
				children: charges[p.id]
			})]
		}, p.id))
	});
}
var COLORS = [
	"#ffd166",
	"#2fb8a8",
	"#f28c3c",
	"#7b6ce8",
	"#63c471",
	"#ff6b8b"
];
function Confetti({ count = 60 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none fixed inset-0 z-40 overflow-hidden",
		"aria-hidden": true,
		children: Array.from({ length: count }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute block rounded-[2px]",
			style: {
				left: `${i * 37 % 100}%`,
				width: 8 + i % 3 * 3,
				height: 12 + i % 4 * 3,
				background: COLORS[i % COLORS.length],
				animation: `confetti-fall ${2.4 + i % 5 * .5}s linear ${i % 10 * .18}s infinite`
			}
		}, i))
	});
}
function Fireworks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "pointer-events-none absolute inset-0 z-30",
		"aria-hidden": true,
		children: [
			[18, 24],
			[78, 18],
			[50, 10],
			[30, 62],
			[86, 58]
		].map(([x, y], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "absolute h-3 w-3 rounded-full",
			style: {
				left: `${x}%`,
				top: `${y}%`,
				background: COLORS[i % COLORS.length],
				boxShadow: `0 0 24px 10px ${COLORS[i % COLORS.length]}`,
				animation: `burst 1.6s ease-out ${i * .35}s infinite`
			}
		}, i))
	});
}
function VictoryScene({ stars, score, xp, coins, discovered, nextTo, onReplay }) {
	const [shown, setShown] = (0, import_react.useState)(0);
	const [xpShown, setXpShown] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		AudioManager.victory();
		const timers = Array.from({ length: stars }).map((_, i) => setTimeout(() => {
			setShown(i + 1);
			AudioManager.star(i);
		}, 500 + i * 380));
		return () => timers.forEach(clearTimeout);
	}, [stars]);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const start = performance.now();
		const tick = (t) => {
			const p = Math.min(1, (t - start) / 1200);
			setXpShown(Math.round(xp * p));
			if (p < 1) raf = requestAnimationFrame(tick);
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	}, [xp]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Confetti, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md overflow-hidden rounded-[2.5rem] border-4 border-white/50 bg-white/90 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-pop-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fireworks, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-black text-emerald text-stroke",
					children: "Fase Concluída!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex justify-center gap-2",
					children: [
						0,
						1,
						2
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `text-5xl ${i < shown ? "animate-star-land" : "opacity-25 grayscale"}`,
						children: "⭐"
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative mt-2 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mascot, {
						mood: "cheer",
						size: 130
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 grid grid-cols-3 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: "🏆",
							label: "Pontos",
							value: score
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: "✨",
							label: "XP",
							value: xpShown
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							icon: "🪙",
							label: "Moedas",
							value: coins
						})
					]
				}),
				discovered.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-2xl bg-gold/20 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-extrabold",
						children: "Novas descobertas!"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-2xl",
						children: discovered.map((d) => symbolById(d).glyph).join(" ")
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-2",
					children: [nextTo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
						asChild: true,
						variant: "gold",
						size: "lg",
						className: "border-b-8 border-gold-foreground/20 shadow-pop animate-glow-pulse",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/play/$worldId/$levelIndex",
							params: nextTo,
							children: "Próxima fase →"
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
						asChild: true,
						variant: "gold",
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/map",
							children: "Ver o mapa"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
							variant: "soft",
							size: "md",
							className: "flex-1",
							onClick: onReplay,
							children: "Repetir"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
							asChild: true,
							variant: "soft",
							size: "md",
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/map",
								children: "Mapa"
							})
						})]
					})]
				})
			]
		})]
	});
}
function Stat({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-3xl border border-white/60 bg-white/50 p-3 shadow-sm",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-lg",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg font-black tabular-nums",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] font-semibold text-muted-foreground",
				children: label
			})
		]
	});
}
var TIPS = [
	"Deixe espaço livre na bandeja: guarde no máximo dois pares abertos.",
	"Comece pelas peças de cima — elas liberam o caminho mais rápido.",
	"O Ímã resolve um trio inteiro quando a bandeja aperta.",
	"Peças congeladas derretem com o Martelo. Use sem medo!",
	"Combos rápidos valem mais estrelas do que jogar devagar."
];
function DefeatScene({ reason, onRetry }) {
	(0, import_react.useEffect)(() => {
		AudioManager.defeat();
	}, []);
	const tip = TIPS[Math.floor(Math.random() * TIPS.length)];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "fixed inset-0 z-50 grid place-items-center bg-black/60 px-4 backdrop-blur-md",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md rounded-[2.5rem] border-4 border-white/50 bg-white/90 p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-pop-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-3xl font-black text-coral",
					children: "Quase lá!"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm font-semibold text-muted-foreground",
					children: reason
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex justify-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mascot, {
						mood: "sad",
						size: 130
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 rounded-2xl bg-turquoise/15 p-4 text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-sm font-extrabold text-turquoise",
						children: "Dica do Tilo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-semibold",
						children: tip
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
						variant: "turquoise",
						size: "lg",
						onClick: onRetry,
						className: "border-b-8 border-turquoise-foreground/20 shadow-pop",
						children: "Tentar de novo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
						asChild: true,
						variant: "soft",
						size: "md",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/map",
							children: "Voltar ao mapa"
						})
					})]
				})
			]
		})
	});
}
var START_CHARGES = {
	undo: 3,
	shuffle: 2,
	magnet: 2,
	hammer: 2,
	freeze: 1
};
function PlayPage() {
	const { worldId, levelIndex } = Route.useParams();
	const navigate = useNavigate();
	const save = useSave();
	const world = worldById(worldId);
	const level = (0, import_react.useMemo)(() => buildLevel(worldId, Number(levelIndex)), [worldId, levelIndex]);
	const [salt, setSalt] = (0, import_react.useState)(0);
	const [tiles, setTiles] = (0, import_react.useState)([]);
	const [tray, setTray] = (0, import_react.useState)([]);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [clearing, setClearing] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("playing");
	const [moves, setMoves] = (0, import_react.useState)(0);
	const [seconds, setSeconds] = (0, import_react.useState)(0);
	const [combo, setCombo] = (0, import_react.useState)(0);
	const [maxCombo, setMaxCombo] = (0, import_react.useState)(0);
	const [collected, setCollected] = (0, import_react.useState)(0);
	const [score, setScore] = (0, import_react.useState)(0);
	const [charges, setCharges] = (0, import_react.useState)(START_CHARGES);
	const [shaking, setShaking] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)(null);
	const [reward, setReward] = (0, import_react.useState)({
		stars: 1,
		xp: 0,
		coins: 0,
		found: []
	});
	const lastMatch = (0, import_react.useRef)(0);
	const timeBonus = (0, import_react.useRef)(0);
	const reset = (0, import_react.useCallback)(() => {
		if (!level) return;
		setTiles(generateBoard(level, salt));
		setTray([]);
		setHistory([]);
		setStatus("playing");
		setMoves(0);
		setSeconds(0);
		setCombo(0);
		setMaxCombo(0);
		setCollected(0);
		setScore(0);
		setCharges(START_CHARGES);
		timeBonus.current = 0;
	}, [level, salt]);
	(0, import_react.useEffect)(() => {
		reset();
	}, [reset]);
	(0, import_react.useEffect)(() => {
		if (status !== "playing") return;
		const id = setInterval(() => setSeconds((s) => s + 1), 1e3);
		return () => clearInterval(id);
	}, [status]);
	const timeLeft = level ? level.timeGoal + 40 + timeBonus.current - seconds : 0;
	(0, import_react.useEffect)(() => {
		if (status === "playing" && level && timeLeft <= 0) setStatus("lost");
	}, [
		timeLeft,
		status,
		level
	]);
	const showToast = (t) => {
		setToast(t);
		setTimeout(() => setToast(null), 1400);
	};
	const finish = (0, import_react.useCallback)((won, finalScore, finalCombo, finalSeconds) => {
		if (!level) return;
		if (won) {
			const stars = starsFor(level, moves, finalSeconds, finalCombo);
			const xp = 40 + stars * 25 + Math.floor(finalScore / 20);
			const coins = 30 + stars * 20;
			const found = worldById(level.worldId).pool.filter((s) => !save.discovered.includes(s)).slice(0, stars);
			setReward({
				stars,
				xp,
				coins,
				found
			});
			SaveManager.update((s) => {
				const prev = s.results[level.id];
				return {
					...s,
					xp: s.xp + xp,
					coins: s.coins + coins,
					gems: s.gems + (stars === 3 ? 1 : 0),
					discovered: [.../* @__PURE__ */ new Set([...s.discovered, ...found])],
					results: {
						...s.results,
						[level.id]: {
							stars: Math.max(prev?.stars ?? 0, stars),
							best: Math.max(prev?.best ?? 0, finalScore),
							time: prev?.time ? Math.min(prev.time, finalSeconds) : finalSeconds
						}
					},
					stats: {
						...s.stats,
						levelsPlayed: s.stats.levelsPlayed + 1,
						wins: s.stats.wins + 1,
						bestCombo: Math.max(s.stats.bestCombo, finalCombo),
						totalSeconds: s.stats.totalSeconds + finalSeconds
					}
				};
			});
			setStatus("won");
		} else {
			SaveManager.update((s) => ({
				...s,
				stats: {
					...s.stats,
					levelsPlayed: s.stats.levelsPlayed + 1,
					losses: s.stats.losses + 1,
					totalSeconds: s.stats.totalSeconds + finalSeconds
				}
			}));
			setStatus("lost");
		}
	}, [
		level,
		moves,
		save.discovered
	]);
	const resolveTray = (0, import_react.useCallback)((next, boardLeft) => {
		if (!level) return;
		const counts = /* @__PURE__ */ new Map();
		next.forEach((t) => counts.set(t.symbolId, [...counts.get(t.symbolId) ?? [], t]));
		const triple = [...counts.values()].find((g) => g.length >= 3);
		if (triple) {
			const uids = triple.slice(0, 3).map((t) => t.uid);
			setClearing(uids);
			const now = Date.now();
			const newCombo = now - lastMatch.current < 4e3 ? combo + 1 : 1;
			lastMatch.current = now;
			setCombo(newCombo);
			setMaxCombo((m) => Math.max(m, newCombo));
			AudioManager.match(newCombo);
			if (newCombo >= 3) showToast(`Combo x${newCombo}! 🔥`);
			const gained = 100 * newCombo;
			const nextScore = score + gained;
			setScore(nextScore);
			SaveManager.update((s) => ({
				...s,
				stats: {
					...s.stats,
					tilesCleared: s.stats.tilesCleared + 3
				}
			}));
			const isTarget = level.objective.symbolId === triple[0].symbolId;
			const nextCollected = collected + (isTarget ? 3 : 0);
			if (isTarget) setCollected(nextCollected);
			setTimeout(() => {
				const remaining = next.filter((t) => !uids.includes(t.uid));
				setTray(remaining);
				setClearing([]);
				if (level.objective.kind === "collect" ? nextCollected >= (level.objective.amount ?? 0) : boardLeft === 0 && remaining.length === 0) finish(true, nextScore, Math.max(maxCombo, newCombo), seconds);
				else if (boardLeft === 0 && remaining.length === 0) finish(true, nextScore, Math.max(maxCombo, newCombo), seconds);
			}, 260);
		} else {
			setTray(next);
			if (next.length > 7) {
				setShaking(true);
				setTimeout(() => setShaking(false), 420);
				finish(false, score, maxCombo, seconds);
			}
		}
	}, [
		level,
		combo,
		score,
		collected,
		maxCombo,
		seconds,
		finish
	]);
	const selectTile = (0, import_react.useCallback)((tile) => {
		if (status !== "playing" || clearing.length) return;
		AudioManager.pick(tile.z);
		const boardLeft = tiles.length - 1;
		setTiles((t) => t.filter((x) => x.uid !== tile.uid));
		setHistory((h) => [...h, tile]);
		setMoves((m) => m + 1);
		const next = [...tray, tile].sort((a, b) => a.symbolId.localeCompare(b.symbolId));
		resolveTray(next, boardLeft);
	}, [
		status,
		clearing.length,
		tiles,
		tray,
		resolveTray
	]);
	const usePower = (0, import_react.useCallback)((id) => {
		if (status !== "playing" || charges[id] <= 0) return;
		AudioManager.power();
		setCharges((c) => ({
			...c,
			[id]: c[id] - 1
		}));
		SaveManager.update((s) => ({
			...s,
			stats: {
				...s.stats,
				powerupsUsed: s.stats.powerupsUsed + 1
			}
		}));
		if (id === "undo") {
			const last = history[history.length - 1];
			if (!last) return;
			setHistory((h) => h.slice(0, -1));
			setTray((t) => {
				const i = t.findIndex((x) => x.uid === last.uid);
				return i === -1 ? t : [...t.slice(0, i), ...t.slice(i + 1)];
			});
			setTiles((t) => [...t, last]);
			showToast("Jogada desfeita");
		}
		if (id === "shuffle") {
			setTiles((t) => {
				const syms = t.map((x) => x.symbolId).sort(() => Math.random() - .5);
				return t.map((x, i) => ({
					...x,
					symbolId: syms[i]
				}));
			});
			showToast("Tabuleiro embaralhado!");
		}
		if (id === "hammer") {
			setTiles((t) => t.map((x) => ({
				...x,
				frozen: false,
				chained: false
			})));
			showToast("Gelo e correntes quebrados!");
		}
		if (id === "freeze") {
			timeBonus.current += 20;
			showToast("+20 segundos");
		}
		if (id === "magnet") {
			const free = tiles.filter((t) => !isCovered(t, tiles) && !t.frozen && !t.chained);
			const bySym = /* @__PURE__ */ new Map();
			tiles.forEach((t) => bySym.set(t.symbolId, [...bySym.get(t.symbolId) ?? [], t]));
			const pick = [...bySym.values()].find((g) => g.length >= 3 && g.some((t) => free.includes(t))) ?? [...bySym.values()].find((g) => g.length >= 3);
			if (!pick) return;
			const trio = pick.slice(0, 3);
			const uids = trio.map((t) => t.uid);
			const boardLeft = tiles.length - 3;
			setTiles((t) => t.filter((x) => !uids.includes(x.uid)));
			resolveTray([...tray, ...trio].sort((a, b) => a.symbolId.localeCompare(b.symbolId)), boardLeft);
			showToast("Ímã atraiu um trio!");
		}
	}, [
		status,
		charges,
		history,
		tiles,
		tray,
		resolveTray
	]);
	if (!level || !world) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-dvh place-items-center px-4 text-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "rounded-3xl glass p-8 shadow-soft",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-black",
				children: "Fase não encontrada"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
				asChild: true,
				variant: "primary",
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/map",
					children: "Voltar ao mapa"
				})
			})]
		})
	}) });
	const worldOrder = WORLDS.findIndex((w) => w.id === world.id);
	const nextLevel = level.index < world.levels ? {
		worldId: world.id,
		levelIndex: String(level.index + 1)
	} : WORLDS[worldOrder + 1] ? {
		worldId: WORLDS[worldOrder + 1].id,
		levelIndex: "1"
	} : null;
	const objTotal = level.objective.amount ?? level.triples * 3;
	const objDone = level.objective.kind === "collect" ? collected : level.triples * 3 - tiles.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		sky: world.sky,
		ground: world.ground,
		accent: world.accent,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex min-h-dvh max-w-3xl flex-col gap-3 px-3 py-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-[2rem] border-2 border-white/50 bg-white/40 px-4 py-3 shadow-soft backdrop-blur-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
								asChild: true,
								variant: "soft",
								size: "icon",
								"aria-label": "Voltar ao mapa",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/map",
									children: "←"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 text-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate font-display text-sm font-black",
									children: [
										world.emoji,
										" ",
										world.name,
										" · Fase ",
										level.index
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs font-bold text-muted-foreground",
									children: [
										level.objective.label,
										" · ",
										Math.max(0, Math.min(objDone, objTotal)),
										"/",
										objTotal
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `font-display text-lg font-black tabular-nums ${timeLeft < 15 ? "text-destructive" : ""}`,
									children: [
										Math.max(0, Math.floor(timeLeft / 60)),
										":",
										String(Math.max(0, timeLeft % 60)).padStart(2, "0")
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-[11px] font-bold text-muted-foreground",
									children: [score, " pts"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "h-3 overflow-hidden rounded-full border border-white/30 bg-white/20 shadow-inner backdrop-blur-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-emerald transition-all duration-500",
							style: { width: `${Math.min(100, objDone / objTotal * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 items-center justify-center py-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Board, {
							tiles,
							colorblind: save.settings.colorblind,
							onSelect: selectTile,
							shaking
						})
					}),
					toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pointer-events-none fixed left-1/2 top-1/3 z-40 -translate-x-1/2 rounded-2xl bg-gold px-5 py-3 font-display text-xl font-black text-gold-foreground shadow-pop animate-pop-in",
						children: toast
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky bottom-0 flex flex-col gap-3 pb-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tray, {
								items: tray,
								clearing
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PowerUpBar, {
								charges,
								onUse: usePower,
								disabled: status !== "playing"
							}),
							level.objective.symbolId && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mx-auto flex items-center gap-2 rounded-full border border-white/40 bg-white/30 px-4 py-2 text-sm font-bold shadow-soft backdrop-blur-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Objetivo:" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-lg",
										children: symbolById(level.objective.symbolId).glyph
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums",
										children: [
											Math.min(collected, objTotal),
											"/",
											objTotal
										]
									})
								]
							})
						]
					})
				]
			}),
			status === "won" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VictoryScene, {
				stars: reward.stars,
				score,
				xp: reward.xp,
				coins: reward.coins,
				discovered: reward.found,
				nextTo: nextLevel,
				onReplay: () => {
					setSalt((s) => s + 1);
					setStatus("playing");
				}
			}),
			status === "lost" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DefeatScene, {
				reason: timeLeft <= 0 ? "O tempo acabou!" : "A bandeja ficou cheia!",
				onRetry: () => {
					setSalt((s) => s + 1);
					setStatus("playing");
				}
			}),
			status === "playing" && tiles.length === 0 && tray.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed bottom-40 left-3 z-30 hidden sm:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MascotSpeech, {
					text: "Só faltam as peças da bandeja!",
					mood: "think"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "sr-only",
				onClick: () => navigate({ to: "/map" }),
				"aria-hidden": true
			})
		]
	});
}
//#endregion
export { PlayPage as component };
