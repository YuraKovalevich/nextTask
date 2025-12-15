import { memo } from "react";

type Props = { rating: number };

const Rating = memo(({ rating }: Props) => {
	const rounded = Math.round(rating);
	return (
		<div className="flex items-center gap-2">
			<div className="flex text-yellow-400">
				{"★".repeat(rounded)}
				{"☆".repeat(5 - rounded)}
			</div>
			<span className="text-gray-600">{rating}/5</span>
		</div>
	);
});

export default Rating;
