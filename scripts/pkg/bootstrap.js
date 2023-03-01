"use strict";

function bootstrap() {
    test()

    const ctn = buildContainer()

    const items = ctn.item.detector.getItems()
    ctn.item.normalizer.normalizeItems(items)
}

function test() {
    test_price()
}