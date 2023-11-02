const { EmbedBuilder } = require('discord.js')
require('dotenv').config()
const boostchannel = process.env.boostchannel

module.exports = client => {
    client.on('guildMemberBoost', async (member) => {
        const BoostEmbed = new EmbedBuilder()
            .setTitle('User Boosted Server')
            .setColor('DarkVividPink')
            .setDescription(`${member.user.tag} has Boosted the Server`)
            .setTimestamp()
            .setFooter('Boost Logs')
        const channel = member.guild.channels.cache.get(boostchannel)

        channel.send({ embeds: [BoostEmbed] })
    })
}