"use strict";

const THOUSAND_SEPARATOR = ","

const PERIOD_DAY = "день"
const PERIOD_MONTH = "месяц"
const PERIODS = [PERIOD_DAY, PERIOD_MONTH]

const CURRENCY_AMD = "AMD"
const CURRENCY_RUB = "RUB"
const CURRENCY_USD = "USD"

const CURRENCIES_LABELS = {}
CURRENCIES_LABELS[CURRENCY_RUB] = "₽"
CURRENCIES_LABELS[CURRENCY_AMD] = "֏"
CURRENCIES_LABELS[CURRENCY_USD] = "$"

const ITEM_TYPE_MAIN_LIST = "contentr"
const ITEM_TYPE_SIDEBAR = "pmenu"
const ITEM_TYPE_CONTENT = "pcontent"