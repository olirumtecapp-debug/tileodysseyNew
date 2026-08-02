import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useSave, levelFromXp, xpForLevel, totalStars } from "@/lib/game/save";
import { GameButton } from "./GameButton";
import { FullscreenButton } from "./DeviceButtons";
import { SupportDialog } from "./SupportDialog";

export function CurrencyPill({ icon, value }: { icon: string; value: number | string }) {
  return (
    <div className="flex items-center gap-1 rounded-full glass px-2 py-1 shadow-soft sm:gap-1.5 sm:px-3 sm:py-1.5">
      <span aria-hidden className="text-sm leading-none sm:text-base">
        {icon}
      </span>
      <span className="font-display text-xs font-black tabular-nums sm:text-sm sm:font-extrabold">{value}</span>
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
      <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-3xl glass px-3 py-2 shadow-soft sm:justify-between sm:gap-4">
        <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
          {back && (
            <GameButton asChild variant="soft" size="icon" className="h-9 w-9 shrink-0 sm:h-10 sm:w-10" aria-label="Voltar">
              <Link to={back}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </GameButton>
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-[15px] font-black leading-tight sm:text-base sm:font-extrabold">
              {title ?? save.name}
            </p>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="shrink-0 rounded-full bg-turquoise px-2 py-0.5 text-[10px] font-black text-white sm:text-[11px]">
                NV {lvl}
              </span>
              <div className="h-1.5 w-12 overflow-hidden rounded-full bg-foreground/10 sm:w-20">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500"
                  style={{ width: `${Math.min(100, (cur / need) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2">
          <CurrencyPill icon="⭐" value={totalStars(save)} />
          <CurrencyPill icon="🪙" value={save.coins} />
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
            <CurrencyPill icon="💎" value={save.gems} />
          </div>
          <div className="ml-auto flex items-center gap-1 sm:ml-2 sm:gap-1.5">
            <FullscreenButton />
            <SupportDialog />
          </div>
        </div>
      </div>
    </header>
  );
}
