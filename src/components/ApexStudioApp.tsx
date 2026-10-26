import React, { useState } from "react";
import ProjectHubScreen from "./ProjectHubScreen";
import Editor3PanelScreen from "./Editor3PanelScreen";
import EditorIndustrialScreen from "./EditorIndustrialScreen";
import TimelineMultiTrackScreen from "./TimelineMultiTrackScreen";
import InspectorContextualScreen from "./InspectorContextualScreen";
import DeliverExportScreen from "./DeliverExportScreen";

export type ScreenView =
  | "hub"
  | "editor-3panel"
  | "editor-industrial"
  | "timeline"
  | "inspector"
  | "export";

export const ApexStudioApp: React.FC = () => {
  const [currentView, setCurrentView] = useState<ScreenView>("hub");
  const [currentProject, setCurrentProject] = useState<string>("Cyberpunk_Short_v3.hve");

  const screens = [
    { id: "hub", label: "Project Hub (VIEW_HUB)", icon: "grid_view" },
    { id: "editor-3panel", label: "3-Panel Editor (VIEW_EDITOR)", icon: "splitscreen" },
    { id: "editor-industrial", label: "Industrial Workstation", icon: "desktop_windows" },
    { id: "timeline", label: "Multi-Track Timeline", icon: "view_timeline" },
    { id: "inspector", label: "Contextual Inspector", icon: "tune" },
    { id: "export", label: "Deliver & Export Engine", icon: "file_download" },
  ] as const;

  const handleNavigate = (view: string) => {
    if (view === "hub" || view === "projects-hub") setCurrentView("hub");
    else if (view === "editor" || view === "edit-and-cut") setCurrentView("timeline");
    else if (view === "3panel") setCurrentView("editor-3panel");
    else if (view === "industrial") setCurrentView("editor-industrial");
    else if (view === "inspector") setCurrentView("inspector");
    else if (view === "export" || view === "export-and-render") setCurrentView("export");
  };

  return (
    <div className="relative min-h-screen bg-background text-on-surface">
      {/* Global Quick Screen Switcher Pill Bar for Dev / Review */}
      <aside className="fixed bottom-3 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-1 bg-surface-container-highest/95 backdrop-blur-md p-1.5 rounded-full border border-outline-variant shadow-2xl">
        <span className="text-[11px] font-semibold text-secondary uppercase tracking-wider px-2">
          Apex Views:
        </span>
        {screens.map((screen) => {
          const isActive = currentView === screen.id;
          return (
            <button
              key={screen.id}
              onClick={() => setCurrentView(screen.id as ScreenView)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isActive
                  ? "bg-primary text-on-primary shadow-md font-semibold scale-105"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">
                {screen.icon}
              </span>
              <span>{screen.label}</span>
            </button>
          );
        })}
      </aside>

      {/* Render Active Screen */}
      <main className="w-full min-h-screen">
        {currentView === "hub" && (
          <ProjectHubScreen
            onNavigate={handleNavigate}
            onOpenProject={(proj) => {
              setCurrentProject(proj);
              setCurrentView("timeline");
            }}
          />
        )}
        {currentView === "editor-3panel" && (
          <Editor3PanelScreen
            onNavigate={handleNavigate}
            projectName={currentProject}
          />
        )}
        {currentView === "editor-industrial" && (
          <EditorIndustrialScreen
            onNavigate={handleNavigate}
            projectName={currentProject}
          />
        )}
        {currentView === "timeline" && (
          <TimelineMultiTrackScreen
            onNavigate={handleNavigate}
            projectName={currentProject}
          />
        )}
        {currentView === "inspector" && (
          <InspectorContextualScreen
            onNavigate={handleNavigate}
          />
        )}
        {currentView === "export" && (
          <DeliverExportScreen
            onNavigate={handleNavigate}
            projectName={currentProject}
          />
        )}
      </main>
    </div>
  );
};

export default ApexStudioApp;

