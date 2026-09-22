"use client";

import { useEffect, useState } from "react";
import { Glyph, PlayIcon } from "@/components/ui/Marks";
import { editorMock } from "@/lib/content/home";

const { canvas, easingLabel, exportLabel, layers, projectName, ratios, timecode } =
  editorMock;

/**
 * A representative view of the editor. Everything here is CSS-driven so the
 * hero stays cheap to render — the loop is the pitch, so it runs on its own.
 */
export function EditorMock() {
  const [activeRatio, setActiveRatio] = useState(ratios[0]);
  const [playing, setPlaying] = useState(true);

  // Keep the layer rail feeling live without wiring up real state.
  const [activeLayer, setActiveLayer] = useState(0);
  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setActiveLayer((i) => (i + 1) % layers.length),
      1300,
    );
    return () => window.clearInterval(id);
  }, [playing]);

  const motion = playing ? "" : "[animation-play-state:paused]";

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
            {projectName}
          </span>
        </div>

        <div className="flex items-center gap-sm">
          <div className="hidden -space-x-2 sm:flex" aria-hidden>
            {["gradient-brand", "gradient-lavender", "bg-secondary"].map((tint) => (
              <span
                key={tint}
                className={`h-7 w-7 rounded-full ring-2 ring-surface-bright ${tint}`}
              />
            ))}
          </div>
          <span className="rounded-full bg-secondary px-md py-1.5 text-label-sm text-on-secondary">
            {exportLabel}
          </span>
        </div>
      </div>

      <div className="grid lg:grid-cols-[168px_1fr]">
        {/* Layer rail */}
        <aside className="hidden flex-col gap-xs border-r border-outline p-md lg:flex">
          <span className="flex items-center gap-xs px-xs pb-1 text-label-sm text-on-surface-subtle">
            <Glyph id="layers" className="h-3.5 w-3.5" />
            Layers
          </span>
          {layers.map((layer, i) => (
            <span
              key={layer.name}
              className={`flex items-center gap-sm rounded-full px-sm py-2 text-label-sm transition-colors duration-300 ease-glide ${
                i === activeLayer
                  ? "bg-surface-container text-on-surface"
                  : "text-on-surface-variant"
              }`}
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${layer.tint}`} />
              <span className="truncate">{layer.name}</span>
            </span>
          ))}
        </aside>

        <div>
          {/* Canvas */}
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
              className={`gradient-brand relative aspect-square w-full max-w-80 overflow-hidden rounded-sm ${motion}`}
            >
              <span
                aria-hidden
                className={`animate-float absolute -right-8 -top-8 h-28 w-28 rounded-full bg-accent-lavender/40 ${motion}`}
              />

              <div className="relative flex h-full flex-col justify-between p-lg">
                <span
                  className={`animate-pop-in inline-flex w-fit items-center gap-xs rounded-full bg-secondary px-md py-1.5 text-label-sm text-on-secondary ${motion}`}
                  style={{ animationDelay: "0.1s" }}
                >
                  <Glyph id="spark" className="h-3.5 w-3.5" />
                  {canvas.badge}
                </span>

                <div className="flex flex-col gap-sm">
                  <span
                    className={`animate-pop-in block font-display text-headline-md text-inverse-on-surface ${motion}`}
                    style={{ animationDelay: "0.35s" }}
                  >
                    {canvas.headline[0]}
                    <br />
                    {canvas.headline[1]}
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

          {/* Timeline */}
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
                  {playing ? "Pause preview" : "Play preview"}
                </span>
              </button>
              <span className="text-label-sm text-on-surface-variant">
                {timecode}
              </span>
              <span className="ml-auto hidden text-label-sm text-on-surface-subtle sm:block">
                {easingLabel}
              </span>
            </div>

            <div className="relative flex flex-col gap-xs" aria-hidden>
              {layers.map((layer) => (
                <div key={layer.name} className="h-3 w-full rounded-full bg-surface">
                  <span
                    className={`block h-3 rounded-full ${layer.tint}`}
                    style={{
                      marginLeft: `${layer.start}%`,
                      width: `${layer.width}%`,
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
