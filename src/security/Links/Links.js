const {Events, AuditLogEvent} = require('discord.js')
const fs = require('fs')

module.exports = {
    name: Events.MessageCreate,
    async execute (message) {
        message.first().guild.fetchAuditLogs({
            type: AuditLogEvent.MessageCreate
        })

        function containsLink(message) {
            const linkRegex = /(https?:\/\/[^\s]+)/g
            return linkRegex.test(message.content)
        }

        fs.readFile('blacklisted.json', 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading JSON file:', err)
              return
            }
            
        const messages = JSON.parse(data)

        messages.array.forEach(message => {
            if (message.content.includes(containsLink)) {
                message.delete()
                message.author.timeout({ reason: "That link is blacklisted on this server!", time: 1000})
            }
                
        })
    })
    }
    
}