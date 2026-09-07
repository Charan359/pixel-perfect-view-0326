import { useEffect, useRef, useState } from "react";
import { Heart, Play } from "lucide-react";
import treeArt from "@/assets/romantic-tree.jpg";
import { GlowButton } from "./GlowButton";
import { Candle } from "./Candle";
import { MemoryPhoto } from "./MemoryPhoto";
import {
  CAKE,
  CAKE_INTRO,
  ENDING,
  FINAL_NOTE,
  FINAL_VIDEO_SRC,
  MEMORIES,
  OPENING,
  WISH,
} from "@/lib/experience-content";

const shell = "relative z-10 mx-auto flex min-h-[100svh] w-full max-w-2xl flex-col items-center justify-center px-6 py-14 text-center";

/* ---------------- 1. Opening ---------------- */

export function OpeningStage({ onNext }: { onNext: () => void }) {
  return (
    <section className={shell}>
      <img
        src={treeArt}
        alt="A glowing heart-shaped blossom tree at dusk"
        width={1536}
        height={1024}
        className="pointer-events-none absolute inset-0 -z-10 size-full object-cover opacity-40 [mask-image:radial-gradient(70%_60%_at_50%_45%,black,transparent)]"
      />
      <p className="animate-fade-soft text-xs tracking-[0.4em] uppercase text-blush/80">
        {OPENING.kicker}
      </p>
      <h1
        className="animate-fade-rise mt-6 text-gradient-blush text-5xl leading-tight sm:text-7xl"
        style={{ animationDelay: "0.3s" }}
      >
        {OPENING.title}
      </h1>
      <p
        className="animate-fade-rise mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base"
        style={{ animationDelay: "0.8s" }}
      >
        {OPENING.subtitle}
      </p>
      <div className="animate-fade-rise mt-12" style={{ animationDelay: "1.4s" }}>
        <GlowButton onClick={onNext}>{OPENING.cta}</GlowButton>
      </div>
      <Heart className="animate-soft-pulse mt-14 size-5 text-rose" />
    </section>
  );
}

/* ---------------- 2. Wish — cupid's arrow ---------------- */

const BURST = [
  { bx: "-70px", by: "-64px", size: 14 },
  { bx: "64px", by: "-78px", size: 18 },
  { bx: "-96px", by: "6px", size: 12 },
  { bx: "92px", by: "12px", size: 14 },
  { bx: "-46px", by: "72px", size: 16 },
  { bx: "52px", by: "66px", size: 12 },
  { bx: "0px", by: "-96px", size: 15 },
  { bx: "10px", by: "88px", size: 13 },
];

