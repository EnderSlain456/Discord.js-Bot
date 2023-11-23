const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
const { logchannel } = require('../../utils/config.json')

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        try {
            // Fetch kick logs
            const kickLogs = await member.guild.fetchAuditLogs({
                type: AuditLogEvent.MemberKick
            })

            // Find the kick log for the current member
            const kickLog = kickLogs.entries.find(
                (log) => log.target.id === member.id
            )

            // Check if there is a kick log and the reason is present
            if (kickLog) {
                const { executor } = kickLog

                const name = member.user.username
                const id = member.user.id

                const mChannel = await member.guild.channels.cache.get(logchannel)

                const KickedMemberEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle('Member Kicked')
                    .addFields({ name: 'Member Name', value: `${name}`, inline: false })
                    .addFields({ name: 'Member ID', value: `${id}`, inline: false })
                    .addFields({ name: 'Kicked By', value: `${executor.tag}`, inline: false })
                    .setTimestamp()
                    .setFooter({ text: 'Mod logs' })

                mChannel.send({ embeds: [KickedMemberEmbed] })
            }
        } catch (error) {
            console.error(error)
        }
    }
}
