const botgram = require("botgram")
const bot = botgram(process.env.TELEGRAM_BOT_TOKEN)

bot.command((msg, reply) =>
    reply.text("Invalid command."))