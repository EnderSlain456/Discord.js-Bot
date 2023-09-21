const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
module.exports = {
  name: Events.MessageUpdate,
  async execute (message, newMessage) {
    message.guild.fetchAuditLogs({
      type: AuditLogEvent.MessageUpdate
    })
      .then(async audit => {
        const { executor } = audit.entries.first()

        const mes = message.content

        if (!mes) return
        if (mes === newMessage) return

        const mChannel = await message.guidl.channels.cache.get('YOUR_CHANNEL_ID')

        const MessageEditEmbed = new EmbedBuilder()
          .setColor('Blue')
          .setTitle('Message Edited')
          .addFields({ name: 'Old Message', value: `${mes}`, inline: false })
          .addFields({ name: 'New Message', value: `${newMessage}`, inline: false })
          .addFields({ name: 'Edited By', value: `${executor.tag}`, inline: false })
          .setTimestamp()
          .setFooter({ text: 'Mod logs' })

        mChannel.send({ embeds: [MessageEditEmbed] })
      })
  }
}
