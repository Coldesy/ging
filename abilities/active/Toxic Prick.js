module.exports = {
  statusEffect: true,
  NenCost: 6,

  async execute(interaction, turns,oppoturns,playerturns,oppoobj,playerobj) {
       if (playerobj.Nen < this.NenCost) {
         return `Insufficient nen!`
       }
       const poison = require('../../status/poison.js')
   
       oppoobj.status.set('posion',poison)
   
       oppoobj.poisonObj = poison
       playerobj.Nen -= this.NenCost
       return `${oppoobj.name} was badly poisoned!`
  }
}