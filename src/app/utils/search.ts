export type SearchParamsShape = {
	[key: string]: string | string[] | undefined;
};

export function normalizeSearchParams(
	raw?: SearchParamsShape | Promise<SearchParamsShape>,
): Promise<SearchParamsShape | undefined> {
	if (!raw) return Promise.resolve(undefined);
	if (raw instanceof Promise) return raw;
	return Promise.resolve(raw);
}

export function parsePage(searchParams?: SearchParamsShape): number {
	const rawPage = searchParams?.page;

	if (typeof rawPage === "string") {
		const pageNumber = Number(rawPage);
		return Number.isFinite(pageNumber) && pageNumber > 0
			? Math.floor(pageNumber)
			: 1;
	}

	if (Array.isArray(rawPage) && rawPage.length > 0) {
		const pageNumber = Number(rawPage[0]);
		return Number.isFinite(pageNumber) && pageNumber > 0
			? Math.floor(pageNumber)
			: 1;
	}

	return 1;
}
