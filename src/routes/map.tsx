import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppFrame } from "@/components/game/AppFrame";
import { Header } from "@/components/game/Header";
import { MascotSpeech } from "@/components/game/Mascot";
import { WORLDS } from "@/lib/game/data";
import { useSave } from "@/lib/game/save";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Mapa das Ilhas — Tile Odyssey" },
      {
        name: "description",
        content:
          "Percorra o caminho entre bosques, vulcões e o espaço. Cada ilha traz fases, obstáculos e recompensas novas.",
      },
      { property: "og:title", content: "Mapa das Ilhas — Tile Odyssey" },
      {
        property: "og:description",
        content: "12 ilhas mágicas com dezenas de fases para desbloquear.",
      },
    ],
  }),
  component: MapPage,
});

function MapPage() {
  const save = useSave();
  const [openWorld, setOpenWorld] = useState<string>(WORLDS[0]!.id);

  const worldUnlocked = (i: number) => {
    if (i === 0) return true;
    const prev = WORLDS[i - 1]!;
    const done = Array.from({ length: prev.levels }, (_, k) => save.results[`${prev.id}-${k + 1}`])
      .filter(Boolean).length;
    return done >= Math.ceil(prev.levels * 0.6);
  };

  const active = WORLDS.find((w) => w.id === openWorld)!;

  return (
    <AppFrame sky={active.sky} ground={active.ground} accent={active.accent}>
      <Header title="Mapa das Ilhas" back="/" />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-4">
        <div className="mb-4">
          <MascotSpeech text="Escolha uma ilha e vamos explorar!" mood="happy" />
        </div>

        <div className="space-y-3">
          {WORLDS.map((w, i) => {
            const unlocked = worldUnlocked(i);
            const done = Array.from(
              { length: w.levels },
              (_, k) => save.results[`${w.id}-${k + 1}`],
            ).filter(Boolean).length;
            const open = openWorld === w.id;
            return (
              <section
                key={w.id}
                className={`overflow-hidden rounded-3xl glass shadow-soft transition-all ${
                  unlocked ? "" : "opacity-60"
                }`}
              >
                <button
                  type="button"
                  onClick={() => unlocked && setOpenWorld(open ? "" : w.id)}
                  disabled={!unlocked}
                  className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 p-4 text-left"
                >
                  <span
                    className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-3xl shadow-soft"
                    style={{ background: `${w.accent}33` }}
                  >
                    {unlocked ? w.emoji : "🔒"}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-display text-lg font-black">{w.name}</span>
                    <span className="block truncate text-xs font-semibold text-muted-foreground">
                      {unlocked ? w.subtitle : "Complete a ilha anterior para desbloquear"}
                    </span>
                    <span className="mt-1 block h-1.5 w-full max-w-[10rem] overflow-hidden rounded-full bg-foreground/10">
                      <span
                        className="block h-full rounded-full"
                        style={{ width: `${(done / w.levels) * 100}%`, background: w.accent }}
                      />
                    </span>
                  </span>
                  <span className="shrink-0 font-display text-sm font-black tabular-nums">
                    {done}/{w.levels}
                  </span>
                </button>

                {open && unlocked && (
                  <div className="grid grid-cols-4 gap-3 px-4 pb-5 sm:grid-cols-6">
                    {Array.from({ length: w.levels }, (_, k) => k + 1).map((idx) => {
                      const res = save.results[`${w.id}-${idx}`];
                      const prevDone = idx === 1 || save.results[`${w.id}-${idx - 1}`];
                      return (
                        <Link
                          key={idx}
                          to="/play/$worldId/$levelIndex"
                          params={{ worldId: w.id, levelIndex: String(idx) }}
                          disabled={!prevDone}
                          className={`flex aspect-square flex-col items-center justify-center rounded-2xl border-b-4 border-black/10 shadow-soft transition-transform ${
                            prevDone
                              ? "bg-ivory hover:-translate-y-1"
                              : "pointer-events-none bg-foreground/10 opacity-60"
                          }`}
                        >
                          <span className="font-display text-xl font-black">
                            {prevDone ? idx : "🔒"}
                          </span>
                          <span className="text-[10px] leading-none">
                            {res ? "⭐".repeat(res.stars) : ""}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </AppFrame>
  );
}
