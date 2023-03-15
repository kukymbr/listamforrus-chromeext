"use strict";

/**
 * @param {function} onReady
 */
function buildContainer(onReady) {
    const settingsStorage = new SettingsStorage()

    settingsStorage.read(
        /**
         * @param {Settings} settings
         */
        function (settings) {
            const priceConverter = new PriceConverter(settings.rates)
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
        }
    )
}