import { create } from "zustand";

/**
 * Converts a frame number to an SMPTE timecode string (HH:MM:SS:FF).
 */
export function formatSMPTE(frame: number, fps: number = 30): string {
  const safeFps = Math.max(1, Math.round(fps));
  const safeFrame = Math.max(0, Math.floor(frame));

  const totalSeconds = Math.floor(safeFrame / safeFps);
  const ff = safeFrame % safeFps;
  const hh = Math.floor(totalSeconds / 3600);
  const mm = Math.floor((totalSeconds % 3600) / 60);
  const ss = totalSeconds % 60;

  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${pad(hh)}:${pad(mm)}:${pad(ss)}:${pad(ff)}`;
}

/**
 * Parses an SMPTE timecode string (HH:MM:SS:FF or HH:MM:SS;FF) to frame number.
 */
export function parseSMPTE(smpte: string, fps: number = 30): number {
  const safeFps = Math.max(1, Math.round(fps));
  const parts = smpte.trim().split(/[:;]/).map((p) => parseInt(p, 10));

  if (parts.length !== 4 || parts.some((p) => isNaN(p) || p < 0)) {
    return 0;
  }

  const [hh, mm, ss, ff] = parts;
  const totalSeconds = hh * 3600 + mm * 60 + ss;
  return totalSeconds * safeFps + Math.min(ff, safeFps - 1);
}

export interface PlaybackState {
  isPlaying: boolean;
  currentFrame: number;
  totalFrames: number;
  fps: number;

  play: () => void;
  pause: () => void;
  togglePlayback: () => void;
  seekToFrame: (frame: number) => void;
  setTimecode: (smpteString: string) => void;
}

export const usePlaybackStore = create<PlaybackState>((set) => ({
  isPlaying: false,
  currentFrame: 438, // 00:00:14:18 at 30fps
  totalFrames: 8250, // 00:04:35:00 at 30fps
  fps: 30,

  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  togglePlayback: () => set((state) => ({ isPlaying: !state.isPlaying })),
  seekToFrame: (frame) =>
    set((state) => ({
      currentFrame: Math.max(0, Math.min(state.totalFrames, Math.round(frame))),
    })),
  setTimecode: (smpteString) =>
    set((state) => ({
      currentFrame: Math.max(
        0,
        Math.min(state.totalFrames, parseSMPTE(smpteString, state.fps))
      ),
    })),
}));

