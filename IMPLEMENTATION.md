IMPLEMENTATION.md — Apex Studio Pro Desktop Execution Plan1. System Architecture & Technical Stack+-------------------------------------------------------------------------------+
|                        Apex Studio Pro (Native Windows .exe)                  |
+-------------------------------------------------------------------------------+
|  Frontend Layer (WebView2 Engine)                                            |
|  - React 18 / TypeScript / Vite                                               |
|  - Tailwind CSS (Custom Industrial Matte Design System, 2px–4px Radii)        |
|  - State Core: Zustand (Synchronous Track & Playhead State Machine)           |
|  - Audio Visualization: HTML5 Web Audio API + SVG Path Generators            |
|  - Canvas Preview: WebGL / 2D Canvas Context with Sub-frame Precision Playhead|
+-------------------------------------------------------------------------------+
|  IPC Bridge (Tauri v2 Core - Rust FFI)                                        |
|  - Direct Local File System Access (Zero-Copy Buffer Streaming)               |
|  - Child Process Spawning (`ffmpeg`, `ffprobe`)                               |
|  - Native OS Dialogs (File Pickers, Directory Scanners)                       |
|  - System Hardware Telemetry (GPU Vendor, NVMe Bandwidth, CPU Core Load)      |
+-------------------------------------------------------------------------------+
|  Native Binary & Storage Layer                                                |
|  - Bundled Static `ffmpeg.exe` & `ffprobe.exe` (Hardware Encoders: NVENC/QSV)|
|  - Project Schema Persistence: Local `.hve` JSON Deserializer / Serializer    |
|  - Fast Cache: Browser IndexedDB (Session Recovery & Waveform Cache)          |
+-------------------------------------------------------------------------------+
2. Directory & Workspace StructureD:\Video_studio\
├── .git\
├── PRd.md
├── Appflow.md
├── IMPLEMENTATION.md
├── src-tauri\
│   ├── Cargo.toml
│   ├── tauri.conf.json
│   ├── icons\
│   ├── bin\
│   │   ├── ffmpeg.exe
│   │   └── ffprobe.exe
│   └── src\
│       ├── main.rs
│       ├── commands\
│       │   ├── filesystem.rs
│       │   ├── ffmpeg_runner.rs
│       │   └── telemetry.rs
│       └── state.rs
├── src\
│   ├── index.html
│   ├── main.tsx
│   ├── App.tsx
│   ├── types\
│   │   ├── project.ts
│   │   ├── timeline.ts
│   │   └── inspector.ts
│   ├── store\
│   │   ├── useProjectStore.ts
│   │   ├── useTimelineStore.ts
│   │   └── usePlaybackStore.ts
│   ├── styles\
│   │   └── industrial-theme.css
│   ├── components\
│   │   ├── shell\
│   │   │   ├── TitleBar.tsx
│   │   │   └── NleRibbon.tsx
│   │   ├── hub\
│   │   │   ├── ProjectHub.tsx
│   │   │   ├── NewProjectModal.tsx
│   │   │   └── RecentProjectCard.tsx
│   │   ├── editor\
│   │   │   ├── EditorWorkspace.tsx
│   │   │   ├── left-panel\
│   │   │   │   ├── MediaPool.tsx
│   │   │   │   ├── CaptionHub.tsx
│   │   │   │   ├── TransitionLibrary.tsx
│   │   │   │   └── IngestProgressStrip.tsx
│   │   │   ├── center-panel\
│   │   │   │   ├── ProgramMonitor.tsx
│   │   │   │   ├── TransportDeck.tsx
│   │   │   │   ├── SyncModeHud.tsx
│   │   │   │   └── AudioPeakMeter.tsx
│   │   │   ├── right-panel\
│   │   │   │   ├── InspectorTabs.tsx
│   │   │   │   ├── VideoTransformModule.tsx
│   │   │   │   ├── TransitionCustomizer.tsx
│   │   │   │   ├── CaptionStylingEngine.tsx
│   │   │   │   └── AudioMixerModule.tsx
│   │   │   ├── timeline\
│   │   │   │   ├── TimelineToolbar.tsx
│   │   │   │   ├── TrackHeaders.tsx
│   │   │   │   ├── TimelineRuler.tsx
│   │   │   │   ├── MultiTrackCanvas.tsx
│   │   │   │   ├── VirtualizedTrackV1.tsx
│   │   │   │   ├── WaveformRenderer.tsx
│   │   │   │   ├── TransitionNode.tsx
│   │   │   │   └── PlayheadNeedle.tsx
│   │   │   └── modals\
│   │   │       ├── ExportRenderModal.tsx
│   │   │       └── RenderProgressOverlay.tsx
│   ├── lib\
│   │   ├── autoSyncEngine.ts
│   │   ├── srtParser.ts
│   │   ├── hveSerializer.ts
│   │   └── smpteTimecode.ts
│   └── hooks\
│       ├── useIndexedDbPersist.ts
│       ├── useTimelineZoom.ts
│       └── useAudioAnalyser.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.js
3. Data Schema & Contracts3.1 Project Schema (.hve specification)TypeScriptexport interface HveProjectFile {
  schemaVersion: "2.4.0";
  meta: {
    id: string;
    name: string;
    createdAt: number;
    updatedAt: number;
    aspectRatio: "9:16" | "16:9" | "1:1";
    baseFps: 24 | 29.97 | 30 | 59.94 | 60;
    resolution: { width: number; height: number };
    durationFrames: number;
  };
  syncSettings: {
    mode: "auto" | "manual";
    speedRatio: number;
    autoTransitionDurationSec: number;
    autoTransitionType: "cross-dissolve" | "dip-to-black";
    audioAnchorTrackId: "A1";
  };
  tracks: {
    v2: VideoClipSegment[];
    v1: VideoClipSegment[];
    t1: CaptionSegment[];
    a1: AudioSegment[];
    a2: AudioSegment[];
    a3: AudioSegment[];
  };
  transitions: TransitionDefinition[];
}

