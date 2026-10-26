# Apex Studio Pro — Engineering Phases & Implementation Roadmap

## Overview
- **Tech Stack:** Vite + React 18 (TypeScript), Tailwind CSS (Industrial Obsidian Theme), Zustand State Machine, Tauri v2 (Rust Backend), static FFmpeg/FFprobe binaries.
- **Current State:** UI component screens ingested into `src/components/`, styling assets downloaded to `src/assets/`, base git rules established.

---

## Phase 0: Scaffolding, Toolchain & Dependency Installation
- **Objective:** Establish the desktop application foundation, missing build tools, and package dependencies without breaking existing source code.
- **Step 0.1: Package Setup & Core Dependencies**
  - Install dev tooling: `@tauri-apps/cli`, `vite`, `@vitejs/plugin-react`, `tailwindcss`, `postcss`, `autoprefixer`.
  - Install runtime dependencies: `@tauri-apps/api`, `zustand`, `lucide-react`, `clsx`, `tailwind-merge`.
  - Configure `package.json` scripts:
    * `"dev": "vite"`
    * `"build": "tsc && vite build"`
    * `"preview": "vite preview"`
    * `"tauri": "tauri"`
- **Step 0.2: Native Tauri v2 Shell Initialization (`src-tauri`)**
  - Execute `npx tauri init` inside the existing workspace:
    * App Name: `apex-studio-pro`
    * Window Title: `Apex Studio Pro`
    * Web Assets Location: `../dist`
    * Dev Server URL: `http://localhost:5173`
    * Dev Command: `npm run dev`
    * Build Command: `npm run build`
  - Verify generated `src-tauri/Cargo.toml`, `src-tauri/tauri.conf.json`, and `src-tauri/src/main.rs`.
