"use client";

import { memo } from "react";
import { useCartStore } from "@/src/app/store/useCartStore";
import { useFavoriteStore } from "@/src/app/store/useFavoriteStore";
import type { Product } from "@/src/app/types/product";

type Props = { product: Product };

const CartButton = memo(({ product }: Props) => {
	const { addToCart, removeFromCart } = useCartStore();
	const { addToFavorite, removeFromFavorite } = useFavoriteStore();

	const inCart = useCartStore((state) =>
		state.cart.some((item) => item.id === product.id),
	);

	const favorite = useFavoriteStore((state) =>
		state.favorites.some((item) => item.id === product.id),
	);

	return (
		<div className="flex items-center gap-3">
			{inCart ? (
				<button
					type="button"
					onClick={() => removeFromCart(product.id)}
					className="cursor-pointer bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
				>
					Remove from Cart
				</button>
			) : (
				<button
					type="button"
					onClick={() =>
						addToCart({
							id: product.id,
							thumbnail: product.thumbnail,
							title: product.title,
							price: product.price,
						})
					}
					className="cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
				>
					Add To Cart
				</button>
			)}

			{favorite ? (
				<button
					type="button"
					onClick={() => removeFromFavorite(product.id)}
					className="cursor-pointer bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-900"
				>
					♥
				</button>
			) : (
				<button
					type="button"
					onClick={() =>
						addToFavorite({
							id: product.id,
							thumbnail: product.thumbnail,
							title: product.title,
							price: product.price,
						})
					}
					className="cursor-pointer border border-gray-300 px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-gray-100"
				>
					♡
				</button>
			)}
		</div>
	);
});

export default CartButton;
