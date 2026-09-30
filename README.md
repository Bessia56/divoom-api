# Divoom

Node.js библиотека для взаимодействия с Divoom Times Frame через локальный API устройства.

---

## Требования

- Divoom Times Frame
- Доступ к устройству по локальной сети

> Библиотека работает с локальным API Divoom. Устройство должно быть доступно из приложения по своему IP-адресу.

---

## Установка

divoom-times-frame-10-1

```bash
npm install <package-name>
```

## Подключение к устройству

Для работы с устройством создайте `DivoomClient` и укажите IP-адрес устройства:

```js
const { DivoomClient, Screen } = require('<package-name>');

const client = new DivoomClient('192.168.1.100');
const screen = new Screen(client);
```

Устройство Divoom должно быть доступно по указанному IP-адресу в локальной сети.

## Основные классы

- `DivoomClient` — взаимодействие с API устройства.
- `Screen` — управление экраном.
- `CustomDisplay` — Отвечает за создание `DisplayElement`.
- `DisplayLayout` — Отвечает за хранение, поиск, изменение состава и отправку элементов на устройство.
- `DisplayElement` — внутреннее представление элемента экрана.

## Управление экраном

### `DivoomClient`

Другие классы библиотеки используют клиент для отправки команд:

```text
Screen
   ↓
DivoomClient
   ↓
Divoom API
   ↓
Устройство Divoom
```

Например:

```js
const client = new DivoomClient('192.168.1.100');
const screen = new Screen(client);

await screen.turnOn();
```

В этом случае `Screen` формирует команду, а `DivoomClient` отправляет её на устройство:

```js
client.sendCommand({
  Command: 'Channel/OnOffScreen',
  OnOff: 1,
});
```

### Методы класса `Screen`:

### `turnOn()`

**Обязательные параметры:** отсутствуют.

**Для чего:** включает экран устройства.

**Результат:** возвращает ответ устройства после выполнения команды.

**Пример:**

```js
await screen.turnOn();
```

### `turnOff()`

**Обязательные параметры:** отсутствуют.

**Для чего:** выключает экран устройства.

**Результат:** возвращает ответ устройства после выполнения команды.

**Пример:**

```js
await screen.turnOff();
```

### `setBrightness(brightness)`

**Обязательный параметр:**
`number`, уровень яркости от `0` до `100`.

**Для чего:** устанавливает яркость экрана.

**Результат:** возвращает ответ устройства после выполнения команды.

**Пример:**

```js
await screen.setBrightness(50);
```

### `setMirrorMode(mode)`

**Обязательный параметр:**
`number`, режим зеркального отображения: `1` — включить, `0` — выключить.

**Для чего:** переключает зеркальное отображение экрана.

**Результат:** возвращает ответ устройства после выполнения команды.

**Пример:**

```js
await screen.setMirrorMode(1);
```

### `setHourMode(mode)`

**Обязательный параметр:**
`number`, формат отображения времени: `1` — 24-часовой, `0` — 12-часовой.

**Для чего:** устанавливает формат отображения времени на экране.

**Результат:** возвращает ответ устройства после выполнения команды.

**Пример:**

```js
await screen.setHourMode(1);
```

### `setWeatherLocation(longitude, latitude)`

**Обязательные параметры:**

- `longitude` — `number`, долгота от `-180` до `180`.
- `latitude` — `number`, широта от `-90` до `90`.

**Для чего:** устанавливает координаты для получения информации о погоде.

**Результат:** возвращает ответ устройства после выполнения команды.

**Пример:**

```js
await screen.setWeatherLocation(4.9041, 52.3676);
```

## Пользовательский экран

### `CustomDisplay`

```js
const customDisplay = new CustomDisplay();
const layout = new DisplayLayout(client, backgroundUrl);
```

### Методы `DisplayLayout`

### `constructor(client, backgroundUrl)`

**Обязательные параметры:**

- `client` — экземпляр `DivoomClient`.
- `backgroundUrl` — URL фонового изображения.

**Для чего:** создаёт пользовательский экран и задаёт его фоновое изображение.

**Ограничения:**

- Разрешение фонового изображения должно быть `800 × 1280`.
- `backgroundUrl` должен содержать URL изображения, доступного устройству Divoom.
- Для фонового изображения используется URL, так как `BackgroudImageLocalFlag` в библиотеке устанавливается в `0`.

