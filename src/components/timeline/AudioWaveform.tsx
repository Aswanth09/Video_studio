import React, { useEffect, useRef } from "react";

export interface AudioWaveformProps {
  trackId: "A1" | "A2" | "A3";
  width: number;
  height: number;
  color?: string;
  volumeMultiplier?: number;
  clipSeed?: string;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 1;
}

export const AudioWaveform: React.FC<AudioWaveformProps> = ({
  trackId,
  width,
  height,
  color,
  volumeMultiplier = 1.0,
  clipSeed = "default_clip",
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || width <= 0 || height <= 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.max(1, Math.floor(width)) * dpr;
    canvas.height = Math.max(1, Math.floor(height)) * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const defaultColors: Record<string, string> = {
      A1: "#34d399", // Emerald / Speech Dialogue
      A2: "#fbbf24", // Amber / Music Bed
      A3: "#38bdf8", // Sky Blue / SFX Transient
    };
    ctx.fillStyle = color || defaultColors[trackId] || "#4cd7f6";

    const seed = hashString(clipSeed);
    const centerY = height / 2;
    const barWidth = 2;
    const barGap = 1;
    const totalStep = barWidth + barGap;
    const numBars = Math.floor(width / totalStep);

    for (let i = 0; i < numBars; i++) {
      const x = i * totalStep;
      const progress = i / Math.max(1, numBars);

      let rawAmp = 0;

      if (trackId === "A1") {
        // Speech cadence: rhythmic speech bursts (active phonemes) with natural conversational pauses
        const phraseCycle = Math.sin((i + seed % 50) * 0.08);
        const pauseMask = Math.sin((i + seed % 100) * 0.02) > -0.2 ? 1 : 0.05;
        const noise = Math.abs(Math.sin(i * 1.7 + seed)) * 0.5 + 0.3;
        rawAmp = Math.max(0.04, Math.abs(phraseCycle) * pauseMask * noise);
      } else if (trackId === "A2") {
        // Music bed: compressed, dense continuous energy with rhythmic bass kick pulses
        const beatPulse = (i % 8 === 0 || i % 8 === 4) ? 0.95 : 0.65;
        const melody = Math.sin(i * 0.15 + seed) * 0.2 + 0.55;
        const noise = Math.abs(Math.cos(i * 0.8 + seed)) * 0.25;
        rawAmp = Math.min(1.0, (beatPulse * 0.4 + melody * 0.4 + noise * 0.2));
      } else {
        // SFX: transient bursts at start or intervals, decaying exponentially
        const cycleProgress = (i % Math.max(10, Math.floor(numBars / 2))) / Math.max(10, Math.floor(numBars / 2));
        const decay = Math.exp(-cycleProgress * 5);
        const noise = Math.abs(Math.sin(i * 2.3 + seed));
        rawAmp = Math.max(0.02, decay * noise * 0.95);
      }

      const amplitude = Math.min(1.0, rawAmp * volumeMultiplier);
      const barHeight = Math.max(2, amplitude * (height * 0.88));
      const topY = centerY - barHeight / 2;

      ctx.fillRect(x, topY, barWidth, barHeight);
    }
  }, [trackId, width, height, color, volumeMultiplier, clipSeed]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: `${width}px`, height: `${height}px` }}
      className="pointer-events-none absolute inset-0 block opacity-80"
    />
  );
};

export default AudioWaveform;

