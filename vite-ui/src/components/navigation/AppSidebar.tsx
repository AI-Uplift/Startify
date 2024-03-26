import { CogIcon, HomeIcon } from "lucide-react";
import { FaHistory } from "react-icons/fa";

const AppSidebar = () => {
	return (
		<div className="flex flex-col w-20 bg-slate-950 p-4 space-y-4 items-center shadow-2xl shadow-indigo-700">
			<div className="p-5 rounded nav-button relative">
				<button className="text-gray-400 hover:text-white flex justify-center w-full">
					<HomeIcon size={24} />
				</button>
				<span className="tooltip">Home</span>
			</div>
			<div className="p-5 rounded nav-button relative">
				<button className="text-gray-400 hover:text-white flex justify-center w-full">
					<CogIcon size={24} />
				</button>
				<span className="tooltip">Settings</span>
			</div>
			<div className="p-5 rounded nav-button relative">
				<button className="text-gray-400 hover:text-white flex justify-center w-full">
					<FaHistory size={24} />
				</button>
				<span className="tooltip">Logs</span>
			</div>
		</div>
	);
};

export default AppSidebar;
