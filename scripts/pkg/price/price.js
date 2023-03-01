"use strict";

class Price {
    /**
     * @type {number}
     * @private
     */
    value;

    /**
     * @type {string}
     * @private
     */
    currency;

    /**
     * @type string
     * @private
     */
    period;

    /**
     * @param {number} value
     * @param {string} currency
     * @param {string} [period]
     */
    constructor(value, currency, period) {
        this.value = value
        this.currency = currency
        if (PERIODS.includes(period)) {
            this.period = period
        } else {
            this.period = ""
        }
    }

    /**
     * @return {number}
     */
    getValue() {
        return this.value
    }

    /**
     * @return {string}
     */
    getCurrency() {
        return this.currency
    }

    /**
     * @returns {string}
     */
    getPeriod() {
        return this.period
    }

    /**
     * @returns {boolean}
     */
    isPeriodValid() {
        return this.period !== ""
    }

    /**
     * @returns {boolean}
     */
    isNormalized() {
        return this.getCurrency() === CURRENCY_RUB && (!this.isPeriodValid() || this.getPeriod() === PERIOD_MONTH)
    }

    toString() {
        let priceFmt = this.getValue().toString(10)
        priceFmt = priceFmt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, THOUSAND_SEPARATOR)
        priceFmt = priceFmt + " " + getCurrencyLabel(this.currency)

        if (this.isPeriodValid()) {
            priceFmt += " в " + this.getPeriod()
        }

        return priceFmt
    }
}

/**
 * Parses price string
 *
 * Input options:
 *  1000 ֏
 *  1000 ֏ в день
 *  $1000
 *  $1000 в месяц
 *  1000 $
 *  1000 $ в месяц
 *
 * @param {string} inp
 * @return {Price|null}
 */
function parsePriceString(inp) {
    let currency = null

    inp = inp.replace(" в ", " ")

    let matches = inp.split(" ")
    if (!matches) {
        console.debug("failed to parse rent item (price matches): ", inp, matches)
        return null
    }

    let priceStr = matches.shift().replaceAll(",", "")

    if (priceStr.substring(0, 1) === CURRENCIES_LABELS[CURRENCY_USD]) {
        currency = CURRENCY_USD
        priceStr = priceStr.substring(1)
    } else {
        let currencyLabel = matches.shift()
        currency = currencyFromLabel(currencyLabel)
        if (!currency) {
            console.debug("failed to parse rent item (price currency): ", inp, currencyLabel)
            return null
        }
    }

    let price = parseInt(priceStr, 10)
    if (isNaN(price)) {
        console.debug("failed to parse rent item (price number): ", inp, priceStr)
        return null
    }

    let period = matches.shift()

    return new Price(price, currency, period)
}

/**
 * @param {string} currency
 * @returns {string}
 */
function getCurrencyLabel(currency) {
    let label = CURRENCIES_LABELS[currency]
    if (!label) {
        label = currency
    }

    return label
}

/**
 * @param {string} label
 * @returns {string|null}
 */
function currencyFromLabel(label) {
    for (const curr in CURRENCIES_LABELS) {
        if (label === CURRENCIES_LABELS[curr]) {
            return curr
        }
    }

    return null
}