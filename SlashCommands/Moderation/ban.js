// Ban Command using SlashCommand Builder with Embeded messages

const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('bans a member from the server')
    .addUserOption(option => option.setName('member').setDescription('The member you want to ban').setRequired(true))
    .addStringOption(option => option.setName('reason').setDescription('The Reason why the Member is getting Banned').setRequired(true)),
  async execute (interaction) {
    const target = interaction.options.getUser('member')
    const ID = target.id

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: 'You Do Not Have Permission to run this Command!' })
    if (interaction.member.id === ID) return await interaction.reply({ content: 'You Cannot Ban YourSelf', ephemeral: true })

    let reason = interaction.options.getString('reason')
    if (!reason) reason = 'No Reason Given'

    const dmEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`You have been Banned from ${interaction.guild.name} | ${reason}`)

    const BanEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`Banned ${target.username} for reason: ${reason}`)

    await interaction.reply({ embeds: [BanEmbed] })

    await target.send({ embeds: [dmEmbed] })

    await interaction.guild.members.ban(target, { reason: [reason] })
  }

}