export function WishStage({ onNext }: { onNext: () => void }) {
  return (
    <section className={shell}>
      <p className="animate-fade-soft text-xs tracking-[0.4em] uppercase text-blush/80">
        {WISH.kicker}
      </p>

      {/* the scene: bow → arrow → heart */}
      <div className="relative mt-6 h-64 w-full max-w-lg">
        {/* bow */}
        <svg
          viewBox="0 0 120 160"
          aria-hidden
          className="absolute top-1/2 left-0 h-40 w-auto -translate-y-1/2 text-gold"
          style={{
            animation:
              "bow-in 0.9s var(--ease-cinematic) 0.3s both, bow-out 0.7s ease 2.7s both",
          }}
        >
          <path
            d="M34 8 Q96 80 34 152"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
          />
          <g className="text-blush/70" stroke="currentColor" strokeWidth="1.5" fill="none">
            <path
              d="M34 8 L72 80 L34 152"
              style={{ animation: "string-pulled 1.9s linear 0.7s both" }}
            />
            <line
              x1="34"
              y1="8"
              x2="34"
              y2="152"
              style={{ animation: "string-straight 1.9s linear 0.7s both" }}
            />
          </g>
        </svg>

        {/* arrow */}
        <div
          aria-hidden
          className="absolute top-1/2 flex -translate-y-1/2 items-center text-gold"
          style={{
            animation:
              "arrow-fly 1.9s cubic-bezier(0.4,0,0.7,1) 0.7s both, arrow-gone 0.4s ease 3s both",
          }}
        >
          <span className="h-0.5 w-14 rounded-full bg-[image:var(--gradient-gold)] sm:w-20" />
          <Heart className="-ml-1 size-4" fill="currentColor" strokeWidth={0} />
        </div>

        {/* heart + burst */}
        <div className="absolute top-1/2 right-6 -translate-y-1/2 sm:right-10">
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-rose/40 blur-2xl"
            style={{ animation: "hit-flash 1.4s ease-out 2.55s both" }}
          />
          <div style={{ animation: "heart-hit 0.9s var(--ease-cinematic) 2.55s both" }}>
            <Heart
              className="animate-soft-pulse size-16 text-rose drop-shadow-[0_0_18px_var(--rose)] sm:size-20"
              fill="currentColor"
              strokeWidth={0}
            />
          </div>
          {BURST.map((p, i) => (
            <Heart
              key={i}
              aria-hidden
              fill="currentColor"
              strokeWidth={0}
              className="absolute top-1/2 left-1/2 -mt-2 -ml-2 text-blush"
              style={{
                width: p.size,
                height: p.size,
                ["--bx" as string]: p.bx,
                ["--by" as string]: p.by,
                animation: `heart-burst 1.2s ease-out ${2.55 + i * 0.04}s both`,
              }}
            />
          ))}
        </div>
      </div>

      {/* the message */}
      <h2
        className="animate-fade-rise text-gradient-gold mt-4 text-5xl sm:text-6xl"
        style={{ animationDelay: "3.4s" }}
      >
        {WISH.title}
      </h2>
      {WISH.lines.map((line, i) => (
        <p
          key={i}
          className="animate-fade-rise mt-4 font-display text-2xl text-foreground/90 italic sm:text-3xl"
          style={{ animationDelay: `${4 + i * 0.7}s` }}
        >
          {line} ♡
        </p>
      ))}
      <div className="animate-fade-rise mt-12" style={{ animationDelay: "4.8s" }}>
        <GlowButton onClick={onNext}>{WISH.cta}</GlowButton>
      </div>
    </section>
  );
}

/* ---------------- 3. Cake introduction ---------------- */

const SPARKLES = [
  { left: "12%", top: "18%", size: 10, delay: 0 },
  { left: "84%", top: "14%", size: 8, delay: 0.5 },
  { left: "8%", top: "55%", size: 7, delay: 1 },
  { left: "90%", top: "48%", size: 11, delay: 1.4 },
  { left: "24%", top: "8%", size: 6, delay: 0.8 },
  { left: "70%", top: "6%", size: 9, delay: 1.1 },
  { left: "4%", top: "34%", size: 8, delay: 1.7 },
  { left: "94%", top: "70%", size: 7, delay: 0.3 },
  { left: "30%", top: "82%", size: 9, delay: 1.5 },
  { left: "66%", top: "86%", size: 6, delay: 0.9 },
];

const LINE_DELAYS = [3.6, 6.2, 8.8, 11.2]; // seconds
const DIM_DELAY = 13.2;
const ADVANCE_DELAY = 14.6;

