const express = require('express');
const app = express();

const DivoomClient = require('./src/client');
const Screen = require('./src/commands/screen');

const client = new DivoomClient('192.168.1.41');
const screen = new Screen(client);

async function main() {
  try {
    // await screen.turnOn();
    // await screen.setBrightness(100);
    // await screen.setMirrorMode(45);
    // await screen.setHourMode(0);
    const result = await screen.setWeatherLocation(39.7248, 43.5970);

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

main();

app.use(
  '/static',
  express.static('C:/Users/itach/OneDrive/Изображения/Тест картинки'),
);

app.use((req, res) => {
  return res.status(404).send({
    error: 'Прости брат тут ничего нет',
  });
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on port 3000');
});
