import { calculateQuality, calculateSellIn } from "./shared";

// IMPORTANT: DO NOT edit `Item` class
export class Item {
	name: string;
	sellIn: number;
	quality: number;

	// @ts-ignore
	constructor(name, sellIn, quality) {
		this.name = name;
		this.sellIn = sellIn;
		this.quality = quality;
	}
}

export class GildedRose {
	// IMPORTANT: DO NOT edit `items` prop
	items: Array<Item>;

	constructor(items = [] as Array<Item>) {
		this.items = items;
	}

	updateQuality() {
		for (let i = 0; i < this.items.length; i++) {
			const item = this.items[i];

			item.sellIn = calculateSellIn(item.name, item.sellIn);

			item.quality = calculateQuality(item.name, item.sellIn, item.quality);
		}

		return this.items;
	}
}
