import { expect, describe, it } from "vitest";

import { Item, GildedRose } from "./gilded-rose";
import { ConjuredName } from "./shared";

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

		it("reduces quality by 1 when `sellIn` >= 0", () => {
			const gildedRose = new GildedRose([
				new Item(mock.name, mock.sellIn, mock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(mock.quality - 1);
		});

		it("reduces quality by 2 when `sellIn` === 0", () => {
			const gildedRose = new GildedRose([new Item(mock.name, 0, mock.quality)]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(mock.quality - 2);
		});

		it("reduces quality by 2 when `sellIn` < 0", () => {
			const gildedRose = new GildedRose([
				new Item(mock.name, -4, mock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(mock.quality - 2);
		});

		it("does not reduce quality when it is 0", () => {
			const gildedRose = new GildedRose([new Item(mock.name, mock.sellIn, 0)]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(0);
		});

		it("reduces `quality` to 49 if it started >50", () => {
			const gildedRose = new GildedRose([
				new Item(mock.name, mock.sellIn, 100),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(49);
		});
	});

	describe("`Backstage passes` tests", () => {
		const backstageMock: Item = {
			name: "Backstage passes to a TAFKAL80ETC concert",
			sellIn: 30,
			quality: 10,
		};

		it("increase quality by 1 when `sellIn` is >10", () => {
			const gildedRose = new GildedRose([
				new Item(backstageMock.name, 200, backstageMock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(backstageMock.quality + 1);
		});

		it("increase quality by 2 when `sellIn` is <=10", () => {
			const gildedRose = new GildedRose([
				new Item(backstageMock.name, 10, backstageMock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(backstageMock.quality + 2);
		});

		it("increase quality by 3 when `sellIn` is <=5", () => {
			const gildedRose = new GildedRose([
				new Item(backstageMock.name, 5, backstageMock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(backstageMock.quality + 3);
		});

		it("quality is set to 0 when `sellIn` <= 0", () => {
			const gildedRose = new GildedRose([
				new Item(backstageMock.name, 0, backstageMock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(0);
		});

		it("quality is not changed when it is 50", () => {
			const gildedRose = new GildedRose([new Item(backstageMock.name, 2, 50)]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(50);
		});

		it("quality is set to 50 when it starts at 49, even when it is the day of the concert", () => {
			const gildedRose = new GildedRose([new Item(backstageMock.name, 1, 49)]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(50);
		});
	});

	describe("`Aged Brie` tests", () => {
		const agedBrieMock: Item = {
			name: "Aged Brie",
			sellIn: 30,
			quality: 10,
		};

		it("increases quality by 1", () => {
			const gildedRose = new GildedRose([
				new Item(agedBrieMock.name, agedBrieMock.sellIn, agedBrieMock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(agedBrieMock.quality + 1);
		});

		it("increases quality by 2, when `sellIn` is negative", () => {
			const gildedRose = new GildedRose([
				new Item(agedBrieMock.name, -1, agedBrieMock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].sellIn).toBe(-2);
			expect(gildedRose.items[0].quality).toBe(agedBrieMock.quality + 2);
		});

		it("quality does not increase above 50", () => {
			const gildedRose = new GildedRose([
				new Item(agedBrieMock.name, agedBrieMock.sellIn, 50),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(50);
		});
	});

	describe("Sulfuras tests", () => {
		const sulfurasMock: Item = {
			name: "Sulfuras, Hand of Ragnaros",
			sellIn: 30,
			quality: 80,
		};

		it("does not update `sellIn` value", () => {
			const gildedRose = new GildedRose([
				new Item(sulfurasMock.name, sulfurasMock.sellIn, sulfurasMock.quality),
			]);
			const updatedItems = gildedRose.updateQuality();

			expect(updatedItems[0].sellIn).toBe(sulfurasMock.sellIn);
		});

		it("quality does not change and is always 80", () => {
			const gildedRose = new GildedRose([
				new Item(sulfurasMock.name, sulfurasMock.sellIn, sulfurasMock.quality),
			]);
			const updatedItems = gildedRose.updateQuality();

			expect(updatedItems[0].quality).toBe(80);
		});
	});

	// ASSUMPTIONS: existing special items are not conjurable (Sulfuras, Aged Brie, Backstage passes)
	describe("`Conjured` tests (degrades twice as quickly)", () => {
		const conjuredMock: Item = {
			name: `${ConjuredName} stick`,
			sellIn: 30,
			quality: 50,
		};

		it("reduces quality by 2 when `sellIn` >= 0", () => {
			const gildedRose = new GildedRose([
				new Item(conjuredMock.name, 10, conjuredMock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(conjuredMock.quality - 2);
		});

		it("reduces quality by 4 when `sellIn` === 0", () => {
			const gildedRose = new GildedRose([
				new Item(conjuredMock.name, 0, conjuredMock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(conjuredMock.quality - 4);
		});

		it("reduces quality by 4 when `sellIn` < 0", () => {
			const gildedRose = new GildedRose([
				new Item(conjuredMock.name, -3, conjuredMock.quality),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(conjuredMock.quality - 4);
		});

		it("does not reduce quality when it is 0", () => {
			const gildedRose = new GildedRose([
				new Item(conjuredMock.name, mock.sellIn, 0),
			]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(0);
		});

		it("sets quality to 0 when `sellIn` is > 0 and `quality` is 1", () => {
			const gildedRose = new GildedRose([new Item(conjuredMock.name, 10, 1)]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(0);
		});

		it("sets quality to 0 when `sellIn` is < 0 and `quality` is 1", () => {
			const gildedRose = new GildedRose([new Item(conjuredMock.name, -4, 1)]);
			gildedRose.updateQuality();

			expect(gildedRose.items[0].quality).toBe(0);
		});
	});
});
