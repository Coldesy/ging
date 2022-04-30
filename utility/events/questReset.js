const { ToadScheduler, SimpleIntervalJob, AsyncTask} = require('toad-scheduler');
const schedule = require('node-schedule')
const { Battlestats, playerStatus, abilitiesOfUsers,  InvModel,questModel } = require('../../schema.js');

const questRefresh = schedule.scheduleJob('* * */1 * *',async (firedTime) => {

      await questModel.updateMany(
           {'InQuest': true },
           {'InQuest': false,
            'currentQuest': null}
        )
      
})
module.exports = questRefresh