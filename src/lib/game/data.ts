export type Symbol = {
  id: string;
  glyph: string;
  name: string;
  category: "Frutas" | "Flores" | "Gemas" | "Tesouros" | "Criaturas";
};

export const SYMBOLS: Symbol[] = [
  { id: "apple", glyph: "🍎", name: "Maçã Rubi", category: "Frutas" },
  { id: "banana", glyph: "🍌", name: "Banana Dourada", category: "Frutas" },
  { id: "grape", glyph: "🍇", name: "Uva Selvagem", category: "Frutas" },
  { id: "melon", glyph: "🍉", name: "Melancia", category: "Frutas" },
  { id: "cherry", glyph: "🍒", name: "Cereja Gêmea", category: "Frutas" },
  { id: "peach", glyph: "🍑", name: "Pêssego Suave", category: "Frutas" },
  { id: "flower", glyph: "🌸", name: "Flor de Cerejeira", category: "Flores" },
  { id: "sunflower", glyph: "🌻", name: "Girassol", category: "Flores" },
  { id: "tulip", glyph: "🌷", name: "Tulipa", category: "Flores" },
  { id: "clover", glyph: "🍀", name: "Trevo da Sorte", category: "Flores" },
  { id: "gem", glyph: "💎", name: "Diamante Bruto", category: "Gemas" },
  { id: "crystal", glyph: "🔮", name: "Cristal Místico", category: "Gemas" },
  { id: "star", glyph: "⭐", name: "Estrela Caída", category: "Gemas" },
  { id: "key", glyph: "🗝️", name: "Chave Antiga", category: "Tesouros" },
  { id: "chest", glyph: "🧰", name: "Baú do Explorador", category: "Tesouros" },
  { id: "map", glyph: "🗺️", name: "Mapa Rasgado", category: "Tesouros" },
  { id: "bird", glyph: "🐦", name: "Passarinho", category: "Criaturas" },
  { id: "egg", glyph: "🥚", name: "Ovo Raro", category: "Criaturas" },
  { id: "butterfly", glyph: "🦋", name: "Borboleta Azul", category: "Criaturas" },
  { id: "turtle", glyph: "🐢", name: "Tartaruga Sábia", category: "Criaturas" },
];

export const symbolById = (id: string) => SYMBOLS.find((s) => s.id === id)!;

export type World = {
  id: string;
  name: string;
  subtitle: string;
  emoji: string;
  levels: number;
  pool: string[];
  sky: [string, string];
  ground: string;
  accent: string;
};

