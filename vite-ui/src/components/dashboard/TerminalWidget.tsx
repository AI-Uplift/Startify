import { useAppStore } from "@/hooks/store/useAppStore";
import { useEffect, useRef, useState } from "react";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";

const TerminalWidget = () => {
	const terminalElementRef = useRef<HTMLDivElement>(null);
	const [terminal, setTerminal] = useState<Terminal | null>(null);
	const [fitAddon, setFitAddon] = useState<FitAddon | null>(null);
	const [previousState, setPreviousState] = useState<Record<string, any> | null>(null);

	const { agentState } = useAppStore();

	useEffect(() => {
		const term = new Terminal({
			disableStdin: true,
			cursorBlink: true,
			convertEol: true,
			rows: 1,
		});

		const addon = new FitAddon();
		term.loadAddon(addon);
		term.open(terminalElementRef.current!);
		addon.fit();

		setTerminal(term);
		setFitAddon(addon);
	}, []);

	useEffect(() => {
		if (terminal && fitAddon && agentState) {
			if (agentState.terminal_session) {
				let command = agentState.terminal_session.command || 'echo "Waiting for command..."';
				let output = agentState.terminal_session.output || "Waiting for output...";
				let title = agentState.terminal_session.title || "Terminal";

				// Check if the current state is different from the previous state
				if (command !== previousState?.command || output !== previousState?.output || title !== previousState?.title) {
					addCommandAndOutput(command, output, title);
					setPreviousState({ command, output, title });
				}
			}

			// Fit the terminal to the container
			fitAddon.fit();
		}
	}, []);

	const addCommandAndOutput = (command: string, output: string, title: string) => {
		if (title) {
			document.getElementById("terminal-title").innerText = title;
		}
		terminal.reset();
		terminal.write(`$ ${command}\r\n\r\n${output}\r\n`);
	};
	
	return (
		<div className="flex flex-col bg-slate-950 border border-indigo-700 rounded flex-1 overflow-hidden">
			<div className="p-2 flex items-center border-b border-gray-700">
				<div className="flex space-x-2 ml-2 mr-4">
					<div className="w-3 h-3 bg-red-500 rounded-full"></div>
					<div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
					<div className="w-3 h-3 bg-green-500 rounded-full"></div>
				</div>
				<span id="terminal-title">Terminal</span>
			</div>
			<div id="terminal-content" className="bg-black" ref={terminalElementRef} style={{ height: "100%", marginLeft: "5px" }}></div>
		</div>
	);
};

export default TerminalWidget;
