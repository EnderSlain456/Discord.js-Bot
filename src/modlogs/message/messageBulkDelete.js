const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
const { logchannel } = require('../../utils/config.json')

module.exports = {
  name: Events.MessageBulkDelete,
  async execute (interaction) {
    interaction.first().guild.fetchAuditLogs({
      type: AuditLogEvent.MessageBulkDelete
    })
        const mChannel = await interaction.first().guild.channels.cache.get(logchannel)

        const MessageBulkDeleteEmbed = new EmbedBuilder()
          .setColor('Red')
          .setTitle('Messages Bulk Deleted')
          .addFields({ name: 'Amount Deleted', value: `${interaction.size}`, inline: false })
          .addFields({ name: 'Message Channel', value: `${interaction.first().channel}`, inline: false })
          .addFields({ name: 'Deleted By', value: `${interaction.first().author.tag}`, inline: false })
          .setTimestamp()
          .setFooter({ text: 'Mod logs ' })

        mChannel.send({ embeds: [MessageBulkDeleteEmbed] })
 
  }
}