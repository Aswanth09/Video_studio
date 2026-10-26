Application Flow & State Transition Architecture (AppFlow)[ Launch Desktop App (.exe) ]
               │
               ▼
   [ 1. Project Management Hub ]
         │               │
  [New Project]    [Open Project / Recent Card]
         │               │
         ├───────────────┘
         ▼
[ 2. Workspace Initialization (Editor View) ]
         │
         ├───► A. Ingest Media (Drag & Drop 55+ Clips + Audio Stem)
         │           │
         │           ▼
         │     [ Mode Selection HUD ]
         │     ├──► [ Auto Sync: ON ]  ──► Proportional Speed Ramp + Auto-Transitions Injected
         │     └──► [ Auto Sync: OFF ] ──► Native 1.0x Durations + Manual Razor/Trim Controls
         │
         ├───► B. Ingest Captions
         │           │
         │           ├──► [ Auto-STT Analysis ] ──┐
         │           └──► [ Import .SRT / Paste ] ┴──► Synchronize to Timeline T1 Track
         │                                                      │
         │                                                      ▼
         │                                         [ Select Style Preset 1-5 ]
         │                                         (Real-time Canvas Shader Overlay)
         │
         ├───► C. Timeline Assembly & Review
         │           │
         │           ├──► Scrub / Playhead Preview (Canvas Monitor)
         │           ├──► Drag-and-Drop Clip Re-ordering
         │           ├──► Razor Split (C) / Edge Trimming
         │           └──► Transition Customization (Inspector Panel)
         │
         └───► D. Export & Delivery
                     │
                     ▼
             [ Export Modal Trigger ]
                     │
                     ├──► Select Format (MP4 / SRT / ASS / HVE)
                     ├──► Select Preset (9:16 Shorts, 1080p, 4K)
                     ▼
             [ Local FFmpeg Render Pipeline ] ──► Final Video Master Generated
1. Screen State Definitions+-----------------------------------------------------------------------------------------+
|                                    APPLICATION STATE MAP                                |
+------------------------+------------------------------------+---------------------------+
| State Identifier       | Screen / Modal                     | Description               |
+------------------------+------------------------------------+---------------------------+
| STATE_HUB              | Project Management Dashboard       | Landing view & recents    |
| STATE_MODAL_NEW        | New Project Setup Modal            | Resolution/Aspect select  |
| STATE_WORKSPACE_EMPTY  | Clean Editor (Zero Clips Loaded)   | Upload dropzone view      |
| STATE_WORKSPACE_ACTIVE | 3-Panel Pro Workspace              | Full editing interface    |
| STATE_MODAL_EXPORT     | Production Render Modal            | Preset & format dispatch  |
| STATE_RENDERING        | FFmpeg Progress Overlay            | Hardware-encoding progress|
+------------------------+------------------------------------+---------------------------+
2. Detailed Navigation & User JourneysFlow 1: Initialization & Project CreationLaunch: 
Executable initializes local WebView2 instance, checks for active session cache in 
IndexedDB.Dashboard (STATE_HUB):Displays recent project cards with thumbnail, duration, 
clip count, and modification date.Clicking Open Project launches the native Windows File 
Picker targeting .hve files.Clicking New Project opens STATE_MODAL_NEW.Configuration 
(STATE_MODAL_NEW):User selects Aspect Ratio: 9:16 (Shorts/Reels), 16:9 (Landscape), or 1:1 
(Square).User names project and clicks Create. Transitions directly to 
STATE_WORKSPACE_EMPTY.Flow 2: Ingestion & Hybrid Sync ExecutionMedia Ingestion:User drags a 
folder of 55 scene clips and 1 master audio file into the left panel dropzone.System 
populates V1 (Video) track and A1 (Audio) track consecutively. State transitions to 
STATE_WORKSPACE_ACTIVE.Branching Sync Logic:Path A — Auto Sync (Default):User toggles Sync 
Mode: Auto.System aggregates total duration of the 55 video clips against master audio 
track length.Speed multiplier calculated:$$\text{Multiplier} = \frac{\sum \text{Native Clip 
Durations}}{\text{Master Audio Duration}}$$Proportional speed ramping applies across all 55 
clips simultaneously.Automated 0.3s Cross Dissolve transition nodes are inserted at every 
cut boundary between clips.Path B — Manual Mode:User switches Sync Mode: Manual.
Proportional scaling resets to 1.0x.Transition nodes become customizable or removable.User 
activates Razor Tool (C) to split clips at the playhead or drags boundary trim handles to 
alter durations independently.Flow 3: Caption Pipeline & StylingIngestion Trigger:Option 1 
(Auto-STT): User clicks Auto-STT. Audio stream processes into timestamped text tokens 
mapped to track T1.Option 2 (File Import): User drags a .srt file or pastes timestamped 
text into the importer modal. Chunks parse immediately to track T1.Template Stamping:User 
selects one of 5 presets from the Inspector Panel (TikTok Yellow, Cyberpunk Neon, Swiss 
Editorial, Live Karaoke, Action Stencil).Canvas monitor updates in real time using active 
shader styling with live word-by-word tracking.Flow 4: Export & Output ProcessingTrigger: 
User clicks Export Master from the top header HUD.Modal (STATE_MODAL_EXPORT):Configures 
target resolution (e.g., 1080x1920), frame rate (30fps or 60fps), and bit depth.Toggles 
subtitle delivery: Burn into Video or Export Separate .SRT/.ASS.Execution (STATE_RENDERING)
:Native local FFmpeg binary starts encoding frames via hardware acceleration.Progress bar 
updates from 0% to 100% with real-time ETA and frame counters.Upon completion, a native 
Windows toast notification fires, and the file destination folder opens automatically.
