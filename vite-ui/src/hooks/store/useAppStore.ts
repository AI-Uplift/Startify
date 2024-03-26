import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface IAppStore {
	selectedProject: string | null;
	setSelectedProject: (project: string | null) => void;
	selectedModel: string[] | null;
	setSelectedModel: (model: string[] | null) => void;
	agentState: Record<string, any> | null;
	setAgentState: (state: Record<string, any> | null) => void;
	messages: any[];
	setMessages: (messages: any[]) => void;
}

export const useAppStore = create(
	persist<IAppStore>(
		(set) => ({
			selectedProject: null,
			setSelectedProject: (project) => set({ selectedProject: project }),
			selectedModel: null,
			setSelectedModel: (model) => set({ selectedModel: model }),
			agentState: null,
			setAgentState: (state) => set({ agentState: state }),
			messages: [],
			setMessages: (messages) => set({ messages }),
		}),
		{ name: "app-store", storage: createJSONStorage(() => localStorage) }
	)
);
