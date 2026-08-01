let ctx: AudioContext | null = null;
let muted = false;
let volume = 0.5;

function ac() {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const C = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!C) return null;
    ctx = new C();
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export const AudioManager = {
  setMuted(v: boolean) {
    muted = v;
  },
  setVolume(v: number) {
    volume = v;
  },
  tone(freq: number, duration = 0.12, type: OscillatorType = "sine", gain = 0.2, delay = 0) {
    if (muted) return;
    const c = ac();
    if (!c) return;
    const t0 = c.currentTime + delay;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0001, gain * volume), t0 + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(g).connect(c.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  },
  click() {
    this.tone(520, 0.08, "triangle", 0.15);
  },
  pick(depth = 0) {
    this.tone(440 + depth * 60, 0.1, "sine", 0.16);
  },
  match(combo = 1) {
    const base = 520 + Math.min(combo, 6) * 45;
    [0, 0.06, 0.12].forEach((d, i) => this.tone(base * (1 + i * 0.25), 0.16, "triangle", 0.18, d));
  },
  power() {
    this.tone(300, 0.25, "sawtooth", 0.12);
    this.tone(900, 0.2, "sine", 0.12, 0.05);
  },
  victory() {
    [523, 659, 784, 1046].forEach((f, i) => this.tone(f, 0.35, "triangle", 0.2, i * 0.11));
  },
  defeat() {
    [392, 330, 262].forEach((f, i) => this.tone(f, 0.4, "sine", 0.16, i * 0.14));
  },
  star(i: number) {
    this.tone(660 + i * 180, 0.3, "triangle", 0.2);
  },
};
