import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { Mascot } from "./Mascot";
import { GameButton } from "./GameButton";
import { AudioManager } from "@/lib/game/audio";

const TIPS = [
  "Deixe espaço livre na bandeja: guarde no máximo dois pares abertos.",
  "Comece pelas peças de cima — elas liberam o caminho mais rápido.",
  "O Ímã resolve um trio inteiro quando a bandeja aperta.",
  "Peças congeladas derretem com o Martelo. Use sem medo!",
  "Combos rápidos valem mais estrelas do que jogar devagar.",
];

export function DefeatScene({ reason, onRetry }: { reason: string; onRetry: () => void }) {
  useEffect(() => {
    AudioManager.defeat();
  }, []);
  const tip = TIPS[Math.floor(Math.random() * TIPS.length)]!;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-foreground/45 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-4xl glass p-6 text-center shadow-soft animate-pop-in">
        <h2 className="font-display text-3xl font-black text-coral">Quase lá!</h2>
        <p className="mt-1 text-sm font-semibold text-muted-foreground">{reason}</p>
        <div className="mt-2 flex justify-center">
          <Mascot mood="sad" size={130} />
        </div>
        <div className="mt-3 rounded-2xl bg-turquoise/15 p-4 text-left">
          <p className="font-display text-sm font-extrabold text-turquoise">Dica do Tilo</p>
          <p className="mt-1 text-sm font-semibold">{tip}</p>
        </div>
        <div className="mt-5 flex flex-col gap-2">
          <GameButton variant="turquoise" size="lg" onClick={onRetry}>
            Tentar de novo
          </GameButton>
          <GameButton asChild variant="soft" size="md">
            <Link to="/map">Voltar ao mapa</Link>
          </GameButton>
        </div>
      </div>
    </div>
  );
}
