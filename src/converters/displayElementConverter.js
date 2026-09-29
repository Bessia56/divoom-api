/**
 * Формирует общую часть объекта элемента в формате Divoom API.
 *
 * Используется для элементов, которые имеют одинаковые
 * параметры расположения и отображения.
 *
 * @param {DisplayElement} element - внутренний элемент библиотеки
 * @param {number} id - внутренний ID элемента для Divoom API
 * @returns {Object} объект элемента в формате Divoom API
 */
function createBaseElement(element, id) {
  return {
    ID: id,
    Type: element.type,
    StartX: element._options.x,
    StartY: element._options.y,
    Width: element._options.width,
    Height: element._options.height,
    Align: element._options.align,
    FontSize: element._options.fontSize,
    FontID: element._options.fontId,
    FontColor: element._options.fontColor,
    BgColor: element._options.bgColor,
  };
}

/**
 * Преобразует внутренний DisplayElement
 * в объект, совместимый с форматом Divoom API.
 *
 * Тип элемента определяет дополнительные поля.
 *
 * @param {DisplayElement} element - элемент для преобразования
 * @param {number} id - внутренний ID элемента для Divoom API
 * @returns {Object} элемент в формате Divoom API
 * @throws {Error} если тип элемента не поддерживается
 */
function convertDisplayElement(element, id) {
  if (element.type === 'Temperature') {
    return createBaseElement(element, id);
  }
  if (element.type === 'Text') {
    return {
      ...createBaseElement(element, id),
      TextMessage: element._options.text,
    };
  }
  if (element.type === 'Image') {
    return {
      ...createBaseElement(element, id),
      Url: element._options.url,
      ImgLocalFlag: 0,
    };
  }
  if (element.type === 'Time') {
    return createBaseElement(element, id);
  }
  if (element.type === 'Mday') {
    return createBaseElement(element, id);
  }
  if (element.type === 'MonYear') {
    return createBaseElement(element, id);
  }
  if (element.type === 'Week') {
    return createBaseElement(element, id);
  }
  if (element.type === 'Weather') {
    return {
      ...createBaseElement(element, id),
      Url: element._options.url,
    };
  }
  if (element.type === 'NetData') {
    return {
      ...createBaseElement(element, id),
      Url: element._options.url,
      RuleInfo: element._options.ruleInfo,
      RequestTime: element._options.requestTime,
    };
  }

  throw new Error(`Unsupported display element type: ${element.type}`);
}

module.exports = convertDisplayElement;
