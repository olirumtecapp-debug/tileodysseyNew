import { symbolById } from "@/lib/game/data";
import type { Tile } from "@/lib/game/engine";

export const TRAY_SLOTS = 7;

export function Tray({ items, clearing }: { items: Tile[]; clearing: number[] }) {
  const slots = Array.from({ length: TRAY_SLOTS });
  const danger = items.length >= TRAY_SLOTS - 1;

  return (
    <div
      className={`mx-auto flex w-fit max-w-full items-center gap-1 rounded-3xl px-2 py-2 shadow-soft transition-colors duration-300 ${
        danger ? "bg-coral/25 ring-2 ring-coral" : "glass"
      }`}
    >
      {slots.map((_, i) => {
        const tile = items[i];
        return (
          <div
            key={i}
            className="grid h-11 w-11 place-items-center rounded-xl bg-foreground/5 ring-1 ring-inset ring-white/40 sm:h-12 sm:w-12"
          >
            {tile && (
              <span
                className={`text-2xl ${clearing.includes(tile.uid) ? "animate-burst" : "animate-pop-in"}`}
                aria-label={symbolById(tile.symbolId).name}
              >
                {symbolById(tile.symbolId).glyph}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
