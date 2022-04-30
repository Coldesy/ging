const { abilitiesOfUsers, InvModel, Battlestats } = require('../../schema.js')
const { Client, Collection, Intents, MessageEmbed } = require('discord.js');
const { isKeyObject } = require('util/types');
const mongoose = require('mongoose');
const { Console } = require('console');


// (?s).* matches everything

class useItems {
    'use strict'
    constructor(id, itemID, interaction) {
        this.interaction = interaction
        this.id = id;
        this.itemID = itemID
    }
    async findItem() {
        const items = await InvModel.find(
           
            {'userid': this.id},
          
      )
      this.items = items[0]
      
      
    }
    async setIndex(){
        let itemToUse = await this.items.items.filter((item)=>{
            return item.ItemID === this.itemID
        })
        const indexOfItem = this.items.items.indexOf(itemToUse[0])
        this.index = indexOfItem
    }
    async useItem() {
       
        
        const itemFile = require(`../../items/${this.items.items[this.index].Type}/${this.items.items[this.index].Name}`)
       
        itemFile.execute(this.items.items[this.index], this.items.items[this.index].Name, this.interaction)

        if (this.items.items[this.index].Quantity > 1) {
            this.items.items[this.index].Quantity -= 1
        }
        if (this.items.items[this.index].Quantity === 1) {
            this.items.items.splice(this.index,1)
        }
        
    }
    
  


    
    async saveItem(){
       
        await this.items.save()

    }

}

module.exports = useItems

