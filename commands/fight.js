const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus } = require('../main.js')
const Canvas = require('canvas')


const row1 = new MessageActionRow()
    .addComponents(
        new MessageSelectMenu()
            .setCustomId('select')
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
                    label: 'End',
                    description: 'End the battle',
                    value: 'End',
                }
            ])

    )

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
            const player2 = interaction.options.getUser('opponent')
            const oppobstatus = await playerStatus.find({ 'userid': player2.id }, 'userid battleStatus', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }
                if (true) { return docs }

            }).clone();
            const userbstatus = await playerStatus.find({ 'userid': interaction.user.id }, 'userid battleStatus', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }

                if (true) { return docs }
            }).clone();
            const usobj = userbstatus[0]
            const osobj = oppobstatus[0]
            const bcheckU = usobj.battleStatus
            const ocheckU = osobj.battleStatus
            if (bcheckU === true || ocheckU === true) {

                interaction.reply('you or opponent is already in a battle')
                return false
            }
            usobj.battleStatus = true
            osobj.battleStatus = true
            await userbstatus[0].save()
            await oppobstatus[0].save()
            const opponentDocs = await Battlestats.find({ 'userid': player2.id }, 'Health Defense Attack Nen Intelligence', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }
                if (true) { return docs }

            }).clone();
            const playerDocs = await Battlestats.find({ 'userid': interaction.user.id }, 'Health Defense Attack Nen Intelligence', function (err, docs) {


                if (docs[0] === undefined) {
                    return

                }
                if (true) { return docs }

            }).clone();
            const playerObj = opponentDocs[0];
            const opponentObj = playerDocs[0];
            const fightObj = new Collection()
            nameArr = ['player', 'opponent']
            fightObj.set(nameArr[0], playerObj)
            fightObj.set(nameArr[1], opponentObj)
            const opponentInfo = fightObj.get('player') // This is some serious shit 
            const playerInfo = fightObj.get('opponent')
            var oppoHealth = opponentInfo.Health
            var oppoHealthS = opponentInfo.Health
            var oppoAtk = opponentInfo.Attack
            var oppoDef = opponentInfo.Defense
            var oppoDefS = opponentInfo.Defense
            var oppoNen = opponentInfo.Nen
            var oppoIntell = opponentInfo.Intelligence
            var userHealth = playerInfo.Health
            var userHealthS = playerInfo.Health
            var userAtk = playerInfo.Attack
            var userDef = playerInfo.Defense
            var userDefS = playerInfo.Defense
            var userNen = playerInfo.Nen
            var userIntell = playerInfo.Intelligence





            const filter = i => {
                i.deferUpdate()
                return i.user.id === player2.id || i.user.id === interaction.user.id
            }


















            let img1 = 'https://media.discordapp.net/attachments/798940813228900423/939651527533031424/6C811BF9-C370-4928-A187-6E8A9D12332C.png?width=1440&height=613'
            const canvas = Canvas.createCanvas(700, 250)
            const ctx = canvas.getContext('2d')
            let img2 = await Canvas.loadImage(img1)
            ctx.drawImage(img2, 0, 0, canvas.width, canvas.height)
            ctx.fillRect(0, 0, 1 / 2 * canvas.width, 100)
            const test1 = new MessageAttachment(canvas.toBuffer(), 'bcgrd.png')
            let int = await interaction.reply({ content: 'FIGHT!', components: [row1], files: [test1], fetchReply: true })







            const collector1 = await int.createMessageComponentCollector({ filter, componentType: 'SELECT_MENU', time: 600000 })
            const identt = new Map()
            identt.set('n', 'no')
            collector1.on('collect', async i => {
        

                critsArr = [0.8, 0.9, 1.0, 1.2, 1.5, 0, 2]
                crits = critsArr[Math.floor(Math.random() * critsArr.length)]


                if (i.values.some(val => val === 'End')){
                    await interaction.editReply('Battle ended')
                     usobj.battleStatus = false
                    osobj.battleStatus = false
                    await userbstatus[0].save()
                    await oppobstatus[0].save()
                    collector1.stop()
                    return false
                    
                }
                if (userHealth <= 0 || oppoHealth <= 0) {
                    if (userHealth <= 0) {
                        oppoDefS += 1
                        oppoAtk += 1
                        oppoNen += 1 
                        oppoIntell += 1
                        oppoHealthS += 10
                        opponentDocs[0].Attack = oppoAtk
                        opponentDocs[0].Defense = oppoDefS
                        opponentDocs[0].Nen = oppoNen
                        opponentDocs[0].Health = oppoHealthS
                        opponentDocs[0].Intelligence = oppoIntell
                        await opponentDocs[0].save()
                        await interaction.followUp(`<@${player2.id}> won`)




                    }
                    else if (oppoHealth <= 0) {
                        userDefS += 1
                        userAtk += 1
                        userNen += 1 
                        userIntell += 1
                        userHealthS += 10
                        playerDocs[0].Attack = userAtk
                        playerDocs[0].Defense = userDefS
                        playerDocs[0].Nen = userNen
                        playerDocs[0].Health = userHealthS
                        playerDocs[0].Intelligence = userIntell
                        await playerDocs[0].save()
                        await interaction.followUp(`<@${interaction.user.id}> won`)
                    }
                    usobj.battleStatus = false
                    osobj.battleStatus = false
                    await userbstatus[0].save()
                    await oppobstatus[0].save()
                    collector1.stop()
                    return false

                }
                if (i.user.id === interaction.user.id && identt.has('n')) {

                    let one = menusmaker()
                    let one1 = menusmaker()
                    let one2 = menusmaker()
                    if (i.values.some(val => val === 'Attack')) {
                        oppoHealth -= Math.floor(crits * userAtk + 10 / oppoDef)
                        if (crits !== 2 && crits !== 0) { await interaction.editReply({ content: `${interaction.user.username} attacked and his health is ${userHealth}\n<@${player2.id}>'s turn`, components: [one] }) }
                        if (crits === 2) { await interaction.editReply({ content: `${interaction.user.username} attacked..CRITICAL HIT.. and his health is ${userHealth}\n<@${player2.id}>'s turn`, components: [one1] }) }
                        if (crits === 0) { await interaction.editReply({ content: `${interaction.user.username} attacked but opponent dodged and his health is ${userHealth}\n<@${player2.id}>'s turn`, components: [one2] }) }


                        identt.delete('n')
                        collector1


                    }
                    else if (i.values.some(val => val === 'Defense')) {
                        userDef += 10
                        let two = menusmaker()
                        await interaction.editReply({ content: `${interaction.user.username} defended and his health is ${userHealth}\n<@${player2.id}>'s turn `, components: [two] })

                        identt.delete('n')
                        collector1

                    }
                }


                else if (i.user.id === player2.id && identt.has('n') === false) {
                    if (i.values.some(val => val === 'Attack')) {
                        let three = menusmaker()
                        let three3 = menusmaker()
                        let three6 = menusmaker()
                        userHealth -= Math.floor(crits * oppoAtk + 10 / userDef)
                        if (crits !== 2 && crits !== 0) { await interaction.editReply({ content: `${player2.username} attacked and his health is ${oppoHealth}\n<@${interaction.user.id}>'s turn`, components: [three] }) }
                        if (crits === 2) { await interaction.editReply({ content: `${player2.username} attacked..CRITICAL HIT.. and his health is ${oppoHealth}\n<@${interaction.user.id}>'s turn`, components: [three6] }) }
                        if (crits === 0) { await interaction.editReply({ content: `${player2.username} attacked but opponent dodged and his health is ${oppoHealth}\n<@${interaction.user.id}>'s turn`, components: [three3] }) }




                        identt.set('n', 'oi')
                        collector1

                    }
                    else if (i.values.some(val => val === 'Defense')) {
                        oppoDef += 10
                        let mFour = menusmaker()
                        await interaction.editReply({ content: `${player2.username} defended and his health is ${oppoHealth}\n<@${interaction.user.id}>'s turn`, components: [mFour] })

                        identt.set('n', 'bruh')
                        collector1

                    }
                }
            })




        } catch (err) {
            interaction.reply('You are probably not registered')
            console.log(err)

        }
    }
}