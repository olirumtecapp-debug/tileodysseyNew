import { createFileRoute } from "@tanstack/react-router";
import { AppFrame } from "@/components/game/AppFrame";
import { Header } from "@/components/game/Header";
import { GameButton } from "@/components/game/GameButton";
import { SaveManager, useSave, type Settings } from "@/lib/game/save";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Configurações e Acessibilidade — Tile Odyssey" },
      {
        name: "description",
        content:
          "Ajuste som, redução de animações, modo daltônico, alto contraste, modo canhoto e escala da interface.",
      },
      { property: "og:title", content: "Configurações e Acessibilidade — Tile Odyssey" },
      {
        property: "og:description",
        content: "Som, animações, modo daltônico, alto contraste e escala da interface.",
      },
    ],
  }),
  component: SettingsPage,
});

const TOGGLES: { key: keyof Settings; label: string; hint: string }[] = [
  { key: "sound", label: "Efeitos sonoros", hint: "Sons de clique, combos e vitória" },
  { key: "music", label: "Música ambiente", hint: "Passarinhos, vento e natureza" },
  { key: "reduceMotion", label: "Reduzir animações", hint: "Menos movimento na tela" },
  { key: "colorblind", label: "Modo daltônico", hint: "Adiciona rótulos às peças" },
  { key: "highContrast", label: "Alto contraste", hint: "Texto mais escuro e bordas fortes" },
  { key: "leftHanded", label: "Modo canhoto", hint: "Inverte controles laterais" },
];

function SettingsPage() {
  const save = useSave();

  const toggle = (key: keyof Settings) =>
    SaveManager.update((s) => ({
      ...s,
      settings: { ...s.settings, [key]: !s.settings[key] },
    }));

  return (
    <AppFrame sky={["#bfeeff", "#f4fdff"]} ground="#cfe9f2" accent="#3fa9d6">
      <Header title="Configurações" back="/" />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-4">
        <section className="rounded-3xl glass p-2 shadow-soft">
          {TOGGLES.map((t) => (
            <div
              key={t.key}
              className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl p-3"
            >
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-black">{t.label}</p>
                <p className="truncate text-xs font-semibold text-muted-foreground">{t.hint}</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={Boolean(save.settings[t.key])}
                aria-label={t.label}
                onClick={() => toggle(t.key)}
                className={`h-8 w-14 shrink-0 rounded-full p-1 transition-colors ${
                  save.settings[t.key] ? "bg-emerald" : "bg-foreground/20"
                }`}
              >
                <span
                  className={`block h-6 w-6 rounded-full bg-white shadow-soft transition-transform ${
                    save.settings[t.key] ? "translate-x-6" : ""
                  }`}
                />
              </button>
            </div>
          ))}
        </section>

        <section className="mt-4 rounded-3xl glass p-4 shadow-soft">
          <p className="font-display text-sm font-black">Escala da interface</p>
          <input
            type="range"
            min={0.85}
            max={1.25}
            step={0.05}
            value={save.settings.uiScale}
            aria-label="Escala da interface"
            onChange={(e) =>
              SaveManager.update((s) => ({
                ...s,
                settings: { ...s.settings, uiScale: Number(e.target.value) },
              }))
            }
            className="mt-3 w-full accent-[var(--turquoise)]"
          />
          <p className="mt-1 text-xs font-bold text-muted-foreground">
            {Math.round(save.settings.uiScale * 100)}%
          </p>
        </section>

        <section className="mt-4 rounded-3xl glass p-4 shadow-soft">
          <p className="font-display text-sm font-black">Dados do jogo</p>
          <p className="mt-1 text-xs font-semibold text-muted-foreground">
            Seu progresso é salvo automaticamente neste dispositivo.
          </p>
          <GameButton
            variant="coral"
            size="sm"
            className="mt-3"
            onClick={() => {
              if (confirm("Apagar todo o progresso?")) SaveManager.reset();
            }}
          >
            Reiniciar progresso
          </GameButton>
        </section>
      </main>
    </AppFrame>
  );
}
