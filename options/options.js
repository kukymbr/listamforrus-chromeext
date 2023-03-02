"use strict";

/**
 * @param {NodeListOf<Element>} inputs
 * @param {Settings} settings
 */
function applySettingsToInputs(inputs, settings) {
    const data = settings.toObject()

    inputs.forEach(function (input) {
        const key = input.name
        if (data[key] === undefined) {
            return
        }

        switch (input.type) {
            case "checkbox":
                input.checked = !!data[key]
                break;
            default:
                input.value = data[key]
        }
    })
}

/**
 * @param {NodeListOf<Element>} inputs
 * @param {Settings} settings
 */
function collectSettingsFromInputs(inputs, settings) {
    const data = settings.toObject()

    inputs.forEach(function (input) {
        const key = input.name

        switch (input.type) {
            case "checkbox":
                data[key] = !!input.checked
                break;
            default:
                data[key] = input.value
        }
    })

    settings.setFromObject(data)
}

function initOptionsPage() {
    const storage = new SettingsStorage()
    let settings = new Settings()

    const form = document.getElementById("settings")
    const inputs = form.querySelectorAll("[data-setting][name]")
    const apply = document.getElementById("apply")
    const status = document.getElementById("status")

    storage.read(function (sett) {
        settings = sett
        applySettingsToInputs(inputs, settings)
    })

    apply.addEventListener("click", function () {
        collectSettingsFromInputs(inputs, settings)

        storage.save(settings, function () {
            status.innerHTML = "✅ Сохранено. Пожалуйста, перезагрузите страницы list.am для применения настроек.";
            setTimeout(function() {
                status.innerHTML = "";
            }, 2000);
        })
    })
}

document.addEventListener('DOMContentLoaded', initOptionsPage);