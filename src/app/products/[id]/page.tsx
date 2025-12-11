"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	description: string;
};

const ProductPage = () => {
	const params = useParams();
	const router = useRouter();
	const id = params.id;
	const [product, setProduct] = useState<Product | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (id) {
			const fetchProduct = async (productId: string) => {
				try {
					setLoading(true);
					const response = await fetch(
						`https://dummyjson.com/products/${productId}`,
					);
					const data = await response.json();
					console.log(data);
					setProduct(data);
				} catch (error) {
					console.error("Error fetching product:", error);
				} finally {
					setLoading(false);
				}
			};

			fetchProduct(id as string);
		}
	}, [id]);

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
			</div>
		);
	}

	if (!product) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center">
				<h1 className="text-2xl font-bold text-gray-800 mb-4">
					Товар не найден
				</h1>
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
					className="mb-6 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
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
								<Image
									src={product.thumbnail}
									alt={product.title}
									className="w-full h-auto object-cover"
								/>
							</div>
						</div>

						<div className="md:w-1/2 p-8">
							<div className="mb-6">
								<span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold inline-block mb-4">
									${product.price}
								</span>
								<h1 className="text-3xl font-bold text-gray-800 mb-4">
									{product.title}
								</h1>
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
									className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
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
