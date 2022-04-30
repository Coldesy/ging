const {Battlestats} = require('../../schema.js')
const schedule = require('node-schedule')


module.exports = {
    async execute(obj,name,interaction) {
      
    

        const stats = await Battlestats.find({'userid': interaction.user.id},'Attack')
        stats[0].Attack += 10
        await stats[0].save()
        await interaction.reply({content:`you got strength buff for one match !`})
        
       
        
        
    }
}