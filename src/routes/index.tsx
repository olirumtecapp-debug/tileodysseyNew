import { createFileRoute, Link } from "@tanstack/react-router";
import { AppFrame } from "@/components/game/AppFrame";
import { Header } from "@/components/game/Header";
import { GameButton } from "@/components/game/GameButton";
import { Mascot } from "@/components/game/Mascot";
import { useSave, levelFromXp, totalStars } from "@/lib/game/save";
import { WORLDS } from "@/lib/game/data";
import { FullscreenButton, InstallButton } from "@/components/game/DeviceButtons";
import { SupportDialog } from "@/components/game/SupportDialog";
import { GAME_URL } from "./instalar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tile Odyssey — Aventura de peças com o Tilo" },
      {
        name: "description",
        content:
          "Explore 12 ilhas mágicas, combine trios de peças, colecione descobertas e ganhe estrelas ao lado do Tilo, a raposa exploradora.",
      },
      { property: "og:title", content: "Tile Odyssey — Aventura de peças com o Tilo" },
      {
        property: "og:description",
        content: "12 mundos, combos, power-ups e um álbum de descobertas. Jogue agora.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const save = useSave();
  const stars = totalStars(save);
  const completed = Object.keys(save.results).length;
  const nextWorld =
    WORLDS.find((w) =>
      Array.from({ length: w.levels }, (_, i) => `${w.id}-${i + 1}`).some((id) => !save.results[id]),
    ) ?? WORLDS[0]!;
  const nextIndex =
    Array.from({ length: nextWorld.levels }, (_, i) => i + 1).find(
      (i) => !save.results[`${nextWorld.id}-${i}`],
    ) ?? 1;

  const missions = [
    { id: "wins", label: "Vença 3 fases", goal: 3, value: Math.min(3, save.stats.wins % 4) },
    { id: "combo", label: "Faça um combo x3", goal: 3, value: Math.min(3, save.stats.bestCombo) },
    {
      id: "tiles",
      label: "Remova 60 peças",
      goal: 60,
      value: Math.min(60, save.stats.tilesCleared % 61),
    },
  ];

  return (
    <AppFrame>
      <Header />
      <main className="mx-auto w-full max-w-3xl px-4 pb-16 pt-4">
        <section className="relative overflow-hidden rounded-4xl glass p-6 text-center shadow-soft">
          <p className="font-display text-sm font-black uppercase tracking-[0.3em] text-turquoise filter drop-shadow-sm">
            Aventura de peças
          </p>
          <h1 className="mt-2 font-display text-6xl font-black text-emerald filter drop-shadow-[0_4px_0_rgba(0,0,0,0.15)] sm:text-7xl">
            Tile Odyssey
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-base font-semibold text-muted-foreground">
            Ajude o Tilo a explorar 12 ilhas mágicas combinando trios de peças.
          </p>
          <div className="mt-2 flex justify-center animate-float-soft">
            <Mascot mood="happy" size={150} />
          </div>
          <GameButton
            asChild
            variant="gold"
            size="xl"
            className="mt-4 w-full max-w-xs scale-110 border-b-8 border-gold-foreground/20 shadow-pop animate-glow-pulse"
          >
            <Link
              to="/play/$worldId/$levelIndex"
              params={{ worldId: nextWorld.id, levelIndex: String(nextIndex) }}
            >
              ▶ JOGAR
            </Link>
          </GameButton>
          <p className="mt-2 text-xs font-bold text-muted-foreground">
            Continuar: {nextWorld.emoji} {nextWorld.name} · Fase {nextIndex}
          </p>
        </section>

        <section className="mt-4 grid grid-cols-3 gap-2">
          <Kpi icon="⭐" value={stars} label="Estrelas" />
          <Kpi icon="🏁" value={completed} label="Fases" />
          <Kpi icon="🔥" value={save.streak.count} label="Dias seguidos" />
        </section>

        <section className="mt-6 rounded-4xl border-2 border-white/50 bg-white/40 p-5 shadow-soft backdrop-blur-md">
          <h2 className="font-display text-lg font-black">Missões diárias</h2>
          <ul className="mt-2 space-y-2">
            {missions.map((m) => (
              <li key={m.id} className="rounded-2xl bg-card/70 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-bold">{m.label}</span>
                  <span className="font-display text-sm font-black tabular-nums">
                    {m.value}/{m.goal}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className="h-full rounded-full bg-turquoise transition-all duration-500"
                    style={{ width: `${(m.value / m.goal) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <nav className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Tile2 to="/map" icon="🗺️" label="Mapa" hint="12 mundos" />
          <Tile2 to="/album" icon="📖" label="Álbum" hint={`${save.discovered.length} descobertas`} />
          <Tile2 to="/store" icon="🛍️" label="Loja" hint="Cosméticos" />
          <Tile2 to="/profile" icon="🦊" label="Perfil" hint={`Nível ${levelFromXp(save.xp)}`} />
          <Tile2 to="/settings" icon="⚙️" label="Ajustes" hint="Acessibilidade" />
          <Tile2 to="/album" icon="🏆" label="Conquistas" hint="Coleções" />
          <Tile2 to="/instalar" icon="📲" label="Instalar app" hint="Celular e PC" />
        </nav>

        <section className="mt-4 rounded-3xl glass p-4 text-center shadow-soft">
          <h2 className="font-display text-lg font-black">
            Jogue no celular 📱 e no PC 💻
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm font-semibold text-muted-foreground">
            Funciona no navegador de qualquer aparelho. No computador, acesse{" "}
            <a href={GAME_URL} className="font-black text-turquoise underline">
              {GAME_URL.replace("https://", "")}
            </a>{" "}
            — e dá para instalar como app com ícone próprio.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
            <InstallButton />
            <div className="flex items-center gap-2">
              <FullscreenButton label />
              <GameButton asChild variant="soft" size="md">
                <Link to="/instalar">Como instalar</Link>
              </GameButton>
            </div>
            <SupportDialog
              trigger={
                <GameButton variant="coral" size="md">
                  ❤️ Apoiar o projeto
                </GameButton>
              }
            />
          </div>
        </section>
      </main>
    </AppFrame>
  );
}

function Kpi({ icon, value, label }: { icon: string; value: number; label: string }) {
  return (
    <div className="rounded-3xl glass p-3 text-center shadow-soft">
      <p className="text-2xl">{icon}</p>
      <p className="font-display text-2xl font-black tabular-nums">{value}</p>
      <p className="text-[11px] font-bold text-muted-foreground">{label}</p>
    </div>
  );
}

function Tile2({
  to,
  icon,
  label,
  hint,
}: {
  to: string;
  icon: string;
  label: string;
  hint: string;
}) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-3 rounded-[2rem] border-2 border-white/60 bg-white/40 p-4 shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-pop hover:bg-white/60"
    >
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gold/25 text-2xl">
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block truncate font-display text-base font-black">{label}</span>
        <span className="block truncate text-xs font-semibold text-muted-foreground">{hint}</span>
      </span>
    </Link>
  );
}
