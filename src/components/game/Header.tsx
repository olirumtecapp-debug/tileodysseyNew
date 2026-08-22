import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useSave, levelFromXp, xpForLevel, totalStars } from "@/lib/game/save";
import { GameButton } from "./GameButton";
import { FullscreenButton } from "./DeviceButtons";
import { SupportDialog } from "./SupportDialog";
import { cn } from "@/lib/utils";

export function CurrencyPill({ 
  icon, 
  value, 
  variant = "gold" 
}: { 
  icon: string; 
  value: number | string;
  variant?: "gold" | "turquoise" | "coral" | "emerald";
}) {
  const colors = {
    gold: "from-gold/20 to-gold/5 border-gold/30",
    turquoise: "from-turquoise/20 to-turquoise/5 border-turquoise/30",
    coral: "from-coral/20 to-coral/5 border-coral/30",
    emerald: "from-emerald/20 to-emerald/5 border-emerald/30",
  };

  return (
    <div className={cn(
      "flex items-center gap-1 rounded-2xl border bg-gradient-to-br px-2 py-1 shadow-soft backdrop-blur-md sm:gap-1.5 sm:px-3 sm:py-1.5",
      colors[variant]
    )}>
      <span aria-hidden className="text-sm leading-none sm:text-lg filter drop-shadow-sm">
        {icon}
      </span>
      <span className="font-display text-xs font-black tabular-nums sm:text-base">{value}</span>
    </div>
  );
}

export function Header({ title, back }: { title?: string; back?: string }) {
  const save = useSave();
  const lvl = levelFromXp(save.xp);
  const cur = save.xp - xpForLevel(lvl);
  const need = xpForLevel(lvl + 1) - xpForLevel(lvl);

  return (
    <header className="sticky top-0 z-30 px-3 pt-3">
      <div className="mx-auto flex max-w-4xl items-center gap-2 rounded-[2rem] border-2 border-white/40 bg-white/60 px-3 py-2.5 shadow-pop backdrop-blur-xl sm:justify-between sm:gap-4 sm:px-5">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-3">
          {back && (
            <GameButton asChild variant="soft" size="icon" className="h-10 w-10 shrink-0 border-white/60 bg-white/40 shadow-soft sm:h-12 sm:w-12" aria-label="Voltar">
              <Link to={back}>
                <ArrowLeft className="h-6 w-6" />
              </Link>
            </GameButton>
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-[15px] font-black leading-tight tracking-tight text-foreground/90 sm:text-xl">
              {title ?? save.name}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="shrink-0 rounded-lg bg-turquoise px-2 py-0.5 text-[9px] font-black uppercase text-white shadow-sm sm:text-[11px]">
                LVL {lvl}
              </span>
              <div className="h-2 w-14 overflow-hidden rounded-full bg-foreground/10 shadow-inner sm:w-24">
                <div
                  className="h-full rounded-full bg-emerald shadow-[0_0_8px_rgba(16,185,129,0.5)] transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, (cur / need) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-3">
          <CurrencyPill icon="⭐" value={totalStars(save)} variant="gold" />
          <CurrencyPill icon="🪙" value={save.coins} variant="gold" />
          <div className="hidden md:flex items-center gap-1.5 sm:gap-3">
            <CurrencyPill icon="💎" value={save.gems} variant="turquoise" />
          </div>
          
          <div className="ml-auto flex items-center gap-1.5 sm:ml-4 sm:gap-3">
            <FullscreenButton className="shadow-soft hover:shadow-pop transition-all" />
            
          </div>
        </div>
      </div>
    </header>
  );
}