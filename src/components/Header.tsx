import Link from "next/link";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
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

						<div className="hidden items-center gap-6 md:flex">
							<Link
								href="/categories"
								className="text-sm font-medium text-gray-700 transition-colors hover:text-indigo-600"
							>
								Categories
							</Link>
						</div>
					</div>

					<div className="hidden flex-1 max-w-md px-8 lg:block">
						<div className="relative">
							<IoSearchOutline className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
							<input
								type="search"
								placeholder="Search products..."
								className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm focus:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-indigo-200"
							/>
						</div>
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
							<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-100 text-xs font-medium text-indigo-600">
								42
							</span>
						</Link>

						<Link
							href="/cart"
							className="relative rounded-lg p-2 hover:bg-gray-100"
							aria-label="Shopping cart"
						>
							<FaShoppingCart className="h-5 w-5 text-gray-600" />
							<span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-600 text-xs font-medium text-white">
								42
							</span>
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
