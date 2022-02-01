const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const {registerData} = require('../main.js')




const Embed1 = new MessageEmbed()
	.setColor('EE538A')
	.setTitle('Welcome to Greed Island')
	.setDescription('You have successfully completed Your registeration\nThis Bot is currently at development\nSo You will not be able to start the game as of right now')
	.setThumbnail('https://media.discordapp.net/attachments/936965500754350173/937237718944063518/laetest.jpg?width=735&height=613')
	.setImage('https://media.discordapp.net/attachments/936965500754350173/937237719506092062/latesfgt.jpg?width=812&height=613')
	.setFooter({ text: 'Adventure will begin soon!' });

module.exports = {
	data: {
		name:'register'
	}
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers player into the new world!')
		.addStringOption(o => o.setName('nickname').setDescription('set your game nick').setRequired(true)),

	async execute(interaction) {


	try {
		function statsRoll(){
			health = Math.floor(Math.random() * 20)
		    attack = Math.floor(Math.random() * 20)	
		    defense = Math.floor(Math.random() * 20)
		    nen = Math.floor(Math.random() * 20)
		    intelligence = Math.floor(Math.random() * 20)
			console.log(nen)

			while(health + attack + defense + nen + intelligence < 70){
		    health = Math.floor(Math.random() * 20)
		    attack = Math.floor(Math.random() * 20)	
		    defense = Math.floor(Math.random() * 20)
		    nen = Math.floor(Math.random() * 20)
		    intelligence = Math.floor(Math.random() * 20)
			console.log(nen)
			if (health + attack + defense + nen + intelligence < 70) {
				statsRoll() }
			else if (health + attack + defense + nen + intelligence > 70){
				return [health,attack,defense,nen,intelligence]
				break
				
			}
		
			}
		  
			}
		statsRoll()
       
		const nick = interaction.options.getString('nickname')
		var savedata = new registerData({ userId: interaction.user.id, nik: nick,health: health,attack: attack,defense: defense,nen: nen,intelligence: intelligence})
		await savedata.save()
		await interaction.user.send({ embeds: [Embed1] })} catch(err){ 
			if (err.code == 11000){
				await interaction.reply(`It looks like you have already registered\ndon't worry,We will start the game soon...`)
			}
			
		}
	}

}
