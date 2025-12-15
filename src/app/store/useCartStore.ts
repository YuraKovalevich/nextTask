import { create } from "zustand/react";
import type { Product } from "@/src/app/types/product";

export type CartProduct = {
	id: number;
	thumbnail: string;
	title: string;
	price: number;
	quantity: number;
};

type AddToCart = Omit<Product, "category" | "description" | "rating">;

type CartStore = {
	cart: CartProduct[];
	addToCart: (item: AddToCart) => void;
	removeFromCart: (id: number) => void;
	increaseQuantity: (id: number) => void;
	decreaseQuantity: (id: number) => void;
	productInCart: (id: number) => boolean;
	clearCart: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
	cart: [],

	addToCart: (product) => {
		set((state) => {
			const existing = state.cart.find((item) => item.id === product.id);

			if (existing) {
				return {
					cart: state.cart.map((item) =>
						item.id === product.id
							? { ...item, quantity: item.quantity + 1 }
							: item,
					),
				};
			}

			const newItem: CartProduct = { ...product, quantity: 1 };
			return { cart: [...state.cart, newItem] };
		});
	},

	removeFromCart: (id) =>
		set((state) => ({
			cart: state.cart.filter((item) => item.id !== id),
		})),

	increaseQuantity: (id) =>
		set((state) => ({
			cart: state.cart.map((item) =>
				item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
			),
		})),

	decreaseQuantity: (id) =>
		set((state) => ({
			cart: state.cart
				.map((item) =>
					item.id === id ? { ...item, quantity: item.quantity - 1 } : item,
				)
				.filter((item) => item.quantity > 0),
		})),

	productInCart: (id) => get().cart.some((item) => item.id === id),

	clearCart: () => set({ cart: [] }),
}));
