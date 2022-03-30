console.log("NodeJS Version: " + process.version)
const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js');
 
const mySecret = process.env['TOKEN']
const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { loadCommands } = require("./handler/loadCommands");

const { token } = require('./config.json');
const { clientId, guildId } = require('./config.json');
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const { DiscordTogether } = require('discord-together');

client.discordTogether = new DiscordTogether(client);

client.commands = new Collection();
loadCommands(client);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.data.name, command);
}


client.once('ready', async () => {
	console.log('Ready!');
   client.user.setActivity(`/help`, {
  type: "LISTENING",
});

});


client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client)
    await command
	} catch (error) {
		console.error(error)
        const join = new MessageActionRow()
        			.addComponents(

          new MessageButton()
					.setLabel('Join server!')
					.setStyle('LINK')
                	.setURL('https://discord.gg/Fkjgn8WsyH'),
        );
		return interaction.reply({ content: 'There was an error while executing this command!\n If you want, you can send the following error to our support server.\n```js\n'+ error + '```', ephemeral: true, components: [join] });
	}
    
});

client.login(mySecret)