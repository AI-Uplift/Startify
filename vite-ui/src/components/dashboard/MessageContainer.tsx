import { useAppStore } from "@/hooks/store/useAppStore";
import useAppMessages from "@/hooks/useAppMessages";
import { useInterval } from "@/hooks/useInterval";
import { Fragment, useEffect, useRef, useState } from "react";

const MessageContainer = () => {
	const messageContainerRef = useRef<HTMLDivElement>(null);
	const [previousMessageCount, setPreviousMessageCount] = useState<number>(0);
	const { getMessages } = useAppMessages();
	const { messages, setMessages } = useAppStore();

	const fetchMessages = async () => {
		const messages = await getMessages();
		if (messages.length > 0) {
			setMessages(messages);
		}
	};

	useInterval(fetchMessages, 1000);

	useEffect(() => {
		if (messages && messages.length > previousMessageCount) {
			messageContainerRef.current?.scrollTo({
				top: messageContainerRef.current.scrollHeight,
				behavior: "smooth",
			});
			setPreviousMessageCount(messages.length);
		}
	}, [messages]);

	return (
		<div className="flex-grow overflow-y-scroll pr-2" ref={messageContainerRef}>
			{messages && messages.length > 0 ? (
				messages.map((msg, idx) => (
					<div key={idx} className="flex items-start space-x-3 mt-4">
						{msg.from_StartifyAI ? (
							<img src="/logo.png" alt="StartifyAI's Avatar" className="avatar rounded-full flex-shrink-0 w-[40px] h-[40px]" />
						) : (
							<img src="/user-avatar.png" alt="User's Avatar" className="avatar rounded-full flex-shrink-0 w-[40px] h-[40px]" />
						)}
						<div className="flex flex-col w-full">
							<p className="text-xs text-gray-400 sender-name">
								{msg.from_StartifyAI ? "StartifyAI" : "You"}
								<span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
							</p>
							{msg.from_StartifyAI && msg.message.startsWith("{") ? (
								<div className="bg-slate-800 p-2 rounded w-full mr-4" contentEditable="false">
									<strong>Here's my step-by-step plan:</strong>
									<br />
									<br />
									{Object.entries(JSON.parse(msg.message)).map(([step, description]) => (
										<Fragment key={step}>
											<input type="checkbox" id={`step-${step}`} disabled />
											<label htmlFor={`step-${step}`}>
												<strong>Step {step}</strong>: {description as string}
											</label>
											<br />
											<br />
										</Fragment>
									))}
								</div>
							) : new RegExp("https?://[^\\s]+").test(msg.message) ? (
								<div
									className="bg-slate-800 p-2 rounded w-full mr-4"
									contentEditable="false"
									dangerouslySetInnerHTML={{ __html: msg.message.replace(/(https?:\/\/[^\s]+)/g, '<u><a href="$1" target="_blank" style="font-weight: bold;">$1</a></u>') }}
								/>
							) : (
								<div className="bg-slate-800 p-2 rounded w-full mr-4" contentEditable="false" dangerouslySetInnerHTML={{ __html: msg.message }} />
							)}
						</div>
					</div>
				))
			) : (
				<div>
					<p className="text-center text-gray-400">No messages yet</p>
				</div>
			)}
		</div>
	);
};

export default MessageContainer;
