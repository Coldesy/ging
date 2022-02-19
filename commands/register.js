const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const {registerData,Battlestats,playerStatus} = require('../main.js')




const Embed1 = new MessageEmbed()
	.setColor('EE538A')
	.setTitle('Welcome to Greed Island')
	.setDescription('You have successfully completed Your registeration\nThis Bot is currently at development\nSo You will not be able to start the game as of right now')
	.setThumbnail('https://media.discordapp.net/attachments/936965500754350173/937237718944063518/laetest.jpg?width=735&height=613')
	.setImage('https://media.discordapp.net/attachments/936965500754350173/937237719506092062/latesfgt.jpg?width=812&height=613')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers player into the new world!')
		.addStringOption(o => o.setName('nickname').setDescription('set your game nick').setRequired(true)),

	async execute(interaction) {


	try {
		const primeBattlestatus = new playerStatus({userid:interaction.user.id,battleStatus:false})
		await primeBattlestatus.save()
		function statsRoll(){
			var health = Math.floor(Math.random() * 20)
		    var attack = Math.floor(Math.random() * 20)	
		    var defense = Math.floor(Math.random() * 20)
		    var nen = Math.floor(Math.random() * 20)
		    var intelligence = Math.floor(Math.random() * 20)
	
			while(health + attack + defense + nen + intelligence < 70){
		    health = Math.floor(Math.random() * 20)
		    attack = Math.floor(Math.random() * 20)	
		    defense = Math.floor(Math.random() * 20)
		    nen = Math.floor(Math.random() * 20)
		    intelligence = Math.floor(Math.random() * 20)
			
			if (health + attack + defense + nen + intelligence > 70){
				return [health,attack,defense,nen,intelligence]
		
				
			}
		
			}
		  
			}
		statsRoll()
        let redu = statsRoll()

		let health = redu[0]
		let attack = redu[1]
		let defense = redu[2]
		let nen = redu[3]
		let intelligence = redu[4]
		let affinityarray = ['Emitter','Emitter','Emitter','Emitter','Emitter','Transmutator','Transmutator','Transmutator','Transmutator','Transmutator','Manupulator','Manupulator','Manupulator','Manupulator','Manupulator','Enhancer','Enhancer','Enhancer','Enhancer','Enhancer','Conjurer','Conjurer','Conjurer','Conjurer','Conjurer','Specialist']
		let Nenaffinity =  affinityarray[Math.floor(Math.random() * affinityarray.length)]
        let q = 100
        let w = 5		
        let e = 5
        let r = 5
        let t = 5
       
		const nick = interaction.options.getString('nickname')
		var savedata2 = new Battlestats({userid: interaction.user.id,Nenaffinity:Nenaffinity,Health:q,Attack:w,Defense:e,Nen:r,Intelligence:t})
		var savedata = new registerData({ userid: interaction.user.id, nik: nick,health: health,attack: attack,defense: defense,nen: nen,intelligence: intelligence})
		await savedata.save()
		await savedata2.save()
		await interaction.user.send({ embeds: [Embed1] })} catch(err){ 
			if (err.code == 11000){
				await interaction.reply(`It looks like you have already registered\ndon't worry,We will start the game soon...`)
			}
			
		}
	}

}