export function CakeIntroStage({ onNext }: { onNext: () => void }) {
  useEffect(() => {
    const t = setTimeout(onNext, ADVANCE_DELAY * 1000);
    return () => clearTimeout(t);
  }, [onNext]);

  return (
    <section
      className={shell}
      style={{ animation: `scene-dim 1.4s ease ${DIM_DELAY}s both` }}
    >
      {/* warm spotlight behind the cake */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-1/2 -z-10 size-[36rem] max-w-[140vw] -translate-x-1/2 -translate-y-[62%] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, oklch(0.75 0.1 75 / 0.35), oklch(0.6 0.12 15 / 0.18) 45%, transparent 72%)",
          animation: "spotlight-on 2.6s ease-out 2.8s both",
        }}
      />

      {/* the cake */}
      <div
        className="relative w-64 sm:w-80"
        style={{ animation: "cake-focus 3.2s var(--ease-cinematic) 0.2s both" }}
      >
        <div
          aria-hidden
          className="absolute -inset-10 -z-10 rounded-full bg-rose/25 blur-3xl"
          style={{ animation: "spotlight-on 2.4s ease-out 2.8s both" }}
        />
        <svg viewBox="0 0 240 260" role="img" aria-label="An elegant birthday cake" className="w-full drop-shadow-[0_18px_40px_oklch(0.3_0.08_15/0.6)]">
          <defs>
            <linearGradient id="tierCream" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.95 0.03 25)" />
              <stop offset="100%" stopColor="oklch(0.86 0.05 15)" />
            </linearGradient>
            <linearGradient id="tierBlush" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.9 0.06 10)" />
              <stop offset="100%" stopColor="oklch(0.78 0.09 8)" />
            </linearGradient>
            <linearGradient id="plateGold" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.62 0.11 75)" />
              <stop offset="50%" stopColor="oklch(0.85 0.12 85)" />
              <stop offset="100%" stopColor="oklch(0.62 0.11 75)" />
            </linearGradient>
          </defs>

          {/* gold plate */}
          <ellipse cx="120" cy="238" rx="104" ry="12" fill="url(#plateGold)" opacity="0.9" />
          <ellipse cx="120" cy="234" rx="92" ry="9" fill="oklch(0.3 0.05 15)" />

          {/* bottom tier */}
          <rect x="42" y="186" width="156" height="48" rx="10" fill="url(#tierCream)" />
          <path
            d="M42 196 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 20 0 q10 14 16 2 v-12 h-156 Z"
            fill="oklch(0.8 0.08 8)"
          />
          {/* middle tier */}
          <rect x="62" y="142" width="116" height="44" rx="9" fill="url(#tierBlush)" />
          <path
            d="M62 151 q9.5 12 19 0 q9.5 12 19 0 q9.5 12 19 0 q9.5 12 19 0 q9.5 12 19 0 q9.5 12 21 2 v-11 h-116 Z"
            fill="oklch(0.93 0.03 20)"
          />
          {/* top tier */}
          <rect x="82" y="102" width="76" height="40" rx="8" fill="url(#tierCream)" />
          <path
            d="M82 110 q9.5 11 19 0 q9.5 11 19 0 q9.5 11 19 0 q9.5 11 19 0 v-8 h-76 Z"
            fill="oklch(0.82 0.08 8)"
          />

          {/* gold ribbon lines */}
          <rect x="42" y="224" width="156" height="3" rx="1.5" fill="oklch(0.78 0.12 80)" opacity="0.85" />
          <rect x="62" y="178" width="116" height="2.5" rx="1.2" fill="oklch(0.78 0.12 80)" opacity="0.85" />

          {/* heart decorations */}
          <g fill="oklch(0.62 0.2 8)">
            <path d="M120 214 c-3 -5 -11 -5 -11 1 c0 5 6 8 11 12 c5 -4 11 -7 11 -12 c0 -6 -8 -6 -11 -1 Z" />
            <path d="M70 208 c-2 -3.5 -8 -3.5 -8 0.7 c0 3.6 4.3 5.8 8 8.7 c3.7 -2.9 8 -5.1 8 -8.7 c0 -4.2 -6 -4.2 -8 -0.7 Z" opacity="0.85" />
            <path d="M170 208 c-2 -3.5 -8 -3.5 -8 0.7 c0 3.6 4.3 5.8 8 8.7 c3.7 -2.9 8 -5.1 8 -8.7 c0 -4.2 -6 -4.2 -8 -0.7 Z" opacity="0.85" />
            <path d="M120 162 c-2.4 -4 -9 -4 -9 0.8 c0 4 4.8 6.4 9 9.6 c4.2 -3.2 9 -5.6 9 -9.6 c0 -4.8 -6.6 -4.8 -9 -0.8 Z" opacity="0.9" />
          </g>

          {/* small flowers */}
          <g>
            {[
              [52, 178],
              [188, 178],
              [74, 136],
              [166, 136],
              [120, 96],
            ].map(([x, y], i) => (
              <g key={i} transform={`translate(${x} ${y})`} fill="oklch(0.88 0.06 350)">
                {[0, 72, 144, 216, 288].map((a) => (
                  <ellipse key={a} cx="0" cy="-3.4" rx="2" ry="3.4" transform={`rotate(${a})`} />
                ))}
                <circle r="1.8" fill="oklch(0.82 0.13 80)" />
              </g>
            ))}
          </g>

          {/* soft candle glow at the top */}
          <ellipse cx="120" cy="86" rx="26" ry="14" fill="oklch(0.9 0.1 85)" opacity="0.35" />
        </svg>

        {/* sparkles */}
        {SPARKLES.map((s, i) => (
          <span
            key={i}
            aria-hidden
            className="absolute rounded-full bg-gold shadow-[0_0_10px_var(--gold)]"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animation: `sparkle-twinkle 2.2s ease-in-out ${2.4 + s.delay}s infinite`,
              clipPath:
                "polygon(50% 0%, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0% 50%, 38% 38%)",
            }}
          />
        ))}
      </div>

      {/* timed lines */}
      <div className="mt-10 space-y-4">
        {CAKE_INTRO.lines.map((line, i) => (
          <p
            key={i}
            className={
              i === CAKE_INTRO.lines.length - 1
                ? "text-gradient-gold font-display text-2xl sm:text-3xl"
                : "font-display text-xl text-foreground/90 italic sm:text-2xl"
            }
            style={{ animation: `cake-line 1s var(--ease-cinematic) ${LINE_DELAYS[i]}s both` }}
          >
            {line}
          </p>
        ))}
      </div>
    </section>
  );
}

