/**
 * Клиент для взаимодействия с локальным API Divoom.
 *
 * Хранит IP-адрес устройства и предоставляет
 * общий метод для отправки JSON-команд.
 */
class DivoomClient {
  constructor(ip) {
    this.ip = ip;
  }

  /**
   * Отправляет команду на Divoom и возвращает
   * распарсенный JSON-ответ от устройства.
   *
   * @param {Object} command - команда в формате API Divoom
   * @returns {Promise<Object>} ответ устройства
   */
  async sendCommand(command) {
    const response = await fetch(`http://${this.ip}:9000/divoom_api`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(command),
    });
    const data = await response.json();

    if (data.ReturnCode !== 0) {
      throw new Error(data.ReturnMessage);
    }

    return data;
  }
}

module.exports = DivoomClient;
