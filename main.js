const fs = require('fs');
const { Client, Collection, Intents,MessageEmbed } = require('discord.js');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { builtinModules } = require('module');
const { hyperlink } = require('@discordjs/builders');
require('dotenv').config()

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true,autoIndex:true });
}
const registerSchema = new mongoose.Schema({
	userid: {
		type: String,
		unique: true,
	},
	nik: String,
	health: Number,
	attack: Number,
	defense: Number,
	nen: Number,
	intelligence: Number

}
)



const registerData = mongoose.model('playerData', registerSchema) 
module.exports.registerData = registerData

const BattleStatsSchema = new mongoose.Schema({
    userid: {
		type: String,
		unique: true,
	},
	Nenaffinity: String,
	Health: Number,
	Attack: Number,
	Defense: Number,
	Nen: Number,
	Intelligence: Number

}
)
const playerStatusSchema = new mongoose.Schema({
	userid: {
		type: String,
		unique: true,
	},
	battleStatus: Boolean
})
const playerStatus = mongoose.model('playerStatus', playerStatusSchema)


const Battlestats = mongoose.model('playerbattledata', BattleStatsSchema) 
module.exports.playerStatus = playerStatus
module.exports.Battlestats = Battlestats



const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
i = 0
client.commands = new Collection();
const commandFiles = fs.readdirSync(`commands`).filter(filter => filter.endsWith('.js'))
for ( const file of commandFiles) {
    const command = require(`./commands/${file}`)
	
	let nigg = ['fight','register','stats' ]
	let pucci = nigg[i]
    client.commands.set(pucci, command)
	i++
}


client.on('interactionCreate', async interaction => {
	url = 'https://discord.gg/BRrcUMy45M'
	link = hyperlink('Join this awesome server!', url)
	client.user.setPresence({activities: [{name: `${link}`}]})
	if (!interaction.isCommand()) return;
	const command = client.commands.get(interaction.commandName)

	if (!command) return

	try{
		await command.execute(interaction)
	} catch(e){
		console.log(e)
		
	}


});
 
// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('Ready!');
});

// Login to Discord with your client's token
client.login(process.env.TOKEN);

