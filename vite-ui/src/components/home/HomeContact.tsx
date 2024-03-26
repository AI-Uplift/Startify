import { MailIcon, MapPinIcon, PhoneIcon } from "lucide-react";

const HomeContact = () => {
	return (
		<div className="container my-10 w-full px-10">
			<div className="relative">
				<div className="flex items-center justify-end">
					<div className="h-48 rounded-xl bg-gradient-to-r from-[#2D2E48] to-[#fff]/10 w-[80%]"></div>
				</div>
				<div className="flex items-center justify-end absolute top-10 right-20 w-full">
					<div className="h-48 rounded-xl bg-gradient-to-r from-[#2D2E48] to-[#fff]/10 w-[80%]">
						<div className="px-2 py-4">
							<div className="grid grid-cols-8 gap-4">
								<div className="col-span-2">
									<div className="bg-white p-2 w-3/5 rounded-full" />
									<div className="my-8"></div>
									<div className="bg-white p-2 w-3/5 rounded-full" />
									<div className="bg-[#CAD1E9] p-2 w-3/5 rounded-full ml-2 my-2" />
									<div className="bg-white p-2 w-3/5 rounded-full ml-2 my-2" />
								</div>
								<div className="col-span-6 mt-2">
									<h2 className="font-semibold text-lg">Get in Touch</h2>
									<div className="grid grid-cols-2 gap-4 mt-4">
										<div className="flex space-x-3">
											<MailIcon className="w-6 h-6" />
											<div className="">
												<h2 className="font-semibold">Email</h2>
												<p>info@startify.com</p>
											</div>
										</div>
										<div className="flex space-x-3">
											<PhoneIcon className="w-6 h-6" />
											<div className="">
												<h2 className="font-semibold">Phone</h2>
												<p>+254700677677</p>
											</div>
										</div>
										<div className="flex space-x-3">
											<MapPinIcon className="w-6 h-6" />
											<div className="">
												<h2 className="font-semibold">Location</h2>
												<p>LR lane, Kinza street</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeContact;
