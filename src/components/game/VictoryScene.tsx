import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Mascot } from "./Mascot";
import { GameButton } from "./GameButton";
import { Confetti, Fireworks } from "./Confetti";
import { AudioManager } from "@/lib/game/audio";
import { symbolById } from "@/lib/game/data";

export function VictoryScene({
  stars,
  score,
  xp,
  coins,
  discovered,
  nextTo,
  onReplay,
}: {
  stars: 1 | 2 | 3;
  score: number;
  xp: number;
  coins: number;
  discovered: string[];
  nextTo?: { worldId: string; levelIndex: string } | null;
  onReplay: () => void;
}) {
  const [shown, setShown] = useState(0);
  const [xpShown, setXpShown] = useState(0);

  useEffect(() => {
    AudioManager.victory();
    const timers = Array.from({ length: stars }).map((_, i) =>
      setTimeout(() => {
        setShown(i + 1);
        AudioManager.star(i);
      }, 500 + i * 380),
    );
    return () => timers.forEach(clearTimeout);
  }, [stars]);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / 1200);
      setXpShown(Math.round(xp * p));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [xp]);

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/45 px-4 backdrop-blur-sm">
      <Confetti />
      <div className="relative w-full max-w-md overflow-hidden rounded-4xl glass p-6 text-center shadow-soft animate-pop-in">
        <Fireworks />
        <h2 className="font-display text-3xl font-black text-emerald text-stroke">Fase Concluída!</h2>
        <div className="mt-3 flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`text-5xl ${i < shown ? "animate-star-land" : "opacity-25 grayscale"}`}
            >
              ⭐
            </span>
          ))}
        </div>
        <div className="relative mt-2 flex justify-center">
          <Mascot mood="cheer" size={130} />
        </div>
        <div className="mt-2 grid grid-cols-3 gap-2">
          <Stat icon="🏆" label="Pontos" value={score} />
          <Stat icon="✨" label="XP" value={xpShown} />
          <Stat icon="🪙" label="Moedas" value={coins} />
        </div>
        {discovered.length > 0 && (
          <div className="mt-3 rounded-2xl bg-gold/20 p-3">
            <p className="font-display text-sm font-extrabold">Novas descobertas!</p>
            <p className="mt-1 text-2xl">
              {discovered.map((d) => symbolById(d).glyph).join(" ")}
            </p>
          </div>
        )}
        <div className="mt-5 flex flex-col gap-2">
          {nextTo ? (
            <GameButton asChild variant="gold" size="lg" className="animate-glow-pulse">
              <Link to="/play/$worldId/$levelIndex" params={nextTo}>
                Próxima fase →
              </Link>
            </GameButton>
          ) : (
            <GameButton asChild variant="gold" size="lg">
              <Link to="/map">Ver o mapa</Link>
            </GameButton>
          )}
          <div className="flex gap-2">
            <GameButton variant="soft" size="md" className="flex-1" onClick={onReplay}>
              Repetir
            </GameButton>
            <GameButton asChild variant="soft" size="md" className="flex-1">
              <Link to="/map">Mapa</Link>
            </GameButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: string; label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-card/70 p-2">
      <p className="text-lg">{icon}</p>
      <p className="font-display text-lg font-black tabular-nums">{value}</p>
      <p className="text-[11px] font-semibold text-muted-foreground">{label}</p>
    </div>
  );
}