**Пример:**

```js
const layout = new DisplayLayout(
  client,
  'http://192.168.1.100:3000/background.jpg',
);
```

### `add(element)`

**Обязательный параметр:**

- `element` — элемент `DisplayElement`, который нужно добавить в layout.

**Для чего:** добавляет элемент в пользовательский экран.

**Ограничения:**

- В `DisplayLayout` можно добавлять только объекты `DisplayElement`.

**Поведение при совпадении `key`:**

Если элемент с таким `key` уже существует в `DisplayLayout`,
он будет заменён новым элементом.
Позиция элемента в layout при этом сохраняется.

**Результат:** не возвращает отдельного результата.

**Пример:**

```js
layout.add(text);
```

### `find(key)`

**Обязательный параметр:**

- `key` — ключ элемента, по которому выполняется поиск.

**Для чего:** находит ранее добавленный элемент в layout.

**Результат:** возвращает найденный `DisplayElement` или `undefined`, если элемент не найден.

**Пример:**

```js
const element = layout.find('temperature');
```

### `send()`

**Обязательные параметры:** отсутствуют.

**Для чего:** отправляет текущий пользовательский экран на устройство Divoom.

**Результат:** возвращает ответ от устройства.

**Пример:**

```js
await layout.send();
```

### Создание элементов через `CustomDisplay`

### `showText(key, text, options)`

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `text` — текст для отображения.
- `options` — параметры отображения элемента.

**Для чего:** создаёт текстовый элемент пользовательского экрана.

**Ограничения:**

- `align` — `0` — по левому краю, `1` — по правому краю, `2` — по центру.
- `fontSize` — размер отображаемого шрифта.
- `fontId` — ID шрифта.
- Цвета задаются в формате HEX.

**Результат:** возвращает созданный `DisplayElement`.

**Пример:**

```js
const text = customDisplay.showText('title', 'Hello, Divoom', {
  x: 100,
  y: 100,
  width: 400,
  height: 60,
  align: 1,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
});
```

### `showImage(key, url, options)`

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `url` — URL изображения.
- `options` — параметры отображения элемента.

**Для чего:** создаёт элемент с изображением.

**Ограничения:**

- Изображение передаётся через URL.

**Результат:** возвращает созданный `DisplayElement`.

**Пример:**

```js
const image = customDisplay.showImage('logo', 'https://example.com/image.jpg', {
  x: 100,
  y: 100,
  width: 200,
  height: 200,
  align: 0,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
});
```

### `showTime(key, options)`

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Для чего:** создаёт элемент с текущим временем.

**Ограничения:**

- `align` — `0` — по левому краю, `1` — по правому краю, `2` — по центру.

**Результат:** возвращает созданный `DisplayElement`.

**Пример:**

```js
const time = customDisplay.showTime('time', {
  x: 100,
  y: 100,
  width: 300,
  height: 80,
  align: 1,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
});
```

### `showMday(key, options)`

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Для чего:** создаёт элемент с днём месяца.

**Ограничения:**

- `align` — `0` — по левому краю, `1` — по правому краю, `2` — по центру.

**Результат:** возвращает созданный `DisplayElement`.

**Пример:**

```js
const day = customDisplay.showMday('day', {
  x: 100,
  y: 100,
  width: 200,
  height: 60,
  align: 1,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
});
```

### `showMonYear(key, options)`

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Для чего:** создаёт элемент с месяцем и годом.

**Ограничения:**

- `align` — `0` — по левому краю, `1` — по правому краю, `2` — по центру.

**Результат:** возвращает созданный `DisplayElement`.

**Пример:**

```js
const date = customDisplay.showMonYear('date', {
  x: 100,
  y: 100,
  width: 300,
  height: 60,
  align: 1,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
});
```

### `showWeek(key, options)`

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Для чего:** создаёт элемент с днём недели.

**Ограничения:**

- `align` — `0` — по левому краю, `1` — по правому краю, `2` — по центру.

**Результат:** возвращает созданный `DisplayElement`.

**Пример:**

```js
const week = customDisplay.showWeek('week', {
  x: 100,
  y: 100,
  width: 300,
  height: 60,
  align: 1,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
});
```

### `showTemperature(key, options)`

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Для чего:** создаёт элемент с температурой.

**Ограничения:**

