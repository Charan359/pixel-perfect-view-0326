import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Ambience } from "@/components/experience/Ambience";
import { MusicToggle } from "@/components/experience/MusicToggle";
import {
  CakeIntroStage,
  CandleStage,
  EndingStage,
  NoteStage,
  OpeningStage,
  VideoStage,
  WishStage,
} from "@/components/experience/stages";

const title = "Happy 20th Birthday — A Surprise Made For You";
const description =
  "A romantic, cinematic 20th birthday experience: twenty candles, twenty memories, a personal note and a final video.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Stage = "opening" | "wish" | "cake" | "candles" | "note" | "video" | "ending";

function Index() {
  const [stage, setStage] = useState<Stage>("opening");

  return (
    <main className="relative min-h-[100svh] overflow-hidden">
      <Ambience intensity={stage === "candles" ? 0.7 : 1} />
      <MusicToggle autoStart={stage !== "opening"} />

      {stage === "opening" && <OpeningStage onNext={() => setStage("wish")} />}
      {stage === "wish" && <WishStage onNext={() => setStage("cake")} />}
      {stage === "cake" && <CakeIntroStage onNext={() => setStage("candles")} />}
      {stage === "candles" && <CandleStage onFinished={() => setStage("note")} />}
      {stage === "note" && <NoteStage onNext={() => setStage("video")} />}
      {stage === "video" && <VideoStage onNext={() => setStage("ending")} />}
      {stage === "ending" && <EndingStage onReplay={() => setStage("opening")} />}
    </main>
  );
}
