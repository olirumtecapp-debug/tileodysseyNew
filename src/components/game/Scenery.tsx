import { useSave } from "@/lib/game/save";

type Props = { sky: [string, string]; ground: string; accent: string };

export function Scenery({ sky, ground, accent }: Props) {
  const { settings } = useSave();
  const clouds = settings.reduceMotion ? [] : [0, 1, 2];

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: `linear-gradient(180deg, ${sky[0]} 0%, ${sky[1]} 62%)` }}
      />
      <div
        className="absolute inset-x-0 top-0 h-1/2 opacity-60"
        style={{ background: `radial-gradient(60% 50% at 70% 0%, ${accent}44, transparent 70%)` }}
      />
      {clouds.map((i) => (
        <div
          key={i}
          className="absolute h-16 w-40 rounded-full bg-white/70 blur-[2px]"
          style={{
            top: `${8 + i * 12}%`,
            animation: `drift ${60 + i * 25}s linear infinite`,
            animationDelay: `${i * -18}s`,
          }}
        />
      ))}
      <svg
        className="absolute inset-x-0 bottom-0 h-[46vh] w-full"
        viewBox="0 0 1440 520"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 300 L220 130 L400 300 Z" fill={accent} opacity=".35" />
        <path d="M300 320 L560 110 L820 320 Z" fill={accent} opacity=".28" />
        <path d="M900 310 L1140 150 L1380 310 Z" fill={accent} opacity=".32" />
        <path d="M0 300 Q360 240 720 300 T1440 290 L1440 520 L0 520 Z" fill={ground} />
        <path
          d="M0 360 Q360 310 720 360 T1440 350 L1440 520 L0 520 Z"
          fill={ground}
          opacity=".55"
        />
        <g opacity=".65">
          {[120, 340, 620, 980, 1290].map((x, i) => (
            <g key={x} transform={`translate(${x} ${370 + (i % 2) * 24})`}>
              <rect x="-6" y="0" width="12" height="40" rx="5" fill="#7a5230" />
              <circle cx="0" cy="-8" r="34" fill="#2f8f56" />
              <circle cx="-22" cy="6" r="22" fill="#37a163" />
              <circle cx="22" cy="4" r="24" fill="#2b8350" />
            </g>
          ))}
        </g>
        <g opacity=".9">
          {[80, 260, 500, 760, 1050, 1340].map((x, i) => (
            <text key={x} x={x} y={480 - (i % 3) * 14} fontSize="26">
              {["🌷", "🌼", "🌸"][i % 3]}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
