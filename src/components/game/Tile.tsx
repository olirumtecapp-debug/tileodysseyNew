import { memo } from "react";
import type { Tile as TileModel } from "@/lib/game/engine";
import { symbolById } from "@/lib/game/data";
import { cn } from "@/lib/utils";

export const TILE_SIZE = 46;

// Soft pastel plate colours per symbol category — mirrors the glossy
// candy-tile look of premium match-3 titles.
const PLATE: Record<string, [string, string]> = {
  Frutas: ["#fffdf6", "#ffe9c9"],
  Flores: ["#fffafd", "#ffd9ec"],
  Gemas: ["#f6fbff", "#cfe8ff"],
  Tesouros: ["#fffbee", "#ffe6a8"],
  Criaturas: ["#f6fff8", "#cdf1d8"],
};

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
  const [c1, c2] = PLATE[sym.category] ?? ["#fffdf6", "#ffe9c9"];

  return (
    <button
      type="button"
      aria-label={`${sym.name}${covered ? " (bloqueada)" : ""}`}
      disabled={locked}
      onClick={() => onSelect(tile)}
      className={cn(
        "absolute rounded-[30%] p-[3px] transition-transform duration-150",
        "animate-pop-in",
        locked
          ? "cursor-not-allowed brightness-[.72] saturate-[.55]"
          : "hover:-translate-y-1 active:translate-y-0.5",
      )}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        left: tile.x * (TILE_SIZE * 0.96) + tile.z * 5,
        top: tile.y * (TILE_SIZE * 0.96) - tile.z * 5,
        zIndex: 10 + tile.z * 10,
        background: "linear-gradient(180deg,#ffffff 0%,#e6e1d6 62%,#c8c1b2 100%)",
        boxShadow: `0 ${3 + tile.z}px 0 rgba(120,110,95,.55), 0 ${5 + tile.z}px ${9 + tile.z * 3}px rgba(24,40,60,.32)`,
      }}
    >
      {/* inner glossy plate */}
      <span
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[28%]"
        style={{
          background: `linear-gradient(165deg, ${c1} 0%, ${c2} 100%)`,
          boxShadow: "inset 0 -3px 6px rgba(150,130,100,.28), inset 0 2px 3px rgba(255,255,255,.95)",
        }}
        aria-hidden
      >
        {/* top gloss */}
        <span className="pointer-events-none absolute inset-x-[10%] top-[6%] h-[34%] rounded-full bg-white/70 blur-[2px]" />
        <span
          className="relative drop-shadow-[0_1px_1px_rgba(0,0,0,.25)]"
          style={{ fontSize: TILE_SIZE * 0.55, lineHeight: 1 }}
        >
          {sym.glyph}
        </span>
      </span>

      {colorblind && (
        <span className="absolute bottom-0 right-1 text-[9px] font-black text-foreground/70">
          {sym.id.slice(0, 2).toUpperCase()}
        </span>
      )}
      {tile.frozen && (
        <span
          className="absolute inset-0 grid place-items-center rounded-[30%] bg-[#bfeeff]/70 ring-2 ring-white/70"
          aria-hidden
        >
          <span className="text-lg">❄️</span>
        </span>
      )}
      {tile.chained && (
        <span
          className="absolute inset-0 grid place-items-center rounded-[30%] bg-black/25"
          aria-hidden
        >
          <span className="text-lg">⛓️</span>
        </span>
      )}
    </button>
  );
});
