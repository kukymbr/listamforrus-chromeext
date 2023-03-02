"use strict";

class Settings {

    tintItemsWithoutPrice = true

    showMoreSimilar = true

    /**
     * @return {Object.<any>}
     */
    toObject() {
        return {
            "tiwp": this.tintItemsWithoutPrice,
            "sms": this.showMoreSimilar,
        }
    }

    /**
     * @param {Object.<any>} data
     */
    setFromObject(data) {
        let val;

        val = data["tiwp"]
        if (val !== undefined) {
            this.tintItemsWithoutPrice = !!val
        }
        val = data["sms"]
        if (val !== undefined) {
            this.showMoreSimilar = !!val
        }
    }
}