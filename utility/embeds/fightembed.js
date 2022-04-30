const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers, abilityCollection } = require('../../schema.js')
const Canvas = require('canvas')


module.exports = (status,action,playerClass, oppoClass) => {
    return {
        color: '#2196F3',
        title:`**The duel has begun!**`,
        description: `**${playerClass.name}** vs **${oppoClass.name}**`,
        fields: [{
            name: `__***Status_Effect***__`,
            value: `${status}\nㅤ`
        },{
            name: `__***Actions***__`,
            value: `${action}\nㅤ`
        }
        , {
            name: `___**${playerClass.name}'s Stats**___\nㅤ`,
            value: `
            **Health:** ${playerClass.Health}
**Attack:** ${playerClass.Attack}
**Defense:** ${playerClass.Defense}
**Nen Aura:** ${playerClass.Nen}\nㅤ`
        },
        {
            name: `___**${oppoClass.name}'s Stats**___`,
            value: `
            **Health:** ${oppoClass.Health}
**Attack:** ${oppoClass.Attack}
**Defense:** ${oppoClass.Defense}
**Nen Aura:** ${oppoClass.Nen}\nㅤ`
        }],
        thumbnail: {
            url: `https://cdn.discordapp.com/attachments/757198474457382942/954242015745409064/hxhlogo.png`
        }


    }
}





