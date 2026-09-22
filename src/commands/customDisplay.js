const { showTextSchema } = require('../validators/customDisplay');


class CustomDisplay {
  constructor(client) {
    this.client = client;
  }

/**
 * Отображает текст на экране Divoom
 * с заданными параметрами отображения.
 *
 * @param {string} text - текст для отображения
 * @param {Object} options - параметры текстового элемента
 * @param {number} options.x - координата X области текста
 * @param {number} options.y - координата Y области текста
 * @param {number} options.width - ширина области текста
 * @param {number} options.height - высота области текста
 * @param {number} options.align - выравнивание: 0 — слева,
 *                                 1 — справа, 2 — по центру
 * @param {number} options.fontSize - размер шрифта
 * @param {number} options.fontId - идентификатор шрифта
 * @param {string} options.fontColor - цвет текста в HEX-формате
 * @param {string} options.bgColor - цвет фона текста в HEX-формате
 * @returns {Promise<Object>} ответ устройства Divoom
 */
  async showText(text, options) {
    await showTextSchema.validate({
      text,
      ...options,
    });
    return this.client.sendCommand({
      Command: 'Device/EnterCustomControlMode',

      BackgroudImageAddr:
        'http://192.168.1.40:3000/static/the-boxhead-wanderer-pr-800x1280.jpg',

      BackgroudImageLocalFlag: 0,

      DispList: [
        {
          ID: 13,
          Type: 'Text',
          StartX: options.x,
          StartY: options.y,
          Width: options.width,
          Height: options.height,
          Align: options.align,
          FontSize: options.fontSize,
          FontID: options.fontId,
          FontColor: options.fontColor,
          BgColor: options.bgColor,
          TextMessage: text,
        },
      ],
    });
  }
}

module.exports = CustomDisplay;
