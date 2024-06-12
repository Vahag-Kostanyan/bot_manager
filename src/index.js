const telegramApi = require('node-telegram-bot-api');
const http = require('http');
const dotenv = require('dotenv');
const { setHamsterKombatStatus } = require("./models/configs");

dotenv.config();

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


const server = http.createServer(async (req, res) => {
    try {
        // Set the response headers and status code
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 200, message: 'Started successfully' }));
    } catch (error) {
        console.log(error);
        // Handle any errors that occur during request processing
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal Server Error' }));
    }
});


server.listen(process.env.PORT || 5500, () => {
    console.log('Server is listening on port 5500');
})