import React, { useState } from "react";
import logoImg from "../assets/apex_studio_logo.png";
import indAsset2 from "../assets/asset_editor_3panel_9.png";

export interface EditorIndustrialScreenProps {
  onNavigate?: (view: string) => void;
  projectName?: string;
}

export const EditorIndustrialScreen: React.FC<EditorIndustrialScreenProps> = ({
  onNavigate,
  projectName = "Tokyo_Drift_Master_v2.hve"
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timecode, setTimecode] = useState<string>("00:01:24:16");
  const [syncMode, setSyncMode] = useState<"auto" | "manual">("auto");
  const [activeInspectorTab, setActiveInspectorTab] = useState<"transform" | "audio" | "color" | "metadata">("transform");

  return (
    <div className="bg-background font-body-md text-on-surface select-none min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.4)]"><div className="h-8 px-space-md flex items-center justify-between bg-surface-container-lowest"><div className="flex items-center gap-space-md"><img alt="Apex Studio Pro Logo" className="h-4 w-auto object-contain" src={logoImg}/><span className="font-headline-md text-headline-md tracking-wider text-on-surface uppercase text-xs">Apex Studio Pro</span><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm"><span className="text-outline">Project:</span><span className="text-secondary font-medium">Cyberpunk_Short_v3.hve</span><span className="px-1.5 py-0.5 rounded bg-surface-container-high text-tertiary text-[10px]">4K DCI</span></div></div><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm px-space-md py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant"><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span><span>RTX 4090 / CUDA</span><span className="text-outline">|</span><span className="text-on-surface">59.94 FPS</span></div><div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[14px]">person</span></div><div className="flex items-center"><button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">minimize</span></button><button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">check_box_outline_blank</span></button><button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-on-error-container"><span className="material-symbols-outlined text-[14px]">close</span></button></div></div></div><div className="h-6 px-space-md flex items-center gap-space-md bg-surface-container-low font-body-sm text-body-sm text-on-surface-variant"><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">File</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Edit</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Clip</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Sequence</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">View</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Window</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Help</button></div><div className="h-10 px-space-md flex items-center justify-between bg-surface-container border-b border-surface-container-highest"><nav className="flex items-center gap-space-xs h-full" data-active-classes="bg-surface text-primary border-t-2 border-primary-container font-semibold"><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="projects-hub" href="#">Projects (Hub)</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="edit-and-cut" href="#">Edit &amp; Cut</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="color-grade" href="#">Color Grade</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="audio-and-fairlight" href="#">Audio &amp; Fairlight</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="export-and-render" href="#">Export &amp; Render</a></nav><div className="flex items-center gap-space-sm"><div className="flex items-center bg-surface-container-lowest px-space-md py-1 rounded font-label-md text-label-md text-on-surface tracking-widest"><span className="text-outline">01:04:22:</span><span className="text-secondary">18</span></div><button className="flex items-center gap-1 px-space-md py-1 bg-primary-container hover:bg-inverse-primary text-on-primary-container font-body-sm text-body-sm rounded shadow transition-all"><span className="material-symbols-outlined text-[16px]">bolt</span><span>Fast Export</span></button></div></div></header><aside className="fixed left-0 top-24 bottom-6 w-14 bg-surface-container-lowest z-40 flex flex-col items-center py-space-md gap-space-sm"><button className="w-10 h-10 rounded flex items-center justify-center text-primary bg-surface-container hover:bg-surface-container-high transition-colors" title="Selection Tool (V)"><span className="material-symbols-outlined text-[20px]">near_me</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Razor Blade (B)"><span className="material-symbols-outlined text-[20px]">content_cut</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Ripple Edit (B)"><span className="material-symbols-outlined text-[20px]">sync_alt</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Hand / Pan (H)"><span className="material-symbols-outlined text-[20px]">pan_tool</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Keyframe &amp; Pen (P)"><span className="material-symbols-outlined text-[20px]">edit</span></button><div className="w-8 h-px bg-outline-variant my-space-xs"></div><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Media Bins"><span className="material-symbols-outlined text-[20px]">folder_open</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Audio Track Meters"><span className="material-symbols-outlined text-[20px]">graphic_eq</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Scopes &amp; Vectors"><span className="material-symbols-outlined text-[20px]">ssid_chart</span></button><div className="mt-auto flex flex-col items-center gap-space-xs"><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="App Settings"><span className="material-symbols-outlined text-[20px]">settings</span></button></div></aside><div className="pl-14"><main className="w-full pt-24 pb-6 bg-surface min-h-screen"><div className="flex flex-col w-full h-[calc(100vh-7.5rem)] text-on-surface bg-surface-container-lowest overflow-hidden select-none font-body-sm">
{/*  Breadcrumb & Workspace Sub-bar  */}
<div className="flex items-center justify-between px-space-md py-1 bg-surface-container-low border-b border-surface-container-highest shrink-0 h-8">
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
<span className="text-on-surface-variant">Auto-Sync Active</span>
</div>
</div>
<div className="flex items-center gap-space-sm">
<div className="flex items-center bg-surface-container-lowest px-2 py-0.5 rounded font-label-sm text-label-sm text-outline">
<span>MEM CACHE:</span>
<span className="text-secondary ml-1 font-semibold">94%</span>
</div>
<button className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all font-body-sm text-body-sm">
<span className="material-symbols-outlined text-[14px]">tune</span>
<span>Project Settings</span>
</button>
<button className="p-1 rounded bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface" title="Split Workspace Layout">
<span className="material-symbols-outlined text-[15px]">view_quilt</span>
</button>
</div>
</div>
{/*  Top 3-Panel Split Area (Fixed Upper Viewport)  */}
<div className="grid grid-cols-12 gap-gutter w-full h-[58%] min-h-[380px] p-space-xs bg-surface-container-lowest overflow-hidden">
{/*  LEFT PANEL: Media Pool & Asset Browser (Col 3)  */}
<section className="col-span-3 flex flex-col bg-[#131720] border border-[#232938] rounded overflow-hidden select-none text-[11px] font-body-sm"><div className="flex items-center bg-[#181D28] border-b border-[#232938] h-7 px-1 shrink-0"><button className="px-2.5 h-full flex items-center justify-center font-label-sm text-[10px] uppercase tracking-wider font-semibold text-secondary border-b-2 border-secondary bg-[#131720]">Media Pool</button><button className="px-2.5 h-full flex items-center justify-center font-label-sm text-[10px] uppercase tracking-wider text-outline hover:text-on-surface transition-colors">Captions</button><button className="px-2.5 h-full flex items-center justify-center font-label-sm text-[10px] uppercase tracking-wider text-outline hover:text-on-surface transition-colors">Transitions</button><button className="px-2.5 h-full flex items-center justify-center font-label-sm text-[10px] uppercase tracking-wider text-outline hover:text-on-surface transition-colors">FX</button><div className="ml-auto flex items-center gap-1 text-outline"><button className="w-5 h-5 flex items-center justify-center hover:text-on-surface" title="Search"><span className="material-symbols-outlined text-[13px]">search</span></button><button className="w-5 h-5 flex items-center justify-center hover:text-on-surface" title="View Options"><span className="material-symbols-outlined text-[13px]">tune</span></button></div></div><div className="flex-1 flex flex-col overflow-hidden bg-[#131720]"><div className="p-1.5 bg-[#181D28]/60 border-b border-[#232938] flex flex-col gap-1 shrink-0"><div className="flex items-center justify-between text-[10px] font-label-sm text-outline px-0.5"><span>PROJECT BINS</span><span className="text-[9px] text-secondary font-mono">3 FOLDERS</span></div><div className="flex flex-col gap-0.5"><div className="flex items-center justify-between px-1.5 py-1 rounded bg-[#1C2230] text-secondary border border-[#232938] cursor-pointer"><div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-outline">expand_more</span><span className="material-symbols-outlined text-[13px] text-secondary">folder</span><span className="font-mono font-medium text-[10px]">01_RAW_CLIPS</span></div><span className="font-mono text-[9px] px-1 py-0.2 rounded bg-[#131720] text-secondary">14</span></div><div className="flex items-center justify-between px-1.5 py-0.5 rounded text-on-surface-variant hover:bg-[#181D28] cursor-pointer"><div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-outline">chevron_right</span><span className="material-symbols-outlined text-[13px] text-outline">folder</span><span className="font-mono text-[10px]">02_AUDIO_STEMS</span></div><span className="font-mono text-[9px] px-1 rounded bg-[#181D28] text-outline">6</span></div><div className="flex items-center justify-between px-1.5 py-0.5 rounded text-on-surface-variant hover:bg-[#181D28] cursor-pointer"><div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[12px] text-outline">chevron_right</span><span className="material-symbols-outlined text-[13px] text-outline">folder</span><span className="font-mono text-[10px]">03_GRAPHICS</span></div><span className="font-mono text-[9px] px-1 rounded bg-[#181D28] text-outline">9</span></div></div></div><div className="p-1.5 bg-[#0C0E14] border-b border-[#232938] flex flex-col gap-1 shrink-0"><div className="border border-dashed border-[#232938] hover:border-secondary/40 rounded p-1 flex items-center justify-between cursor-pointer"><div className="flex items-center gap-1.5"><span className="material-symbols-outlined text-[14px] text-outline">cloud_upload</span><span className="text-[10px] text-outline">Drag 55+ files or click to ingest</span></div><span className="text-[9px] font-mono text-outline border border-[#232938] px-1 rounded">INGEST</span></div><div className="flex items-center justify-between text-[9px] font-label-sm text-outline px-0.5"><div className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span><span className="text-on-surface-variant">NVMe Stream: Ready</span></div><span className="font-mono text-secondary">3.2 GB/s</span></div></div><div className="flex-1 overflow-y-auto flex flex-col bg-[#0C0E14]"><div className="sticky top-0 bg-[#181D28] border-b border-[#232938] grid grid-cols-12 px-1.5 py-0.5 text-[9px] font-label-sm uppercase tracking-wider text-outline z-10"><span className="col-span-6">Clip Name</span><span className="col-span-2 text-center">Res</span><span className="col-span-2 text-right">Dur</span><span className="col-span-2 text-right">FPS</span></div><div className="divide-y divide-[#232938]"><div className="grid grid-cols-12 px-1.5 py-1 text-[10px] font-mono bg-[#1C2230] border-l-2 border-secondary cursor-pointer items-center"><div className="col-span-6 truncate flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-secondary">videocam</span><span className="text-white font-medium truncate">SHIBUYA_01.MOV</span></div><span className="col-span-2 text-center text-secondary text-[9px]">4K DCI</span><span className="col-span-2 text-right text-on-surface-variant text-[9px]">00:18:24</span><span className="col-span-2 text-right text-outline text-[9px]">24.00</span></div><div className="grid grid-cols-12 px-1.5 py-1 text-[10px] font-mono hover:bg-[#181D28] cursor-pointer items-center text-on-surface-variant"><div className="col-span-6 truncate flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-outline">videocam</span><span className="truncate">CYBER_PORTRAIT.MOV</span></div><span className="col-span-2 text-center text-secondary text-[9px]">4K UHD</span><span className="col-span-2 text-right text-[9px]">00:09:40</span><span className="col-span-2 text-right text-outline text-[9px]">59.94</span></div><div className="grid grid-cols-12 px-1.5 py-1 text-[10px] font-mono hover:bg-[#181D28] cursor-pointer items-center text-on-surface-variant"><div className="col-span-6 truncate flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-outline">videocam</span><span className="truncate">METRO_SPEED.MOV</span></div><span className="col-span-2 text-center text-outline text-[9px]">4K RAW</span><span className="col-span-2 text-right text-[9px]">00:04:12</span><span className="col-span-2 text-right text-outline text-[9px]">60.00</span></div><div className="grid grid-cols-12 px-1.5 py-1 text-[10px] font-mono hover:bg-[#181D28] cursor-pointer items-center text-on-surface-variant"><div className="col-span-6 truncate flex items-center gap-1"><span className="material-symbols-outlined text-[12px] text-tertiary">audiotrack</span><span className="truncate">SYNTH_WAVE.WAV</span></div><span className="col-span-2 text-center text-tertiary text-[9px]">24-bit</span><span className="col-span-2 text-right text-[9px]">02:14:00</span><span className="col-span-2 text-right text-tertiary text-[9px]">48kHz</span></div></div><div className="p-1.5 bg-[#131720] border-t border-[#232938] flex flex-col gap-1.5 mt-auto"><div className="flex items-center justify-between text-[10px] font-label-sm uppercase tracking-wider text-outline"><span>Caption Engine Presets</span><span className="text-[9px] text-secondary font-mono">AI ACTIVE</span></div><div className="grid grid-cols-2 gap-1"><button className="py-0.5 px-1 bg-[#181D28] hover:bg-[#232938] border border-[#232938] text-white rounded text-[9px] font-label-sm flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[11px] text-secondary">mic</span> Auto-STT</button><button className="py-0.5 px-1 bg-[#181D28] hover:bg-[#232938] border border-[#232938] text-outline hover:text-white rounded text-[9px] font-label-sm flex items-center justify-center gap-1"><span className="material-symbols-outlined text-[11px]">upload_file</span> Import .SRT</button></div><div className="flex flex-col gap-1 pt-0.5"><div className="p-1 rounded bg-[#0C0E14] border border-[#232938] flex items-center justify-between cursor-pointer hover:border-secondary/50"><div className="flex items-center gap-1.5"><span className="text-[9px] font-bold px-1 rounded bg-yellow-400 text-black">VIRAL</span><span className="text-[10px] text-white font-bold">Viral Kinetic</span></div><span className="text-[8px] font-mono text-outline">Impact / Stroke</span></div><div className="p-1 rounded bg-[#0C0E14] border border-secondary/40 flex items-center justify-between cursor-pointer"><div className="flex items-center gap-1.5"><span className="text-[9px] font-mono px-1 rounded border border-secondary text-secondary">CYBR</span><span className="text-[10px] text-secondary font-mono">Cyber Monospace</span></div><span className="text-[8px] font-mono text-secondary">Active</span></div><div className="p-1 rounded bg-[#0C0E14] border border-[#232938] flex items-center justify-between cursor-pointer hover:border-secondary/50"><div className="flex items-center gap-1.5"><span className="text-[9px] font-medium px-1 rounded bg-white text-black">MIN</span><span className="text-[10px] text-on-surface">Swiss Minimal</span></div><span className="text-[8px] font-mono text-outline">Lower 3rd</span></div></div></div></div></div></section>
{/*  CENTER PANEL: Source & Program Dual Viewers + Scopes (Col 6)  */}
<section className="col-span-6 flex flex-col bg-[#0C0E14] border border-[#232938] rounded overflow-hidden relative select-none font-body-sm"><div className="h-6 px-2 bg-[#181D28] border-b border-[#232938] flex items-center justify-between text-[10px] font-label-sm shrink-0"><div className="flex items-center gap-1.5"><div className="flex items-center rounded border border-[#232938] bg-[#0C0E14] p-0.5"><span className="px-1.5 py-0.2 rounded bg-secondary/20 text-secondary border border-secondary/30 flex items-center gap-1 font-semibold text-[9px]"><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>AUTO SYNC: ACTIVE</span><span className="px-1.5 py-0.2 text-outline hover:text-on-surface cursor-pointer text-[9px]">MANUAL EDIT</span></div><span className="text-[#232938]">|</span><span className="text-outline text-[9px] font-mono">Speed Ratio: <strong className="text-on-surface font-normal">1.042x</strong></span><span className="text-outline text-[9px] font-mono">54 Injected Transitions</span><span className="text-secondary text-[9px] font-mono">[Anchor: Locked]</span></div><div className="flex items-center gap-2"><span className="text-outline font-mono text-[9px]">CALIBRATION: REC.709 D65</span><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span></div></div><div className="h-7 px-2 bg-[#131720] border-b border-[#232938] flex items-center justify-between text-[10px] font-label-sm shrink-0"><div className="flex items-center gap-1"><span className="text-outline uppercase text-[9px] tracking-wider mr-1">Aspect:</span><button className="px-2 py-0.5 rounded bg-[#1C2230] text-secondary border border-secondary/40 font-semibold text-[9px]">9:16 VERTICAL</button><button className="px-2 py-0.5 rounded text-outline hover:text-on-surface text-[9px]">16:9 CINEMA</button><button className="px-2 py-0.5 rounded text-outline hover:text-on-surface text-[9px]">1:1 SQUARE</button></div><div className="flex items-center gap-1.5"><button className="px-1.5 py-0.5 rounded border border-[#232938] bg-[#0C0E14] text-secondary flex items-center gap-1 text-[9px]" title="Safe Title &amp; Action Guides"><span className="material-symbols-outlined text-[11px]">grid_4x4</span> Guides ON</button><div className="flex items-center gap-1 bg-[#0C0E14] border border-[#232938] px-1.5 py-0.5 rounded text-[9px] text-on-surface"><span className="font-mono">100% Fit</span><span className="material-symbols-outlined text-[11px] text-outline">arrow_drop_down</span></div></div></div><div className="flex-1 flex bg-[#07090F] relative min-h-0"><div className="flex-1 relative flex items-center justify-center p-1.5 overflow-hidden"><div className="relative h-full aspect-[9/16] bg-[#0A0E18] border border-[#232938] shadow-2xl flex items-center justify-center overflow-hidden"><img className="w-full h-full object-cover" alt="Vertical 9 to 16 cinematic video still of stylish Japanese model standing in neo Tokyo illuminated neon sign rain dramatic color grade high fashion visual" src={indAsset2}/><div className="absolute inset-3 border border-dashed border-secondary/30 pointer-events-none flex items-start justify-end p-0.5"><span className="font-mono text-[8px] text-secondary/60">93% ACT</span></div><div className="absolute inset-6 border border-dashed border-primary/30 pointer-events-none flex items-start justify-end p-0.5"><span className="font-mono text-[8px] text-primary/60">90% TTL</span></div><div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#0C0E14]/90 border border-[#232938] rounded text-[10px] font-mono text-secondary tracking-widest">00:00:14:18</div><div className="absolute bottom-4 left-2 right-2 p-1.5 bg-[#0C0E14]/90 border border-[#232938] border-l-2 border-l-secondary rounded flex flex-col backdrop-blur-sm"><span className="font-headline-md text-white font-bold text-[12px] leading-tight">TOKYO DRIFT 2025</span><span className="font-label-sm text-[9px] text-secondary uppercase tracking-widest font-mono">APEX MASTER CUT • 60 FPS</span></div></div><div className="absolute top-2 right-12 w-28 bg-[#0C0E14]/90 border border-[#232938] rounded p-1 pointer-events-none"><div className="flex items-center justify-between text-[8px] font-mono text-outline border-b border-[#232938] pb-0.5 mb-1"><span>WAVEFORM PARADE</span><span className="text-secondary">709</span></div><div className="h-8 w-full flex items-end justify-between gap-1 px-0.5"><div className="flex-1 h-full flex items-end"><div className="w-full bg-error/50 h-3/4 rounded-t-sm"></div></div><div className="flex-1 h-full flex items-end"><div className="w-full bg-secondary/50 h-3/5 rounded-t-sm"></div></div><div className="flex-1 h-full flex items-end"><div className="w-full bg-primary/50 h-4/5 rounded-t-sm"></div></div></div></div></div><div className="w-10 bg-[#131720] border-l border-[#232938] flex flex-col items-center py-2 px-1 shrink-0 select-none"><span className="text-[8px] font-mono text-outline mb-1">VU dB</span><div className="flex-1 w-full flex items-stretch justify-center gap-1"><div className="w-1.5 h-full bg-[#0C0E14] rounded-xs flex flex-col-reverse p-0.2 overflow-hidden border border-[#232938]"><div className="w-full bg-secondary h-[72%]"></div></div><div className="w-1.5 h-full bg-[#0C0E14] rounded-xs flex flex-col-reverse p-0.2 overflow-hidden border border-[#232938]"><div className="w-full bg-secondary h-[68%]"></div></div><div className="flex flex-col justify-between text-[7px] font-mono text-outline pl-0.5"><span>+3</span><span>0</span><span>-6</span><span>-12</span><span>-20</span><span>-40</span><span>-60</span></div></div><span className="text-[8px] font-mono text-secondary mt-1">-6.2</span></div></div><div className="h-9 px-3 bg-[#131720] border-t border-[#232938] flex items-center justify-between shrink-0"><div className="flex items-center gap-1"><button className="w-7 h-7 rounded border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-outline hover:text-white flex items-center justify-center" title="Step Back 1 Sec"><span className="material-symbols-outlined text-[15px]">fast_rewind</span></button><button className="w-7 h-7 rounded border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-outline hover:text-white flex items-center justify-center" title="Step Back 1 Frame"><span className="material-symbols-outlined text-[15px]">skip_previous</span></button><button className="w-8 h-7 rounded border border-primary-container bg-primary-container text-white hover:bg-inverse-primary flex items-center justify-center" title="Play / Pause (Space)"><span className="material-symbols-outlined text-[18px]">play_arrow</span></button><button className="w-7 h-7 rounded border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-outline hover:text-white flex items-center justify-center" title="Step Forward 1 Frame"><span className="material-symbols-outlined text-[15px]">skip_next</span></button><button className="w-7 h-7 rounded border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-outline hover:text-white flex items-center justify-center" title="Step Forward 1 Sec"><span className="material-symbols-outlined text-[15px]">fast_forward</span></button><button className="w-7 h-7 ml-1 rounded border border-[#232938] bg-[#181D28] hover:bg-[#232938] text-secondary flex items-center justify-center" title="Loop Playback"><span className="material-symbols-outlined text-[15px]">repeat</span></button></div><div className="flex items-center gap-3 font-mono text-[11px]"><div className="flex items-center gap-1.5"><span className="text-outline text-[10px] font-sans font-medium uppercase">POS</span><span className="text-secondary font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#0C0E14] border border-[#232938]">00:00:14:18</span></div><div className="flex items-center gap-1.5"><span className="text-outline text-[10px] font-sans font-medium uppercase">TOTAL</span><span className="text-on-surface font-medium tracking-wider px-1.5 py-0.5 rounded bg-[#0C0E14] border border-[#232938]">00:04:35:00</span></div></div><div className="flex items-center gap-1"><button className="px-2 py-1 rounded border border-[#232938] bg-[#181D28] text-on-surface hover:text-white text-[10px] font-label-sm"><strong className="text-secondary">[I]</strong> Mark</button><button className="px-2 py-1 rounded border border-[#232938] bg-[#181D28] text-on-surface hover:text-white text-[10px] font-label-sm"><strong className="text-secondary">[O]</strong> Mark</button><button className="w-7 h-7 rounded border border-[#232938] bg-[#181D28] text-secondary flex items-center justify-center hover:bg-[#232938]" title="Razor Playhead"><span className="material-symbols-outlined text-[14px]">content_cut</span></button></div></div></section>
{/*  RIGHT PANEL: Inspector & Effects Stack & Audio Mixer Strip (Col 3)  */}
<section className="col-span-3 flex flex-col bg-surface-container-low rounded overflow-hidden">
{/*  Tabs Header  */}
<div className="flex items-center bg-surface-container-lowest h-7 border-b border-surface-container-high">
<button className="flex-1 h-full flex items-center justify-center text-primary border-b-2 border-primary-container font-headline-md text-headline-md text-[11px] bg-surface-container-low font-semibold">
          Video Inspector
        </button>
<button className="flex-1 h-full flex items-center justify-center text-on-surface-variant hover:text-on-surface font-headline-md text-headline-md text-[11px] bg-surface-container-lowest">
          Effects Chain
        </button>
<button className="flex-1 h-full flex items-center justify-center text-on-surface-variant hover:text-on-surface font-headline-md text-headline-md text-[11px] bg-surface-container-lowest">
          Mixer (A1-A3)
        </button>
</div>
{/*  Inspector Scroll Content  */}
<div className="flex-1 overflow-y-auto p-space-md flex flex-col gap-space-md bg-surface-container-lowest">
{/*  Video Transform Group  */}
<div className="flex flex-col gap-1.5 bg-surface-container p-2 rounded">
<div className="flex items-center justify-between text-on-surface font-headline-md text-headline-md text-xs">
<span className="flex items-center gap-1 text-secondary">
<span className="material-symbols-outlined text-[14px]">transform</span> Transform (Clip V1)
            </span>
<button className="text-outline hover:text-on-surface text-[12px] font-label-sm">Reset</button>
</div>
{/*  Scale Field  */}
<div className="flex items-center justify-between text-body-sm font-body-sm">
<span className="text-outline">Scale</span>
<div className="flex items-center gap-1 bg-surface-container-lowest px-2 py-0.5 rounded border border-surface-container-high w-32 justify-between">
<span className="text-on-surface font-mono font-label-sm text-label-sm">100.0%</span>
<span className="material-symbols-outlined text-[13px] text-outline cursor-ew-resize">sync_alt</span>
</div>
</div>
{/*  Position X / Y  */}
<div className="flex items-center justify-between text-body-sm font-body-sm">
<span className="text-outline">Position X / Y</span>
<div className="flex items-center gap-1 w-32">
<div className="flex-1 flex items-center justify-between bg-surface-container-lowest px-1.5 py-0.5 rounded border border-surface-container-high">
<span className="text-outline font-label-sm text-[10px]">X:</span>
<span className="text-on-surface font-mono font-label-sm text-label-sm">0.00</span>
</div>
<div className="flex-1 flex items-center justify-between bg-surface-container-lowest px-1.5 py-0.5 rounded border border-surface-container-high">
<span className="text-outline font-label-sm text-[10px]">Y:</span>
<span className="text-on-surface font-mono font-label-sm text-label-sm">-12.4</span>
</div>
</div>
</div>
{/*  Rotation & Anchor  */}
<div className="flex items-center justify-between text-body-sm font-body-sm">
<span className="text-outline">Rotation</span>
<div className="flex items-center gap-1 bg-surface-container-lowest px-2 py-0.5 rounded border border-surface-container-high w-32 justify-between">
<span className="text-on-surface font-mono font-label-sm text-label-sm">0.0°</span>
<div className="w-3 h-3 rounded-full border border-secondary relative flex items-center justify-center">
<div className="w-1 h-0.5 bg-secondary absolute top-0"></div>
</div>
</div>
</div>
{/*  Opacity & Blend Mode  */}
<div className="flex items-center justify-between text-body-sm font-body-sm">
<span className="text-outline">Opacity</span>
<div className="flex items-center gap-2 w-32">
<div className="flex-1 h-1.5 bg-surface-container-lowest rounded overflow-hidden">
<div className="h-full bg-secondary w-full"></div>
</div>
<span className="text-on-surface font-mono font-label-sm text-label-sm">100%</span>
</div>
</div>
</div>
{/*  Real-Time Applied Effects Stack  */}
<div className="flex flex-col gap-1.5 bg-surface-container p-2 rounded">
<div className="flex items-center justify-between text-on-surface font-headline-md text-headline-md text-xs">
<span className="flex items-center gap-1 text-primary">
<span className="material-symbols-outlined text-[14px]">auto_fix_high</span> Applied Effects Stack (3)
            </span>
<button className="text-secondary hover:text-on-surface"><span className="material-symbols-outlined text-[15px]">add_circle</span></button>
</div>
{/*  Effect Item 1  */}
<div className="flex items-center justify-between p-1.5 rounded bg-surface-container-lowest border border-surface-container-high">
<div className="flex items-center gap-1.5">
<input checked="" className="accent-secondary w-3 h-3" type="checkbox"/>
<span className="font-headline-md text-headline-md text-xs text-on-surface">Tokyo_Noir_04.cube</span>
</div>
<span className="font-label-sm text-[10px] text-tertiary px-1 py-0.2 rounded bg-tertiary/10">3D LUT 33x</span>
</div>
{/*  Effect Item 2  */}
<div className="flex items-center justify-between p-1.5 rounded bg-surface-container-lowest border border-surface-container-high">
<div className="flex items-center gap-1.5">
<input checked="" className="accent-secondary w-3 h-3" type="checkbox"/>
<span className="font-headline-md text-headline-md text-xs text-on-surface">Optical Flow Stabilization</span>
</div>
<span className="font-label-sm text-[10px] text-secondary px-1 py-0.2 rounded bg-secondary/10">LOCKED</span>
</div>
{/*  Effect Item 3  */}
<div className="flex items-center justify-between p-1.5 rounded bg-surface-container-lowest border border-surface-container-high">
<div className="flex items-center gap-1.5">
<input checked="" className="accent-secondary w-3 h-3" type="checkbox"/>
<span className="font-headline-md text-headline-md text-xs text-on-surface">Spatial Noise Reduction</span>
</div>
<span className="font-label-sm text-[10px] text-primary px-1 py-0.2 rounded bg-primary/10">CUDA ACCEL</span>
</div>
</div>
{/*  Audio Master Mixer Strip Mini  */}
<div className="flex flex-col gap-1.5 bg-surface-container p-2 rounded">
<div className="flex items-center justify-between text-on-surface font-headline-md text-headline-md text-xs">
<span className="flex items-center gap-1 text-tertiary">
<span className="material-symbols-outlined text-[14px]">equalizer</span> Fairlight EQ &amp; Dynamics
            </span>
<span className="text-secondary font-mono font-label-sm text-label-sm">-14 LUFS Target</span>
</div>
{/*  SVG Parametric EQ Mini Curve  */}
<div className="h-14 w-full bg-surface-container-lowest rounded p-1 relative border border-surface-container-high flex items-center justify-center">
<svg className="w-full h-full text-secondary" preserveaspectratio="none" viewbox="0 0 200 60">
{/*  Grid lines  */}
<line stroke="#1E2536" stroke-dasharray="2,2" stroke-width="1" x1="0" x2="200" y1="30" y2="30"></line>
<line stroke="#1E2536" stroke-width="1" x1="50" x2="50" y1="0" y2="60"></line>
<line stroke="#1E2536" stroke-width="1" x1="100" x2="100" y1="0" y2="60"></line>
<line stroke="#1E2536" stroke-width="1" x1="150" x2="150" y1="0" y2="60"></line>
{/*  EQ curve line  */}
<path d="M 0,40 Q 40,38 70,22 T 120,32 T 160,18 T 200,30" fill="none" stroke="currentColor" stroke-width="2"></path>
{/*  Interactive Band Nodes  */}
<circle cx="70" cy="22" fill="#4cd7f6" r="3" stroke="#07090F" stroke-width="1"></circle>
<circle cx="120" cy="32" fill="#4cd7f6" r="3" stroke="#07090F" stroke-width="1"></circle>
<circle cx="160" cy="18" fill="#ffb95f" r="3" stroke="#07090F" stroke-width="1"></circle>
</svg>
</div>
<div className="flex items-center justify-between font-label-sm text-label-sm text-outline pt-0.5">
<span>High-Pass: 80Hz</span>
<span>Notch: 2.4kHz</span>
<span className="text-tertiary">Air Boost: +3.2dB</span>
</div>
</div>
</div>
</section>
</div>
{/*  BOTTOM PANEL: Master Multi-Track Timeline Sequence  */}
<section className="flex-1 flex flex-col bg-surface-container-lowest border-t-2 border-surface-container-high overflow-hidden select-none">
{/*  Timeline Toolbar Header  */}
<div className="h-8 px-space-md bg-surface-container flex items-center justify-between border-b border-surface-container-high shrink-0">
<div className="flex items-center gap-space-sm font-label-sm text-label-sm">
{/*  Snapping & Magnetic toggles  */}
<button className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-secondary hover:bg-surface-bright" title="Magnetic Snapping (N)">
<span className="material-symbols-outlined text-[14px]">qr_code_2</span>
<span>Snap ON</span>
</button>
<button className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant hover:text-on-surface" title="Linked Selection (Ctrl+L)">
<span className="material-symbols-outlined text-[14px]">link</span>
<span>Linked</span>
</button>
<button className="flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-on-surface-variant hover:text-on-surface" title="Ripple Edit Mode">
<span className="material-symbols-outlined text-[14px]">sync_alt</span>
<span>Ripple Mode</span>
</button>
</div>
{/*  Center Sequence Title & In/Out Flags Range  */}
<div className="flex items-center gap-2 font-label-sm text-label-sm">
<span className="text-outline">SEQUENCE:</span>
<span className="text-on-surface font-semibold">Tokyo_Reel_Master_V3</span>
<span className="text-outline">|</span>
<span className="text-secondary">Range: 00:00:00:00 - 00:00:45:12</span>
</div>
{/*  Zoom Slider Control  */}
<div className="flex items-center gap-2 font-label-sm text-label-sm">
<span className="material-symbols-outlined text-outline text-[14px]">zoom_out</span>
<div className="w-24 h-1.5 bg-surface-container-lowest rounded relative flex items-center">
<div className="w-14 h-full bg-secondary rounded"></div>
<div className="w-2.5 h-2.5 rounded-full bg-white shadow absolute left-12 cursor-pointer"></div>
</div>
<span className="material-symbols-outlined text-outline text-[14px]">zoom_in</span>
<span className="text-on-surface font-mono ml-1">1.4x</span>
</div>
</div>
{/*  Timeline Workspace Split (Left Track Headers vs Right Timeline Canvas)  */}
<div className="flex-1 flex overflow-hidden relative">
{/*  Left Track Headers Column (Fixed 130px)  */}
<div className="w-32 flex flex-col bg-surface-container border-r border-surface-container-high shrink-0 z-20 shadow-md">
{/*  Track Header Top Ruler Pad  */}
<div className="h-6 bg-surface-container-lowest border-b border-surface-container-high flex items-center px-2">
<span className="font-label-sm text-[10px] text-outline font-semibold">TRACKS</span>
</div>
{/*  Video Tracks Headers  */}
<div className="flex-1 flex flex-col overflow-hidden">
{/*  V3 Header  */}
<div className="h-10 px-2 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between text-body-sm font-body-sm">
<div className="flex items-center gap-1 font-semibold text-secondary">
<span>V3</span>
<span className="text-[10px] text-outline font-normal">Title</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant">
<button className="hover:text-on-surface" title="Lock Track"><span className="material-symbols-outlined text-[13px]">lock_open</span></button>
<button className="hover:text-on-surface" title="Toggle Track Output"><span className="material-symbols-outlined text-[13px]">visibility</span></button>
</div>
</div>
{/*  V2 Header  */}
<div className="h-10 px-2 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between text-body-sm font-body-sm">
<div className="flex items-center gap-1 font-semibold text-secondary">
<span>V2</span>
<span className="text-[10px] text-outline font-normal">B-Roll</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant">
<button className="hover:text-on-surface" title="Lock Track"><span className="material-symbols-outlined text-[13px]">lock_open</span></button>
<button className="hover:text-on-surface" title="Toggle Track Output"><span className="material-symbols-outlined text-[13px]">visibility</span></button>
</div>
</div>
{/*  V1 Header (Primary)  */}
<div className="h-10 px-2 bg-surface-container border-b-2 border-primary-container/40 flex items-center justify-between text-body-sm font-body-sm">
<div className="flex items-center gap-1 font-semibold text-primary">
<span>V1</span>
<span className="text-[10px] text-outline font-normal">A-Roll</span>
</div>
<div className="flex items-center gap-1 text-primary">
<button className="hover:text-on-surface" title="Lock Track"><span className="material-symbols-outlined text-[13px]">lock_open</span></button>
<button className="hover:text-on-surface" title="Toggle Track Output"><span className="material-symbols-outlined text-[13px]">visibility</span></button>
</div>
</div>
{/*  Audio Divider  */}
<div className="h-1 bg-surface-container-highest shrink-0"></div>
{/*  A1 Header  */}
<div className="h-10 px-2 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between text-body-sm font-body-sm">
<div className="flex items-center gap-1 font-semibold text-secondary">
<span>A1</span>
<span className="text-[10px] text-outline font-normal">Voice</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-[10px]">
<button className="px-1 bg-surface-container-high rounded text-on-surface" title="Mute">M</button>
<button className="px-1 bg-surface-container-high rounded hover:text-on-surface" title="Solo">S</button>
</div>
</div>
{/*  A2 Header  */}
<div className="h-10 px-2 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between text-body-sm font-body-sm">
<div className="flex items-center gap-1 font-semibold text-tertiary">
<span>A2</span>
<span className="text-[10px] text-outline font-normal">Music</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-[10px]">
<button className="px-1 bg-surface-container-high rounded text-on-surface" title="Mute">M</button>
<button className="px-1 bg-surface-container-high rounded hover:text-on-surface" title="Solo">S</button>
</div>
</div>
{/*  A3 Header  */}
<div className="h-10 px-2 bg-surface-container-low border-b border-surface-container-high flex items-center justify-between text-body-sm font-body-sm">
<div className="flex items-center gap-1 font-semibold text-secondary">
<span>A3</span>
<span className="text-[10px] text-outline font-normal">SFX</span>
</div>
<div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-[10px]">
<button className="px-1 bg-surface-container-high rounded text-on-surface" title="Mute">M</button>
<button className="px-1 bg-surface-container-high rounded hover:text-on-surface" title="Solo">S</button>
</div>
</div>
</div>
</div>
{/*  Right Timeline Track Viewport with Clips & Timecode Ruler  */}
<div className="flex-1 flex flex-col overflow-x-auto relative bg-[#07090F]">
{/*  Timecode Ruler Bar  */}
<div className="h-6 w-[2000px] bg-surface-container-lowest border-b border-surface-container-high relative flex items-center select-none shrink-0">
{/*  Marks  */}
<div className="absolute left-0 top-0 bottom-0 flex items-center pl-1 font-label-sm text-[10px] text-outline font-mono">00:00:00:00</div>
<div className="absolute left-60 top-0 bottom-0 flex items-center font-label-sm text-[10px] text-outline font-mono border-l border-surface-container-high pl-1">00:00:05:00</div>
<div className="absolute left-[30rem] top-0 bottom-0 flex items-center font-label-sm text-[10px] text-outline font-mono border-l border-surface-container-high pl-1">00:00:10:00</div>
<div className="absolute left-[45rem] top-0 bottom-0 flex items-center font-label-sm text-[10px] text-secondary font-mono border-l border-secondary pl-1 font-semibold">00:00:14:08</div>
<div className="absolute left-[60rem] top-0 bottom-0 flex items-center font-label-sm text-[10px] text-outline font-mono border-l border-surface-container-high pl-1">00:00:20:00</div>
<div className="absolute left-[75rem] top-0 bottom-0 flex items-center font-label-sm text-[10px] text-outline font-mono border-l border-surface-container-high pl-1">00:00:25:00</div>
<div className="absolute left-[90rem] top-0 bottom-0 flex items-center font-label-sm text-[10px] text-outline font-mono border-l border-surface-container-high pl-1">00:00:30:00</div>
</div>
{/*  Master Tracks Canvas  */}
<div className="w-[2000px] flex-1 flex flex-col relative">
{/*  V3 Track Canvas: Motion Titles  */}
<div className="h-10 border-b border-surface-container-high/40 relative flex items-center">
{/*  Clip: Animated Title Box  */}
<div className="absolute left-24 w-80 h-8 rounded bg-primary-container/80 border border-primary text-on-primary-container flex items-center px-2 shadow-md cursor-pointer hover:brightness-110">
<span className="material-symbols-outlined text-[13px] mr-1">title</span>
<span className="font-headline-md text-xs truncate">Title: "TOKYO_DRIFT_INTRO.mogrt"</span>
<span className="ml-auto font-mono text-[9px] text-primary-fixed">04:15</span>
</div>
{/*  Clip: Lower Third Subtitle  */}
<div className="absolute left-[40rem] w-64 h-8 rounded bg-primary-container/60 border border-primary-fixed text-on-primary-container flex items-center px-2 shadow cursor-pointer">
<span className="font-headline-md text-xs truncate">Caption: "Neon Horizons"</span>
<span className="ml-auto font-mono text-[9px] text-primary-fixed">03:00</span>
</div>
</div>
{/*  V2 Track Canvas: B-Roll Cutaways  */}
<div className="h-10 border-b border-surface-container-high/40 relative flex items-center">
{/*  Cutaway Clip 1  */}
<div className="absolute left-64 w-96 h-8 rounded bg-surface-container-high border border-surface-bright flex items-center px-2 cursor-pointer hover:border-secondary transition-colors overflow-hidden">
<div className="absolute inset-0 opacity-20 bg-cover bg-center" alt="Micro filmstrip segment of neon signs in alleyway" style={{ "backgroundImage": "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCJErGbfPiifVPqTCfmnmj9LhL9LBBJtPrU6QqZgFcXKNj1cjf3SLQJv6RRmcWWFWYRaPmZL2yUygKDPFAW5dIitjWhcRrbusw3dFFAOJqibdAZOp4nIHBRy6KhVzyTN22-gtrCD6XlzhxPhZUM3M3xKcP41uPXAIuIoNYB2X8dxO4GZVoawTzrVyDGp6mb9wz0auYgQj1QgCyEY8C271RkJHBleqgbru1XG0EGfcmaDzk3WsOWGX5r')" }}></div>
<span className="relative font-body-sm text-xs text-on-surface truncate font-medium">B-ROLL_SUBWAY_FASTPASS.MOV</span>
<span className="relative ml-auto font-mono text-[9px] text-secondary">06:22</span>
</div>
</div>
{/*  V1 Track Canvas: Primary A-Roll  */}
<div className="h-10 border-b-2 border-primary-container/30 relative flex items-center">
{/*  Clip 1  */}
<div className="absolute left-0 w-80 h-8 rounded bg-[#1A2333] border border-outline-variant flex items-center px-2 cursor-pointer hover:border-secondary">
<span className="font-body-sm text-xs text-on-surface truncate">SHIBUYA_NIGHT_01.MOV [RAW]</span>
<span className="ml-auto font-mono text-[9px] text-outline">05:12</span>
</div>
{/*  Clip 2 (Active Selected Clip under Playhead)  */}
<div className="absolute left-80 w-[32rem] h-8 rounded bg-surface-container-high border-2 border-secondary shadow-lg flex items-center px-2 cursor-pointer">
<div className="w-1.5 h-full bg-secondary -ml-2 mr-2"></div>
<span className="font-body-sm text-xs text-white font-semibold truncate">CYBER_PORTRAIT_B_04.MOV [Graded]</span>
<span className="ml-auto font-mono text-[10px] text-secondary font-bold">12:08</span>
</div>
{/*  Clip 3  */}
<div className="absolute left-[52rem] w-96 h-8 rounded bg-[#1A2333] border border-outline-variant flex items-center px-2 cursor-pointer hover:border-secondary">
<span className="font-body-sm text-xs text-on-surface truncate">METRO_SPEED_CUT_09.MOV</span>
<span className="ml-auto font-mono text-[9px] text-outline">08:00</span>
</div>
</div>
{/*  Audio Divider Canvas Line  */}
<div className="h-1 bg-surface-container-highest shrink-0"></div>
{/*  A1 Track Canvas: Dialogue / Voice Waveform  */}
<div className="h-10 border-b border-surface-container-high/40 relative flex items-center">
{/*  Dialogue Wave Clip  */}
<div className="absolute left-0 w-[42rem] h-8 rounded bg-surface-container border border-secondary/40 flex items-center px-2 overflow-hidden cursor-pointer">
{/*  Rendered Vector Audio Waveform  */}
<svg className="absolute inset-x-0 inset-y-1 w-full h-6 text-secondary opacity-70" preserveaspectratio="none" viewbox="0 0 500 40">
<path d="M0,20 Q10,5 20,20 T40,20 T60,2 T80,38 T100,20 T120,8 T140,32 T160,20 T180,4 T200,36 T220,20 T240,12 T260,28 T280,20 T300,6 T320,34 T340,20 T360,10 T380,30 T400,20 T420,15 T440,25 T460,20 T480,8 T500,20" fill="none" stroke="currentColor" stroke-width="2"></path>
</svg>
<span className="relative font-body-sm text-xs text-white z-10 drop-shadow">DIALOGUE_ACTOR_MAIN_MIC.WAV</span>
<span className="relative ml-auto font-mono text-[9px] text-secondary z-10">48kHz</span>
</div>
</div>
{/*  A2 Track Canvas: Background Music Bed  */}
<div className="h-10 border-b border-surface-container-high/40 relative flex items-center">
{/*  Music Clip with Dense Waveform  */}
<div className="absolute left-16 w-[70rem] h-8 rounded bg-[#121824] border border-tertiary/40 flex items-center px-2 overflow-hidden cursor-pointer">
<svg className="absolute inset-x-0 inset-y-1 w-full h-6 text-tertiary opacity-60" preserveaspectratio="none" viewbox="0 0 800 40">
<path d="M0,20 L10,12 L20,28 L30,5 L40,35 L50,15 L60,25 L70,2 L80,38 L90,18 L100,22 L110,8 L120,32 L130,16 L140,24 L150,4 L160,36 L170,14 L180,26 L190,10 L200,30 L210,18 L220,22 L230,6 L240,34 L250,16 L260,24 L270,12 L280,28 L290,8 L300,32 L310,15 L320,25 L330,4 L340,36 L350,18 L360,22 L370,10 L380,30 L390,14 L400,26 L410,6 L420,34 L430,18 L440,22 L450,12 L460,28 L470,8 L480,32 L490,16 L500,24 L510,4 L520,36 L530,14 L540,26 L550,10 L560,30 L570,18 L580,22 L590,6 L600,34 L610,16 L620,24 L630,12 L640,28 L650,8 L660,32 L670,15 L680,25 L690,4 L700,36 L710,18 L720,22 L730,10 L740,30 L750,14 L760,26 L770,6 L780,34 L790,18 L800,20" fill="none" stroke="currentColor" stroke-width="1.5"></path>
</svg>
<span className="relative font-body-sm text-xs text-tertiary z-10 drop-shadow">CYBER_SYNTH_WAVE_BED_MASTER.WAV</span>
<span className="relative ml-auto font-mono text-[9px] text-tertiary z-10">-14 dB Auto-Ducked</span>
</div>
</div>
{/*  A3 Track Canvas: Sound Effects Foley  */}
<div className="h-10 border-b border-surface-container-high/40 relative flex items-center">
{/*  SFX Clip 1  */}
<div className="absolute left-64 w-36 h-8 rounded bg-surface-container border border-secondary/30 flex items-center px-1.5 cursor-pointer">
<span className="material-symbols-outlined text-[13px] text-secondary mr-1">graphic_eq</span>
<span className="font-body-sm text-[11px] text-on-surface truncate">SWOOSH_RISE.WAV</span>
</div>
{/*  SFX Clip 2  */}
<div className="absolute left-[40rem] w-48 h-8 rounded bg-surface-container border border-secondary/30 flex items-center px-1.5 cursor-pointer">
<span className="material-symbols-outlined text-[13px] text-secondary mr-1">graphic_eq</span>
<span className="font-body-sm text-[11px] text-on-surface truncate">SUB_IMPACT_BOOM.WAV</span>
</div>
</div>
{/*  Glowing Neon Cyan Vertical Playhead Spanning Across All Tracks  */}
<div className="absolute top-0 bottom-0 left-[45rem] w-0.5 bg-secondary pointer-events-none z-30 shadow-[0_0_12px_#4cd7f6] flex flex-col items-center">
{/*  Head Flag Arrow  */}
<div className="w-3.5 h-3.5 -mt-2 bg-secondary rotate-45 flex items-center justify-center shadow-lg"></div>
{/*  Vertical Line Guideline with magnetic pulse indicator  */}
<div className="w-full flex-1 bg-secondary"></div>
<div className="absolute top-1/2 -left-1.5 w-3.5 h-3.5 rounded-full bg-secondary/30 animate-ping"></div>
</div>
</div>
</div>
</div>
</section>
</div></main></div><footer className="fixed bottom-0 left-0 right-0 h-6 bg-surface-container-lowest z-50 flex items-center justify-between px-space-md text-on-surface-variant font-label-sm text-label-sm"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-xs"><span className="text-outline">DISK CACHE:</span><span className="text-on-surface">142 GB / 2 TB</span><div className="w-16 h-1.5 bg-surface-container rounded overflow-hidden"><div className="h-full bg-secondary w-1/4 rounded"></div></div></div><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs"><span className="text-outline">RAM:</span><span className="text-on-surface">18.4 GB / 64 GB</span></div><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs"><span className="text-outline">DROPPED FRAMES:</span><span className="text-secondary">0</span></div></div><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-xs"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span><span className="text-on-surface">PRORES 422 HQ PROXY ACTIVE</span></div><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs text-on-surface"><span className="material-symbols-outlined text-[13px] text-tertiary">cloud_done</span><span>Cloud Sync: Up to date</span></div></div></footer>
    </div>
  );
};

export default EditorIndustrialScreen;
