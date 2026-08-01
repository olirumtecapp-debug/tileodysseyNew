import { useSave } from "@/lib/game/save";

export type MascotMood = "idle" | "happy" | "sad" | "cheer" | "think";

export function Mascot({
  mood = "idle",
  size = 120,
  className = "",
}: {
  mood?: MascotMood;
  size?: number;
  className?: string;
}) {
  const { settings } = useSave();
  const anim = settings.reduceMotion
    ? ""
    : mood === "cheer"
      ? "animate-mascot-jump"
      : mood === "happy"
        ? "animate-mascot-bounce"
        : mood === "sad"
          ? "animate-mascot-sway"
          : "animate-mascot-idle";

  const browY = mood === "sad" ? 2 : mood === "think" ? -2 : 0;
  const mouth =
    mood === "sad"
      ? "M42 70 q8 -7 16 0"
      : mood === "think"
        ? "M44 69 q6 3 12 0"
        : "M40 66 q10 12 20 0";

  return (
    <div className={`${anim} ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Tilo, a raposa exploradora">
        <ellipse cx="50" cy="94" rx="26" ry="5" fill="rgba(0,0,0,.15)" />
        {/* backpack */}
        <rect x="14" y="46" width="20" height="26" rx="8" fill="#2f8f76" />
        <rect x="18" y="52" width="12" height="8" rx="3" fill="#f7e6b8" />
        {/* body */}
        <ellipse cx="50" cy="70" rx="24" ry="22" fill="#f28c3c" />
        <ellipse cx="50" cy="76" rx="15" ry="14" fill="#fff3e0" />
        {/* tail */}
        <path d="M72 74 q22 4 16 -18 q-6 14 -20 8z" fill="#f28c3c" />
        <path d="M84 58 q6 6 4 12 q-6 -2 -8 -8z" fill="#fff3e0" />
        {/* ears */}
        <path d="M28 34 l4 -20 l16 12z" fill="#f28c3c" />
        <path d="M72 34 l-4 -20 l-16 12z" fill="#f28c3c" />
        {/* head */}
        <ellipse cx="50" cy="44" rx="26" ry="23" fill="#f9a25a" />
        <path d="M30 48 q20 20 40 0 q-20 14 -40 0z" fill="#fff3e0" />
        {/* hat */}
        <path d="M22 30 q28 -20 56 0 q-28 -8 -56 0z" fill="#2f8f76" />
        <rect x="18" y="28" width="64" height="6" rx="3" fill="#3fae90" />
        {/* eyes */}
        <g className={mood === "sad" ? "" : "animate-blink"}>
          <ellipse cx="41" cy={42 + browY} rx="4.5" ry="5.5" fill="#33261f" />
          <ellipse cx="59" cy={42 + browY} rx="4.5" ry="5.5" fill="#33261f" />
          <circle cx="42.6" cy={40 + browY} r="1.6" fill="#fff" />
          <circle cx="60.6" cy={40 + browY} r="1.6" fill="#fff" />
        </g>
        {/* nose + mouth */}
        <ellipse cx="50" cy="55" rx="4" ry="3" fill="#33261f" />
        <path d={mouth} stroke="#33261f" strokeWidth="2.2" fill="none" strokeLinecap="round" />
        {mood === "cheer" && (
          <>
            <circle cx="20" cy="20" r="3" fill="#ffd166" className="animate-sparkle" />
            <circle cx="82" cy="26" r="2.5" fill="#ffd166" className="animate-sparkle" />
          </>
        )}
        {mood === "sad" && <circle cx="63" cy="52" r="2.5" fill="#7fd4ff" className="animate-tear" />}
      </svg>
    </div>
  );
}

export function MascotSpeech({ text, mood = "idle" }: { text: string; mood?: MascotMood }) {
  return (
    <div className="flex items-end gap-2">
      <Mascot mood={mood} size={78} />
      <div className="relative mb-4 max-w-[16rem] rounded-2xl rounded-bl-sm bg-card/90 px-4 py-2 text-sm font-semibold text-card-foreground shadow-soft backdrop-blur">
        {text}
      </div>
    </div>
  );
}
