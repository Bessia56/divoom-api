const {
  showTextSchema,
  showImageSchema,
  showTimeSchema,
  showMdaySchema,
  showMonYearSchema,
  showWeekSchema,
  showTemperatureSchema,
} = require('../validators/customDisplay');

class CustomDisplay {
  constructor(client, backgroundUrl) {
    this.client = client;
    this.backgroundUrl = backgroundUrl;
  }

  _createDisplayElement(id, type, options) {
    // Формируем общий объект элемента для DispList.
    return {
      ID: id,
      Type: type,
      StartX: options.x,
      StartY: options.y,
      Width: options.width,
      Height: options.height,
      Align: options.align,
      FontSize: options.fontSize,
      FontID: options.fontId,
      FontColor: options.fontColor,
      BgColor: options.bgColor,
    };
  }

  _sendCustomControl(dispList) {
    return this.client.sendCommand({
      Command: 'Device/EnterCustomControlMode',
      BackgroudImageAddr: this.backgroundUrl,
      BackgroudImageLocalFlag: 0,
      DispList: dispList,
    });
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

    const element = this._createDisplayElement(5, 'Text', options);

    element.TextMessage = text;

    return this._sendCustomControl([element]);
  }

  /**
   * Отображает изображение на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {string} url - URL изображения
   * @param {Object} options - параметры изображения
   * @param {number} options.x - координата X области изображения
   * @param {number} options.y - координата Y области изображения
   * @param {number} options.width - ширина области изображения
   * @param {number} options.height - высота области изображения
   * @returns {Promise<Object>} ответ устройства Divoom
   */
  async showImage(url, options) {
    await showImageSchema.validate({
      url,
      ...options,
    });

    const element = this._createDisplayElement(13, 'Image', options);

    element.Url = url;
    element.ImgLocalFlag = 0;

    return this._sendCustomControl([element]);
  }

  /**
   * Отображает текущее время на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {Object} options - параметры отображения времени
   * @param {number} options.x - координата X области времени
   * @param {number} options.y - координата Y области времени
   * @param {number} options.width - ширина области времени
   * @param {number} options.height - высота области времени
   * @param {number} options.align - выравнивание: 0 — слева,
   *                                 1 — справа, 2 — по центру
   * @param {number} options.fontSize - размер шрифта
   * @param {number} options.fontId - идентификатор шрифта
   * @param {string} options.fontColor - цвет времени в HEX-формате
   * @param {string} options.bgColor - цвет фона времени в HEX-формате
   * @returns {Promise<Object>} ответ устройства Divoom
   */
  async showTime(options) {
    await showTimeSchema.validate(options);
    const element = this._createDisplayElement(4, 'Time', options);

    return this._sendCustomControl([element]);
  }

  /**
   * Отображает текущий день месяца на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {Object} options - параметры отображения дня месяца
   * @param {number} options.x - координата X области дня месяца
   * @param {number} options.y - координата Y области дня месяца
   * @param {number} options.width - ширина области дня месяца
   * @param {number} options.height - высота области дня месяца
   * @param {number} options.align - выравнивание: 0 — слева,
   *                                 1 — справа, 2 — по центру
   * @param {number} options.fontSize - размер шрифта
   * @param {number} options.fontId - идентификатор шрифта
   * @param {string} options.fontColor - цвет дня месяца в HEX-формате
   * @param {string} options.bgColor - цвет фона дня месяца в HEX-формате
   * @returns {Promise<Object>} ответ устройства Divoom
   */
  async showMday(options) {
    await showMdaySchema.validate(options);

    const element = this._createDisplayElement(5, 'Mday', options);

    return this._sendCustomControl([element]);
  }

  /**
   * Отображает текущий месяц и год на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {Object} options - параметры отображения месяца и года
   * @param {number} options.x - координата X области месяца и года
   * @param {number} options.y - координата Y области месяца и года
   * @param {number} options.width - ширина области месяца и года
   * @param {number} options.height - высота области месяца и года
   * @param {number} options.align - выравнивание: 0 — слева,
   *                                 1 — справа, 2 — по центру
   * @param {number} options.fontSize - размер шрифта
   * @param {number} options.fontId - идентификатор шрифта
   * @param {string} options.fontColor - цвет месяца и года в HEX-формате
   * @param {string} options.bgColor - цвет фона месяца и года в HEX-формате
   * @returns {Promise<Object>} ответ устройства Divoom
   */
  async showMonYear(options) {
    await showMonYearSchema.validate(options);
    const element = this._createDisplayElement(6, 'MonYear', options);

    return this._sendCustomControl([element]);
  }

  /**
   * Отображает текущий день недели на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {Object} options - параметры отображения дня недели
   * @param {number} options.x - координата X области дня недели
   * @param {number} options.y - координата Y области дня недели
   * @param {number} options.width - ширина области дня недели
   * @param {number} options.height - высота области дня недели
   * @param {number} options.align - выравнивание: 0 — слева,
   *                                 1 — справа, 2 — по центру
   * @param {number} options.fontSize - размер шрифта
   * @param {number} options.fontId - идентификатор шрифта
   * @param {string} options.fontColor - цвет дня недели в HEX-формате
   * @param {string} options.bgColor - цвет фона дня недели в HEX-формате
   * @returns {Promise<Object>} ответ устройства Divoom
   */
  async showWeek(options) {
    await showWeekSchema.validate(options);
    const element = this._createDisplayElement(7, 'Week', options);

    return this._sendCustomControl([element]);
  }

  /**
   * Отображает текущую температуру на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {Object} options - параметры отображения температуры
   * @param {number} options.x - координата X области температуры
   * @param {number} options.y - координата Y области температуры
   * @param {number} options.width - ширина области температуры
   * @param {number} options.height - высота области температуры
   * @param {number} options.align - выравнивание: 0 — слева,
   *                                 1 — справа, 2 — по центру
   * @param {number} options.fontSize - размер шрифта
   * @param {number} options.fontId - идентификатор шрифта
   * @param {string} options.fontColor - цвет температуры в HEX-формате
   * @param {string} options.bgColor - цвет фона температуры в HEX-формате
   * @returns {Promise<Object>} ответ устройства Divoom
   */
  async showTemperature(options) {
    await showTemperatureSchema.validate(options);
    const element = this._createDisplayElement(11, 'Temperature', options);

    return this._sendCustomControl([element]);
  }
}

module.exports = CustomDisplay;
