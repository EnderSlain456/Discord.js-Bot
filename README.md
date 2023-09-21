# Discord.js v14 Bot

This is a README File for a Discord.js v14 Bot

To install the depencencies run the following commands in the terminal (Command Prompt)

```sh

npm init -y
npm install discord.js
npm install dotenv

```

If you want you can install ESLint Package into your directory and run the commands below in terminal

```sh

npm install --save-dev eslint
npx eslint --init

```

When making Slash commands don't forget to register you commands with a the command below

In my Build the command register is a file called deploy-commands.js make sure this matches
Your Slash Command Register file

```sh

node deploy-commands.js

```

To run the Discord Bot run the following command in Terminal

```sh

node .

```
