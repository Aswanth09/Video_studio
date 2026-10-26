Product Requirements Document (PRD)
1. Executive Summary & Objective
Apex Studio Pro is a high-performance native Windows desktop application (.exe) engineered for rapid, professional short-form and long-form video editing. Built using a Tauri + ReactViteTailwind CSS architecture, it targets a lean installer footprint under 100 MB while delivering native hardware-accelerated processing capable of handling 55+ high-resolution clips without memory bottlenecks or browser sandboxing constraints.

The application bridges the gap between automated assembly and granular timeline control through a dual-engine architecture

Auto Mode Dynamic audio-to-video duration matching, proportional speed ramping, and automated transition injection.

Manual Mode Frame-accurate razor slicing, ripple trims, multi-track layering, and unconstrained manual arrangement.

2. Core Personas & User Scenarios
High-Velocity Content Creators Need to ingest 50+ batch-generated AI video clips or stock b-roll, sync them to a voiceover track within seconds, burn in animated kinetic captions, and export directly in 916 format.

Professional Video Editors Require a clean, distraction-free obsidian workspace with frame-level razor trimming, multi-track audiovideo control, custom transition overrides, and offline project file preservation.

3. Product Principles & Design System
Design Language Obsidian dark mode (#07090F, #0B0F19, #121824) paired with slate borders (#1E2536) and electric indigoneon cyan accents (#4F46E5, #06B6D4).

Ergonomics & Typography High-contrast sans-serif UI typography (Inter) for controls and crisp monospaced fonts for SMPTE timecodes (00000000). Zero clutter, 3-panel layout, frosted glass backdrop filters.

Zero Data Loss IndexedDB-backed real-time state caching coupled with local .hve (JSON-based) project file serialization.

4. Key Functional Modules
4.1 Project Management Hub (Landing View)
New Project Initialization Modal selection for aspect ratios (916 Vertical, 169 Landscape, 11 Square Feed, 45 Portrait) and frame rate bases (24fps, 30fps, 60fps).

Recent Projects Grid Visual project cards showing preview thumbnails, project title, duration, clip count, resolution badge, and last modified date.

Project File Interchange One-click open for existing .hve local project files or template imports.

4.2 Asset & Media Library (Left Panel)
Batch Media Ingestion Drag-and-drop or system file picker support for 55+ MP4MOVWebM video clips and MP3WAV audio stems.

Dual Caption Ingestion Engine

Auto Speech-to-Text (STT) Audio track analysis generating timestamped subtitle chunks.

Subtitle FileText Importer Direct parser for .srt files and bracketed text blocks ([0000.000 -- 0003.500]).

Caption Template Library 5 production-grade animated styles (Viral TikTok Yellow, Cyberpunk Indigo & Cyan, Swiss Clean Editorial, Live Karaoke Word-Flow, and Action Blockbuster Stencil).

Transitions & Effects Browser Pre-packaged visual transitions (Cross Dissolve, Dip to Black, Zoom Wipe, Whip Pan, Film Glitch).

4.3 Program Monitor (Center Stage)
Hardware-Accelerated Canvas Smooth 60 FPS playback with safe-title margins (90% boundary), resolution switching, and SMPTE timecode burn-in.

Live Caption HUD Real-time synchronization of animated text layers with current playhead position.

Control Overlay Step frame forwardbackward, playpause, jump to cut point, and active sync-lock status indicator.

4.4 Multi-Track Timeline & Hybrid Sync Engine (Bottom Dock)
Track Stacking Dedicated parallel tracks

V1 Primary Video Sequence

V2 Overlay  B-Roll

A1 Voiceover  Primary Audio Track

A2 Background Music (BGM)

T1 Animated Captions  Subtitles

Sync Mode Toggle (Global State)

Auto Sync (ON) Evaluates master audio length versus sum of video clip durations. Computes speed ratio R = T_audio  T_video and applies proportional speed ramping across all clips. Automatically injects standard 0.3s cross-dissolves at every cut boundary.

Manual Mode (OFF) Restores native 1.0x playback rates. Enables independent trimming, razor cutting, gap placement, and manual transition placement.

Timeline Manipulation Tools

Razor Tool (C) Slices the active clip at the playhead position into two discrete entities.

Trim Handles Sub-frame precision edge dragging for in-point and out-point trimming.

Drag-and-Drop Reordering Direct clip swapping on track V1 with automatic contiguous timeline re-indexing.

Zoom Control Horizontal timeline zoom slider scaling from 25 pxs to 120 pxs with dynamic ruler subdivisions.

Track Controls Individual Mute (M), Solo (S), and Lock (L) switches per track.

4.5 Contextual Inspector (Right Panel)
Clip Transform Speed multiplier (0.25x to 4.0x), scale, position, opacity, and audio gain.

Transition Overrides Duration slider (0.1s to 2.0s), easing curves (Linear, Ease-In-Out, Exponential), and transition type swap.

Caption Fine-Tuning Dynamic font selection, font size, stroke width, text fill color, outline color, glow aura intensity, and position anchors.

4.6 Production Export Hub
Render Engine Bundled local FFmpeg pipeline leveraging hardware encoding (NVENC  QuickSync  AMD AMF).

Export Presets 1080p Full HD, 4K Ultra HD, 916 ShortsReels, 11 Square, 720p Fast Proxy.

Multi-Format Delivery Direct .mp4 master rendering, standalone .srt  .ass subtitle exports, and complete .hve project structure backup.

5. Non-Functional & Technical Specifications
Target OS Windows 1011 (64-bit).

Runtime Tauri v2 (Rust backend + WebView2 frontend).

App Bundle Size  100 MB installer (.exe  MSI).

Memory Consumption Virtualized DOM timeline rendering ensuring RAM usage stays below 450 MB during editing of 55+ clips.

Storage Offline-first architecture using local filesystem paths and persistent browser IndexedDB cache.