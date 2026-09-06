/**
 * All personal content lives here — edit this one file to personalise everything.
 *
 * Media files go in `public/media/` using these exact names:
 *   memory01.jpg ... memory20.jpg   (photos, one per candle)
 *   finalBirthdayVideo.mp4          (the closing 2-3 minute video)
 *   music.mp3                       (optional background music)
 *
 * Until a file exists, the site shows an elegant placeholder instead.
 */

export const HER_NAME = "My Love";
export const AGE = 20;

export const MUSIC_SRC = "/media/music.mp3";
export const FINAL_VIDEO_SRC = "/media/finalBirthdayVideo.mp4";

export type Memory = {
  id: string;
  year: number;
  /** short caption revealed with the photo */
  title: string;
  note: string;
  photo: string;
};

const titles = [
  "The very beginning",
  "First light",
  "Little wonders",
  "Laughter everywhere",
  "Golden afternoons",
  "Growing dreams",
  "Quiet courage",
  "Endless questions",
  "Your kind heart",
  "Ten and shining",
  "New adventures",
  "Music and moonlight",
  "Becoming you",
  "Storms you survived",
  "Sweet sixteen",
  "Big plans",
  "Wild, free, wonderful",
  "The year we grew",
  "Nineteen, unforgettable",
  "Twenty — and everything ahead",
];

export const MEMORIES: Memory[] = Array.from({ length: AGE }, (_, i) => {
  const n = String(i + 1).padStart(2, "0");
  return {
    id: `memory${n}`,
    year: i + 1,
    title: titles[i] ?? `Year ${i + 1}`,
    note: `Candle ${i + 1} — a year of you. Replace this line in src/lib/experience-content.ts.`,
    photo: `/media/memory${n}.jpg`,
  };
});

export const OPENING = {
  kicker: "Something has been waiting for you",
  title: "Happy 20th Birthday",
  subtitle: "A little world made only for you. Take your time — it unfolds slowly.",
  cta: "Open your surprise",
};

export const WISH = {
  title: "Before we begin",
  lines: [
    "Today the world is a little softer, because it's your day.",
    "Twenty years of you — every one of them worth celebrating.",
    "I made this so you could feel, for a few minutes, exactly how loved you are.",
  ],
  cta: "Take me to the cake",
};

export const CAKE = {
  title: "Twenty candles",
  subtitle: "Blow out each one. Every flame is a year, and every year has a memory.",
  cta: "Blow the candle",
};

export const FINAL_NOTE = {
  title: "A note from me",
  body: [
    "There are things I'm not brave enough to say out loud, so I wrote them here.",
    "You make ordinary days feel like something worth remembering. You're kind in a way that doesn't ask to be noticed, and strong in a way that doesn't ask for help. I hope this year is gentle with you — and if it isn't, I hope you know exactly who's standing beside you.",
    "Happy twentieth birthday. Here's to every year after this one.",
  ],
  signature: "Always, me",
  cta: "One last thing…",
};

export const ENDING = {
  title: "Happy Birthday",
  subtitle: "Twenty years of you, and the best is still coming.",
  replay: "Live it again",
};
