"use strict";

/**
 * @param {function} onReady
 */
function buildContainer(onReady) {
    const settingsStorage = new SettingsStorage()

    settingsStorage.read(function (settings) {
        const priceRates = new PriceRates()
        const priceConverter = new PriceConverter(priceRates)
        const priceNormalizer = new PriceNormalizer(priceConverter)

        const itemDetector = new ItemsDetector()
        const itemNormalizer = new ItemNormalizer(priceNormalizer, settings)

        const ctn = {
            item: {
                detector: itemDetector,
                normalizer: itemNormalizer,
            }
        }

        onReady(ctn)
    })
}