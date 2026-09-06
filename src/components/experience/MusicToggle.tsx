import { useEffect, useRef, useState } from "react";
import { Music, VolumeX } from "lucide-react";
import { MUSIC_SRC } from "@/lib/experience-content";

/** Background music. Silently does nothing until /media/music.mp3 exists. */
export function MusicToggle({ autoStart }: { autoStart: boolean }) {
  const ref = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    if (!autoStart || !ref.current) return;
    ref.current.volume = 0.35;
    ref.current
      .play()
      .then(() => setPlaying(true))
      .catch(() => setPlaying(false));
  }, [autoStart]);

  if (!available) return null;

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.volume = 0.35;
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setAvailable(false));
    }
  };

  return (
    <>
      <audio ref={ref} src={MUSIC_SRC} loop preload="none" onError={() => setAvailable(false)} />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause music" : "Play music"}
        className="glass-panel fixed right-4 top-4 z-30 grid size-11 place-items-center rounded-full text-blush transition-transform duration-300 hover:scale-105"
      >
        {playing ? <Music className="size-4" /> : <VolumeX className="size-4" />}
      </button>
    </>
  );
}
