"use client";
import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { useCartStore } from "@/src/app/store/useCartStore";
import { useFavoriteStore } from "@/src/app/store/useFavoriteStore";
import SearchInput from "@/src/components/SearchInput";

const Header = () => {
	const cartCount = useCartStore((state) =>
		state.cart.reduce((accum, item) => accum + item.quantity, 0),
	);
	const favoritesCount = useFavoriteStore((state) => state.favorites.length);

	return (
		<header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<nav className="flex h-16 items-center justify-between">
					<div className="flex items-center gap-8">
						<Link
							href="/"
							className="flex items-center gap-2 text-2xl font-bold text-gray-900 transition-colors hover:text-indigo-600"
						>
							<span>Store</span>
						</Link>
					</div>

					<div className="hidden flex-1 max-w-md px-8 lg:block">
						<SearchInput />
					</div>

					<div className="flex items-center gap-4">
						<Link
							href="/login"
							className="rounded-lg p-2 hover:bg-gray-100"
							aria-label="Account"
						>
							<FaUser className="h-5 w-5 text-gray-600" />
						</Link>

						<Link
							href="/wishlist"
							className="relative rounded-lg p-2 hover:bg-gray-100"
							aria-label="Wishlist"
						>
							<FaHeart className="h-5 w-5 text-gray-600" />
							{favoritesCount !== 0 && (
								<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-600">
									{favoritesCount}
								</span>
							)}
						</Link>

						<Link
							href="/cart"
							className="relative rounded-lg p-2 hover:bg-gray-100"
							aria-label="Shopping cart"
						>
							<FaShoppingCart className="h-5 w-5 text-gray-600" />
							{cartCount !== 0 && (
								<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
									{cartCount}
								</span>
							)}
						</Link>

						<button
							type="button"
							className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
						>
							<div className="space-y-1">
								<div className="h-0.5 w-6 bg-gray-600"></div>
								<div className="h-0.5 w-6 bg-gray-600"></div>
								<div className="h-0.5 w-6 bg-gray-600"></div>
							</div>
						</button>
					</div>
				</nav>
			</div>
		</header>
	);
};

export default Header;
