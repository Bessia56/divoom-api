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
 * Тип элемента определяет дополнительные поля
 * и внутренний ID, которые будут отправлены устройству.
 *
 * @param {DisplayElement} element - элемент для преобразования
 * @returns {Object} элемент в формате Divoom API
 * @throws {Error} если тип элемента не поддерживается
 */
function convertDisplayElement(element) {
  if (element.type === 'Temperature') {
    return createBaseElement(element, 11);
  }
  if (element.type === 'Text') {
    return {
      ...createBaseElement(element, 13),
      TextMessage: element._options.text,
    };
  }
  if (element.type === 'Image') {
    return {
      ...createBaseElement(element, 12),
      Url: element._options.url,
      ImgLocalFlag: 0,
    };
  }
  if (element.type === 'Time') {
    return createBaseElement(element, 4);
  }
  if (element.type === 'Mday') {
    return createBaseElement(element, 5);
  }
  if (element.type === 'MonYear') {
    return createBaseElement(element, 6);
  }
  if (element.type === 'Week') {
    return createBaseElement(element, 7);
  }

  throw new Error(`Unsupported display element type: ${element.type}`);
}

module.exports = convertDisplayElement;
