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


module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove_ability')
        .setDescription('delete your ability!')
        .addNumberOption(o => o.setName('ability').setDescription(' ability to delete! ').setRequired(true)),
        

    async execute(interaction) {

        let ability = interaction.options.getNumber('ability')
        const abilityOfuser = await abilitiesOfUsers.find({'userid': interaction.user.id},'abilities')
        if (ability <= 0 || ability > 3) {
            interaction.reply('Invalid Ability!')
            return false
        }

        if (ability === 3){
            ability = 'third'
        }
        if (ability === 2){
            ability = 'second'
        }
        if (ability === 1){
            ability = 'first'
        }
        if(abilityOfuser[0].abilities[ability] === null){

            interaction.reply('you do not have that ability!')
            return false

        }
        abilityOfuser[0].abilities[ability] = null
        await abilityOfuser[0].save()
        await interaction.reply('successfully deleted!')

    }}