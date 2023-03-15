"use strict";

class SettingsStorage {

    /**
     * @param {function} onDone
     */
    read(onDone) {
        const settings = new Settings()

        chrome.storage.sync.get(settings.toObject(), function (data) {
            settings.setFromObject(data)
            console.debug("settings loaded: ", settings.toObject())
            onDone(settings)
        })
    }

    /**
     * @param {Settings} settings
     * @param {function} [onDone]
     */
    save(settings, onDone) {
        chrome.storage.sync.set(settings.toObject(), onDone)
    }
}