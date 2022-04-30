const {Collection} = require('discord.js')
const fs = require('fs')
const abilityCollection = new Collection()
const abilityFiles = fs.readdirSync(`abilities`).filter(filter => filter.endsWith('.js'))
for (const file of abilityFiles) {
    const ability = require(`../../abilities/${file}`)
    const abilityName = file.replace(/.js/g, '')
    abilityCollection.set(abilityName, ability)


}
module.exports.abilityCollection = abilityCollection