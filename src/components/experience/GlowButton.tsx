import type { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { tone?: "rose" | "gold" | "ghost" };

export function GlowButton({ tone = "rose", className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm tracking-[0.18em] uppercase transition-all duration-500 active:scale-[0.97]",
        tone === "rose" &&
          "bg-[image:var(--gradient-blush)] text-accent-foreground shadow-[var(--shadow-glow)] hover:brightness-110",
        tone === "gold" &&
          "bg-[image:var(--gradient-gold)] text-accent-foreground shadow-[0_0_40px_oklch(0.85_0.12_82/0.45)] hover:brightness-110",
        tone === "ghost" && "glass-panel text-blush hover:text-glow",
        className,
      )}
    />
  );
}
