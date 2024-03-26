import { BsTwitterX } from "react-icons/bs";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { Button } from "../ui/button";
import { ChevronRightIcon } from "lucide-react";

const HomeFooter = () => {
	return (
		<footer className="bg-[url('/feat-backdrop.png')] bg-cover bg-center bg-no-repeat rounded-xl h-auto px-10 mt-20 py-10">
			<div className="flex items-start justify-between">
				<div className="flex flex-col items-center">
					<img src="/logo.png" alt="logo" className="w-20 h-20" />
					<div className="flex items-center space-x-2 mt-3">
						<FaFacebookF className="w-6 h-6" />
						<FaInstagram className="w-6 h-6" />
						<BsTwitterX className="w-6 h-6" />
					</div>
				</div>
				<div className="space-y-5">
					<h2 className="text-xl">Links</h2>
					<p className="text-[#15D798] italic">Terms & Conditions</p>
					<p className="text-[#15D798] italic">Privacy Policy</p>
					<p className="text-[#15D798] italic">Terms of use of website & application</p>
					<p className="text-[#15D798] italic">Cookie Policy</p>
				</div>
				<div className="space-y-4">
					<h2 className="text-xl">Need Help?</h2>
					<div className="bg-inherit w-[16rem]">
						<div className=" bg-gradient-to-r from-[#007BFF]/10 via-[#15D798]/10 to-[#007BFF]/10 px-4 py-5 rounded-xl space-y-5">
							<h2 className="text-lg font-semibold">Get in Touch</h2>
							<p>To speak to one of our helpful staff.</p>
							<Button size="icon" className="bg-white hover:bg-gray-300">
								<ChevronRightIcon className="w-6 h-6 text-gray-900" />
							</Button>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default HomeFooter;
