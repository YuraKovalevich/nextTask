import { describe, expect, it } from "vitest";
import { buildPageRange } from "./pagination";

describe("buildPageRange", () => {
	it("returns the sequence 1 to total if total less visible", () => {
		const result = buildPageRange(1, 5, 7);
		expect(result).toEqual([1, 2, 3, 4, 5]);
	});

	it("inserts periods on both sides with the current page in the middle", () => {
		const result = buildPageRange(5, 10, 7);
		expect(result).toEqual([1, "dots", 3, 4, 5, 6, 7, "dots", 10]);
	});

	it("does not insert left dots if leftBound equal 2 ", () => {
		const result = buildPageRange(2, 10, 7);
		expect(result).toEqual([1, 2, 3, 4, "dots", 10]);
	});

	it("does not insert right dots if rightBound equal total - 1 ", () => {
		const result = buildPageRange(9, 10, 7);
		expect(result).toEqual([1, "dots", 7, 8, 9, 10]);
	});
});
