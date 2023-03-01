"use strict";

class ItemNormalizer {

    /**
     * @type {PriceNormalizer}
     * @private
     */
    priceNormalizer;

    /**
     * @param {PriceNormalizer} priceNormalizer
     */
    constructor(priceNormalizer) {
        this.priceNormalizer = priceNormalizer
    }

    /**
     * @param {Item} item
     */
    normalize(item) {
        if (!item.isValid()) {
            return
        }

        let price = item.getPrice()
        if (!price.isNormalized()) {
            price = this.priceNormalizer.normalize(price)
            item.setPrice(price)
        }
    }

    /**
     * @param {Array.<Item>} items
     */
    normalizeItems(items) {
        if (!items) {
            return
        }

        for (let i = 0; i < items.length; i++) {
            this.normalize(items[i])
        }
    }
}