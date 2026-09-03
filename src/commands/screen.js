/**
 * Управление экраном Divoom.
 *
 * Использует DivoomClient для отправки команд
 * управления экраном на устройство.
 */
class Screen {
  constructor(client) {
    this.client = client;
  }
  turnOn() {
  return this.client.sendCommand({
    Command: 'Channel/OnOffScreen',
    OnOff: 1,
  });
}
};

module.exports = Screen;