import BrowserWidget from "@/components/dashboard/BrowserWidget";
import InternalMonologue from "@/components/dashboard/InternalMonologue";
import MessageContainer from "@/components/dashboard/MessageContainer";
import MessageInput from "@/components/dashboard/MessageInput";
import TerminalWidget from "@/components/dashboard/TerminalWidget";
import AppSidebar from "@/components/navigation/AppSidebar";
import ControlPanel from "@/components/navigation/ControlPanel";
import { useAppStore } from "@/hooks/store/useAppStore";
import useAppMessages from "@/hooks/useAppMessages";
import { useInterval } from "@/hooks/useInterval";
import { useState } from "react";

const Dashboard = () => {
	const [activeTab, setActiveTab] = useState<"shell" | "browser" | "editor" | "planner">("shell");
	const { getAgentState } = useAppMessages();
	const { setAgentState } = useAppStore();

	function switchTab(tab: "shell" | "browser" | "editor" | "planner") {
		setActiveTab(tab);
	}

	const fetchAgentState = async () => {
		const agentState = await getAgentState();
		if (agentState) {
			setAgentState(agentState);
		}
	};
	
	useInterval(fetchAgentState, 1000);

	return (
		<div className="h-screen flex bg-[#121212] text-white overflow-y-scroll">
			<AppSidebar />
			<div className="flex flex-col flex-1 p-4">
				<ControlPanel />
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					<div className="flex flex-col col-span-1">
						<MessageContainer />
						<InternalMonologue />
						<MessageInput />
					</div>
					<div className="flex flex-col flex-grow col-span-2">
						<div className="workspace-container">
							<header className="tabs-header space-x-3">
								<button onClick={() => switchTab("shell")} className={`${activeTab === "shell" ? "active" : ""}`}>
									Shell
								</button>
								<button onClick={() => switchTab("browser")} className={`${activeTab === "browser" ? "active" : ""}`}>
									Browser
								</button>
								<button onClick={() => switchTab("editor")} className={`${activeTab === "shell" ? "active" : ""}`}>
									Editor
								</button>
								<button onClick={() => switchTab("planner")} className={`${activeTab === "shell" ? "active" : ""}`}>
									Planner
								</button>
							</header>
							<div className="tab-content">
								{activeTab === "shell" && <TerminalWidget />}
								{activeTab === "browser" && <BrowserWidget />}
								{activeTab === "editor" && <div>Editor</div>}
								{activeTab === "planner" && <div>Planner</div>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
