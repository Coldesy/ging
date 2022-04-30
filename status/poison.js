const wait = require('util').promisify(setTimeout)
module.exports = {
    poison: true,
    noOfTurns: 0,
    async execute( playerobj, oppoobj) {
        if (this.noOfTurns <= 6) {
            let int = 2 + this.noOfTurns
            playerobj.Health -= Math.floor(int / 100 * oppoobj.Health)
            return `poison is taking effect!`
        }
        if (this.noOfTurns > 6) {
            await playerobj.status.delete(poison)
            return `poison effect ended!`
        }
        this.noOfTurns += 1

    }
}