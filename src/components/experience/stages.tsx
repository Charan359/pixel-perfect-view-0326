import { useEffect, useRef, useState } from "react";
import { Heart, Play } from "lucide-react";
import treeArt from "@/assets/romantic-tree.jpg";
import { GlowButton } from "./GlowButton";
import { Candle } from "./Candle";
import { MemoryPhoto } from "./MemoryPhoto";
import {
  CAKE,
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

/* ---------------- 2. Wish ---------------- */

export function WishStage({ onNext }: { onNext: () => void }) {
  return (
    <section className={shell}>
      <h2 className="animate-fade-rise text-gradient-gold text-4xl sm:text-5xl">{WISH.title}</h2>
      <div className="mt-10 space-y-6">
        {WISH.lines.map((line, i) => (
          <p
            key={i}
            className="animate-fade-rise font-display text-xl leading-relaxed text-foreground/90 sm:text-2xl"
            style={{ animationDelay: `${0.6 + i * 0.9}s` }}
          >
            {line}
          </p>
        ))}
      </div>
      <div
        className="animate-fade-rise mt-14"
        style={{ animationDelay: `${0.6 + WISH.lines.length * 0.9}s` }}
      >
        <GlowButton onClick={onNext}>{WISH.cta}</GlowButton>
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

  const memory = MEMORIES[current];

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
            <div className="flex flex-wrap items-end justify-center gap-x-2 gap-y-3 px-2">
              {MEMORIES.map((m, i) => (
                <Candle key={m.id} index={i} lit={i >= current} active={i === current} small />
              ))}
            </div>
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
