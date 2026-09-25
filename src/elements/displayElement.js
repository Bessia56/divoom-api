/**
 * Внутреннее представление элемента пользовательского экрана.
 *
 * Хранит данные элемента в формате библиотеки
 * и не содержит полей, специфичных для Divoom API.
 *
 * @param {string} key - уникальный ключ элемента внутри layout
 * @param {string} type - тип элемента
 * @param {Object} options - параметры элемента
 */
class DisplayElement {
  constructor(key, type, options) {
    this.key = key;
    this.type = type;

    this._options = options;// Внутренние параметры элемента, используемые converter.
  }
}

module.exports = {
  DisplayElement,
};
