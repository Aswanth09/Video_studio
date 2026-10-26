import { create } from "zustand";

export type TrackId = "V2" | "V1" | "T1" | "A1" | "A2" | "A3";

export interface TimelineTrack {
  id: TrackId;
  name: string;
  type: "video" | "audio" | "caption";
  muted?: boolean;
  locked?: boolean;
  visible?: boolean;
}

export interface TimelineClip {
  id: string;
  trackId: TrackId;
  name: string;
  startFrame: number;
  durationFrames: number;
  speed: number;
  sourceUri: string;
}

export interface TimelineTransition {
  id: string;
  trackId: TrackId;
  fromClipId: string;
  toClipId: string;
  type: "cross-dissolve" | "cut" | "dip-to-black";
  durationFrames: number;
}

export interface TimelineState {
  tracks: TimelineTrack[];
  clips: TimelineClip[];
  selectedClipId: string | null;
  transitions: TimelineTransition[];
  zoomPxPerSecond: number;

  selectClip: (clipId: string | null) => void;
  updateClipTiming: (clipId: string, startFrame: number, durationFrames: number) => void;
  setZoom: (px: number) => void;
  splitClipAtFrame: (clipId: string, frame: number) => void;
}

const INITIAL_TRACKS: TimelineTrack[] = [
  { id: "V2", name: "Overlay / B-Roll", type: "video", visible: true, locked: false },
  { id: "V1", name: "Primary Footage Sequence", type: "video", visible: true, locked: false },
  { id: "T1", name: "Captions & Subtitles", type: "caption", visible: true, locked: false },
  { id: "A1", name: "Dialogue & Voiceover", type: "audio", muted: false, locked: false },
  { id: "A2", name: "Music Bed", type: "audio", muted: false, locked: false },
  { id: "A3", name: "SFX & Foley", type: "audio", muted: false, locked: false },
];

const INITIAL_CLIPS: TimelineClip[] = [
  // V2 Overlays
  {
    id: "clip_v2_1",
    trackId: "V2",
    name: "METRO_PASS_OVERLAY.mov",
    startFrame: 180,
    durationFrames: 90,
    speed: 1.0,
    sourceUri: "asset_editor_3panel_5.png",
  },
  {
    id: "clip_v2_2",
    trackId: "V2",
    name: "NEON_GLITCH_MATTE.mov",
    startFrame: 450,
    durationFrames: 105,
    speed: 1.0,
    sourceUri: "asset_editor_3panel_6.png",
  },
  {
    id: "clip_v2_3",
    trackId: "V2",
    name: "DRONE_ESTABLISHING.mov",
    startFrame: 900,
    durationFrames: 130,
    speed: 1.0,
    sourceUri: "asset_editor_3panel_7.png",
  },
  {
    id: "clip_v2_4",
    trackId: "V2",
    name: "RAIN_PUDDLE_REFLECT.mov",
    startFrame: 1500,
    durationFrames: 120,
    speed: 1.0,
    sourceUri: "asset_editor_3panel_8.png",
  },
  // V1 Primary
  {
    id: "clip_v1_1",
    trackId: "V1",
    name: "SHIBUYA_01.MOV",
    startFrame: 0,
    durationFrames: 120,
    speed: 1.0,
    sourceUri: "asset_editor_3panel_9.png",
  },
  {
    id: "clip_v1_2",
    trackId: "V1",
    name: "CYBER_PORTRAIT.MOV",
    startFrame: 120,
    durationFrames: 150,
    speed: 1.0,
    sourceUri: "asset_editor_3panel_5.png",
  },
  {
    id: "clip_v1_3",
    trackId: "V1",
    name: "METRO_SPEED.MOV",
    startFrame: 270,
    durationFrames: 180,
    speed: 1.0,
    sourceUri: "asset_editor_3panel_6.png",
  },
  {
    id: "clip_v1_4",
    trackId: "V1",
    name: "NEON_ALLEY_NIGHT.MOV",
    startFrame: 450,
    durationFrames: 210,
    speed: 1.0,
    sourceUri: "asset_editor_3panel_7.png",
  },
  {
    id: "clip_v1_5",
    trackId: "V1",
    name: "RAIN_CROSSING.MOV",
    startFrame: 660,
    durationFrames: 140,
    speed: 1.0,
    sourceUri: "asset_editor_3panel_8.png",
  },
  // T1 Captions
  {
    id: "clip_t1_1",
    trackId: "T1",
    name: "CYBER_SUBTITLE_01",
    startFrame: 0,
    durationFrames: 90,
    speed: 1.0,
    sourceUri: "captions_01.srt",
  },
  {
    id: "clip_t1_2",
    trackId: "T1",
    name: "CYBER_SUBTITLE_02",
    startFrame: 120,
    durationFrames: 120,
    speed: 1.0,
    sourceUri: "captions_02.srt",
  },
  // A1 Dialogue
  {
    id: "clip_a1_1",
    trackId: "A1",
    name: "VO_DIALOGUE_ACTOR_MAIN_48K.wav",
    startFrame: 0,
    durationFrames: 1200,
    speed: 1.0,
    sourceUri: "vo_dialogue.wav",
  },
  // A2 Music
  {
    id: "clip_a2_1",
    trackId: "A2",
    name: "CYBER_SYNTH_WAVE_BED_MASTER.wav",
    startFrame: 0,
    durationFrames: 2400,
    speed: 1.0,
    sourceUri: "synthwave_bed.wav",
  },
  // A3 SFX
  {
    id: "clip_a3_1",
    trackId: "A3",
    name: "SWOOSH_RISE.wav",
    startFrame: 150,
    durationFrames: 60,
    speed: 1.0,
    sourceUri: "sfx_swoosh.wav",
  },
  {
    id: "clip_a3_2",
    trackId: "A3",
    name: "SUB_IMPACT_BOOM.wav",
    startFrame: 360,
    durationFrames: 75,
    speed: 1.0,
    sourceUri: "sfx_boom.wav",
  },
];

