import { ChangeEvent, useState } from "react";
import { Textarea } from "../ui/textarea";
import useAppMessages from "@/hooks/useAppMessages";
import { useAppStore } from "@/hooks/store/useAppStore";
import toast from "react-hot-toast";
import { API_BASE_URL } from "@/env";

const MessageInput = () => {
	const [messageInput, setMessageInput] = useState<string>("");
	const { selectedProject, agentState, messages, selectedModel } = useAppStore();
	const { sendMessage, executeAgent } = useAppMessages();

	async function handleSendMessage() {
		if (!messageInput) {
			toast.error("Message cannot be empty");
			return;
		}

		if (!selectedProject) {
			toast.error("Please select a project");
			return;
		}

		if (!selectedModel?.[1]){
			toast.error("Please select a model")
			return
		}

		if (agentState?.agent_is_active) {
			if (messages?.length === 0) {
				await executeAgent(messageInput);
			} else {
				await sendMessage(messageInput);
			}
		}

		setMessageInput("");
	}

	function calculateTokens(event: ChangeEvent<HTMLTextAreaElement>) {
		const prompt = event.target.value;
		fetch(`${API_BASE_URL}/api/calculate-tokens`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ prompt }),
		})
			.then((response) => response.json())
			.then((data) => {
				document.querySelector(".token-count").textContent = `${data.token_usage} tokens`;
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	}
	console.log(agentState)

	return (
		<div className="expandable-input mt-4 relative">
			<Textarea
				className="p-2 bg-slate-800 rounded pr-20 w-full"
				placeholder="Type your message ..."
				onChange={(e) => {
					setMessageInput(e.target.value);
					calculateTokens(e);
				}}
				value={messageInput}
				onKeyDown={(e) => {
					if (e.key === "Enter" && !e.shiftKey) {
						e.preventDefault();
						handleSendMessage();
					}
				}}
			/>
			<div className="token-count absolute right-2 bottom-2 text-gray-400 text-xs">0 tokens</div>
			<button id="send-message-btn" className={`px-4 py-2 rounded w-full mt-2 ${agentState?.agent_is_active ? "bg-slate-800" : "bg-indigo-700"}`} onClick={handleSendMessage} disabled={agentState?.agent_is_active}>
				{agentState?.agent_is_active ? "Agent is busy" : "Send"}
			</button>
		</div>
	);
};

export default MessageInput;
