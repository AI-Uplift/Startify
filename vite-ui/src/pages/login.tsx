import AppInput from "@/components/forms/AppInput";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { firebaseAuth } from "@/lib/initFirebase";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { InferType, object, string } from "yup";

const formSchema = object({
	email: string().email("Invalid email").required("Email is required"),
	password: string().required("Password is required"),
});

const Login = () => {
	const [loading, setLoading] = useState<boolean>(false);

	const formMethods = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const {
		handleSubmit,
		reset,
		formState: { errors },
		control,
	} = formMethods;

	const navigate = useNavigate();

	const onSubmit = async (data: InferType<typeof formSchema>) => {
		toast.promise(
			new Promise((resolve, reject) => {
				setLoading(true);
				signInWithEmailAndPassword(firebaseAuth, data.email, data.password)
					.then(() => {
						navigate("/dashboard");
						resolve("Login successful");
					})
					.catch((error) => {
						setLoading(false);
						reject(error.message);
					});
			}),
			{
				loading: "Authenticating...",
				// @ts-expect-error - fix this
				success: (message) => {
					reset();
					return message;
				},
				error: (error) => error,
			}
		);
	};

	return (
		<div className="flex items-center justify-center h-full">
			<div className="">
				<div className="text-center">
					<h1 className="text-xl font-semibold">Login</h1>
					<h3 className=" font-light">Welcome Back!</h3>
				</div>
				<div className="w-[576px] mt-5">
					<div className="bg-gradient-to-r from-[#007BFF]/10 via-[#15D798]/10 to-[#007BFF]/10 px-8 py-12 rounded-xl w-full">
						<div className="flex items-center justify-between">
							<button
								type="button"
								className="text-white bg-[#455A64] hover:bg-[#455A64]/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center me-2 rounded-full">
								<BsGoogle />
								<span className="ml-2">Login with Google</span>
							</button>
							<button
								type="button"
								className="text-white bg-[#455A64] hover:bg-[#455A64]/80 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 text-center inline-flex items-center me-2 rounded-full">
								<BsGithub />
								<span className="ml-2">Login with Github</span>
							</button>
						</div>
						<div className="flex space-x-3">
							<div className="flex-1 h-[1px] bg-white my-5"></div>
							<div className="text-white mt-2">Or</div>
							<div className="flex-1 h-[1px] bg-white my-5"></div>
						</div>
						<FormProvider {...formMethods}>
							<form onSubmit={handleSubmit(onSubmit)}>
								<div className="space-y-3">
									<AppInput label="Email" name="email" control={control} error={errors.email} className="bg-transparent rounded-full " placeholder="john.doe@gmail.com" />
									<AppInput label="Password" name="password" control={control} error={errors.password} type="password" className="bg-transparent rounded-full " placeholder="yourpassword" />
									<div className="flex items-center justify-between py-5">
										<div className="flex items-center space-x-2">
											<Checkbox id="terms" />
											<Label htmlFor="terms">Remember me?</Label>
										</div>
										<a href="#" className="text-[#449DFD] underline underline-offset-4">
											Forgot Password?
										</a>
									</div>
									<button
										type="submit"
										disabled={loading}
										className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium rounded-full text-base px-4 py-4 text-center me-2 mb-2 w-full">
										{loading ? "Loading..." : "Login"}
									</button>
									<div className="">
										<p>
											You don't have an account yet?{" "}
											<span className="text-[#449DFD]">
												<a href="/signup">Signup</a>
											</span>{" "}
										</p>
									</div>
								</div>
							</form>
						</FormProvider>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
