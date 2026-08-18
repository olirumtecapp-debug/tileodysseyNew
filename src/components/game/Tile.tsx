import { memo } from "react";
import type { Tile as TileModel } from "@/lib/game/engine";
import { symbolById } from "@/lib/game/data";
import { cn } from "@/lib/utils";

export const TILE_SIZE = 48;

const PLATE: Record<string, [string, string, string]> = {
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
        "absolute rounded-[24%] p-[3px] transition-all duration-150",
        "animate-pop-in",
        locked
          ? "cursor-not-allowed brightness-[.75] saturate-[.6]"
          : "hover:-translate-y-1.5 active:translate-y-0.5 hover:brightness-105",
      )}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        left: tile.x * (TILE_SIZE * 0.96) + tile.z * 5,
        top: tile.y * (TILE_SIZE * 0.96) - tile.z * 5,
        zIndex: 10 + tile.z * 10,
        // Ivory/Marble 3D Base
        background: `linear-gradient(180deg, #ffffff 0%, #f0f0f0 45%, #d9d9d9 100%)`,
        boxShadow: `
          0 ${3 + tile.z}px 0 #b3b3b3, 
          0 ${6 + tile.z}px ${12 + tile.z * 4}px rgba(0,0,0,0.25),
          inset 0 1px 1px rgba(255,255,255,1),
          inset 0 -1px 2px rgba(0,0,0,0.1)
        `,
      }}
    >
      {/* Glossy inner plate with richer depth */}
      <span
        className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[20%]"
        style={{
          background: `linear-gradient(165deg, ${c1} 0%, ${c2} 100%)`,
          boxShadow: `
            inset 0 -2px 4px rgba(0,0,0,0.15), 
            inset 0 2px 4px rgba(255,255,255,0.8),
            0 0 0 2px ${frame}22
          `,
        }}
        aria-hidden
      >
        {/* Specular highlights */}
        <span className="pointer-events-none absolute inset-x-[15%] top-[8%] h-[25%] rounded-full bg-white/80 blur-[1px]" />
        <span className="pointer-events-none absolute right-[10%] top-[10%] h-[15%] w-[15%] rounded-full bg-white/40 blur-[2px]" />
        
        <span
          className="relative drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)] transition-transform"
          style={{ fontSize: TILE_SIZE * 0.6, lineHeight: 1 }}
        >
          {sym.glyph}
        </span>
      </span>

      {colorblind && (
        <span className="absolute bottom-1 right-1.5 text-[8px] font-black text-foreground/60">
          {sym.id.slice(0, 2).toUpperCase()}
        </span>
      )}
      {tile.frozen && (
        <span
          className="absolute inset-0 grid place-items-center rounded-[24%] bg-sky-200/60 backdrop-blur-[1px] border-2 border-white/50"
          aria-hidden
        >
          <span className="text-xl drop-shadow-md">❄️</span>
        </span>
      )}
      {tile.chained && (
        <span
          className="absolute inset-0 grid place-items-center rounded-[24%] bg-slate-900/30"
          aria-hidden
        >
          <span className="text-xl drop-shadow-md">⛓️</span>
        </span>
      )}
    </button>
  );
});