const INITIAL_TRANSITIONS: TimelineTransition[] = [
  {
    id: "trans_1",
    trackId: "V1",
    fromClipId: "clip_v1_1",
    toClipId: "clip_v1_2",
    type: "cross-dissolve",
    durationFrames: 15,
  },
  {
    id: "trans_2",
    trackId: "V1",
    fromClipId: "clip_v1_2",
    toClipId: "clip_v1_3",
    type: "cross-dissolve",
    durationFrames: 15,
  },
];

export const useTimelineStore = create<TimelineState>((set) => ({
  tracks: INITIAL_TRACKS,
  clips: INITIAL_CLIPS,
  selectedClipId: "clip_v1_1",
  transitions: INITIAL_TRANSITIONS,
  zoomPxPerSecond: 40,

  selectClip: (clipId) => set({ selectedClipId: clipId }),

  updateClipTiming: (clipId, startFrame, durationFrames) =>
    set((state) => ({
      clips: state.clips.map((clip) =>
        clip.id === clipId
          ? {
              ...clip,
              startFrame: Math.max(0, Math.round(startFrame)),
              durationFrames: Math.max(1, Math.round(durationFrames)),
            }
          : clip
      ),
    })),

  setZoom: (px) =>
    set({
      zoomPxPerSecond: Math.max(10, Math.min(200, Math.round(px))),
    }),

  splitClipAtFrame: (clipId, frame) =>
    set((state) => {
      const clipIndex = state.clips.findIndex((c) => c.id === clipId);
      if (clipIndex === -1) return state;

      const clip = state.clips[clipIndex];
      const splitPoint = Math.round(frame);

      if (
        splitPoint <= clip.startFrame ||
        splitPoint >= clip.startFrame + clip.durationFrames
      ) {
        return state;
      }

      const firstPartDuration = splitPoint - clip.startFrame;
      const secondPartDuration = clip.durationFrames - firstPartDuration;

      const firstClip: TimelineClip = {
        ...clip,
        durationFrames: firstPartDuration,
      };

      const secondClip: TimelineClip = {
        ...clip,
        id: `${clip.id}_split_${Date.now()}`,
        name: `${clip.name} (Part 2)`,
        startFrame: splitPoint,
        durationFrames: secondPartDuration,
      };

      const nextClips = [...state.clips];
      nextClips.splice(clipIndex, 1, firstClip, secondClip);

      return {
        clips: nextClips,
        selectedClipId: secondClip.id,
      };
    }),
}));

