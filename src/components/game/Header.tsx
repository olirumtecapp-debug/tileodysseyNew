import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { useSave, levelFromXp, xpForLevel, totalStars } from "@/lib/game/save";
import { GameButton } from "./GameButton";
import { FullscreenButton } from "./DeviceButtons";
import { SupportDialog } from "./SupportDialog";

export function CurrencyPill({ icon, value }: { icon: string; value: number | string }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full glass px-3 py-1.5 shadow-soft">
      <span aria-hidden className="text-base leading-none">
        {icon}
      </span>
      <span className="font-display text-sm font-extrabold tabular-nums">{value}</span>
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
      <div className="mx-auto grid max-w-3xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-3xl glass px-3 py-2 shadow-soft sm:flex sm:justify-between">
        <div className="flex min-w-0 items-center gap-2">
          {back && (
            <GameButton asChild variant="soft" size="icon" aria-label="Voltar">
              <Link to={back}>
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </GameButton>
          )}
          <div className="min-w-0">
            <p className="truncate font-display text-base font-extrabold leading-tight">
              {title ?? save.name}
            </p>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-turquoise px-2 py-0.5 text-[10px] font-black text-white">
                NV {lvl}
              </span>
              <div className="h-1.5 w-20 overflow-hidden rounded-full bg-foreground/10">
                <div
                  className="h-full rounded-full bg-gold transition-all duration-500"
                  style={{ width: `${Math.min(100, (cur / need) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end gap-1.5">
          <CurrencyPill icon="⭐" value={totalStars(save)} />
          <CurrencyPill icon="🪙" value={save.coins} />
          <CurrencyPill icon="💎" value={save.gems} />
          <FullscreenButton />
          <SupportDialog />
        </div>
      </div>
    </header>
  );
}
