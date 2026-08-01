const COLORS = ["#ffd166", "#2fb8a8", "#f28c3c", "#7b6ce8", "#63c471", "#ff6b8b"];

export function Confetti({ count = 60 }: { count?: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute block rounded-[2px]"
          style={{
            left: `${(i * 37) % 100}%`,
            width: 8 + (i % 3) * 3,
            height: 12 + (i % 4) * 3,
            background: COLORS[i % COLORS.length],
            animation: `confetti-fall ${2.4 + (i % 5) * 0.5}s linear ${(i % 10) * 0.18}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Fireworks() {
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      {[
        [18, 24],
        [78, 18],
        [50, 10],
        [30, 62],
        [86, 58],
      ].map(([x, y], i) => (
        <span
          key={i}
          className="absolute h-3 w-3 rounded-full"
          style={{
            left: `${x}%`,
            top: `${y}%`,
            background: COLORS[i % COLORS.length],
            boxShadow: `0 0 24px 10px ${COLORS[i % COLORS.length]}`,
            animation: `burst 1.6s ease-out ${i * 0.35}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
