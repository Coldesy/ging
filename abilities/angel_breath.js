module.exports.angel_breath = {
    NenCost: 5,
   async execute(interaction,botobj,oppoobj,userobj,selectmenu,inthealth,intatk,intdef,intnen,intint) {
  
          userobj.Health = inthealth
          interaction.editReply({content:`   **ANGEL'S BREATH**\nYou are fully healed!! `,components:[selectmenu]})
        
           
    }
}