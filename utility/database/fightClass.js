const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment, Collection, MessageButton } = require('discord.js')
const wait = require('util').promisify(setTimeout)
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { Battlestats, playerStatus, abilitiesOfUsers, battleItems, InvModel } = require('../../schema.js')
const { abilityCollection } = require('../others/collection.js')
const Canvas = require('canvas')
const AbilityData = require('../others/AbilityData.js')
const fillArr = require('../others/fillArr.js')

const { embedMaker } = require('../embeds/fightembed.js');
const { map } = require('../others/AbilityData.js');
const { timeStamp } = require('console');

class Fight {
    constructor(interaction, userid,name) {
        this.interaction = interaction
        this.userid = userid
        this.turn = false
        this.name = name
        this.nenGain = 5
        this.status = new Map()
    }
    async InvFetch() {
        let invData = await InvModel.find({ 'userid': this.userid })
        this.balance = invData[0].balance
    }
    async playerStatusFetch() {
        let statusOfPlayer = await playerStatus.find({ 'userid': this.userid })
        this.playerStatus = statusOfPlayer[0]
        return statusOfPlayer[0]

    }
    async playerDataFetch() {
        let playerData = await Battlestats.find({ 'userid': this.userid })
        this.playerData = playerData[0]
        return playerData[0]

    }
    async abilityDataFetch() {
        let abilityData = await abilitiesOfUsers.find({ 'userid': this.userid })
        this.abilityData = abilityData[0]
        return abilityData[0]
    }
    async statusChange(obj, val) {
        obj.battleStatus = val
        await obj.save()
    }
    async battleItemsCreate() {
        let battleItemData = await battleItems.find({ 'userid': this.userid })
        this.battleItemData = battleItemData[0]
        return battleItemData[0]
    }
    async prepare() {

        this.Health = this.playerData.Health
        this.Attack = this.playerData.Attack
        this.Defense = this.playerData.Defense
        this.tier = this.playerData.tier
        this.Exp = this.playerData.Exp
        this.Nen = 20
        this.Intelligence = this.playerData.Intelligence
        await this.statusChange(this.playerStatus, true)
      
        await this.InvFetch()
        await this.passivecollection()
        await this.activecollection()
    }

    async abilityBtnsCreate() {

        let abilityArr = []
        let abilitybtns = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId('back')
                    .setLabel('Back')
                    .setStyle('SECONDARY')
            )


        let keys = Object.keys(this.abilityData.abilities)

        for (let index = 0; index < keys.length; index++) {
            let val = keys[index]
            abilityArr.push(this.abilityData.abilities[val])

        }


        let UnfilteredArr = abilityArr.filter((val) => {
            return val !== null
        })

        if (UnfilteredArr[0] === undefined) {
            this.playerStatus.noAbilities = true
            return false
        }



        const filteredArr = UnfilteredArr.filter((val) => {
            return AbilityData.get(val)['Type'] === 'Active'
        })
        this.activeAbility = filteredArr

        const passiveAbilities = UnfilteredArr.filter((val) => {
            return AbilityData.get(val)['Type'] === 'Passive'

        })
        this.passiveAbility = passiveAbilities

       
        filteredArr.forEach(async element => {
            abilitybtns.components.push(new MessageButton()
                .setCustomId(element)
                .setLabel(element)
                .setStyle('SECONDARY'))

        });

