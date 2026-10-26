import React, { useState } from "react";
import logoImg from "../assets/apex_studio_logo.png";
import assetHub2 from "../assets/asset_hub_1.png";
import assetHub3 from "../assets/asset_hub_2.png";
import assetHub4 from "../assets/asset_hub_3.png";
import assetHub5 from "../assets/asset_hub_4.png";

export interface ProjectHubScreenProps {
  onNavigate?: (view: string) => void;
  onOpenProject?: (projectId: string) => void;
}

export const ProjectHubScreen: React.FC<ProjectHubScreenProps> = ({
  onNavigate,
  onOpenProject
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<"all" | "9:16" | "16:9" | "1:1" | "fav" | "archive">("all");
  const [sortBy, setSortBy] = useState("modified");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  // Active state schema inspection
  const [activeProject, setActiveProject] = useState({
    id: "proj_916_tokyo",
    name: "Tokyo_Night_Reel_2025",
    aspectRatio: "9:16",
    dimensions: { width: 1080, height: 1920 },
    fps: 60,
    syncMode: "auto_waveform",
    tracks: {
      video: 3,
      audio: 4,
      captions: 1
    },
    zoomLevel: 1.25,
    playheadTime: "00:00:14:08",
    duration: "00:00:45:12",
    colorSpace: "ACEScc / Rec.709",
    proxyStatus: "ACTIVE_PRORES_422_PROXY"
  });

  // New project modal form state
  const [newProjectName, setNewProjectName] = useState("Commercial_Spot_4K");
  const [newProjectAspect, setNewProjectAspect] = useState("9:16");
  const [newProjectFps, setNewProjectFps] = useState("60");

  const handleSelectProject = (id: string, name: string, aspect: string, fps: number) => {
    setActiveProject(prev => ({
      ...prev,
      id,
      name,
      aspectRatio: aspect,
      fps
    }));
    if (onOpenProject) {
      onOpenProject(id);
    }
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    handleSelectProject(`proj_${Date.now()}`, newProjectName, newProjectAspect, Number(newProjectFps));
    setIsModalOpen(false);
    if (onNavigate) {
      onNavigate("editor");
    }
  };

  return (
    <div className="bg-background font-body-md text-on-surface select-none min-h-screen">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest flex flex-col shadow-[0_1px_8px_rgba(0,0,0,0.4)]"><div className="h-8 px-space-md flex items-center justify-between bg-surface-container-lowest"><div className="flex items-center gap-space-md"><img alt="Apex Studio Pro Logo" className="h-4 w-auto object-contain" src={logoImg}/><span className="font-headline-md text-headline-md tracking-wider text-on-surface uppercase text-xs">Apex Studio Pro</span><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm"><span className="text-outline">Project:</span><span className="text-secondary font-medium">Cyberpunk_Short_v3.hve</span><span className="px-1.5 py-0.5 rounded bg-surface-container-high text-tertiary text-[10px]">4K DCI</span></div></div><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-sm px-space-md py-0.5 rounded bg-surface-container font-label-sm text-label-sm text-on-surface-variant"><span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span><span>RTX 4090 / CUDA</span><span className="text-outline">|</span><span className="text-on-surface">59.94 FPS</span></div><div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"><span className="material-symbols-outlined text-on-primary text-[14px]">person</span></div><div className="flex items-center"><button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">minimize</span></button><button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"><span className="material-symbols-outlined text-[14px]">check_box_outline_blank</span></button><button className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-error-container hover:text-on-error-container"><span className="material-symbols-outlined text-[14px]">close</span></button></div></div></div><div className="h-6 px-space-md flex items-center gap-space-md bg-surface-container-low font-body-sm text-body-sm text-on-surface-variant"><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">File</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Edit</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Clip</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Sequence</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">View</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Window</button><button className="hover:text-on-surface px-1 py-0.5 rounded hover:bg-surface-container-high">Help</button></div><div className="h-10 px-space-md flex items-center justify-between bg-surface-container border-b border-surface-container-highest"><nav className="flex items-center gap-space-xs h-full" data-active-classes="bg-surface text-primary border-t-2 border-primary-container font-semibold"><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="projects-hub" href="#">Projects (Hub)</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="edit-and-cut" href="#">Edit & Cut</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="color-grade" href="#">Color Grade</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="audio-and-fairlight" href="#">Audio & Fairlight</a><a className="h-full flex items-center px-space-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-body-sm text-body-sm transition-colors" data-path="export-and-render" href="#">Export & Render</a></nav><div className="flex items-center gap-space-sm"><div className="flex items-center bg-surface-container-lowest px-space-md py-1 rounded font-label-md text-label-md text-on-surface tracking-widest"><span className="text-outline">01:04:22:</span><span className="text-secondary">18</span></div><button className="flex items-center gap-1 px-space-md py-1 bg-primary-container hover:bg-inverse-primary text-on-primary-container font-body-sm text-body-sm rounded shadow transition-all"><span className="material-symbols-outlined text-[16px]">bolt</span><span>Fast Export</span></button></div></div></header><aside className="fixed left-0 top-24 bottom-6 w-14 bg-surface-container-lowest z-40 flex flex-col items-center py-space-md gap-space-sm"><button className="w-10 h-10 rounded flex items-center justify-center text-primary bg-surface-container hover:bg-surface-container-high transition-colors" title="Selection Tool (V)"><span className="material-symbols-outlined text-[20px]">near_me</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Razor Blade (B)"><span className="material-symbols-outlined text-[20px]">content_cut</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Ripple Edit (B)"><span className="material-symbols-outlined text-[20px]">sync_alt</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Hand / Pan (H)"><span className="material-symbols-outlined text-[20px]">pan_tool</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Keyframe & Pen (P)"><span className="material-symbols-outlined text-[20px]">edit</span></button><div className="w-8 h-px bg-outline-variant my-space-xs"></div><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Media Bins"><span className="material-symbols-outlined text-[20px]">folder_open</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Audio Track Meters"><span className="material-symbols-outlined text-[20px]">graphic_eq</span></button><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="Scopes & Vectors"><span className="material-symbols-outlined text-[20px]">ssid_chart</span></button><div className="mt-auto flex flex-col items-center gap-space-xs"><button className="w-10 h-10 rounded flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors" title="App Settings"><span className="material-symbols-outlined text-[20px]">settings</span></button></div></aside><div className="pl-14"><main className="w-full pt-24 pb-6 bg-surface min-h-screen"><div className="flex flex-col w-full">
{/*  Hub Layout Container with subtle atmospheric background glow  */}
<div className="relative w-full min-h-[calc(100vh-7rem)] bg-surface-container-lowest p-space-xl flex flex-col gap-space-lg overflow-x-hidden">
{/*  Ambient Gradient Blobs (clipped strictly within panel)  */}
<div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
<div className="absolute top-1/3 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
{/*  1. Native Desktop Header & Action Bar  */}
<header className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-low p-space-lg rounded-xl shadow-md">
<div className="flex flex-col gap-space-xs">
<div className="flex items-center gap-space-sm">
<span className="px-space-sm py-0.5 rounded bg-surface-container-highest text-secondary font-label-sm text-label-sm tracking-wider uppercase">Project Management</span>
<span className="text-outline font-label-sm text-label-sm">•</span>
<span className="text-on-surface font-headline-lg text-headline-lg tracking-tight">Apex Projects Hub</span>
</div>
<p className="text-on-surface-variant font-body-sm text-body-sm flex items-center gap-space-xs">
<span>Local & Cloud Projects</span>
<span className="text-outline">•</span>
<span className="text-secondary font-medium">NVMe Storage Cache Ready</span>
<span className="inline-block w-1.5 h-1.5 rounded-full bg-secondary"></span>
<span className="text-outline font-label-sm text-label-sm">High-Speed I/O Active</span>
</p>
</div>
{/*  Action Group  */}
<div className="flex items-center flex-wrap gap-space-sm">
{/*  Cloud Sync Pill  */}
<div className="flex items-center gap-space-sm px-space-md py-1.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface-variant shadow-sm">
<span className="material-symbols-outlined text-secondary text-[16px] animate-spin" style={{ "animationDuration": "6s" }}>sync</span>
<span className="text-on-surface">NVMe-Cache: 98% Synchronized</span>
</div>
{/*  Open File  */}
<button className="flex items-center gap-space-xs px-space-md py-1.5 rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-body-md text-body-md transition-all shadow-sm">
<span className="material-symbols-outlined text-[16px] text-outline">folder_open</span>
<span>Open File (.hve)</span>
</button>
{/*  New Project Primary Button with glowing ring animation  */}
<button className="relative group overflow-hidden flex items-center gap-space-xs px-space-xl py-1.5 rounded-lg bg-gradient-to-r from-primary-container via-inverse-primary to-secondary text-white font-body-md text-body-md font-semibold shadow-lg hover:shadow-primary-container/40 transition-all active:scale-[0.98]" id="openNewProjectModalBtn">
<span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
<span className="material-symbols-outlined text-[18px]">add_circle</span>
<span>+ New Project</span>
</button>
</div>
</header>
{/*  Filters, Search & View Controls Bar  */}
<div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-space-md bg-surface-container-low px-space-lg py-space-md rounded-xl">
{/*  Search Input with Keyboard Shortcut Indicator  */}
<div className="relative flex-1 max-w-md flex items-center">
<span className="material-symbols-outlined absolute left-3 text-outline text-[18px]">search</span>
<input className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm pl-10 pr-16 py-1.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-secondary placeholder:text-outline/70 transition-all" id="projectSearchInput" placeholder="Search projects, scenes, sequence tags..." type="text"/>
<div className="absolute right-2.5 flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-surface-container-high text-outline font-label-sm text-label-sm">
<span>Ctrl</span><span>+</span><span>F</span>
</div>
</div>
{/*  Filter Pills  */}
<div className="flex items-center gap-space-xs overflow-x-auto pb-1 lg:pb-0" id="filterPillGroup">
<button className="filter-pill px-space-md py-1 rounded bg-primary-container text-on-primary-container font-label-sm text-label-sm font-medium shadow-sm transition-all" data-filter="all">All Projects (12)</button>
<button className="filter-pill px-space-md py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-all" data-filter="9:16">9:16 Vertical</button>
<button className="filter-pill px-space-md py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-all" data-filter="16:9">16:9 Cinema</button>
<button className="filter-pill px-space-md py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-all" data-filter="1:1">1:1 Square</button>
<button className="filter-pill px-space-md py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-all flex items-center gap-1" data-filter="fav">
<span className="material-symbols-outlined text-[13px] text-tertiary">star</span>Favorites
        </button>
<button className="filter-pill px-space-md py-1 rounded bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high font-label-sm text-label-sm transition-all" data-filter="archive">Archive</button>
</div>
{/*  Sorting & View Modes  */}
<div className="flex items-center gap-space-sm justify-between lg:justify-end">
<div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-1 rounded-lg">
<span className="text-outline font-label-sm text-label-sm">Sort:</span>
<select className="bg-transparent text-secondary font-label-sm text-label-sm focus:outline-none cursor-pointer" id="sortSelector">
<option className="bg-surface-container-high text-on-surface" value="modified">Last Modified</option>
<option className="bg-surface-container-high text-on-surface" value="created">Date Created</option>
<option className="bg-surface-container-high text-on-surface" value="duration">Duration Length</option>
<option className="bg-surface-container-high text-on-surface" value="name">Project Title A-Z</option>
</select>
</div>
<div className="flex items-center bg-surface-container-lowest p-0.5 rounded-lg">
<button className="p-1 rounded bg-surface-container-high text-primary"><span className="material-symbols-outlined text-[16px]">grid_view</span></button>
<button className="p-1 rounded text-outline hover:text-on-surface"><span className="material-symbols-outlined text-[16px]">view_list</span></button>
</div>
</div>
</div>
{/*  3. Recent Projects Grid  */}
<section className="flex flex-col gap-space-md">
<div className="flex items-center justify-between">
<div className="flex items-center gap-space-sm">
<span className="material-symbols-outlined text-secondary text-[18px]">movie_filter</span>
<h2 className="font-headline-md text-headline-md text-on-surface tracking-wide">Recent Active Sequences</h2>
<span className="px-space-xs py-0.5 rounded bg-surface-container text-outline font-label-sm text-label-sm">5 Workspaces</span>
</div>
<span className="font-label-sm text-label-sm text-outline">Real-time NVMe disk indexing enabled</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-space-md" id="projectsGrid">
{/*  Card 1: Tokyo_Night_Reel_2025 (9:16 Vertical)  */}
<article className="project-card group relative flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1" >
{/*  Thumbnail Container with 9:16 framing illusion  */}
<div className="relative w-full h-44 bg-surface-container-lowest flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="Cinematic cyberpunk neon rain soaked Tokyo street at dusk with glowing purple and cyan holographic billboards, reflective asphalt, dynamic camera angle, high budget movie still" src={assetHub2}/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
{/*  Aspect Ratio Badge  */}
<div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-secondary font-label-sm text-label-sm shadow">
<span className="material-symbols-outlined text-[12px]">stay_current_portrait</span>
<span>9:16</span>
</div>
{/*  Waveform Activity Sparkline Pill  */}
<div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1.5 shadow">
<span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></span>
<span className="text-tertiary font-label-sm text-label-sm">60 FPS</span>
</div>
{/*  Audio Waveform Visual Overlay on lower thumbnail  */}
<div className="absolute bottom-2 left-3 right-3 flex items-end gap-0.5 h-5 pointer-events-none opacity-70">
<div className="w-1 bg-secondary h-2 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-4 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-3 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-5 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-2 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-4 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-3 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-1 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-5 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-3 rounded-t-sm"></div>
<div className="w-1 bg-secondary h-2 rounded-t-sm"></div>
</div>
</div>
{/*  Metadata Body  */}
<div className="p-space-md flex flex-col gap-space-xs flex-1">
<div className="flex items-start justify-between gap-space-xs">
<h3 className="font-headline-md text-headline-md text-on-surface truncate group-hover:text-secondary transition-colors" title="Tokyo_Night_Reel_2025">Tokyo_Night_Reel_2025</h3>
<button className="text-outline hover:text-on-surface p-0.5 rounded hover:bg-surface-container-highest transition-colors" >
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
{/*  Timecode & Clips  */}
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-0.5">
<span className="bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface font-label-sm">00:00:45:12</span>
<span className="text-outline">18 video clips</span>
</div>
<div className="flex items-center justify-between text-outline font-body-sm text-body-sm pt-space-xs mt-auto">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-secondary">cloud_done</span>
<span className="text-secondary font-label-sm text-label-sm">Sync Active</span>
</div>
<span className="font-label-sm text-label-sm">24 mins ago</span>
</div>
</div>
</article>
{/*  Card 2: Cyberpunk_Car_Chase_4K (16:9 Cinema)  */}
<article className="project-card group relative flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1" >
<div className="relative w-full h-44 bg-surface-container-lowest flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="High speed cinematic vehicle pursuit at midnight through neon-lit sci-fi megacity tunnels with sparks and motion blur, 4K anamorphic lens flares in deep blue and indigo" src={assetHub3}/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
<div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm shadow">
<span className="material-symbols-outlined text-[12px]">desktop_windows</span>
<span>16:9 DCI</span>
</div>
<div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1.5 shadow">
<span className="text-tertiary font-label-sm text-label-sm">24 FPS</span>
</div>
{/*  Mini timeline markers  */}
<div className="absolute bottom-2 left-3 right-3 flex items-center gap-1 h-2 pointer-events-none opacity-80">
<div className="h-1.5 bg-primary rounded w-1/4"></div>
<div className="h-1.5 bg-secondary rounded w-1/3"></div>
<div className="h-1.5 bg-tertiary rounded flex-1"></div>
</div>
</div>
<div className="p-space-md flex flex-col gap-space-xs flex-1">
<div className="flex items-start justify-between gap-space-xs">
<h3 className="font-headline-md text-headline-md text-on-surface truncate group-hover:text-primary transition-colors" title="Cyberpunk_Car_Chase_4K">Cyberpunk_Car_Chase_4K</h3>
<button className="text-outline hover:text-on-surface p-0.5 rounded hover:bg-surface-container-highest transition-colors" >
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-0.5">
<span className="bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface font-label-sm">00:02:14:08</span>
<span className="text-outline">42 video clips</span>
</div>
<div className="flex items-center justify-between text-outline font-body-sm text-body-sm pt-space-xs mt-auto">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-outline">storage</span>
<span className="font-label-sm text-label-sm">Local NVMe</span>
</div>
<span className="font-label-sm text-label-sm">Yesterday</span>
</div>
</div>
</article>
{/*  Card 3: Product_Launch_Square (1:1 Square)  */}
<article className="project-card group relative flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1" >
<div className="relative w-full h-44 bg-surface-container-lowest flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="Minimalist luxury tech hardware device studio shot against dark moody obsidian background with cyan rim edge lighting and floating titanium particles, sleek industrial design" src={assetHub4}/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
<div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-tertiary font-label-sm text-label-sm shadow">
<span className="material-symbols-outlined text-[12px]">crop_square</span>
<span>1:1 Square</span>
</div>
<div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1.5 shadow">
<span className="text-tertiary font-label-sm text-label-sm">30 FPS</span>
</div>
</div>
<div className="p-space-md flex flex-col gap-space-xs flex-1">
<div className="flex items-start justify-between gap-space-xs">
<h3 className="font-headline-md text-headline-md text-on-surface truncate group-hover:text-tertiary transition-colors" title="Product_Launch_Square">Product_Launch_Square</h3>
<button className="text-outline hover:text-on-surface p-0.5 rounded hover:bg-surface-container-highest transition-colors" >
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-0.5">
<span className="bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface font-label-sm">00:00:30:00</span>
<span className="text-outline">9 video clips</span>
</div>
<div className="flex items-center justify-between text-outline font-body-sm text-body-sm pt-space-xs mt-auto">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-secondary">cloud_done</span>
<span className="text-secondary font-label-sm text-label-sm">Cloud Ready</span>
</div>
<span className="font-label-sm text-label-sm">3 days ago</span>
</div>
</div>
</article>
{/*  Card 4: Synthwave_Music_Video (16:9 Cinema)  */}
<article className="project-card group relative flex flex-col bg-surface-container-low hover:bg-surface-container rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1" >
<div className="relative w-full h-44 bg-surface-container-lowest flex items-center justify-center overflow-hidden">
<img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100" alt="Retro 80s futuristic neon wireframe landscape with vivid magenta sunset, chrome grids, synthwave aesthetics and electronic music visualizer spectrum" src={assetHub5}/>
<div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
<div className="absolute top-2.5 left-2.5 flex items-center gap-1 px-1.5 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm shadow">
<span className="material-symbols-outlined text-[12px]">desktop_windows</span>
<span>16:9 Cinema</span>
</div>
<div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-surface-container-lowest/90 backdrop-blur-md flex items-center gap-1.5 shadow">
<span className="text-tertiary font-label-sm text-label-sm">60 FPS</span>
</div>
</div>
<div className="p-space-md flex flex-col gap-space-xs flex-1">
<div className="flex items-start justify-between gap-space-xs">
<h3 className="font-headline-md text-headline-md text-on-surface truncate group-hover:text-primary transition-colors" title="Synthwave_Music_Video">Synthwave_Music_Video</h3>
<button className="text-outline hover:text-on-surface p-0.5 rounded hover:bg-surface-container-highest transition-colors" >
<span className="material-symbols-outlined text-[16px]">more_vert</span>
</button>
</div>
<div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-0.5">
<span className="bg-surface-container-lowest px-1.5 py-0.5 rounded text-on-surface font-label-sm">00:03:45:22</span>
<span className="text-outline">64 video clips</span>
</div>
<div className="flex items-center justify-between text-outline font-body-sm text-body-sm pt-space-xs mt-auto">
<div className="flex items-center gap-1">
<span className="material-symbols-outlined text-[13px] text-tertiary">star</span>
<span className="text-on-surface-variant font-label-sm text-label-sm">Master Mix</span>
</div>
<span className="font-label-sm text-label-sm">May 12</span>
</div>
</div>
</article>
{/*  Card 5: Empty / New Project Template Card  */}
<article className="group relative flex flex-col items-center justify-center min-h-[220px] bg-surface-container-lowest hover:bg-surface-container-low rounded-xl p-space-lg text-center cursor-pointer transition-all shadow-sm hover:shadow-lg" id="newProjectCardTrigger">
<div className="w-14 h-14 rounded-full bg-surface-container group-hover:bg-primary-container text-outline group-hover:text-on-primary-container flex items-center justify-center transition-all mb-space-sm group-hover:scale-110">
<span className="material-symbols-outlined text-[28px]">add</span>
</div>
<span className="font-headline-md text-headline-md text-on-surface group-hover:text-secondary transition-colors">New Workspace</span>
<p className="font-body-sm text-body-sm text-outline mt-1 max-w-[180px]">Create Template or Import XML / FCPXML / AAF</p>
<div className="mt-space-md flex items-center gap-1 text-secondary font-label-sm text-label-sm">
<span>Preset Library</span>
<span className="material-symbols-outlined text-[14px]">arrow_forward</span>
</div>
</article>
</div>
</section>
{/*  Project Metrics & Storage Breakdown Panel  */}
<section className="grid grid-cols-1 md:grid-cols-3 gap-space-md mt-space-sm">
<div className="bg-surface-container-low p-space-md rounded-xl flex items-center gap-space-md shadow-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
<span className="material-symbols-outlined">hard_drive</span>
</div>
<div className="flex flex-col flex-1 min-w-0">
<div className="flex justify-between items-center text-label-sm font-label-sm">
<span className="text-outline">NVMe Ultra Scratch</span>
<span className="text-on-surface">1.82 TB Free / 4 TB</span>
</div>
<div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-1.5 overflow-hidden">
<div className="bg-secondary h-full rounded-full" style={{ "width": "54%" }}></div>
</div>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl flex items-center gap-space-md shadow-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary">
<span className="material-symbols-outlined">memory</span>
</div>
<div className="flex flex-col flex-1 min-w-0">
<div className="flex justify-between items-center text-label-sm font-label-sm">
<span className="text-outline">GPU VRAM Reservoir</span>
<span className="text-on-surface">19.2 GB / 24 GB GDDR6X</span>
</div>
<div className="w-full bg-surface-container-highest h-1.5 rounded-full mt-1.5 overflow-hidden">
<div className="bg-primary-container h-full rounded-full" style={{ "width": "80%" }}></div>
</div>
</div>
</div>
<div className="bg-surface-container-low p-space-md rounded-xl flex items-center gap-space-md shadow-sm">
<div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
<span className="material-symbols-outlined">cloud_sync</span>
</div>
<div className="flex flex-col flex-1 min-w-0">
<div className="flex justify-between items-center text-label-sm font-label-sm">
<span className="text-outline">Apex Cloud Sync Node</span>
<span className="text-secondary">Connected: 10 Gbps</span>
</div>
<div className="flex items-center gap-2 mt-1">
<span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
<span className="text-outline font-label-sm text-label-sm truncate">Zero lock contention detected</span>
</div>
</div>
</div>
</section>
{/*  4. Global State Architecture Preview Widget (Zustand Schema Inspector Drawer)  */}
<div className="relative z-20 flex flex-col bg-surface-container-low rounded-xl shadow-xl overflow-hidden transition-all duration-300" id="stateInspectorWidget">
{/*  Drawer Header Bar  */}
<div className="flex items-center justify-between px-space-lg py-2.5 bg-surface-container cursor-pointer select-none" >
<div className="flex items-center gap-space-sm">
<span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-sm shadow-secondary/50"></span>
<span className="font-label-md text-label-md text-on-surface font-semibold tracking-wide">Zustand Global State Schema</span>
<span className="px-space-xs py-0.5 rounded bg-surface-container-highest text-outline font-label-sm text-label-sm">useEditorStore.getState().activeProject</span>
</div>
<div className="flex items-center gap-space-md">
{/*  Switch to VIEW_EDITOR CTA  */}
<button className="flex items-center gap-1.5 px-space-md py-1 rounded bg-secondary-container hover:bg-secondary text-on-secondary font-label-sm text-label-sm font-semibold transition-all shadow-sm" >
<span className="material-symbols-outlined text-[15px]">play_circle</span>
<span>Switch to VIEW_EDITOR (Workspace)</span>
</button>
<button className="text-outline hover:text-on-surface" id="inspectorToggleIconBtn">
<span className="material-symbols-outlined text-[18px]">keyboard_arrow_down</span>
</button>
</div>
</div>
{/*  Drawer Content: Live reactive JSON schema + quick parameters  */}
<div className="p-space-lg flex flex-col lg:flex-row gap-space-lg bg-surface-container-lowest" id="inspectorContent">
{/*  Live Code Block View  */}
<div className="flex-1 bg-surface-container-low p-space-md rounded-lg overflow-x-auto">
<div className="flex items-center justify-between pb-2 text-outline font-label-sm text-label-sm">
<span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">data_object</span>reactive_state.json</span>
<span className="text-secondary font-label-sm text-label-sm">READ / WRITE BINDING</span>
</div>
<pre className="font-label-sm text-label-sm text-primary leading-relaxed whitespace-pre font-mono" id="jsonStateDisplay">{
  "id": "proj_916_tokyo",
  "name": "Tokyo_Night_Reel_2025",
  "aspectRatio": "9:16",
  "dimensions": { "width": 1080, "height": 1920 },
  "fps": 60,
  "syncMode": "auto_waveform",
  "tracks": {
    "video": 3,
    "audio": 4,
    "captions": 1
  },
  "zoomLevel": 1.25,
  "playheadTime": "00:00:14:08",
  "duration": "00:00:45:12",
  "colorSpace": "ACEScc / Rec.709",
  "proxyStatus": "ACTIVE_PRORES_422_PROXY"
}</pre>
</div>
{/*  Direct Live Tweaker for state verification  */}
<div className="w-full lg:w-80 flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-lg">
<span className="text-on-surface font-label-md text-label-md font-semibold">Live Sandbox Param Tweak</span>
<p className="text-outline font-body-sm text-body-sm">Mutate selected Zustand state on the fly before bootstrapping workspace.</p>
<div className="flex flex-col gap-1 mt-1">
<label className="text-outline font-label-sm text-label-sm">Active Sequence Title</label>
<input className="w-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-secondary" id="tweakNameInput"  type="text" value="Tokyo_Night_Reel_2025"/>
</div>
<div className="grid grid-cols-2 gap-space-sm mt-1">
<div>
<label className="text-outline font-label-sm text-label-sm">FPS</label>
<select className="w-full bg-surface-container-highest text-on-surface font-label-sm text-label-sm px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-secondary" id="tweakFpsSelect" >
<option value="24">24 FPS</option>
<option value="30">30 FPS</option>
<option selected="" value="60">60 FPS</option>
</select>
</div>
<div>
<label className="text-outline font-label-sm text-label-sm">Timeline Zoom</label>
<input className="w-full mt-2 accent-secondary cursor-pointer" max="3" min="0.5"  step="0.25" type="range" value="1.25"/>
</div>
</div>
<div className="mt-space-sm pt-space-xs flex items-center justify-between text-outline font-label-sm text-label-sm">
<span>Playhead: <span className="text-secondary font-mono">00:00:14:08</span></span>
<button className="text-outline hover:text-on-surface underline" >Reset Defaults</button>
</div>
</div>
</div>
</div>
</div>
{/*  2. Modal Overlay: "New Project Setup Modal" (Controlled via modalBackdrop & JS)  */}
<div className="fixed inset-0 z-50 flex items-center justify-center p-space-md bg-surface-container-lowest/80 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-200" id="newProjectModal">
{/*  Modal Dialog Surface  */}
<div className="relative w-full max-w-2xl bg-surface-container rounded-2xl shadow-2xl overflow-hidden flex flex-col transform scale-95 transition-all duration-200" id="modalDialogBox">
{/*  Modal Top Title Strip  */}
<div className="flex items-center justify-between px-space-xl py-space-md bg-surface-container-high">
<div className="flex items-center gap-space-sm">
<div className="w-7 h-7 rounded-lg bg-primary-container flex items-center justify-center text-on-primary-container">
<span className="material-symbols-outlined text-[18px]">movie_edit</span>
</div>
<div>
<h3 className="font-headline-md text-headline-md text-on-surface font-semibold">New Project Sequence Setup</h3>
<p className="text-outline font-body-sm text-body-sm">Configure timeline format, aspect ratio, audio engine & color grading target</p>
</div>
</div>
<button className="w-8 h-8 rounded-lg flex items-center justify-center text-outline hover:text-on-surface hover:bg-surface-container-highest transition-colors" id="closeModalBtn">
<span className="material-symbols-outlined text-[20px]">close</span>
</button>
</div>
{/*  Modal Body  */}
<form className="p-space-xl flex flex-col gap-space-lg max-h-[819px] overflow-y-auto" id="newProjectForm" onsubmit="event.preventDefault(); submitCreateProject();">
{/*  Project Title Input  */}
<div className="flex flex-col gap-space-xs">
<label className="text-on-surface font-body-sm text-body-sm font-semibold flex items-center justify-between" htmlFor="projectTitleInput">
<span>Project Sequence Title</span>
<span className="text-outline font-label-sm text-label-sm">Required (.hve project root)</span>
</label>
<div className="relative flex items-center">
<span className="material-symbols-outlined absolute left-3 text-secondary text-[18px]">terminal</span>
<input className="w-full bg-surface-container-lowest text-on-surface font-label-md text-label-md pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary" id="projectTitleInput" required="" type="text" value="Neon_Drift_Cinematic_v1"/>
</div>
</div>
{/*  Aspect Ratio Selector Grid  */}
<div className="flex flex-col gap-space-xs">
<div className="flex items-center justify-between">
<span className="text-on-surface font-body-sm text-body-sm font-semibold">Aspect Ratio & Target Canvas</span>
<span className="text-outline font-label-sm text-label-sm">Dynamic canvas auto-scaling</span>
</div>
<div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm" id="aspectRatioGroup">
{/*  9:16 (Selected by default)  */}
<label className="aspect-card cursor-pointer relative flex flex-col p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-highest transition-all shadow-sm">
<input checked="" className="sr-only" name="aspectRatio"  type="radio" value="9:16"/>
<div className="aspect-indicator absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-secondary flex items-center justify-center text-on-secondary text-[10px]">
<span className="material-symbols-outlined text-[12px]">check</span>
</div>
<div className="w-full h-16 flex items-center justify-center mb-space-xs">
{/*  9:16 Visual Icon Container  */}
<div className="w-7 h-12 rounded bg-surface-container-highest flex items-center justify-center">
<span className="material-symbols-outlined text-secondary text-[18px]">stay_current_portrait</span>
</div>
</div>
<span className="font-label-md text-label-md font-semibold text-on-surface text-center">9:16 Vertical</span>
<span className="font-label-sm text-label-sm text-outline text-center mt-0.5">Shorts / Reels / TikTok</span>
<span className="font-label-sm text-label-sm text-secondary text-center mt-1 font-mono">1080 × 1920</span>
</label>
{/*  16:9 Landscape  */}
<label className="aspect-card cursor-pointer relative flex flex-col p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-highest transition-all shadow-sm">
<input className="sr-only" name="aspectRatio"  type="radio" value="16:9"/>
<div className="aspect-indicator absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-outline text-[10px] opacity-0">
<span className="material-symbols-outlined text-[12px]">check</span>
</div>
<div className="w-full h-16 flex items-center justify-center mb-space-xs">
{/*  16:9 Visual Icon Container  */}
<div className="w-14 h-8 rounded bg-surface-container-highest flex items-center justify-center">
<span className="material-symbols-outlined text-outline text-[18px]">desktop_windows</span>
</div>
</div>
<span className="font-label-md text-label-md font-semibold text-on-surface text-center">16:9 Cinema</span>
<span className="font-label-sm text-label-sm text-outline text-center mt-0.5">YouTube / Feature 4K</span>
<span className="font-label-sm text-label-sm text-outline text-center mt-1 font-mono">3840 × 2160 UHD</span>
</label>
{/*  1:1 Square Feed  */}
<label className="aspect-card cursor-pointer relative flex flex-col p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-highest transition-all shadow-sm">
<input className="sr-only" name="aspectRatio"  type="radio" value="1:1"/>
<div className="aspect-indicator absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-surface-container-highest flex items-center justify-center text-outline text-[10px] opacity-0">
<span className="material-symbols-outlined text-[12px]">check</span>
</div>
<div className="w-full h-16 flex items-center justify-center mb-space-xs">
{/*  1:1 Visual Icon Container  */}
<div className="w-10 h-10 rounded bg-surface-container-highest flex items-center justify-center">
<span className="material-symbols-outlined text-outline text-[18px]">crop_square</span>
</div>
</div>
<span className="font-label-md text-label-md font-semibold text-on-surface text-center">1:1 Square</span>
<span className="font-label-sm text-label-sm text-outline text-center mt-0.5">Feed / Carousels</span>
<span className="font-label-sm text-label-sm text-outline text-center mt-1 font-mono">1080 × 1080</span>
</label>
</div>
</div>
{/*  Frame Rate Selector  */}
<div className="flex flex-col gap-space-xs">
<label className="text-on-surface font-body-sm text-body-sm font-semibold">Frame Rate (FPS)</label>
<div className="grid grid-cols-3 gap-space-sm" id="fpsRadioGroup">
<label className="cursor-pointer flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-highest transition-all">
<input className="sr-only" name="projectFps"  type="radio" value="24"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">24 fps</span>
<span className="font-label-sm text-label-sm text-outline">Cinematic Cadence</span>
</div>
<span className="material-symbols-outlined text-outline text-[16px] fps-check opacity-0">check_circle</span>
</label>
<label className="cursor-pointer flex items-center justify-between p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-highest transition-all">
<input className="sr-only" name="projectFps"  type="radio" value="30"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">30 fps</span>
<span className="font-label-sm text-label-sm text-outline">Standard Broadcast</span>
</div>
<span className="material-symbols-outlined text-outline text-[16px] fps-check opacity-0">check_circle</span>
</label>
{/*  60 fps (Selected)  */}
<label className="cursor-pointer flex items-center justify-between p-space-md rounded-xl bg-surface-container-highest shadow-sm">
<input checked="" className="sr-only" name="projectFps"  type="radio" value="60"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-secondary">60 fps</span>
<span className="font-label-sm text-label-sm text-outline">High Motion / Gaming</span>
</div>
<span className="material-symbols-outlined text-secondary text-[16px] fps-check">check_circle</span>
</label>
</div>
</div>
{/*  Audio Sync Mode Selector  */}
<div className="flex flex-col gap-space-xs">
<label className="text-on-surface font-body-sm text-body-sm font-semibold">Audio Sync Engine</label>
<div className="grid grid-cols-1 md:grid-cols-2 gap-space-sm">
<label className="cursor-pointer flex items-start gap-space-sm p-space-md rounded-xl bg-surface-container-highest shadow-sm">
<input checked="" className="mt-1 accent-secondary" name="audioSync" type="radio" value="auto"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Auto-Sync via Waveform</span>
<span className="font-body-sm text-body-sm text-outline">Analyzes audio peaks across multi-cam scratch tracks automatically.</span>
</div>
</label>
<label className="cursor-pointer flex items-start gap-space-sm p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container-highest transition-all">
<input className="mt-1 accent-secondary" name="audioSync" type="radio" value="manual"/>
<div className="flex flex-col">
<span className="font-label-md text-label-md font-semibold text-on-surface">Manual In/Out Marker Sync</span>
<span className="font-body-sm text-body-sm text-outline">Aligns multi-angle cuts strictly to manual clap / slate keyframes.</span>
</div>
</label>
</div>
</div>
{/*  Modal Action Footer  */}
<div className="flex items-center justify-end gap-space-md pt-space-md mt-space-xs bg-surface-container">
<button className="px-space-lg py-2 rounded-xl bg-surface-container-highest hover:bg-surface-bright text-on-surface font-body-md text-body-md transition-all" id="cancelModalBtn" type="button">
            Cancel
          </button>
<button className="flex items-center gap-space-xs px-space-xl py-2 rounded-xl bg-primary-container hover:bg-inverse-primary text-on-primary-container font-body-md text-body-md font-semibold shadow-lg hover:shadow-primary-container/40 transition-all" type="submit">
<span className="material-symbols-outlined text-[18px]">rocket_launch</span>
<span>Create & Open in Editor</span>
</button>
</div>
</form>
</div>
</div>
{/*  Client-side Interactive State Machine Script  */}

</div></main></div><footer className="fixed bottom-0 left-0 right-0 h-6 bg-surface-container-lowest z-50 flex items-center justify-between px-space-md text-on-surface-variant font-label-sm text-label-sm"><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-xs"><span className="text-outline">DISK CACHE:</span><span className="text-on-surface">142 GB / 2 TB</span><div className="w-16 h-1.5 bg-surface-container rounded overflow-hidden"><div className="h-full bg-secondary w-1/4 rounded"></div></div></div><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs"><span className="text-outline">RAM:</span><span className="text-on-surface">18.4 GB / 64 GB</span></div><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs"><span className="text-outline">DROPPED FRAMES:</span><span className="text-secondary">0</span></div></div><div className="flex items-center gap-space-lg"><div className="flex items-center gap-space-xs"><span className="w-1.5 h-1.5 rounded-full bg-secondary"></span><span className="text-on-surface">PRORES 422 HQ PROXY ACTIVE</span></div><div className="h-3 w-px bg-outline-variant"></div><div className="flex items-center gap-space-xs text-on-surface"><span className="material-symbols-outlined text-[13px] text-tertiary">cloud_done</span><span>Cloud Sync: Up to date</span></div></div></footer>
    </div>
  );
};

export default ProjectHubScreen;
