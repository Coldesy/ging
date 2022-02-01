const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const {registerData} = require('../main.js')



module.exports = {
    data:{
        name:'stats'
    }
}

module.exports = {
	data:
     new SlashCommandBuilder().setName('stats').setDescription('Shows your current stats!'),
		
		
		

	async execute(interaction) {
        const embed2 = new MessageEmbed()
      .setColor('#b3c29f')
      .setTitle(`<@${interaction.user.id}> Your battle stats!`)
      .addFields(
          { name: '\u200B', value: '\u200B'},
          { name: `Health: ${a}`, value: '\u200B'},  
          { name: `Attack: ${b}`, value: '\u200B'},
          { name: `Defense: ${c}`, value: '\u200B'},
          { name: `Nen Aura: ${d}`, value: '\u200B'},
          { name: `Intelligence: ${e}`, value: '\u200B'}

      )
        registerData.find({'userid': interaction.user.id, function(err,docs){

            a = docs.health
            b = docs.attack
            c = docs.defense
            d = docs.nen
            e = docs.intelligence
     
            
        }})
        await interaction.channel.send({embeds: [embed2]})
        
    }
    }