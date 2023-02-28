"use strict";

const CURRENCY_AMD = "AMD"
const CURRENCY_RUB = "RUB"
const CURRENCY_USD = "USD"

let RUB_RATES = {}
RUB_RATES[CURRENCY_RUB] = 1
RUB_RATES[CURRENCY_AMD] = 0.2
RUB_RATES[CURRENCY_USD] = 75

let CURRENCIES_LABELS = {}
CURRENCIES_LABELS[CURRENCY_RUB] = "₽"
CURRENCIES_LABELS[CURRENCY_AMD] = "֏"
CURRENCIES_LABELS[CURRENCY_USD] = "$"

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
     * @param {number} value
     * @param {string} currency
     */
    constructor(value, currency) {
        this.value = value
        this.currency = currency
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
     * Get price in Rubles
     * @return {Price}
     */
    getRUB() {
        let rate = RUB_RATES[this.getCurrency()]
        if (typeof rate === "undefined") {
            rate = 0;
        }

        return new Price(this.getValue() * rate, CURRENCY_RUB)
    }

    toString() {
        let priceFmt = this.getValue().toString(10)
        priceFmt.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")

        return priceFmt + " " + getCurrencyLabel(this.currency)
    }
}

class PriceWithPeriod {

    /**
     * @type {Price}
     * @private
     */
    price;

    /**
     * @type {string}
     * @private
     */
    period;

    constructor(price, period) {
        this.price = price
        this.period = period
    }

    getPrice() {
        return this.price
    }

    getPeriod() {
        return this.period
    }

    toString() {
        return this.price.toString() + " в " + this.period
    }

    /**
     * @returns {boolean}
     */
    isNormalized() {
        return this.getPrice().getCurrency() === CURRENCY_RUB && this.getPeriod() === PERIOD_MONTH
    }

    /**
     * @returns {PriceWithPeriod}
     */
    getNormalized() {
        let price = this.getPrice()
        let period = this.getPeriod()

        if (this.isNormalized()) {
            return this
        }

        price = price.getRUB()

        if (period === PERIOD_DAY) {
            period = PERIOD_MONTH;
            price = new Price(
                price.getValue() * 31,
                price.getCurrency()
            )
        }

        return new PriceWithPeriod(price, period)
    }
}

/**
 * @param {string} inp
 * @return {PriceWithPeriod|null}
 */
function parsePriceWithPeriodString(inp) {
    let currency = null

    let matches = inp.split(" ")
    if (!matches || matches.length < 3) {
        console.warn("failed to parse rent item (price matches): ", inp, matches)
        return null
    }

    let priceStr = matches[0].replaceAll(",", "")
    if (priceStr.substring(0, 1) === CURRENCIES_LABELS[CURRENCY_USD]) {
        currency = CURRENCY_USD
        priceStr = priceStr.substring(1)
    } else if (matches.length < 4) {
        console.warn("failed to parse rent item (price matches, no USD): ", inp, matches)
        return null
    }

    let price = parseInt(priceStr, 10)
    if (isNaN(price)) {
        console.warn("failed to parse rent item (price number): ", inp, priceStr)
        return null
    }

    if (currency === null) {
        let currencyLabel = matches[1]
        currency = currencyFromLabel(currencyLabel)
        if (!currency) {
            console.warn("failed to parse rent item (price currency): ", inp, currencyLabel)
            return null
        }
    }

    let period = matches[matches.length-1]
    if (!PERIODS.includes(period)) {
        console.warn("failed to parse rent item (period): ", inp, period)
        return null
    }

    return new PriceWithPeriod(new Price(price, currency), period)
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