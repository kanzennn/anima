"use client";

import { useEffect, useState } from "react";
import { Glyph, PlayIcon } from "@/components/ui/Marks";
import { showreel } from "@/lib/content/home";

const { chapterLabel, formatLabel, frame, ratios, timecode, title, tracks } =
  showreel;

/* The monitor is height-anchored, so switching ratio changes the frame's width
   while the surrounding layout stays put. Keys must cover `showreel.ratios` —
   `frameAspect[r] ?? ""` below degrades to a full-width box if one is missed. */
const frameAspect: Record<string, string> = {
  "16:9": "aspect-video",
  "2.39:1": "aspect-[2.39/1]",
  "9:16": "aspect-[9/16]",
  "1:1": "aspect-square",
};

/**
 * A representative view of a cutting-room timeline standing in for the reel.
 * Everything is CSS-driven so the hero stays cheap to render — a looping video
 * would outweigh the rest of the page, and this stays sharp at any size.
 *
 * Swap this for a real `<video>` poster + player once the reel is cut.
 */
export function ShowreelPlayer() {
  const [activeRatio, setActiveRatio] = useState(ratios[0]);
  const [playing, setPlaying] = useState(true);

  // Keep the track list feeling live without wiring up real playback.
  const [activeTrack, setActiveTrack] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setActiveTrack((i) => (i + 1) % tracks.length),
      1300,
    );
    return () => window.clearInterval(id);
  }, [playing]);

  const motion = playing ? "" : "[animation-play-state:paused]";
  // A vertical frame is a fraction of the width, so its contents have to come
  // down with it or the headline overruns the monitor.
  const portrait = activeRatio === "9:16";

  return (
    <div className="overflow-hidden rounded-md bg-surface-bright shadow-lifted ring-1 ring-outline">
      {/* Top chrome */}
      <div className="flex items-center justify-between gap-md border-b border-outline px-lg py-md">
        <div className="flex items-center gap-md">
          <div className="flex gap-xs" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-icon-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-icon-muted" />
            <span className="h-2.5 w-2.5 rounded-full bg-icon-muted" />
          </div>
          <span className="hidden text-label-sm text-on-surface-variant sm:block">
            {title}
          </span>
        </div>

        <span className="rounded-full bg-secondary px-md py-1.5 text-label-sm text-on-secondary">
          {formatLabel}
        </span>
      </div>

      <div className="grid lg:grid-cols-[180px_1fr]">
        {/* Track list */}
        <aside className="hidden flex-col gap-xs border-r border-outline p-md lg:flex">
          <span className="flex items-center gap-xs px-xs pb-1 text-label-sm text-on-surface-subtle">
            <Glyph id="cut" className="h-3.5 w-3.5" />
            Timeline
          </span>
          {tracks.map((track, i) => (
            <span
              key={track.name}
              className={`flex items-center gap-sm rounded-full px-sm py-2 text-label-sm transition-colors duration-300 ease-glide ${
                i === activeTrack
                  ? "bg-surface-container text-on-surface"
                  : "text-on-surface-variant"
              }`}
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${track.tint}`} />
              <span className="truncate">{track.name}</span>
            </span>
          ))}
        </aside>

        <div>
          {/* Program monitor */}
          <div className="relative flex items-center justify-center bg-surface p-lg sm:p-xl">
            <div className="absolute left-lg top-lg hidden gap-xs sm:flex">
              {ratios.map((ratio) => (
                <button
                  key={ratio}
                  type="button"
                  onClick={() => setActiveRatio(ratio)}
                  aria-pressed={ratio === activeRatio}
                  className={`rounded-full px-md py-1.5 text-label-sm transition-colors duration-200 ${
                    ratio === activeRatio
                      ? "bg-inverse-surface text-inverse-on-surface"
                      : "bg-surface-container text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            <div
              className={`gradient-brand relative h-40 w-auto max-w-full overflow-hidden rounded-sm sm:h-56 ${frameAspect[activeRatio] ?? ""} ${motion}`}
            >
              <span
                aria-hidden
                className={`animate-float absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent-lavender/40 ${motion}`}
              />

              <div
                className={`relative flex h-full flex-col justify-between ${
                  portrait ? "p-md" : "p-lg"
                }`}
              >
                <span
                  className={`animate-pop-in inline-flex w-fit items-center gap-xs rounded-full bg-secondary px-md py-1.5 text-label-sm text-on-secondary ${motion}`}
                  style={{ animationDelay: "0.1s" }}
                >
                  <Glyph id="spark" className="h-3.5 w-3.5" />
                  {frame.badge}
                </span>

                <div className="flex flex-col gap-sm">
                  <span
                    className={`animate-pop-in block font-display text-inverse-on-surface ${
                      portrait ? "text-quote" : "text-headline-md"
                    } ${motion}`}
                    style={{ animationDelay: "0.35s" }}
                  >
                    {frame.headline[0]}
                    <br />
                    {frame.headline[1]}
                  </span>
                  <span
                    aria-hidden
                    className={`animate-pop-in block h-1.5 w-24 rounded-full bg-inverse-on-surface/35 ${motion}`}
                    style={{ animationDelay: "0.6s" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Transport + timeline */}
          <div className="relative border-t border-outline bg-surface-bright px-lg py-md">
            <div className="flex items-center gap-md pb-md">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-inverse-surface text-inverse-on-surface transition-transform duration-200 ease-spring hover:scale-105"
              >
                {playing ? (
                  <span className="flex gap-[3px]" aria-hidden>
                    <span className="h-3 w-[3px] rounded-full bg-current" />
                    <span className="h-3 w-[3px] rounded-full bg-current" />
                  </span>
                ) : (
                  <PlayIcon className="h-4 w-4 translate-x-px" />
                )}
                <span className="sr-only">
                  {playing ? "Pause showreel preview" : "Play showreel preview"}
                </span>
              </button>
              <span className="text-label-sm text-on-surface-variant">
                {timecode}
              </span>
              <span className="ml-auto hidden text-label-sm text-on-surface-subtle sm:block">
                {chapterLabel}
              </span>
            </div>

            <div className="relative flex flex-col gap-xs" aria-hidden>
              {tracks.map((track) => (
                <div key={track.name} className="h-3 w-full rounded-full bg-surface">
                  <span
                    className={`block h-3 rounded-full ${track.tint}`}
                    style={{
                      marginLeft: `${track.start}%`,
                      width: `${track.width}%`,
                    }}
                  />
                </div>
              ))}

              <span
                className={`animate-playhead pointer-events-none absolute -top-1 bottom-[-4px] w-0.5 rounded-full bg-on-surface ${motion}`}
              >
                <span className="absolute -left-[3px] -top-1 h-2 w-2 rounded-full bg-on-surface" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
