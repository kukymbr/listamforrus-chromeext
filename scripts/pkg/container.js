"use strict";

function buildContainer() {
    const priceRates = new PriceRates()
    const priceConverter = new PriceConverter(priceRates)
    const priceNormalizer = new PriceNormalizer(priceConverter)

    const itemDetector = new ItemsDetector()
    const itemNormalizer = new ItemNormalizer(priceNormalizer)

    return {
        item: {
            detector: itemDetector,
            normalizer: itemNormalizer,
        }
    }
}