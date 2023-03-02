"use strict";

class Item {

    /**
     * Is valid?
     * @type {boolean}
     * @private
     */
    valid = false;

    /**
     * @type {Element}
     * @private
     */
    itemElement;

    /**
     * {string}
     * @private
     */
    type;

    /**
     * @type {Element}
     * @private
     */
    priceElement;

    /**
     * @type {Price}
     * @private
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
            case ITEM_TYPE_CONTENT:
                this.priceElement = this.itemElement.querySelector(".price.x")
                break
            default:
                this.priceElement = this.itemElement.querySelector("div.p")
        }

        if (!this.priceElement) {
            console.debug("failed to parse item (price element): ", this.itemElement)
            return
        }

        const html = this.priceElement.innerText.toLowerCase()
        this.price = parsePriceString(html)
        if (!this.price) {
            console.debug(this.priceElement)
            return
        }

        this.valid = true
    }

    /**
     * @return {Price}
     */
    getPrice() {
        return this.price
    }

    /**
     * @param {Price} price
     */
    setPrice(price) {
        this.price = price
        this.priceElement.innerHTML = price.toString()
    }

    /**
     * @return {string}
     */
    getType() {
        return this.type
    }

    /**
     * @return {Element}
     */
    getItemElement() {
        return this.itemElement
    }
}