import { useAppStore } from "@/hooks/store/useAppStore";
import useAppMessages from "@/hooks/useAppMessages";
import { useInterval } from "@/hooks/useInterval";
import { useState } from "react";

const InternalMonologue = () => {
	const [monologue, setMonologue] = useState<string>("");
	const { getAgentState } = useAppMessages();

	const fetchAgentState = async () => {
		const agentState = await getAgentState();
		if (agentState) {
			setMonologue(agentState.internal_monologue);
		}
	};
	useInterval(fetchAgentState, 1000);

	return (
		<div className="internal-monologue bg-slate-950 border border-indigo-700 p-2 rounded mt-4 flex items-start space-x-3">
			<img src="/logo.png" alt="StartifyAI's Avatar" className="w-[40px] h-[40px] rounded-full flex-shrink-0" />
			<div>
				<p className="text-xs text-gray-400">StartifyAI's Internal Monologue</p>
				<p className="text-sm">{monologue || "😴"}</p>
			</div>
		</div>
	);
};

export default InternalMonologue;
