const express = require('express');
const app = express();
const DivoomClient = require('./src/client');
const Screen = require('./src/commands/screen');
const client = new DivoomClient('192.168.1.41');
const screen = new Screen(client);

screen.turnOn();

async function main() {
  const data = await client.sendCommand({
    Command: 'Channel/OnOffScreen',
    OnOff: 1,
  });

  console.log(data.ReturnMessage);
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
