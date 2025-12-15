import type { SearchParamsShape } from "./search";

const DEFAULT_VISIBLE = 7;
const SIDES = 2;

export function buildPageRange(
	current: number,
	total: number,
	visible = DEFAULT_VISIBLE,
): (number | "dots")[] {
	if (total <= visible)
		return Array.from({ length: total }, (_, index) => index + 1);

	const pages: (number | "dots")[] = [1];
	const leftBound = Math.max(2, current - SIDES);
	const rightBound = Math.min(total - 1, current + SIDES);

	if (leftBound > 2) pages.push("dots");

	for (let i = leftBound; i <= rightBound; i++) pages.push(i);

	if (rightBound < total - 1) pages.push("dots");

	pages.push(total);
	return pages;
}

export function buildHref(
	page: number,
	searchParams?: SearchParamsShape,
): string {
	const queryParams = new URLSearchParams();

	if (searchParams) {
		for (const [key, value] of Object.entries(searchParams)) {
			if (key === "page" || value == null) continue;
			if (Array.isArray(value))
				for (const item of value) {
					queryParams.append(key, item);
				}
			else queryParams.set(key, value);
		}
	}

	queryParams.set("page", String(page));
	return `/?${queryParams.toString()}`;
}
