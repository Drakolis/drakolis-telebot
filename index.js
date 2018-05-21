const botgram = require("botgram")
const bot = botgram(process.env.TELEGRAM_BOT_TOKEN)

bot.command("strike", (msg, reply) => {
    var text = msg.args(1);
    var replyText = "";
    text[1].forEach(element => {
        replyText += element + "̶";
    });
    reply.text(replyText)
})

bot.command((msg, reply) =>
    reply.text("Invalid command."))