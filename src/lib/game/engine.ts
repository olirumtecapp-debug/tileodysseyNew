import type { LevelConfig } from "./data";
import { worldById } from "./data";

export type Tile = {
  uid: number;
  symbolId: string;
  x: number;
  y: number;
  z: number;
  frozen: boolean;
  chained: boolean;
};

export const BOARD_COLS = 9;
export const BOARD_ROWS = 7;
export const TILE_UNIT = 1; // grid step; tiles occupy 2x2 half-steps

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function generateBoard(level: LevelConfig, salt = 0): Tile[] {
  const world = worldById(level.worldId)!;
  const rand = mulberry32(hashSeed(level.id) + salt * 7919);
  const pool = world.pool.slice(0, level.kinds);
  const total = level.triples * 3;

  // Ensure objective symbol has enough copies
  const bag: string[] = [];
  const target = level.objective.symbolId;
  if (target) {
    const need = Math.ceil((level.objective.amount ?? 0) / 3);
    for (let i = 0; i < need; i++) bag.push(target, target, target);
  }
  while (bag.length < total) {
    const s = pool[Math.floor(rand() * pool.length)]!;
    bag.push(s, s, s);
  }
  bag.length = total;
  // shuffle
  for (let i = bag.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [bag[i], bag[j]] = [bag[j]!, bag[i]!];
  }

  const cols = BOARD_COLS;
  const rows = BOARD_ROWS;
  const layers: { x: number; y: number; z: number }[][] = [];
  for (let z = 0; z < level.layers; z++) {
    const inset = z * 0.5;
    const lc = cols - z;
    const lr = rows - z;
    const layer: { x: number; y: number; z: number }[] = [];
    for (let r = 0; r < lr; r++) {
      for (let c = 0; c < lc; c++) layer.push({ x: c + inset, y: r + inset, z });
    }
    // centre-out so partially filled layers stay compact
    const cx = (lc - 1) / 2 + inset;
    const cy = (lr - 1) / 2 + inset;
    layer.sort(
      (a, b) => Math.hypot(a.x - cx, a.y - cy) - Math.hypot(b.x - cx, b.y - cy) || a.y - b.y,
    );
    layers.push(layer);
  }

  // Spread tiles across layers proportionally so the stack looks like a pyramid.
  const slotTotal = layers.reduce((a, l) => a + l.length, 0);
  const chosen: { x: number; y: number; z: number }[] = [];
  layers.forEach((layer, i) => {
    const quota =
      i === layers.length - 1
        ? total - chosen.length
        : Math.min(layer.length, Math.round((total * layer.length) / slotTotal));
    chosen.push(...layer.slice(0, Math.max(0, quota)));
  });
  // top-up from the base if rounding left us short
  for (const layer of layers) {
    for (const slot of layer) {
      if (chosen.length >= total) break;
      if (!chosen.includes(slot)) chosen.push(slot);
    }
  }



  const frozenIdx = new Set<number>();
  const chainedIdx = new Set<number>();
  while (frozenIdx.size < Math.min(level.obstacles.frozen, total))
    frozenIdx.add(Math.floor(rand() * total));
  while (chainedIdx.size < Math.min(level.obstacles.chained, total)) {
    const k = Math.floor(rand() * total);
    if (!frozenIdx.has(k)) chainedIdx.add(k);
  }

  return chosen.slice(0, total).map((s, idx) => ({
    uid: idx + 1,
    symbolId: bag[idx]!,
    x: s.x,
    y: s.y,
    z: s.z,
    frozen: frozenIdx.has(idx),
    chained: chainedIdx.has(idx),
  }));
}

export function isCovered(tile: Tile, tiles: Tile[]) {
  return tiles.some(
    (t) =>
      t.uid !== tile.uid &&
      t.z > tile.z &&
      Math.abs(t.x - tile.x) < TILE_UNIT &&
      Math.abs(t.y - tile.y) < TILE_UNIT,
  );
}

export function boardBounds(tiles: Tile[]) {
  const xs = tiles.map((t) => t.x);
  const ys = tiles.map((t) => t.y);
  return {
    minX: Math.min(0, ...xs),
    maxX: Math.max(BOARD_COLS - 1, ...xs),
    minY: Math.min(0, ...ys),
    maxY: Math.max(BOARD_ROWS - 1, ...ys),
  };
}

export function starsFor(level: LevelConfig, moves: number, seconds: number, maxCombo: number) {
  let stars = 1;
  if (moves <= level.moveGoal && seconds <= level.timeGoal) stars = 2;
  if (stars === 2 && (maxCombo >= 3 || seconds <= level.timeGoal * 0.6)) stars = 3;
  return stars as 1 | 2 | 3;
}
