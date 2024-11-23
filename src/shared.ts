export const SulfurasQuality = 80;
export const SulfurasName = "Sulfuras, ";
export const AgedBrieName = "Aged Brie";
export const BackstagePassesName = "Backstage passes ";
export const ConjuredName = "Conjured";

// TODO: unit test
export const calculateSellIn = (name: string, sellIn: number) => {
	// Sulfuras' `sellIn` does not change, in every other case it is reduced by 1
	return name.startsWith(SulfurasName) ? sellIn : sellIn - 1;
};

// TODO: unit test
export const calculateQuality = (
	name: string,
	sellIn: number,
	quality: number,
) => {
	if (name.startsWith(SulfurasName)) return SulfurasQuality;

	// non-Sulfuras items cannot be over 50 quality
	let result = Math.min(50, quality);

	if (name.startsWith(AgedBrieName)) {
		result = calculateAgedBrieQuality(sellIn, result);
	} else if (name.startsWith(BackstagePassesName)) {
		result = calculateBackstagePassesQuality(sellIn, result);
	} else if (name.startsWith(ConjuredName)) {
		result = calculateConjuredQuality(sellIn, result);
	} else {
		result = calculateStandardQuality(sellIn, result);
	}

	// restric `result` to be 0->50 (inclusive)
	return Math.max(0, Math.min(50, result));
};

// TODO: unit test
const calculateAgedBrieQuality = (sellIn: number, quality: number) => {
	return sellIn < 0 ? quality + 2 : quality + 1;
};

// TODO: unit test
const calculateBackstagePassesQuality = (sellIn: number, quality: number) => {
	let newQuality = quality;

	if (sellIn < 0) {
		newQuality = 0;
	} else if (sellIn <= 5) {
		newQuality = quality + 3;
	} else if (sellIn <= 10) {
		newQuality = quality + 2;
	} else {
		newQuality = quality + 1;
	}

	return newQuality;
};

// TODO: unit test
const calculateConjuredQuality = (sellIn: number, quality: number) => {
	return sellIn < 0 ? quality - 4 : quality - 2;
};

// TODO: unit test
const calculateStandardQuality = (sellIn: number, quality: number) => {
	return sellIn < 0 ? quality - 2 : quality - 1;
};
