/* eslint-disable eqeqeq */
const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')

module.exports = {
  name: Events.ChannelCreate,
  async execute (channel) {
    channel.guild.fetchAuditLogs({
      type: AuditLogEvent.ChannelCreate
    })
      .then(async audit => {
        const { executor } = audit.entries.first()

        const name = channel.name
        const id = channel.id
        let type = channel.type

        if (type == 0) type = 'Text'
        if (type == 2) type = 'Voice'
        if (type == 13) type = 'Stage'
        if (type == 15) type = 'Forum'
        if (type == 5) type = 'Announcement'
        if (type == 4) type = 'Category'
        if (type == 11) type = 'Public Thread'
        if (type == 12) type = 'Private Thread'
        if (type == 10) type = 'Announcement Thread'

        const mChannel = await channel.guild.channels.cache.get('YOUR_CHANNEL_ID')

        const ChannelCreatedembed = new EmbedBuilder()
          .setColor('Green')
          .setTitle('Channel Created')
          .addFields({ name: 'Channel Name', value: `${name} (<#${id}>)`, inline: false })
          .addFields({ name: 'Channel Type', value: `${type}`, inline: false })
          .addFields({ name: 'Channel ID', value: `${id}`, inline: false })
          .addFields({ name: 'Created By', value: `${executor.tag}`, inline: false })
          .setTimestamp()
          .setFooter({ text: 'Mod logs' })

        mChannel.send({ embeds: [ChannelCreatedembed] })
      })
  }
}