export interface VideoClipSegment {
  id: string;
  sourceFilePath: string;
  name: string;
  inPointFrames: number;
  outPointFrames: number;
  durationFrames: number;
  speedMultiplier: number;
  transform: {
    scale: number;
    positionX: number;
    positionY: number;
    rotationDeg: number;
    opacity: number;
    blendMode: "normal" | "screen" | "multiply" | "overlay";
  };
}

export interface TransitionDefinition {
  id: string;
  type: "cross-dissolve" | "dip-to-black" | "whip-pan" | "zoom-blur";
  cutIndexBetween: [number, number]; // Index of Clip A and Clip B on V1
  durationSec: number;
  alignment: "left" | "center" | "right";
  easing: "linear" | "ease-in-out" | "exponential";
}

export interface CaptionSegment {
  id: string;
  startSec: number;
  endSec: number;
  text: string;
  presetStyleId: "viral-kinetic" | "cyber-mono" | "swiss-minimal" | "karaoke" | "blockbuster";
  customStyle?: {
    fontFamily: string;
    fontSizePx: number;
    fillColorHex: string;
    strokeColorHex: string;
    strokeWidthPx: number;
    positionAnchor: "top" | "center" | "lower-third";
  };
}
4 Implementation Phases & MilestonesPhase 1: Environment Setup & Native Tauri ShellInitialize Vite + React + TypeScript + Tailwind inside D:\Video_studio.Configure Tauri v2 with tauri.conf.json targeting standard Windows desktop flags (borderless window, custom titlebar draggable region, minimum window bounds 1280x720).Configure bundled ffmpeg.exe and ffprobe.exe binaries inside src-tauri/bin/ as external dependencies.Implement Rust commands for:scan_local_media_metadata(file_paths: Vec<String>) -> Vec<MediaMetadata>read_project_hve(path: String) -> Stringwrite_project_hve(path: String, content: String) -> boolget_system_telemetry() -> TelemetryPayload (Hardware acceleration check, available NVMe throughput).Phase 2: State Store & Storage PersistenceImplement Zustand stores:useProjectStore: Handles project metadata, active view (VIEW_HUB vs VIEW_EDITOR), and modal states.useTimelineStore: Handles tracks, clip collections, auto/manual sync state, and transitions.usePlaybackStore: Handles frame-rate timing, current playhead position, playback status, and transport steppers.Implement IndexedDB continuous autosave (useIndexedDbPersist):Serializes Zustand state snapshots to IndexedDB every 2 seconds on edit events.On app startup, checks for recovery snapshots before defaulting to VIEW_HUB.Phase 3: Project Hub & Modal FlowsImplement VIEW_HUB:New Project Modal with aspect ratio selectors (9:16, 16:9, 1:1).Native file picker trigger to load .hve projects.Recent project cards populated from IndexedDB indices.Establish clean-slate workspace generation:Clicking "Create Project" resets Zustand stores to empty tracks and routes cleanly to VIEW_EDITOR.Phase 4: Left Panel Media Pool & Ingestion EngineImplement Drag & Drop zone supporting 55+ file inputs via Tauri drop events.Parse local file streams using ffprobe to extract resolution, framerate, and native duration without loading entire video buffers into JS heap.Implement the Subtitle / Caption Ingestion Engine:Text area parser for .srt and raw timestamp formats.Caption preset cards with real-time CSS/SVG overlay renderers.Phase 5: Center Stage Program Monitor & PlaybackConstruct the Program Monitor using an HTML5 Canvas backed by requestAnimationFrame.Map transport deck events: Space (Play/Pause), Left Arrow (Step -1 frame), Right Arrow (Step +1 frame), Up/Down (Jump to Cut).Build the hardware-styled vertical Stereo Peak VU Meter using Web Audio API AudioWorklet / AnalyserNode.Integrate the Auto Sync HUD bar above the monitor with active status badges.Phase 6: Multi-Track Timeline Dock & Automated Transition EngineImplement the horizontal timeline ruler with dynamic SMPTE time ticks based on zoom level (20 px/s to 140 px/s).Build VirtualizedTrackV1:Calculate CSS translate offsets dynamically so only clips inside the active viewport boundary are rendered into DOM.Clip blocks with duration tags, speed indicators, and micro trim bracket handles.Implement autoSyncEngine.ts:Calculates:$$\text{Speed Multiplier} = \frac{\sum \text{Native Durations of Video Clips}}{\text{Duration of Dialogue Track A1}}$$Automatically updates speedMultiplier on all V1 clips.Injects 0.3s Cross-Dissolve transitions between all contiguous clips on V1.Implement the interactive playhead needle with smooth scrubbing and sync to monitor frames.Phase 7: Contextual Inspector PanelImplement 4-tab panel (VIDEO, TRANSITIONS, CAPTIONS, AUDIO).Build reusable Draggable Number Input components for precision adjustments (Scale, Position, Rotation, Speed Multiplier, Volume dB).Connect transition parameters directly to selected transition nodes on the timeline.Connect caption parameters directly to the active subtitle block on track T1.Phase 8: Production Export Pipeline (FFmpeg Integration)Build ExportRenderModal with presets (9:16 Shorts, 16:9 Cinema, 1:1 Square, Custom).Map export settings into a dynamic FFmpeg command string in Rust:Constructs concat demuxer inputs for the 55+ clip sequence.Applies speed scaling filters (setpts=PTS/MULTIPLIER).Applies xfade filter graphs for automated transitions between cuts.Injects burning subtitle filter (subtitles=temp.srt:force_style='...') if burn-in is selected.Hardware acceleration flags: -c:v h264_nvenc (NVIDIA) or -c:v h264_qsv (Intel) with fallback to -c:v libx264.Pipe stdout progress lines from ffmpeg.exe to update the real-time progress bar, FPS render speed, and time remaining (ETA).5. Verification & Testing MatrixComponentTarget Metric / ScenarioValidation MethodInstaller Size< 100 MB total executable footprintInspect Tauri NSIS/MSI output bundle size with bundled FFmpeg binariesClip IngestionIngest 55 video clips (5s each, 1080p/4K) simultaneouslyMeasure RAM usage via Windows Task Manager (Target: < 450 MB JS Heap)Auto Sync EngineMatch 55 clips to arbitrary audio file (e.g., 2m 45s voiceover)Verify timeline length matches audio endpoint precisely within ±1 frameAuto Transitions54 automated 0.3s cross-dissolves injected on Auto modeInspect transition node array length and ensure zero overlapping audio phase issuesTimeline ScrubbingScrub 55-clip timeline at 60 FPSEnsure zero frame drops and monitor updates within < 16ms per frameState PersistenceForce close app (Alt+F4) and restartVerify all clips, speed ramps, and captions re-hydrate identically from IndexedDBFFmpeg ExportRender full 9:16 sequence with burned-in subtitlesValidate generated .mp4 playback in VLC/Windows Media Player at target resolution




