const express = require("express");

const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
app.set("view engine", "ejs");
var options = {
  allowEIO3: true
};
var querystring = require('querystring');

const io = require("socket.io")(server, options);
const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

function makeId(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}




app.use("/peerjs", peerServer);


app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
})


app.get("/beta", (req, res) => {
  res.render("beta");
})

app.get("/humans.txt", (req, res) => {
  res.render("humans");
})

app.get("/app", (req, res) => {
  res.render("app", { roomId: 'none' });
})

app.get("/app/:type/:code", (req, res) => {
  res.render('app', { roomId: req.params.type + '/' + req.params.code })
})



app.get("/surprise", (req, res) => {
  res.render("surprise");
});

app.get("/offline", (req, res) => {
  res.render("offline");
});

app.get("/video/:room", (req, res) => {
  res.render("video", { roomId: req.params.room });
});

app.get("/checklist/:room", (req, res) => {
  res.render("checklist", { roomId: req.params.room });
});

app.get("/settings", (req, res) => {
  res.render(`dash`);
});

app.get("/offline.html", (req, res) => {
  res.render(`offline.ejs`);
});


app.get("/text/:room", (req, res) => {
  res.render("text", { roomId: req.params.room });
});



io.on("connection", (socket) => {
  console.log('hello there, im connected')
  socket.on('update', function(msg) {
    io.emit(msg.id, { msg: msg.msg, user: msg.user,  color: msg.color, avatar: msg.avatar, time: msg.time, default: msg.default })
  });
  socket.on("join-room", (roomId, userId, userName) => {
    socket.join(roomId);
    socket.to(roomId).emit("user-connected", userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
  });
});

io.on("connect_error", (err) => {
  console.log(`connect_error due to ${err.message}`);
});

app.get('*', function(req, res){
  res.status(404).render('404');
});


server.listen(3030);


//from bot.js, discord bot

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