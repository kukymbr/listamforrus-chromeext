"use strict";

class PriceConverter {

    /**
     * @type {PriceRates}
     */
    rates;

    /**
     * @param {PriceRates} rates
     */
    constructor(rates) {
        this.rates = rates
    }

    /**
     * @param {Price} price
     * @returns {Price}
     */
    convertToRUB(price) {
        const rate = this.rates.getRUBRate(price.getCurrency())

        return new Price(
            price.getValue() * rate,
            CURRENCY_RUB,
            price.getPeriod()
        )
    }
}