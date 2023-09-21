// Member join log

// You can install moment by running: npm install moment

const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js')
const moment = require('moment')

module.exports = {
  name: Events.GuildMemberAdd,
  async execute (member) {
    member.guild.fetchAuditLogs({
      type: AuditLogEvent.GuildMemberAdd
    })
      .then(async => {
        const name = member.user.username
        const id = member.user.id

        const accountcreated = member.user.createdAt
        const accountage = moment.duration(new Date() - accountcreated)
        const avatarURL = member.user.displayAvatarURL()

        const mChannel = member.guild.channels.cache.get('YOUR_CHANNEL_ID')

        const MemberLogEmbed = new EmbedBuilder()
          .setColor('Blue')
          .setTitle('Member Joined')
          .addFields({ name: 'Member Name', value: `${name} (<@${id}>)`, inline: false })
          .addFields({ name: 'Member ID', value: `${id}`, inline: false })
          .addFields({ name: 'Account Created', value: `${accountcreated}`, inline: false })
          .addFields({ name: 'Account Age', value: `${accountage.years()} years, ${accountage.months()} months, ${accountage.days()} days old.`, inline: false })
          .setThumbnail(avatarURL)
          .setTimestamp()
          .setFooter({ text: 'Member Join log' })

        mChannel.send({ embeds: [MemberLogEmbed] })
      })
  }
}
