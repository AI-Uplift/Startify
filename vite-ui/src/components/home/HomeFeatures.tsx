import { CheckCircleIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";

interface FeatureItemProps {
	title: string;
	description: string;
}

const featureItems: FeatureItemProps[] = [
	{
		title: "Automated Idea Validation and Market Research",
		description: "We utilize AI-driven insights to validate your ideas and conduct thorough market research efficiently.",
	},
	{
		title: "Business Planning and Legal Setup Wizards",
		description: "We simplify the complexities of business planning and legal formalities with our intuitive wizards.",
	},
	{
		title: "Product Development Environment with Cartesi Blockchain Integration",
		description: "Develop your product seamlessly with integrated Cartesi blockchain technology.",
	},
	{
		title: "Marketing Automation and Digital Outreach Tools",
		description: "Reach your target audience effectively with automated marketing and outreach strategies.",
	},
	{
		title: "Financial and HR Management Systems",
		description: "Manage finances and human resources effortlessly within the platform.",
	},
	{
		title: "Third-party Service Integration",
		description: "Seamlessly integrate essential third-party services such as payment processors, communication tools, and CRM systems.",
	},
	{
		title: "Growth and Scaling Insights Dashboard",
		description: "Gain valuable insights into growth opportunities and scaling strategies with our intuitive dashboard.",
	},
];

const HomeFeatures = () => {
	return (
		<section className="w-full flex items-center justify-center my-10">
			<div className="px-4">
				<div
					className="w-full py-20
            bg-[url('/feat-backdrop.png')] bg-cover bg-center bg-no-repeat rounded-xl h-auto px-20
            ">
					<div className="text-center space-y-2">
						<h1 className="text-6xl font-bold">
							<span className="text-transparent bg-gradient-to-tr bg-clip-text from-[#007BFF] to-[#15D798]">Features</span>
						</h1>
						<h2 className="text-xl font-thin">What we offer</h2>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-20 pt-20 px-10">
						{featureItems.map((item, index) => (
							<FeatureItem key={index} title={item.title} description={item.description} />
						))}
					</div>
					<div className="my-10">
						<div className="grid grid-cols-8 gap-2 py-32">
							<div className="col-span-2 pt-16">
								<h1 className="text-5xl font-bold -rotate-90">
									<span className="text-transparent bg-gradient-to-tr bg-clip-text from-[#007BFF] to-[#15D798]">About Us</span>
								</h1>
							</div>
							<div className="col-span-6">
								<div className="flex space-x-5">
									<img src="/about-img.png" alt="" />
									<div className="space-y-6">
										<p className="text-xl leading-10">
											StartifyAI is a team of passionate innovators dedicated to revolutionizing the startup ecosystem. With years of experience in technology, entrepreneurship, and business development, we understand
											the challenges faced by startups firsthand. Our goal is to empower entrepreneurs with the tools and knowledge they need to succeed in today's competitive landscape.
										</p>
										<p className="text-xl leading-10">Ready to kickstart your entrepreneurial journey with StartifyAI? Click below to take the first step towards startup success.</p>
										<button
											type="button"
											className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium rounded-full text-xl px-8 py-4 text-center me-2 mb-2">
											Get Started Now
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

const FeatureItem = ({ title, description }: FeatureItemProps) => {
	return (
		<Card className=" bg-inherit text-white py-5 border-[#15D798] shadow-md ">
			<CardContent>
				<div className="flex space-x-2">
					<img src="/feat-img.png" alt="" className="w-6 h-auto" />
					<div className="space-y-4">
						<h2 className="text-lg">{title}</h2>
						<div className="flex space-x-2 items-start">
							<CheckCircleIcon className="text-[#15D798] w-12 h-12" />
							<div className="pt-2">
								<p className="text-sm">{description}</p>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

export default HomeFeatures;
