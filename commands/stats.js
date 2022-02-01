const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const {registerData} = require('../main.js')





module.exports = {
	data:
     new SlashCommandBuilder().setName('stats').setDescription('Shows your current stats!'),
		
		
		

	async execute(interaction) {
       
        function neuron(){registerData.find({'userid': interaction.user.id},'nik health attack defense nen intelligence', function(err,docs){
            
           
           let a = docs.nik
           let b = docs.health
           let c = docs.attack
           let d = docs.defense
           let e = docs.nen
           let f = docs.intelligence
           return [a,b,c,d,e,f]

            
        })}
        nigga = neuron()
        let a = nigga[0]      
        let b = nigga[1]
        let c = nigga[2]
        let d = nigga[3]
        let e = nigga[4]
        let f = nigga[5]     

        const embed2 = new MessageEmbed()
        .setColor('#b3c29f')
        .setTitle(`<@${a}> Your battle stats!`)
        .addFields(
            { name: '\u200B', value: '\u200B'},
            { name: `Health: ${b}`, value: '\u200B'},  
            { name: `Attack: ${c}`, value: '\u200B'},
            { name: `Defense: ${d}`, value: '\u200B'},
            { name: `Nen Aura: ${e}`, value: '\u200B'},
            { name: `Intelligence: ${f}`, value: '\u200B'}
  
        )
        await interaction.reply({embeds: [embed2]})
        
    }
    }