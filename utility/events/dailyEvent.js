const { ToadScheduler, SimpleIntervalJob, AsyncTask} = require('toad-scheduler');
const { Battlestats, playerStatus, abilitiesOfUsers, abilityCollection, InvModel } = require('../../schema.js');

const scheduler = new ToadScheduler();

const task = new AsyncTask('dailyrewards',async () => {
    await InvModel.updateMany({ },{$inc : {'balance': 100}}),
    (err) => {
        console.log(err)
    }
});

const job = new SimpleIntervalJob({seconds: 20}, task)

module.exports.dailyreward = scheduler.addSimpleIntervalJob(job)
