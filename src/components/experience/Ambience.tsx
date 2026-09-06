import { useMemo } from "react";

type Props = { intensity?: number };

/** Floating petals + glowing hearts + fine sparkles. Pure CSS, no dependencies. */
export function Ambience({ intensity = 1 }: Props) {
  const petals = useMemo(() => makeItems(Math.round(14 * intensity), 7), [intensity]);
  const hearts = useMemo(() => makeItems(Math.round(9 * intensity), 11), [intensity]);
  const sparks = useMemo(() => makeItems(Math.round(18 * intensity), 3), [intensity]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {petals.map((p, i) => (
        <span
          key={`p${i}`}
          className="absolute block rounded-[50%_0_50%_0] bg-blush/70 blur-[0.4px]"
          style={{
            left: p.left,
            width: p.size,
            height: p.size,
            ["--drift" as string]: p.drift,
            animation: `petal-fall ${p.duration} linear ${p.delay} infinite`,
          }}
        />
      ))}

      {hearts.map((h, i) => (
        <span
          key={`h${i}`}
          className="absolute block text-rose/60"
          style={{
            left: h.left,
            bottom: 0,
            fontSize: h.size,
            ["--drift" as string]: h.drift,
            animation: `float-up ${h.duration} ease-in ${h.delay} infinite`,
            filter: "drop-shadow(0 0 10px oklch(0.72 0.16 8 / 0.7))",
          }}
        >
          ♥
        </span>
      ))}

      {sparks.map((s, i) => (
        <span
          key={`s${i}`}
          className="absolute block rounded-full bg-glow"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            opacity: 0.5,
            animation: `soft-pulse ${s.duration} ease-in-out ${s.delay} infinite`,
            filter: "blur(0.5px)",
          }}
        />
      ))}
    </div>
  );
}

function makeItems(count: number, maxSize: number) {
  return Array.from({ length: count }, (_, i) => {
    const r = (n: number) => ((Math.sin((i + 1) * n) + 1) / 2) as number;
    return {
      left: `${Math.round(r(12.9898) * 96)}%`,
      top: `${Math.round(r(4.1414) * 92)}%`,
      size: `${Math.round(6 + r(78.233) * maxSize)}px`,
      drift: `${Math.round(-70 + r(9.7) * 140)}px`,
      duration: `${(9 + r(23.11) * 12).toFixed(1)}s`,
      delay: `${(r(31.7) * 12).toFixed(1)}s`,
    };
  });
}
