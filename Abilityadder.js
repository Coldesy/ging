const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection, Collector } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus,abilitiesOfUsers } = require('./main.js')
const fs = require('fs')
const Canvas = require('canvas')
const monsterObjArr = require('./monsters.js')
const { abilityCollection } = require('./main.js')

module.exports.Abilityadder = {
      async execute(interaction,AbilityDrops){
          
        if(AbilityDrops === undefined){
            return false
        }
        const abilitydocs = await abilitiesOfUsers.find({ 'userid': interaction.user.id }, 'userid abilities', function (err, docs) {


            if (docs[0] === undefined) {
                return

            }

            if (true) { return docs }
        }).clone();
      
        
        if (abilitydocs[0].abilities.first === null){
            abilitydocs[0].abilities.first = AbilityDrops
        }
        else if (abilitydocs[0].abilities.second === null && abilitydocs[0].abilities.second !== abilitydocs[0].abilities.first && abilitydocs[0].abilities.second !== abilitydocs[0].abilities.third ){
            abilitydocs[0].abilities.second = AbilityDrops
        }
        else if (abilitydocs[0].abilities.third === null && abilitydocs[0].abilities.third !== abilitydocs[0].abilities.first && abilitydocs[0].abilities.third !== abilitydocs[0].abilities.second){
            abilitydocs[0].abilities.third = AbilityDrops
        }
        abilitydocs[0].save()
        



    }
}