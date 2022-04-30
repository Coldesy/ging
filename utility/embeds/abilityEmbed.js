const data = require('../others/AbilityData.js')

module.exports = (passiveAbilities,activeAbilities) => {
    let embed = {
        color: '#4527A0',
        title:`__**List of your abilities**__`,
        fields: [],
        thumbnail: {
            url: 'https://cdn.discordapp.com/attachments/757198474457382942/954242015745409064/hxhlogo.png'
        }


    }
    const abiarr = activeAbilities.concat(passiveAbilities)
    abiarr.forEach(element => {
        embed.fields.push({
            name: `__**${element}**__`,
            value: `Nen Cost: ${data.get(element).Nen}\nDescription: ${data.get(element).description}
            ㅤ`
        })
    });

    return embed
}
