import { cn } from "@/lib/utils";

export type PowerUpId = "undo" | "shuffle" | "magnet" | "hammer" | "freeze";

export const POWERUPS: { id: PowerUpId; icon: string; name: string; hint: string }[] = [
  { id: "undo", icon: "↩️", name: "Voltar", hint: "Devolve a última peça" },
  { id: "shuffle", icon: "🔀", name: "Super Shuffle", hint: "Embaralha o tabuleiro" },
  { id: "magnet", icon: "🧲", name: "Ímã", hint: "Puxa um trio para a bandeja" },
  { id: "hammer", icon: "🔨", name: "Martelo", hint: "Quebra gelo e correntes" },
  { id: "freeze", icon: "⏱️", name: "Congelar", hint: "+20s no cronômetro" },
];

export function PowerUpBar({
  charges,
  onUse,
  disabled,
}: {
  charges: Record<PowerUpId, number>;
  onUse: (id: PowerUpId) => void;
  disabled?: boolean;
}) {
  return (
    <div className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-2">
      {POWERUPS.map((p) => (
        <button
          key={p.id}
          type="button"
          disabled={disabled || charges[p.id] <= 0}
          onClick={() => onUse(p.id)}
          title={`${p.name} — ${p.hint}`}
          aria-label={`${p.name}: ${p.hint}`}
          className={cn(
            "relative grid h-14 w-14 place-items-center rounded-2xl border-2 border-white/60 bg-white/40 shadow-soft backdrop-blur-sm transition-all active:translate-y-1.5 active:shadow-none",
            charges[p.id] > 0 ? "hover:-translate-y-0.5 hover:brightness-105" : "opacity-40",
          )}
        >
          <span className="text-2xl" aria-hidden>
            {p.icon}
          </span>
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-gold font-display text-xs font-black text-gold-foreground shadow-soft">
            {charges[p.id]}
          </span>
        </button>
      ))}
    </div>
  );
}
