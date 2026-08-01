import { memo } from "react";
import type { Tile as TileModel } from "@/lib/game/engine";
import { symbolById } from "@/lib/game/data";
import { cn } from "@/lib/utils";

export const TILE_SIZE = 46;

// Soft pastel plate colours per symbol category — mirrors the glossy
// candy-tile look of premium match-3 titles.
const PLATE: Record<string, [string, string, string]> = {
  //           face top    face bottom  frame (saturated)
  Frutas: ["#fffdf3", "#ffe3b0", "#f4903a"],
  Flores: ["#fff8fc", "#ffc9e4", "#e8559b"],
  Gemas: ["#f4fbff", "#b9dcff", "#3d8fe0"],
  Tesouros: ["#fffaea", "#ffd982", "#e0a51f"],
  Criaturas: ["#f4fff8", "#b9ecd0", "#2fae72"],
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
  const [c1, c2, frame] = PLATE[sym.category] ?? ["#fffdf3", "#ffe3b0", "#f4903a"];

  return (
    <button
      type="button"
      aria-label={`${sym.name}${covered ? " (bloqueada)" : ""}`}
      disabled={locked}
      onClick={() => onSelect(tile)}
      className={cn(
        "absolute rounded-[30%] p-[4px] transition-transform duration-150",
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
        background: `linear-gradient(180deg,#ffffff 0%, ${frame}cc 55%, ${frame} 100%)`,
        boxShadow: `0 ${4 + tile.z}px 0 rgba(0,0,0,.28), 0 ${6 + tile.z}px ${12 + tile.z * 3}px rgba(16,38,64,.35), inset 0 1px 0 rgba(255,255,255,.9)`,
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
