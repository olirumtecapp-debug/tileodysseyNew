import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as useSave, i as SaveManager, r as GameButton, t as AppFrame } from "./GameButton-grPVHCKw.mjs";
import { n as Header } from "./Header-CW2qyBua.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-CAEz5dbM.js
var import_jsx_runtime = require_jsx_runtime();
var TOGGLES = [
	{
		key: "sound",
		label: "Efeitos sonoros",
		hint: "Sons de clique, combos e vitória"
	},
	{
		key: "music",
		label: "Música ambiente",
		hint: "Passarinhos, vento e natureza"
	},
	{
		key: "reduceMotion",
		label: "Reduzir animações",
		hint: "Menos movimento na tela"
	},
	{
		key: "colorblind",
		label: "Modo daltônico",
		hint: "Adiciona rótulos às peças"
	},
	{
		key: "highContrast",
		label: "Alto contraste",
		hint: "Texto mais escuro e bordas fortes"
	},
	{
		key: "leftHanded",
		label: "Modo canhoto",
		hint: "Inverte controles laterais"
	}
];
function SettingsPage() {
	const save = useSave();
	const toggle = (key) => SaveManager.update((s) => ({
		...s,
		settings: {
			...s.settings,
			[key]: !s.settings[key]
		}
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		sky: ["#bfeeff", "#f4fdff"],
		ground: "#cfe9f2",
		accent: "#3fa9d6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			title: "Configurações",
			back: "/"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl px-4 pb-20 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "rounded-3xl glass p-2 shadow-soft",
					children: TOGGLES.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate font-display text-sm font-black",
								children: t.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs font-semibold text-muted-foreground",
								children: t.hint
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "switch",
							"aria-checked": Boolean(save.settings[t.key]),
							"aria-label": t.label,
							onClick: () => toggle(t.key),
							className: `h-8 w-14 shrink-0 rounded-full p-1 transition-colors ${save.settings[t.key] ? "bg-emerald" : "bg-foreground/20"}`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `block h-6 w-6 rounded-full bg-white shadow-soft transition-transform ${save.settings[t.key] ? "translate-x-6" : ""}` })
						})]
					}, t.key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4 rounded-3xl glass p-4 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-black",
							children: "Escala da interface"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: .85,
							max: 1.25,
							step: .05,
							value: save.settings.uiScale,
							"aria-label": "Escala da interface",
							onChange: (e) => SaveManager.update((s) => ({
								...s,
								settings: {
									...s.settings,
									uiScale: Number(e.target.value)
								}
							})),
							className: "mt-3 w-full accent-[var(--turquoise)]"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs font-bold text-muted-foreground",
							children: [Math.round(save.settings.uiScale * 100), "%"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4 rounded-3xl glass p-4 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm font-black",
							children: "Dados do jogo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs font-semibold text-muted-foreground",
							children: "Seu progresso é salvo automaticamente neste dispositivo."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
							variant: "coral",
							size: "sm",
							className: "mt-3",
							onClick: () => {
								if (confirm("Apagar todo o progresso?")) SaveManager.reset();
							},
							children: "Reiniciar progresso"
						})
					]
				})
			]
		})]
	});
}
//#endregion
export { SettingsPage as component };
