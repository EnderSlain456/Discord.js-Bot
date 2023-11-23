// Discord Bot on Ready Event

const { Events, ActivityType } = require('discord.js')
const chalk = require('chalk')

module.exports = {
  name: Events.ClientReady,
  once: true,
  execute (client) {
    console.log(chalk.green(`Discord Bot is Online! | ${chalk.blue(client.user.tag)}`))

    // The Status can either be ( online, idle, dnd, offline)
    client.user.setStatus('idle')

    // The Activity type can either be ( Watching, Competing, Custom, Streaming, Listening, Playing )

    client.user.setActivity('Discord.js v14', { type: ActivityType.Watching })
  }
}
