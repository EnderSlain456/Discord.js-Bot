// require needed files

const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js')
require('dotenv').config()
const fs = require('node:fs')
const path = require('node:path')
const token = process.env.token
const welcome = require('./welcome.js')
const chalk = require('chalk')
// Gateway Intents setup

const client = new Client({ intents: [Object.keys(GatewayIntentBits)], partials: [Object.keys(Partials)] })

// Welcome.js setup

client.on('ready', () => {
  welcome(client)
})

// Connect to database

require('./database/connect.js')()

// Deploying Slash Commands

require('./deploy-commands.js')

// Folder Setup

client.commands = new Collection()

const eventsPath = path.join(__dirname, 'events')
const SlashCommandsPath = path.join(__dirname, 'SlashCommands')
const SlashCommandsFolder = fs.readdirSync(SlashCommandsPath)
const modlogPath = path.join(__dirname, 'modlogs')
const modlogFolders = fs.readdirSync(modlogPath)

// Slash Command Folder setup

for (const folder of SlashCommandsFolder) {
  const SlashCommandsFiles = fs.readdirSync(`${SlashCommandsPath}/${folder}`).filter(file => file.endsWith('.js'))

  for (const file of SlashCommandsFiles) {
    const filePath = path.join(SlashCommandsPath, folder, file)
    const command = require(filePath)

    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command)
    } else {
      console.log(chalk.yellow(`[WARNING] The commands at ${filePath} is missing a required "data" or "execute" property.`))
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

// mod logs folder setup

for (const folder of modlogFolders) {
  const modlogsFiles = fs.readdirSync(`${modlogPath}/${folder}`).filter(file => file.endsWith('.js'))

  for (const file of modlogsFiles) {
    const filePath = path.join(modlogPath, folder, file)
    const event = require(filePath)
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args))
    } else {
      client.on(event.name, (...args) => event.execute(...args))
    }
  }
}

// Error Handling
client.on('error', console.error)

process.on('unhandledRejection', error => {
  console.error(chalk.red('[Unhandled Rejection]')), error.stack
})

// logging into Discord Bot

client.login(token)
