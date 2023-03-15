"use strict";

class PriceRates {

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

    /**
     * @param {string} currency
     * @return {number}
     */
    getRUBRate(currency) {
        return this.rubRates[currency] !== undefined ? this.rubRates[currency] : 0
    }

    /**
     * @param {string} currency
     * @param {number} rate
     */
    setRUBRate(currency, rate) {
        this.rubRates[currency] = rate
    }
}