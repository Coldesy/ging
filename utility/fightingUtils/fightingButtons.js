const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js')

const fightBtns = new MessageActionRow()
   .addComponents(
      new MessageButton()
         .setCustomId('attack')
         .setLabel('Attack')
         .setStyle('SUCCESS')
         .setEmoji('966579837638688818')
      , new MessageButton()
         .setCustomId('rest')
         .setLabel('Rest')
         .setStyle('SUCCESS')
         .setEmoji('966581375027265567'),

      new MessageButton()
         .setCustomId('ability')
         .setLabel('Ability')
         .setStyle('PRIMARY')
         .setEmoji('966583916129558599'),
      // new MessageButton()
      //    .setCustomId('items')
      //    .setLabel('Items')
      //    .setStyle("SECONDARY")
      //    .setEmoji('966582769864028190'),
      new MessageButton()
         .setCustomId('end')
         .setLabel('End')
         .setStyle('DANGER')

   )


module.exports = fightBtns