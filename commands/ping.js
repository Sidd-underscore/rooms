
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
        name: "ping",
    description: "Yes, I'm online.",
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Ping, pong, am I online?'),

    async execute(interaction) {
		let emoji = ""


		await interaction.reply({content : `Pong! ${emoji} Client Latency - ${interaction.client.ws.ping}ms.`});
	}
    
}