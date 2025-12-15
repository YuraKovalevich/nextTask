import {
	normalizeSearchParams,
	parsePage,
	type SearchParamsShape,
} from "@/src/app/utils/search";
import Pagination from "@/src/components/Pagination";
import ProductCard from "@/src/components/ProductCard";

type Product = {
	id: number;
	title: string;
	price: number;
	thumbnail: string;
	description: string;
};

type ProductResponse = {
	products: Product[];
	total: number;
	skip: number;
	limit: number;
};

type Props = {
	searchParams?: SearchParamsShape | Promise<SearchParamsShape> | undefined;
};

export default async function Home(props: Props) {
	const searchParams = await normalizeSearchParams(props.searchParams);
	const currentPage = parsePage(searchParams);

	const ITEMS_PER_PAGE = 9;
	const skip = (currentPage - 1) * ITEMS_PER_PAGE;

	const res = await fetch(
		`https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${skip}`,
		{ next: { revalidate: 60 } },
	);

	if (!res.ok) {
		throw new Error(`Products fetch failed: ${res.status} ${res.statusText}`);
	}

	const data: ProductResponse = await res.json();
	const products = data.products ?? [];
	const totalPages = Math.max(1, Math.ceil(data.total / ITEMS_PER_PAGE));

	return (
		<main className="container mx-auto px-4 py-8">
			<header className="mb-12 text-center">
				<h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
					Welcome to <span className="text-indigo-600">MyStore</span>
				</h1>
			</header>

			<section className="mb-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{products.map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section>

			<Pagination
				currentPage={currentPage}
				totalPages={totalPages}
				searchParams={searchParams}
			/>
		</main>
	);
}
