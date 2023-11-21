const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
const logchannel = require('../../utils/config.json')

module.exports = {
  name: Events.MessageDelete,
  async execute (message) {
    message.guild.fetchAuditLogs({
      type: AuditLogEvent.MessageDelete
    })
      .then(async audit => {
        const { executor } = audit.entries.first()

        const mes = message.content

        if (!mes) return

        const mChannel = await message.guild.channels.cache.get(logchannel)

        const MessageDeleteEmbed = new EmbedBuilder()
          .setColor('Red')
          .setTitle('Message Deleted')
          .addFields({ name: 'Message Content', value: `${mes}`, inline: false })
          .addFields({ name: 'Message Channel', value: `${message.channel}`, inline: false })
          .addFields({ name: 'Deleted By', value: `${executor.tag}`, inline: false })
          .setTimestamp()
          .setFooter({ text: 'Mod logs' })

        mChannel.send({ embeds: [MessageDeleteEmbed] })
      })
  }
}
