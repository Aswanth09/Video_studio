import React, { useRef, useState, useCallback } from "react";
import { formatSMPTE } from "../../store/usePlaybackStore";

export interface TimelineRulerProps {
  totalWidth: number;
  zoomPxPerSecond: number;
  fps: number;
  totalFrames: number;
  scrollLeft: number;
  viewportWidth: number;
  onSeek: (frame: number) => void;
  snapPoints?: number[];
  snappingEnabled?: boolean;
}

export const TimelineRuler: React.FC<TimelineRulerProps> = ({
  totalWidth,
  zoomPxPerSecond,
  fps,
  totalFrames,
  scrollLeft,
  viewportWidth,
  onSeek,
  snapPoints = [],
  snappingEnabled = false,
}) => {
  const rulerRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Compute adaptive step intervals based on zoom factor
  let majorStepSeconds = 2;
  let minorDivisions = 4;

  if (zoomPxPerSecond >= 100) {
    majorStepSeconds = 1;
    minorDivisions = 4; // every 0.25s
  } else if (zoomPxPerSecond >= 55) {
    majorStepSeconds = 2;
    minorDivisions = 4; // every 0.5s
  } else if (zoomPxPerSecond >= 35) {
    majorStepSeconds = 5;
    minorDivisions = 5; // every 1s
  } else if (zoomPxPerSecond >= 20) {
    majorStepSeconds = 10;
    minorDivisions = 5; // every 2s
  } else {
    majorStepSeconds = 30;
    minorDivisions = 6; // every 5s
  }

  const pxPerFrame = zoomPxPerSecond / fps;
  const majorStepPx = majorStepSeconds * zoomPxPerSecond;
  const minorStepPx = majorStepPx / minorDivisions;

  const totalSeconds = Math.ceil(totalFrames / fps);
  const totalMajorSteps = Math.ceil(totalSeconds / majorStepSeconds);

  // Horizontal windowing: compute visible range + 150px overscan
  const overscan = 150;
  const visibleStartPx = Math.max(0, scrollLeft - overscan);
  const visibleEndPx = scrollLeft + viewportWidth + overscan;

  const startStep = Math.max(0, Math.floor(visibleStartPx / majorStepPx));
  const endStep = Math.min(totalMajorSteps, Math.ceil(visibleEndPx / majorStepPx));

  const ticks: React.ReactNode[] = [];

  for (let s = startStep; s <= endStep; s++) {
    const stepSeconds = s * majorStepSeconds;
    const stepPx = s * majorStepPx;
    const stepFrame = stepSeconds * fps;
    const formattedTc = formatSMPTE(stepFrame, fps);

    // Major tick & label
    ticks.push(
      <div
        key={`major_${s}`}
        className="pointer-events-none absolute top-0 bottom-0 select-none"
        style={{ left: `${stepPx}px` }}
      >
        <span className="absolute left-1 top-0.5 font-mono text-[9px] text-slate-400 font-semibold tracking-wider">
          {formattedTc}
        </span>
        <div className="absolute left-0 bottom-1 w-px h-3 bg-[#475569]" />
      </div>
    );

    // Minor intermediate ticks
    for (let m = 1; m < minorDivisions; m++) {
      const minorPx = stepPx + m * minorStepPx;
      if (minorPx > totalWidth) break;
      const isSubHalf = m === Math.floor(minorDivisions / 2);

      ticks.push(
        <div
          key={`minor_${s}_${m}`}
          className="pointer-events-none absolute bottom-1 w-px select-none"
          style={{
            left: `${minorPx}px`,
            height: isSubHalf ? "7px" : "4px",
            backgroundColor: isSubHalf ? "#334155" : "#1E293B",
          }}
        />
      );
    }
  }

  // Handle click / scrubbing on ruler with magnetic snapping
  const computeFrameFromPointer = useCallback(
    (clientX: number) => {
      if (!rulerRef.current) return 0;
      const rect = rulerRef.current.getBoundingClientRect();
      const clickPx = clientX - rect.left;
      let rawFrame = Math.round(clickPx / pxPerFrame);

      // Magnetic snapping if enabled
      if (snappingEnabled && snapPoints.length > 0) {
        const snapThresholdFrames = Math.max(3, Math.round(10 / pxPerFrame)); // 10px snap window
        for (const snap of snapPoints) {
          if (Math.abs(rawFrame - snap) <= snapThresholdFrames) {
            rawFrame = snap;
            break;
          }
        }
      }

      return Math.max(0, Math.min(totalFrames, rawFrame));
    },
    [pxPerFrame, snappingEnabled, snapPoints, totalFrames]
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    const targetFrame = computeFrameFromPointer(e.clientX);
    onSeek(targetFrame);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const targetFrame = computeFrameFromPointer(e.clientX);
    onSeek(targetFrame);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={rulerRef}
      id="timeline-ruler"
      style={{ width: `${totalWidth}px` }}
      className="relative h-6 bg-[#0E121B] border-b border-[#1E2330] select-none shrink-0 cursor-pointer overflow-hidden"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Dynamic SMPTE Ticks Window */}
      {ticks}

      {/* Render Cache Status Strip (ProRes 422 HQ cached intervals) */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[3px] bg-[#09101d] flex overflow-hidden">
        <div className="w-[32%] h-full bg-[#0284c7]" />
        <div className="w-4 h-full bg-[#881337]" />
        <div className="w-[45%] h-full bg-[#0284c7]" />
        <div className="w-3 h-full bg-[#881337]" />
        <div className="flex-1 h-full bg-[#0284c7]" />
      </div>
    </div>
  );
};

export default TimelineRuler;

