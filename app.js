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

async function main() {
  const text = new DisplayElement('greeting', 'Text', {
  text: 'Hello world',
  x: 20,
  y: 20,
  width: 200,
  height: 50,
});

console.log('BEFORE UPDATE:');
console.log(text);

text.update({
  x: 100,
  width: 300,
});

console.log('AFTER UPDATE:');
console.log(text);
}

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
