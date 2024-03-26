const HomeHero = () => {
	return (
		<>
			<div className="flex items-center justify-center mt-10">
				<div
					className="mb-20 max-w-4xl w-full
            bg-[url('/home-backdrop.png')] bg-cover bg-center bg-no-repeat rounded-xl h-[80vh]
            ">
					<div className="py-10 text-center space-y-4 h-full">
						<h1 className="text-7xl font-bold">StartifyAI</h1>
						<div className="">
							<h2 className="text-5xl">Your Ultimate AI-Powered</h2>
							<h2 className="text-4xl font-semibold">Startup Solution</h2>
						</div>
						<h3 className="text-xl font-extralight">Empowering Entrepreneurs, Accelerating Innovation</h3>
						<div className="pt-10">
							<button
								type="button"
								className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium rounded-full text-xl px-8 py-4 text-center me-2 mb-2">
								Get Started Now
							</button>
						</div>
					</div>
				</div>
			</div>
			<img src="/layo.png" alt="hero" className="w-full h-auto" />
		</>
	);
};

export default HomeHero;
