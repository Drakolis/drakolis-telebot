const botgram = require("botgram")
const bot = botgram(process.env.TELEGRAM_BOT_TOKEN)
const http = require('http');

function senderName(msg) {
    return (msg.from.firstname && (msg.from.firstname + " ")) + (msg.from.lastname && (msg.from.lastname + " "));
}

function rollDice(sides) {
    return Math.round(Math.random() * (sides - 1) + 1);
}

function rollDices(count, sides) {
    var results = [];
    for (var i = 1; i <= count; i++)
        results.push(rollDice(sides));
    return results;
}

bot.command("start", "help", (msg, reply) => {
    reply.text(`Я могу:
    Писать этот гайд: __/start__ или __/help__
    Зачеркивать текст: __/strike <текст для зачеркивания>__
    Кидать кубики: __/roll <количество>d<стороны>__
    Принимать решения: __/decide <опция1>,<опция2>,..,<опцияN>__
    Больше я ничего не знаю.
    `)
})

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
    try {
        var [count, sides] = roll.split('d');
        if (!count || !sides) {
            throw new Error();
        }
        var results = rollDices(count, sides);
        var replyText = senderName(msg) + "бросает " + roll + ", результат: " + results;

        reply.text(replyText)
    }
    catch (err) {
        reply.text(senderName(msg) + "бросает какую-то херню, результат: " + senderName(msg) + " - наркоман")
    }
})

bot.command("decide", (msg, reply) => {
    var options = (msg.args(1)[0] || "1").split(',');
    if (options.length < 2) { reply.text("Введите хотябы ДВА варианта для выбора через запятую"); return; }

    var optionId = rollDice(options.length) - 1;
    reply.text("Лично я бы выбрал '" + options[optionId].trim() + "'");
 })

bot.command((msg, reply) =>
    reply.text("Не знаю никаких '" + msg.command + "'.")
)

var server_port = process.env.YOUR_PORT || process.env.PORT || 80;
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Че ты тут забыл, наркоман?');
    res.end();
}).listen(server_port);