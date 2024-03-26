import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { API_BASE_URL } from "@/env";
import { useAppStore } from "@/hooks/store/useAppStore";
import axios from "axios";
import { useState } from "react";
import useSWR from "swr";
import CreateProjectModal from "../modals/CreateProjectModal";

const mapModelKeyToModelInfo = (modelKey: string, models: string[][]) => {
	return models.find((model) => model[1] === modelKey);
};

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const ControlPanel = () => {
	const { setSelectedProject, selectedProject, selectedModel, setSelectedModel, setMessages } = useAppStore();
	const [showProjectModal, setShowProjectModal] = useState<boolean>(false);

	const onChangeModel = (model: string[]) => {
		setSelectedModel(model);
	};

	const onProjectChange = (project: string) => {
		setSelectedProject(project);
		setMessages([]);
	};

	const { data, mutate } = useSWR<{ projects: string[] }>(`${API_BASE_URL}/api/project-list`, fetcher);
	const { data: tokenInfo } = useSWR<{ token_usage: number }>(`${API_BASE_URL}/api/token-usage`, fetcher, {
		refreshInterval: 1000,
	});
	const { data: modelsInfo } = useSWR<{ models: Array<string[]> }>(`${API_BASE_URL}/api/model-list`, fetcher);

	return (
		<div className="control-panel bg-slate-900 border border-indigo-700 rounded flex items-center justify-between">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button className="dark text-white" variant="outline">
						Project: {selectedProject || "Select Project"}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56 dark text-white">
					<DropdownMenuLabel>My Project</DropdownMenuLabel>
					<DropdownMenuRadioGroup>
						<DropdownMenuRadioItem value="add">
							<Button variant="ghost" onClick={() => setShowProjectModal(true)}>
								Add Projects
							</Button>
						</DropdownMenuRadioItem>
					</DropdownMenuRadioGroup>
					<DropdownMenuSeparator />
					<DropdownMenuRadioGroup value={selectedProject} onValueChange={onProjectChange}>
						{data?.projects?.length ? (
							data.projects?.map((project) => (
								<DropdownMenuRadioItem key={project} value={project}>
									{project}
								</DropdownMenuRadioItem>
							))
						) : (
							<DropdownMenuRadioItem value="loading">Loading...</DropdownMenuRadioItem>
						)}
					</DropdownMenuRadioGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<div className="right-controls flex items-center gap-[20px]">
				<div className="flex items-center space-x-2">
					<span>Internet:</span>
					<div id="internet-status" className="internet-status"></div>
					<span id="internet-status-text"></span>
				</div>
				<div className="flex items-center space-x-2">
					<span>Token Usage:</span>
					<span id="token-count" className="token-count-animation">
						{tokenInfo?.token_usage ?? 0}
					</span>
				</div>
			</div>
			<div className="relative inline-block text-left">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button className="dark text-white" variant="outline">
							Model: {selectedModel ? `${selectedModel[0]}` : "Select Model"}
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56 dark text-white">
						<DropdownMenuLabel>Available Models</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuRadioGroup value={selectedModel ? selectedModel[1] : null} onValueChange={(val) => onChangeModel(mapModelKeyToModelInfo(val, modelsInfo.models))}>
							{modelsInfo?.models?.length ? (
								modelsInfo?.models?.map((model) => (
									<DropdownMenuRadioItem key={model?.[1]} value={model?.[1]}>
										{model?.[0]} - {model?.[1]}
									</DropdownMenuRadioItem>
								))
							) : (
								<DropdownMenuRadioItem value="loading">Loading...</DropdownMenuRadioItem>
							)}
						</DropdownMenuRadioGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<CreateProjectModal open={showProjectModal} setOpen={setShowProjectModal} mutate={mutate} />
		</div>
	);
};

export default ControlPanel;
