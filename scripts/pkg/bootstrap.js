"use strict";

function bootstrap() {
    test()

    buildContainer(function (ctn) {
        const items = ctn.item.detector.getItems()
        ctn.item.normalizer.normalizeItems(items)
    })
}

function test() {
    test_price()
}