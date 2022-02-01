const fs = require('fs');
const { Client, Collection, Intents,MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const { fileURLToPath } = require('url');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { builtinModules } = require('module');
const { hyperlink } = require('@discordjs/builders');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb+srv://coldy:ekilrrPL1DyLow8j@hxhbot.ecke1.mongodb.net/registerdata', { useNewUrlParser: true, useUnifiedTopology: true });
}
const registerSchema = new mongoose.Schema({
	userid: {
		type: String,
		unique: true
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

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync(`./commands`).filter(filter => filter.endsWith('.js'))
for ( file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(['register','stats'], command)
}


client.on('interactionCreate', async interaction => {
	url = 'https://discord.gg/BRrcUMy45M'
	link = hyperlink('Join this awesome server!', url)
	client.user.setPresence({activities: [{name}]})
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
client.login(token);

