# Divoom

NPM библиотека для управления устройствами Divoom через локальный API.

---

## Поддерживаемые устройства

- Divoom Times Frame

---

## Установка

```bash
npm install divoom-api
```

## Подключение к устройству

```js
const { DivoomClient, Screen } = require('divoom-api');

const client = new DivoomClient('192.168.1.100');
const screen = new Screen(client);

await screen.turnOn(); // включить экран
```

## Класс `DivoomClient`


Связь с устройством по IP. Пример:

```js
const client = new DivoomClient('192.168.1.100');
```

### `.getFontList()`
 
Получить список поддерживаемых шрифтов на устройстве. Подробнее: https://docin.divoom-gz.com/web/#/5/379

**Результат:** массив шрифтов с полями:
- id
- type
- url
- charSet
- Encryption

```js
const fonts = await client.getFontList();
console.log(fonts);
```


## Класс `Screen`:

### `.turnOn()`
 
Включает экран устройства.  

**Результат:** возвращает ответ устройства после выполнения команды.  

```js
await screen.turnOn();
```

### `.turnOff()`

Выключает экран устройства.  

**Результат:** возвращает ответ устройства после выполнения команды.

```js
await screen.turnOff();
```

### `.setBrightness(brightness)`

Устанавливает яркость экрана.  

**Обязательный параметр:** уровень яркости, тип `number` от `0` до `100`.  
**Результат:** возвращает ответ устройства после выполнения команды.

```js
await screen.setBrightness(50);
```

### `.setMirrorMode(mode)`

Переключает зеркальное отображение экрана.  

**Обязательный параметр:** режим зеркального отображения, тип `number`: `1` — включить, `0` — выключить.  
**Результат:** возвращает ответ устройства после выполнения команды.
```js
await screen.setMirrorMode(1);
```

### `.setHourMode(mode)`

Устанавливает формат отображения времени на экране. 

**Обязательный параметр:** формат отображения времени, тип `number` : `1` — 24-часовой, `0` — 12-часовой.  
**Результат:** возвращает ответ устройства после выполнения команды.  
```js
await screen.setHourMode(1);
```

### `.setWeatherLocation(longitude, latitude)`

Устанавливает координаты для получения информации о погоде.

**Обязательные параметры:**
- `longitude` — тип `number`, долгота от `-180` до `180`.
- `latitude` — тип `number`, широта от `-90` до `90`.

**Результат:** возвращает ответ устройства после выполнения команды.  
**Пример:**
```js
await screen.setWeatherLocation(4.9041, 52.3676);
```

## Класс `CustomDisplay`

Создание элементов на экране

```js
const customDisplay = new CustomDisplay();
```

## Объект `options`

Используется во всех методах класса `CustomDisplay` для установки свойств элементам:

- `x`: координата X на экране
- `y`: координата Y на экране
- `width`: ширина элемента
- `height`: высота элемента
- `align`: выравнивание контента внутри элемента (0 — по левому краю, 1 — по правому краю, 2 — по центру)
- `fontSize`: размер шрифта
- `fontId`: ID шрифта, можно получить через `client.getFontList()`
- `fontColor`: Цвет шрифта (например: `#FFFFFF`)
- `bgColor`: цвет фона (например `#000000`)

### `.showText(key, text, options)`

Создаёт текстовый элемент пользовательского экрана.

**Обязательные параметры:**
- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `text` — текст для отображения.
- `options` — параметры отображения элемента.

**Результат:** возвращает созданный `DisplayElement`.


