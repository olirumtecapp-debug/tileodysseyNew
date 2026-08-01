import { createFileRoute } from "@tanstack/react-router";
import { AppFrame } from "@/components/game/AppFrame";
import { Header } from "@/components/game/Header";
import { SYMBOLS, WORLDS } from "@/lib/game/data";
import { useSave, totalStars } from "@/lib/game/save";

export const Route = createFileRoute("/album")({
  head: () => ({
    meta: [
      { title: "Álbum das Descobertas — Tile Odyssey" },
      {
        name: "description",
        content:
          "Frutas, flores, gemas, tesouros e criaturas: colecione cada descoberta feita durante a jornada do Tilo.",
      },
      { property: "og:title", content: "Álbum das Descobertas — Tile Odyssey" },
      {
        property: "og:description",
        content: "Colecione frutas, flores, gemas e criaturas raras a cada fase vencida.",
      },
    ],
  }),
  component: AlbumPage,
});

const CATEGORIES = ["Frutas", "Flores", "Gemas", "Tesouros", "Criaturas"] as const;

function AlbumPage() {
  const save = useSave();
  const stars = totalStars(save);

  const achievements = [
    { icon: "🏁", name: "Primeiros passos", done: save.stats.wins >= 1, hint: "Vença 1 fase" },
    { icon: "🔥", name: "Combo Mestre", done: save.stats.bestCombo >= 4, hint: "Combo x4" },
    { icon: "⭐", name: "Colecionador", done: stars >= 15, hint: "15 estrelas" },
    { icon: "🧭", name: "Explorador", done: Object.keys(save.results).length >= 8, hint: "8 fases" },
    { icon: "💎", name: "Garimpeiro", done: save.gems >= 20, hint: "20 diamantes" },
    {
      icon: "🌍",
      name: "Volta ao mundo",
      done: WORLDS.every((w) => save.results[`${w.id}-1`]),
      hint: "Jogue em todas as ilhas",
    },
  ];

  return (
    <AppFrame sky={["#c9b8ff", "#f1ecff"]} ground="#8d9b6a" accent="#8467e0">
      <Header title="Álbum das Descobertas" back="/" />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-4">
        <p className="rounded-3xl glass p-4 text-sm font-bold shadow-soft">
          {save.discovered.length} de {SYMBOLS.length} descobertas coletadas
        </p>

        {CATEGORIES.map((cat) => (
          <section key={cat} className="mt-4">
            <h2 className="font-display text-lg font-black">{cat}</h2>
            <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
              {SYMBOLS.filter((s) => s.category === cat).map((s) => {
                const found = save.discovered.includes(s.id);
                return (
                  <div
                    key={s.id}
                    className={`flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl p-1 text-center shadow-soft ${
                      found ? "glass" : "bg-foreground/10"
                    }`}
                  >
                    <span className={`text-3xl ${found ? "" : "opacity-25 grayscale"}`}>
                      {found ? s.glyph : "❔"}
                    </span>
                    <span className="line-clamp-2 text-[10px] font-bold leading-tight text-muted-foreground">
                      {found ? s.name : "???"}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        <section className="mt-6">
          <h2 className="font-display text-lg font-black">Conquistas</h2>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {achievements.map((a) => (
              <div
                key={a.name}
                className={`flex items-center gap-3 rounded-2xl p-3 shadow-soft ${
                  a.done ? "glass" : "bg-foreground/10"
                }`}
              >
                <span className={`text-2xl ${a.done ? "" : "opacity-40 grayscale"}`}>{a.icon}</span>
                <div className="min-w-0">
                  <p className="truncate font-display text-sm font-black">{a.name}</p>
                  <p className="truncate text-xs font-semibold text-muted-foreground">
                    {a.done ? "Concluída!" : a.hint}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppFrame>
  );
}