/* ---------------- 3+4. Cake, candles, memories ---------------- */

export function CandleStage({ onFinished }: { onFinished: () => void }) {
  const [current, setCurrent] = useState(0);
  const [blowing, setBlowing] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const memory = MEMORIES[current]!;

  const stopBlow = () => {
    if (timer.current) clearInterval(timer.current);
    timer.current = null;
    setBlowing((v) => (v >= 100 ? v : 0));
  };

  const startBlow = () => {
    if (revealed || timer.current) return;
    timer.current = setInterval(() => {
      setBlowing((v) => {
        if (v >= 100) {
          stopBlow();
          setRevealed(true);
          return 100;
        }
        return v + 6;
      });
    }, 45);
  };

  useEffect(() => () => stopBlow(), []);

  const next = () => {
    if (current === MEMORIES.length - 1) {
      onFinished();
      return;
    }
    setRevealed(false);
    setBlowing(0);
    setCurrent((c) => c + 1);
  };

  return (
    <section className={shell}>
      {!revealed ? (
        <div key={`c${current}`} className="animate-fade-soft flex w-full flex-col items-center">
          <p className="text-xs tracking-[0.4em] uppercase text-blush/80">
            Candle {current + 1} of {MEMORIES.length}
          </p>
          <h2 className="mt-4 text-gradient-blush text-3xl sm:text-4xl">{CAKE.title}</h2>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{CAKE.subtitle}</p>

          <div className="relative mt-12 flex w-full flex-col items-center">
            {/* one candle at a time — the surrounding dark keeps the focus on the flame */}
            <div
              aria-hidden
              className="absolute -inset-x-10 -top-16 bottom-0 -z-10"
              style={{
                background:
                  "radial-gradient(45% 40% at 50% 38%, oklch(0.9 0.1 85 / 0.16), transparent 70%)",
              }}
            />
            <Candle index={current} lit active />
            <div
              className="mt-4 h-20 w-64 max-w-full rounded-2xl glass-panel"
              style={{
                background:
                  "linear-gradient(180deg, oklch(0.9 0.06 10 / 0.35), oklch(0.45 0.14 12 / 0.5))",
              }}
            />
          </div>

          <div className="mt-12 w-full max-w-xs">
            <div className="h-1 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-[image:var(--gradient-gold)] transition-all duration-100"
                style={{ width: `${blowing}%` }}
              />
            </div>
            <GlowButton
              tone="gold"
              className="mt-6 w-full select-none"
              onPointerDown={startBlow}
              onPointerUp={stopBlow}
              onPointerLeave={stopBlow}
              onPointerCancel={stopBlow}
            >
              Hold to blow
            </GlowButton>
            <p className="mt-3 text-[11px] tracking-wider uppercase text-muted-foreground">
              Press and hold
            </p>
          </div>
        </div>
      ) : (
        <div key={`m${current}`} className="animate-reveal flex w-full flex-col items-center">
          <p className="text-xs tracking-[0.4em] uppercase text-gold">Year {memory.year}</p>
          <h2 className="mt-3 text-gradient-blush text-3xl sm:text-4xl">{memory.title}</h2>
          <div className="mt-8 w-full max-w-xs">
            <MemoryPhoto src={memory.photo} alt={memory.title} id={memory.id} />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {memory.note}
          </p>
          <GlowButton className="mt-10" onClick={next}>
            {current === MEMORIES.length - 1 ? "Something for you" : "Next candle"}
          </GlowButton>
        </div>
      )}
    </section>
  );
}

