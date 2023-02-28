"use strict";

class ListProcessor {

    /**
     * List container element
     * @type {Element}
     * @private
     */
    container

    /**
     * Is page valid for the processor?
     * @type {boolean}
     * @private
     */
    valid = false

    /**
     * Items cache
     * @type {NodeListOf<Element>}
     */
    items = null

    constructor(container) {
        this.container = container

        this.valid = !!this.container
        if (this.valid) {
            console.log("list container registered: ", container)
        }
    }

    /**
     * Is page valid for the processor?
     * @return {boolean}
     */
    isValid() {
        return this.valid
    }

    /**
     * Returns list items elements
     * @returns {NodeListOf<Element>}
     */
    getItemsElements() {
        if (!this.isValid()) {
            return null
        }

        if (this.items === null) {
            this.items = this.container.querySelectorAll("a[href^='/ru/item/']")
        }

        return this.items
    }
}