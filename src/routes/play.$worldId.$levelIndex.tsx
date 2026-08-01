import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppFrame } from "@/components/game/AppFrame";
import { GameButton } from "@/components/game/GameButton";
import { Board } from "@/components/game/Board";
import { Tray, TRAY_SLOTS } from "@/components/game/Tray";
import { PowerUpBar, type PowerUpId } from "@/components/game/PowerUpBar";
import { VictoryScene } from "@/components/game/VictoryScene";
import { DefeatScene } from "@/components/game/DefeatScene";
import { MascotSpeech } from "@/components/game/Mascot";
import { buildLevel, worldById, symbolById, WORLDS } from "@/lib/game/data";
import { generateBoard, isCovered, starsFor, type Tile } from "@/lib/game/engine";
import { AudioManager } from "@/lib/game/audio";
import { SaveManager, useSave } from "@/lib/game/save";

export const Route = createFileRoute("/play/$worldId/$levelIndex")({
  head: () => ({
    meta: [
      { title: "Partida em andamento — Tile Odyssey" },
      {
        name: "description",
        content:
          "Combine trios de peças, use power-ups e conquiste três estrelas ao lado do Tilo nesta fase de Tile Odyssey.",
      },
      { property: "og:title", content: "Partida em andamento — Tile Odyssey" },
      {
        property: "og:description",
        content: "Combine trios, encadeie combos e conquiste três estrelas nesta fase.",
      },
    ],
  }),
  component: PlayPage,
});

const START_CHARGES: Record<PowerUpId, number> = {
  undo: 3,
  shuffle: 2,
  magnet: 2,
  hammer: 2,
  freeze: 1,
};

