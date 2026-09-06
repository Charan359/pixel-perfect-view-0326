import { useState } from "react";
import { ImageIcon } from "lucide-react";

export function MemoryPhoto({ src, alt, id }: { src: string; alt: string; id: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="glass-panel flex aspect-[4/5] w-full flex-col items-center justify-center gap-3 rounded-2xl px-6 text-center">
        <ImageIcon className="size-7 text-blush/70" />
        <p className="font-display text-lg text-blush">{id}</p>
        <p className="text-xs text-muted-foreground">
          Add <span className="text-gold">public/media/{id}.jpg</span> to show this memory.
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[var(--shadow-soft)] ring-1 ring-border"
    />
  );
}