- **Step 0.3: Style & Theme Injection**
  - Configure `tailwind.config.js` to support the obsidian workstation color palette (#07090F, #0B0F19, #121824, #1E2536, #232938) and 2px–4px corner radii.
  - Set up `src/index.css` with `@tailwind` directives and dark desktop body reset.
- **Exit Criteria:** `npm install` runs cleanly, `src-tauri` is initialized, and `npx tsc --noEmit` / `npm run build` executes without missing package errors.

---

## Phase 1: Component Health, Shell Mounting & Dev Verification
- **Objective:** Fix syntax regressions in imported screens and mount the unified application shell.
- **Tasks:**
  - Fix unmatched JSX braces in `src/components/ProjectHubScreen.tsx` (lines 411–427).
  - Clean up any broken icon imports or type mismatches in `src/components/`.
  - Mount `ApexStudioApp.tsx` inside `src/App.tsx` and wire root rendering in `src/main.tsx`.
  - Launch Vite dev server and confirm zero runtime console errors across all 6 screens.
- **Exit Criteria:** `npm run dev` serves the full workstation UI in the browser, and `npx tauri dev` compiles and opens the native Windows desktop frame.

---

## Phase 2: Zustand State Architecture & Playhead Engine
- **Objective:** Replace static component data with deterministic reactive stores.
- **Tasks:**
  - Implement `src/store/useProjectStore.ts` (project metadata, aspect ratio [9:16, 16:9, 1:1], base FPS, current view: HUB vs EDITOR, modal states).
  - Implement `src/store/useTimelineStore.ts` (track lanes V2, V1, T1, A1, A2, A3, clip segment arrays, active selection, transitions collection).
  - Implement `src/store/usePlaybackStore.ts` (SMPTE timecode formatting `HH:MM:SS:FF`, sub-frame playhead positioning, transport play/pause state).
  - Wire timeline scrubbing: Dragging the playhead cursor updates both the program monitor and the timecode readouts in real time.
- **Exit Criteria:** Switching between Project Hub and Editor dynamically alters workspace view; scrubbing playhead updates all telemetry readouts synchronously.

---

## Phase 3: Virtualized 55+ Clip Timeline & Audio Waveforms
- **Objective:** Construct a high-density, performant multi-track timeline dock capable of handling large media sequences without DOM thrashing.
- **Tasks:**
  - Build `VirtualizedTrackV1` using viewport calculation to render only visible clip segments during zoom/pan.
  - Implement timecode tick ruler scaling dynamically from 20 px/s to 140 px/s with `Shift+Z` fit-to-screen support.
  - Implement SVG/Canvas waveform renderers for audio lanes (A1 Dialogue, A2 Music, A3 SFX).
  - Implement timeline editing tools: Selection (V), Razor Cut (C), Ripple Edit (B), Snapping toggle (S).
- **Exit Criteria:** Timeline renders 55+ clips and multi-track audio smoothly at 60 FPS during zoom and horizontal scrub.

---

## Phase 4: Automated Sync Engine & Contextual Parameter Inspector
- **Objective:** Transition customizer, subtitle styler, and auto-speed ramp computation.
- **Tasks:**
  - Implement `src/lib/autoSyncEngine.ts` to compute speed multiplier balancing V1 video clips to A1 voiceover duration.
  - In Auto Sync mode: Automatically inject 0.3s Cross-Dissolve nodes between all adjacent V1 cuts.
  - Connect `InspectorContextualScreen.tsx` draggable number scrubbers (Scale, Position, Rotation, Retime Speed, Volume dB) to active Zustand selections.
  - Wire caption typography inspector (font family, font size, fill/stroke colors, placement anchors) to track T1 subtitle blocks.
- **Exit Criteria:** Toggling Auto Sync updates clip durations, injects transition nodes, and updates monitor telemetry badge.

---

## Phase 5: Project Schema Serialization (`.hve` Persistence)
- **Objective:** Robust project save/load architecture and session recovery.
- **Tasks:**
  - Implement `src/lib/hveSerializer.ts` to serialize/deserialize all track states, transition arrays, and project meta into the `.hve` JSON schema.
  - Implement "Save Project (.hve)" file export and "Open Project (.hve)" workspace hydration.
  - Integrate continuous IndexedDB snapshot persistence (`useIndexedDbPersist.ts`) to recover projects after crash or accidental exit.
- **Exit Criteria:** Saving a 55-clip project to `.hve`, resetting state, and reloading reinstates all clip timings, speed multipliers, and subtitles identically.

---

## Phase 6: Tauri Rust Commands & Hardware-Accelerated FFmpeg Pipeline
- **Objective:** Native desktop OS file integration and export rendering.
- **Tasks:**
  - Bundle static `ffmpeg.exe` and `ffprobe.exe` binaries into `src-tauri/bin/`.
  - Implement Tauri Rust IPC commands (`src-tauri/src/commands/`):
    * `scan_local_media_metadata`: Extract duration, codecs, FPS via `ffprobe`.
    * `run_ffmpeg_render`: Construct dynamic FFmpeg filtergraph (concat, setpts speed ramps, xfade transitions, subtitle burn-in, NVENC/QSV hardware acceleration flags).
    * `get_system_telemetry`: Return GPU load and NVMe read speeds.
  - Connect `DeliverExportScreen.tsx` render button to Tauri IPC, piping stdout progress lines to the progress bar and ETA ticker.
- **Exit Criteria:** Clicking "Start Hardware Render" triggers FFmpeg and outputs a playable `.mp4` file to `D:\Video_studio\Exports\`.

---

## Phase 7: Packaging, Verification & Release Build
- **Objective:** Production installer generation and validation matrix.
- **Tasks:**
  - Run production Tauri build (`npm run tauri build`) to produce the native Windows `.msi` / `.exe` installer.
  - Verify binary bundle size meets the target footprint (< 100 MB).
  - Run validation tests defined in `IMPLEMENTATION.md` (RAM usage under 450 MB, zero dropped frames on playback).
- **Exit Criteria:** Installer runs on a clean Windows machine and produces a functional, standalone desktop workstation.

