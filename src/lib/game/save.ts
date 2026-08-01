import { useSyncExternalStore } from "react";

export type LevelResult = { stars: 1 | 2 | 3; best: number; time: number };

export type Settings = {
  sound: boolean;
  music: boolean;
  reduceMotion: boolean;
  colorblind: boolean;
  highContrast: boolean;
  leftHanded: boolean;
  uiScale: number;
};

export type SaveData = {
  name: string;
  avatar: string;
  xp: number;
  coins: number;
  gems: number;
  keys: number;
  results: Record<string, LevelResult>;
  discovered: string[];
  owned: string[];
  equipped: string | null;
  stats: {
    levelsPlayed: number;
    wins: number;
    losses: number;
    bestCombo: number;
    tilesCleared: number;
    totalSeconds: number;
    powerupsUsed: number;
  };
  missions: { day: string; progress: Record<string, number>; claimed: string[] };
  streak: { day: string; count: number };
  settings: Settings;
};

const KEY = "tile-odyssey-save-v1";

const initial: SaveData = {
  name: "Explorador",
  avatar: "🦊",
  xp: 0,
  coins: 250,
  gems: 12,
  keys: 3,
  results: {},
  discovered: [],
  owned: ["theme-bosque"],
  equipped: "theme-bosque",
  stats: {
    levelsPlayed: 0,
    wins: 0,
    losses: 0,
    bestCombo: 0,
    tilesCleared: 0,
    totalSeconds: 0,
    powerupsUsed: 0,
  },
  missions: { day: "", progress: {}, claimed: [] },
  streak: { day: "", count: 0 },
  settings: {
    sound: true,
    music: true,
    reduceMotion: false,
    colorblind: false,
    highContrast: false,
    leftHanded: false,
    uiScale: 1,
  },
};

let state: SaveData = initial;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SaveData>;
      state = {
        ...initial,
        ...parsed,
        stats: { ...initial.stats, ...(parsed.stats ?? {}) },
        settings: { ...initial.settings, ...(parsed.settings ?? {}) },
        missions: { ...initial.missions, ...(parsed.missions ?? {}) },
        streak: { ...initial.streak, ...(parsed.streak ?? {}) },
      };
    }
  } catch {
    /* ignore corrupted save */
  }
  const today = new Date().toISOString().slice(0, 10);
  if (state.streak.day !== today) {
    const yesterday = new Date(Date.now() - 864e5).toISOString().slice(0, 10);
    state = {
      ...state,
      streak: { day: today, count: state.streak.day === yesterday ? state.streak.count + 1 : 1 },
      missions:
        state.missions.day === today ? state.missions : { day: today, progress: {}, claimed: [] },
    };
    persist();
  }
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or unavailable */
  }
}

export const SaveManager = {
  get: () => state,
  update(fn: (s: SaveData) => SaveData) {
    load();
    state = fn(state);
    persist();
    listeners.forEach((l) => l());
  },
  reset() {
    state = initial;
    persist();
    listeners.forEach((l) => l());
  },
  subscribe(l: () => void) {
    load();
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function useSave(): SaveData {
  return useSyncExternalStore(
    SaveManager.subscribe,
    () => {
      load();
      return state;
    },
    () => initial,
  );
}

export const levelFromXp = (xp: number) => Math.floor(Math.sqrt(xp / 60)) + 1;
export const xpForLevel = (lvl: number) => Math.pow(lvl - 1, 2) * 60;

export function totalStars(s: SaveData) {
  return Object.values(s.results).reduce((a, r) => a + r.stars, 0);
}
