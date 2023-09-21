const { EmbedBuilder } = require('discord.js')

module.exports = client => {
  client.on('guildMemberAdd', async (member) => {
    const welcomeEmbed = new EmbedBuilder()
      .setColor('White')
      .setDescription(`Welcome ${member} to ` + member.guild.name)

    const channel = member.guild.channels.cache.get('YOUR_CHANNEL_ID')

    channel.send({ embeds: [welcomeEmbed] })
  })
}
