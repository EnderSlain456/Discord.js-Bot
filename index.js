// require needed files

const { Client, Collection, GatewayIntentBits } = require('discord.js')
const { token } = require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')

// Gateway Intents setup

const client = new Client({ intents: [GatewayIntentBits.DirectMessages, GatewayIntentBits.Guilds] })

// Command setup

client.commands = new Collection()

const eventsPath = path.join(__dirname, 'events')
const SlashCommandsPath = path.join(__dirname, 'SlashCommands')
const SlashCommandsFolder = fs.readdirSync(SlashCommandsPath)

// Slash Command Folder setup

for (const folder of SlashCommandsFolder) {
  const SlashCommandsFiles = fs.readdirSync(`./SlashCommands/${folder}`).filter(file => file.endsWith('.js'))

  for (const file of SlashCommandsFiles) {
    const filePath = path.join(SlashCommandsPath, folder, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command)
    } else {
      console.log(`[WARNING] The commands at ${filePath} is missing a required "data" or "execute" property.`)
    }
  }
}

// Events folder setup

const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}

// Error Handling
client.on('error', console.error)

process.on('unhandledRejection', error => {
  console.error('unhandled Rejection:', error.stack)
})

// logging into Discord Bot

client.login(token)