export const WORLDS: World[] = [
  {
    id: "bosque",
    name: "Bosque Sussurrante",
    subtitle: "Onde a jornada começa",
    emoji: "🌳",
    levels: 8,
    pool: ["apple", "flower", "clover", "bird", "butterfly", "grape", "star"],
    sky: ["#8fd8ff", "#d9f6ff"],
    ground: "#63c471",
    accent: "#2fb8a8",
  },
  {
    id: "montanhas",
    name: "Montanhas Nubladas",
    subtitle: "Altitudes geladas",
    emoji: "⛰️",
    levels: 8,
    pool: ["gem", "crystal", "key", "star", "turtle", "map", "melon"],
    sky: ["#a7c6ff", "#e8f2ff"],
    ground: "#7fb98a",
    accent: "#5b8cd6",
  },
  {
    id: "deserto",
    name: "Deserto Dourado",
    subtitle: "Areia e segredos",
    emoji: "🏜️",
    levels: 8,
    pool: ["chest", "key", "map", "gem", "banana", "peach", "turtle"],
    sky: ["#ffd79a", "#fff3dc"],
    ground: "#e3c07a",
    accent: "#e8a33d",
  },
  {
    id: "praia",
    name: "Praia de Coral",
    subtitle: "Ondas calmas",
    emoji: "🏖️",
    levels: 8,
    pool: ["melon", "cherry", "turtle", "star", "butterfly", "crystal", "egg"],
    sky: ["#8ee6ff", "#e6fbff"],
    ground: "#f2dfae",
    accent: "#22b8c9",
  },
  {
    id: "tropical",
    name: "Ilha Tropical",
    subtitle: "Frutas por toda parte",
    emoji: "🌴",
    levels: 8,
    pool: ["banana", "grape", "peach", "apple", "bird", "flower", "melon"],
    sky: ["#79e2c4", "#e5fff6"],
    ground: "#4fc07f",
    accent: "#12a97f",
  },
  {
    id: "templo",
    name: "Templo Esquecido",
    subtitle: "Enigmas de pedra",
    emoji: "🛕",
    levels: 8,
    pool: ["key", "chest", "crystal", "gem", "map", "star", "egg"],
    sky: ["#c9b8ff", "#f1ecff"],
    ground: "#8d9b6a",
    accent: "#8467e0",
  },
  {
    id: "encantada",
    name: "Floresta Encantada",
    subtitle: "Luz entre as folhas",
    emoji: "🍄",
    levels: 8,
    pool: ["flower", "tulip", "butterfly", "crystal", "clover", "bird", "star"],
    sky: ["#b8a6ff", "#ecf0ff"],
    ground: "#3f9f78",
    accent: "#a45fd6",
  },
  {
    id: "cidade",
    name: "Cidade Perdida",
    subtitle: "Ruínas brilhantes",
    emoji: "🏛️",
    levels: 8,
    pool: ["chest", "gem", "map", "key", "turtle", "egg", "crystal"],
    sky: ["#ffc9a6", "#fff0e4"],
    ground: "#a8a58c",
    accent: "#d97a45",
  },
  {
    id: "vulcao",
    name: "Vulcão Rugidor",
    subtitle: "Calor e coragem",
    emoji: "🌋",
    levels: 8,
    pool: ["gem", "crystal", "chest", "cherry", "star", "key", "egg"],
    sky: ["#ff9e86", "#ffe4d6"],
    ground: "#8a5a4d",
    accent: "#e2543f",
  },
  {
    id: "palacio",
    name: "Palácio de Marfim",
    subtitle: "Elegância antiga",
    emoji: "🏰",
    levels: 8,
    pool: ["gem", "key", "tulip", "star", "chest", "butterfly", "crystal"],
    sky: ["#ffe6a7", "#fffaf0"],
    ground: "#cbb98e",
    accent: "#d8a72c",
  },
  {
    id: "gelo",
    name: "Reino de Gelo",
    subtitle: "Silêncio cristalino",
    emoji: "❄️",
    levels: 8,
    pool: ["crystal", "gem", "star", "egg", "turtle", "melon", "key"],
    sky: ["#bfeeff", "#f4fdff"],
    ground: "#cfe9f2",
    accent: "#3fa9d6",
  },
  {
    id: "espaco",
    name: "Além das Estrelas",
    subtitle: "A última fronteira",
    emoji: "🚀",
    levels: 8,
    pool: ["star", "crystal", "gem", "map", "egg", "chest", "butterfly"],
    sky: ["#4a4a8f", "#9d8fe0"],
    ground: "#5c4f92",
    accent: "#7b6ce8",
  },
];

export const worldById = (id: string) => WORLDS.find((w) => w.id === id);

export type Objective = {
  kind: "clear" | "collect";
  symbolId?: string;
  amount?: number;
  label: string;
};

export type LevelConfig = {
  worldId: string;
  index: number;
  id: string;
  triples: number;
  kinds: number;
  layers: number;
  moveGoal: number;
  timeGoal: number;
  objective: Objective;
  obstacles: { frozen: number; chained: number };
};

const OBJECTIVE_TEMPLATES = [
  (s: string) => ({ kind: "collect" as const, symbolId: s, amount: 6, label: "Colete" }),
  () => ({ kind: "clear" as const, label: "Limpe a bandeja" }),
  (s: string) => ({ kind: "collect" as const, symbolId: s, amount: 9, label: "Colete" }),
];

export function buildLevel(worldId: string, index: number): LevelConfig | null {
  const world = worldById(worldId);
  if (!world || index < 1 || index > world.levels) return null;
  const worldOrder = WORLDS.findIndex((w) => w.id === worldId);
  const difficulty = worldOrder * world.levels + index;
  const kinds = Math.min(world.pool.length, 4 + Math.floor(index / 3));
  const triples = Math.min(24, 8 + Math.floor(difficulty / 3));
  const tpl = OBJECTIVE_TEMPLATES[index % OBJECTIVE_TEMPLATES.length]!;
  const targetSymbol = world.pool[index % kinds]!;
  const objective = tpl(targetSymbol);
  return {
    worldId,
    index,
    id: `${worldId}-${index}`,
    triples,
    kinds,
    layers: Math.min(4, 2 + Math.floor(index / 4)),
    moveGoal: Math.round(triples * 1.6),
    timeGoal: 45 + triples * 6,
    objective:
      objective.kind === "collect"
        ? {
            ...objective,
            amount: Math.min(objective.amount!, triples),
            label: `${objective.label} ${Math.min(objective.amount!, triples)}× ${symbolById(targetSymbol!).glyph}`,
          }
        : { ...objective, label: "Limpe todo o tabuleiro" },
    obstacles: {
      frozen: worldOrder >= 3 ? Math.min(6, Math.floor(index / 2)) : 0,
      chained: worldOrder >= 6 ? Math.min(4, Math.floor(index / 3)) : 0,
    },
  };
}
