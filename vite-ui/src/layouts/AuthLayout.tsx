import AuthNavbar from "@/components/navigation/AuthNavbar";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div className="bg-[#121212] text-white overflow-y-scroll h-screen">
			<AuthNavbar />
			<Outlet />
		</div>
	);
};

export default AuthLayout;
