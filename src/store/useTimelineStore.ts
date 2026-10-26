import { create } from "zustand";

export type TrackId = "V2" | "V1" | "T1" | "A1" | "A2" | "A3";
export type TimelineTool = "v" | "c" | "b";

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
  color?: string;
  volumeMultiplier?: number;
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
  activeTool: TimelineTool;
  snappingEnabled: boolean;

  selectClip: (clipId: string | null) => void;
  updateClipTiming: (clipId: string, startFrame: number, durationFrames: number) => void;
  setZoom: (px: number) => void;
  setActiveTool: (tool: TimelineTool) => void;
  toggleSnapping: () => void;
  setSnapping: (enabled: boolean) => void;
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

// 55+ Tokyo Neon & Megacity B-Roll Clip Titles for V1 sequence
const TOKYO_V1_TITLES = [
  "SHIBUYA_CROSSING_DUSK", "NEON_RAIN_REFLECT_01", "AKIHABARA_ARCADE_GLITCH",
  "ROPPONGI_TOWER_DRONE_4K", "SHINJUKU_ALLEYWAY_STEAM", "SUBWAY_COMMUTE_RUSH_02",
  "CYBER_MOTORCYCLE_HIGHWAY", "HARAJUKU_FASHION_STREET", "KABUKICHO_GATE_LIGHTS",
  "TEMPLE_INCENSE_SLOWMO", "SUSHI_CHEF_BLADE_CRAFT", "RAIN_ON_TAXI_WINDOW_03",
  "VENDING_MACHINE_CYAN_GLOW", "RAMEN_COUNTER_STEAM_4K", "PUDDLE_SPLASH_120FPS",
  "HOLOGRAPHIC_BILLBOARD_01", "SHINKANSEN_BULLET_PASS", "ROOFTOP_SMOG_SUNSET",
  "TOKYO_SKYTREE_MIST_NIGHT", "CYBERPUNK_BAR_NEON_SIGN", "RAINCOAT_PEDESTRIAN_04",
  "ALLEYWAY_STRAY_CAT_GAZE", "METRO_ESCALATOR_DESCENT", "NIGHT_MARKET_LANTERNS",
  "INDUSTRIAL_STEAM_VENT_02", "CHERRY_BLOSSOM_NEON_RIM", "CONSTRUCTION_BEACON_AMBER",
  "RAINBOW_BRIDGE_TIMELAPSE", "CROSSWALK_REFLECT_PUDDLE", "MONORAIL_CURVE_OVERHEAD",
  "UNDERGROUND_PARKING_DRIFT", "NEON_SIGNS_VERTICAL_PAN", "FIBER_OPTIC_INSTALLATION",
  "HIGH_RISE_OFFICE_LIGHTS", "MIDNIGHT_CONVENIENCE_STORE", "DRONE_SWEEP_OVER_MEGURO",
  "ANAMORPHIC_LENS_FLARE_01", "TRAIN_PLATFORM_WHISTLE", "KIMONO_SILHOUETTE_RAIN",
  "ROOFTOP_HELIPAD_BEACON", "PACHINKO_PARLOR_GLITCH", "ASPHALT_HEAT_DISTORTION",
  "CYBER_EYE_SCAN_BILLBOARD", "TAXI_TAILLIGHTS_LONG_EXPO", "TUNNEL_ENTRY_LIGHT_STREAKS",
  "STEEL_GIRDER_RAIN_DRIP", "OVERPASS_TRAFFIC_FLOW_4K", "NIGHT_FOG_CANAL_REFLECT",
  "NEON_CALLIGRAPHY_SIGNAGE", "METRO_TURNSTILE_TAP_IN", "SKYSCRAPER_CANYON_WIND",
  "STREET_FOOD_WOK_FLAME", "DRONE_DESCENT_GINZA_MAIN", "SUBWAY_CAR_INTERIOR_EMPTY",
  "TOKYO_MIDNIGHT_HORIZON_END"
];

