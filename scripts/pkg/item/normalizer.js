"use strict";

class ItemNormalizer {

    /**
     * @type {PriceNormalizer}
     * @private
     */
    priceNormalizer;

    /**
     * @type {Settings}
     * @private
     */
    settings;

    /**
     * @param {PriceNormalizer} priceNormalizer
     * @param {Settings} settings
     */
    constructor(priceNormalizer, settings) {
        this.priceNormalizer = priceNormalizer
        this.settings = settings
    }

    /**
     * @param {Item} item
     */
    normalize(item) {
        this.applyStyles(item)

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

    /**
     * @param {Item} item
     * @private
     */
    applyStyles(item) {
        if (item.isValid()) {
            if (item.getType() === ITEM_TYPE_SIDEBAR) {
                if (this.settings.showMoreSimilar) {
                    item.getItemElement().setAttribute("style", "display:flex !important")
                }
            }
        } else {
            if (this.settings.tintItemsWithoutPrice) {
                item.getItemElement().style.opacity = ".5"
            }
        }
    }
}