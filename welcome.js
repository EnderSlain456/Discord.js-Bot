const { EmbedBuilder } = require('discord.js')
require('dotenv').config()
const welcomechannel = process.env.welcomechannel

module.exports = client => {
  client.on('guildMemberAdd', async (member) => {
    const welcomeEmbed = new EmbedBuilder()
      .setColor('White')
      .setDescription(`Welcome ${member} to ` + member.guild.name)

    const channel = member.guild.channels.cache.get(welcomechannel)

    channel.send({ embeds: [welcomeEmbed] })
  })
}