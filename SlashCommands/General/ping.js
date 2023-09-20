// Ping Command with Embed

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with the Bot Ping'),
  async execute (interaction) {
    const pingEmbed = new EmbedBuilder()
      .setColor('DarkRed')
      .setTitle('Ping Command')
      .setAuthor({ name: 'Discord Bot' })
      .setDescription(`🏓 | Latency is: **${Date.now() - interaction.createdTimestamp}ms.**`)

    await interaction.reply({ embeds: [pingEmbed] })
  }
}
