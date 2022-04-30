const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const {Battlestats,playerStatus,abilitiesOfUsers,InvModel,questModel,battleItems} = require('../schema.js')




const Embed1 = new MessageEmbed()
	.setColor('EE538A')
	.setTitle('Welcome to Greed Island')
	.setDescription('You have successfully completed Your registeration\nThis Bot is currently at development\nSo You will not be able to start the game as of right now')
	.setThumbnail('https://media.discordapp.net/attachments/936965500754350173/937237718944063518/laetest.jpg?width=735&height=613')
	.setImage('https://media.discordapp.net/attachments/936965500754350173/937237719506092062/latesfgt.jpg?width=812&height=613')


module.exports = {
	data: new SlashCommandBuilder()
		.setName('register')
		.setDescription('Registers player into the new world!'),
		

	async execute(interaction) {


	try {
		const primeBattlestatus = new playerStatus({userid:interaction.user.id,battleStatus:false})
		await primeBattlestatus.save()
		
		
		let affinityarray = ['Emitter','Emitter','Emitter','Emitter','Emitter','Transmutator','Transmutator','Transmutator','Transmutator','Transmutator','Manupulator','Manupulator','Manupulator','Manupulator','Manupulator','Enhancer','Enhancer','Enhancer','Enhancer','Enhancer','Conjurer','Conjurer','Conjurer','Conjurer','Conjurer','Specialist']
		let Nenaffinity =  affinityarray[Math.floor(Math.random() * affinityarray.length)]
       
		const newabiObj = new abilitiesOfUsers({userid: interaction.user.id,abilities:{
			first: 'Toxic Prick',
			second: null,
			third: null
		}}
		)
		await newabiObj.save()
     
       
		
		var savedata2 = new Battlestats({userid: interaction.user.id,
			Nenaffinity:Nenaffinity,
			tier: 6,
			Exp: 0,
			Health:100,
			Attack:5,
			Defense:5,
			Nen:5,
			Intelligence:5})
		// var savedata = new registerData({ userid: interaction.user.id, nik: nick,health: health,attack: attack,defense: defense,nen: nen,intelligence: intelligence})
		// await savedata.save()
		await savedata2.save()
		let inv = new InvModel({
			userid: interaction.user.id,
			balance: 1000,
			items: [],

		})
		let quest = new questModel({
			userid: interaction.user.id,
			currentQuest: null,
			InQuest: false,
		})
		await quest.save()
		await inv.save()
		let itemsB = new battleItems({

			userid: interaction.user.id,
			items: [
				{
					first: null
				},
				{
					second: null
				},
				{
					third: null
				}
			]

		})
		await itemsB.save()
		await interaction.user.send({ embeds: [Embed1] })} catch(err){ 
			if (err.code == 11000){
				await interaction.reply(`It looks like you have already registered\ndon't worry,We will start the game soon...`)
			}
			console.log(err)
			
		}
	}

}
