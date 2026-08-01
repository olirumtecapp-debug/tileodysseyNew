import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { Tile as TileModel } from "@/lib/game/engine";
import { isCovered, BOARD_COLS, BOARD_ROWS } from "@/lib/game/engine";
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
  const width = BOARD_COLS * TILE_SIZE * 0.96 + 34;
  const height = BOARD_ROWS * TILE_SIZE * 0.96 + 34;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const fit = () => {
      const w = el.clientWidth;
      const h = el.clientHeight || window.innerHeight * 0.5;
      const next = Math.min(1.5, Math.max(0.42, Math.min(w / width, h / height)));
      setScale(Number.isFinite(next) ? next : 1);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width, height]);

  useEffect(() => {
    const onResize = () => wrapRef.current?.dispatchEvent(new Event("resize"));
    window.addEventListener("orientationchange", onResize);
    return () => window.removeEventListener("orientationchange", onResize);
  }, []);

  return (
    <div
      ref={wrapRef}
      className={`flex min-h-0 w-full flex-1 self-stretch items-center justify-center ${shaking ? "animate-shake" : ""}`}
    >
      <div style={{ width: width * scale, height: height * scale }}>
        <div
          className="relative origin-top-left"
          style={{ width, height, transform: `scale(${scale})` }}
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
            <div className="grid h-full place-items-center font-display text-xl text-foreground/70">
              Tabuleiro limpo!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
