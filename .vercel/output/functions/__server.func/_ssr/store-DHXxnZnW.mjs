import { n as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { c as useSave, i as SaveManager, n as AudioManager, r as GameButton, t as AppFrame } from "./GameButton-grPVHCKw.mjs";
import { n as Header } from "./Header-CW2qyBua.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-DHXxnZnW.js
var import_jsx_runtime = require_jsx_runtime();
var ITEMS = [
	{
		id: "theme-bosque",
		name: "Tema Bosque",
		icon: "🌳",
		price: 0,
		group: "Temas"
	},
	{
		id: "theme-praia",
		name: "Tema Praia",
		icon: "🏖️",
		price: 300,
		group: "Temas"
	},
	{
		id: "theme-gelo",
		name: "Tema Gelo",
		icon: "❄️",
		price: 450,
		group: "Temas"
	},
	{
		id: "theme-espaco",
		name: "Tema Estelar",
		icon: "🌌",
		price: 700,
		group: "Temas"
	},
	{
		id: "frame-gold",
		name: "Moldura Dourada",
		icon: "🖼️",
		price: 250,
		group: "Molduras"
	},
	{
		id: "frame-leaf",
		name: "Moldura Folhas",
		icon: "🍃",
		price: 180,
		group: "Molduras"
	},
	{
		id: "avatar-fox",
		name: "Avatar Tilo",
		icon: "🦊",
		price: 0,
		group: "Avatares"
	},
	{
		id: "avatar-owl",
		name: "Avatar Coruja",
		icon: "🦉",
		price: 220,
		group: "Avatares"
	},
	{
		id: "avatar-panda",
		name: "Avatar Panda",
		icon: "🐼",
		price: 260,
		group: "Avatares"
	},
	{
		id: "fx-sparkle",
		name: "Partículas Brilho",
		icon: "✨",
		price: 320,
		group: "Efeitos"
	},
	{
		id: "fx-petals",
		name: "Pétalas ao Vento",
		icon: "🌸",
		price: 340,
		group: "Efeitos"
	},
	{
		id: "steps-paw",
		name: "Pegadas do Tilo",
		icon: "🐾",
		price: 200,
		group: "Efeitos"
	}
];
var GROUPS = [
	"Temas",
	"Molduras",
	"Avatares",
	"Efeitos"
];
function StorePage() {
	const save = useSave();
	const buy = (item) => {
		if (save.owned.includes(item.id)) {
			SaveManager.update((s) => ({
				...s,
				equipped: item.id
			}));
			AudioManager.click();
			return;
		}
		if (save.coins < item.price) return;
		AudioManager.power();
		SaveManager.update((s) => ({
			...s,
			coins: s.coins - item.price,
			owned: [...s.owned, item.id],
			equipped: item.id,
			avatar: item.group === "Avatares" ? item.icon : s.avatar
		}));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppFrame, {
		sky: ["#ffe6a7", "#fffaf0"],
		ground: "#cbb98e",
		accent: "#d8a72c",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
			title: "Loja Cosmética",
			back: "/"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mx-auto w-full max-w-3xl px-4 pb-20 pt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "rounded-3xl glass p-4 text-sm font-bold shadow-soft",
				children: ["Apenas itens visuais — nada aqui afeta a dificuldade do jogo. 🪙 ", save.coins]
			}), GROUPS.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg font-black",
					children: g
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 grid gap-3 sm:grid-cols-2",
					children: ITEMS.filter((i) => i.group === g).map((item) => {
						const owned = save.owned.includes(item.id);
						const equipped = save.equipped === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-3xl glass p-3 shadow-soft",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gold/25 text-3xl",
									children: item.icon
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-display text-sm font-black",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-semibold text-muted-foreground",
										children: owned ? equipped ? "Equipado" : "Adquirido" : `🪙 ${item.price}`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GameButton, {
									size: "sm",
									variant: equipped ? "soft" : owned ? "turquoise" : "gold",
									disabled: equipped || !owned && save.coins < item.price,
									onClick: () => buy(item),
									children: equipped ? "Ativo" : owned ? "Usar" : "Comprar"
								})
							]
						}, item.id);
					})
				})]
			}, g))]
		})]
	});
}
//#endregion
export { StorePage as component };
