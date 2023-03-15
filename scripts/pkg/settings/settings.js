"use strict";

class Settings {

    /**
     * @type {boolean}
     */
    tintItemsWithoutPrice = true

    /**
     * @type {boolean}
     */
    showMoreSimilar = true

    /**
     * @type {PriceRates}
     */
    rates;

    constructor() {
        this.rates = new PriceRates()
    }

    /**
     * @return {Object.<any>}
     */
    toObject() {
        return {
            "dislike_no_price": this.tintItemsWithoutPrice,
            "more_similar": this.showMoreSimilar,
            "rate_usd_rub": this.rates.getRUBRate(CURRENCY_USD),
            "rate_amd_rub": this.rates.getRUBRate(CURRENCY_AMD),
        }
    }

    /**
     * @param {Object.<any>} data
     */
    setFromObject(data) {
        let val;

        val = data["dislike_no_price"]
        if (val !== undefined) {
            this.tintItemsWithoutPrice = !!val
        }

        val = data["more_similar"]
        if (val !== undefined) {
            this.showMoreSimilar = !!val
        }

        this.rates.setRUBRate(
            CURRENCY_USD,
            this._readRate(data["rate_usd_rub"], this.rates.getRUBRate(CURRENCY_USD))
        )

        this.rates.setRUBRate(
            CURRENCY_AMD,
            this._readRate(data["rate_amd_rub"], this.rates.getRUBRate(CURRENCY_AMD))
        )
    }

    /**
     * @param {string} val
     * @param {number} dft
     * @private
     */
    _readRate(val, dft) {
        if (!val) {
            return dft
        }

        const num = parseFloat(val)
        if (isNaN(num) || val <= 0) {
            return dft
        }

        return num
    }
}