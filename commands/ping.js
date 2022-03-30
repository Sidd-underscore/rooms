
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
        name: "ping",
    description: "Yes, I'm online.",
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping, pong, am I online?'),

    async execute(interaction) {
		let emoji = ""
		if(interaction.client.ws.ping < 50) {
			emoji = "<:veryonline:904127903862780016>"
		} else if(interaction.client.ws.ping < 250) {
			emoji = "<:mmmmmmonline:904127903611101185> "
		} else if(interaction.client.ws.ping > 500) {
			emoji = "<:dedonline:904127903451734037>"
		}

		await interaction.reply({content : `Pong! ${emoji} Client Latency - ${interaction.client.ws.ping}ms.`});
	}
    
}