/* ---------------- 5. Personal note ---------------- */

export function NoteStage({ onNext }: { onNext: () => void }) {
  return (
    <section className={shell}>
      <div className="glass-panel animate-reveal w-full rounded-3xl px-7 py-12 text-left sm:px-12">
        <h2 className="text-gradient-gold text-center text-4xl">{FINAL_NOTE.title}</h2>
        <div className="mt-8 space-y-5">
          {FINAL_NOTE.body.map((p, i) => (
            <p
              key={i}
              className="animate-fade-rise font-display text-lg leading-relaxed text-foreground/90"
              style={{ animationDelay: `${0.5 + i * 0.6}s` }}
            >
              {p}
            </p>
          ))}
        </div>
        <p className="mt-10 text-right font-display text-xl text-blush">
          {FINAL_NOTE.signature}
        </p>
      </div>
      <GlowButton className="mt-12" onClick={onNext}>
        {FINAL_NOTE.cta}
      </GlowButton>
    </section>
  );
}

/* ---------------- 6. Final video ---------------- */

export function VideoStage({ onNext }: { onNext: () => void }) {
  const [failed, setFailed] = useState(false);

  return (
    <section className={shell}>
      <h2 className="text-gradient-blush text-4xl">Made for you</h2>
      <p className="mt-3 text-sm text-muted-foreground">Turn the sound up.</p>

      <div className="mt-9 w-full">
        {failed ? (
          <div className="glass-panel flex aspect-video w-full flex-col items-center justify-center gap-3 rounded-2xl px-6 text-center">
            <Play className="size-7 text-blush/70" />
            <p className="font-display text-lg text-blush">finalBirthdayVideo</p>
            <p className="text-xs text-muted-foreground">
              Add <span className="text-gold">public/media/finalBirthdayVideo.mp4</span> to play it
              here.
            </p>
          </div>
        ) : (
          <video
            src={FINAL_VIDEO_SRC}
            controls
            playsInline
            onError={() => setFailed(true)}
            onEnded={onNext}
            className="aspect-video w-full rounded-2xl bg-secondary object-cover shadow-[var(--shadow-soft)] ring-1 ring-border"
          />
        )}
      </div>

      <GlowButton tone="ghost" className="mt-10" onClick={onNext}>
        Continue
      </GlowButton>
    </section>
  );
}

/* ---------------- 7. Ending ---------------- */

export function EndingStage({ onReplay }: { onReplay: () => void }) {
  return (
    <section className={shell}>
      <Heart className="animate-soft-pulse size-8 text-rose" />
      <h2 className="animate-fade-rise mt-8 text-gradient-gold text-5xl sm:text-6xl">
        {ENDING.title}
      </h2>
      <p
        className="animate-fade-rise mt-6 max-w-sm font-display text-xl text-foreground/90"
        style={{ animationDelay: "0.7s" }}
      >
        {ENDING.subtitle}
      </p>
      <div className="animate-fade-rise mt-14" style={{ animationDelay: "1.3s" }}>
        <GlowButton tone="ghost" onClick={onReplay}>
          {ENDING.replay}
        </GlowButton>
      </div>
    </section>
  );
}
