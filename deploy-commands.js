// Command Register File

const { REST, Routes } = require('discord.js')
require('dotenv').config()
const fs = require('node:fs')
const { token, clientId } = process.env

const commands = []

const commandFolders = fs.readdirSync('./SlashCommands')
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./SlashCommands/${folder}`).filter(file => file.endsWith('.js'))
  for (const file of commandFiles) {
    const command = require(`./SlashCommands/${folder}/${file}`)
    commands.push(command.data.toJSON())
  }
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`)

    const data = await rest.put(
      Routes.applicationCommands(clientId),
      { body: commands }
    )

    console.log(`Successfully reloaded ${data.length} application (/) commands.`)
  } catch (error) {
    console.error(error)
  }
})()
