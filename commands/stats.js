const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { registerData } = require('../main.js')





module.exports = {
    data:
        new SlashCommandBuilder().setName('stats').setDescription('Shows your current stats!'),





    async execute(interaction) {
        try {
            let neuron = await registerData.find({ 'userid': interaction.user.id }, '-_id nik health attack defense nen intelligence', function (err, docs) {
                if (docs[0] !== undefined) {
                    let doc = docs[0].toObject()

                    let a = doc.nik
                    let b = doc.health
                    let c = doc.attack
                    let d = doc.defense
                    let e = doc.nen
                    let f = doc.intelligence


                    return [a, b, c, d, e, f]
                }








            }).clone().exec().catch((err) => {
                console.log(err)
            })







            let a = neuron[0]

            if (a !== undefined) {
                let c = a['health']
                let d = a['attack']
                let e = a['defense']
                let f = a['nen']
                let g = a['intelligence']
            } else if (a === undefined){
                throw new Error('err')
            }






            const embed2 = new MessageEmbed()
                .setColor('#b3c29f')
                .setTitle(`Heya Player,Here your battle stats!`)
                .addFields(
                    { name: '\u200B', value: '\u200B' },
                    { name: `Health: ${c}`, value: '\u200B' },
                    { name: `Attack: ${d}`, value: '\u200B' },
                    { name: `Defense: ${e}`, value: '\u200B' },
                    { name: `Nen Aura: ${f}`, value: '\u200B' },
                    { name: `Intelligence: ${g}`, value: '\u200B' },
                    { name: `Total stats: ${c + d + e + f + g}`, value: '\u200B' }

                )
            if (a !== undefined) { await interaction.reply({ embeds: [embed2] }) }
        }
        catch (err) {
            console.log(err)
            await interaction.reply('Please register first!')
        }

    }
}