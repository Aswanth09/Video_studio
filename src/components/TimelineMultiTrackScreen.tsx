import React, { useState, useEffect, useRef } from "react";
import logoImg from "../assets/apex_studio_logo.png";
import previewImg from "../assets/asset_editor_3panel_9.png";

export interface TimelineMultiTrackScreenProps {
  onNavigate?: (view: string) => void;
  projectName?: string;
}

export const TimelineMultiTrackScreen: React.FC<TimelineMultiTrackScreenProps> = ({
  onNavigate,
  projectName = "Tokyo_Cyberpunk_Master.hve"
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimecode, setCurrentTimecode] = useState<string>("01:04:22:18");
  const [activeTool, setActiveTool] = useState<"v" | "c" | "b" | "a" | "z">("v");
  const [zoomLevel, setZoomLevel] = useState<number>(1.2);
  const [selectedTrack, setSelectedTrack] = useState<string>("V1");
  const [selectedClip, setSelectedClip] = useState<string | null>("TK_RAIN_01.mp4");
  const [snappingEnabled, setSnappingEnabled] = useState<boolean>(true);

  return (
    <div className="bg-background font-body-md text-on-surface select-none min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.4)]"><div className="h-8 px-space-md flex items-center justify-between bg-surface-container-lowest"><div className="flex items-center gap-space-md"><img alt="Apex Studio Pro Logo" className="h-4 w-auto object-contain" src={logoImg}/><span className="font-headline-md text-headline-md tracking-wider text-on-surface uppercase text-xs">Apex Studio Pro</span><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm"><span className="text-outline">Project:</span><span className="text-secondary font-medium">Cyberpunk_Short_v3.hve</span><span className="px-1.5 py-0.5 rounded bg-surface-container-high text-tertiary text-[10px]">4K DCI</span></div></div><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm px-space-md py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant"><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span><span>RTX 4090 / CUDA</span><span className="text-outline">|</span><span className="text-on-surface">59.94 FPS</span></div><div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[14px]">person</span></div><div className="flex items-center"><button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">minimize</span></button><button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">check_box_outline_blank</span></button><button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-on-error-container"><span className="material-symbols-outlined text-[14px]">close</span></button></div></div></div><div className="h-6 px-space-md flex items-center gap-space-md bg-surface-container-low font-body-sm text-body-sm text-on-surface-variant"><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">File</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Edit</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Clip</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Sequence</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">View</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Window</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Help</button></div><div className="h-10 px-space-md flex items-center justify-between bg-surface-container border-b border-surface-container-highest"><nav className="flex items-center gap-space-xs h-full" data-active-classes="bg-surface text-primary border-t-2 border-primary-container font-semibold"><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="projects-hub" href="#">Projects (Hub)</a><a className="h-full flex items-center px-space-lg text-primary border-t-2 border-primary-container bg-surface font-body-sm text-body-sm transition-colors font-semibold" data-path="edit-and-cut" href="#">Edit &amp; Cut</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="color-grade" href="#">Color Grade</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="audio-and-fairlight" href="#">Audio &amp; Fairlight</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="export-and-render" href="#">Export &amp; Render</a></nav><div className="flex items-center gap-space-sm"><div className="flex items-center bg-surface-container-lowest px-space-md py-1 rounded font-label-md text-label-md text-on-surface tracking-widest"><span className="text-outline">01:04:22:</span><span className="text-secondary">18</span></div><button className="flex items-center gap-1 px-space-md py-1 bg-primary-container hover:bg-inverse-primary text-on-primary-container font-body-sm text-body-sm rounded shadow transition-all"><span className="material-symbols-outlined text-[16px]">bolt</span><span>Fast Export</span></button></div></div></header><aside className="fixed left-0 top-24 bottom-6 w-14 bg-surface-container-lowest z-40 flex flex-col items-center py-space-md gap-space-sm"><button className="w-10 h-10 rounded flex items-center justify-center text-primary bg-surface-container hover:bg-surface-container-high transition-colors" title="Selection Tool (V)"><span className="material-symbols-outlined text-[20px]">near_me</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Razor Blade (B)"><span className="material-symbols-outlined text-[20px]">content_cut</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Ripple Edit (B)"><span className="material-symbols-outlined text-[20px]">sync_alt</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Hand / Pan (H)"><span className="material-symbols-outlined text-[20px]">pan_tool</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Keyframe &amp; Pen (P)"><span className="material-symbols-outlined text-[20px]">edit</span></button><div className="w-8 h-px bg-outline-variant my-space-xs"></div><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Media Bins"><span className="material-symbols-outlined text-[20px]">folder_open</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Audio Track Meters"><span className="material-symbols-outlined text-[20px]">graphic_eq</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Scopes &amp; Vectors"><span className="material-symbols-outlined text-[20px]">ssid_chart</span></button><div className="mt-auto flex flex-col items-center gap-space-xs"><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="App Settings"><span className="material-symbols-outlined text-[20px]">settings</span></button></div></aside><div className="pl-14"><main className="w-full pt-24 pb-6 bg-surface h-screen flex flex-col overflow-hidden"><div className="flex flex-col w-full h-[calc(100vh-7.5rem)] text-on-surface bg-[#0A0D14] overflow-hidden select-none font-body-sm">
{/*  Breadcrumb & Workspace Sub-bar  */}
<div className="flex items-center justify-between px-space-md py-1 bg-surface-container-low border-b border-[#1E2330] shrink-0 h-8">
<div className="flex items-center gap-space-md">
<a className="flex items-center gap-1 text-on-surface-variant hover:text-secondary transition-colors font-body-sm text-body-sm" href="#">
<span className="material-symbols-outlined text-[16px]">arrow_back</span>
<span>Projects (Hub)</span>
</a>
<span className="text-outline-variant text-[11px] font-label-sm">/</span>
<div className="flex items-center gap-1.5">
<span className="text-on-surface font-headline-md text-headline-md tracking-tight">Tokyo_Night_Reel_2025.hve</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container text-secondary font-label-sm text-label-sm uppercase tracking-wider">9:16 Vertical</span>
<span className="px-1.5 py-0.2 rounded bg-surface-container-high text-tertiary font-label-sm text-label-sm">60 FPS</span>
</div>
<div className="flex items-center gap-1 text-secondary font-label-sm text-label-sm ml-2">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
<span className="text-on-surface-variant">Auto-Sync Active (54 Injected)</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<div className="flex items-center bg-surface-container-lowest px-2 py-0.5 rounded font-label-sm text-label-sm text-outline border border-[#1E2330]">
<span>MEM CACHE:</span>
<span className="text-secondary ml-1 font-semibold">94%</span>
</div>
<button className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all font-body-sm text-body-sm border border-[#1E2330]">
<span className="material-symbols-outlined text-[14px]">tune</span>
<span>Project Settings</span>
</button>
<button className="p-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-[#1E2330]" title="Split Workspace Layout">
<span className="material-symbols-outlined text-[15px]">view_quilt</span>
</button>
</div>
</div>
{/*  Top 3-Panel Split Area (Upper Viewport: 52% Height)  */}
<div className="grid grid-cols-12 gap-gutter w-full h-[52%] min-h-[300px] p-space-xs bg-[#0A0D14] overflow-hidden border-b border-[#1E2330]">
{/*  LEFT PANEL: Media Pool & Asset Browser (Col 3)  */}
<section className="col-span-3 flex flex-col bg-[#131720] border border-[#232938] rounded-sm overflow-hidden select-none text-[11px] font-body-sm"><div className="flex items-center bg-[#181D28] border-b border-[#232938] h-7 px-1 shrink-0"><button className="px-2.5 h-full flex items-center justify-center font-label-sm text-[10px] uppercase tracking-wider font-semibold text-secondary border-b-2 border-secondary bg-[#131720]">Media Pool</button><button className="px-2.5 h-full flex items-center justify-center font-label-sm text-[10px] uppercase tracking-wider text-outline hover:text-on-surface transition-colors">Captions</button><button className="px-2.5 h-full flex items-center justify-center font-label-sm text-[10px] uppercase tracking-wider text-outline hover:text-on-surface transition-colors">Transitions</button><button className="px-2.5 h-full flex items-center justify-center font-label-sm text-[10px] uppercase tracking-wider text-outline hover:text-on-surface transition-colors">FX</button><div className="ml-auto flex items-center gap-1 text-outline"><button className="w-5 h-5 flex items-center justify-center hover:text-on-surface" title="Search"><span className="material-symbols-outlined text-[13px]">search</span></button><button className="w-5 h-5 flex items-center justify-center hover:text-on-surface" title="View Options"><span className="material-symbols-outlined text-[13px]">tune</span></button></div></div><div className="flex-1 flex flex-col overflow-hidden bg-[#131720]"><div className="p-1.5 bg-[#181D28]/60 border-b border-[#232938] flex flex-col gap-1 shrink-0"><div className="flex items-center justify-between text-[10px] font-label-sm text-outline px-0.5"><span>PROJECT BINS</span><span className="text-[9px] text-secondary font-mono">3 FOLDERS</span></div><div className="flex flex-col gap-0.5"><div className="flex items-center justify-between px-1.5 py-1 rounded-sm bg-[#1C2230] text-secondary border border-[#232938] cursor-pointer"><div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-outline">expand_more</span><span className="material-symbols-outlined text-[13px] text-secondary">folder</span><span className="font-mono font-medium text-[10px]">01_RAW_CLIPS</span></div><span className="font-mono text-[9px] px-1 py-0.2 rounded-sm bg-[#131720] text-secondary">55+</span></div><div className="flex items-center justify-between px-1.5 py-0.5 rounded-sm text-on-surface-variant hover:bg-[#181D28] cursor-pointer"><div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-outline">chevron_right</span><span className="material-symbols-outlined text-[13px] text-outline">folder</span><span className="font-mono text-[10px]">02_AUDIO_STEMS</span></div><span className="font-mono text-[9px] px-1 rounded-sm bg-[#181D28] text-outline">6</span></div><div className="flex items-center justify-between px-1.5 py-0.5 rounded-sm text-on-surface-variant hover:bg-[#181D28] cursor-pointer"><div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-outline">chevron_right</span><span className="material-symbols-outlined text-[13px] text-outline">folder</span><span className="font-mono text-[10px]">03_GRAPHICS</span></div><span className="font-mono text-[9px] px-1 rounded-sm bg-[#181D28] text-outline">9</span></div></div></div><div className="p-1.5 bg-[#0C0E14] border-b border-[#232938] flex flex-col gap-1 shrink-0"><div className="border border-dashed border-[#232938] hover:border-secondary/40 rounded-sm p-1 flex items-center justify-between cursor-pointer"><div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-outline">cloud_upload</span><span className="text-[10px] text-outline">Drag 55+ files or click to ingest</span></div><span className="text-[9px] font-mono text-outline border border-[#232938] px-1 rounded-sm">INGEST</span></div><div className="flex items-center justify-between text-[9px] font-label-sm text-outline px-0.5"><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span><span className="text-on-surface-variant">NVMe Stream: Ready</span></div><span className="font-mono text-secondary">3.2 GB/s</span></div></div><div className="flex-1 overflow-y-auto flex flex-col bg-[#0C0E14]"><div className="sticky top-0 bg-[#181D28] border-b border-[#232938] grid grid-cols-12 px-1.5 py-0.5 text-[9px] font-label-sm uppercase tracking-wider text-outline z-10"><span className="col-span-6">Clip Name</span><span className="col-span-2 text-center">Res</span><span className="col-span-2 text-right">Dur</span><span className="col-span-2 text-right">FPS</span></div><div className="divide-y divide-[#232938]"><div className="grid grid-cols-12 px-1.5 py-1 text-[10px] font-mono bg-[#1C2230] border-l-2 border-secondary cursor-pointer items-center"><div className="col-span-6 truncate flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-secondary">videocam</span><span className="text-white font-medium truncate">SHIBUYA_01.MOV</span></div><span className="col-span-2 text-center text-secondary text-[9px]">4K DCI</span><span className="col-span-2 text-right text-on-surface-variant text-[9px]">00:18:24</span><span className="col-span-2 text-right text-outline text-[9px]">24.00</span></div><div className="grid grid-cols-12 px-1.5 py-1 text-[10px] font-mono hover:bg-[#181D28] cursor-pointer items-center text-on-surface-variant"><div className="col-span-6 truncate flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-outline">videocam</span><span className="truncate">CYBER_PORTRAIT.MOV</span></div><span className="col-span-2 text-center text-secondary text-[9px]">4K UHD</span><span className="col-span-2 text-right text-[9px]">00:09:40</span><span className="col-span-2 text-right text-outline text-[9px]">59.94</span></div><div className="grid grid-cols-12 px-1.5 py-1 text-[10px] font-mono hover:bg-[#181D28] cursor-pointer items-center text-on-surface-variant"><div className="col-span-6 truncate flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-outline">videocam</span><span className="truncate">METRO_SPEED.MOV</span></div><span className="col-span-2 text-center text-outline text-[9px]">4K RAW</span><span className="col-span-2 text-right text-[9px]">00:04:12</span><span className="col-span-2 text-right text-outline text-[9px]">60.00</span></div><div className="grid grid-cols-12 px-1.5 py-1 text-[10px] font-mono hover:bg-[#181D28] cursor-pointer items-center text-on-surface-variant"><div className="col-span-6 truncate flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-tertiary">audiotrack</span><span className="truncate">SYNTH_WAVE.WAV</span></div><span className="col-span-2 text-center text-tertiary text-[9px]">24-bit</span><span className="col-span-2 text-right text-[9px]">02:14:00</span><span className="col-span-2 text-right text-tertiary text-[9px]">48kHz</span></div></div><div className="p-1.5 bg-[#131720] border-t border-[#232938] flex flex-col gap-1.5 mt-auto"><div className="flex items-center justify-between text-[10px] font-label-sm uppercase tracking-wider text-outline"><span>Caption Engine Presets</span><span className="text-[9px] text-secondary font-mono">AI ACTIVE</span></div><div className="grid grid-cols-2 gap-1"><button className="py-0.5 px-1 bg-[#181D28] hover:bg-[#232938] border border-[#232938] text-white rounded-sm text-[9px] font-label-sm flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[11px] text-secondary">mic</span> Auto-STT</button><button className="py-0.5 px-1 bg-[#181D28] hover:bg-[#232938] border border-[#232938] text-outline hover:text-white rounded-sm text-[9px] font-label-sm flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[11px]">upload_file</span> Import .SRT</button></div><div className="flex flex-col gap-1 pt-0.5"><div className="p-1 rounded-sm bg-[#0C0E14] border border-[#232938] flex items-center justify-between cursor-pointer hover:border-secondary/50"><div className="flex items-center gap-1.5"><span className="text-[9px] font-bold px-1 rounded-sm bg-yellow-400 text-black">VIRAL</span><span className="text-[10px] text-white font-bold">Viral Kinetic</span></div><span className="text-[8px] font-mono text-outline">Impact / Stroke</span></div><div className="p-1 rounded-sm bg-[#0C0E14] border border-secondary/40 flex items-center justify-between cursor-pointer"><div className="flex items-center gap-1.5"><span className="text-[9px] font-mono px-1 rounded-sm border border-secondary text-secondary">CYBR</span><span className="text-[10px] text-secondary font-mono">Cyber Monospace</span></div><span className="text-[8px] font-mono text-secondary">Active</span></div></div></div></div></div></section>
{/*  CENTER PANEL: Source & Program Dual Viewers + Scopes (Col 6)  */}
<section className="col-span-6 flex flex-col bg-[#0C0E14] border border-[#232938] rounded-sm overflow-hidden relative select-none font-body-sm"><div className="h-6 px-2 bg-[#181D28] border-b border-[#232938] flex items-center justify-between text-[10px] font-label-sm shrink-0"><div className="flex items-center gap-1.5"><div className="flex items-center rounded-sm border border-[#232938] bg-[#0C0E14] p-0.5"><span className="px-1.5 py-0.2 rounded-xs bg-secondary/20 text-secondary border border-secondary/30 flex items-center gap-1 font-semibold text-[9px]"><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>AUTO SYNC: ACTIVE</span><span className="px-1.5 py-0.2 text-outline hover:text-on-surface cursor-pointer text-[9px]">MANUAL EDIT</span></div><span className="text-[#232938]">|</span><span className="text-outline text-[9px] font-mono">Speed Ratio: <strong className="text-on-surface font-normal">1.042x</strong></span><span className="text-outline text-[9px] font-mono">54 Injected Transitions</span><span className="text-secondary text-[9px] font-mono">[Anchor: Locked]</span></div><div className="flex items-center gap-2"><span className="text-outline font-mono text-[9px]">CALIBRATION: REC.709 D65</span><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span></div></div><div className="h-7 px-2 bg-[#131720] border-b border-[#232938] flex items-center justify-between text-[10px] font-label-sm shrink-0"><div className="flex items-center gap-1"><span className="text-outline uppercase text-[9px] tracking-wider mr-1">Aspect:</span><button className="px-2 py-0.5 rounded-sm bg-[#1C2230] text-secondary border border-secondary/40 font-semibold text-[9px]">9:16 VERTICAL</button><button className="px-2 py-0.5 rounded-sm text-outline hover:text-on-surface text-[9px]">16:9 CINEMA</button><button className="px-2 py-0.5 rounded-sm text-outline hover:text-on-surface text-[9px]">1:1 SQUARE</button></div><div className="flex items-center gap-1.5"><button className="px-1.5 py-0.5 rounded-sm border border-[#232938] bg-[#0C0E14] text-secondary flex items-center gap-1 text-[9px]" title="Safe Title &amp; Action Guides"><span className="material-symbols-outlined text-[11px]">grid_4x4</span> Guides ON</button><div className="flex items-center gap-1 bg-[#0C0E14] border border-[#232938] px-1.5 py-0.5 rounded-sm text-[9px] text-on-surface"><span className="font-mono">100% Fit</span><span className="material-symbols-outlined text-[11px] text-outline">arrow_drop_down</span></div></div></div><div className="flex-1 flex bg-[#07090F] relative min-h-0"><div className="flex-1 relative flex items-center justify-center p-1.5 overflow-hidden"><div className="relative h-full aspect-[9/16] bg-[#0A0E18] border border-[#232938] shadow-2xl flex items-center justify-center overflow-hidden"><img className="w-full h-full object-cover" alt="Vertical 9 to 16 cinematic video still of stylish Japanese model standing in neo Tokyo illuminated neon sign rain dramatic color grade high fashion visual" src={previewImg}/><div className="absolute inset-3 border border-dashed border-secondary/30 pointer-events-none flex items-start justify-end p-0.5"><span className="font-mono text-[8px] text-secondary/60">93% ACT</span></div><div className="absolute inset-6 border border-dashed border-primary/30 pointer-events-none flex items-start justify-end p-0.5"><span className="font-mono text-[8px] text-primary/60">90% TTL</span></div><div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#0C0E14]/90 border border-[#232938] rounded-sm text-[10px] font-mono text-secondary tracking-widest font-semibold" id="monitor-timecode">00:00:14:18</div><div className="absolute bottom-4 left-2 right-2 p-1.5 bg-[#0C0E14]/90 border border-[#232938] border-l-2 border-l-secondary rounded-sm flex flex-col backdrop-blur-sm" id="monitor-overlay-box"><span className="font-headline-md text-white font-bold text-[11px] leading-tight uppercase tracking-wider" id="monitor-title-text">NEON LIGHTS REFLECTING ON ASPHALT</span><span className="font-label-sm text-[9px] text-secondary uppercase tracking-widest font-mono" id="monitor-sub-text">CLIP_06 • SHIBUYA_ALLEY_NIGHT • 60 FPS</span></div></div><div className="absolute top-2 right-12 w-28 bg-[#0C0E14]/90 border border-[#232938] rounded-sm p-1 pointer-events-none"><div className="flex items-center justify-between text-[8px] font-mono text-outline border-b border-[#232938] pb-0.5 mb-1"><span>WAVEFORM PARADE</span><span className="text-secondary">709</span></div><div className="h-8 w-full flex items-end justify-between gap-1 px-0.5"><div className="flex-1 h-full flex items-end"><div className="w-full bg-error/50 h-3/4 rounded-t-xs"></div></div><div className="flex-1 h-full flex items-end"><div className="w-full bg-secondary/50 h-3/5 rounded-t-xs"></div></div><div className="flex-1 h-full flex items-end"><div className="w-full bg-primary/50 h-4/5 rounded-t-xs"></div></div></div></div></div><div className="w-10 bg-[#131720] border-l border-[#232938] flex flex-col items-center py-2 px-1 shrink-0 select-none"><span className="text-[8px] font-mono text-outline mb-1">VU dB</span><div className="flex-1 w-full flex items-stretch justify-center gap-1"><div className="w-1.5 h-full bg-[#0C0E14] rounded-xs flex flex-col-reverse p-0.2 overflow-hidden border border-[#232938]"><div className="w-full bg-secondary h-[72%]"></div></div><div className="w-1.5 h-full bg-[#0C0E14] rounded-xs flex flex-col-reverse p-0.2 overflow-hidden border border-[#232938]"><div className="w-full bg-secondary h-[68%]"></div></div><div className="flex flex-col justify-between text-[7px] font-mono text-outline pl-0.5"><span>+3</span><span>0</span><span>-6</span><span>-12</span><span>-20</span><span>-40</span><span>-60</span></div></div><span className="text-[8px] font-mono text-secondary mt-1">-6.2</span></div></div><div className="h-8 px-3 bg-[#131720] border-t border-[#232938] flex items-center justify-between shrink-0"><div className="flex items-center gap-1"><button className="w-6 h-6 rounded-sm border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-outline hover:text-white flex items-center justify-center" title="Step Back 1 Sec"><span className="material-symbols-outlined text-[13px]">fast_rewind</span></button><button className="w-6 h-6 rounded-sm border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-outline hover:text-white flex items-center justify-center" title="Step Back 1 Frame"><span className="material-symbols-outlined text-[13px]">skip_previous</span></button><button className="w-7 h-6 rounded-sm border border-primary-container bg-primary-container text-white hover:bg-inverse-primary flex items-center justify-center" id="btn-play-pause" title="Play / Pause (Space)"><span className="material-symbols-outlined text-[16px]">play_arrow</span></button><button className="w-6 h-6 rounded-sm border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-outline hover:text-white flex items-center justify-center" title="Step Forward 1 Frame"><span className="material-symbols-outlined text-[13px]">skip_next</span></button><button className="w-6 h-6 rounded-sm border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-outline hover:text-white flex items-center justify-center" title="Step Forward 1 Sec"><span className="material-symbols-outlined text-[13px]">fast_forward</span></button><button className="w-6 h-6 ml-1 rounded-sm border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-secondary flex items-center justify-center" title="Loop Playback"><span className="material-symbols-outlined text-[13px]">repeat</span></button></div><div className="flex items-center gap-3 font-mono text-[10px]"><div className="flex items-center gap-1.5"><span className="text-outline text-[9px] font-sans font-medium uppercase">POS</span><span className="text-secondary font-bold tracking-wider px-1.5 py-0.5 rounded-sm bg-[#0C0E14] border border-[#232938]" id="transport-pos-tc">00:00:14:18</span></div><div className="flex items-center gap-1.5"><span className="text-outline text-[9px] font-sans font-medium uppercase">TOTAL</span><span className="text-on-surface font-medium tracking-wider px-1.5 py-0.5 rounded-sm bg-[#0C0E14] border border-[#232938]">00:04:35:00</span></div></div><div className="flex items-center gap-1"><button className="px-1.5 py-0.5 rounded-sm border border-[#232938] bg-[#181D28] text-on-surface hover:text-white text-[9px] font-label-sm"><strong className="text-secondary">[I]</strong> Mark</button><button className="px-1.5 py-0.5 rounded-sm border border-[#232938] bg-[#181D28] text-on-surface hover:text-white text-[9px] font-label-sm"><strong className="text-secondary">[O]</strong> Mark</button><button className="w-6 h-6 rounded-sm border border-[#232938] bg-[#181D28] text-secondary flex items-center justify-center hover:bg-[#232938]" title="Razor Playhead"><span className="material-symbols-outlined text-[13px]">content_cut</span></button></div></div></section>
{/*  RIGHT PANEL: Inspector & Effects Stack & Audio Mixer Strip (Col 3)  */}
<section className="col-span-3 flex flex-col bg-surface-container-low rounded-sm overflow-hidden border border-[#232938]">
<div className="flex items-center bg-surface-container-lowest h-7 border-b border-[#232938]">
<button className="flex-1 h-full flex items-center justify-center text-primary border-b-2 border-primary-container font-headline-md text-[10px] bg-surface-container-low font-semibold uppercase tracking-wider">
          Video Inspector
        </button>
<button className="flex-1 h-full flex items-center justify-center text-on-surface-variant hover:text-on-surface font-headline-md text-[10px] bg-surface-container-lowest uppercase tracking-wider">
          Effects Chain
        </button>
<button className="flex-1 h-full flex items-center justify-center text-on-surface-variant hover:text-on-surface font-headline-md text-[10px] bg-surface-container-lowest uppercase tracking-wider">
          Mixer (A1-A3)
        </button>
</div>
<div className="flex-1 overflow-y-auto p-2 flex flex-col gap-2 bg-[#0C0E14]">
{/*  Video Transform Group  */}
<div className="flex flex-col gap-1.5 bg-[#131720] p-2 rounded-sm border border-[#1E2330]">
<div className="flex items-center justify-between text-on-surface font-headline-md text-[11px]">
<span className="flex items-center gap-1 text-secondary font-semibold">
<span className="material-symbols-outlined text-[13px]">transform</span> Transform: <span className="font-mono text-white text-[10px]" id="inspector-clip-label">CYBER_PUNK_ALLEY_02</span>
</span>
<button className="text-outline hover:text-on-surface text-[10px] font-label-sm">Reset</button>
</div>
<div className="flex items-center justify-between text-[10px]">
<span className="text-outline">Scale</span>
<div className="flex items-center gap-1 bg-[#0A0D14] px-1.5 py-0.5 rounded-sm border border-[#232938] w-28 justify-between">
<span className="text-on-surface font-mono text-[10px]" id="inspector-scale-val">100.0%</span>
<span className="material-symbols-outlined text-[12px] text-outline cursor-ew-resize">sync_alt</span>
</div>
</div>
<div className="flex items-center justify-between text-[10px]">
<span className="text-outline">Position X / Y</span>
<div className="flex items-center gap-1 w-28">
<div className="flex-1 flex items-center justify-between bg-[#0A0D14] px-1 py-0.5 rounded-sm border border-[#232938]">
<span className="text-outline font-label-sm text-[9px]">X:</span>
<span className="text-on-surface font-mono text-[9px]" id="inspector-pos-x">0.00</span>
</div>
<div className="flex-1 flex items-center justify-between bg-[#0A0D14] px-1 py-0.5 rounded-sm border border-[#232938]">
<span className="text-outline font-label-sm text-[9px]">Y:</span>
<span className="text-on-surface font-mono text-[9px]" id="inspector-pos-y">-12.4</span>
</div>
</div>
</div>
<div className="flex items-center justify-between text-[10px]">
<span className="text-outline">Rotation</span>
<div className="flex items-center gap-1 bg-[#0A0D14] px-1.5 py-0.5 rounded-sm border border-[#232938] w-28 justify-between">
<span className="text-on-surface font-mono text-[10px]">0.0°</span>
<div className="w-2.5 h-2.5 rounded-full border border-secondary relative flex items-center justify-center">
<div className="w-1 h-0.5 bg-secondary absolute top-0"></div>
</div>
</div>
</div>
<div className="flex items-center justify-between text-[10px]">
<span className="text-outline">Opacity</span>
<div className="flex items-center gap-2 w-28">
<div className="flex-1 h-1 bg-[#0A0D14] rounded-xs overflow-hidden">
<div className="h-full bg-secondary w-full"></div>
</div>
<span className="text-on-surface font-mono text-[9px]">100%</span>
</div>
</div>
</div>
{/*  Real-Time Applied Effects Stack  */}
<div className="flex flex-col gap-1.5 bg-[#131720] p-2 rounded-sm border border-[#1E2330]">
<div className="flex items-center justify-between text-on-surface font-headline-md text-[11px]">
<span className="flex items-center gap-1 text-primary font-semibold">
<span className="material-symbols-outlined text-[13px]">auto_fix_high</span> Applied Effects Stack (3)
</span>
<button className="text-secondary hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">add_circle</span></button>
</div>
<div className="flex items-center justify-between p-1 rounded-sm bg-[#0A0D14] border border-[#232938] text-[10px]">
<div className="flex items-center gap-1.5">
<input defaultChecked className="accent-secondary w-3 h-3" type="checkbox"/>
<span className="font-headline-md text-on-surface">Tokyo_Noir_04.cube</span>
</div>
<span className="font-label-sm text-[9px] text-tertiary px-1 py-0.2 rounded-xs bg-tertiary/10">3D LUT 33x</span>
</div>
<div className="flex items-center justify-between p-1 rounded-sm bg-[#0A0D14] border border-[#232938] text-[10px]">
<div className="flex items-center gap-1.5">
<input defaultChecked className="accent-secondary w-3 h-3" type="checkbox"/>
<span className="font-headline-md text-on-surface">Optical Flow Lock</span>
</div>
<span className="font-label-sm text-[9px] text-secondary px-1 py-0.2 rounded-xs bg-secondary/10">LOCKED</span>
</div>
<div className="flex items-center justify-between p-1 rounded-sm bg-[#0A0D14] border border-[#232938] text-[10px]">
<div className="flex items-center gap-1.5">
<input defaultChecked className="accent-secondary w-3 h-3" type="checkbox"/>
<span className="font-headline-md text-on-surface">Spatial Noise Reduct.</span>
</div>
<span className="font-label-sm text-[9px] text-primary px-1 py-0.2 rounded-xs bg-primary/10">CUDA ACCEL</span>
</div>
</div>
{/*  Mini EQ Strip  */}
<div className="flex flex-col gap-1 bg-[#131720] p-1.5 rounded-sm border border-[#1E2330]">
<div className="flex items-center justify-between text-[10px] text-tertiary font-semibold">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[12px]">equalizer</span> Fairlight EQ</span>
<span className="text-secondary font-mono text-[9px]">-14 LUFS Target</span>
</div>
<div className="h-10 w-full bg-[#0A0D14] rounded-sm p-0.5 relative border border-[#232938] flex items-center justify-center">
<svg className="w-full h-full text-secondary" preserveAspectRatio="none" viewBox="0 0 200 40">
<line stroke="#1E2536" stroke-dasharray="2,2" stroke-width="1" x1="0" x2="200" y1="20" y2="20"></line>
<line stroke="#1E2536" stroke-width="1" x1="60" x2="60" y1="0" y2="40"></line>
<line stroke="#1E2536" stroke-width="1" x1="120" x2="120" y1="0" y2="40"></line>
<path d="M 0,28 Q 40,26 70,14 T 120,22 T 160,10 T 200,20" fill="none" stroke="currentColor" stroke-width="1.5"></path>
<circle cx="70" cy="14" fill="#4cd7f6" r="2.5"></circle>
<circle cx="120" cy="22" fill="#4cd7f6" r="2.5"></circle>
<circle cx="160" cy="10" fill="#ffb95f" r="2.5"></circle>
</svg>
</div>
</div>
</div>
</section>
</div>
{/*  =========================================================================  */}
{/*  BOTTOM DOCK TIMELINE: INDUSTRIAL WORKSTATION REFACTOR  */}
{/*  =========================================================================  */}
<section className="flex-1 flex flex-col bg-[#0A0D14] overflow-hidden select-none relative min-h-0">
{/*  Precision Toolbar Header (Height: 32px, Canvas: #131720, Border-Bottom: 1px solid #1E2330)  */}
<div className="h-8 px-2 bg-[#131720] border-b border-[#1E2330] flex items-center justify-between shrink-0 z-30">
{/*  Left: Tool Selection Matrix (Compact 24px square buttons)  */}
<div className="flex items-center gap-1 font-label-sm text-[11px]" id="timeline-toolbar-tools">
{/*  Selection Tool (V) - Active by default  */}
<button className="w-6 h-6 rounded-sm bg-[#1C2438] border-b-2 border-secondary text-secondary flex items-center justify-center hover:bg-[#25304a] transition-colors" data-tool="V" id="tool-v" title="Selection Tool (V)">
<span className="material-symbols-outlined text-[15px]">near_me</span>
</button>
{/*  Razor Blade Tool (C)  */}
<button className="w-6 h-6 rounded-sm border border-[#232938] text-slate-400 flex items-center justify-center hover:bg-[#1C2230] hover:text-white transition-colors" data-tool="C" id="tool-c" title="Razor Blade Tool (C)">
<span className="material-symbols-outlined text-[14px]">content_cut</span>
</button>
{/*  Ripple Edit Tool (B)  */}
<button className="w-6 h-6 rounded-sm border border-[#232938] text-slate-400 flex items-center justify-center hover:bg-[#1C2230] hover:text-white transition-colors" data-tool="B" id="tool-b" title="Ripple Edit Tool (B)">
<span className="material-symbols-outlined text-[14px]">sync_alt</span>
</button>
<div className="h-4 w-px bg-[#232938] mx-0.5"></div>
{/*  Snapping Toggle (S) with active cyan indicator dot  */}
<button className="h-6 px-1.5 rounded-sm border border-[#232938] bg-[#161B26] text-slate-200 flex items-center gap-1 hover:bg-[#1C2230] text-[10px] font-mono transition-colors" id="tool-snap" title="Snapping Toggle (S)">
<span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_5px_#4cd7f6]" id="snap-dot"></span>
<span className="font-semibold text-secondary">SNAP [S]</span>
</button>
{/*  Linked Selection Toggle (Ctrl+L)  */}
<button className="h-6 px-1.5 rounded-sm border border-[#232938] bg-[#161B26] text-slate-200 flex items-center gap-1 hover:bg-[#1C2230] text-[10px] font-mono transition-colors" id="tool-link" title="Linked Selection (Ctrl+L)">
<span className="material-symbols-outlined text-[13px] text-secondary">link</span>
<span>LINK</span>
</button>
{/*  Auto Sync Indicator Badge  */}
<div className="flex items-center gap-1 ml-2 px-1.5 py-0.5 rounded-sm bg-[#1E2330] border border-[#2B354C] text-[9px] font-mono">
<span className="w-1 h-1 rounded-full bg-secondary animate-pulse"></span>
<span className="text-slate-300">AUTO-SYNC:</span>
<span className="text-secondary font-semibold">54 TRANSITIONS INJECTED</span>
</div>
</div>
{/*  Center: Playhead Timecode Readout alongside Sequence IN and OUT  */}
<div className="flex items-center gap-2 font-mono text-[10px]">
<div className="flex items-center bg-[#0A0D14] border border-[#232938] rounded-sm px-1.5 py-0.5">
<span className="text-slate-500 mr-1 text-[9px]">IN:</span>
<span className="text-slate-300">00:00:02:15</span>
</div>
<div className="flex items-center bg-[#090C12] border border-secondary/40 rounded-sm px-2 py-0.5 shadow-inner">
<span className="text-slate-500 mr-1.5 text-[9px] font-sans font-semibold">PLAYHEAD</span>
<span className="text-secondary font-bold text-[11px] tracking-wider tabular-nums" id="center-playhead-tc">00:00:14:18</span>
</div>
<div className="flex items-center bg-[#0A0D14] border border-[#232938] rounded-sm px-1.5 py-0.5">
<span className="text-slate-500 mr-1 text-[9px]">OUT:</span>
<span className="text-slate-300">00:04:12:00</span>
</div>
</div>
{/*  Right: Timeline Scaling Deck  */}
<div className="flex items-center gap-2 font-label-sm text-[10px]">
<div className="flex items-center gap-1 text-slate-400">
<span className="material-symbols-outlined text-[13px]">zoom_out</span>
<input className="w-20 h-1 bg-[#0A0D14] accent-secondary rounded-lg appearance-none cursor-pointer border border-[#232938]" id="timeline-zoom-slider" max="140" min="20" type="range" value="65"/>
<span className="material-symbols-outlined text-[13px]">zoom_in</span>
<span className="font-mono text-[9px] text-slate-300 w-16 text-right" id="zoom-label">1.2x (65px/s)</span>
</div>
<button className="px-1.5 py-0.5 rounded-sm border border-[#232938] bg-[#161B26] hover:bg-[#1F2636] text-slate-300 hover:text-white text-[9px] font-mono flex items-center gap-1" id="btn-fit-zoom" title="Fit Sequence to Viewport (Shift+Z)">
<span className="material-symbols-outlined text-[11px]">fit_screen</span>
<span>[Shift+Z]</span>
</button>
<div className="h-3 w-px bg-[#232938]"></div>
<div className="flex items-center gap-1 px-1.5 py-0.5 rounded-sm bg-[#0A0D14] border border-[#232938] text-[9px] font-mono">
<span className="text-slate-400">TOTAL:</span>
<span className="text-white font-semibold">00:04:35:00</span>
</div>
{/*  Render Cache Indicator  */}
<div className="flex items-center gap-1 text-[9px] font-mono text-slate-400" title="Render Cache: ProRes 422 HQ">
<span className="w-2 h-2 rounded-xs bg-[#0284c7]"></span>
<span className="text-[9px] text-slate-300">100% CACHED</span>
</div>
</div>
</div>
{/*  Master Timeline Workspace Split: Left Track Headers (160px) + Right Virtual Canvas  */}
<div className="flex-1 flex overflow-hidden relative bg-[#07090F]">
{/*  LEFT TRACK HEADERS & PATCHING DECK (Fixed 160px)  */}
<div className="w-40 flex flex-col bg-[#131720] border-r border-[#1E2330] shrink-0 z-20 select-none shadow-md">
{/*  SMPTE Ruler Pad Spacer (Height: 24px)  */}
<div className="h-6 bg-[#0E121B] border-b border-[#1E2330] flex items-center justify-between px-2 text-[9px] font-mono text-slate-400">
<span className="font-semibold tracking-wider uppercase">TRACKS (6)</span>
<span className="text-[8px] text-slate-500">PATCH</span>
</div>
{/*  Video Tracks Header Stack  */}
<div className="flex flex-col">
{/*  V2: Overlay / B-Roll (Height: 42px)  */}
<div className="h-[42px] px-2 bg-[#121622] border-b border-[#1E2330] flex items-center justify-between">
<div className="flex items-center gap-1.5 font-mono text-[10px]">
<span className="font-bold text-secondary">V2</span>
<span className="text-[9px] text-slate-400 font-sans truncate w-12">Overlay</span>
</div>
<div className="flex items-center gap-1 text-slate-400">
<button className="hover:text-white" title="Lock Track"><span className="material-symbols-outlined text-[12px]">lock_open</span></button>
<button className="hover:text-white" title="Toggle Track Output"><span className="material-symbols-outlined text-[13px]">visibility</span></button>
</div>
</div>
{/*  V1: Primary Footage Sequence (Height: 52px)  */}
<div className="h-[52px] px-2 bg-[#181E2C] border-b border-primary-container/40 border-l-2 border-l-secondary flex items-center justify-between shadow-sm">
<div className="flex items-center gap-1.5 font-mono text-[10px]">
<span className="font-bold text-white bg-primary-container/40 px-1 py-0.2 rounded-xs border border-primary-container">V1</span>
<div className="flex flex-col">
<span className="text-[10px] text-white font-medium leading-none">Primary</span>
<span className="text-[8px] text-secondary font-mono leading-tight">55+ Clips</span>
</div>
</div>
<div className="flex items-center gap-1 text-slate-300">
<span className="text-[8px] font-mono px-1 py-0.2 rounded-xs bg-[#0A0D14] text-secondary border border-secondary/30">TGT</span>
<button className="hover:text-white" title="Lock Track"><span className="material-symbols-outlined text-[12px]">lock_open</span></button>
<button className="text-secondary hover:text-white" title="Toggle Visibility"><span className="material-symbols-outlined text-[13px]">visibility</span></button>
</div>
</div>
{/*  T1: Dynamic Captions / Titles (Height: 36px)  */}
<div className="h-[36px] px-2 bg-[#121622] border-b border-[#1E2330] flex items-center justify-between">
<div className="flex items-center gap-1.5 font-mono text-[10px]">
<span className="font-bold text-yellow-400">T1</span>
<span className="text-[9px] text-slate-400 font-sans truncate w-12">Captions</span>
</div>
<div className="flex items-center gap-1 text-slate-400">
<span className="text-[8px] font-mono px-1 rounded-xs bg-yellow-400/20 text-yellow-400 border border-yellow-400/40">AI</span>
<button className="hover:text-white" title="Lock"><span className="material-symbols-outlined text-[12px]">lock_open</span></button>
<button className="hover:text-white" title="Toggle Subtitles"><span className="material-symbols-outlined text-[13px]">subtitles</span></button>
</div>
</div>
</div>
{/*  Audio Divider Spacer (Height: 4px)  */}
<div className="h-1 bg-[#1A2234] border-y border-[#232938] shrink-0"></div>
{/*  Audio Tracks Header Stack  */}
<div className="flex flex-col">
{/*  A1: Master Dialogue / Voiceover (Height: 48px)  */}
<div className="h-[48px] px-2 bg-[#121622] border-b border-[#1E2330] flex items-center justify-between">
<div className="flex flex-col">
<div className="flex items-center gap-1.5 font-mono text-[10px]">
<span className="font-bold text-emerald-400">A1</span>
<span className="text-[9px] text-slate-300 font-sans">Dialogue</span>
</div>
<span className="text-[8px] font-mono text-emerald-400/80">-1.5 dB Trim</span>
</div>
<div className="flex items-center gap-1 text-[9px] font-mono">
<button className="px-1 py-0.2 rounded-xs bg-[#1C2332] text-slate-300 hover:text-white border border-[#2A3448]">M</button>
<button className="px-1 py-0.2 rounded-xs bg-[#1C2332] text-slate-300 hover:text-white border border-[#2A3448]">S</button>
<button className="text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[12px]">lock_open</span></button>
</div>
</div>
{/*  A2: Background Music / Ambiance (Height: 44px)  */}
<div className="h-[44px] px-2 bg-[#121622] border-b border-[#1E2330] flex items-center justify-between">
<div className="flex flex-col">
<div className="flex items-center gap-1.5 font-mono text-[10px]">
<span className="font-bold text-amber-400">A2</span>
<span className="text-[9px] text-slate-300 font-sans">Music</span>
</div>
<span className="text-[8px] font-mono text-amber-400/80">-12.0 dB Duck</span>
</div>
<div className="flex items-center gap-1 text-[9px] font-mono">
<button className="px-1 py-0.2 rounded-xs bg-[#1C2332] text-slate-300 hover:text-white border border-[#2A3448]">M</button>
<button className="px-1 py-0.2 rounded-xs bg-[#1C2332] text-slate-300 hover:text-white border border-[#2A3448]">S</button>
<button className="text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[12px]">lock_open</span></button>
</div>
</div>
{/*  A3: SFX / Foley Stem (Height: 38px)  */}
<div className="h-[38px] px-2 bg-[#121622] border-b border-[#1E2330] flex items-center justify-between">
<div className="flex flex-col">
<div className="flex items-center gap-1.5 font-mono text-[10px]">
<span className="font-bold text-sky-400">A3</span>
<span className="text-[9px] text-slate-300 font-sans">SFX</span>
</div>
<span className="text-[8px] font-mono text-sky-400/80">-6.5 dB</span>
</div>
<div className="flex items-center gap-1 text-[9px] font-mono">
<button className="px-1 py-0.2 rounded-xs bg-[#1C2332] text-slate-300 hover:text-white border border-[#2A3448]">M</button>
<button className="px-1 py-0.2 rounded-xs bg-[#1C2332] text-slate-300 hover:text-white border border-[#2A3448]">S</button>
<button className="text-slate-400 hover:text-white"><span className="material-symbols-outlined text-[12px]">lock_open</span></button>
</div>
</div>
</div>
</div>
{/*  RIGHT TIMELINE CANVAS: HORIZONTAL SCROLL CONTAINER  */}
<div className="flex-1 flex flex-col overflow-x-auto overflow-y-hidden relative bg-[#07090F] select-none" id="timeline-scroll-container">
{/*  SMPTE TIME RULER & RENDER CACHE BAR (Height: 24px)  */}
<div className="h-6 w-[5600px] bg-[#0E121B] border-b border-[#1E2330] relative select-none shrink-0 cursor-pointer" id="timeline-ruler">
{/*  Render Cache Thin Bar (3px) immediately under the ticks  */}
<div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#09101d] flex overflow-hidden">
<div className="w-[1800px] h-full bg-[#0284c7]"></div>
<div className="w-12 h-full bg-[#881337]"></div>
<div className="w-[1200px] h-full bg-[#0284c7]"></div>
<div className="w-8 h-full bg-[#881337]"></div>
<div className="flex-1 h-full bg-[#0284c7]"></div>
</div>
{/*  Precision Tick Marks across 5600px  */}
<div className="absolute inset-0 flex items-stretch">
{/*  Repeatable Mark Blocks every 100px = 2s approx  */}
<div className="relative w-full h-full">
<span className="absolute left-1 top-0.5 text-[9px] font-mono text-slate-400 font-semibold">00:00:00:00</span>
<div className="absolute left-0 bottom-1 w-px h-3 bg-[#334155]"></div>
<div className="absolute left-12 bottom-1 w-px h-1.5 bg-[#1E293B]"></div>
<div className="absolute left-24 bottom-1 w-px h-1.5 bg-[#1E293B]"></div>
<div className="absolute left-36 bottom-1 w-px h-1.5 bg-[#1E293B]"></div>
<div className="absolute left-48 bottom-1 w-px h-2 bg-[#2B354C]"></div>
<span className="absolute left-[150px] top-0.5 text-[9px] font-mono text-slate-400">00:00:02:15</span>
<div className="absolute left-[150px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[300px] top-0.5 text-[9px] font-mono text-slate-400">00:00:05:00</span>
<div className="absolute left-[300px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[450px] top-0.5 text-[9px] font-mono text-slate-400">00:00:07:15</span>
<div className="absolute left-[450px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[600px] top-0.5 text-[9px] font-mono text-slate-400">00:00:10:00</span>
<div className="absolute left-[600px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[750px] top-0.5 text-[9px] font-mono text-slate-400">00:00:12:15</span>
<div className="absolute left-[750px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[900px] top-0.5 text-[9px] font-mono text-secondary font-semibold">00:00:15:00</span>
<div className="absolute left-[900px] bottom-1 w-px h-3 bg-secondary"></div>
<span className="absolute left-[1050px] top-0.5 text-[9px] font-mono text-slate-400">00:00:17:15</span>
<div className="absolute left-[1050px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[1200px] top-0.5 text-[9px] font-mono text-slate-400">00:00:20:00</span>
<div className="absolute left-[1200px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[1400px] top-0.5 text-[9px] font-mono text-slate-400">00:00:25:00</span>
<div className="absolute left-[1400px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[1650px] top-0.5 text-[9px] font-mono text-slate-400">00:00:30:00</span>
<div className="absolute left-[1650px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[1950px] top-0.5 text-[9px] font-mono text-slate-400">00:00:35:00</span>
<div className="absolute left-[1950px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[2250px] top-0.5 text-[9px] font-mono text-slate-400">00:00:40:00</span>
<div className="absolute left-[2250px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[2550px] top-0.5 text-[9px] font-mono text-slate-400">00:00:45:00</span>
<div className="absolute left-[2550px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[2900px] top-0.5 text-[9px] font-mono text-slate-400">00:01:00:00</span>
<div className="absolute left-[2900px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[3400px] top-0.5 text-[9px] font-mono text-slate-400">00:01:30:00</span>
<div className="absolute left-[3400px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[4000px] top-0.5 text-[9px] font-mono text-slate-400">00:02:00:00</span>
<div className="absolute left-[4000px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[4600px] top-0.5 text-[9px] font-mono text-slate-400">00:03:00:00</span>
<div className="absolute left-[4600px] bottom-1 w-px h-3 bg-[#334155]"></div>
<span className="absolute left-[5200px] top-0.5 text-[9px] font-mono text-slate-400">00:04:00:00</span>
<div className="absolute left-[5200px] bottom-1 w-px h-3 bg-[#334155]"></div>
</div>
</div>
</div>
{/*  MASTER TRACKS CANVAS WRAPPER (Width: 5600px for 55+ clips)  */}
<div className="w-[5600px] flex-1 flex flex-col relative bg-[#080B12]" id="timeline-tracks-area">
{/*  TRACK V2: OVERLAY / B-ROLL (Height: 42px)  */}
<div className="h-[42px] border-b border-[#1A2234] relative flex items-center bg-[#0B0E16]/40">
{/*  B-Roll Clip 1  */}
<div className="timeline-clip absolute left-[220px] w-[180px] h-8 rounded-sm bg-[#162134] border border-[#283856] flex items-center px-2 cursor-pointer hover:border-secondary transition-all" data-scale="100.0%" data-title="METRO_PASS_OVERLAY.mov" data-x="0.00" data-y="0.00">
<span className="text-[9px] font-mono text-secondary mr-1">[ ]</span>
<span className="font-headline-md text-[10px] text-slate-200 truncate">METRO_PASS_OVERLAY.mov</span>
<span className="ml-auto font-mono text-[8px] text-slate-400">03.00s</span>
</div>
{/*  B-Roll Clip 2  */}
<div className="timeline-clip absolute left-[620px] w-[210px] h-8 rounded-sm bg-[#162134] border border-[#283856] flex items-center px-2 cursor-pointer hover:border-secondary transition-all" data-scale="105.0%" data-title="NEON_GLITCH_MATTE.mov" data-x="4.20" data-y="-2.10">
<span className="text-[9px] font-mono text-secondary mr-1">[ ]</span>
<span className="font-headline-md text-[10px] text-slate-200 truncate">NEON_GLITCH_MATTE.mov</span>
<span className="ml-auto font-mono text-[8px] text-slate-400">03.50s</span>
</div>
{/*  B-Roll Clip 3  */}
<div className="timeline-clip absolute left-[1250px] w-[260px] h-8 rounded-sm bg-[#162134] border border-[#283856] flex items-center px-2 cursor-pointer hover:border-secondary transition-all" data-scale="100.0%" data-title="DRONE_ESTABLISHING.mov" data-x="0.00" data-y="0.00">
<span className="text-[9px] font-mono text-secondary mr-1">[ ]</span>
<span className="font-headline-md text-[10px] text-slate-200 truncate">DRONE_ESTABLISHING.mov</span>
<span className="ml-auto font-mono text-[8px] text-slate-400">04.30s</span>
</div>
{/*  B-Roll Clip 4  */}
<div className="timeline-clip absolute left-[2100px] w-[240px] h-8 rounded-sm bg-[#162134] border border-[#283856] flex items-center px-2 cursor-pointer hover:border-secondary transition-all" data-scale="100.0%" data-title="RAIN_PUDDLE_REFLECT.mov" data-x="0.00" data-y="0.00">
<span className="text-[9px] font-mono text-secondary mr-1">[ ]</span>
<span className="font-headline-md text-[10px] text-slate-200 truncate">RAIN_PUDDLE_REFLECT.mov</span>
<span className="ml-auto font-mono text-[8px] text-slate-400">04.00s</span>
</div>
</div>
{/*  TRACK V1: PRIMARY FOOTAGE SEQUENCE (Height: 52px - 55+ CONTIGUOUS CLIPS)  */}
<div className="h-[52px] border-b-2 border-primary-container/40 relative flex items-center bg-[#07090F]" id="v1-track-row">
{/*  Clustered Continuous Clip Blocks 1 through 55+ with Auto-Sync Transitions  */}
{/*  Container for injected clips populated dynamically with rich Tokyo B-roll naming  */}
<div className="absolute inset-0 flex items-center" id="v1-clips-container">
{/*  Will be enriched via loop to guarantee exact 55 clips with auto-dissolve nodes  */}
</div>
</div>
{/*  TRACK T1: CAPTIONS / TITLES (Height: 36px)  */}
<div className="h-[36px] border-b border-[#1A2234] relative flex items-center bg-[#0B0E16]/30">
{/*  Segmented Subtitle Chunk 1  */}
<div className="timeline-clip absolute left-[0px] w-[180px] h-6 rounded-xs bg-[#241E10] border border-yellow-500/50 flex items-center px-1.5 cursor-pointer shadow-xs" data-scale="100%" data-title="CAPTION_01" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[11px] text-yellow-400 mr-1">subtitles</span>
<span className="font-mono text-[9px] text-yellow-200 truncate">TOKYO NEVER SLEEPS AT NIGHT</span>
</div>
{/*  Segmented Subtitle Chunk 2  */}
<div className="timeline-clip absolute left-[190px] w-[190px] h-6 rounded-xs bg-[#241E10] border border-yellow-500/50 flex items-center px-1.5 cursor-pointer shadow-xs" data-scale="100%" data-title="CAPTION_02" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[11px] text-yellow-400 mr-1">subtitles</span>
<span className="font-mono text-[9px] text-yellow-200 truncate">HEAVY RAIN IN SHIBUYA</span>
</div>
{/*  Segmented Subtitle Chunk 3 (Active at playhead 00:00:14)  */}
<div className="timeline-clip absolute left-[390px] w-[230px] h-6 rounded-xs bg-[#302613] border-2 border-yellow-400 flex items-center px-1.5 cursor-pointer shadow-md" data-scale="100%" data-title="CAPTION_03" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[11px] text-yellow-400 mr-1">subtitles</span>
<span className="font-mono text-[9px] text-white font-bold truncate">NEON LIGHTS REFLECTING ON ASPHALT</span>
<span className="ml-auto text-[8px] font-mono bg-yellow-400 text-black px-1 rounded-xs">KARAOKE</span>
</div>
{/*  Segmented Subtitle Chunk 4  */}
<div className="timeline-clip absolute left-[630px] w-[220px] h-6 rounded-xs bg-[#241E10] border border-yellow-500/50 flex items-center px-1.5 cursor-pointer shadow-xs" data-scale="100%" data-title="CAPTION_04" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[11px] text-yellow-400 mr-1">subtitles</span>
<span className="font-mono text-[9px] text-yellow-200 truncate">SPEEDING TOWARDS THE MATRIX</span>
</div>
{/*  Subtitle Chunk 5  */}
<div className="timeline-clip absolute left-[860px] w-[240px] h-6 rounded-xs bg-[#241E10] border border-yellow-500/50 flex items-center px-1.5 cursor-pointer shadow-xs" data-scale="100%" data-title="CAPTION_05" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[11px] text-yellow-400 mr-1">subtitles</span>
<span className="font-mono text-[9px] text-yellow-200 truncate">THE FUTURE BARS ARE ALWAYS OPEN</span>
</div>
{/*  Subtitle Chunk 6  */}
<div className="timeline-clip absolute left-[1110px] w-[220px] h-6 rounded-xs bg-[#241E10] border border-yellow-500/50 flex items-center px-1.5 cursor-pointer shadow-xs" data-scale="100%" data-title="CAPTION_06" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[11px] text-yellow-400 mr-1">subtitles</span>
<span className="font-mono text-[9px] text-yellow-200 truncate">CYBER DREAMS AND HIGH OCTANE</span>
</div>
{/*  Subtitle Chunk 7+  */}
<div className="timeline-clip absolute left-[1340px] w-[280px] h-6 rounded-xs bg-[#241E10] border border-yellow-500/50 flex items-center px-1.5 cursor-pointer shadow-xs" data-scale="100%" data-title="CAPTION_07" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[11px] text-yellow-400 mr-1">subtitles</span>
<span className="font-mono text-[9px] text-yellow-200 truncate">NEO-SHINJUKU ALLEYWAY RETROFIT</span>
</div>
</div>
{/*  AUDIO DIVIDER (Height: 4px)  */}
<div className="h-1 bg-[#1A2234] border-y border-[#232938] shrink-0"></div>
{/*  TRACK A1: MASTER DIALOGUE / VOICEOVER (Height: 48px)  */}
<div className="h-[48px] border-b border-[#1A2234] relative flex items-center bg-[#07130F]/40">
{/*  Dialogue Audio Clip Continuous  */}
<div className="absolute left-0 w-[2400px] h-10 rounded-xs bg-[#0F231D] border border-emerald-500/40 flex items-center px-2 overflow-hidden cursor-pointer">
{/*  Center 0dB Reference Guide Line  */}
<div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-emerald-500/20 pointer-events-none"></div>
{/*  High-Contrast Mint-Green Dense Waveform Visualizer  */}
<svg className="absolute inset-x-0 inset-y-1 w-full h-8 text-emerald-400 opacity-90" preserveAspectRatio="none" viewBox="0 0 1200 40">
<path d="M0,20 L15,10 L25,30 L35,6 L45,34 L55,18 L65,22 L75,20 L90,20 L110,4 L120,36 L130,12 L140,28 L150,20 L170,20 L180,8 L190,32 L200,16 L210,24 L220,20 L250,20 L270,3 L280,37 L290,10 L300,30 L310,20 L330,20 L350,7 L360,33 L370,14 L380,26 L390,20 L420,20 L440,5 L450,35 L460,11 L470,29 L480,20 L510,20 L530,2 L540,38 L550,14 L560,26 L570,20 L600,20 L620,8 L630,32 L640,15 L650,25 L660,20 L690,20 L710,4 L720,36 L730,12 L740,28 L750,20 L780,20 L800,6 L810,34 L820,16 L830,24 L840,20 L870,20 L890,3 L900,37 L910,10 L920,30 L930,20 L960,20 L980,5 L990,35 L1000,12 L1010,28 L1020,20 L1050,20 L1070,4 L1080,36 L1090,14 L1100,26 L1110,20 L1150,20 L1180,6 L1190,34 L1200,20" fill="none" stroke="currentColor" stroke-width="1.8"></path>
</svg>
<div className="relative z-10 flex items-center justify-between w-full">
<span className="font-mono text-[9px] text-emerald-200 font-semibold bg-[#0A1A14]/80 px-1 rounded-xs">VO_DIALOGUE_ACTOR_MAIN_48K.wav</span>
<span className="font-mono text-[8px] text-emerald-400 bg-[#0A1A14]/80 px-1 rounded-xs">-1.5 dB (Limiter ON)</span>
</div>
</div>
</div>
{/*  TRACK A2: BACKGROUND MUSIC BED (Height: 44px)  */}
<div className="h-[44px] border-b border-[#1A2234] relative flex items-center bg-[#150F07]/40">
{/*  Music Bed Continuous with Volume Keyframes  */}
<div className="absolute left-6 w-[4800px] h-9 rounded-xs bg-[#241A0C] border border-amber-500/40 flex items-center px-2 overflow-hidden cursor-pointer">
{/*  Continuous Dense Pulsing Waveform in Amber  */}
<svg className="absolute inset-x-0 inset-y-1 w-full h-7 text-amber-400 opacity-70" preserveAspectRatio="none" viewBox="0 0 1600 40">
<path d="M0,20 L10,12 L20,28 L30,5 L40,35 L50,15 L60,25 L70,2 L80,38 L90,18 L100,22 L110,8 L120,32 L130,16 L140,24 L150,4 L160,36 L170,14 L180,26 L190,10 L200,30 L210,18 L220,22 L230,6 L240,34 L250,16 L260,24 L270,12 L280,28 L290,8 L300,32 L310,15 L320,25 L330,4 L340,36 L350,18 L360,22 L370,10 L380,30 L390,14 L400,26 L410,6 L420,34 L430,18 L440,22 L450,12 L460,28 L470,8 L480,32 L490,16 L500,24 L510,4 L520,36 L530,14 L540,26 L550,10 L560,30 L570,18 L580,22 L590,6 L600,34 L610,16 L620,24 L630,12 L640,28 L650,8 L660,32 L670,15 L680,25 L690,4 L700,36 L710,18 L720,22 L730,10 L740,30 L750,14 L760,26 L770,6 L780,34 L790,18 L800,20 L810,12 L820,28 L830,5 L840,35 L850,15 L860,25 L870,2 L880,38 L890,18 L900,22 L910,8 L920,32 L930,16 L940,24 L950,4 L960,36 L970,14 L980,26 L990,10 L1000,30 L1010,18 L1020,22 L1030,6 L1040,34 L1050,16 L1060,24 L1070,12 L1080,28 L1090,8 L1100,32 L1110,15 L1120,25 L1130,4 L1140,36 L1150,18 L1160,22 L1170,10 L1180,30 L1190,14 L1200,26 L1210,6 L1220,34 L1230,18 L1240,22 L1250,12 L1260,28 L1270,8 L1280,32 L1290,16 L1300,24 L1310,4 L1320,36 L1330,14 L1340,26 L1350,10 L1360,30 L1370,18 L1380,22 L1390,6 L1400,34 L1410,16 L1420,24 L1430,12 L1440,28 L1450,8 L1460,32 L1470,15 L1480,25 L1490,4 L1500,36 L1510,18 L1520,22 L1530,10 L1540,30 L1550,14 L1560,26 L1570,6 L1580,34 L1590,18 L1600,20" fill="none" stroke="currentColor" stroke-width="1.3"></path>
{/*  Gain Automation Envelope Line with Diamond Nodes  */}
<polyline fill="none" points="0,20 180,20 220,28 600,28 650,18 900,18 950,30 1400,30 1460,18 1600,20" stroke="#fcd34d" stroke-dasharray="2,2" stroke-width="1"></polyline>
<circle cx="220" cy="28" fill="#f59e0b" r="2.5"></circle>
<circle cx="600" cy="28" fill="#f59e0b" r="2.5"></circle>
<circle cx="650" cy="18" fill="#f59e0b" r="2.5"></circle>
<circle cx="950" cy="30" fill="#f59e0b" r="2.5"></circle>
</svg>
<div className="relative z-10 flex items-center justify-between w-full">
<span className="font-mono text-[9px] text-amber-200 font-semibold bg-[#181105]/80 px-1 rounded-xs">CYBER_SYNTH_WAVE_BED_MASTER.wav</span>
<span className="font-mono text-[8px] text-amber-400 bg-[#181105]/80 px-1 rounded-xs">-14.0 dB Auto-Ducked</span>
</div>
</div>
</div>
{/*  TRACK A3: SFX / FOLEY (Height: 38px)  */}
<div className="h-[38px] border-b border-[#1A2234] relative flex items-center bg-[#071018]/40">
{/*  SFX 1  */}
<div className="timeline-clip absolute left-[190px] w-36 h-7 rounded-xs bg-[#0F1C2B] border border-sky-500/40 flex items-center px-1.5 cursor-pointer hover:border-sky-300" data-scale="100%" data-title="SWOOSH_RISE.wav" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[12px] text-sky-400 mr-1">graphic_eq</span>
<span className="font-mono text-[9px] text-sky-200 truncate">SWOOSH_RISE.wav</span>
</div>
{/*  SFX 2  */}
<div className="timeline-clip absolute left-[450px] w-44 h-7 rounded-xs bg-[#0F1C2B] border border-sky-500/40 flex items-center px-1.5 cursor-pointer hover:border-sky-300" data-scale="100%" data-title="SUB_IMPACT_BOOM.wav" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[12px] text-sky-400 mr-1">graphic_eq</span>
<span className="font-mono text-[9px] text-sky-200 truncate">SUB_IMPACT_BOOM.wav</span>
</div>
{/*  SFX 3  */}
<div className="timeline-clip absolute left-[780px] w-32 h-7 rounded-xs bg-[#0F1C2B] border border-sky-500/40 flex items-center px-1.5 cursor-pointer hover:border-sky-300" data-scale="100%" data-title="CYBER_BLIP_01.wav" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[12px] text-sky-400 mr-1">graphic_eq</span>
<span className="font-mono text-[9px] text-sky-200 truncate">CYBER_BLIP.wav</span>
</div>
{/*  SFX 4  */}
<div className="timeline-clip absolute left-[1180px] w-40 h-7 rounded-xs bg-[#0F1C2B] border border-sky-500/40 flex items-center px-1.5 cursor-pointer hover:border-sky-300" data-scale="100%" data-title="NEON_HUM_FOLEY.wav" data-x="0" data-y="0">
<span className="material-symbols-outlined text-[12px] text-sky-400 mr-1">graphic_eq</span>
<span className="font-mono text-[9px] text-sky-200 truncate">NEON_HUM_FOLEY.wav</span>
</div>
</div>
{/*  =========================================================================  */}
{/*  INTERACTIVE PLAYHEAD NEEDLE & SCRUBBING SYSTEM  */}
{/*  =========================================================================  */}
<div className="absolute top-0 bottom-0 left-[878px] w-0.5 z-40 cursor-ew-resize flex flex-col items-center pointer-events-auto" id="playhead-needle" style={{ "touchAction": "none" }}>
{/*  Top Diamond Handle (Neon Cyan #06B6D4 sharp 0px blur)  */}
<div className="w-3.5 h-3.5 -mt-1.5 bg-[#06B6D4] rotate-45 border border-white flex items-center justify-center shadow-md">
<div className="w-1 h-1 bg-black rounded-full"></div>
</div>
{/*  Exact 1px vertical razor cursor line spanning full timeline  */}
<div className="w-[1.5px] flex-1 bg-[#06B6D4]"></div>
{/*  Magnetic subtle locator dot  */}
<div className="w-2 h-2 rounded-full bg-[#06B6D4]/30 -mb-1"></div>
</div>
</div>
</div>
</div>
</section>
</div></main></div>
<footer className="fixed bottom-0 left-0 right-0 h-6 bg-surface-container-lowest z-50 flex items-center justify-between px-space-md text-on-surface-variant font-label-sm text-label-sm border-t border-[#1E2330]"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-xs"><span className="text-outline">DISK CACHE:</span><span className="text-on-surface">142 GB / 2 TB</span><div className="w-16 h-1.5 bg-surface-container rounded overflow-hidden"><div className="h-full bg-secondary w-1/4 rounded"></div></div></div><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs"><span className="text-outline">RAM:</span><span className="text-on-surface">18.4 GB / 64 GB</span></div><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs"><span className="text-outline">DROPPED FRAMES:</span><span className="text-secondary">0</span></div></div><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-xs"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span><span className="text-on-surface">PRORES 422 HQ PROXY ACTIVE</span></div><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs text-on-surface"><span className="material-symbols-outlined text-[13px] text-tertiary">cloud_done</span><span>Cloud Sync: Up to date</span></div></div></footer>
{/*  =========================================================================  */}
{/*  TIMELINE INTERACTIVITY ENGINE & 55+ V1 CLIPS GENERATOR SCRIPT  */}
{/*  =========================================================================  */}


    </div>
  );
};

export default TimelineMultiTrackScreen;