function generateInitialClips(): { clips: TimelineClip[]; transitions: TimelineTransition[] } {
  const clips: TimelineClip[] = [];
  const transitions: TimelineTransition[] = [];

  // 1. Generate 55 Contiguous V1 Clips
  let currentV1Frame = 0;
  const durations = [90, 120, 150, 105, 135, 180, 110, 125, 95, 140, 160];

  TOKYO_V1_TITLES.forEach((title, idx) => {
    const dur = durations[idx % durations.length];
    const clipId = `v1_clip_${idx + 1}`;
    clips.push({
      id: clipId,
      trackId: "V1",
      name: `${title}.mov`,
      startFrame: currentV1Frame,
      durationFrames: dur,
      speed: 1.0,
      sourceUri: `asset_editor_3panel_${(idx % 5) + 5}.png`,
      color: idx % 2 === 0 ? "#1C2438" : "#1A2234",
    });

    // Injected transition between adjacent cuts
    if (idx > 0) {
      transitions.push({
        id: `trans_${idx}`,
        trackId: "V1",
        fromClipId: `v1_clip_${idx}`,
        toClipId: clipId,
        type: "cross-dissolve",
        durationFrames: 15,
      });
    }

    currentV1Frame += dur;
  });

  const totalV1Frames = currentV1Frame;

  // 2. Generate V2 Overlay B-Roll Clips (12 staggered clips)
  const v2Overlays = [
    { title: "METRO_PASS_OVERLAY.mov", offset: 180, dur: 90 },
    { title: "NEON_GLITCH_MATTE.mov", offset: 540, dur: 105 },
    { title: "DRONE_ESTABLISHING.mov", offset: 1080, dur: 130 },
    { title: "RAIN_PUDDLE_REFLECT.mov", offset: 1650, dur: 120 },
    { title: "HOLOGRAM_HUD_ELEMENT.mov", offset: 2200, dur: 140 },
    { title: "ANAMORPHIC_STREAK_FX.mov", offset: 2850, dur: 110 },
    { title: "SMOKE_DISPERSION_MATTE.mov", offset: 3500, dur: 125 },
    { title: "LENS_DUST_PARTICLES.mov", offset: 4100, dur: 160 },
    { title: "CYBER_GRID_OVERLAY.mov", offset: 4800, dur: 100 },
    { title: "CITY_LIGHTS_BOKEH.mov", offset: 5350, dur: 130 },
    { title: "CRT_SCANLINE_TEXTURE.mov", offset: 5900, dur: 115 },
    { title: "FINAL_CREDITS_GLOW.mov", offset: 6400, dur: 150 },
  ];

  v2Overlays.forEach((ov, idx) => {
    clips.push({
      id: `v2_clip_${idx + 1}`,
      trackId: "V2",
      name: ov.title,
      startFrame: ov.offset,
      durationFrames: ov.dur,
      speed: 1.0,
      sourceUri: `asset_editor_3panel_${(idx % 4) + 5}.png`,
      color: "#162134",
    });
  });

  // 3. Generate T1 Dynamic Subtitles / Captions (20 clips)
  const subtitles = [
    "NEON LIGHTS REFLECTING ON ASPHALT",
    "THE RAIN NEVER CEASES IN NEO-TOKYO",
    "SECTOR 04: BIOMETRIC CLEARANCE OK",
    "SPEED LIMIT EXCEEDED: 184 KM/H",
    "TRANSMITTING ENCRYPTED TELEMETRY",
    "NVME CACHE AT MAXIMUM BANDWIDTH",
    "HIGH-FREQUENCY TRADING RELAY CONNECTED",
    "ATMOSPHERIC DISTORTION: 14 PERCENT",
    "SHIBUYA JUNCTION AI PROTOCOL ACTIVE",
    "AUDIO PEAKS NORMALIZED TO -14 LUFS",
    "SURVEILLANCE DRONE APPROACHING GRID",
    "HARDWARE DECODER ENGAGED: NVENC HEVC",
    "REFLECTIVE ROAD SURFACE IDENTIFIED",
    "SUBTITLE STEM GENERATED VIA LOCAL STT",
    "COLOR SPACE MATCH: ACEScc REC.709",
    "FRAME DROP RATE DETECTED: ZERO PERCENT",
    "KINETIC TYPOGRAPHY LOCK: ENABLED",
    "OPTICAL FLOW MOTION INTERPOLATION",
    "APPROACHING FINAL SEQUENCE SEGMENT",
    "WORKSTATION RENDER READY FOR EXPORT",
  ];

  let t1Start = 30;
  subtitles.forEach((sub, idx) => {
    const dur = 100 + (idx % 3) * 20;
    clips.push({
      id: `t1_clip_${idx + 1}`,
      trackId: "T1",
      name: sub,
      startFrame: t1Start,
      durationFrames: dur,
      speed: 1.0,
      sourceUri: "subtitles.srt",
      color: "#262214",
    });
    t1Start += dur + 30;
  });

  // 4. Generate A1 Dialogue / Voiceover Stems (continuous multi-block voiceover)
  const voBlocks = [
    { title: "VO_ACTOR_INTRO_PART1_48K.wav", dur: 1200 },
    { title: "VO_ACTOR_NARRATIVE_SCENE2.wav", dur: 1500 },
    { title: "VO_ACTOR_CLIMAX_SPEECH.wav", dur: 1800 },
    { title: "VO_ACTOR_OUTRO_REFLECTIONS.wav", dur: Math.max(1200, totalV1Frames - 4500) },
  ];
  let a1Start = 0;
  voBlocks.forEach((vo, idx) => {
    clips.push({
      id: `a1_clip_${idx + 1}`,
      trackId: "A1",
      name: vo.title,
      startFrame: a1Start,
      durationFrames: vo.dur,
      speed: 1.0,
      sourceUri: "vo_dialogue.wav",
      color: "#0E241B",
      volumeMultiplier: 0.95,
    });
    a1Start += vo.dur + 10;
  });

  // 5. Generate A2 Music Bed (Continuous Master Track)
  clips.push({
    id: "a2_clip_1",
    trackId: "A2",
    name: "CYBER_SYNTH_WAVE_BED_MASTER.wav",
    startFrame: 0,
    durationFrames: totalV1Frames + 300,
    speed: 1.0,
    sourceUri: "synthwave_bed.wav",
    color: "#241A0C",
    volumeMultiplier: 0.75,
  });

  // 6. Generate A3 SFX & Foley Stems (18 spot effects)
  const sfxList = [
    { title: "SWOOSH_RISE_01.wav", start: 120, dur: 60 },
    { title: "SUB_IMPACT_BOOM_4K.wav", start: 360, dur: 75 },
    { title: "NEON_FLICKER_HUM.wav", start: 680, dur: 90 },
    { title: "HIGHWAY_WHOOSH_STEREO.wav", start: 1040, dur: 70 },
    { title: "RAIN_BURST_FOLEY.wav", start: 1450, dur: 110 },
    { title: "METRO_CHIME_BELL.wav", start: 1900, dur: 50 },
    { title: "SUB_DROP_808.wav", start: 2350, dur: 85 },
    { title: "CYBER_CLICK_INTERFACE.wav", start: 2750, dur: 45 },
    { title: "THUNDER_RUMBLE_DEEP.wav", start: 3200, dur: 130 },
    { title: "CAR_SKID_TIRE_SMOKE.wav", start: 3750, dur: 95 },
    { title: "HEARTBEAT_BASS_PULSE.wav", start: 4250, dur: 80 },
    { title: "GLITCH_STATIC_BURST.wav", start: 4700, dur: 65 },
    { title: "LASER_CHARGE_SWEEP.wav", start: 5100, dur: 85 },
    { title: "DOOR_SLAM_HEAVY_STEEL.wav", start: 5550, dur: 70 },
    { title: "REVERB_TAIL_EXPLOSION.wav", start: 5950, dur: 120 },
    { title: "WIND_CHIME_TEMPLE.wav", start: 6300, dur: 80 },
    { title: "WARP_DRIVE_DISCHARGE.wav", start: 6600, dur: 90 },
  ];

  sfxList.forEach((sfx, idx) => {
    clips.push({
      id: `a3_clip_${idx + 1}`,
      trackId: "A3",
      name: sfx.title,
      startFrame: sfx.start,
      durationFrames: sfx.dur,
      speed: 1.0,
      sourceUri: "sfx_boom.wav",
      color: "#0F1C2B",
      volumeMultiplier: 0.85,
    });
  });

  return { clips, transitions };
}

const { clips: INITIAL_CLIPS, transitions: INITIAL_TRANSITIONS } = generateInitialClips();

export const useTimelineStore = create<TimelineState>((set) => ({
  tracks: INITIAL_TRACKS,
  clips: INITIAL_CLIPS,
  selectedClipId: "v1_clip_1",
  transitions: INITIAL_TRANSITIONS,
  zoomPxPerSecond: 65,
  activeTool: "v",
  snappingEnabled: true,

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
      zoomPxPerSecond: Math.max(20, Math.min(140, Math.round(px))),
    }),

  setActiveTool: (activeTool) => set({ activeTool }),

  toggleSnapping: () => set((state) => ({ snappingEnabled: !state.snappingEnabled })),

  setSnapping: (snappingEnabled) => set({ snappingEnabled }),

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
        name: `${clip.name.replace(/\.[^/.]+$/, "")}_cut.mov`,
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
