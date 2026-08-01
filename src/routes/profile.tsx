import { createFileRoute } from "@tanstack/react-router";
import { AppFrame } from "@/components/game/AppFrame";
import { Header } from "@/components/game/Header";
import { Mascot } from "@/components/game/Mascot";
import { useSave, levelFromXp, xpForLevel, totalStars } from "@/lib/game/save";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Perfil do Explorador — Tile Odyssey" },
      {
        name: "description",
        content:
          "Acompanhe nível, XP, estrelas, sequência diária e estatísticas detalhadas da sua jornada em Tile Odyssey.",
      },
      { property: "og:title", content: "Perfil do Explorador — Tile Odyssey" },
      {
        property: "og:description",
        content: "Nível, XP, estrelas, combos e estatísticas completas da sua aventura.",
      },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const save = useSave();
  const lvl = levelFromXp(save.xp);
  const cur = save.xp - xpForLevel(lvl);
  const need = xpForLevel(lvl + 1) - xpForLevel(lvl);
  const played = save.stats.levelsPlayed || 1;
  const winRate = Math.round((save.stats.wins / played) * 100);
  const avg = Math.round(save.stats.totalSeconds / played);

  const stats = [
    { icon: "🏁", label: "Fases concluídas", value: Object.keys(save.results).length },
    { icon: "📈", label: "Taxa de vitória", value: `${winRate}%` },
    { icon: "🔥", label: "Maior combo", value: `x${save.stats.bestCombo}` },
    { icon: "🧩", label: "Peças removidas", value: save.stats.tilesCleared },
    { icon: "⏱️", label: "Tempo médio", value: `${avg}s` },
    { icon: "🎁", label: "Power-ups usados", value: save.stats.powerupsUsed },
    { icon: "⭐", label: "Estrelas", value: totalStars(save) },
    {
      icon: "🕹️",
      label: "Tempo jogado",
      value: `${Math.floor(save.stats.totalSeconds / 60)} min`,
    },
  ];

  return (
    <AppFrame sky={["#8ee6ff", "#e6fbff"]} ground="#f2dfae" accent="#22b8c9">
      <Header title="Perfil" back="/" />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-4">
        <section className="flex flex-col items-center rounded-4xl glass p-6 text-center shadow-soft">
          <Mascot mood="happy" size={120} />
          <h1 className="mt-2 font-display text-2xl font-black">{save.name}</h1>
          <p className="text-sm font-bold text-muted-foreground">
            Nível {lvl} · {save.xp} XP totais
          </p>
          <div className="mt-3 h-3 w-full max-w-sm overflow-hidden rounded-full bg-foreground/10">
            <div
              className="h-full rounded-full bg-gold transition-all duration-700"
              style={{ width: `${Math.min(100, (cur / need) * 100)}%` }}
            />
          </div>
          <p className="mt-1 text-xs font-bold text-muted-foreground">
            {cur}/{need} XP para o próximo nível
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Badge icon="🔥" text={`${save.streak.count} dias seguidos`} />
            <Badge icon="🗝️" text={`${save.keys} chaves`} />
            <Badge icon="💎" text={`${save.gems} diamantes`} />
          </div>
        </section>

        <section className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl glass p-4 text-center shadow-soft">
              <p className="text-2xl">{s.icon}</p>
              <p className="font-display text-xl font-black tabular-nums">{s.value}</p>
              <p className="text-[11px] font-bold text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </section>
      </main>
    </AppFrame>
  );
}

function Badge({ icon, text }: { icon: string; text: string }) {
  return (
    <span className="rounded-full bg-card/80 px-3 py-1 text-xs font-bold shadow-soft">
      {icon} {text}
    </span>
  );
}
