const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
const { logchannel } = require('../../utils/config.json')

module.exports = {
    name: Events.GuildBanAdd,
    async execute(member) {
            
            const name = member.user.username
            const id = member.user.id

            const mChannel = await member.guild.channels.cache.get(logchannel)

            const BannedMemberEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle('Member Banned')
                .addFields({ name: 'Member Name', value: `${name}`, inline: false })
                .addFields({ name: 'Member ID', value: `${id}`, inline: false })
                .addFields({ name: 'Banned By', value: `${member.author}`, inline: false })
                .setTimestamp()
                .setFooter({ text: 'Mod logs' })
            
            mChannel.send({ embeds: [BannedMemberEmbed] })
    }
}