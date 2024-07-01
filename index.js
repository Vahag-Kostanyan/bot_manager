const telegramApi = require('node-telegram-bot-api');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { setHamsterKombatStatus, setPSPStatus } = require("./models/configs");
const { sendHamsterKombatNotification } = require('./notification/hamster_kombatt');
const { climeDailyCipher } = require('./api/clime-daily-cipher');

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
    { command: '/hamster_kombat/start', description: 'Start hamster_kombat bot' },
    { command: '/hamster_kombat/stop', description: 'Stop hamster_kombat bot' },
    { command: '/psp/start', description: 'Start psp bot' },
    { command: '/psp/stop', description: 'Stop psp bot' },
]);


bot.on('message', async msg => {
    const text = msg.text;
    const chatId = msg.chat.id;

    switch (text) {
        case "/hamster_kombat/start":
            await setHamsterKombatStatus(true)
            return bot.sendMessage(chatId, 'Bot for hamser_kombat started successfully');
        case "/hamster_kombat/stop":
            await setHamsterKombatStatus(false)
            return bot.sendMessage(chatId, `Bot for hamser_kombat stopped successfully`);
        case "/psp/start":
            await setPSPStatus(true)
            return bot.sendMessage(chatId, `Bot for psp stopped successfully`);
        case "/psp/stop":
            await setPSPStatus(false)
            return bot.sendMessage(chatId, `Bot for psp stopped successfully`);
        default:
            if(msg?.text?.includes('clime_daily_cipher')){
                climeDailyCipher(msg?.text?.split('-')[1] || null);
            }else{
                return bot.sendMessage(chatId, "I can't understand you try again");
            }
    }
});


app.get('/', (req, res) => res.send({status: 200, message: 'Server working'}));

app.post('/send_notification', (req, res) => {
    let message = req?.body?.message || 'we don\'t receive any message' 
    sendHamsterKombatNotification(message);
    res.send({status: 200});
});


app.listen(process.env.PORT || 5500, () => {
    console.log('Server is listening on port 5500');
});

module.exports = app;