Additions to IMPLEMENTATION.md
2.1 Environment Configuration & Security Architecture
To keep local paths, build flags, and any API endpoints secure and isolated across development and production, the project utilizes strict environment configuration:

.env (Untracked / Local Only):

Stores machine-specific paths, environment toggles, and any optional keys.

Never committed to the Git repository.

.env.example (Committed Template):

Acts as a boilerplate reference so any collaborator or clean setup can immediately initialize their environment.

Ini, TOML
# .env.example - Environment Template for Apex Studio Pro

# Application Runtime Mode (development | staging | production)
VITE_APP_ENV=development
VITE_APP_TITLE="Apex Studio Pro"
VITE_APP_VERSION="2.4.0-desktop"

# Native Desktop Hardware & Acceleration Flags
VITE_ENABLE_HARDWARE_ACCELERATION=true
VITE_ENABLE_WEBGL_PREVIEW=true
VITE_ENABLE_AUTO_GPU_DETECTION=true

# Local FFmpeg / Binary Overrides (Leave blank to use default src-tauri/bin/)
VITE_CUSTOM_FFMPEG_PATH=""
VITE_CUSTOM_FFPROBE_PATH=""

# Telemetry & Performance Profiling
VITE_DEBUG_RENDER_METRICS=true
VITE_ENABLE_PERF_TELEMETRY=false

