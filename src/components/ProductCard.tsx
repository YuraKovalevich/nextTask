import Image from "next/image";
import Link from "next/link";

type Product = {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	description: string;
};

type ProductCardProps = {
	product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
	return (
		<Link
			href={`/products/${product.id}`}
			className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden hover:-translate-y-2"
		>
			<div className="relative overflow-hidden bg-gray-100">
				<div className="flex items-center justify-center">
					<Image
						src={product.thumbnail}
						alt={product.title}
						width={600}
						height={600}
						className="w-64 h-64  group-hover:scale-110 transition-transform duration-500"
					/>
				</div>

				<div className="absolute top-4 right-4">
					<span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
						${product.price}
					</span>
				</div>
			</div>

			<div className="p-6">
				<h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
					{product.title}
				</h3>

				{product.description && (
					<p className="text-gray-600 text-sm mb-4 line-clamp-2">
						{product.description}
					</p>
				)}
			</div>
		</Link>
	);
};

export default ProductCard;
