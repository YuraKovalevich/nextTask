"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import type { Product } from "@/src/app/types/product";
import ButtonBack from "@/src/components/ButtonBack";
import ProductImage from "@/src/components/ProductImage";
import ProductInfo from "@/src/components/ProductInfo";

const fetchProduct = async (productId: string): Promise<Product> => {
	const res = await fetch(`https://dummyjson.com/products/${productId}`);
	if (!res.ok) throw new Error("Product not found");
	return res.json();
};

export default function ProductPage() {
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
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
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
				<ButtonBack />

				<div className="bg-white rounded-2xl shadow-lg overflow-hidden">
					<div className="md:flex">
						<ProductImage product={product} />
						<ProductInfo product={product} />
					</div>
				</div>
			</div>
		</div>
	);
}