```js
const text = await customDisplay.showText('title', 'Hello, Divoom', {
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

### `.showImage(key, url, options)`

Создаёт элемент с картинкой:

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `url` — URL изображения.
- `options` — параметры отображения элемента.

**Результат:** возвращает созданный `DisplayElement`.

```js
const image = await customDisplay.showImage('logo', 'https://example.com/image.jpg', options);
```

### `.showTime(key, options)`

Создаёт элемент с текущим временем.

**Обязательные параметры:**
- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Результат:** возвращает созданный `DisplayElement`.

```js
const time = await customDisplay.showTime('time', options);
```

### `.showMday(key, options)`

Cоздаёт элемент с днём месяца.

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Результат:** возвращает созданный `DisplayElement`.

```js
const day = await customDisplay.showMday('day', options);
```

### `.showMonYear(key, options)`

Создаёт элемент с месяцем и годом.

**Обязательные параметры:**
- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Результат:** возвращает созданный `DisplayElement`.

```js
const date = await customDisplay.showMonYear('date', options);
```

### `.showWeek(key, options)`

Создаёт элемент с днём недели.

**Обязательные параметры:**
- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Результат:** возвращает созданный `DisplayElement`.
```js
const week = await customDisplay.showWeek('week', options);
```

### `.showTemperature(key, options)`

Создаёт элемент с температурой.

**Обязательные параметры:**
- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента.

**Результат:** возвращает созданный `DisplayElement`.

```js
const temperature = await customDisplay.showTemperature('temperature', options);
```

### `.showWeather(key, options)`

Создаёт элемент с информацией о погоде.

**Обязательные параметры:**
- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения элемента и источник данных о погоде.

**Дополнительные опции:**

- `options.url` - ссылка на многокадровое изображение, где определенный кадр это иконка погоды (облачно, солнечно и тд)

**Результат:** возвращает созданный `DisplayElement`.

```js
const weather = await customDisplay.showWeather('weather', {
  ..., 
  url: 'https://f.divoom-gz.com/group1/M00/0C/4D/rBAAM2fZCOSEN4MoAAAAADuUrnI59.webp',
});
```

### `.showNetData(key, options)`

Создаёт элемент, который получает и отображает данные из внешнего источника.

**Обязательные параметры:**

- `key` — уникальный ключ элемента внутри `DisplayLayout`.
- `options` — параметры отображения и получения данных из внешнего источника.

**Дополнительные опции:**

- `options.url` должен содержать адрес сетевого запроса.
- `options.ruleInfo` задаёт правило разбора полученного ответа.
- `options.requestTime` задаётся в секундах и должен быть больше `10`.

**Результат:** возвращает созданный `DisplayElement`.

```js
const data = await customDisplay.showNetData('level', {
  ..., 
  url: 'https://example.com/api/data',
  ruleInfo: 'data,value',
  requestTime: 30,
});
```

## Методы `DisplayLayout`

### `constructor(client, backgroundUrl)`

Создаёт пользовательский экран и задаёт его фоновое изображение

**Обязательные параметры:**
- `client` — экземпляр `DivoomClient`.
- `backgroundUrl` — URL фонового изображения.

**Ограничения:**
- Разрешение фонового изображения должно быть `800 × 1280`.
- `backgroundUrl` должен содержать URL изображения, доступного устройству Divoom.

**Пример:**

```js
const layout = new DisplayLayout(
  client,
  'http://192.168.1.100:3000/background.jpg',
);
```

### `.add(element)`

Добавляет элемент в пользовательский экран.

**Обязательный параметр:**
- `element` — элемент `DisplayElement`, который нужно добавить в layout.


**Поведение при совпадении `key`:**

Если элемент с таким `key` уже существует в `DisplayLayout`,
он будет заменён новым элементом.
Позиция элемента в layout при этом сохраняется.

```js
layout.add(text);
```

### `.find(key)`

Находит ранее добавленный элемент в layout.

**Обязательный параметр:**

- `key` — ключ элемента, по которому выполняется поиск.

**Результат:** возвращает найденный `DisplayElement` или `undefined`, если элемент не найден.

```js
const element = layout.find('temperature');
```

### `.send()`

Отправляет текущий пользовательский экран на устройство Divoom.

**Результат:** возвращает ответ от устройства.

```js
await layout.send();
```


## Работа с элементами

После создания элемента его можно добавить в `DisplayLayout`, найти по ключу и изменить его параметры.

```js
const tempElement = customDisplay.showTemperature('temperature', options);

layout.add(tempElement);
```

Для поиска элемента используется его `key`:

```js
const tempElement = layout.find('temperature');
```

### `element.update(options)`

Изменяет параметры существующего элемента.

**Обязательный параметр:**

- `options` — объект с параметрами, которые необходимо изменить.

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
} = require('divoom-api');

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
