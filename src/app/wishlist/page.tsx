"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { useFavoriteStore } from "@/src/app/store/useFavoriteStore";

export default function FavoritesPage() {
	const { favorites, removeFromFavorite } = useFavoriteStore((state) => state);

	const total = useMemo(
		() => favorites.reduce((acc, index) => acc + index.price, 0),
		[favorites],
	);

	if (!favorites.length) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
				<div className="bg-white rounded-xl shadow p-8 text-center max-w-lg w-full">
					<h1 className="text-2xl font-semibold mb-4">Favorites is empty</h1>
					<p className="text-gray-600 mb-6">Add products to fast find them.</p>
					<Link
						href="/"
						className="px-6 py-2 bg-blue-600 text-white rounded-lg"
					>
						To Store
					</Link>
				</div>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 py-10">
			<div className="max-w-4xl mx-auto px-4">
				<h1 className="text-3xl font-bold mb-6">Favorites</h1>

				<div className="space-y-4 mb-6">
					{favorites.map((item) => (
						<div
							key={item.id}
							className="flex items-center justify-between bg-white rounded-xl shadow p-4"
						>
							<div className="flex items-center gap-4">
								<Image
									src={item.thumbnail}
									alt={item.title}
									height={600}
									width={600}
									className="w-20 h-20 object-cover rounded-lg"
								/>
								<div>
									<Link
										href={`/products/${item.id}`}
										className="font-semibold text-lg"
									>
										{item.title}
									</Link>
									<div className="text-gray-600">${item.price.toFixed(2)}</div>
								</div>
							</div>

							<div className="flex items-center gap-3">
								<button
									type="button"
									onClick={() => removeFromFavorite(item.id)}
									className="cursor-pointer px-4 py-2 bg-red-600 text-white rounded-lg"
								>
									Delete
								</button>

								<Link
									href={`/products/${item.id}`}
									className="px-4 py-2 bg-gray-200 rounded-lg"
								>
									Open
								</Link>
							</div>
						</div>
					))}
				</div>

				<div className="bg-white rounded-xl shadow p-4 flex justify-between items-center">
					<div>
						<div className="text-sm text-gray-500">Total:</div>
						<div className="text-2xl font-bold">${total.toFixed(2)}</div>
					</div>

					<Link
						href="/"
						className="px-6 py-3 bg-blue-600 text-white rounded-lg"
					>
						Continue
					</Link>
				</div>
			</div>
		</div>
	);
}
