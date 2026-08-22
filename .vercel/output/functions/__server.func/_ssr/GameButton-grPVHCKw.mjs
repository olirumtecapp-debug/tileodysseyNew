import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { t as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/GameButton-grPVHCKw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KEY = "tile-odyssey-save-v1";
var initial = {
	name: "Explorador",
	avatar: "🦊",
	xp: 0,
	coins: 250,
	gems: 12,
	keys: 3,
	results: {},
	discovered: [],
	owned: ["theme-bosque"],
	equipped: "theme-bosque",
	stats: {
		levelsPlayed: 0,
		wins: 0,
		losses: 0,
		bestCombo: 0,
		tilesCleared: 0,
		totalSeconds: 0,
		powerupsUsed: 0
	},
	missions: {
		day: "",
		progress: {},
		claimed: []
	},
	streak: {
		day: "",
		count: 0
	},
	settings: {
		sound: true,
		music: true,
		reduceMotion: false,
		colorblind: false,
		highContrast: false,
		leftHanded: false,
		uiScale: 1
	}
};
var state = initial;
var loaded = false;
var listeners = /* @__PURE__ */ new Set();
function load() {
	if (loaded || typeof window === "undefined") return;
	loaded = true;
	try {
		const raw = window.localStorage.getItem(KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			state = {
				...initial,
				...parsed,
				stats: {
					...initial.stats,
					...parsed.stats ?? {}
				},
				settings: {
					...initial.settings,
					...parsed.settings ?? {}
				},
				missions: {
					...initial.missions,
					...parsed.missions ?? {}
				},
				streak: {
					...initial.streak,
					...parsed.streak ?? {}
				}
			};
		}
	} catch {}
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	if (state.streak.day !== today) {
		const yesterday = (/* @__PURE__ */ new Date(Date.now() - 864e5)).toISOString().slice(0, 10);
		state = {
			...state,
			streak: {
				day: today,
				count: state.streak.day === yesterday ? state.streak.count + 1 : 1
			},
			missions: state.missions.day === today ? state.missions : {
				day: today,
				progress: {},
				claimed: []
			}
		};
		persist();
	}
}
function persist() {
	try {
		window.localStorage.setItem(KEY, JSON.stringify(state));
	} catch {}
}
var SaveManager = {
	get: () => state,
	update(fn) {
		load();
		state = fn(state);
		persist();
		listeners.forEach((l) => l());
	},
	reset() {
		state = initial;
		persist();
		listeners.forEach((l) => l());
	},
	subscribe(l) {
		load();
		listeners.add(l);
		return () => listeners.delete(l);
	}
};
function useSave() {
	return (0, import_react.useSyncExternalStore)(SaveManager.subscribe, () => {
		load();
		return state;
	}, () => initial);
}
var levelFromXp = (xp) => Math.floor(Math.sqrt(xp / 60)) + 1;
var xpForLevel = (lvl) => Math.pow(lvl - 1, 2) * 60;
function totalStars(s) {
	return Object.values(s.results).reduce((a, r) => a + r.stars, 0);
}
var ctx = null;
var muted = false;
var volume = .5;
function ac() {
	if (typeof window === "undefined") return null;
	if (!ctx) {
		const C = window.AudioContext ?? window.webkitAudioContext;
		if (!C) return null;
		ctx = new C();
	}
	if (ctx.state === "suspended") ctx.resume();
	return ctx;
}
var AudioManager = {
	setMuted(v) {
		muted = v;
	},
	setVolume(v) {
		volume = v;
	},
	tone(freq, duration = .12, type = "sine", gain = .2, delay = 0) {
		if (muted) return;
		const c = ac();
		if (!c) return;
		const t0 = c.currentTime + delay;
		const osc = c.createOscillator();
		const g = c.createGain();
		osc.type = type;
		osc.frequency.setValueAtTime(freq, t0);
		g.gain.setValueAtTime(1e-4, t0);
		g.gain.exponentialRampToValueAtTime(Math.max(1e-4, gain * volume), t0 + .02);
		g.gain.exponentialRampToValueAtTime(1e-4, t0 + duration);
		osc.connect(g).connect(c.destination);
		osc.start(t0);
		osc.stop(t0 + duration + .02);
	},
	click() {
		this.tone(520, .08, "triangle", .15);
	},
	pick(depth = 0) {
		this.tone(440 + depth * 60, .1, "sine", .16);
	},
	match(combo = 1) {
		const base = 520 + Math.min(combo, 6) * 45;
		[
			0,
			.06,
			.12
		].forEach((d, i) => this.tone(base * (1 + i * .25), .16, "triangle", .18, d));
	},
	power() {
		this.tone(300, .25, "sawtooth", .12);
		this.tone(900, .2, "sine", .12, .05);
	},
	victory() {
		[
			523,
			659,
			784,
			1046
		].forEach((f, i) => this.tone(f, .35, "triangle", .2, i * .11));
	},
	defeat() {
		[
			392,
			330,
			262
		].forEach((f, i) => this.tone(f, .4, "sine", .16, i * .14));
	},
	star(i) {
		this.tone(660 + i * 180, .3, "triangle", .2);
	}
};
function Scenery({ sky, ground, accent }) {
	const { settings } = useSave();
	const still = settings.reduceMotion;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pointer-events-none fixed inset-0 -z-10 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 transition-colors duration-700",
				style: { background: `linear-gradient(180deg, ${sky[0]} 0%, ${sky[1]} 60%, #eaf7ff 100%)` }
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[12%] top-[8%] h-32 w-32 rounded-full bg-[#fff2a8] blur-[4px] opacity-90 animate-pulse" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-[8%] top-[4%] h-48 w-48 rounded-full bg-[#fffbe0]/40 blur-3xl" }),
			!still && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 opacity-20 overflow-hidden",
				children: [...Array(6)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute top-[-20%] left-[60%] h-[140%] w-16 bg-white blur-3xl transform -rotate-12",
					style: {
						left: `${60 + i * 8}%`,
						opacity: .1 + i % 3 * .1,
						animation: `float-soft ${8 + i * 2}s ease-in-out infinite alternate`
					}
				}, i))
			}),
			(still ? [] : [
				0,
				1,
				2,
				3,
				4
			]).map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute",
				style: {
					top: `${8 + i * 10}%`,
					animation: `drift ${80 + i * 25}s linear infinite`,
					animationDelay: `${i * -20}s`,
					opacity: .9 - i * .1,
					transform: `scale(${1.1 - i * .15})`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative h-16 w-52 drop-shadow-md",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-0 h-12 w-52 rounded-full bg-white" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-4 left-8 h-16 w-24 rounded-full bg-white" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-3 left-32 h-14 w-20 rounded-full bg-white" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute bottom-0 left-4 h-2 w-44 rounded-full bg-slate-200/30" })
					]
				})
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "absolute inset-x-0 bottom-0 h-[62vh] w-full",
				viewBox: "0 0 1440 620",
				preserveAspectRatio: "none",
				"aria-hidden": "true",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "hillGrad",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "white",
							stopOpacity: "0.2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "transparent"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("filter", {
						id: "shadow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("feDropShadow", {
							dx: "0",
							dy: "4",
							stdDeviation: "4",
							floodOpacity: "0.2"
						})
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						opacity: ".4",
						transform: "translate(100 240) scale(0.6)",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "0",
								y: "0",
								width: "80",
								height: "120",
								fill: accent
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M-20 0 L100 0 L40 -40 Z",
								fill: accent
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "20",
								y: "40",
								width: "15",
								height: "40",
								fill: "rgba(0,0,0,0.2)"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						opacity: ".35",
						transform: "translate(1200 220) scale(0.5)",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: "0",
							y: "0",
							width: "100",
							height: "150",
							fill: accent
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-10 0 L110 0 L50 -50 Z",
							fill: accent
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						opacity: ".6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M-60 350 L220 70 L500 350 Z",
								fill: accent
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M300 360 L650 40 L1000 360 Z",
								fill: accent
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M850 350 L1200 90 L1550 350 Z",
								fill: accent
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "#ffffff",
						opacity: ".95",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M160 135 L220 70 L280 135 L250 125 L220 145 L190 125 Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M580 100 L650 40 L720 100 L685 88 L650 110 L615 88 Z" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M1130 140 L1200 90 L1270 140 L1235 128 L1200 150 L1165 128 Z" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "642",
						y: "110",
						width: "16",
						height: "220",
						fill: "#a5f3fc",
						opacity: ".6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "646",
						y: "110",
						width: "8",
						height: "220",
						fill: "white",
						opacity: ".4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0 320 Q360 292 720 320 T1440 312 L1440 450 L0 450 Z",
						fill: "#2563eb",
						opacity: ".85"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "#ffffff",
						opacity: ".4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "200",
								y: "360",
								width: "180",
								height: "4",
								rx: "2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "700",
								y: "380",
								width: "240",
								height: "4",
								rx: "2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "1100",
								y: "370",
								width: "140",
								height: "4",
								rx: "2"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0 420 Q380 360 760 420 T1440 408 L1440 620 L0 620 Z",
						fill: ground
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0 420 Q380 360 760 420 T1440 408 L1440 480 L0 492 Z",
						fill: "url(#hillGrad)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0 480 Q380 430 760 480 T1440 470 L1440 620 L0 620 Z",
						fill: ground,
						opacity: ".7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						filter: "url(#shadow)",
						children: [
							70,
							280,
							520,
							780,
							1050,
							1280
						].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							transform: `translate(${x} ${470 + i % 3 * 30})`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: "-8",
									y: "0",
									width: "16",
									height: "60",
									rx: "4",
									fill: "#5c3d24"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "0",
									cy: "-15",
									r: "40",
									fill: "#166534"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "-28",
									cy: "5",
									r: "28",
									fill: "#15803d"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "28",
									cy: "2",
									r: "30",
									fill: "#14532d"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "-15",
									cy: "-25",
									r: "8",
									fill: "white",
									opacity: "0.1"
								})
							]
						}, x))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						opacity: ".95",
						children: [
							40,
							180,
							360,
							600,
							850,
							1100,
							1380
						].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
							x,
							y: 585 - i % 4 * 12,
							fontSize: "28",
							className: "animate-bounce",
							style: {
								animationDelay: `${i * .2}s`,
								animationDuration: "3s"
							},
							children: [
								"🌿",
								"🌸",
								"🌺",
								"🌼"
							][i % 4]
						}, x))
					})
				]
			})
		]
	});
}
function AppFrame({ children, sky = ["#8fd8ff", "#d9f6ff"], ground = "#63c471", accent = "#2fb8a8" }) {
	const { settings } = useSave();
	(0, import_react.useEffect)(() => {
		AudioManager.setMuted(!settings.sound);
	}, [settings.sound]);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		root.classList.toggle("reduce-motion", settings.reduceMotion);
		root.classList.toggle("contrast-boost", settings.highContrast);
		root.style.fontSize = `${16 * settings.uiScale}px`;
		return () => {
			root.style.fontSize = "";
		};
	}, [
		settings.reduceMotion,
		settings.highContrast,
		settings.uiScale
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `relative min-h-dvh overflow-x-hidden ${settings.leftHanded ? "[--hand:row-reverse]" : "[--hand:row]"}`,
		"data-colorblind": settings.colorblind ? "true" : void 0,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "fixed inset-0 pointer-events-none bg-radial-[circle_at_50%_0%] from-white/10 to-transparent z-10" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scenery, {
				sky,
				ground,
				accent
			}),
			children
		]
	});
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var gameButton = cva("relative inline-flex select-none items-center justify-center gap-2 rounded-2xl font-display font-black tracking-wide transition-all duration-200 active:translate-y-1.5 active:shadow-none disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring/50", {
	variants: {
		variant: {
			primary: "bg-emerald text-white shadow-pop hover:brightness-105",
			gold: "bg-gold text-gold-foreground shadow-pop hover:brightness-105",
			turquoise: "bg-turquoise text-white shadow-pop hover:brightness-105",
			coral: "bg-coral text-white shadow-pop hover:brightness-105",
			soft: "glass text-foreground shadow-soft hover:brightness-[1.03]",
			ghost: "text-foreground hover:bg-foreground/5"
		},
		size: {
			sm: "h-10 px-4 text-sm",
			md: "h-12 px-6 text-base",
			lg: "h-14 px-8 text-lg",
			xl: "h-20 px-12 text-2xl",
			icon: "h-11 w-11 min-h-11 min-w-11"
		}
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
function GameButton({ className, variant, size, asChild, onClick, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(gameButton({
			variant,
			size
		}), className),
		onClick: (e) => {
			AudioManager.click();
			onClick?.(e);
		},
		...props
	});
}
//#endregion
export { cn as a, useSave as c, SaveManager as i, xpForLevel as l, AudioManager as n, levelFromXp as o, GameButton as r, totalStars as s, AppFrame as t };
