import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Copy, Check, Monitor, Smartphone, Apple } from "lucide-react";
import { AppFrame } from "@/components/game/AppFrame";
import { Header } from "@/components/game/Header";
import { GameButton } from "@/components/game/GameButton";
import { FullscreenButton, InstallButton } from "@/components/game/DeviceButtons";
import { SupportDialog } from "@/components/game/SupportDialog";
import { useDeviceKind } from "@/lib/pwa";

export const GAME_URL = "https://tileodyssey.lovable.app";

export const Route = createFileRoute("/instalar")({
  head: () => ({
    meta: [
      { title: "Jogar e instalar — Tile Odyssey no celular e no PC" },
      {
        name: "description",
        content:
          "Jogue o Tile Odyssey no celular, tablet, PC ou notebook. Veja como instalar o app em cada aparelho, ativar a tela cheia e apoiar o projeto.",
      },
      { property: "og:title", content: "Jogar e instalar — Tile Odyssey" },
      {
        property: "og:description",
        content: "Instale o Tile Odyssey no Android, iPhone, PC ou notebook e jogue em tela cheia.",
      },
    ],
  }),
  component: InstallPage,
});

function InstallPage() {
  const kind = useDeviceKind();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(t);
  }, [copied]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(GAME_URL);
      setCopied(true);
    } catch {
      /* ignore */
    }
  };

  return (
    <AppFrame sky={["#8fd8ff", "#d9f6ff"]} ground="#63c471" accent="#2fb8a8">
      <Header title="Jogar em qualquer aparelho" back="/" />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-4">
        <section className="rounded-3xl glass p-5 shadow-soft">
          <h1 className="font-display text-2xl font-black">
            📱 Celular · 💻 PC ou notebook — o mesmo jogo
          </h1>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            O Tile Odyssey roda direto no navegador, sem loja de apps e sem download pesado. Ele se
            ajusta sozinho à tela do celular, tablet, notebook ou monitor grande — no computador
            você joga com o mouse, no celular com o toque.
          </p>

          <div className="mt-4 rounded-2xl bg-card/70 p-3">
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground">
              Endereço do jogo
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <a
                href={GAME_URL}
                className="break-all font-display text-base font-black text-turquoise underline"
              >
                {GAME_URL}
              </a>
              <GameButton variant="soft" size="sm" onClick={copyUrl}>
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Endereço copiado!" : "Copiar endereço"}
              </GameButton>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <InstallButton />
            <FullscreenButton label />
            <SupportDialog
              trigger={
                <GameButton variant="coral" size="md">
                  ❤️ Apoiar
                </GameButton>
              }
            />
          </div>
          <p className="mt-2 text-xs font-bold text-muted-foreground">
            A tela cheia esconde a barra do navegador — toque de novo no botão para desativar.
          </p>
        </section>

        <section className="mt-4 grid gap-3 sm:grid-cols-3">
          <Card
            active={kind === "desktop"}
            icon={<Monitor className="h-5 w-5" />}
            title="PC / Notebook"
            steps={[
              `Abra ${GAME_URL} no Chrome, Edge ou Brave.`,
              "Clique no ícone de instalar (monitor com seta) na barra de endereço, ou no menu ⋮ › “Instalar Tile Odyssey”.",
              "O jogo abre em janela própria, com atalho na área de trabalho.",
              "Use o botão de tela cheia ou a tecla F11 para jogar sem distrações.",
            ]}
          />
          <Card
            active={kind === "android"}
            icon={<Smartphone className="h-5 w-5" />}
            title="Android"
            steps={[
              `Abra ${GAME_URL} no Chrome.`,
              "Toque em “Instalar app” aqui em cima, ou no menu ⋮ › “Adicionar à tela inicial”.",
              "Confirme e o ícone da raposa aparece junto dos seus apps.",
              "Ao abrir pelo ícone, o jogo já roda em tela cheia.",
            ]}
          />
          <Card
            active={kind === "ios"}
            icon={<Apple className="h-5 w-5" />}
            title="iPhone / iPad"
            steps={[
              `Abra ${GAME_URL} no Safari.`,
              "Toque no botão Compartilhar (quadrado com seta para cima).",
              "Escolha “Adicionar à Tela de Início” e confirme.",
              "Abra pelo ícone para jogar em tela cheia.",
            ]}
          />
        </section>

        <section className="mt-4 rounded-3xl glass p-5 shadow-soft">
          <h2 className="font-display text-lg font-black">Dicas para jogar no computador</h2>
          <ul className="mt-2 space-y-1 text-sm font-semibold text-muted-foreground">
            <li>• Clique com o mouse para enviar a peça à bandeja.</li>
            <li>• Ative a tela cheia para o tabuleiro ficar maior.</li>
            <li>• O progresso fica salvo neste navegador — use sempre o mesmo para continuar.</li>
            <li>• Em Ajustes você pode aumentar o tamanho da interface e reduzir animações.</li>
          </ul>
        </section>
      </main>
    </AppFrame>
  );
}

function Card({
  icon,
  title,
  steps,
  active,
}: {
  icon: React.ReactNode;
  title: string;
  steps: string[];
  active: boolean;
}) {
  return (
    <div
      className={`rounded-3xl p-4 shadow-soft ${active ? "glass ring-2 ring-turquoise" : "glass"}`}
    >
      <div className="flex items-center gap-2">
        <span className="grid h-9 w-9 place-items-center rounded-2xl bg-gold/25">{icon}</span>
        <h3 className="font-display text-base font-black">{title}</h3>
        {active && (
          <span className="ml-auto rounded-full bg-turquoise px-2 py-0.5 text-[10px] font-black text-white">
            SEU APARELHO
          </span>
        )}
      </div>
      <ol className="mt-2 space-y-1 text-xs font-semibold text-muted-foreground">
        {steps.map((s, i) => (
          <li key={i}>
            {i + 1}. {s}
          </li>
        ))}
      </ol>
    </div>
  );
}
