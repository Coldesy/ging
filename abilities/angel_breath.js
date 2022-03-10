module.exports.angel_breath = {
    NenCost: 5,
    afterDeath: false,
   async execute(interaction,botobj,oppoobj,userobj,selectmenu,userID,inthealth,intatk,intdef,intnen,intint) {
  
          userobj.Health = inthealth
          interaction.editReply({content:`   **ANGEL'S BREATH**\nYou are fully healed!!\nOpponent's turn `,components:[selectmenu]})
        
           
    }
}