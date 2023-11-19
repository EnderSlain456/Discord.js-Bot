const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
const logchannel = require('../../utils/config.json')

module.exports = {
  name: Events.MessageBulkDelete,
  async execute (messages) {
    messages.first().guild.fetchAuditLogs({
      type: AuditLogEvent.MessageBulkDelete
    })
      .then(async audit => {
        const entry = audit.entries.first()
        if (!entry) return

        const { executor } = entry

        const mChannel = await messages.first().guild.channels.cache.get(logchannel)

        const MessageBulkDeleteEmbed = new EmbedBuilder()
          .setColor('Red')
          .setTitle('Messages Bulk Deleted')
          .addFields({ name: 'Amount Deleted', value: `${messages.size}`, inline: false })
          .addFields({ name: 'Message Channel', value: `${messages.first().channel}`, inline: false })
          .addFields({ name: 'Deleted By', value: `${executor.tag}`, inline: false })
          .setTimestamp()
          .setFooter({ text: 'Mod logs ' })

        mChannel.send({ embeds: [MessageBulkDeleteEmbed] })
      })
  }
}
