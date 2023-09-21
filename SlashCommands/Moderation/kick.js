// Kick Command made with SlashCommandBuilder

const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('kicks a member form the server')
    .addUserOption(option => option.setName('member').setDescription('The member you want to kick').setRequired(true)),

  async execute (interaction) {
    const target = interaction.options.getUser('member')
    const ID = target.id

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) return await interaction.reply({ content: 'You Do Not Have Permission to run this Command!' })
    if (interaction.member.id === ID) return await interaction.reply({ content: 'You Cannot kick YourSelf', ephemeral: true })

    const KickEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`Kicked ${target.username}`)

    await interaction.reply({ embeds: [KickEmbed] })

    await interaction.guild.members.kick(target)
  }

}
