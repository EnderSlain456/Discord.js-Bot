// Unban Command made with SlashCommandBuilder

const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('unbans a member from the server')
    .addUserOption(option => option.setName('member').setDescription('The member you want to unban').setRequired(true)),
  async execute (interaction) {
    const userID = interaction.options.getUser('member')

    if (!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) return await interaction.reply({ content: 'You Do Not Have Permission to run this Command!' })
    if (interaction.member.id === userID) return await interaction.reply({ content: 'You Cannot Ban YourSelf', ephemeral: true })

    const UnbanEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`${userID} Has been unbanned`)

    await interaction.guild.bans.fetch()
      .then(async bans => {
        if (bans.size == 0) return await interaction.reply({ content: 'There is no one banned from this guild', ephemeral: true })
        const bannedID = bans.find(ban => ban.user.id == userID)
        if (!bannedID) return await interaction.reply({ content: 'The ID Stated is not banned from the server', ephemeral: true })

        await interaction.guild.bans.remove(userID).catch(err => {
          console.log(err)
          return interaction.reply({ content: 'I cannot unban this member' })
        })
      })

    await interaction.reply({ embeds: [UnbanEmbed] })
  }

}
