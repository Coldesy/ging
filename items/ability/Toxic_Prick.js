const {Abilityadder}= require('../../utility/database/Abilityadder.js')



module.exports = {
    async execute(obj,name,interaction) {
       await Abilityadder.execute(obj,'Toxic Prick',interaction)
        
    }
}