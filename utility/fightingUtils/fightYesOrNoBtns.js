const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

const yesornobtns = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('yes')
            .setLabel('Accept')
            .setStyle('SUCCESS'),
        new MessageButton()
            .setCustomId('no')
            .setLabel('Decline')
            .setStyle('DANGER')
    )


module.exports = yesornobtns