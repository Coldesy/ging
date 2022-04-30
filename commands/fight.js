const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection } = require('discord.js')
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
const fightContinue = require('../utility/fightingUtils/fightContinue.js')






module.exports = {
    data: new SlashCommandBuilder()
        .setName('fight')
        .setDescription('Fight')
        .addUserOption(o => o.setName('opponent').setDescription('Your opponent').setRequired(true)),

    async execute(interaction) {
        try {

            const opponent = interaction.options.getUser('opponent')

            const filter = (i) => {
                i.deferUpdate()
                return  true
            }
            const mainFilter= (i) => {
                i.deferUpdate()
                return opponent.id === i.user.id || interaction.user.id === i.user.id
            }

            


            const playerClass = new Fight(interaction, interaction.user.id,interaction.user.username)
            const opponentClass = new Fight(interaction, opponent.id,opponent.username);


            let oppoStatus = await opponentClass.playerStatusFetch()
            let playerStatus = await playerClass.playerStatusFetch()

            await playerClass.playerDataFetch()
            await opponentClass.playerDataFetch()


            await playerClass.abilityDataFetch()
            await opponentClass.abilityDataFetch()

            await playerClass.battleItemsCreate()
            await opponentClass.battleItemsCreate()


            
          
            // if (oppoStatus.battleStatus === true || playerStatus.battleStatus === true) {
            //     await interaction.reply({ content: `You or your opponent is currently in battle!` })
            //     return false
            // }




            const MainMsg = await interaction.reply({ content: `<@${opponent.id}>\n Accept or Decline`, components: [yesornobtns], fetchReply: true })

            const mainmsgcollector = MainMsg.createMessageComponentCollector({filter, componentType: 'BUTTON', time: 600000,max: 1})
            await mainmsgcollector.on('collect', async (i) => {
                if (i.customId === 'no') {
                    await interaction.editReply({content: 'declined'})
                    return false
                }
                if (i.customId === 'yes') {
                   
                    await fightContinue.execute(interaction,playerClass,opponentClass,mainFilter)
                   
            }
            })
            
            
            
            



        }
        catch (err) {
           
                await interaction.editReply({content: 'Please register'})
            
            console.log(err)
        }
    }
}
