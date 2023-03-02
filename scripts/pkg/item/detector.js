"use strict";

class ItemsDetector {

    /**
     * @type {Array.<Item>}
     * @private
     */
    items = []

    constructor() {
        this.detect()
    }

    /**
     * Get detected rent items
     * @returns {Array<Item>}
     */
    getItems() {
        return this.items
    }

    /**
     * @private
     */
    detect() {
        this.detectInList(ITEM_TYPE_MAIN_LIST)
        this.detectInList(ITEM_TYPE_SIDEBAR)
        this.detectInList(ITEM_TYPE_FEATURED)
        this.detectInContent()
    }

    /**
     * @param {string} containerID
     * @private
     */
    detectInList(containerID) {
        const listProcessor = new ItemList(document.getElementById(containerID))
        const elements = listProcessor.getItemsElements()
        if (!elements) {
            return
        }

        for (let i = 0; i < elements.length; i++) {
            const item = new Item(elements[i], containerID)
            this.items.push(item)
        }
    }

    /**
     * @private
     */
    detectInContent() {
        const container = document.getElementById(ITEM_TYPE_CONTENT)
        if (!container) {
            return
        }

        const item = new Item(container, ITEM_TYPE_CONTENT)
        this.items.push(item)
    }
}