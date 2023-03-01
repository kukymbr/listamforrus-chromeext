"use strict";

function test_price() {
    test_parsePriceString()
    test_currencyFromLabel()
    test_getCurrencyLabel()
}

function test_parsePriceString() {
    /**
     * 1000 ֏
     *  1000 ֏ в день
     *  $1000
     *  $1000 в месяц
     *  1000 $
     *  1000 $ в месяц
     */

    const tests = [
        {
            input: "1000 ֏",
            expected: new Price(1000, CURRENCY_AMD)
        },
        {
            input: "1000 ֏ в день",
            expected: new Price(1000, CURRENCY_AMD, PERIOD_DAY)
        },
        {
            input: "$1000",
            expected: new Price(1000, CURRENCY_USD)
        },
        {
            input: "$1000 в месяц",
            expected: new Price(1000, CURRENCY_USD, PERIOD_MONTH)
        },
        {
            input: "1000 $",
            expected: new Price(1000, CURRENCY_USD)
        },
        {
            input: "1000 $ в месяц",
            expected: new Price(1000, CURRENCY_USD, PERIOD_MONTH)
        },
        {
            input: "1000 в месяц",
            expected: null,
        },
        {
            input: "1000",
            expected: null,
        },
        {
            input: "1000 £",
            expected: null,
        },
    ]

    for (let i = 0; i < tests.length; i++) {
        const test = tests[i]
        const price = parsePriceString(test.input)

        if (test.expected === null) {
            console.assert(price === null, "expected null parse result, got ", price)
        } else {
            console.assert(
                price.toString() === test.expected.toString(),
                "expected parsed ", test.expected.toString(), " got ", price.toString())
        }
    }
}

function test_currencyFromLabel() {
    const tests = [
        {input: "$", expected: CURRENCY_USD},
        {input: "₽", expected: CURRENCY_RUB},
        {input: "֏", expected: CURRENCY_AMD},
    ]

    for (let i = 0; i < tests.length; i++) {
        const test = tests[i]
        const currency = currencyFromLabel(test.input)

        console.assert(
            currency === test.expected,
            "expected parsed ", test.expected, " got ", currency)
    }
}

function test_getCurrencyLabel() {
    const tests = [
        {input: CURRENCY_USD, expected: "$"},
        {input: CURRENCY_RUB, expected: "₽"},
        {input: CURRENCY_AMD, expected: "֏"},
        {input: "UNKNOWN", expected: "UNKNOWN"},
    ]

    for (let i = 0; i < tests.length; i++) {
        const test = tests[i]
        const label = getCurrencyLabel(test.input)

        console.assert(
            label === test.expected,
            "expected parsed ", test.expected, " got ", label)
    }
}