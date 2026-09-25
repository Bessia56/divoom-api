const convertDisplayElement = require('../converters/displayElementConverter');
const { DisplayElement } = require('../elements/displayElement');

/**
 * Управление набором элементов пользовательского экрана Divoom.
 *
 * Хранит DisplayElement, преобразует их в формат Divoom API
 * и отправляет готовый layout на устройство через DivoomClient.
 */
class DisplayLayout {
  constructor(client, backgroundUrl) {
    this.client = client;
    this.backgroundUrl = backgroundUrl;
    this.elements = [];
  }

  /**
 * Добавляет элемент в layout.
 *
 * Принимает только экземпляры DisplayElement.
 *
 * @param {DisplayElement} element - элемент для добавления
 */
  add(element) {
    if (!(element instanceof DisplayElement)) {
      throw new TypeError('Expected DisplayElement');
    }

    this.elements.push(element);
  }

  /**
 * Формирует и отправляет пользовательский экран на устройство.
 *
 * Каждый DisplayElement преобразуется в формат Divoom API
 * перед формированием DispList.
 *
 * @returns {Promise<Object>} ответ устройства
 */
  send() {
    const displayList = this.elements.map(convertDisplayElement);
    return this.client.sendCommand({
      Command: 'Device/EnterCustomControlMode',
      BackgroudImageAddr: this.backgroundUrl,
      BackgroudImageLocalFlag: 0,
      DispList: displayList,
    });
  }
}

module.exports = DisplayLayout;
