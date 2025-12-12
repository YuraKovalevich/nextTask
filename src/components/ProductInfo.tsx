import { memo } from "react";
import type { Product } from "@/src/app/types/product";
import CartButton from "./CartButton";
import Rating from "./Rating";

type Props = {
	product: Product;
};

const ProductInfo = memo(({ product }: Props) => {
	return (
		<div className="md:w-1/2 p-8">
			<div className="mb-6">
				<div className="flex items-center gap-4 mb-4">
					<span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
						${product.price}
					</span>
				</div>

				<h1 className="text-3xl font-bold text-gray-800 mb-2">
					{product.title}
				</h1>
				<p className="text-gray-500 mb-4">{product.category}</p>

				<Rating rating={product.rating} />
			</div>

			<div className="mb-8">
				<h2 className="text-xl font-semibold text-gray-700 mb-3">
					Description
				</h2>
				<p className="text-gray-600 leading-relaxed">{product.description}</p>
			</div>

			<div className="flex gap-4">
				<CartButton product={product} />
			</div>
		</div>
	);
});

export default ProductInfo;
