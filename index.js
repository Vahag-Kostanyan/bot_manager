const telegramApi = require('node-telegram-bot-api');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { setHamsterKombatStatus } = require("./models/configs");
const { sendHamsterKombatNotification } = require('./notification/hamster_kombatt');

dotenv.config();

const corsOptions = {
  origin: '*', // This allows all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
};

const app = express()
app.use(express.json());
app.use(cors());
app.use(express.static('static'))

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

app.post('/send_hamster_kombat_notification', (req, res) => {
    sendHamsterKombatNotification();
    res.send({status: 200});
});


app.listen(process.env.PORT || 5500, () => {
    console.log('Server is listening on port 5500');
});

module.exports = app;