function PlayPage() {
  const { worldId, levelIndex } = Route.useParams();
  const navigate = useNavigate();
  const save = useSave();
  const world = worldById(worldId);
  const level = useMemo(() => buildLevel(worldId, Number(levelIndex)), [worldId, levelIndex]);

  const [salt, setSalt] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [tray, setTray] = useState<Tile[]>([]);
  const [history, setHistory] = useState<Tile[]>([]);
  const [clearing, setClearing] = useState<number[]>([]);
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [collected, setCollected] = useState(0);
  const [score, setScore] = useState(0);
  const [charges, setCharges] = useState(START_CHARGES);
  const [shaking, setShaking] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [reward, setReward] = useState({ stars: 1 as 1 | 2 | 3, xp: 0, coins: 0, found: [] as string[] });
  const lastMatch = useRef(0);
  const timeBonus = useRef(0);

  const reset = useCallback(() => {
    if (!level) return;
    setTiles(generateBoard(level, salt));
    setTray([]);
    setHistory([]);
    setStatus("playing");
    setMoves(0);
    setSeconds(0);
    setCombo(0);
    setMaxCombo(0);
    setCollected(0);
    setScore(0);
    setCharges(START_CHARGES);
    timeBonus.current = 0;
  }, [level, salt]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (status !== "playing") return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [status]);

  const timeLeft = level ? level.timeGoal + 40 + timeBonus.current - seconds : 0;

  useEffect(() => {
    if (status === "playing" && level && timeLeft <= 0) setStatus("lost");
  }, [timeLeft, status, level]);

  const showToast = (t: string) => {
    setToast(t);
    setTimeout(() => setToast(null), 1400);
  };

  const finish = useCallback(
    (won: boolean, finalScore: number, finalCombo: number, finalSeconds: number) => {
      if (!level) return;
      if (won) {
        const stars = starsFor(level, moves, finalSeconds, finalCombo);
        const xp = 40 + stars * 25 + Math.floor(finalScore / 20);
        const coins = 30 + stars * 20;
        const worldPool = worldById(level.worldId)!.pool;
        const found = worldPool.filter((s) => !save.discovered.includes(s)).slice(0, stars);
        setReward({ stars, xp, coins, found });
        SaveManager.update((s) => {
          const prev = s.results[level.id];
          return {
            ...s,
            xp: s.xp + xp,
            coins: s.coins + coins,
            gems: s.gems + (stars === 3 ? 1 : 0),
            discovered: [...new Set([...s.discovered, ...found])],
            results: {
              ...s.results,
              [level.id]: {
                stars: (Math.max(prev?.stars ?? 0, stars) as 1 | 2 | 3),
                best: Math.max(prev?.best ?? 0, finalScore),
                time: prev?.time ? Math.min(prev.time, finalSeconds) : finalSeconds,
              },
            },
            stats: {
              ...s.stats,
              levelsPlayed: s.stats.levelsPlayed + 1,
              wins: s.stats.wins + 1,
              bestCombo: Math.max(s.stats.bestCombo, finalCombo),
              totalSeconds: s.stats.totalSeconds + finalSeconds,
            },
          };
        });
        setStatus("won");
      } else {
        SaveManager.update((s) => ({
          ...s,
          stats: {
            ...s.stats,
            levelsPlayed: s.stats.levelsPlayed + 1,
            losses: s.stats.losses + 1,
            totalSeconds: s.stats.totalSeconds + finalSeconds,
          },
        }));
        setStatus("lost");
      }
    },
    [level, moves, save.discovered],
  );

  const resolveTray = useCallback(
    (next: Tile[], boardLeft: number) => {
      if (!level) return;
      const counts = new Map<string, Tile[]>();
      next.forEach((t) => counts.set(t.symbolId, [...(counts.get(t.symbolId) ?? []), t]));
      const triple = [...counts.values()].find((g) => g.length >= 3);

      if (triple) {
        const uids = triple.slice(0, 3).map((t) => t.uid);
        setClearing(uids);
        const now = Date.now();
        const chained = now - lastMatch.current < 4000;
        const newCombo = chained ? combo + 1 : 1;
        lastMatch.current = now;
        setCombo(newCombo);
        setMaxCombo((m) => Math.max(m, newCombo));
        AudioManager.match(newCombo);
        if (newCombo >= 3) showToast(`Combo x${newCombo}! 🔥`);

        const gained = 100 * newCombo;
        const nextScore = score + gained;
        setScore(nextScore);
        SaveManager.update((s) => ({
          ...s,
          stats: { ...s.stats, tilesCleared: s.stats.tilesCleared + 3 },
        }));

        const isTarget = level.objective.symbolId === triple[0]!.symbolId;
        const nextCollected = collected + (isTarget ? 3 : 0);
        if (isTarget) setCollected(nextCollected);

        setTimeout(() => {
          const remaining = next.filter((t) => !uids.includes(t.uid));
          setTray(remaining);
          setClearing([]);
          const objectiveDone =
            level.objective.kind === "collect"
              ? nextCollected >= (level.objective.amount ?? 0)
              : boardLeft === 0 && remaining.length === 0;
          if (objectiveDone) finish(true, nextScore, Math.max(maxCombo, newCombo), seconds);
          else if (boardLeft === 0 && remaining.length === 0)
            finish(true, nextScore, Math.max(maxCombo, newCombo), seconds);
        }, 260);
      } else {
        setTray(next);
        if (next.length > TRAY_SLOTS) {
          setShaking(true);
          setTimeout(() => setShaking(false), 420);
          finish(false, score, maxCombo, seconds);
        }
      }
    },
    [level, combo, score, collected, maxCombo, seconds, finish],
  );

  const selectTile = useCallback(
    (tile: Tile) => {
      if (status !== "playing" || clearing.length) return;
      AudioManager.pick(tile.z);
      const boardLeft = tiles.length - 1;
      setTiles((t) => t.filter((x) => x.uid !== tile.uid));
      setHistory((h) => [...h, tile]);
      setMoves((m) => m + 1);
      const next = [...tray, tile].sort((a, b) => a.symbolId.localeCompare(b.symbolId));
      resolveTray(next, boardLeft);
    },
    [status, clearing.length, tiles, tray, resolveTray],
  );

  const usePower = useCallback(
    (id: PowerUpId) => {
      if (status !== "playing" || charges[id] <= 0) return;
      AudioManager.power();
      setCharges((c) => ({ ...c, [id]: c[id] - 1 }));
      SaveManager.update((s) => ({
        ...s,
        stats: { ...s.stats, powerupsUsed: s.stats.powerupsUsed + 1 },
      }));

      if (id === "undo") {
        const last = history[history.length - 1];
        if (!last) return;
        setHistory((h) => h.slice(0, -1));
        setTray((t) => {
          const i = t.findIndex((x) => x.uid === last.uid);
          return i === -1 ? t : [...t.slice(0, i), ...t.slice(i + 1)];
        });
        setTiles((t) => [...t, last]);
        showToast("Jogada desfeita");
      }
      if (id === "shuffle") {
        setTiles((t) => {
          const syms = t.map((x) => x.symbolId).sort(() => Math.random() - 0.5);
          return t.map((x, i) => ({ ...x, symbolId: syms[i]! }));
        });
        showToast("Tabuleiro embaralhado!");
      }
      if (id === "hammer") {
        setTiles((t) => t.map((x) => ({ ...x, frozen: false, chained: false })));
        showToast("Gelo e correntes quebrados!");
      }
      if (id === "freeze") {
        timeBonus.current += 20;
        showToast("+20 segundos");
      }
      if (id === "magnet") {
        const free = tiles.filter((t) => !isCovered(t, tiles) && !t.frozen && !t.chained);
        const bySym = new Map<string, Tile[]>();
        tiles.forEach((t) => bySym.set(t.symbolId, [...(bySym.get(t.symbolId) ?? []), t]));
        const pick =
          [...bySym.values()].find((g) => g.length >= 3 && g.some((t) => free.includes(t))) ??
          [...bySym.values()].find((g) => g.length >= 3);
        if (!pick) return;
        const trio = pick.slice(0, 3);
        const uids = trio.map((t) => t.uid);
        const boardLeft = tiles.length - 3;
        setTiles((t) => t.filter((x) => !uids.includes(x.uid)));
        resolveTray(
          [...tray, ...trio].sort((a, b) => a.symbolId.localeCompare(b.symbolId)),
          boardLeft,
        );
        showToast("Ímã atraiu um trio!");
      }
    },
    [status, charges, history, tiles, tray, resolveTray],
  );

  if (!level || !world) {
    return (
      <AppFrame>
        <div className="grid min-h-dvh place-items-center px-4 text-center">
          <div className="rounded-3xl glass p-8 shadow-soft">
            <h1 className="font-display text-2xl font-black">Fase não encontrada</h1>
            <GameButton asChild variant="primary" className="mt-4">
              <Link to="/map">Voltar ao mapa</Link>
            </GameButton>
          </div>
        </div>
      </AppFrame>
    );
  }

  const worldOrder = WORLDS.findIndex((w) => w.id === world.id);
  const nextLevel =
    level.index < world.levels
      ? { worldId: world.id, levelIndex: String(level.index + 1) }
      : WORLDS[worldOrder + 1]
        ? { worldId: WORLDS[worldOrder + 1]!.id, levelIndex: "1" }
        : null;

  const objTotal = level.objective.amount ?? level.triples * 3;
  const objDone = level.objective.kind === "collect" ? collected : level.triples * 3 - tiles.length;

  return (
    <AppFrame sky={world.sky} ground={world.ground} accent={world.accent}>
      <div className="mx-auto flex min-h-dvh max-w-3xl flex-col gap-3 px-3 py-3">
        <div className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-3xl glass px-3 py-2 shadow-soft">
          <GameButton asChild variant="soft" size="icon" aria-label="Voltar ao mapa">
            <Link to="/map">←</Link>
          </GameButton>
          <div className="min-w-0 text-center">
            <p className="truncate font-display text-sm font-black">
              {world.emoji} {world.name} · Fase {level.index}
            </p>
            <p className="truncate text-xs font-bold text-muted-foreground">
              {level.objective.label} · {Math.max(0, Math.min(objDone, objTotal))}/{objTotal}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <span
              className={`font-display text-lg font-black tabular-nums ${timeLeft < 15 ? "text-destructive" : ""}`}
            >
              {Math.max(0, Math.floor(timeLeft / 60))}:
              {String(Math.max(0, timeLeft % 60)).padStart(2, "0")}
            </span>
            <span className="text-[11px] font-bold text-muted-foreground">{score} pts</span>
          </div>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-foreground/10">
          <div
            className="h-full rounded-full bg-emerald transition-all duration-500"
            style={{ width: `${Math.min(100, (objDone / objTotal) * 100)}%` }}
          />
        </div>

        <div className="flex flex-1 items-center justify-center py-2">
          <Board
            tiles={tiles}
            colorblind={save.settings.colorblind}
            onSelect={selectTile}
            shaking={shaking}
          />
        </div>

        {toast && (
          <p className="pointer-events-none fixed left-1/2 top-1/3 z-40 -translate-x-1/2 rounded-2xl bg-gold px-5 py-3 font-display text-xl font-black text-gold-foreground shadow-pop animate-pop-in">
            {toast}
          </p>
        )}

        <div className="sticky bottom-0 flex flex-col gap-3 pb-3">
          <Tray items={tray} clearing={clearing} />
          <PowerUpBar charges={charges} onUse={usePower} disabled={status !== "playing"} />
          {level.objective.symbolId && (
            <div className="mx-auto flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm font-bold shadow-soft">
              <span>Objetivo:</span>
              <span className="text-lg">{symbolById(level.objective.symbolId).glyph}</span>
              <span className="tabular-nums">
                {Math.min(collected, objTotal)}/{objTotal}
              </span>
            </div>
          )}
        </div>
      </div>

      {status === "won" && (
        <VictoryScene
          stars={reward.stars}
          score={score}
          xp={reward.xp}
          coins={reward.coins}
          discovered={reward.found}
          nextTo={nextLevel}
          onReplay={() => {
            setSalt((s) => s + 1);
            setStatus("playing");
          }}
        />
      )}
      {status === "lost" && (
        <DefeatScene
          reason={timeLeft <= 0 ? "O tempo acabou!" : "A bandeja ficou cheia!"}
          onRetry={() => {
            setSalt((s) => s + 1);
            setStatus("playing");
          }}
        />
      )}
      {status === "playing" && tiles.length === 0 && tray.length > 0 && (
        <div className="fixed bottom-40 left-3 z-30 hidden sm:block">
          <MascotSpeech text="Só faltam as peças da bandeja!" mood="think" />
        </div>
      )}
      <button
        type="button"
        className="sr-only"
        onClick={() => navigate({ to: "/map" })}
        aria-hidden
      />
    </AppFrame>
  );
}
