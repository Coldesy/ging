module.exports.divine_touch = {
       execute(interaction,botobj,userobj) {
             
              userobj.Health += Math.floor(userobj.Health / 3)
              
       }
}