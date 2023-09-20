// Discord Bot on Ready Event

const { Events, ActivityType } = require('discord.js')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute (client) {
    console.log(` Discord Bot is Online! | ${client.user.tag} `)

    // The Status can either be ( online, idle, dnd, offline)
    client.user.setStatus('idle')

    // The Activity type can either be ( Watching, Competing, Custom, Streaming, Listening, Playing )

    client.user.setActivity(' Discord.js v14', { type: ActivityType.Watching })
  }
}
