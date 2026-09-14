"use client";
import { useRouter } from "next/navigation";

const ButtonBack = () => {
	const router = useRouter();
	return (
		<button
			type="button"
			onClick={() => router.back()}
			className=" cursor-pointer mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
		>
			<svg
				className="w-4 h-4"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<title>button</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M10 19l-7-7m0 0l7-7m-7 7h18"
				/>
			</svg>
			Return Home
		</button>
	);
};

export default ButtonBack;
