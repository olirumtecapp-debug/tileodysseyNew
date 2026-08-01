import { memo } from "react";
import type { Tile as TileModel } from "@/lib/game/engine";
import { symbolById } from "@/lib/game/data";
import { cn } from "@/lib/utils";

export const TILE_SIZE = 54;

export const Tile = memo(function Tile({
  tile,
  covered,
  colorblind,
  onSelect,
}: {
  tile: TileModel;
  covered: boolean;
  colorblind: boolean;
  onSelect: (t: TileModel) => void;
}) {
  const sym = symbolById(tile.symbolId);
  const locked = covered || tile.frozen || tile.chained;
  return (
    <button
      type="button"
      aria-label={`${sym.name}${covered ? " (bloqueada)" : ""}`}
      disabled={locked}
      onClick={() => onSelect(tile)}
      className={cn(
        "absolute flex items-center justify-center rounded-xl border-b-4 border-black/10 bg-ivory transition-all duration-200 animate-pop-in",
        locked
          ? "cursor-not-allowed brightness-[.62] saturate-[.5]"
          : "hover:-translate-y-0.5 hover:brightness-105 active:translate-y-0.5",
      )}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        left: tile.x * (TILE_SIZE * 0.94) + tile.z * 4,
        top: tile.y * (TILE_SIZE * 0.94) - tile.z * 4,
        zIndex: 10 + tile.z * 10,
        boxShadow: `0 ${2 + tile.z}px ${6 + tile.z * 2}px rgba(0,0,0,.28)`,
      }}
    >
      <span className="text-[26px] leading-none" aria-hidden>
        {sym.glyph}
      </span>
      {colorblind && (
        <span className="absolute bottom-0.5 right-1 text-[9px] font-black text-foreground/70">
          {sym.id.slice(0, 2).toUpperCase()}
        </span>
      )}
      {tile.frozen && (
        <span className="absolute inset-0 rounded-xl bg-[#bfeeff]/70 ring-2 ring-white/70" aria-hidden>
          <span className="absolute inset-0 grid place-items-center text-lg">❄️</span>
        </span>
      )}
      {tile.chained && (
        <span className="absolute inset-0 grid place-items-center rounded-xl bg-black/25" aria-hidden>
          <span className="text-lg">⛓️</span>
        </span>
      )}
    </button>
  );
});
