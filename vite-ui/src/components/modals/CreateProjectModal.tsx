import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { API_BASE_URL } from "@/env";
import toast from "react-hot-toast";

interface ICreateProjectModalProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	mutate?: VoidFunction;
}

async function createProject(projectName: string) {
	return await fetch(`${API_BASE_URL}/api/create-project`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ project_name: projectName }),
	});
}

const CreateProjectModal = ({ open, setOpen, mutate }: ICreateProjectModalProps) => {
	const [projectName, setProjectName] = useState<string>("");

	const saveProject = async () => {
		if (!projectName) {
			toast.error("Please enter a project name");
			return;
		}
		try {
			const response = await createProject(projectName);
			if (response.ok) {
				toast.success("Project created successfully");
				mutate();
                setProjectName("");
				setOpen(false);
				return;
			} else {
				toast.error("Failed to create project");
			}
		} catch (err) {
			console.error(err);
			toast.error("Failed to create project");
		}
	};
	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px] dark text-white">
				<DialogHeader>
					<DialogTitle>Create Project</DialogTitle>
					<DialogDescription>Create a new project to get started</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="name" className="text-right">
							Project Name
						</Label>
						<Input className="col-span-3" value={projectName} onChange={(e) => setProjectName(e.target.value)} />
					</div>
				</div>
				<DialogFooter>
					<Button onClick={saveProject}>Save</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

export default CreateProjectModal;
