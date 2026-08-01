import type { Tile as TileModel } from "@/lib/game/engine";
import { isCovered } from "@/lib/game/engine";
import { Tile, TILE_SIZE } from "./Tile";

export function Board({
  tiles,
  colorblind,
  onSelect,
  shaking,
}: {
  tiles: TileModel[];
  colorblind: boolean;
  onSelect: (t: TileModel) => void;
  shaking?: boolean;
}) {
  const width = 7 * TILE_SIZE * 0.94 + 20;
  const height = 6 * TILE_SIZE * 0.94 + 20;

  return (
    <div className={`flex w-full justify-center ${shaking ? "animate-shake" : ""}`}>
      <div
        className="relative origin-top scale-[min(1,calc((100vw-2rem)/380))] sm:scale-100"
        style={{ width, height }}
      >
        {tiles.map((t) => (
          <Tile
            key={t.uid}
            tile={t}
            covered={isCovered(t, tiles)}
            colorblind={colorblind}
            onSelect={onSelect}
          />
        ))}
        {tiles.length === 0 && (
          <div className="grid h-full place-items-center font-display text-xl text-foreground/60">
            Tabuleiro limpo!
          </div>
        )}
      </div>
    </div>
  );
}
