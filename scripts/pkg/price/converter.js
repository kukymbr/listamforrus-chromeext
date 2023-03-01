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
        const rates = this.rates.getRUBRates()
        let rate = rates[price.getCurrency()]
        if (!rate) {
            rate = 0;
        }

        return new Price(
            price.getValue() * rate,
            CURRENCY_RUB,
            price.getPeriod()
        )
    }
}