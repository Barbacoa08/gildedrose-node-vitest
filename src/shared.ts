export const ConjuredString = "Conjured";

export const ReduceItemQuality = (name: string, quality: number) => {
	const newQuality = name.startsWith(ConjuredString)
		? quality - 2
		: quality - 1;
	return Math.max(0, newQuality);
};
