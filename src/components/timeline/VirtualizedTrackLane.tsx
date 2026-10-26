import React, { useMemo } from "react";
import { TimelineClip, TimelineTrack, TimelineTransition } from "../../store/useTimelineStore";
import { AudioWaveform } from "./AudioWaveform";

export interface VirtualizedTrackLaneProps {
  track: TimelineTrack;
  clips: TimelineClip[];
  transitions?: TimelineTransition[];
  totalWidth: number;
  zoomPxPerSecond: number;
  fps: number;
  scrollLeft: number;
  viewportWidth: number;
  selectedClipId: string | null;
  onSelectClip: (clipId: string) => void;
  overscanPx?: number;
}

export const VirtualizedTrackLane: React.FC<VirtualizedTrackLaneProps> = ({
  track,
  clips,
  transitions = [],
  totalWidth,
  zoomPxPerSecond,
  fps,
  scrollLeft,
  viewportWidth,
  selectedClipId,
  onSelectClip,
  overscanPx = 300,
}) => {
  const pxPerFrame = zoomPxPerSecond / fps;

  // Window bounds
  const visibleStartPx = Math.max(0, scrollLeft - overscanPx);
  const visibleEndPx = scrollLeft + viewportWidth + overscanPx;

  // Filter clips within visible range
  const visibleClips = useMemo(() => {
    return clips.filter((clip) => {
      const clipStartPx = clip.startFrame * pxPerFrame;
      const clipWidthPx = clip.durationFrames * pxPerFrame;
      const clipEndPx = clipStartPx + clipWidthPx;
      return clipEndPx >= visibleStartPx && clipStartPx <= visibleEndPx;
    });
  }, [clips, pxPerFrame, visibleStartPx, visibleEndPx]);

  // Filter transitions for V1
  const visibleTransitions = useMemo(() => {
    if (track.id !== "V1" || !transitions.length) return [];
    return transitions.filter((trans) => {
      const fromClip = clips.find((c) => c.id === trans.fromClipId);
      if (!fromClip) return false;
      const cutFrame = fromClip.startFrame + fromClip.durationFrames;
      const cutPx = cutFrame * pxPerFrame;
      return cutPx >= visibleStartPx && cutPx <= visibleEndPx;
    });
  }, [track.id, transitions, clips, pxPerFrame, visibleStartPx, visibleEndPx]);

  // Track specific styling heights & backgrounds
  const trackHeights: Record<string, string> = {
    V2: "h-[42px] bg-[#0B0E16]/40 border-b border-[#1A2234]",
    V1: "h-[52px] bg-[#07090F] border-b-2 border-primary-container/40",
    T1: "h-[36px] bg-[#100E08]/40 border-b border-[#1A2234]",
    A1: "h-[44px] bg-[#07140E]/40 border-b border-[#1A2234]",
    A2: "h-[44px] bg-[#150F07]/40 border-b border-[#1A2234]",
    A3: "h-[38px] bg-[#071018]/40 border-b border-[#1A2234]",
  };

  const laneClass = trackHeights[track.id] || "h-[42px] border-b border-[#1A2234]";

  return (
    <div
      style={{ width: `${totalWidth}px` }}
      className={`relative flex items-center select-none overflow-hidden ${laneClass}`}
      data-track-id={track.id}
    >
      {/* Mounted Visible Clips */}
      {visibleClips.map((clip) => {
        const leftPx = clip.startFrame * pxPerFrame;
        const widthPx = Math.max(12, clip.durationFrames * pxPerFrame);
        const isSelected = selectedClipId === clip.id;
        const durationSeconds = (clip.durationFrames / fps).toFixed(1);

        // V2 Overlay Style
        if (track.id === "V2") {
          return (
            <div
              key={clip.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectClip(clip.id);
              }}
              style={{ left: `${leftPx}px`, width: `${widthPx}px` }}
              className={`timeline-clip absolute h-8 rounded-sm bg-[#162134] border flex items-center px-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-secondary ring-1 ring-secondary shadow-lg z-20"
                  : "border-[#283856] hover:border-secondary/70 z-10"
              }`}
            >
              <span className="text-[9px] font-mono text-secondary mr-1">[ ]</span>
              <span className="font-headline-md text-[10px] text-slate-200 truncate">{clip.name}</span>
              <span className="ml-auto font-mono text-[8px] text-slate-400 shrink-0 pl-1">{durationSeconds}s</span>
            </div>
          );
        }

        // V1 Primary Clip Style
        if (track.id === "V1") {
          return (
            <div
              key={clip.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectClip(clip.id);
              }}
              style={{ left: `${leftPx}px`, width: `${widthPx}px` }}
              className={`timeline-clip absolute h-11 rounded-sm border flex flex-col justify-between p-1.5 cursor-pointer transition-all overflow-hidden ${
                isSelected
                  ? "bg-[#25324D] border-secondary ring-1 ring-secondary shadow-xl z-20"
                  : "bg-[#182030] hover:bg-[#1D273C] border-[#2C3852] hover:border-secondary/50 z-10"
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-headline-md text-[10px] text-white font-medium truncate">
                  {clip.name}
                </span>
                <span className="font-mono text-[8px] text-secondary font-semibold shrink-0 pl-1">
                  {durationSeconds}s
                </span>
              </div>
              <div className="flex items-center justify-between text-[8px] font-mono text-slate-400">
                <span className="truncate">4K DCI • Rec.709</span>
                <span className="text-secondary/70">1.0x</span>
              </div>
            </div>
          );
        }

        // T1 Captions Style
        if (track.id === "T1") {
          return (
            <div
              key={clip.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectClip(clip.id);
              }}
              style={{ left: `${leftPx}px`, width: `${widthPx}px` }}
              className={`timeline-clip absolute h-7 rounded-sm bg-[#221C0E] border flex items-center px-2 cursor-pointer transition-all ${
                isSelected
                  ? "border-yellow-400 ring-1 ring-yellow-400 shadow-md z-20"
                  : "border-yellow-500/40 hover:border-yellow-400/80 z-10"
              }`}
            >
              <span className="font-mono text-[8px] text-yellow-400 mr-1.5 shrink-0 px-1 py-0.2 rounded-xs bg-yellow-400/20 font-bold">
                CC
              </span>
              <span className="font-mono text-[9px] text-yellow-100 truncate">{clip.name}</span>
            </div>
          );
        }

        // A1 Dialogue Track (Waveform + Limiter Tag)
        if (track.id === "A1") {
          return (
            <div
              key={clip.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectClip(clip.id);
              }}
              style={{ left: `${leftPx}px`, width: `${widthPx}px` }}
              className={`timeline-clip absolute h-9 rounded-sm bg-[#0C1E16] border flex items-center px-2 overflow-hidden cursor-pointer transition-all ${
                isSelected
                  ? "border-emerald-400 ring-1 ring-emerald-400 shadow-lg z-20"
                  : "border-emerald-500/40 hover:border-emerald-400/70 z-10"
              }`}
            >
              <AudioWaveform
                trackId="A1"
                width={widthPx}
                height={34}
                clipSeed={clip.id}
                volumeMultiplier={clip.volumeMultiplier || 0.95}
              />
              <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
                <span className="font-mono text-[9px] text-emerald-200 font-semibold bg-[#0A1A14]/85 px-1 py-0.5 rounded-xs truncate">
                  {clip.name}
                </span>
                <span className="font-mono text-[8px] text-emerald-400 bg-[#0A1A14]/85 px-1 py-0.5 rounded-xs shrink-0 ml-1">
                  -1.5 dB (Limiter ON)
                </span>
              </div>
            </div>
          );
        }

        // A2 Music Bed (Waveform + Keyframe Envelope)
        if (track.id === "A2") {
          return (
            <div
              key={clip.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectClip(clip.id);
              }}
              style={{ left: `${leftPx}px`, width: `${widthPx}px` }}
              className={`timeline-clip absolute h-9 rounded-sm bg-[#241A0C] border flex items-center px-2 overflow-hidden cursor-pointer transition-all ${
                isSelected
                  ? "border-amber-400 ring-1 ring-amber-400 shadow-lg z-20"
                  : "border-amber-500/40 hover:border-amber-400/70 z-10"
              }`}
            >
              <AudioWaveform
                trackId="A2"
                width={widthPx}
                height={34}
                clipSeed={clip.id}
                volumeMultiplier={clip.volumeMultiplier || 0.8}
              />
              <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
                <span className="font-mono text-[9px] text-amber-200 font-semibold bg-[#181105]/85 px-1 py-0.5 rounded-xs truncate">
                  {clip.name}
                </span>
                <span className="font-mono text-[8px] text-amber-400 bg-[#181105]/85 px-1 py-0.5 rounded-xs shrink-0 ml-1">
                  -14.0 dB Auto-Ducked
                </span>
              </div>
            </div>
          );
        }

        // A3 SFX / Foley
        if (track.id === "A3") {
          return (
            <div
              key={clip.id}
              onClick={(e) => {
                e.stopPropagation();
                onSelectClip(clip.id);
              }}
              style={{ left: `${leftPx}px`, width: `${widthPx}px` }}
              className={`timeline-clip absolute h-7 rounded-sm bg-[#0F1C2B] border flex items-center px-1.5 overflow-hidden cursor-pointer transition-all ${
                isSelected
                  ? "border-sky-300 ring-1 ring-sky-300 shadow-md z-20"
                  : "border-sky-500/40 hover:border-sky-300/80 z-10"
              }`}
            >
              <AudioWaveform
                trackId="A3"
                width={widthPx}
                height={26}
                clipSeed={clip.id}
                volumeMultiplier={clip.volumeMultiplier || 0.9}
              />
              <div className="relative z-10 flex items-center justify-between w-full pointer-events-none">
                <span className="font-mono text-[9px] text-sky-200 truncate pr-1">
                  {clip.name}
                </span>
                <span className="font-mono text-[8px] text-sky-400 shrink-0">
                  {durationSeconds}s
                </span>
              </div>
            </div>
          );
        }

        return null;
      })}

      {/* Render V1 Injected Cross-Dissolve Transition Badges */}
      {visibleTransitions.map((trans) => {
        const fromClip = clips.find((c) => c.id === trans.fromClipId);
        if (!fromClip) return null;
        const cutPx = (fromClip.startFrame + fromClip.durationFrames) * pxPerFrame;

        return (
          <div
            key={trans.id}
            style={{ left: `${cutPx - 10}px` }}
            className="pointer-events-none absolute h-7 w-5 rounded-xs bg-secondary/20 border border-secondary/60 flex items-center justify-center shadow-md z-30 backdrop-blur-xs"
            title="Cross-Dissolve (0.3s)"
          >
            <div className="w-2.5 h-2.5 rotate-45 border border-secondary bg-[#080B12] flex items-center justify-center">
              <div className="w-1 h-1 bg-secondary rounded-full" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default VirtualizedTrackLane;

