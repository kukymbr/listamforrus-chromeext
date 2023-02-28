"use strict";

const PERIOD_DAY = "день"
const PERIOD_MONTH = "месяц"
const PERIODS = [PERIOD_DAY, PERIOD_MONTH]

const RENT_ITEM_TYPE_MAIN_LIST = "contentr"
const RENT_ITEM_TYPE_SIDEBAR = "pmenu"
const RENT_ITEM_TYPE_CONTENT = "pcontent"

class RentItemsDetector {

    /**
     * @type {Array.<RentItem>}
     * @private
     */
    items = []

    constructor() {
        this.detect()
    }

    /**
     * Get detected rent items
     * @returns {Array<RentItem>}
     */
    getItems() {
        return this.items
    }

    /**
     * @private
     */
    detect() {
        this.detectInList(RENT_ITEM_TYPE_MAIN_LIST)
        this.detectInList(RENT_ITEM_TYPE_SIDEBAR)
        this.detectInContent()
    }

    /**
     * @param {string} containerID
     * @private
     */
    detectInList(containerID) {
        const listProcessor = new ListProcessor(document.getElementById(containerID))
        const elements = listProcessor.getItemsElements()
        if (!elements) {
            return
        }

        for (let i = 0; i < elements.length; i++) {
            const item = new RentItem(elements[i], containerID)
            this.items.push(item)
        }
    }

    /**
     * @private
     */
    detectInContent() {
        const container = document.getElementById(RENT_ITEM_TYPE_CONTENT)
        if (!container) {
            return
        }

        const item = new RentItem(container, RENT_ITEM_TYPE_CONTENT)
        this.items.push(item)
    }
}

class RentItem {

    /**
     * Is valid?
     * @type {boolean}
     */
    valid = false;

    /**
     * @type {Element}
     */
    itemElement;

    /**
     * {string}
     */
    type;

    /**
     * @type {Element}
     */
    priceElement;

    /**
     * @type {PriceWithPeriod}
     */
    price;

    /**
     * @param {Element} element
     * @param {string} itemType
     */
    constructor(element, itemType) {
        this.itemElement = element
        this.type = itemType

        this.parse()
        this.applyStyles()
    }

    /**
     * Is valid?
     * @return {boolean}
     */
    isValid() {
        return this.valid
    }

    /**
     * @private
     */
    parse() {
        switch (this.type) {
            case RENT_ITEM_TYPE_CONTENT:
                this.priceElement = this.itemElement.querySelector(".price.x")
                break
            default:
                this.priceElement = this.itemElement.querySelector("div.p")
        }

        if (!this.priceElement) {
            console.warn("failed to parse rent item (price element): ", this.itemElement)
            return
        }

        const html = this.priceElement.innerText.toLowerCase()
        this.price = parsePriceWithPeriodString(html)
        if (!this.price) {
            console.warn(this.priceElement)
            return
        }

        this.valid = true
    }

    /**
     * @private
     */
    applyStyles() {
        if (this.isValid()) {
            if (this.type === RENT_ITEM_TYPE_SIDEBAR) {
                this.itemElement.setAttribute("style", "display:flex !important")
            }
        } else {
            this.itemElement.style.opacity = ".5"
        }
    }

    /**
     * Do rent item normalization:
     * convert price to monthly and rubles.
     */
    normalize() {
        if (!this.isValid()) {
            return
        }

        this.price = this.price.getNormalized()
        this.priceElement.innerHTML = this.price.toString()
    }
}

class RentItemsNormalizer {

    /**
     * @type {RentItemsDetector}
     * @private
     */
    detector

    constructor() {
        this.detector = new RentItemsDetector()
    }

    normalize() {
        const items = this.detector.getItems()
        for (let i = 0; i < items.length; i++) {
            items[i].normalize()
        }
    }
}