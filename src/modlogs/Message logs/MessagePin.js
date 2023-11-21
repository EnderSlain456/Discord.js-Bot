const { Events, AuditLogEvent, EmbedBuilder } = require('discord.js');
const { logchannel } = require('../../utils/config.json');

module.exports = {
  name: Events.MessageUpdate,
  async execute(message) {
    message.guild.fetchAuditLogs({
      type: AuditLogEvent.MessagePin,
    })
      .then(async (audit) => {
        const { executor } = audit.entries.first();

        const mes = message.content;

        if (!mes) return;

        const mChannel = await message.guild.channels.cache.get(logchannel.logchannel);

        const MessagePinEmbed = new EmbedBuilder()
          .setColor('GREEN')
          .setTitle('Message Pinned')
          .addFields({ name: 'Message', value: `${mes}`, inline: false })
          .addFields({ name: 'Pinned By', value: `${executor.tag}`, inline: false })
          .setTimestamp()
          .setFooter('Mod logs');

        mChannel.send({ embeds: [MessagePinEmbed] });
      });
  },
};
