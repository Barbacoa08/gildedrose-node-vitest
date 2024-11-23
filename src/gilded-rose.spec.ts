import { expect, describe, it } from "vitest";

import { Item, GildedRose } from "./gilded-rose";

describe("Gilded Rose", () => {
	it("should foo", () => {
		const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
		const items = gildedRose.updateQuality();
		expect(items[0].name).toBe("fixme");
	});

	// shared specs
	// after sell by date (`sellIn` < 0), quality degrades 2x
	// quality >= 0 ALWAYS (never negative)
	// quality <= 50 ALWAYS (except Sulfuras)

	// unique specs

	// aged brie increases in quality as it ages (UNSURE HOW TO HANDLE)
	// Sulfuras is unique. quality is 80 always. is legendary. has no `sellIn`

	// backstage passes increase in quality until `SellIn` arrives IS UNIQUE
	// - quality += 3, if `SellIn` <= 5
	// - quality += 2, else if `SellIn` <= 10
	// - quality = 0, if `SellIn` <= 0

	// NEW ITEMS specs

	// conjured items degrade in quality twice as fast as normal items
});
