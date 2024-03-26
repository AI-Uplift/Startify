import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

const HomeNavbar = () => {
	const navigate = useNavigate();
	return (
		<div className="flex items-center justify-between w-full px-5">
			<img src="/logo.png" alt="logo" className="w-20 h-20" />
			<div className="flex items-center space-x-5">
				<a href="#" className="text-lg text-[#15D798] hover:underline hover:underline-offset-4">
					Home
				</a>
				<a href="#" className="text-lg hover:underline hover:underline-offset-4">
					Features
				</a>
				<a href="#" className="text-lg hover:underline hover:underline-offset-4">
					About Us
				</a>
				<a href="#" className="text-lg hover:underline hover:underline-offset-4">
					Contact Us
				</a>
			</div>
			<div className="space-x-2">
				<Button className="bg-transparent border border-[#D9D9D9] rounded-xl" onClick={() => navigate("/login")}>
					Login
				</Button>
				<Button className="bg-gradient-to-r from-[#15D798] to-[#007BFF] rounded-2xl hover:bg-gradient-to-l hover:from-[#007BFF] hover:to-[#15D798]" onClick={() => navigate("/signup")}>
					Signup
				</Button>
			</div>
		</div>
	);
};

export default HomeNavbar;
