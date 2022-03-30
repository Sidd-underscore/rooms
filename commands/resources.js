
const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
  name: "resources",
  description: "Usefull resources",
  data: new SlashCommandBuilder()
    .setName('resources')
    .setDescription('Usefull resources'),

  async execute(interaction) {
    const links = new MessageActionRow()
      .addComponents(

        new MessageButton()
          .setLabel('Join the support server!')
          .setStyle('LINK')
          .setEmoji('913140065922863114')
          .setURL('https://discord.gg/9WyKP5vGcv'),
        new MessageButton()
          .setLabel('Rooms\' main page')
          .setStyle('LINK')
          .setEmoji('958176785743355995')
          .setURL('https://rooms.cool-sidd.repl.co'),
        new MessageButton()
          .setLabel('Rooms app page')
          .setStyle('LINK')
          .setEmoji('958176785743355995')
          .setURL('https://rooms.cool-sidd.repl.co/app'),
        new MessageButton()
          .setLabel('Source code')
          .setStyle('LINK')
          .setEmoji('958177481523867690')
          .setURL('https://github.com/uh-Sid/rooms-manager/tree/main'),
      );

    await interaction.reply({ content: `Below are some useful resources :thumbsup:`, components: [links] });
  }

}