# Optional Cloud STT / Transcription Endpoint (If offloaded from local fallback)
VITE_STT_SERVICE_URL=""
VITE_STT_API_KEY=""
2.2 Standard .gitignore Configuration
Create a .gitignore at the root of D:\Video_studio\ to ensure heavy native build artifacts, local caches, media files, and secrets are never committed:

Code snippet
# ==============================================================================
# Apex Studio Pro - Git Ignore Rules
# ==============================================================================

# Environment files & Secrets
.env
.env.local
.env.*.local
*.pem
*.key

# Dependencies
node_modules/
.pnp
.pnp.js

# Build Outputs (Frontend)
dist/
dist-ssr/
build/
*.local

# Tauri / Rust Native Build Outputs
src-tauri/target/
src-tauri/bin/*.exe
src-tauri/bin/*.dll
src-tauri/WixTools/
src-tauri/gen/

# Media Scratchpad & Local Exports (Do not commit heavy test footage)
Exports/
Captures/
Temp/
*.mp4
*.mov
*.wav
*.mp3
*.hve.backup

# Logs & Diagnostics
logs/
*.log
npm-debug.log*
yarn-debug.log*
pnpm-debug.log*

# Editor & OS Metadata
.vscode/*
!.vscode/extensions.json
!.vscode/settings.json
.idea/
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
Thumbs.db
Desktop.ini
.DS_Store

