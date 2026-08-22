import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { r as GameButton, t as AppFrame } from "./GameButton-grPVHCKw.mjs";
import { a as Copy, c as Apple, n as Monitor, o as Check, t as Smartphone } from "../_libs/lucide-react.mjs";
import { i as useDeviceKind, n as Header, r as InstallButton, t as FullscreenButton } from "./Header-CW2qyBua.mjs";
import { r as GAME_URL } from "./router-D87MqcwO.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/instalar-_h8bR78X.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SupportDialog({ trigger }) {
	return null;
}
function InstallPage() {
	const kind = useDeviceKind();
	const [copied, setCopied] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const t = setTimeout(() => setCopied(false), 2500);
		return () => clearTimeout(t);
	}, [copied]);
	const copyUrl = async () => {
		try {
			await navigator.clipboard.writeText(GAME_URL);
			setCopied(true);
		} catch {}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		sky: ["#8fd8ff", "#d9f6ff"],
		ground: "#63c471",
		accent: "#2fb8a8",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			title: "Jogar em qualquer aparelho",
			back: "/"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl px-4 pb-20 pt-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-3xl glass p-5 shadow-soft",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-2xl font-black",
							children: "📱 Celular · 💻 PC ou notebook — o mesmo jogo"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm font-semibold text-muted-foreground",
							children: "O Tile Odyssey roda direto no navegador, sem loja de apps e sem download pesado. Ele se ajusta sozinho à tela do celular, tablet, notebook ou monitor grande — no computador você joga com o mouse, no celular com o toque."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-2xl bg-card/70 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-black uppercase tracking-wider text-muted-foreground",
								children: "Endereço do jogo"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-1 flex flex-wrap items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: GAME_URL,
									className: "break-all font-display text-base font-black text-turquoise underline",
									children: GAME_URL
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(GameButton, {
									variant: "soft",
									size: "sm",
									onClick: copyUrl,
									children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "h-4 w-4" }), copied ? "Endereço copiado!" : "Copiar endereço"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InstallButton, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FullscreenButton, { label: true }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SupportDialog, { trigger: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
									variant: "coral",
									size: "md",
									children: "❤️ Apoiar"
								}) })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs font-bold text-muted-foreground",
							children: "A tela cheia esconde a barra do navegador — toque de novo no botão para desativar."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							active: kind === "desktop",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Monitor, { className: "h-5 w-5" }),
							title: "PC / Notebook",
							steps: [
								`Abra ${GAME_URL} no Chrome, Edge ou Brave.`,
								"Clique no ícone de instalar (monitor com seta) na barra de endereço, ou no menu ⋮ › “Instalar Tile Odyssey”.",
								"O jogo abre em janela própria, com atalho na área de trabalho.",
								"Use o botão de tela cheia ou a tecla F11 para jogar sem distrações."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							active: kind === "android",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smartphone, { className: "h-5 w-5" }),
							title: "Android",
							steps: [
								`Abra ${GAME_URL} no Chrome.`,
								"Toque em “Instalar app” aqui em cima, ou no menu ⋮ › “Adicionar à tela inicial”.",
								"Confirme e o ícone da raposa aparece junto dos seus apps.",
								"Ao abrir pelo ícone, o jogo já roda em tela cheia."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							active: kind === "ios",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Apple, { className: "h-5 w-5" }),
							title: "iPhone / iPad",
							steps: [
								`Abra ${GAME_URL} no Safari.`,
								"Toque no botão Compartilhar (quadrado com seta para cima).",
								"Escolha “Adicionar à Tela de Início” e confirme.",
								"Abra pelo ícone para jogar em tela cheia."
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-4 rounded-3xl glass p-5 shadow-soft",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-black",
						children: "Dicas para jogar no computador"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-2 space-y-1 text-sm font-semibold text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Clique com o mouse para enviar a peça à bandeja." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Ative a tela cheia para o tabuleiro ficar maior." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• O progresso fica salvo neste navegador — use sempre o mesmo para continuar." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "• Em Ajustes você pode aumentar o tamanho da interface e reduzir animações." })
						]
					})]
				})
			]
		})]
	});
}
function Card({ icon, title, steps, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `rounded-3xl p-4 shadow-soft ${active ? "glass ring-2 ring-turquoise" : "glass"}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-9 w-9 place-items-center rounded-2xl bg-gold/25",
					children: icon
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-base font-black",
					children: title
				}),
				active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ml-auto rounded-full bg-turquoise px-2 py-0.5 text-[10px] font-black text-white",
					children: "SEU APARELHO"
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-2 space-y-1 text-xs font-semibold text-muted-foreground",
			children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
				i + 1,
				". ",
				s
			] }, i))
		})]
	});
}
//#endregion
export { InstallPage as component };
