/**
 * Основная последовательность:
 * 1. DivoomClient отвечает за HTTP-запросы.
 * 2. CustomDisplay создаёт DisplayElement.
 * 3. DisplayLayout собирает несколько DisplayElement.
 * 4. DisplayLayout преобразует элементы в формат Divoom API.
 * 5. DivoomClient отправляет готовую команду на устройство.
 */

const express = require('express');
const app = express();

const { DivoomClient, Screen, CustomDisplay, DisplayLayout } = require('./src');

const client = new DivoomClient('192.168.1.41');
const screen = new Screen(client);
const customDisplay = new CustomDisplay();
const displayLayout = new DisplayLayout(
  client,
  'http://192.168.1.40:3000/static/the-boxhead-wanderer-pr-800x1280.jpg',
);

// async function main() {
//   // Включить экран
//   await screen.turnOn();

//   // Яркость 50%
//   await screen.setBrightness(50);

//   // Зеркальный режим выключен
//   await screen.setMirrorMode(0);

//   // 24-часовой формат
//   await screen.setHourMode(1);

//   // Координаты: долгота, широта
//   await screen.setWeatherLocation(37.6173, 55.7558);

//   console.log('Screen commands executed successfully');
// }

// main().catch((error) => {
//   console.error('ERROR:', error);
// });

async function main() {
  const result = client.getFontList();

  console.log('Available font IDs:');

  for (const font of result.FontList) {
    console.log(font.id);
  }
}

main().catch((error) => {
  console.error('ERROR:', error);
});

// main().catch((error) => {
//   console.error('ERROR:', error);
// });
// async function main() {
// const weather = await customDisplay.showWeather('weather', {
//   x: 100,
//   y: 100,
//   width: 400,
//   height: 200,
//   align: 1,
//   fontSize: 40,
//   fontId: 52,
//   fontColor: '#FFFFFF',
//   bgColor: '#000000',
//   url: 'https://f.divoom-gz.com/group1/M00/0C/4D/rBAAM2fZCOSEN4MoAAAAADuUrnI59.webp',
// });

// displayLayout.add(weather);

// console.log(weather);

// await displayLayout.send();
// }

main().catch((error) => {
  console.error('ERROR:', error);
});

app.use(
  '/static',
  express.static('C:/Users/itach/OneDrive/Документы/www/divoom/image'),
);

app.use((req, res) => {
  return res.status(404).send({
    error: 'Прости брат тут ничего нет',
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
