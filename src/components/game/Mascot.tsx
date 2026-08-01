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

  const browY = mood === "sad" ? 3 : mood === "think" ? -2 : 0;
  const browTilt = mood === "sad" ? -6 : mood === "think" ? 5 : 2;
  const mouth =
    mood === "sad"
      ? "M44 66 q6 -5 12 0"
      : mood === "think"
        ? "M45 64 q5 3 10 -1"
        : "M43 63 q7 7 14 -1";

  return (
    <div className={`${anim} ${className}`} style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label="Tilo, o explorador">
        <defs>
          <linearGradient id="tiloFur" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8722c" />
            <stop offset="100%" stopColor="#b8471a" />
          </linearGradient>
          <linearGradient id="tiloCoat" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2c6f5e" />
            <stop offset="100%" stopColor="#17453c" />
          </linearGradient>
        </defs>

        <ellipse cx="50" cy="95" rx="24" ry="4" fill="rgba(0,0,0,.22)" />

        {/* tail — long and sharp */}
        <path d="M70 78 q24 2 20 -20 q-4 16 -22 12z" fill="url(#tiloFur)" />
        <path d="M86 60 q6 5 3 12 q-6 -3 -7 -9z" fill="#f4d7bb" />

        {/* torso in an explorer coat */}
        <path d="M34 92 q-2 -24 16 -28 q18 4 16 28z" fill="url(#tiloCoat)" />
        <path d="M50 64 l7 6 l-7 22 l-7 -22z" fill="#0f342d" />
        <rect x="34" y="80" width="32" height="5" rx="2.5" fill="#3c2a20" />
        <rect x="47" y="79" width="6" height="7" rx="1.5" fill="#c9a44c" />

        {/* neck / shoulders */}
        <path d="M42 62 q8 5 16 0 l2 5 q-10 6 -20 0z" fill="#14403a" />

        {/* ears — tall and angular */}
        <path d="M27 36 L30 10 L47 26z" fill="url(#tiloFur)" />
        <path d="M73 36 L70 10 L53 26z" fill="url(#tiloFur)" />
        <path d="M31 33 L33 18 L43 27z" fill="#3a241c" opacity=".55" />
        <path d="M69 33 L67 18 L57 27z" fill="#3a241c" opacity=".55" />

        {/* head — narrow, angular muzzle */}
        <path
          d="M50 20 q22 3 24 22 q2 18 -12 26 q-12 8 -24 0 q-14 -8 -12 -26 q2 -19 24 -22z"
          fill="url(#tiloFur)"
        />
        <path d="M50 44 q14 4 12 14 q-12 12 -24 0 q-2 -10 12 -14z" fill="#f7e2cd" />

        {/* cheek fur tufts */}
        <path d="M26 44 l-8 5 l9 3z" fill="#c85a22" />
        <path d="M74 44 l8 5 l-9 3z" fill="#c85a22" />

        {/* hat — worn wide-brim explorer hat */}
        <path d="M14 30 q36 -12 72 0 q-36 8 -72 0z" fill="#4a3626" />
        <path d="M30 29 q4 -16 20 -16 q16 0 20 16 q-20 -7 -40 0z" fill="#6b4d34" />
        <path d="M29 28 q21 -6 42 0 l0 3 q-21 -5 -42 0z" fill="#c9a44c" />

        {/* brows */}
        <path
          d={`M36 ${34 + browY} l10 ${browTilt}`}
          stroke="#4a2a18"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
        <path
          d={`M64 ${34 + browY} l-10 ${browTilt}`}
          stroke="#4a2a18"
          strokeWidth="2.6"
          strokeLinecap="round"
        />

        {/* eyes — narrower, confident */}
        <g className={mood === "sad" ? "" : "animate-blink"}>
          <path d={`M35 ${43 + browY} q6 -5 12 0 q-6 5 -12 0z`} fill="#fff" />
          <path d={`M53 ${43 + browY} q6 -5 12 0 q-6 5 -12 0z`} fill="#fff" />
          <circle cx="41.5" cy={43 + browY} r="2.6" fill="#2a1b14" />
          <circle cx="59.5" cy={43 + browY} r="2.6" fill="#2a1b14" />
          <circle cx="42.5" cy={42 + browY} r=".9" fill="#fff" />
          <circle cx="60.5" cy={42 + browY} r=".9" fill="#fff" />
        </g>

        {/* nose + mouth */}
        <path d="M46 53 q4 -3 8 0 q-4 4 -8 0z" fill="#2a1b14" />
        <path d={mouth} stroke="#2a1b14" strokeWidth="2" fill="none" strokeLinecap="round" />

        {mood === "cheer" && (
          <>
            <circle cx="18" cy="18" r="2.6" fill="#e8c46a" className="animate-sparkle" />
            <circle cx="84" cy="22" r="2" fill="#e8c46a" className="animate-sparkle" />
          </>
        )}
        {mood === "sad" && <circle cx="62" cy="52" r="2.2" fill="#7fd4ff" className="animate-tear" />}
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
