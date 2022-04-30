const fs = require('fs');
const { Client, Collection, Intents,MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { builtinModules } = require('module');
const { hyperlink } = require('@discordjs/builders');
const dailyreward = require('./utility/events/dailyEvent.js')
const questReset = require('./utility/events/questReset.js')
require('dotenv').config()

const abilityCollection = new Collection()
const abilityFiles = fs.readdirSync(`abilities`).filter(filter => filter.endsWith('.js'))
for (const file of abilityFiles) {
    const ability = require(`./abilities/${file}`)
    const abilityName = file.replace(/.js/g, '')
    abilityCollection.set(abilityName, ability)


}
module.exports.abilityCollection = abilityCollection

const statusCollection = new Collection()
const statusFiles = fs.readdirSync(`status`).filter(filter => filter.endsWith('.js'))
for (const file of statusFiles) {
    const status = require(`./status/${file}`)
    const statusName = file.replace(/.js/g, '')
    statusCollection.set(statusName, status)


}
module.exports.statusCollection = statusCollection




main().catch(err => console.log(err));

async function main() {
	await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true,autoIndex:true });
}

// collection and stuff, will organise later






const client = new Client({ intents: [Intents.FLAGS.GUILD_MEMBERS,Intents.FLAGS.GUILDS] });
i = 0
client.commands = new Collection();
const commandFiles = fs.readdirSync(`commands`).filter(filter => filter.endsWith('.js'))
for ( const file of commandFiles) {
	
    const command = require(`./commands/${file}`)
	
	let commandsArr = ['fight','market','quest','register','remove_ability','shop','stats','test','train','use']
	let cmdName = commandsArr[i]
    client.commands.set(cmdName, command)
	i++
}


client.on('interactionCreate', async interaction => {
	
	
	client.user.setPresence({activities: [{name: `Co founder: Sunny \nCo founder: Lakshmish `}],status: 'offline'})
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName)

	if (!command) return

	try{
		await command.execute(interaction,client)
	} catch(e){
		console.log(e)
		
	}


});
// section for events schedules
dailyreward
questReset
 
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('ready');
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);

