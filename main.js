const fs = require('fs');
const { Client, Collection, Intents,MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const { fileURLToPath } = require('url');
const mongoose = require('mongoose');
const { stringify } = require('querystring');
const { StringDecoder } = require('string_decoder');
const { builtinModules } = require('module');

main().catch(err => console.log(err));

async function main() {
	await mongoose.connect('mongodb+srv://coldy:ekilrrPL1DyLow8j@hxhbot.ecke1.mongodb.net/registerdata', { useNewUrlParser: true, useUnifiedTopology: true });
}
const registerSchema = new mongoose.Schema({
	userId: {
		type: String,
		unique: true
	},
	nik: String

}


)
const registerData = mongoose.model('userid', registerSchema) 
module.exports.registerData = registerData

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.commands = new Collection();
const commandFiles = fs.readdirSync(`./commands`).filter(filter => filter.endsWith('.js'))
for ( file of commandFiles) {
    const command = require(`./commands/${file}`)
    client.commands.set(command.data.name, command)
}

client.on('interactionCreate', async interaction => {
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

