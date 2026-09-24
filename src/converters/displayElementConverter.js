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

function convertDisplayElement(element) {
  if (element.type === 'Temperature') {
    return createBaseElement(element, 11);
  }
  if (element.type === 'Text') {
    return {
      ...createBaseElement(element, 5),
      TextMessage: element._options.text,
    };
  }

  throw new Error(`Unsupported display element type: ${element.type}`);
}

module.exports = convertDisplayElement;
