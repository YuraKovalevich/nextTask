"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";

const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.refine((val) => !val.includes(" "), {
			message: "Password must not contain spaces",
		}),
});

type FormState = {
	email: string;
	password: string;
};

const Page = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormState>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
	});
	const onSubmit = (values: FormState) => {
		router.push("/");
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
			<div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
				<h1 className="mb-6 text-center text-2xl font-bold text-indigo-600">
					Login
				</h1>

				<form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-gray-700"
						>
							Email
						</label>
						<input
							id="email"
							type="email"
							{...register("email")}
							className={`mt-1 w-full rounded-md border px-3 py-2 outline-none
                ${
									errors.email
										? "border-red-500"
										: "border-gray-300 focus:border-indigo-500"
								}`}
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-500">
								{errors.email.message}
							</p>
						)}
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-gray-700"
						>
							Password
						</label>
						<input
							type="password"
							{...register("password")}
							className={`mt-1 w-full rounded-md border px-3 py-2 outline-none
                ${
									errors.password
										? "border-red-500"
										: "border-gray-300 focus:border-indigo-500"
								}`}
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-red-500">
								{errors.password.message}
							</p>
						)}
					</div>

					<button
						type="submit"
						disabled={!isValid}
						className={`w-full rounded-md py-2 font-semibold text-white transition
              ${
								isValid
									? "cursor-pointer bg-indigo-600 hover:bg-indigo-500"
									: "cursor-not-allowed bg-gray-300"
							}`}
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Page;
