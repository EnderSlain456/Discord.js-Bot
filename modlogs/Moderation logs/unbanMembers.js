const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
require('dotenv').config()
const logchannel = process.env.logchannel

module.exports = {
    name: Events.GuildBanRemove,
    async execute(member) {
        member.guild.fetchAuditLogs({
            type: AuditLogEvent.GuildBanRemove,
        })

        .then(async audit => {
            const { executor } = audit.entries.first()

            const name = member.user.username
            const id = member.user.id

            const mChannel = await member.guild.channels.cache.get(logchannel)

            const UnbanMemberEmbed = new EmbedBuilder()
                .setColor('Green')
                .setTitle('Member Unbanned')
                .addFields({ name: 'Member Name', value: `${name}`, inline: false })
                .addFields({ name: 'Member ID', value: `${id}`, inline: false })
                .addFields({ name: 'Unbanned By', value: `${executor.tag}`, inline: false })
                .setTimestamp()
                .setFooter({ text: 'Mod logs' })

            mChannel.send({ embeds: [UnbanMemberEmbed] })    
        })
    }
}