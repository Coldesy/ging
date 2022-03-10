module.exports.Replicate = {
    async execute(interaction,botobj,oppoobj,userobj,selectmenu,inthealth,intatk,intdef,intnen,intint) {

        CWHPLArr = [100, 200, 300]
        CWHPMArr = [40, 60, 80, 100]
        CWHPHArr = [5, 8, 10, 15, 20, 25, 30, 35, 40]

        ReplicationL = CWHPLArr[Math.floor(Math.random() * CWHPLArr.length)]

        ReplicationM = CWHPMArr[Math.floor(Math.random() * CWHPMArr.length)]

        ReplicationH = CWHPHArr[Math.floor(Math.random() * CWHPHArr.length)]


        if (botobj.Health < 100) { botobj.Health += ReplicationL }
   else if (botobj.Health >100 && botobj.Health < 300) { botobj.Health += ReplicationM }
   else if (botobj.Health <300 && botobj.Health < 1000) { botobj.Health += ReplicationH
    await Interaction.editReply({content: 'Chimera Worm is giving you more fatigue',components:[selectmenu] })
    }
}}