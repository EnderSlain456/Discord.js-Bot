const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
const logchannel = require('../../utils/config.json')

module.exports = {
    name: Events.ChannelDelete,
    async execute(channel) {
        channel.guild.fetchAuditLogs({
            type: AuditLogEvent.ChannelDelete,
        })
        .then(async audit => {
            const { executor } = audit.entries.first()
            
            const name = channel.name
            const id = channel.id
            let type = channel.type

            if (type == 0) type = 'Text'
            if (type == 2) type = 'Voice'
            if (type== 13) type = 'Stage'
            if (type == 15) type = 'Form'
            if (type == 5) type = 'Announcement'
            if (type == 4) type = 'Category'
            if (type == 11) type = 'Public Thread'
            if (type == 12) type = 'Private Thread'
            if (type == 10) type = 'Announcement Thread'

            const mChannel = await channel.guild.channels.cache.get(logchannel)

            const ChannelDeleteEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Channel Deleted')
                .addFields({ name: 'Channel Name', value: `${name}`, inline: false })
                .addFields({ name: 'Channel Type', value: `${type}`, inline: false })
                .addFields({ name: 'Channel ID', value: `${id}`, inline: false })
                .addFields({ name: 'Deleted By', value: `${executor.tag}`, inline: false })
                .setTimestamp()
                .setFooter({ text: 'Mod logs' })
            
            mChannel.send({ embeds: [ChannelDeleteEmbed] })

        })
    }
}