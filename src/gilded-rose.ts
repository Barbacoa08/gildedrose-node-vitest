import { ConjuredString, ReduceItemQuality } from "./shared";

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

/* TODO:
	1) make unit tets
	2) make touchups (break out magic strings and numbers)
	3) make shared file for magic consts
	4) decide on next actions (rewrite? simplify one chunk of `if`s at a time?)
*/

export class GildedRose {
	// IMPORTANT: DO NOT edit `items` prop
	items: Array<Item>;

	constructor(items = [] as Array<Item>) {
		this.items = items;
	}

	updateQuality() {
		for (let i = 0; i < this.items.length; i++) {
			if (
				this.items[i].name !== "Aged Brie" &&
				this.items[i].name !== "Backstage passes to a TAFKAL80ETC concert"
			) {
				if (this.items[i].quality > 0) {
					if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
						this.items[i].quality = ReduceItemQuality(
							this.items[i].name,
							this.items[i].quality,
						);
					}
				}
			} else {
				if (this.items[i].quality < 50) {
					this.items[i].quality = this.items[i].quality + 1;
					if (
						this.items[i].name === "Backstage passes to a TAFKAL80ETC concert"
					) {
						if (this.items[i].sellIn < 11) {
							if (this.items[i].quality < 50) {
								this.items[i].quality = this.items[i].quality + 1;
							}
						}
						if (this.items[i].sellIn < 6) {
							if (this.items[i].quality < 50) {
								this.items[i].quality = this.items[i].quality + 1;
							}
						}
					}
				}
			}

			if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
				this.items[i].sellIn = this.items[i].sellIn - 1;
			}

			if (this.items[i].sellIn < 0) {
				if (this.items[i].name !== "Aged Brie") {
					if (
						this.items[i].name !== "Backstage passes to a TAFKAL80ETC concert"
					) {
						if (this.items[i].quality > 0) {
							if (this.items[i].name !== "Sulfuras, Hand of Ragnaros") {
								this.items[i].quality = ReduceItemQuality(
									this.items[i].name,
									this.items[i].quality,
								);
							}
						}
					} else {
						// set backtage passes to zero when the concert has passed
						this.items[i].quality =
							this.items[i].quality - this.items[i].quality;
					}
				} else {
					if (this.items[i].quality < 50) {
						this.items[i].quality = this.items[i].quality + 1;
					}
				}
			}
		}

		return this.items;
	}
}
