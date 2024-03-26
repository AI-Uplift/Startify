import AppInput from "@/components/forms/AppInput";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InferType, object, ref, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseAuth, firebaseFirestore } from "@/lib/initFirebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const formSchema = object({
	name: string().required("Name is required"),
	email: string().email("Invalid email").required("Email is required"),
	password: string().required("Password is required"),
	confirmPassword: string()
		.required("Confirm Password is required")
		.oneOf([ref("password"), null], "Passwords must match"),
});

const Signup = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const formMethods = useForm({
		resolver: yupResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const {
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = formMethods;

	const navigate = useNavigate()

	const onSubmit = async (data: InferType<typeof formSchema>) => {
		toast.promise(
			new Promise((resolve, reject) => {
				setLoading(true);
				createUserWithEmailAndPassword(firebaseAuth, data.email, data.password)
					.then(async (userCred) => {
						const docRef = doc(firebaseFirestore, "users", userCred.user.uid);
						await setDoc(docRef, {
							name: data.name,
							email: data.email,
						});
						reset();
						setLoading(false);
						navigate("/login")
						resolve("Signup successful");
					})
					.catch((error) => {
						setLoading(false);
						reject(error.message);
					});
			}),
			{
				loading: "Saving...",
				success: "Signup successful",
				error: "Signup failed",
			}
		);
	};
	return (
		<div className="flex items-center justify-center h-full">
			<div className="">
				<div className="text-center">
					<h1 className="text-xl font-semibold">Signup</h1>
					<h3 className=" font-light">Create your Account!</h3>
				</div>
				<FormProvider {...formMethods}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<div className="w-[576px] mt-5">
							<div className="bg-gradient-to-r from-[#007BFF]/10 via-[#15D798]/10 to-[#007BFF]/10 px-8 py-12 rounded-xl w-full">
								<div className="space-y-6">
									<AppInput label="Name" name="name" control={control} error={errors.name} className="bg-transparent rounded-full " placeholder="John Doe" />
									<AppInput label="Email" name="email" control={control} error={errors.email} className="bg-transparent rounded-full " placeholder="john.doe@gmail.com" />
									<AppInput label="Password" name="password" control={control} error={errors.password} type="password" className="bg-transparent rounded-full " placeholder="yourpassword" />
									<AppInput label="Confirm Password" name="confirmPassword" control={control} error={errors.confirmPassword} type="password" className="bg-transparent rounded-full " placeholder="yourpassword" />
									<button
										type="submit"
										disabled={loading}
										className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200  font-medium rounded-full text-base px-4 py-4 text-center me-2 mb-2 w-full">
										{loading ? "Loading..." : "Signup"}
									</button>
									<div className="">
										<p>
											Already have an account?{" "}
											<span className="text-[#449DFD]">
												<a href="/login">Login</a>
											</span>{" "}
										</p>
									</div>
								</div>
							</div>
						</div>
					</form>
				</FormProvider>
			</div>
		</div>
	);
};

export default Signup;
