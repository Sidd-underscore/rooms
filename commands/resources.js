
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: "links",
  description: "Usefull links",
  data: new SlashCommandBuilder()
    .setName('links')
    .setDescription('Usefull links'),

  async execute(interaction) {
    const links = new MessageActionRow()
      .addComponents(

        new MessageButton()
          .setLabel('Join the support server!')
          .setStyle('LINK')
          .setEmoji('913140065922863114')
          .setURL('https://discord.gg/Fkjgn8WsyH'),
        new MessageButton()
          .setLabel('Rooms\' main page')
          .setStyle('LINK')
          .setEmoji('<:rooms:958176785743355995>')
          .setURL('https://rooms.cool-sidd.repl.co'),
        new MessageButton()
          .setLabel('Source code')
          .setStyle('LINK')
          .setEmoji('913138957158584380')
          .setURL('https://github.com/Aspect-for-Discord/Aspect/tree/main'),
      );

    await interaction.reply({ content: `Below are some useful links :thumbsup:`, components: [links] });
  }

}