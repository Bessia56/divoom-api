const express = require('express');
const app = express();

const DivoomClient = require('./src/client');
const Screen = require('./src/commands/screen');
const CustomDisplay = require('./src/commands/customDisplay');

const client = new DivoomClient('192.168.1.41');
const screen = new Screen(client);
const customDisplay = new CustomDisplay(client);

// async function main() {
//   try {
//     // await screen.turnOn();
//     // await screen.setBrightness(100);
//     // await screen.setMirrorMode(45);
//     // await screen.setHourMode(0);
//     const result = await screen.setWeatherLocation(39.7248, 43.597);

//     console.log(result);
//   } catch (error) {
//     console.log(error.message);
//   }
// }

async function main() {
  try {
    const result = await customDisplay.showText('Привет, Divoom!', {
      x: 0,
      y: 10,
      width: 720,
      height: 90,
      align: 2,
      fontSize: 64,
      fontId: 126,
      fontColor: '#FFFFFF',
      bgColor: '#000000',
    });

    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}

main();

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
