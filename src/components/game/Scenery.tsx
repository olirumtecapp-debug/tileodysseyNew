import { useSave } from "@/lib/game/save";

type Props = { sky: [string, string]; ground: string; accent: string };

export function Scenery({ sky, ground, accent }: Props) {
  const { settings } = useSave();
  const still = settings.reduceMotion;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Rich Sky with Rays */}
      <div
        className="absolute inset-0 transition-colors duration-700"
        style={{ 
          background: `linear-gradient(180deg, ${sky[0]} 0%, ${sky[1]} 60%, #eaf7ff 100%)` 
        }}
      />
      
      {/* Sun with atmospheric glow */}
      <div className="absolute right-[12%] top-[8%] h-32 w-32 rounded-full bg-[#fff2a8] blur-[4px] opacity-90 animate-pulse" />
      <div className="absolute right-[8%] top-[4%] h-48 w-48 rounded-full bg-[#fffbe0]/40 blur-3xl" />
      
      {/* Subtle Light Rays */}
      {!still && (
        <div className="absolute inset-0 opacity-20 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute top-[-20%] left-[60%] h-[140%] w-16 bg-white blur-3xl transform -rotate-12"
              style={{
                left: `${60 + i * 8}%`,
                opacity: 0.1 + (i % 3) * 0.1,
                animation: `float-soft ${8 + i * 2}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds with volume/shadow */}
      {(still ? [] : [0, 1, 2, 3, 4]).map((i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: `${8 + i * 10}%`,
            animation: `drift ${80 + i * 25}s linear infinite`,
            animationDelay: `${i * -20}s`,
            opacity: 0.9 - i * 0.1,
            transform: `scale(${1.1 - i * 0.15})`,
          }}
        >
          <div className="relative h-16 w-52 drop-shadow-md">
            <span className="absolute bottom-0 left-0 h-12 w-52 rounded-full bg-white" />
            <span className="absolute bottom-4 left-8 h-16 w-24 rounded-full bg-white" />
            <span className="absolute bottom-3 left-32 h-14 w-20 rounded-full bg-white" />
            {/* Cloud shadow base */}
            <span className="absolute bottom-0 left-4 h-2 w-44 rounded-full bg-slate-200/30" />
          </div>
        </div>
      ))}

      {/* Landscape SVG */}
      <svg
        className="absolute inset-x-0 bottom-0 h-[62vh] w-full"
        viewBox="0 0 1440 620"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hillGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="white" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.2" />
          </filter>
        </defs>

        {/* Far Temples & Ruins (New) */}
        <g opacity=".4" transform="translate(100 240) scale(0.6)">
           <rect x="0" y="0" width="80" height="120" fill={accent} />
           <path d="M-20 0 L100 0 L40 -40 Z" fill={accent} />
           <rect x="20" y="40" width="15" height="40" fill="rgba(0,0,0,0.2)" />
        </g>
        <g opacity=".35" transform="translate(1200 220) scale(0.5)">
           <rect x="0" y="0" width="100" height="150" fill={accent} />
           <path d="M-10 0 L110 0 L50 -50 Z" fill={accent} />
        </g>

        {/* Far snowy peaks */}
        <g opacity=".6">
          <path d="M-60 350 L220 70 L500 350 Z" fill={accent} />
          <path d="M300 360 L650 40 L1000 360 Z" fill={accent} />
          <path d="M850 350 L1200 90 L1550 350 Z" fill={accent} />
        </g>
        
        {/* Snow caps with more detail */}
        <g fill="#ffffff" opacity=".95">
          <path d="M160 135 L220 70 L280 135 L250 125 L220 145 L190 125 Z" />
          <path d="M580 100 L650 40 L720 100 L685 88 L650 110 L615 88 Z" />
          <path d="M1130 140 L1200 90 L1270 140 L1235 128 L1200 150 L1165 128 Z" />
        </g>

        {/* Distant Waterfall (New) */}
        <rect x="642" y="110" width="16" height="220" fill="#a5f3fc" opacity=".6" />
        <rect x="646" y="110" width="8" height="220" fill="white" opacity=".4" />

        {/* Lake */}
        <path d="M0 320 Q360 292 720 320 T1440 312 L1440 450 L0 450 Z" fill="#2563eb" opacity=".85" />
        {/* Lake reflections */}
        <g fill="#ffffff" opacity=".4">
          <rect x="200" y="360" width="180" height="4" rx="2" />
          <rect x="700" y="380" width="240" height="4" rx="2" />
          <rect x="1100" y="370" width="140" height="4" rx="2" />
        </g>

        {/* Dense Hills */}
        <path d="M0 420 Q380 360 760 420 T1440 408 L1440 620 L0 620 Z" fill={ground} />
        <path d="M0 420 Q380 360 760 420 T1440 408 L1440 480 L0 492 Z" fill="url(#hillGrad)" />
        
        <path
          d="M0 480 Q380 430 760 480 T1440 470 L1440 620 L0 620 Z"
          fill={ground}
          opacity=".7"
        />

        {/* Foreground Trees - More detail */}
        <g filter="url(#shadow)">
          {[70, 280, 520, 780, 1050, 1280].map((x, i) => (
            <g key={x} transform={`translate(${x} ${470 + (i % 3) * 30})`}>
              <rect x="-8" y="0" width="16" height="60" rx="4" fill="#5c3d24" />
              <circle cx="0" cy="-15" r="40" fill="#166534" />
              <circle cx="-28" cy="5" r="28" fill="#15803d" />
              <circle cx="28" cy="2" r="30" fill="#14532d" />
              {/* Highlights on leaves */}
              <circle cx="-15" cy="-25" r="8" fill="white" opacity="0.1" />
            </g>
          ))}
        </g>

        {/* Richer Flowers */}
        <g opacity=".95">
          {[40, 180, 360, 600, 850, 1100, 1380].map((x, i) => (
            <text key={x} x={x} y={585 - (i % 4) * 12} fontSize="28" className="animate-bounce" style={{ animationDelay: `${i * 0.2}s`, animationDuration: '3s' }}>
              {["🌿", "🌸", "🌺", "🌼"][i % 4]}
            </text>
          ))}
        </g>
      </svg>
    </div>
  );
}