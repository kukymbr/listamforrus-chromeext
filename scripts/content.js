"use strict";

function normalizeRentList() {
    const normalizer = new RentItemsNormalizer()
    normalizer.normalize()
}

function bootstrap() {
    normalizeRentList()
}

bootstrap()