"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

type Product = {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	description: string;
	category: string;
	rating: number;
	stock: number;
	brand: string;
};

const fetchProduct = async (productId: string): Promise<Product> => {
	const response = await fetch(`https://dummyjson.com/products/${productId}`);
	if (!response.ok) {
		throw new Error("Product not found");
	}
	return response.json();
};

const ProductPage = () => {
	const params = useParams();
	const router = useRouter();
	const id = params.id as string;

	const {
		data: product,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["product", id],
		queryFn: () => fetchProduct(id),
		staleTime: 15000,
		retry: 2,
	});

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (error || !product) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">Not Found</h1>
				<button
					type="button"
					onClick={() => router.back()}
					className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
				>
					Return Home
				</button>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-8">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

				<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
					<div className="md:flex">
						<div className="md:w-1/2 p-8">
							<div className="relative bg-gray-100 rounded-xl overflow-hidden">
								<img
									src={product.thumbnail}
									alt={product.title}
									width={600}
									height={600}
									className="w-full h-auto object-cover"
								/>
							</div>
						</div>

						<div className="md:w-1/2 p-8">
							<div className="mb-6">
								<div className="flex items-center gap-4 mb-4">
									<span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
										${product.price}
									</span>
								</div>
								<h1 className="text-3xl font-bold text-gray-800 mb-2">
									{product.title}
								</h1>
								<p className="text-gray-500 mb-4">{product.category}</p>
								<div className="flex items-center gap-2">
									<div className="flex text-yellow-400">
										{"★".repeat(Math.round(product.rating))}
										{"☆".repeat(5 - Math.round(product.rating))}
									</div>
									<span className="text-gray-600">{product.rating}/5</span>
								</div>
							</div>

							<div className="mb-8">
								<h2 className="text-xl font-semibold text-gray-700 mb-3">
									Description
								</h2>
								<p className="text-gray-600 leading-relaxed">
									{product.description}
								</p>
							</div>

							<div className="flex gap-4">
								<button
									type="button"
									className="cursor-pointer flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
								>
									Add To Cart
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductPage;
