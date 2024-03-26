import HomeContact from "@/components/home/HomeContact";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeFooter from "@/components/home/HomeFooter";
import HomeHero from "@/components/home/HomeHero";
import HomeMission from "@/components/home/HomeMission";
import HomeNavbar from "@/components/navigation/HomeNavbar";

const HomePage = () => {
	return (
		<div className="bg-[#121212] text-white overflow-y-scroll">
			<HomeNavbar />
			<HomeHero />
			<HomeFeatures />
			<HomeMission />
			<HomeContact />
			<HomeFooter />
		</div>
	);
};

export default HomePage;
