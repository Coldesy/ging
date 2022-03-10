const {monstersModel} = require('./main.js')
const fs = require('fs');
const { Client, Collection, Intents,MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { builtinModules } = require('module');
const { hyperlink } = require('@discordjs/builders');
const MonstersObjs = require('./monsters.js')

const Monsters = new monstersModel({monstersArr:MonstersObjs})
Monsters.save()