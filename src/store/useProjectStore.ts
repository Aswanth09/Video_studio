import { create } from "zustand";

export type AspectRatio = "16:9" | "9:16" | "1:1";
export type ActiveView = "HUB" | "EDITOR";

export interface ProjectState {
  projectId: string;
  projectName: string;
  aspectRatio: AspectRatio;
  baseFps: number;
  activeView: ActiveView;
  isExportModalOpen: boolean;

  setProject: (data: Partial<Pick<ProjectState, "projectId" | "projectName" | "aspectRatio" | "baseFps">>) => void;
  setActiveView: (view: ActiveView) => void;
  setAspectRatio: (ratio: AspectRatio) => void;
  setExportModalOpen: (open: boolean) => void;
}

export const useProjectStore = create<ProjectState>((set) => ({
  projectId: "proj_916_tokyo",
  projectName: "Tokyo_Night_Reel_2025",
  aspectRatio: "9:16",
  baseFps: 30,
  activeView: "HUB",
  isExportModalOpen: false,

  setProject: (data) =>
    set((state) => ({
      ...state,
      ...data,
    })),

  setActiveView: (view) => set({ activeView: view }),

  setAspectRatio: (aspectRatio) => set({ aspectRatio }),

  setExportModalOpen: (isExportModalOpen) => set({ isExportModalOpen }),
}));

