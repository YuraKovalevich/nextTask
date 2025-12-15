"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type FormState = {
	email: string;
	password: string;
};

type ErrorsState = {
	email: string;
	password: string;
};

const validate = (name: keyof FormState, value: string): string => {
	if (name === "email") {
		if (!value.includes("@")) return "Email must contain @";
	}

	if (name === "password") {
		if (value.includes(" ")) return "Password must not contain spaces";
		if (value.length < 8) return "Password must be at least 8 characters";
	}

	return "";
};

const Page = () => {
	const router = useRouter();

	const [form, setForm] = useState<FormState>({
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<ErrorsState>({
		email: "",
		password: "",
	});

	const handleChange = (name: keyof FormState, value: string) => {
		setForm((prev) => ({ ...prev, [name]: value }));
		setErrors((prev) => ({
			...prev,
			[name]: validate(name, value),
		}));
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newErrors: ErrorsState = {
			email: validate("email", form.email),
			password: validate("password", form.password),
		};

		setErrors(newErrors);

		const isValid = !newErrors.email && !newErrors.password;
		if (!isValid) return;

		router.push("/");
	};

	const isValid =
		form.email && form.password && !errors.email && !errors.password;

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
			<div className="w-full max-w-sm rounded-xl bg-white p-6 shadow">
				<h1 className="mb-6 text-center text-2xl font-bold text-indigo-600">
					Login
				</h1>

				<form className="space-y-5" onSubmit={handleSubmit}>
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
							value={form.email}
							onChange={(e) => handleChange("email", e.target.value)}
							className={`mt-1 w-full rounded-md border px-3 py-2 outline-none
                ${
									errors.email
										? "border-red-500"
										: "border-gray-300 focus:border-indigo-500"
								}`}
						/>
						{errors.email && (
							<p className="mt-1 text-sm text-red-500">{errors.email}</p>
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
							value={form.password}
							onChange={(e) => handleChange("password", e.target.value)}
							className={`mt-1 w-full rounded-md border px-3 py-2 outline-none
                ${
									errors.password
										? "border-red-500"
										: "border-gray-300 focus:border-indigo-500"
								}`}
						/>
						{errors.password && (
							<p className="mt-1 text-sm text-red-500">{errors.password}</p>
						)}
					</div>

					<button
						type="submit"
						disabled={!isValid}
						className={`w-full rounded-md py-2 font-semibold text-white transition
              ${
								isValid
									? "bg-indigo-600 hover:bg-indigo-500"
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
