const fs = require('fs');
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { builtinModules } = require('module');
const { hyperlink } = require('@discordjs/builders');
require('dotenv').config()

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, autoIndex: true });
}














const BattleStatsSchema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true,
    },
    tier: {
        min: 1,
        type: Number
    },
    Exp: Number,
    Nenaffinity: String,
    Health: Number,
    Attack: Number,
    Defense: Number,
    Nen: Number,
    Intelligence: Number

}
)
const Battlestats = mongoose.model('playerbattledata', BattleStatsSchema)
module.exports.Battlestats = Battlestats




const playerStatusSchema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true,
    },
    battleStatus: Boolean,
    Wins: Number,
    Loses: Number

})
const playerStatus = mongoose.model('playerStatus', playerStatusSchema)
module.exports.playerStatus = playerStatus







const abilityhandlerschema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true,
    },

    abilities: {
        first: {
            type: String,

        },
        second: {
            type: String,

        },
        third: {
            type: String,

        },
    }



}
)
const abilitiesOfUsers = mongoose.model('abilityhandler', abilityhandlerschema)
module.exports.abilitiesOfUsers = abilitiesOfUsers


const marketSchema = new mongoose.Schema({
    Name: {
        type: String,
        unique: true
    },
    Cost: Number,
    Type: String,
    subType: String,
    Description: String,
    ID: Number,
})
const inventorySchema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    items: [
        {
            Name: String,
            Quantity: Number,
            Type: String,
            ItemID: Number,
        }
    ],
})
const itemsModel = mongoose.model('marketItem', marketSchema)
const InvModel = mongoose.model('Inventories', inventorySchema)



const questSchema = new mongoose.Schema({
    userid: {
        type: String,
        unique: true,
    },
    currentQuest: {
        default: null,
        type: Object,
    },
    InQuest: Boolean,
})
const battleInventorySchema = mongoose.Schema({
    userid: {
        type: String,
        unique: true
    },
    items: [
        { first: {
            type: String,
            default: null
        } },
        { second: {
            type: String,
            default: null
        } },
        { third: {
            type: String,
            default: null
        } }

    ]
})
const battleItems = mongoose.model('BattleItems',battleInventorySchema)
const questModel = mongoose.model('PlayerQuests', questSchema)
module.exports.battleItems = battleItems
module.exports.questModel = questModel
module.exports.itemsModel = itemsModel
module.exports.InvModel = InvModel