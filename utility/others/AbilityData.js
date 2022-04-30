const { Client, Collection, Intents, MessageEmbed } = require('discord.js');



const abiArr = [
    {
        Name: 'Toxic Prick',
        Type: 'Active',
        Turns: 6,
        Nen: 6,
        status: 'poison',
        description: 'Posion your opponent!'
    },
]


const AbilityData = new Collection()

for (const abilityObj of abiArr) {

    AbilityData.set(abilityObj.Name,abilityObj)
    
}
module.exports = AbilityData