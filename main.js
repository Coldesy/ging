const fs = require('fs');
const { Client, Collection, Intents,MessageEmbed } = require('discord.js');
const { token } = require('./config.json');
const { fileURLToPath } = require('url');
const Embed1 = new MessageEmbed()
	.setColor('#00aa00')
	.setTitle('pick')
	.setDescription('ghfhqwfqfggq')
	.setThumbnail('https://i.imgur.com/AfFpg78u.png')
	.setImage('https://i.imgur.com/Afr75uiu.png')
	.setTimestamp()
	.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFj7pu.png' });

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

