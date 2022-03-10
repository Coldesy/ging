const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection, Collector } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers } = require('../main.js')
const fs = require('fs')
const Canvas = require('canvas')
const monsterObjArr = require('../monsters.js')
const { abilityCollection, monstersModel } = require('../main.js')
const Abilityadder = require('../Abilityadder.js')











var menusmaker = () => {
    return new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId(`${Math.random()}`)
                .setPlaceholder('Select your action')
                .addOptions([
                    {
                        label: 'Attack',
                        description: 'Attack with punch or kick!',
                        value: 'Attack',
                    },
                    {
                        label: 'Defense',
                        description: 'Defend yourself!',
                        value: 'Defense',
                    },
                    {
                        label: 'Ability',
                        description: 'Choose an ability of yours!',
                        value: 'UserAbility',
                    },
                    {
                        label: 'End',
                        description: 'End the battle',
                        value: 'End',
                    }
                ])

        )
}
var abilitymenusmaker = () => {
    return new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId(`${Math.random()}`)
                .setPlaceholder('Select your ability!')

        )
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('train')
        .setDescription('Train with a creature'),

    async execute(interaction) {
        try {
            
            const userbstatus = await playerStatus.find({ 'userid': interaction.user.id }, 'userid battleStatus cleared', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();

            const usobj = userbstatus[0]


            const bcheckU = usobj.battleStatus

            if (bcheckU === true) {

                interaction.reply('you are already in a battle')
                return false
            }
            var cleared = usobj.cleared
            function statusChange(status) {
                usobj.battleStatus = status
                userbstatus[0].save()
            }
            statusChange(true)

            // Battle check



            const playerDocs = await Battlestats.find({ 'userid': interaction.user.id }, 'Health Defense Attack Nen Intelligence', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }
                if (true) { return docs }

            }).clone();

            // data fetch
            const abilitydocs = await abilitiesOfUsers.find({ 'userid': interaction.user.id }, 'userid abilities', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();
            const monsterdocs = await monstersModel.find({ _id: '6220a79182153702cab88d8b' }, 'monstersArr', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();

            const abilitiesOfUser = abilitydocs[0].abilities
            let botData = monsterdocs[0]['monstersArr'][cleared]
            


            // data fetch

            var userHealth = playerDocs[0]['Health']
            let userDefense = playerDocs[0]['Defense']
            let userAttack = playerDocs[0]['Attack']
            let userNen = playerDocs[0]['Nen']
            let userIntelligence = playerDocs[0]['Intelligence'] // declared vars




            const botName = botData.Name
            let botHealth = botData.Health
            const abilityMonster = botData.Ability
            const expGain = botData.ExpMultiplier
            let botNen = botData.Nen
            let botAtk = botData.Attack
            let botDef = botData.Defense
            let botIntell = botData.Intelligence



            const filter = i => {
                i.deferUpdate()
                return i.user.id === interaction.user.id
            }
            const mainMenu = menusmaker()
            const mainMsg = await interaction.reply({ content: `You are currently fighting ...\n**${botName}!**`, components: [mainMenu], fetchReply: true })
            
            const componentMenuCollector = await mainMsg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 600000 })

            componentMenuCollector.on('collect', async (i) => {

                const abilitymenu = abilitymenusmaker()

                if (abilitiesOfUser.first !== null) {
                    abilitymenu.components[0].addOptions([{
                        label: abilitiesOfUser.first,
                        description: 'First ability',
                        value: abilitiesOfUser.first,
                    }])
                }
                if (abilitiesOfUser.second !== null) {
                    abilitymenu.components[0].addOptions([{
                        label: abilitiesOfUser.second,
                        description: 'second ability',
                        value: abilitiesOfUser.second,
                    }])
                }
                if (abilitiesOfUser.third !== null) {
                    abilitymenu.components[0].addOptions([{
                        label: abilitiesOfUser.third,
                        description: 'third ability',
                        value: abilitiesOfUser.third,
                    }])
                }
                const ability = abilityCollection.get(abilityMonster)[abilityMonster]
                critsArr = [1, 1, 1, 2, 1.2, 1.3, 1.2, 1.3, 0]
                botSelectArr = ['attack', 'defense']
                botSelect = botSelectArr[Math.floor(Math.random() * botSelectArr.length)]
                crits = critsArr[Math.floor(Math.random() * critsArr.length)]
                const infinitemenus = menusmaker()

                if (i.user.id === interaction.user.id) {
                    if (i.values.some(v => v === 'End')) {
                        await interaction.editReply('You ran away...')

                        statusChange(false)
                        componentMenuCollector.stop()
                        return false

                    }
                    if (botData.Health <= 0) {


                        if (expGain === 0) { await interaction.editReply('You won but..\nNo exp was gained because divine bear was not meant for training') }
                        else if (expGain !== 0) {
                            await interaction.editReply('You won!')
                        }


                        Abilityadder.Abilityadder.execute(interaction, botData.AbilityDrops)
                        playerDocs[0]['Health'] = expGain + userHealth
                        playerDocs[0]['Attack'] = expGain + userAttack
                        playerDocs[0]['Defense'] = expGain + userDefense
                        playerDocs[0]['Nen'] = expGain + userNen
                        playerDocs[0]['Intelligence'] = expGain + userIntelligence
                        await playerDocs[0].save()

                        userbstatus[0].cleared += 1
                        userbstatus[0].battleStatus = false
                        await userbstatus[0].save()
                        componentMenuCollector.stop()
                        return false

                    }
                    else if (playerDocs[0]['Health'] <= 0) {
                        await interaction.editReply('You lost..')

                        userbstatus[0].battleStatus = false
                        await userbstatus[0].save()
                        componentMenuCollector.stop()
                        return false
                    }
                    if (i.values.some(v => v === 'UserAbility')) {
                        if (abilitiesOfUser.first !== null) {
                            await interaction.editReply({ content: 'Choose your ability', components: [abilitymenu] })


                        }
                        if (abilitiesOfUser.first === null) { await interaction.editReply({ content: 'You currently have no abilities', components: [infinitemenus] }) }
                    }
                    if (i.values.some(v => v === abilitiesOfUser.first) || i.values.some(v => v === abilitiesOfUser.second) || i.values.some(v => v === abilitiesOfUser.second)) {
                        const userability = abilityCollection.get(i.values[0])[i.values[0]]
                        userability.execute(interaction, botData,1, playerDocs[0], infinitemenus, userHealth, userAttack, userDefense, userNen, userIntelligence)

                    }

                    if (i.values.some(val => val === 'Attack')) {
                        const infinitemenus = menusmaker()
                        botData.Health -= Math.floor(crits * playerDocs[0]['Attack'] + 20 / botData.Defense)
                        if (crits !== 2 && crits !== 0) { await interaction.editReply({ content: `${interaction.user.username} attacked and his health is ${playerDocs[0]['Health']}\n${botName}'s turn...` }) }
                        if (crits === 2) { await interaction.editReply({ content: `${interaction.user.username} attacked..CRITICAL HIT.. and his health is ${playerDocs[0]['Health']}\n${botName}'s turn...` }) }
                        if (crits === 0) { await interaction.editReply({ content: `${interaction.user.username} attacked but opponent dodged and his health is ${playerDocs[0]['Health']}\n${botName}'s turn...` }) }
                        await wait(1000)
                        if (botSelect === 'defense') {
                            botDef += 10
                            await interaction.editReply({ content: `${botName} chose to ${botSelect} and ${botName}'s current health is ${botData.Health} `, components: [infinitemenus] })
                        }
                        if (botSelect === 'attack') {
                            ability.execute(interaction, botData, playerDocs[0])
                            playerDocs[0]['Health'] -= Math.floor(1 * botData.Attack/ playerDocs[0]['Defense'])

                            await interaction.editReply({ content: `${botName} chose to ${botSelect}\n **${abilityMonster}**\n${botName}'s current health is ${botData.Health} `, components: [infinitemenus] })
                        }

                        if (botData.Health <= 0) {


                            if (expGain === 0) { await interaction.editReply('You won but..\nNo exp was gained because divine bear was not meant for training') }
                            else if (expGain !== 0) {
                                await interaction.editReply('You won!')
                            }


                            Abilityadder.Abilityadder.execute(interaction, botData.AbilityDrops)
                            playerDocs[0]['Health'] = expGain + userHealth
                            playerDocs[0]['Attack'] = expGain + userAttack
                            playerDocs[0]['Defense'] = expGain + userDefense
                            playerDocs[0]['Nen'] = expGain + userNen
                            playerDocs[0]['Intelligence'] = expGain + userIntelligence
                            await playerDocs[0].save()

                            userbstatus[0].cleared += 1
                            userbstatus[0].battleStatus = false
                            await userbstatus[0].save()
                            componentMenuCollector.stop()
                            return false

                        }
                        else if (playerDocs[0]['Health'] <= 0) {
                            await interaction.editReply('You lost..')

                            userbstatus[0].battleStatus = false
                            await userbstatus[0].save()
                            componentMenuCollector.stop()
                            return false
                        }

                    }
                    if (i.values.some(val => val === 'Defense')) {

                        playerDocs[0]['Defense'] += 10
                        await interaction.editReply({ content: `${interaction.user.username} defended and his health is ${playerDocs[0]['Health']}\n${botName}'s turn...` })

                        await wait(1000)
                        if (botSelect === 'defense') {
                            botData.Defense += 10
                            await interaction.editReply({ content: `${botName} chose to ${botSelect} and ${botName}'s current health is ${botData.Health} `, components: [infinitemenus] })
                        }
                        if (botSelect === 'attack') {

                            ability.execute(interaction, botData, playerDocs[0])
                            playerDocs[0].Health -= Math.floor(1 * botData.Attack / playerDocs[0]['Defense'])
                            //player

                            await interaction.editReply({ content: `${botName} chose to ${botSelect}\n **${abilityMonster}!**\n${botName}'s current health is ${botData.Health} `, components: [infinitemenus] })
                        }

                        if (botData.Health <= 0) {


                            if (expGain === 0) { await interaction.editReply('You won but..\nNo exp was gained because divine bear was not meant for training') }
                            else if (expGain !== 0) {
                                await interaction.editReply('You won!')
                            }


                            Abilityadder.Abilityadder.execute(interaction, botData.AbilityDrops)
                            playerDocs[0]['Health'] = expGain + userHealth
                            playerDocs[0]['Attack'] = expGain + userAttack
                            playerDocs[0]['Defense'] = expGain + userDefense
                            playerDocs[0]['Nen'] = expGain + userNen
                            playerDocs[0]['Intelligence'] = expGain + userIntelligence
                            await playerDocs[0].save()

                            userbstatus[0].cleared += 1
                            userbstatus[0].battleStatus = false
                            await userbstatus[0].save()
                            componentMenuCollector.stop()
                            return false

                        }
                        else if (playerDocs[0]['Health'] <= 0) {
                            await interaction.editReply('You lost..')

                            userbstatus[0].battleStatus = false
                            await userbstatus[0].save()
                            componentMenuCollector.stop()
                            return false
                        }

                    }

                    componentMenuCollector
                }
            })
        } catch (err) {
            

           

            interaction.reply('You are probably not registered')

            console.log(err)
        }




    }

}