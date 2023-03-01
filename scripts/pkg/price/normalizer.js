"use strict";

class PriceNormalizer {

    /**
     * @type {Array.<function>}
     * @private
     */
    normalizers = []

    /**
     * @param {PriceConverter} priceConverter
     */
    constructor(priceConverter) {
        this.normalizers = [
            (new PricePeriodNormalizer()).normalize,
            function (price) {
                return priceConverter.convertToRUB(price)
            },
        ]
    }

    /**
     * @param {Price} price
     * @returns {Price}
     */
    normalize(price) {
        for (let i = 0; i < this.normalizers.length; i++) {
            price = this.normalizers[i](price)
        }

        return price
    }
}

class PricePeriodNormalizer {

    /**
     * @param {Price} price
     * @returns {Price}
     */
    normalize(price) {
        let value = price.getValue()
        let period = price.getPeriod()

        if (price.getPeriod() === PERIOD_DAY) {
            value *= 31
            period = PERIOD_MONTH
        }

        return new Price(value, price.getCurrency(), period)
    }
}