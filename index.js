const telegramApi = require('node-telegram-bot-api');
const express = require('express');
const dotenv = require('dotenv');
const { setHamsterKombatStatus } = require("./models/configs");

dotenv.config();

const app = express()
app.use(express.json());

const bot = new telegramApi(process.env.TOKEN, { polling: true });

bot.setMyCommands([
    { command: '/start', description: 'Start bot' },
    { command: '/stop', description: 'Stop bot' },
]);


bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    switch (text) {
        case "/start":
            await setHamsterKombatStatus(true)
            return bot.sendMessage(chatId, 'Bot started successfully');
        case "/stop":
            await setHamsterKombatStatus(false)
            return bot.sendMessage(chatId, `Bot stopped successfully`);
        default:
            return bot.sendMessage(chatId, "I can't understand you try again");
    }
});


app.get('/', (req, res) => res.send({status: 200, message: 'Server started successfully'}));


app.listen(process.env.PORT || 5500, () => {
    console.log('Server is listening on port 5500');
});

module.exports = app;
