const botgram = require("botgram")
const bot = botgram(process.env.TELEGRAM_BOT_TOKEN)

bot.command("strike", (msg, reply) =>
    reply.text(msg)
)

bot.command((msg, reply) =>
    reply.text("Invalid command."))