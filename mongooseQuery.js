const {monstersModel,itemsModel,InvModel} = require('./schema.js')
const fs = require('fs');
const { Client, Collection, Intents,MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { builtinModules } = require('module');
const { hyperlink } = require('@discordjs/builders');
const MonstersObjs = require('./monsters.js')


const wtf = new InvModel({
    userid: `737628341728968775`,
    Cost: 100000,
    balance: 0,
    items:[],
    
    

})




wtf.save()