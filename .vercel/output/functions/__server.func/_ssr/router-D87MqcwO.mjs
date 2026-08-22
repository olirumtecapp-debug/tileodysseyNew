import { r as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime, t as QueryClientProvider } from "../_libs/react+tanstack__react-query.mjs";
import { _ as Link, f as createRouter, g as createRootRouteWithContext, h as createFileRoute, l as Scripts, m as lazyRouteComponent, p as Outlet, u as HeadContent, y as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { i as __exportAll } from "./server-CA3brNlQ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-D87MqcwO.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-DHAlq08S.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$8 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: "Tile Odyssey" },
			{
				name: "description",
				content: "Aventura de peças em 12 ilhas mágicas com o Tilo."
			},
			{
				name: "theme-color",
				content: "#8fd8ff"
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-title",
				content: "Tile Odyssey"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Nunito:wght@500;700;900&display=swap"
			},
			{
				rel: "icon",
				href: "/app-icon-512.png",
				type: "image/png"
			},
			{
				rel: "apple-touch-icon",
				href: "/app-icon-512.png"
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("script", {
				src: "https://projetoij.lovable.app/api/public/pij.js",
				defer: true
			})
		] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$8.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
	});
}
var $$splitComponentImporter$7 = () => import("./routes-BQ7UJX9b.mjs");
var Route$7 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Tile Odyssey — Aventura de peças com o Tilo" },
		{
			name: "description",
			content: "Explore 12 ilhas mágicas, combine trios de peças, colecione descobertas e ganhe estrelas ao lado do Tilo, a raposa exploradora."
		},
		{
			property: "og:title",
			content: "Tile Odyssey — Aventura de peças com o Tilo"
		},
		{
			property: "og:description",
			content: "12 mundos, combos, power-ups e um álbum de descobertas. Jogue agora."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./album-DgHh8EbX.mjs");
var Route$6 = createFileRoute("/album")({
	head: () => ({ meta: [
		{ title: "Álbum das Descobertas — Tile Odyssey" },
		{
			name: "description",
			content: "Frutas, flores, gemas, tesouros e criaturas: colecione cada descoberta feita durante a jornada do Tilo."
		},
		{
			property: "og:title",
			content: "Álbum das Descobertas — Tile Odyssey"
		},
		{
			property: "og:description",
			content: "Colecione frutas, flores, gemas e criaturas raras a cada fase vencida."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./instalar-_h8bR78X.mjs");
var GAME_URL = "https://tileodyssey.lovable.app";
var Route$5 = createFileRoute("/instalar")({
	head: () => ({ meta: [
		{ title: "Jogar e instalar — Tile Odyssey no celular e no PC" },
		{
			name: "description",
			content: "Jogue o Tile Odyssey no celular, tablet, PC ou notebook. Veja como instalar o app em cada aparelho, ativar a tela cheia e apoiar o projeto."
		},
		{
			property: "og:title",
			content: "Jogar e instalar — Tile Odyssey"
		},
		{
			property: "og:description",
			content: "Instale o Tile Odyssey no Android, iPhone, PC ou notebook e jogue em tela cheia."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./map-PNsG6_uX.mjs");
var Route$4 = createFileRoute("/map")({
	head: () => ({ meta: [
		{ title: "Mapa das Ilhas — Tile Odyssey" },
		{
			name: "description",
			content: "Percorra o caminho entre bosques, vulcões e o espaço. Cada ilha traz fases, obstáculos e recompensas novas."
		},
		{
			property: "og:title",
			content: "Mapa das Ilhas — Tile Odyssey"
		},
		{
			property: "og:description",
			content: "12 ilhas mágicas com dezenas de fases para desbloquear."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./profile-BN0FEgqd.mjs");
var Route$3 = createFileRoute("/profile")({
	head: () => ({ meta: [
		{ title: "Perfil do Explorador — Tile Odyssey" },
		{
			name: "description",
			content: "Acompanhe nível, XP, estrelas, sequência diária e estatísticas detalhadas da sua jornada em Tile Odyssey."
		},
		{
			property: "og:title",
			content: "Perfil do Explorador — Tile Odyssey"
		},
		{
			property: "og:description",
			content: "Nível, XP, estrelas, combos e estatísticas completas da sua aventura."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./settings-CAEz5dbM.mjs");
var Route$2 = createFileRoute("/settings")({
	head: () => ({ meta: [
		{ title: "Configurações e Acessibilidade — Tile Odyssey" },
		{
			name: "description",
			content: "Ajuste som, redução de animações, modo daltônico, alto contraste, modo canhoto e escala da interface."
		},
		{
			property: "og:title",
			content: "Configurações e Acessibilidade — Tile Odyssey"
		},
		{
			property: "og:description",
			content: "Som, animações, modo daltônico, alto contraste e escala da interface."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./store-DHXxnZnW.mjs");
var Route$1 = createFileRoute("/store")({
	head: () => ({ meta: [
		{ title: "Loja Cosmética — Tile Odyssey" },
		{
			name: "description",
			content: "Temas, molduras, avatares e efeitos de partículas para deixar a jornada do Tilo com a sua cara."
		},
		{
			property: "og:title",
			content: "Loja Cosmética — Tile Odyssey"
		},
		{
			property: "og:description",
			content: "Só itens visuais: temas, molduras, avatares e trilhas de partículas."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./play._worldId._levelIndex-C7sqWl-b.mjs");
var Route = createFileRoute("/play/$worldId/$levelIndex")({
	head: () => ({ meta: [
		{ title: "Partida em andamento — Tile Odyssey" },
		{
			name: "description",
			content: "Combine trios de peças, use power-ups e conquiste três estrelas ao lado do Tilo nesta fase de Tile Odyssey."
		},
		{
			property: "og:title",
			content: "Partida em andamento — Tile Odyssey"
		},
		{
			property: "og:description",
			content: "Combine trios, encadeie combos e conquiste três estrelas nesta fase."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var rootRouteChildren = {
	IndexRoute: Route$7.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$8
	}),
	AlbumRoute: Route$6.update({
		id: "/album",
		path: "/album",
		getParentRoute: () => Route$8
	}),
	InstalarRoute: Route$5.update({
		id: "/instalar",
		path: "/instalar",
		getParentRoute: () => Route$8
	}),
	MapRoute: Route$4.update({
		id: "/map",
		path: "/map",
		getParentRoute: () => Route$8
	}),
	ProfileRoute: Route$3.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => Route$8
	}),
	SettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$8
	}),
	StoreRoute: Route$1.update({
		id: "/store",
		path: "/store",
		getParentRoute: () => Route$8
	}),
	PlayWorldIdLevelIndexRoute: Route.update({
		id: "/play/$worldId/$levelIndex",
		path: "/play/$worldId/$levelIndex",
		getParentRoute: () => Route$8
	})
};
var routeTree = Route$8._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Route as n, GAME_URL as r, router_exports as t };
