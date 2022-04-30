const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection, MessageButton } = require('discord.js')
const fightBtns = require('./fightingButtons')
const fightemd = require('../embeds/fightembed.js')
const abilityemd = require('../embeds/abilityEmbed.js')




module.exports = {
    async execute(interaction, playerClass, oppoClass) {
        try {

            let playerAbiBtns = await playerClass.abilityBtnsCreate()
            let oppoAbiBtns = await oppoClass.abilityBtnsCreate()


            await playerClass.prepare()
            await oppoClass.prepare()


            await playerClass.battlePreps()
            await oppoClass.battlePreps()


            const mainMsg = await interaction.editReply({ content: ' ', embeds: [fightemd('none', 'none', playerClass, oppoClass)], components: [fightBtns], fetchReply: true })
            const mainmsgCollector = mainMsg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 })
            
            let arrOfAbi
            if (playerClass.activeAbility === undefined && oppoClass.activeAbility === undefined) {
                
            }
            else {
                let playerActive = playerClass.activeAbility
                let oppoActive = oppoClass.activeAbility
                 arrOfAbi = playerActive.concat(oppoActive)
            }
            playerClass.turn = true


            let turns // this will increase by two for both turns
            let playerturn;
            let status = 'none'
            let msg
            let oppoturn;


            mainmsgCollector.on('collect', async (i) => {
                if (oppoClass.Health <= 0|| playerClass.Health <= 0 ) {
                    if (oppoClass.Health <= 0 && playerClass.Health <= 0) {
                        await interaction.editReply({content: 'No one won',embeds: [],components: []})
                    }
                    if (playerClass.Health <= 0) {
                        msg = await playerClass.end(oppoClass)
                        await interaction.editReply({content: msg,embeds: [],components: []})
                    }
                    if (oppoClass.Health <= 0) {
                        msg = await oppoClass.end(playerClass)
                        await interaction.editReply({content: msg,embeds: [],components: []})
                    }
                }
                if(i.customId === 'end') {
                    if (i.user.id === playerClass.userid && playerClass.turn) {
                         msg = await playerClass.end(oppoClass,playerturn)
                         await interaction.editReply({content: msg,embeds: [],components: []})
                    }
                    if (i.user.id === oppoClass.userid && oppoClass.turn) {
                        msg = await oppoClass.end(playerClass,oppoturn)
                        await interaction.editReply({content: msg,embeds: [],components: []})
                   }
                }
                if (i.customId === 'attack') {
                    if (i.user.id === playerClass.userid && playerClass.turn) {
                        msg = await playerClass.attack(oppoClass)
                        await interaction.editReply({ embeds: [fightemd(status, msg, playerClass, oppoClass)] })
                        playerturn++
                        playerClass.turn = false
                        oppoClass.turn = true
                    }
                    if (i.user.id === oppoClass.userid && oppoClass.turn) {
                        msg = await oppoClass.attack(playerClass)
                        await interaction.editReply({ embeds: [fightemd(status, msg, playerClass, oppoClass)] })
                        oppoturn++
                        playerClass.turn = true
                        oppoClass.turn = false
                    }
                }

                if (i.customId === 'rest') {
                    if (i.user.id === playerClass.userid && playerClass.turn) {
                        msg = await playerClass.rest()
                        await interaction.editReply({ embeds: [fightemd(status, msg, playerClass, oppoClass)] })
                        playerturn++
                        playerClass.turn = false
                        oppoClass.turn = true
                    }
                    if (i.user.id === oppoClass.userid && oppoClass.turn) {
                        msg = await oppoClass.rest()
                        await interaction.editReply({ embeds: [fightemd(status, msg, playerClass, oppoClass)] })
                        oppoturn++
                        playerClass.turn = true
                        oppoClass.turn = false
                    }
                }

                if (i.customId === 'ability') {
                    if (i.user.id === playerClass.userid && playerClass.turn) {
                        if (playerClass.activeAbility[0] === undefined) {
                            msg = 'no abilities found!'
                            await interaction.editReply({ embeds: [fightemd(status, msg, playerClass, oppoClass)] })
                        }
                        else {
                            await interaction.editReply({ embeds: [abilityemd(playerClass.passiveAbility, playerClass.activeAbility)], components: [playerAbiBtns] })

                        }

                    }
                    if (i.user.id === oppoClass.userid && oppoClass.turn) {
                        if (playerClass.activeAbility[0] === undefined) {
                            msg = 'no abilities found!'
                            await interaction.editReply({ embeds: [fightemd(status, msg, oppoClass, playerClass)] })
                        }
                        else {
                            await interaction.editReply({ embeds: [abilityemd(oppoClass.passiveAbility, oppoClass.activeAbility)], components: [oppoAbiBtns] })

                        }
                    }
                }
                if (arrOfAbi.some((v) => v === i.customId)) {
                    if (i.user.id == oppoClass.userid && oppoClass.turn) {
                        msg = await oppoClass.ability(interaction, i.customId, turns, oppoturn, playerturn, playerClass, oppoClass)
                        await interaction.editReply({ embeds: [fightemd(status, msg, oppoClass, playerClass)],components: [fightBtns] })
                        playerClass.turn = true
                        oppoClass.turn = false
                    }
                    if (i.user.id == playerClass.userid && playerClass.turn) {
                        msg = await playerClass.ability(interaction, i.customId, turns, oppoturn, playerturn, oppoClass, playerClass)
                        await interaction.editReply({ embeds: [fightemd(status, msg, oppoClass, playerClass)],components:[fightBtns] })
                        playerClass.turn = false
                        oppoClass.turn = true
                    }
                }
                if (i.customId === 'back') {
                    if (i.user.id == oppoClass.userid && oppoClass.turn) {
                        status = 'none'
                        msg = `no actions!`
                        await interaction.editReply({ embeds: [fightemd(status, msg, oppoClass, playerClass)], components: [fightBtns] })
                    }
                    if (i.user.id == playerClass.userid && playerClass.turn) {
                        status = 'none'
                        msg = `no actions!`
                        await interaction.editReply({ embeds: [fightemd(status, msg, oppoClass, playerClass)], components: [fightBtns] })
                    }

                }
                turns++
                status = await playerClass.statusActivate(oppoClass)
                status = await oppoClass.statusActivate(playerClass)
                await mainmsgCollector.resetTimer()
            })




            
            mainmsgCollector.on('end', async (i) => {
                await interaction.editReply({ content: 'time out!',components: [],embeds: []})
            })
        }
        catch (err) {
            console.log(err)
        }
    }
}