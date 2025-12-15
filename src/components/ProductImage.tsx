import Image from "next/image";
import { memo } from "react";
import type { Product } from "@/src/app/types/product";

type Props = { product: Product };

const ProductImage = memo(({ product }: Props) => {
	return (
		<div className="md:w-1/2 p-8">
			<div className="relative bg-gray-100 rounded-xl overflow-hidden">
				<Image
					src={product.thumbnail}
					alt={product.title}
					width={600}
					height={500}
					className="w-full h-auto object-cover"
				/>
			</div>
		</div>
	);
});

export default ProductImage;
