import { API_BASE_URL } from "@/env";
import { useAppStore } from "./store/useAppStore";

const useAppMessages = () => {
	const { selectedModel, selectedProject } = useAppStore();

	const getMessages = async () => {
		const response = await fetch(`${API_BASE_URL}/api/get-messages`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ project_name: selectedProject }),
		});

		if (response.ok) {
			const data = await response.json();
			return data?.messages as any[];
		}

		return [];
	};

	const sendMessage = async (message: string) => {
		const response = await fetch(`${API_BASE_URL}/api/send-message`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: message,
				project_name: selectedProject,
				base_model: selectedModel?.[1],
			}),
		});

		console.log(response);

		if (response.ok) {
			return true;
		}

		return false;
	};

	const executeAgent = async (inputValue: string) => {
		const response = await fetch(`${API_BASE_URL}/api/execute-agent`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				prompt: inputValue,
				base_model: selectedModel?.[1],
				project_name: selectedProject,
			}),
		});

		if (response.ok) {
			return true;
		}

		return false;
	};

	const getAgentState = async () => {
		const response = await fetch(`${API_BASE_URL}/api/get-agent-state`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ project_name: selectedProject }),
		});

		if (response.ok) {
			const data = await response.json();
			return data?.state;
		}

		return null;
	};

	return { getMessages, sendMessage, executeAgent, getAgentState };
};

export default useAppMessages;
