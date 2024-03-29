## List.am 4RUS

Расширение для браузера [Google Chrome](https://www.google.com/intl/ru_ru/chrome/)
для форматирования сайта [list.am](https://list.am/ru) к виду, привычному русскоязычному пользователю.

В первую очередь будет полезно тем, кто хочет примерно соориентироваться в ценах 
на [list.am](https://list.am/ru) при поиске, например, жилья.

### Функционал

* Приведение цен в объявлениях к рублям.
* Если у цены есть период "в день"/"в месяц", то цена приводится к помесячной.
* Частично скрываются объявления без указания цены (можно отключить в настройках).
* Выводится больше объявлений в блоке "Похожие" (можно отключить в настройках).

<img src="https://github.com/kukymbr/listamforrus-chromeext/blob/main/images/screenshot_1.png?raw=true" width="500" alt="Скриншот с форматированными ценами"/>

<img src="https://github.com/kukymbr/listamforrus-chromeext/blob/main/images/screenshot_2.png?raw=true" width="500" alt="Скриншот с длинным списком похожих объявлений"/>

<img src="https://github.com/kukymbr/listamforrus-chromeext/blob/main/images/screenshot_3.png?raw=true" width="500" alt="Скриншот с настройками"/>

See [CHANGELOG.md](CHANGELOG.md) releases changes information.

### Установка

#### Из Chrome Web Store 

Расширение можно установить из [Chrome Web Store](https://chrome.google.com/webstore/detail/listam-4rus/idnamihinfodcapgnpalbacdgbfadeng?hl=ru).
Это приоритетный способ установки для использования расширения.

#### Вручную

Подробная документация: https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked

* Скачайте `.zip` файл последнего релиза
* Перейдите на страницу `chrome://extensions` в браузере Google Chrome
* Включите режим разработчика в правом верхнем углу
* Выберите скачанный `.zip` файл с помощью кнопки `Load unpacked` 