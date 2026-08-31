const express = require("express");
const app = express();


app.use('/static', express.static('C:/Users/itach/OneDrive/Изображения/Тест картинки'))

async function testDivoom() {
    try {
        const response = await fetch(
            'http://192.168.1.41:9000/divoom_api',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Command: 'Channel/OnOffScreen',
                    OnOff: 1
                })
            }
        );

        const data = await response.text();

        console.log('Статус:', response.status);
        console.log('Ответ от Divoom:', data);
    } catch (error) {
        console.error('Ошибка подключения к Divoom:', error.message);
    }
}

testDivoom();

app.use((req, res) => {
    return res.status(404).send({
        error: 'Прости брат тут ничего нет'
    })
});


app.listen(3000, "0.0.0.0", () => {
    console.log("Server running on port 3000");
});
