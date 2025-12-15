import Image from "next/image";
import { memo } from "react";

type CartItemProps = {
	productId: number;
	productImage: string;
	productTitle: string;
	productPrice: number;
	productQuantity: number;
	removeFromCart: (id: number) => void;
	increaseQuantity: (id: number) => void;
	decreaseQuantity: (id: number) => void;
};

const CartItem = memo(
	({
		productId,
		productImage,
		productTitle,
		productPrice,
		productQuantity,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
	}: CartItemProps) => {
		return (
			<div className="flex items-center justify-between bg-white rounded-xl shadow p-4 w-full">
				<div className="flex items-center space-x-4">
					<Image
						src={productImage}
						alt={productTitle}
						width={600}
						height={600}
						className="w-20 h-20 object-cover rounded-lg"
					/>

					<div>
						<h2 className="text-lg font-semibold">{productTitle}</h2>
						<p className="text-gray-600">${productPrice}</p>
					</div>
				</div>

				<div className="flex items-center space-x-4">
					<div className="flex items-center space-x-2">
						<button
							type="button"
							onClick={() => decreaseQuantity(productId)}
							className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
						>
							-
						</button>

						<span className="text-lg font-semibold">{productQuantity}</span>

						<button
							type="button"
							onClick={() => increaseQuantity(productId)}
							className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
						>
							+
						</button>
					</div>

					<button
						type="button"
						onClick={() => removeFromCart(productId)}
						className="text-red-500 hover:text-red-700 font-semibold cursor-pointer"
					>
						Remove
					</button>
				</div>
			</div>
		);
	},
);

export default CartItem;
