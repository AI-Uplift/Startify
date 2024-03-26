import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const HomeMission = () => {
	return (
		<div className="w-full flex items-center justify-center h-96">
			<div className="px-4"></div>
			<div
				className="w-full py-20
            bg-[url('/home-backdrop.png')] bg-cover bg-center bg-no-repeat rounded-full px-20
            ">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
					<Card className="bg-inherit text-inherit">
						<CardHeader>
							<CardTitle className="text-[#15D798]">Mission</CardTitle>
						</CardHeader>
						<CardContent>
							At StartifyAI, our mission is to democratize startup success by providing entrepreneurs with the tools and resources they need to turn their visions into reality. We believe in simplifying the startup
							journey, making it accessible to aspiring innovators worldwide.
						</CardContent>
					</Card>
					<Card className="bg-inherit text-inherit">
						<CardHeader>
							<CardTitle className="text-[#15D798]">Vision</CardTitle>
						</CardHeader>
						<CardContent>
							Our vision is to create a holistic, AI-driven platform, StartifyAI, that not only facilitates the launch of startups but also offers comprehensive tools and integrations for seamless operation and growth.
						</CardContent>
					</Card>
					<Card className="bg-inherit text-inherit">
						<CardHeader>
							<CardTitle className="text-[#15D798]">Objective</CardTitle>
						</CardHeader>
						<CardContent>
							We aim to develop StartifyAI as the ultimate one-stop solution for entrepreneurs, providing every tool and service needed to start, run, and scale their startups efficiently, with minimal manual
							intervention.
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
};

export default HomeMission;
