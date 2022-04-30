const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers, InvModel } = require('../../schema.js')
const Canvas = require('canvas')
const { statusCollection } = require('../../schema.js')


class playerDatas {
    'use strict'
    constructor(id) {
        this.id = id
    }

    async findBattleData() {
        let BattlestatsArr = await Battlestats.find({ 'userid': this.id })
        this.playerData = BattlestatsArr[0]
        return BattlestatsArr[0]
    }
    async saveBattleData() {
        this.playerData.save()
    }
    async deleteBattleData() {
        this.playerData.delete()
    }
    async findInvData() {
        let InvDataArr = await InvModel.find({ 'userid': this.id })
        this.playerInvData = InvDataArr[0]
        return InvDataArr[0]
    }
    async saveInvData() {
        this.playerInvData.save()                           
    }
    async deleteInvData() {
        this.playerInvData.delete()
    }
    async findItem(item) {
        await this.findInvData()
        let reqItem = this.playerInvData.items.filter((obj,i) => {
            
            return obj.Name === item.Name
            
        }
        )
     
        if (reqItem[0] === undefined) {
            this.playerInvData.items.push({
                Name: item.Name,
                Quantity: 1,
                Type: item.Type,
                ItemID: item.ID
            }
            )
           

        }
        else if(reqItem[0] !== undefined){
           
            this.playerInvData.items[this.playerInvData.items.indexOf(reqItem[0])] = {
                Name: item.Name,
                Quantity: reqItem[0].Quantity += 1,
                Type: item.Type,
                ItemID: item.ID
            }
        }
        this.playerInvData.balance -= item.Cost

        this.playerInvData.save()
    }


}
module.exports = playerDatas