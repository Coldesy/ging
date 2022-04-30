const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers,InvModel,itemsModel } = require('../schema.js')
const Canvas = require('canvas')
const { statusCollection, abilityCollection } = require('../main.js')
const playerDatas = require('../utility/database/marketBuyClass.js');
const { title } = require('process');
let marketemd = {
    color: '#96ff96',
    title: `Welcome to hunters' market`,
    fields: []
}
module.exports = {
    data: new SlashCommandBuilder()
        .setName('market')
        .setDescription('buy hunter exclusive merchs!!'),
        

    async execute(interaction) {
        try{
           const market = await itemsModel.find()
           
           market.forEach(element => {
               marketemd.fields.unshift({
                   name: element.Name,
                   value: `Cost: ${element.Cost}<:Jenny:954297816090554408>\nType: ${element.Type}\nDescription: ${element.Description}\nId: ${element.ID}\n\nㅤ`
               })
           });
           const player1 =  new playerDatas(interaction.user.id)
           let playerdata = await player1.findBattleData()
           playerdata.Health = 1
           
           await interaction.reply({embeds:[marketemd]})
           marketemd.fields = []
        }
        catch(err){
            console.log(err)
        }
    }}