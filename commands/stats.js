const { SlashCommandBuilder } = require('@discordjs/builders');
const { channel } = require('diagnostics_channel');
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { registerData,Battlestats } = require('../schema.js')





module.exports = {
    data:
        new SlashCommandBuilder().setName('stats').setDescription('Shows your current stats!'),





    async execute(interaction) {
        try {
            let neuron = await Battlestats.find({ 'userid': interaction.user.id },'Nenaffinity Health Attack Defense Nen Intelligence', function (err, docs) {
                if (docs[0] === undefined) {
                    return
                }

                if (true) { return docs }
            }).clone();






            let a = neuron[0]


            let c = a['Health']
            let d = a['Attack']
            let e = a['Defense']
            let f = a['Nen']
            let g = a['Intelligence']
            let h = a['Nenaffinity']







            const embed2 = new MessageEmbed()
                .setColor('#b3c29f')
                .setTitle(`Heya ${interaction.user.username},Here your battle stats!`)
                .addFields(
                    { name: '\u200B', value: '<:vegetaleb:934061270645231647>' },
                    { name: `Nen Aura Type: ${h}`, value: '\u200B' },
                    { name: `Health: ${c}`, value: '\u200B' },
                    { name: `Attack: ${d}`, value: '\u200B' },
                    { name: `Defense: ${e}`, value: '\u200B' },
                    { name: `Nen Aura: ${f}`, value: '\u200B' },
                    { name: `Intelligence: ${g}`, value: '\u200B' },
                    { name: `Total stats: ${c + d + e + f + g}`, value: '\u200B' }

                )
            await interaction.reply({ embeds: [embed2] })
        }
        catch (err) {
            if (err) {
                interaction.reply('register first')
                console.log(err)
            }

        }

    }
}