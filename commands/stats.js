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
        let neuron = await registerData.find({'userid': interaction.user.id},'-_id nik health attack defense nen intelligence', function(err,docs){
            
            let doc = docs[0].toObject()
            let a = doc.nik
            let b = doc.health
            let c = doc.attack
            let d = doc.defense
            let e = doc.nen
            let f = doc.intelligence
            return [a,b,c,d,e,f]
            
            
        
            
        
            
        }).clone()
        
      
    
        
        let a = neuron[0]
        let b = neuron[1]
        let c = neuron[2]
        let d = neuron[3]
        let e = neuron[4]
        let f = neuron[5]

        
      
        

        const embed2 = new MessageEmbed()
        .setColor('#b3c29f')
        .setTitle(`Heya ${a},Here your battle stats!`)
        .addFields(
            { name: '\u200B', value: '\u200B'},
            { name: `Health: ${b}`, value: '\u200B'},  
            { name: `Attack: ${c}`, value: '\u200B'},
            { name: `Defense: ${d}`, value: '\u200B'},
            { name: `Nen Aura: ${e}`, value: '\u200B'},
            { name: `Intelligence: ${f}`, value: '\u200B'},
            { name: `Total stats: ${b+c+d+e+f}`, value:'\u200B'}
  
        )
        await interaction.reply({embeds: [embed2]})
        
    }
    }