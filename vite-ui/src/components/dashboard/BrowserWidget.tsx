import { API_BASE_URL } from "@/env";
import { useAppStore } from "@/hooks/store/useAppStore";

const BrowserWidget = () => {
	const { agentState } = useAppStore();
	return (
		<div className="flex flex-col bg-slate-950 border border-indigo-700 rounded flex-1 overflow-hidden">
			<div className="p-2 flex items-center border-b border-gray-700">
				<div className="flex space-x-2 ml-2 mr-4">
					<div className="w-3 h-3 bg-red-500 rounded-full"></div>
					<div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
					<div className="w-3 h-3 bg-green-500 rounded-full"></div>
				</div>
				<input type="text" id="browser-url" className="flex-grow bg-slate-900 p-2 rounded" placeholder="chrome://newtab" value={agentState?.browser_session.url || ""} readOnly />
			</div>
			<div id="browser-content" className="flex-grow overflow-auto">
				{agentState?.browser_session.screenshot ? (
					<img className="browser-img" src={API_BASE_URL + "/api/get-browser-snapshot?snapshot_path=" + agentState?.browser_session.screenshot} alt="Browser snapshot" />
				) : (
					<div className="text-white text-center mt-5">
						<strong>💡 TIP:</strong> You can include a Git URL in your prompt to clone a repo!
					</div>
				)}
			</div>
		</div>
	);
};

export default BrowserWidget;
