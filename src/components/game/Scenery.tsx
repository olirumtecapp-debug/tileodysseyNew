import { useSave } from "@/lib/game/save";

type Props = { sky: [string, string]; ground: string; accent: string };

export function Scenery({ sky, ground, accent }: Props) {
  const { settings } = useSave();
  const still = settings.reduceMotion;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* sky */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ background: `linear-gradient(180deg, ${sky[0]} 0%, ${sky[1]} 58%, #eaf7ff 100%)` }}
      />
      <div
        className="absolute inset-x-0 top-0 h-1/2 opacity-70"
        style={{ background: `radial-gradient(70% 55% at 72% -6%, ${accent}55, transparent 72%)` }}
      />

      {/* drifting clouds */}
      {(still ? [] : [0, 1, 2, 3, 4]).map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${5 + i * 9}%`,
            animation: `drift ${70 + i * 22}s linear infinite`,
            animationDelay: `${i * -16}s`,
            opacity: 0.85 - i * 0.09,
            transform: `scale(${1 - i * 0.12})`,
          }}
        >
          <div className="relative h-14 w-44">
            <span className="absolute bottom-0 left-0 h-10 w-44 rounded-full bg-white" />
            <span className="absolute bottom-4 left-6 h-14 w-20 rounded-full bg-white" />
            <span className="absolute bottom-3 left-24 h-11 w-16 rounded-full bg-white" />
          </div>
        </div>
      ))}

      {/* sun */}
      <div className="absolute right-[12%] top-[6%] h-24 w-24 rounded-full bg-[#fff2a8] blur-[2px] opacity-80" />
      <div className="absolute right-[12%] top-[6%] h-24 w-24 rounded-full bg-[#fffbe0]/70 blur-2xl" />

      {/* snowy peaks + lake + hills */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[58vh] w-full"
        viewBox="0 0 1440 620"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* far peaks */}
        <g opacity=".55">
          <path d="M-40 330 L200 90 L440 330 Z" fill={accent} />
          <path d="M320 340 L620 60 L920 340 Z" fill={accent} />
          <path d="M820 330 L1120 110 L1420 330 Z" fill={accent} />
        </g>
        {/* snow caps */}
        <g fill="#ffffff" opacity=".92">
          <path d="M150 145 L200 90 L250 145 L225 135 L200 150 L175 135 Z" />
          <path d="M560 120 L620 60 L680 120 L650 108 L620 126 L590 108 Z" />
          <path d="M1065 163 L1120 110 L1175 163 L1148 152 L1120 168 L1092 152 Z" />
        </g>
        {/* lake */}
        <path d="M0 320 Q360 292 720 320 T1440 312 L1440 420 L0 420 Z" fill="#37b7f0" opacity=".9" />
        <g fill="#ffffff" opacity=".5">
          <rect x="180" y="342" width="140" height="6" rx="3" />
          <rect x="640" y="366" width="200" height="6" rx="3" />
          <rect x="1040" y="350" width="160" height="6" rx="3" />
        </g>
        {/* hills */}
        <path d="M0 400 Q380 340 760 400 T1440 388 L1440 620 L0 620 Z" fill={ground} />
        <path d="M0 400 Q380 340 760 400 T1440 388 L1440 430 L0 442 Z" fill="#ffffff" opacity=".2" />
        <path
          d="M0 462 Q380 412 760 462 T1440 452 L1440 620 L0 620 Z"
          fill={ground}
          opacity=".6"
        />
        {/* trees */}
        <g opacity=".8">
          {[90, 250, 470, 700, 940, 1180, 1360].map((x, i) => (
            <g key={x} transform={`translate(${x} ${452 + (i % 3) * 26})`}>
              <rect x="-6" y="0" width="12" height="42" rx="5" fill="#7a5230" />
              <circle cx="0" cy="-10" r="32" fill="#2f8f56" />
              <circle cx="-22" cy="6" r="21" fill="#37a163" />
              <circle cx="22" cy="4" r="23" fill="#2b8350" />
            </g>
          ))}
        </g>
        <g opacity=".95">
          {[60, 240, 430, 660, 900, 1130, 1350].map((x, i) => (
            <text key={x} x={x} y={575 - (i % 3) * 16} fontSize="24">
              {["🌷", "🌼", "🌸"][i % 3]}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}
