import Link from "next/link";
import { buildHref, buildPageRange } from "@/src/app/utils/pagination";
import type { SearchParamsShape } from "@/src/app/utils/search";

type Props = {
	currentPage: number;
	totalPages: number;
	searchParams?: SearchParamsShape;
};

export default function Pagination({
	currentPage,
	totalPages,
	searchParams,
}: Props) {
	if (totalPages <= 1) return null;

	const pages = buildPageRange(currentPage, totalPages);

	return (
		<nav
			aria-label="Pagination"
			className="flex items-center justify-center gap-2 mt-12"
		>
			<Link
				href={buildHref(Math.max(1, currentPage - 1), searchParams)}
				className={`px-3 py-1 rounded border ${currentPage === 1 ? "opacity-50 pointer-events-none" : ""}`}
				aria-disabled={currentPage === 1}
			>
				Prev
			</Link>

			{pages.map((page, index) =>
				page === "dots" ? (
					<span
						key={`dots-${index}-${currentPage}`}
						className="px-2 text-gray-500 select-none"
					>
						…
					</span>
				) : (
					<Link
						key={page}
						href={buildHref(page, searchParams)}
						aria-current={page === currentPage ? "page" : undefined}
						className={`px-3 py-1 rounded border ${page === currentPage ? "bg-indigo-600 text-white" : "hover:bg-gray-50"}`}
						aria-label={
							page === currentPage
								? `Page ${page}, current`
								: `Go to page ${page}`
						}
					>
						{page}
					</Link>
				),
			)}

			<Link
				href={buildHref(Math.min(totalPages, currentPage + 1), searchParams)}
				className={`px-3 py-1 rounded border ${currentPage === totalPages ? "opacity-50 pointer-events-none" : ""}`}
				aria-disabled={currentPage === totalPages}
			>
				Next
			</Link>
		</nav>
	);
}
