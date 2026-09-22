const {
  brightnessSchema,
  mirrorModeSchema,
  hourModeSchema,
  longitudeSchema,
  latitudeSchema,
} = require('../validators/screen');

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

  turnOff() {
    return this.client.sendCommand({
      Command: 'Channel/OnOffScreen',
      OnOff: 0,
    });
  }

  /**
   * Устанавливает яркость экрана Divoom.
   *
   * @param {number} brightness - уровень яркости от 0 до 100
   */
  async setBrightness(brightness) {
    await brightnessSchema.validate(brightness);

    return this.client.sendCommand({
      Command: 'Channel/SetBrightness',
      Brightness: brightness,
    });
  }

  /**
   * Переключает зеркальное отображение экрана Divoom.
   *
   * @param {number} mode - режим: 1 — включить зеркальное отображение,
   *                        0 — вернуть обычное отображение
   */
  async setMirrorMode(mode) {
    await mirrorModeSchema.validate(mode);

    return this.client.sendCommand({
      Command: 'Device/SetMirrorMode',
      Mode: mode,
    });
  }

  /**
   * Устанавливает формат отображения времени на экране Divoom.
   *
   * @param {number} mode - режим: 1 — 24-часовой, 0 — 12-часовой
   */
  async setHourMode(mode) {
    await hourModeSchema.validate(mode);

    return this.client.sendCommand({
      Command: 'Device/SetTime24Flag',
      Mode: mode,
    });
  }

  /**
   * Устанавливает координаты для получения информации о погоде.
   *
   * @param {number} latitude - широта от -90 до 90
   * @param {number} longitude - долгота от -180 до 180
   */
  async setWeatherLocation(longitude, latitude) {
    await longitudeSchema.validate(longitude);
    await latitudeSchema.validate(latitude);

    return this.client.sendCommand({
      Command: 'Sys/LogAndLat',
      Longitude: String(longitude),
      Latitude: String(latitude),
    });
  }
}

module.exports = Screen;
