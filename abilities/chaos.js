module.exports.chaos = {
    execute(interaction, botobj, userobj) {
        if (botobj.Attack < 50) { botobj.Attack *= 2 }
    }
}