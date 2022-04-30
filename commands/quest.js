const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers,InvModel,itemsModel,questModel } = require('../schema.js')
const Canvas = require('canvas')
const { statusCollection, abilityCollection } = require('../main.js')
const playerDatas = require('../utility/database/marketBuyClass.js');
const { title } = require('process');
const req = require('express/lib/request');
const questArr = require('../utility/others/quests.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quest')
        .setDescription('recieve your daily quest!!'),
        

    async execute(interaction) {
        try{
           
           const quest = questArr[Math.floor(Math.random()*questArr.length)]
           const dataOfPlayer = await questModel.find({'userid': interaction.user.id})
           if (dataOfPlayer[0].InQuest) {
               await interaction.reply({content:'You already have a quest!'})
               return false
           }
           dataOfPlayer[0].currentQuest = quest
           dataOfPlayer[0].InQuest = true
           await dataOfPlayer[0].save()
           await interaction.reply({content: `Your quest is to..\n${quest.description}`}) 
        } 
        catch (err) {
            console.log(err)
        }
    }}