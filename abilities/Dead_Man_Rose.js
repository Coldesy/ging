module.exports.Dead_Man_Rose = {
   NenCost: 0,
   afterDeath: true,
   async execute(interaction, botobj, userobj, userobj2, select, userid) {

      let DMR = Math.floor(userobj.Attack + userobj.Health + userobj.Defense + userobj.Nen + userobj.Intelligence)

      if (true) {
         userobj2.Health -= Math.floor(DMR * 200)
         userobj.Health = 0
         userobj.Attack = Math.floor(DMR * 200)
      }

      await interaction.editReply({ content: `You killed yourself and nuked your opponent for ${userobj.Attack} Damage!`, components: [select] })

   }
}