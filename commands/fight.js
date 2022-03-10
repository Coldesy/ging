const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers, abilityCollection } = require('../main.js')
const Canvas = require('canvas')

var abilitymenusmaker = () => {
    return new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId(`${Math.random()}`)
                .setPlaceholder('Select your ability!')

        )
}

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
                        value: 'Ability',
                    },
                    {
                        label: 'Rest',
                        description: 'Rest to restore nen',
                        value: 'Rest',
                    },
                    {
                        label: 'End',
                        description: 'End the battle',
                        value: 'End',
                    }
                ])

        )
}


module.exports = {
    data: new SlashCommandBuilder()
        .setName('fight')
        .setDescription('Fight')
        .addUserOption(o => o.setName('opponent').setDescription('Your opponent').setRequired(true)),

    async execute(interaction) {
        try {
            const opponent = interaction.options.getUser('opponent')
            const player = interaction.user

            const playerBattleStatus = await playerStatus.find({ 'userid': player.id }, 'userid battleStatus cleared', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();
            const opponentBattleStatus = await playerStatus.find({ 'userid': opponent.id }, 'userid battleStatus cleared', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();
            const playerBattleStats = await Battlestats.find({ 'userid': player.id }, 'Health Attack Defense Nen Intelligence', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();
            const opponentBattleStats = await Battlestats.find({ 'userid': opponent.id }, 'Health Attack Defense Nen Intelligence', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();
            const abilitydocsOfopponent = await abilitiesOfUsers.find({ 'userid': opponent.id }, 'userid abilities', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();
            const abilitydocsOfplayer = await abilitiesOfUsers.find({ 'userid': player.id }, 'userid abilities', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();

            function statusChange(obj, status) {
                obj.battleStatus = status
                obj.save()
            }
            statusChange(playerBattleStatus[0], true)
            statusChange(opponentBattleStatus[0], true)


            const filter = i => {
                i.deferUpdate()
                return i.user.id === opponent.id || i.user.id === player.id
            }

            let playerHealth = playerBattleStats[0]['Health']
            let playerDefense = playerBattleStats[0]['Defense']
            let playerAttack = playerBattleStats[0]['Attack']
            let playerNen = playerBattleStats[0]['Nen']
            let playerNenIni = playerBattleStats[0]['Nen']
            let playerIntelligence = playerBattleStats[0]['Intelligence']

            let oppoHealth = opponentBattleStats[0]['Health']
            let oppoDefense = opponentBattleStats[0]['Defense']
            let oppoAttack = opponentBattleStats[0]['Attack']
            let oppoNen = opponentBattleStats[0]['Nen']
            let oppoNenIni = opponentBattleStats[0]['Nen']
            let oppoIntelligence = opponentBattleStats[0]['Intelligence']










            let img1 = 'https://media.discordapp.net/attachments/798940813228900423/939651527533031424/6C811BF9-C370-4928-A187-6E8A9D12332C.png?width=1440&height=613'
            const canvas = Canvas.createCanvas(700, 250)
            const ctx = canvas.getContext('2d')
            let img2 = await Canvas.loadImage(img1)
            ctx.drawImage(img2, 0, 0, canvas.width, canvas.height)
            ctx.fillRect(0, 0, 1 / 2 * canvas.width, 100)
            const test1 = new MessageAttachment(canvas.toBuffer(), 'bcgrd.png')
            let mainMsg = await interaction.reply({ content: `Duel to the death has begun!\n${player.username}'s turn`, components: [menusmaker()], files: [test1], fetchReply: true })





            let botData = 2
            const inBs = {
                oppo: false,
                player: true
            }
            function turnChanger(status, players) {
                inBs[players] = status

            }
            const collectorOfMainMsg = await mainMsg.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 600000 })
            let userability
            collectorOfMainMsg.on('collect', async (i) => {
                let critsArr = [1, 1, 1, 2, 1.2, 1.3, 1.2, 1.3, 0]
                let crits = critsArr[Math.floor(Math.random() * critsArr.length)]
              
                

                const abilitymenuOfP = abilitymenusmaker()
                const abilitymenuOfO = abilitymenusmaker()
                const oppoMenu = menusmaker()
                const playerMenu = menusmaker()

                if (abilitydocsOfplayer[0].abilities.first !== null) {
                    abilitymenuOfP.components[0].addOptions([{
                        label: abilitydocsOfplayer[0].abilities.first,
                        description: 'first ability',
                        value: abilitydocsOfplayer[0].abilities.first,
                    }])
                }
                if (abilitydocsOfplayer[0].abilities.second !== null) {
                    abilitymenuOfP.components[0].addOptions([{
                        label: abilitydocsOfplayer[0].abilities.second,
                        description: 'second ability',
                        value: abilitydocsOfplayer[0].abilities.second,
                    }])
                }
                if (abilitydocsOfplayer[0].abilities.third !== null) {
                    abilitymenuOfP.components[0].addOptions([{
                        label: abilitydocsOfplayer[0].abilities.third,
                        description: 'third ability',
                        value: abilitydocsOfplayer[0].abilities.third,
                    }])
                }

                if (abilitydocsOfopponent[0].abilities.first !== null) {
                    abilitymenuOfO.components[0].addOptions([{
                        label: abilitydocsOfopponent[0].abilities.first,
                        description: 'first ability',
                        value: abilitydocsOfopponent[0].abilities.first,
                    }])
                }
                if (abilitydocsOfopponent[0].abilities.second !== null) {
                    abilitymenuOfO.components[0].addOptions([{
                        label: abilitydocsOfopponent[0].abilities.second,
                        description: 'second ability',
                        value: abilitydocsOfopponent[0].abilities.second,
                    }])
                }
                if (abilitydocsOfopponent[0].abilities.third !== null) {
                    abilitymenuOfO.components[0].addOptions([{
                        label: abilitydocsOfopponent[0].abilities.third,
                        description: 'third ability',
                        value: abilitydocsOfopponent[0].abilities.third,
                    }])
                }



                // everything set

                playerNen += 2
                oppoNen += 2
                if (i.user.id === opponent.id && inBs.oppo === true) {
                    if (i.values.some(v => v === 'Attack')) {
                        playerBattleStats[0].Health -= crits * Math.floor(opponentBattleStats[0].Attack / playerBattleStats[0].Defense)
                        if (crits !== 2 && crits !== 0) { await interaction.editReply({ content: `${opponent.username} attacked!\n${opponent.username}'s health:${opponentBattleStats[0].Health}\n${player.username}'s health: ${playerBattleStats[0].Health}\n${player.username}'s Nen: ${playerNen}\n${opponent.username}'s Nen: ${oppoNen}`, components: [playerMenu] }) }
                        if (crits === 2) { await interaction.editReply({ content: `${opponent.username} attacked with a critical damage!\n${opponent.username}'s health:${opponentBattleStats[0].Health}\n${player.username}'s health: ${playerBattleStats[0].Health}\n${player.username}'s Nen: ${playerNen}\n${opponent.username}'s Nen: ${oppoNen}`, components: [playerMenu] }) }
                        if (crits === 0) { await interaction.editReply({ content: `${opponent.username} attacked but opponent dodged!\n${opponent.username}'s health:${opponentBattleStats[0].Health}\n${player.username}'s health: ${playerBattleStats[0].Health}\n${player.username}'s Nen: ${playerNen}\n${opponent.username}'s Nen: ${oppoNen}`, components: [playerMenu] }) }
                    }
                    if (i.values.some(v => v === 'Defense')) {
                        opponentBattleStats[0].Defense += 10
                        await interaction.editReply({ content: `${opponent.username} defended!\n${opponent.username}'s health:${opponentBattleStats[0].Health}\n${player.username}'s health: ${playerBattleStats[0].Health}\n${player.username}'s Nen: ${playerNen}\n${opponent.username}'s Nen: ${oppoNen}`, components: [playerMenu] })
                    }
                    if (i.values.some(v => v === 'Ability')) {

                        await interaction.editReply({ content: `${opponent.username} \nChoose your ability!`, components: [abilitymenuOfO] })
                    }
                    if (abilitydocsOfopponent[0].abilities.first === null) { await interaction.editReply({ content: 'You currently have no abilities', components: [playerMenu] }) }
                    if (i.values.some(v => v === abilitydocsOfopponent[0].abilities.first) || i.values.some(v => v === abilitydocsOfopponent[0].abilities.second) || i.values.some(v => v === abilitydocsOfopponent[0].abilities.third)) {
                        userability = abilityCollection.get(i.values[0])[i.values[0]]
                        if (userability.NenCost <= oppoNen) {
                            oppoNen -= userability.NenCost
                            userability.execute(interaction, botData, playerBattleStats[0], opponentBattleStats[0], playerMenu, oppoHealth, oppoAttack, oppoDefense, oppoNen, oppoIntelligence)
                            inBs.oppo = false
                            inBs.player = true

                        }
                        if (userability.NenCost > oppoNen) {
                            await interaction.editReply({ content: 'insufficient nen!', components: [playerMenu] })
                        }
                    }
                    if (i.values.some(v => v === 'Rest')) {
                        oppoNen += 10
                        await interaction.editReply({ content: `${opponent.username} Rested!\n${opponent.username}'s health:${opponentBattleStats[0].Health}\n${player.username}'s health: ${playerBattleStats[0].Health}`, components: [playerMenu] })
                    }
                    if (i.values.some(v => v === 'End')) {

                        await interaction.editReply({ content: `You ran away...\ncoward ass nigga` })
                        statusChange(playerBattleStatus[0], false)
                        statusChange(opponentBattleStatus[0], false)
                        return false
                    }

                    if (i.values.some(v => v !== 'Ability')) {
                        inBs.oppo = false
                        inBs.player = true
                    }
                    collectorOfMainMsg

                }
                if (playerBattleStats[0].Health <= 0 || opponentBattleStats[0].Health <= 0) {





                    
                    if (playerBattleStats[0].Health <= 0 && opponentBattleStats[0].Health <= 0 && userability.afterDeath === true) {
                        await interaction.editReply(`You both died lmao`)

                    }
                    if (opponentBattleStats[0].Health <= 0 && playerBattleStats[0].Health > 0) {
                      
                        await interaction.editReply(`${player.username} won!!`)
                        playerBattleStats[0]['Health'] = 1 + playerHealth
                        playerBattleStats[0]['Attack'] = 1 + playerAttack
                        playerBattleStats[0]['Defense'] = 1 + playerDefense
                        playerBattleStats[0]['Nen'] = 1 + playerNenIni
                        playerBattleStats[0]['Intelligence'] = 1 + playerIntelligence
                        await playerBattleStats[0].save()
                    }
                    if (playerBattleStats[0].Health <= 0 && opponentBattleStats[0].Health > 0) {
                        await interaction.editReply(`${opponent.username} won!!`)
                        opponentBattleStats[0]['Health'] = 1 + oppoHealth
                        opponentBattleStats[0]['Attack'] = 1 + oppoAttack
                        opponentBattleStats[0]['Defense'] = 1 + oppoDefense
                        opponentBattleStats[0]['Nen'] = 1 + oppoNenIni
                        opponentBattleStats[0]['Intelligence'] = 1 + oppoIntelligence
                        await opponentBattleStats[0].save()
                    }
                    playerBattleStatus[0].battleStatus = false
                    opponentBattleStatus[0].battleStatus = false
                    await playerBattleStatus[0].save()
                    await opponentBattleStatus[0].save()
                    collectorOfMainMsg.stop()
                    return false

                }
                if (i.user.id === player.id && inBs.player === true) {
                    if (i.values.some(v => v === 'Attack')) {
                        opponentBattleStats[0].Health -= crits * Math.floor(playerBattleStats[0].Attack / opponentBattleStats[0].Defense)
                        if (crits !== 2 && crits !== 0) { await interaction.editReply({ content: `${player.username} attacked!\n${player.username}'s health:${playerBattleStats[0].Health}\n${opponent.username}'s health: ${opponentBattleStats[0].Health}\n${player.username}'s Nen: ${playerNen}\n${opponent.username}'s Nen: ${oppoNen}`, components: [oppoMenu] }) }
                        if (crits === 2) { await interaction.editReply({ content: `${player.username} attacked with a critical damage!\n${player.username}'s health:${playerBattleStats[0].Health}\n${opponent.username}'s health: ${opponentBattleStats[0].Health}\n${player.username}'s Nen: ${playerNen}\n${opponent.username}'s Nen: ${oppoNen}`, components: [oppoMenu] }) }
                        if (crits === 0) { await interaction.editReply({ content: `${player.username} attacked but opponent dodged!\n${player.username}'s health:${playerBattleStats[0].Health}\n${opponent.username}'s health: ${opponentBattleStats[0].Health}\n${player.username}'s Nen: ${playerNen}\n${opponent.username}'s Nen: ${oppoNen}`, components: [oppoMenu] }) }
                    }
                    if (i.values.some(v => v === 'Defense')) {
                        opponentBattleStats[0].Defense += 10
                        await interaction.editReply({ content: `${player.username} defended!\n${player.username}'s health:${playerBattleStats[0].Health}\n${opponent.username}'s health: ${opponentBattleStats[0].Health}\n${player.username}'s Nen: ${playerNen}\n${opponent.username}'s Nen: ${opponentNen}`, components: [oppoMenu] })
                    }
                    if (i.values.some(v => v === 'Ability')) {

                        await interaction.editReply({ content: `${player.username} \nChoose your ability!`, components: [abilitymenuOfP] })
                    }
                    if (abilitydocsOfplayer[0].abilities.first === null) { await interaction.editReply({ content: 'You currently have no abilities', components: [playerMenu] }) }
                    if (i.values.some(v => v === abilitydocsOfplayer[0].abilities.first) || i.values.some(v => v === abilitydocsOfplayer[0].abilities.second) || i.values.some(v => v === abilitydocsOfplayer[0].abilities.third)) {

                        userability = abilityCollection.get(i.values[0])[i.values[0]]
                        if (userability.NenCost <= playerNen) {
                            playerNen -= userability.NenCost
                            userability.execute(interaction, botData, playerBattleStats[0], opponentBattleStats[0], oppoMenu, opponent.id, playerHealth, playerAttack, playerDefense, playerNen, playerIntelligence)
                            inBs.oppo = true
                            inBs.player = false

                        }
                        else if (userability.NenCost > playerNen) {
                            await interaction.editReply({ content: 'insufficient nen!', components: [oppoMenu] })
                        }
                    }
                    if (i.values.some(v => v === 'Rest')) {
                        oppoNen += 10
                        await interaction.editReply({ content: `${player.username} Rested!\n${player.username}'s health:${opponentBattleStats[0].Health}\n${player.username}'s health: ${opponentBattleStats[0].Health}`, components: [oppoMenu] })
                    }
                    if (i.values.some(v => v === 'End')) {

                        await interaction.editReply({ content: `You ran away...\ncoward ass nigga` })
                        statusChange(playerBattleStatus[0], false)
                        statusChange(opponentBattleStatus[0], false)
                        return false
                    }

                    if (i.values.some(v => v !== 'Ability')) {
                        inBs.oppo = true
                        inBs.player = false
                    }
                    collectorOfMainMsg

                }


            })
        } catch (err) {
            interaction.reply('There was an error while loading your file!')
            console.log(err)
        }
    }
} 