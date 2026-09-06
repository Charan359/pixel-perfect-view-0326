type Props = {
  index: number;
  lit: boolean;
  active: boolean;
  small?: boolean;
};

export function Candle({ index, lit, active, small }: Props) {
  return (
    <div
      className={`flex flex-col items-center transition-all duration-700 ${
        active ? "scale-110" : "scale-100 opacity-80"
      }`}
    >
      <span
        className={`block origin-bottom rounded-full transition-opacity duration-700 ${
          lit ? "animate-flicker opacity-100" : "opacity-0"
        }`}
        style={{
          width: small ? 7 : 10,
          height: small ? 12 : 18,
          background:
            "radial-gradient(circle at 50% 70%, var(--glow), var(--gold) 45%, transparent 72%)",
          boxShadow: lit ? "0 0 18px var(--gold), 0 0 42px oklch(0.85 0.12 82 / 0.5)" : "none",
        }}
      />
      <span
        className="mt-1 block rounded-sm"
        style={{
          width: small ? 6 : 9,
          height: small ? 22 : 40,
          background: "linear-gradient(180deg, var(--blush), var(--rose))",
          boxShadow: active ? "0 0 22px oklch(0.72 0.16 8 / 0.6)" : "none",
          opacity: lit ? 1 : 0.55,
        }}
      />
      <span className="sr-only">{`Candle ${index + 1}${lit ? " lit" : " blown out"}`}</span>
    </div>
  );
}
