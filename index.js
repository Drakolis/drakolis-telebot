const botgram = require("botgram")
const bot = botgram(process.env.TELEGRAM_BOT_TOKEN)

bot.command("strike", (msg, reply) => {
    var text = msg.args(1);
    var replyText = "";
    text.forEach(element => {
        replyText += element + "̶";
    });
    reply.text(text)
})

bot.command((msg, reply) =>
    reply.text("Invalid command."))