- `align` — `0` — по левому краю, `1` — по правому краю, `2` — по центру.

**Результат:** возвращает созданный `DisplayElement`.

**Пример:**

```js
const temperature = customDisplay.showTemperature('temperature', {
  x: 100,
  y: 100,
  width: 300,
  height: 60,
  align: 1,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
});
```

### `showWeather(key, options)`

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента и источник данных о погоде.

**Для чего:** создаёт элемент с информацией о погоде.

**Ограничения:**

- `align` — `0` — по левому краю, `1` — по правому краю, `2` — по центру.
- `url` используется как адрес получения данных.
- Для сетевого запроса `RequestTime` задаётся в секундах и должен быть больше `10`.

**Результат:** возвращает созданный `DisplayElement`.

**Пример:**

```js
const weather = await customDisplay.showWeather('weather', {
  x: 100,
  y: 100,
  width: 400,
  height: 200,
  align: 1,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
  url: 'https://example.com/weather',
});
```

### `showNetData(key, options)`

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения и получения данных из внешнего источника.

**Для чего:** создаёт элемент, который получает и отображает данные из внешнего источника.

**Ограничения:**

- `align` — `0` — по левому краю, `1` — по правому краю, `2` — по центру.
- `url` должен содержать адрес сетевого запроса.
- `ruleInfo` задаёт правило разбора полученного ответа.
- `requestTime` задаётся в секундах и должен быть больше `10`.

**Результат:** возвращает созданный `DisplayElement`.

**Пример:**

```js
const data = await customDisplay.showNetData('level', {
  x: 100,
  y: 100,
  width: 400,
  height: 200,
  align: 1,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
  url: 'https://example.com/api/data',
  ruleInfo: 'data,value',
  requestTime: 30,
});
```

## Работа с элементами

После создания элемента его можно добавить в `DisplayLayout`, найти по ключу и изменить его параметры.

```js
const temperature = customDisplay.showTemperature('temperature', options);

layout.add(temperature);
```

Для поиска элемента используется его `key`:

```js
const element = layout.find('temperature');
```

### `update(options)`

**Обязательный параметр:**

- `options` — объект с параметрами, которые необходимо изменить.

**Для чего:** изменяет параметры существующего элемента.

**Результат:** обновляет состояние `DisplayElement` в памяти.

**Пример:**

```js
const element = layout.find('temperature');

element.update({
  fontSize: 50,
});
```

Изменения применяются к элементу в памяти. Чтобы отправить обновлённый экран на устройство, вызовите `send()`:

```js
await layout.send();
```

## Обработка ошибок

При возникновении ошибки библиотека выбрасывает исключение.

```js
try {
  await screen.turnOn();
} catch (error) {
  console.error(error.message);
}
```

## Полный пример

```js
const {
  DivoomClient,
  Screen,
  CustomDisplay,
  DisplayLayout,
} = require('<package-name>');

const client = new DivoomClient('192.168.1.100');
const screen = new Screen(client);

const customDisplay = new CustomDisplay();

const layout = new DisplayLayout(
  client,
  'http://192.168.1.10:3000/background.jpg',
);

const text = customDisplay.showText('title', 'Hello, Divoom', {
  x: 100,
  y: 100,
  width: 600,
  height: 80,
  align: 1,
  fontSize: 40,
  fontId: 52,
  fontColor: '#FFFFFF',
  bgColor: '#000000',
});

layout.add(text);

const element = layout.find('title');

element.update({
  text: 'Hello, World!',
});

await layout.send();
```

## Ограничения

- Устройство Divoom должно быть доступно по IP-адресу в локальной сети.
- Для отображения изображений устройство должно иметь доступ к указанному URL.
- Библиотека работает с локальным API Divoom и не предоставляет доступ ко всем возможностям официального приложения Divoom.
- Поддерживаются только те команды и типы элементов, которые реализованы в текущей версии библиотеки.

<!--
## API

### `DivoomClient`

Отвечает за взаимодействие с локальным API устройства Divoom.

### `Screen`

Предоставляет методы для управления экраном устройства.

### `CustomDisplay`

Используется для создания элементов пользовательского экрана.

### `DisplayLayout`

Объединяет элементы пользовательского экрана и отправляет готовый layout на устройство.

### `DisplayElement`

Представляет отдельный элемент пользовательского экрана и хранит его текущее состояние. -->
