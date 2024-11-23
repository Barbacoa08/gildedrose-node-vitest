import { expect, describe, it } from "vitest";

import { Item, GildedRose } from "./gilded-rose";

const sulfuras = {
	name: "Sulfuras, Hand of Ragnaros",
	quality: 80,
};

describe("Gilded Rose", () => {
	const mock: Item = {
		name: "mock",
		sellIn: 20,
		quality: 20,
	};

	it("allows empty array", () => {
		const gildedRose = new GildedRose([]);
		gildedRose.updateQuality();
		expect(gildedRose.items).toHaveLength(0);
	});

	it("allows single item in array", () => {
		const gildedRose = new GildedRose([
			new Item(mock.name, mock.sellIn, mock.quality),
		]);
		gildedRose.updateQuality();

		expect(gildedRose.items).toHaveLength(1);
	});

	it("allows multiple items in the array", () => {
		const gildedRose = new GildedRose([
			new Item(mock.name, mock.sellIn, mock.quality),
			new Item(mock.name, mock.sellIn, mock.quality),
		]);
		gildedRose.updateQuality();

		expect(gildedRose.items).toHaveLength(2);
	});

	describe("regular item tests", () => {
		it("reduces `sellIn` by 1, always (except for Sulfuras)", () => {
			const gildedRose = new GildedRose([
				new Item(mock.name, mock.sellIn, mock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].sellIn).toBe(mock.sellIn - 1);
		});

		it.skip("reduces `sellIn` to 49 if it started >50", () => {});
		it.skip("reduces quality by 1 when `sellIn` >= 0", () => {});
		it.skip("reduces quality by 2 when `sellIn` < 0", () => {});
		it.skip("does not reduce quality below 0", () => {});
		it.skip("throws an error if given an item with quality >50", () => {});
	});

	describe("`Backstage passes` tests", () => {
		it.skip("increase quality by 1 when `sellIn` is >10", () => {});
		it.skip("increase quality by 2 when `sellIn` is <=10", () => {});
		it.skip("increase quality by 3 when `sellIn` is <=5", () => {});
		it.skip("quality is 0 when `sellIn` < 0", () => {});
	});

	describe("`Aged Brie` tests", () => {
		it.skip("increases quality by 1", () => {}); // TODO: is that really all?
		it.skip("quality does not increase above 50", () => {});
	});

	describe("Sulfuras tests", () => {
		it("does not update `sellIn` value", () => {
			const initialSellIn = 30;

			const gildedRose = new GildedRose([
				new Item(sulfuras.name, initialSellIn, sulfuras.quality),
			]);
			const updatedItems = gildedRose.updateQuality();

			expect(updatedItems[0].name).toBe(sulfuras.name);
			expect(updatedItems[0].sellIn).toBe(initialSellIn);
			expect(updatedItems[0].quality).toBe(sulfuras.quality);
		});

		it.skip("quality does not change and is always 80");
	});

	// describe("`Conjured` tests", () => {});
	// conjured items degrade in quality twice as fast as normal items
	// ASSUMPTIONS: existing special items are not conjurable (Sulfuras, Aged Brie, Backstage passes)
});