        this.abilityBtns = abilitybtns
        return abilitybtns


    }
    async activecollection() {
        if ( this.activeAbility === undefined) {
            return false
        }
        let abilityCollection = new Map()
        this.activeAbility.forEach(ability => {
            abilityCollection.set(ability, require(`../../abilities/active/${ability}`))
        });
        this.activeAbilityCollection = abilityCollection

    }
    async passivecollection() {
        if ( this.activeAbility === undefined) {
            return false
        }


        let abilityCollection = new Map()
        this.passiveAbility.forEach(ability => {
            abilityCollection.set(ability, require(`../../abilities/passive/${ability}`))
        });
        this.passiveAbilityCollection = abilityCollection
    }




    // actual battle stuff starts here
    async critpreps() {
        
        let critdmgArr = fillArr.fillarr(2, 20)
        let normalArr = fillArr.fillarr(1, 80)
        let critArr = critdmgArr.concat(normalArr)
        this.critArr = critArr

    }

    async dodgepreps() {
        
        let dodgedmgArr = await fillArr.fillarr(0,20)
        let normalArr = await fillArr.fillarr(1, 80)
        let dodgeArr = await dodgedmgArr.concat(normalArr)
        this.dodgeArr = dodgeArr


    }
    async battlePreps() {
        await this.dodgepreps()
        await this.critpreps()
    }
    async critOrDodge(dodgeArr) {
        let dmgMultiplier = await this.critArr[Math.floor(Math.random() * this.critArr.length)]
        let dodgeChance = await dodgeArr[Math.floor(Math.random() * dodgeArr.length)]
        let dmg = await dmgMultiplier * dodgeChance * Math.floor(Math.random() + 1)
        return dmg

        // returns crit(of player) and dodge(of oppo)
    }
    async attack(oppoobj) {
        
        let crit = await this.critOrDodge(oppoobj.dodgeArr)
        let dmgLevel = 2*1/this.tier/5 + 2
        let dmg = Math.floor( dmgLevel * 100 * this.Attack / oppoobj.Defense )/50 * crit
        oppoobj.Health -= Math.floor(dmg)
        if (crit === 0) {
            return `Looks like ${oppoobj.name} dodged!`
        }
        if (crit >= 2) {
            return `${this.name} attacked with an incredible damage of ${dmg}` 
        }
        else
        {return `${this.name} dealt ${Math.floor(dmg)} on ${oppoobj.name}`}
      

    }
    async rest() {
        this.Nen += this.nenGain
        return `${this.name} gained ${this.nenGain} Nen!`
    }
    async end(oppoobj,turns) {
        oppoobj.Exp += Math.floor(Math.random() * 1/this.tier) * 2
        let winOrLoseAmount = Math.floor(this.balance / 2)
        let roundedDigit
        switch (oppoobj.tier) {
            case 1:
                roundedDigit = 1000000
                break;
            case 2:
                roundedDigit = 100000
                break;
            case 3:
                roundedDigit = 10000
                break;
            case 4:
                roundedDigit = 1000
                break;
            case 5:
                roundedDigit = 100
                break;
            case 6:
                roundedDigit = 10
                break;
        }

        let gtthanone = oppoobj.Exp / roundedDigit >= 1
        if (gtthanone) {
            oppoobj.Exp -= oppoobj.Exp % roundedDigit
            oppoobj.tier -= 1
        }


        await Battlestats.updateOne({ 'userid': oppoobj.userid }, { $inc: { 'Exp': oppoobj.Exp } })
        await Battlestats.updateOne({ 'userid': oppoobj.userid }, { $inc: { 'tier': oppoobj.tier } })
        await InvModel.updateOne({ 'userid': oppoobj.userid }, { $inc: { 'balance': winOrLoseAmount } })
        await playerStatus.updateOne({'userid': oppoobj.userid}, {$inc: {'Wins': 1}})
        await playerStatus.updateOne({'userid': this.userid}, {$inc: {'Loses': 1}})
        return `**${oppoobj.name} won!**`

    }
    async passiveAbilities() {
        if (this.passiveAbility[0] === undefined) {
            return 'no status effects!'
        }
        this.passiveAbility.forEach(element => {
            this.passiveAbilityCollection.get(element).execute(interaction,name,turns,oppoturns,playerturns,oppoobj,playerobj)
        });
    }
    async ability(interaction,name,turns,oppoturns,playerturns,oppoobj,playerobj) {
        let msg = await this.activeAbilityCollection.get(name).execute(interaction,turns,oppoturns,playerturns,oppoobj,playerobj)
        return msg 

    }
    async statusActivate(oppoobj) {
      
        if (Array.from(this.status.keys())[0] === undefined) {
          return 'no status effect!'
        }
        let msg = 'no status'
        Array.from(this.status.keys()).forEach(element => {
            msg = this.status.get(element).execute(this,oppoobj)

        });
        return msg
        
    }
        

}
module.exports = Fight

