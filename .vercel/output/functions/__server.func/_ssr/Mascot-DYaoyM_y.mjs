import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as useSave } from "./GameButton-grPVHCKw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Mascot-DYaoyM_y.js
var import_jsx_runtime = require_jsx_runtime();
function Mascot({ mood = "idle", size = 120, className = "" }) {
	const { settings } = useSave();
	const anim = settings.reduceMotion ? "" : mood === "cheer" ? "animate-mascot-jump" : mood === "happy" ? "animate-mascot-bounce" : mood === "sad" ? "animate-mascot-sway" : "animate-mascot-idle";
	const browY = mood === "sad" ? 3 : mood === "think" ? -2 : 0;
	const browTilt = mood === "sad" ? -6 : mood === "think" ? 5 : 2;
	const mouth = mood === "sad" ? "M44 66 q6 -5 12 0" : mood === "think" ? "M45 64 q5 3 10 -1" : "M43 63 q7 7 14 -1";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${anim} ${className}`,
		style: {
			width: size,
			height: size
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			width: size,
			height: size,
			role: "img",
			"aria-label": "Tilo, o explorador",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "tiloFur",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0%",
								stopColor: "#e8722c"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "60%",
								stopColor: "#d15a1b"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "100%",
								stopColor: "#b8471a"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "tiloCoat",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#2c6f5e"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#17453c"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "eyeGlow",
						cx: "50%",
						cy: "50%",
						r: "50%",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: "#fff",
							stopOpacity: "0.8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: "#fff",
							stopOpacity: "0"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: "50",
					cy: "95",
					rx: "24",
					ry: "4",
					fill: "rgba(0,0,0,.22)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M70 78 q24 2 20 -20 q-4 16 -22 12z",
					fill: "url(#tiloFur)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M70 78 q24 2 20 -20 q-4 16 -22 12z",
					fill: "url(#eyeGlow)",
					opacity: "0.1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M86 60 q6 5 3 12 q-6 -3 -7 -9z",
					fill: "#f4d7bb"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M34 92 q-2 -24 16 -28 q18 4 16 28z",
					fill: "url(#tiloCoat)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M38 75 q12 -2 24 0",
					stroke: "rgba(255,255,255,0.05)",
					fill: "none",
					strokeWidth: "1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M50 64 l7 6 l-7 22 l-7 -22z",
					fill: "#0f342d"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "34",
					y: "80",
					width: "32",
					height: "5",
					rx: "2.5",
					fill: "#3c2a20"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "47",
					y: "79",
					width: "6",
					height: "7",
					rx: "1.5",
					fill: "#c9a44c"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M42 62 q8 5 16 0 l2 5 q-10 6 -20 0z",
					fill: "#14403a"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M27 36 L30 10 L47 26z",
					fill: "url(#tiloFur)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M73 36 L70 10 L53 26z",
					fill: "url(#tiloFur)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M31 33 L33 18 L43 27z",
					fill: "#3a241c",
					opacity: ".45"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M69 33 L67 18 L57 27z",
					fill: "#3a241c",
					opacity: ".45"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M50 20 q22 3 24 22 q2 18 -12 26 q-12 8 -24 0 q-14 -8 -12 -26 q2 -19 24 -22z",
					fill: "url(#tiloFur)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M35 25 q15 -8 30 0",
					fill: "none",
					stroke: "white",
					strokeWidth: "0.5",
					opacity: "0.1"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M50 44 q14 4 12 14 q-12 12 -24 0 q-2 -10 12 -14z",
					fill: "#f7e2cd"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M26 44 l-8 5 l9 3z",
					fill: "#c85a22"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M74 44 l8 5 l-9 3z",
					fill: "#c85a22"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M14 30 q36 -12 72 0 q-36 8 -72 0z",
					fill: "#4a3626"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M30 29 q4 -16 20 -16 q16 0 20 16 q-20 -7 -40 0z",
					fill: "#6b4d34"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M35 18 q15 -5 30 0",
					fill: "none",
					stroke: "rgba(0,0,0,0.2)",
					strokeWidth: "0.8",
					strokeDasharray: "2 2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M29 28 q21 -6 42 0 l0 3 q-21 -5 -42 0z",
					fill: "#c9a44c"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M36 ${34 + browY} l10 ${browTilt}`,
					stroke: "#4a2a18",
					strokeWidth: "2.6",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M64 ${34 + browY} l-10 ${browTilt}`,
					stroke: "#4a2a18",
					strokeWidth: "2.6",
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: mood === "sad" ? "" : "animate-blink",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: `M35 ${43 + browY} q6 -5 12 0 q-6 5 -12 0z`,
							fill: "#fff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: `M53 ${43 + browY} q6 -5 12 0 q-6 5 -12 0z`,
							fill: "#fff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "41.5",
							cy: 43 + browY,
							r: "2.8",
							fill: "#2a1b14"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "59.5",
							cy: 43 + browY,
							r: "2.8",
							fill: "#2a1b14"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "42.5",
							cy: 41.5 + browY,
							r: "1.1",
							fill: "#fff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "60.5",
							cy: 41.5 + browY,
							r: "1.1",
							fill: "#fff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "40",
							cy: 44 + browY,
							r: "0.5",
							fill: "#fff",
							opacity: "0.6"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: "58",
							cy: 44 + browY,
							r: "0.5",
							fill: "#fff",
							opacity: "0.6"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M46 53 q4 -3 8 0 q-4 4 -8 0z",
					fill: "#2a1b14"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: mouth,
					stroke: "#2a1b14",
					strokeWidth: "2",
					fill: "none",
					strokeLinecap: "round"
				}),
				mood === "cheer" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "18",
					cy: "18",
					r: "2.6",
					fill: "#e8c46a",
					className: "animate-sparkle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "84",
					cy: "22",
					r: "2",
					fill: "#e8c46a",
					className: "animate-sparkle"
				})] }),
				mood === "sad" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "62",
					cy: "52",
					r: "2.2",
					fill: "#7fd4ff",
					className: "animate-tear"
				})
			]
		})
	});
}
function MascotSpeech({ text, mood = "idle" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-end gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mascot, {
			mood,
			size: 78
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mb-4 max-w-[16rem] rounded-2xl rounded-bl-sm bg-card/90 px-4 py-2 text-sm font-semibold text-card-foreground shadow-soft backdrop-blur",
			children: text
		})]
	});
}
//#endregion
export { MascotSpeech as n, Mascot as t };
