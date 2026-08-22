import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as useSave, t as AppFrame } from "./GameButton-grPVHCKw.mjs";
import { _ as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as Header } from "./Header-CW2qyBua.mjs";
import { n as WORLDS } from "./data-BQohRghz.mjs";
import { n as MascotSpeech } from "./Mascot-DYaoyM_y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/map-PNsG6_uX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MapPage() {
	const save = useSave();
	const [openWorld, setOpenWorld] = (0, import_react.useState)(WORLDS[0].id);
	const worldUnlocked = (i) => {
		if (i === 0) return true;
		const prev = WORLDS[i - 1];
		return Array.from({ length: prev.levels }, (_, k) => save.results[`${prev.id}-${k + 1}`]).filter(Boolean).length >= Math.ceil(prev.levels * .6);
	};
	const active = WORLDS.find((w) => w.id === openWorld);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		sky: active.sky,
		ground: active.ground,
		accent: active.accent,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			title: "Mapa das Ilhas",
			back: "/"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl px-4 pb-20 pt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MascotSpeech, {
					text: "Escolha uma ilha e vamos explorar!",
					mood: "happy"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: WORLDS.map((w, i) => {
					const unlocked = worldUnlocked(i);
					const done = Array.from({ length: w.levels }, (_, k) => save.results[`${w.id}-${k + 1}`]).filter(Boolean).length;
					const open = openWorld === w.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: `overflow-hidden rounded-3xl glass shadow-soft transition-all ${unlocked ? "" : "opacity-60"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => unlocked && setOpenWorld(open ? "" : w.id),
							disabled: !unlocked,
							className: "grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4 text-left",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl shadow-soft",
									style: { background: `${w.accent}33` },
									children: unlocked ? w.emoji : "🔒"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate font-display text-lg font-black",
											children: w.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-xs font-semibold text-muted-foreground",
											children: unlocked ? w.subtitle : "Complete a ilha anterior para desbloquear"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "mt-1 block h-1.5 w-full max-w-[10rem] overflow-hidden rounded-full bg-foreground/10",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "block h-full rounded-full",
												style: {
													width: `${done / w.levels * 100}%`,
													background: w.accent
												}
											})
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "shrink-0 font-display text-sm font-black tabular-nums",
									children: [
										done,
										"/",
										w.levels
									]
								})
							]
						}), open && unlocked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-4 gap-3 px-4 pb-5 sm:grid-cols-6",
							children: Array.from({ length: w.levels }, (_, k) => k + 1).map((idx) => {
								const res = save.results[`${w.id}-${idx}`];
								const prevDone = idx === 1 || save.results[`${w.id}-${idx - 1}`];
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/play/$worldId/$levelIndex",
									params: {
										worldId: w.id,
										levelIndex: String(idx)
									},
									disabled: !prevDone,
									className: `flex aspect-square flex-col items-center justify-center rounded-2xl border-b-4 border-black/10 shadow-soft transition-transform ${prevDone ? "bg-ivory hover:-translate-y-1" : "pointer-events-none bg-foreground/10 opacity-60"}`,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-display text-xl font-black",
										children: prevDone ? idx : "🔒"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[10px] leading-none",
										children: res ? "⭐".repeat(res.stars) : ""
									})]
								}, idx);
							})
						})]
					}, w.id);
				})
			})]
		})]
	});
}
//#endregion
export { MapPage as component };
