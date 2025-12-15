import { create } from "zustand/react";
import type { Product } from "@/src/app/types/product";

export type FavoriteProduct = Pick<
	Product,
	"id" | "thumbnail" | "title" | "price"
>;

type FavoriteStore = {
	favorites: FavoriteProduct[];
	addToFavorite: (product: FavoriteProduct) => void;
	removeFromFavorite: (id: number) => void;
	isFavorite: (id: number) => boolean;
};

export const useFavoriteStore = create<FavoriteStore>((set, get) => ({
	favorites: [],

	addToFavorite: (product) =>
		set((state) => {
			if (state.favorites.some((item) => item.id === product.id)) return state;
			return { favorites: [...state.favorites, product] };
		}),

	removeFromFavorite: (id) =>
		set((state) => ({
			favorites: state.favorites.filter((item) => item.id !== id),
		})),

	isFavorite: (id) => get().favorites.some((item) => item.id === id),
}));
