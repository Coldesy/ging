const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers,InvModel } = require('../schema.js')
const Canvas = require('canvas')
const { statusCollection } = require('../schema.js')

const UseClass = require('../utility/database/itemUseClass.js')


module.exports = {
    data: new SlashCommandBuilder()
        .setName('use')
        .setDescription('buy hunter exclusive merchs!!')
        .addNumberOption(o => o.setName('itemid').setDescription('item you want to use').setRequired(true)),
        

    async execute(interaction) {
        try{
            const itemid = interaction.options.getNumber('itemid')
         

            const useItem = new UseClass(interaction.user.id,itemid,interaction)
            await useItem.findItem()
            await useItem.setIndex()
            await useItem.useItem()
            await useItem.saveItem()
            
            
        }
        catch(err){
            console.log(err)
        }
    }}