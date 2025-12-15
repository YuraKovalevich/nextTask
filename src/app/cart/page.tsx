"use client";
import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/src/app/store/useCartStore";
import CartItem from "@/src/components/CartItem";

const CartPage = () => {
	const {
		cart,
		removeFromCart,
		increaseQuantity,
		decreaseQuantity,
		clearCart,
	} = useCartStore((state) => state);

	const [showNotification, setShowNotification] = useState(false);

	const totalPrice = cart.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0,
	);

	const handleShowNotification = (): void => {
		setShowNotification(true);
		clearCart();
	};
	if (showNotification) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center p-6">
				<div className="w-full max-w-lg">
					<div className="p-4 bg-green-100 text-green-800 border border-green-300 rounded-lg text-center animate-fadeIn">
						<p className="text-gray-600 mb-4">
							Your order has been successfully placed!
						</p>
					</div>

					<div className="mt-6 flex justify-center gap-4">
						<Link
							href="/"
							className="px-6 py-2 bg-blue-600 text-white rounded-lg"
						>
							Continue shopping
						</Link>
					</div>
				</div>
			</div>
		);
	}
	if (!cart.length) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center p-6">
				<h1 className="text-2xl font-bold mb-4">Your cart is empty.</h1>
				<Link href="/" className="px-6 py-2 bg-blue-600 text-white rounded-lg">
					Return to Store
				</Link>
			</div>
		);
	}

	return (
		<div className="min-h-screen bg-gray-50 px-4 py-10">
			<div className="max-w-3xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold mb-6">Cart</h1>
				<div className="space-y-4">
					{cart.map((item) => (
						<CartItem
							key={item.id}
							productId={item.id}
							productImage={item.thumbnail}
							productTitle={item.title}
							productPrice={item.price}
							productQuantity={item.quantity}
							removeFromCart={removeFromCart}
							increaseQuantity={increaseQuantity}
							decreaseQuantity={decreaseQuantity}
						/>
					))}
				</div>

				<div className="bg-white rounded-xl shadow p-6 flex justify-between items-center">
					<p className="text-xl font-semibold">
						Total:{" "}
						<span className="text-blue-600">${totalPrice.toFixed(2)}</span>
					</p>

					<button
						type="button"
						onClick={handleShowNotification}
						className="cursor-pointer px-6 py-3 bg-green-600 text-white rounded-lg"
					>
						Checkout
					</button>
				</div>
			</div>
		</div>
	);
};

export default CartPage;
