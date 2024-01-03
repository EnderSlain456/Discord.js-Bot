const mongoose = require('mongoose')
const chalk = require('chalk')

async function connect() {
    mongoose.set('strictQuery', false)

    try {
        console.log(`${chalk.green('[database]')} Connecting to database...`)
        await mongoose.connect(process.env.mongourl, {
        })
    } catch (err) {
        console.log(`${chalk.red('[database]')} Error while connecting to database Error: ${err}`)
        console.log(`${chalk.red('[database]')} Exiting...`)
        process.exit(1)
    }

    mongoose.connection.once("open", () => {
        console.log(`${chalk.green('[database]')} Connected to database!`)
    })

    mongoose.connection.on("error", (err) => {
        console.log(`${chalk.red('[database]')} Error while connecting to database Error: ${err}`)
        console.log(`${chalk.red('[database]')} Exiting...`)
        process.exit(1)
    })
}

module.exports = connect