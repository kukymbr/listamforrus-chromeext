"use strict";

class PriceRates {

    // TODO: load rates from somewhere

    /**
     * @type {Object.<number>}
     * @private
     */
    rubRates = {}

    constructor() {
        this.rubRates[CURRENCY_RUB] = 1
        this.rubRates[CURRENCY_AMD] = 0.2
        this.rubRates[CURRENCY_USD] = 75
    }

    /**
     * @returns {Object<number>}
     */
    getRUBRates() {
        return this.rubRates
    }
}