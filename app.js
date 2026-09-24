const express = require('express');
const app = express();

const DivoomClient = require('./src/client');
const Screen = require('./src/commands/screen');
const CustomDisplay = require('./src/commands/customDisplay');
const DisplayLayout = require('./src/commands/displayLayout');
const { DisplayElement } = require('./src/elements/displayElement');

const client = new DivoomClient('192.168.1.41');
const screen = new Screen(client);
const customDisplay = new CustomDisplay();
const displayLayout = new DisplayLayout(
  client,
  'http://192.168.1.40:3000/static/the-boxhead-wanderer-pr-800x1280.jpg',
);
const convertDisplayElement = require('./src/converters/displayElementConverter');

async function main() {
  const temperature = await customDisplay.showTemperature('temperature', {
    x: 50,
    y: 100,
    width: 150,
    height: 70,
    align: 0,
    fontSize: 20,
    fontId: 0,
    fontColor: '#FFFFFF',
    bgColor: '#000000',
  });

  const text = await customDisplay.showText('greeting', 'Hello world', {
    x: 20,
    y: 200,
    width: 200,
    height: 50,
    align: 0,
    fontSize: 20,
    fontId: 0,
    fontColor: '#FFFFFF',
    bgColor: '#000000',
  });

  console.log('Temperature:');
  console.log(convertDisplayElement(temperature));

  console.log('Text:');
  console.log(convertDisplayElement(text));
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
