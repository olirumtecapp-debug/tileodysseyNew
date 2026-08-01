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

/** Board silhouettes — u/v are normalised (-1..1) coordinates inside a layer. */
export type BoardShape =
  | "full"
  | "pyramid"
  | "heart"
  | "diamond"
  | "ring"
  | "cross"
  | "hourglass"
  | "tower"
  | "butterfly";

type Mask = (u: number, v: number, z: number, layers: number) => boolean;

export const SHAPES: Record<BoardShape, Mask> = {
  full: () => true,
  pyramid: (u, v) => Math.abs(u) <= (v + 1) / 2 + 0.12,
  heart: (u, v) => {
    const x = u * 1.15;
    const y = -v * 1.1;
    const a = x * x + y * y - 0.62;
    return a * a * a - x * x * y * y * y <= 0.02;
  },
  diamond: (u, v) => Math.abs(u) + Math.abs(v) <= 1.05,
  ring: (u, v) => Math.max(Math.abs(u), Math.abs(v)) >= 0.42,
  cross: (u, v) => Math.abs(u) <= 0.38 || Math.abs(v) <= 0.38,
  hourglass: (u, v) => Math.abs(u) <= Math.abs(v) * 0.9 + 0.28,
  tower: (u, v) => Math.abs(u) <= 0.55 || v >= 0.45,
  butterfly: (u, v) => Math.abs(u) >= 0.18 * (1 - Math.abs(v)) && Math.abs(u) + Math.abs(v) * 0.6 <= 1.1,
};

const SHAPE_ORDER: BoardShape[] = [
  "pyramid",
  "heart",
  "full",
  "diamond",
  "cross",
  "ring",
  "hourglass",
  "butterfly",
  "tower",
];

export function shapeForLevel(level: LevelConfig): BoardShape {
  const worldOrder = Math.abs(hashSeed(level.worldId)) % SHAPE_ORDER.length;
  return SHAPE_ORDER[(worldOrder + level.index) % SHAPE_ORDER.length]!;
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

  const shape = shapeForLevel(level);
  const mask = SHAPES[shape]!;

  const layers: { x: number; y: number; z: number }[][] = [];
  for (let z = 0; z < level.layers; z++) {
    const inset = z * 0.5;
    const lc = cols - z;
    const lr = rows - z;
    const layer: { x: number; y: number; z: number }[] = [];
    for (let r = 0; r < lr; r++) {
      for (let c = 0; c < lc; c++) {
        const u = lc > 1 ? (c / (lc - 1)) * 2 - 1 : 0;
        const v = lr > 1 ? (r / (lr - 1)) * 2 - 1 : 0;
        if (!mask(u, v, z, level.layers)) continue;
        layer.push({ x: c + inset, y: r + inset, z });
      }
    }
    // centre-out so partially filled layers stay compact
    const cx = (lc - 1) / 2 + inset;
    const cy = (lr - 1) / 2 + inset;
    layer.sort(
      (a, b) => Math.hypot(a.x - cx, a.y - cy) - Math.hypot(b.x - cx, b.y - cy) || a.y - b.y,
    );
    layers.push(layer);
  }

  // Shapes have fewer slots than a full rectangle — trim the tile count to a
  // multiple of three that actually fits inside the silhouette.
  const slotTotal = layers.reduce((a, l) => a + l.length, 0);
  const fit = Math.min(total, Math.floor(slotTotal / 3) * 3);
  bag.length = fit;

  const chosen: { x: number; y: number; z: number }[] = [];
  layers.forEach((layer, i) => {
    const quota =
      i === layers.length - 1
        ? fit - chosen.length
        : Math.min(layer.length, Math.round((fit * layer.length) / slotTotal));
    chosen.push(...layer.slice(0, Math.max(0, quota)));
  });
  // top-up from the base if rounding left us short
  for (const layer of layers) {
    for (const slot of layer) {
      if (chosen.length >= fit) break;
      if (!chosen.includes(slot)) chosen.push(slot);
    }
  }




  const frozenIdx = new Set<number>();
  const chainedIdx = new Set<number>();
  while (frozenIdx.size < Math.min(level.obstacles.frozen, fit))
    frozenIdx.add(Math.floor(rand() * fit));
  while (chainedIdx.size < Math.min(level.obstacles.chained, fit)) {
    const k = Math.floor(rand() * fit);
    if (!frozenIdx.has(k)) chainedIdx.add(k);
  }

  return chosen.slice(0, fit).map((s, idx) => ({
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
