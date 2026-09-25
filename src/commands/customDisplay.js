const {
  showTextSchema,
  showImageSchema,
  showTimeSchema,
  showMdaySchema,
  showMonYearSchema,
  showWeekSchema,
  showTemperatureSchema,
} = require('../validators/customDisplay');
const { DisplayElement } = require('../elements/displayElement');

/**
 * Создание элементов для пользовательского экрана Divoom.
 *
 * Проверяет параметры элементов и создаёт DisplayElement,
 * который хранит их внутреннее состояние.
 */
class CustomDisplay {
  /**
 * Создаёт текстовый элемент для пользовательского экрана.
 *
 * @param {string} key - уникальный ключ элемента внутри layout
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
 * @returns {Promise<DisplayElement>} созданный элемент
 */
  async showText(key, text, options) {
    await showTextSchema.validate({
      text,
      ...options,
    });

    return new DisplayElement(key, 'Text', {
      text,
      ...options,
    });
  }

/**
 * Создаёт элемент изображения для пользовательского экрана.
 *
 * @param {string} key - уникальный ключ элемента внутри layout
 * @param {string} url - URL изображения
 * @param {Object} options - параметры изображения
 * @param {number} options.x - координата X области изображения
 * @param {number} options.y - координата Y области изображения
 * @param {number} options.width - ширина области изображения
 * @param {number} options.height - высота области изображения
 * @returns {Promise<DisplayElement>} созданный элемент
 */
  async showImage(key, url, options) {
    await showImageSchema.validate({
      url,
      ...options,
    });

    return new DisplayElement(key, 'Image', {
      url,
      ...options,
    });
  }

  /**
   * Отображает текущее время на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {string} key - уникальный ключ элемента внутри layout
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
   * @returns {Promise<DisplayElement>} созданный элемент
   * 
   */
  async showTime(key, options) {
    await showTimeSchema.validate(options);

    return new DisplayElement(key, 'Time', options);
  }

  /**
   * Отображает текущий день месяца на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {string} key - уникальный ключ элемента внутри layout
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
   * @returns {Promise<DisplayElement>} созданный элемент
   */
  async showMday(key, options) {
    await showMdaySchema.validate(options);

    return new DisplayElement(key, 'Mday', options);
  }

  /**
   * Отображает текущий месяц и год на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {string} key - уникальный ключ элемента внутри layout
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
   * @returns {Promise<DisplayElement>} созданный элемент
   */
  async showMonYear(key, options) {
    await showMonYearSchema.validate(options);

    return new DisplayElement(key, 'MonYear', options);
  }

  /**
   * Отображает текущий день недели на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {string} key - уникальный ключ элемента внутри layout
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
   * @returns {Promise<DisplayElement>} созданный элемент
   */
  async showWeek(key, options) {
    await showWeekSchema.validate(options);

    return new DisplayElement(key, 'Week', options);
  }

  /**
   * Отображает текущую температуру на экране Divoom
   * с заданными параметрами отображения.
   *
   * @param {string} key - уникальный ключ элемента внутри layout
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
   * @returns {Promise<DisplayElement>} созданный элемент
   */
  async showTemperature(key, options) {
    await showTemperatureSchema.validate(options);

    return new DisplayElement(key, 'Temperature', options);
  }
}

module.exports = CustomDisplay;
