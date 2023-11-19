// Purge Command made with SlashCommand Builder

const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js')

module.exports = {

  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Deletes Channel Messages')
    .addIntegerOption(option => option.setName('amount').setDescription('The ammount of Messages to Delete').setMinValue(1).setMaxValue(100).setRequired(true)),
  async execute (interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return interaction.reply({ content: 'You Do Not Have Permission to Run this Command', ephemeral: true })

    const number = interaction.options.getInteger('amount')

    const PurgeEmbed = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`:white_check_mark: Deleted ${number} messages`)

    await interaction.channel.bulkDelete(number)

    await interaction.reply({ embeds: [PurgeEmbed] })

    async function DeleteM () {
      await interaction.channel.bulkDelete(1)
    }

    setTimeout(DeleteM, 3000)
  }

}
