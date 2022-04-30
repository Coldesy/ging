const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection, MessageButton } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers, InvModel, itemsModel } = require('../schema.js')
const Canvas = require('canvas')
const { statusCollection } = require('../schema.js')
const playerDatas = require('../utility/database/marketBuyClass.js');
const { title } = require('process');

let itembuyemd = {
    color: '#96ff96',
    title: `Sir,It looks like you want this one!ㅤ`,
    fields: []
}
let SucessEmbed = {
    color: '#14c455',
    title: `You have successfully bought the product! :white_check_mark:`
}
let FailureEmbed = {
    color: '#e72828',
    title: `You do not have sufficient amount! :x:`
}
let yesorexitbuttons = () => {
    return new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('No')
                .setLabel('Exit')
                .setStyle('DANGER')

        )
        .addComponents(
            new MessageButton()
                .setCustomId('Yes')
                .setLabel('Buy')
                .setStyle('SUCCESS')

        )
}
let yesorno = yesorexitbuttons()
module.exports = {
    data: new SlashCommandBuilder()
        .setName('shop')
        .setDescription('shop for stuff in market')
        .addNumberOption(o => o.setName('itemid').setDescription('item you want to buy').setRequired(true)),


    async execute(interaction) {
        try {
            const itemId = interaction.options.getNumber('itemid')


            const playerInvInfos = new playerDatas(interaction.user.id)
            const InvData = await playerInvInfos.findInvData()
           


            const itemAggre = await itemsModel.aggregate(
                [
                    { $match: { ID: itemId } }
                ]
            )
            if (itemAggre[0] === undefined) {
                interaction.reply('Sadly that item does not exist!')
            }

            itembuyemd.fields.unshift(
                {
                    name: itemAggre[0].Name,
                    value: `Cost: ${itemAggre[0].Cost}\nType: ${itemAggre[0].Type}\nDescription: ${itemAggre[0].Description}`
                }
            )
            const mainRply = await interaction.reply({ embeds: [itembuyemd], components: [yesorno], fetchReply: true })
            itembuyemd.fields.shift()
            const filter = i => {
                i.deferUpdate()
                return i.user.id === interaction.user.id
            }
            const collectorOfmsg = mainRply.createMessageComponentCollector({ filter, time: 60000 })
            collectorOfmsg.on('collect', async (i) => {
                if (i.customId === 'No') {
                    await mainRply.delete()
                }
                if (i.customId === 'Yes') {
                    
                    if (InvData.balance >= itemAggre[0].Cost) {
                        playerInvInfos.findItem(itemAggre[0])
                        await interaction.followUp({ embeds: [SucessEmbed], fetchReply: true })

                    }
                    if (InvData.balance < itemAggre[0].Cost) {
                        await interaction.followUp({ embeds: [FailureEmbed], fetchReply: true })

                    }
                }
                await mainRply.delete()


            })



        }
        catch (err) {
            console.log(err)
        }
    }
}
