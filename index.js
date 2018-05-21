const botgram = require("botgram")
const bot = botgram(process.env.TELEGRAM_BOT_TOKEN)

function rollDice(sides) {
    return Math.round(Math.random() * (sides - 1) + 1);
}

function rollDices(count, sides) {
    var results = [];
    for (var i = 1; i <= count; i++)
        results.push(rollDice(sides));
    return results;
}

bot.command("strike", (msg, reply) => {
    var text = msg.args(1)[0] || "зачеркнутый текст";
    var replyText = '̶';
    text.split('').forEach(element => {
        replyText += element + '̶';
    });
    reply.text(replyText)
})

bot.command("roll", (msg, reply) => {
    var roll = msg.args(1)[0] || "1d6";
    var [count, sides] = roll.split('d');

    var results = rollDices(count, sides);
    var replyText = (msg.from.firstname && (msg.from.firstname + " ")) + (msg.from.lastname && (msg.from.lastname + " ")) + "бросает " + roll + ", результат: " + results;

    reply.text(replyText)
})

bot.command((msg, reply) =>
    reply.text("Не знаю никаких '" + msg.command + "'.")
)

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
server.listen(server_port, server_host, function () {
    console.log('Listening on port %d', server_port);
});