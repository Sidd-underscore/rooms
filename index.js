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

app.get("/docs", (req, res) => {
  res.render("docs");
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
  //below is only for text chats bc im too lazy to upgrade them to v2
  socket.on('update', function(msg) {
    io.emit(msg.id, { msg: msg.msg, user: msg.user, color: msg.color, avatar: msg.avatar, time: msg.time, default: msg.default })
  });
  //below is for anything but text chats and video chats
  socket.on('update-v2', function(info) {
    io.emit(info.id, { information: info.stuff, action: info.action, user: info.user, color: info.color, avatar: info.avatar, time: info.time, default: info.default, type: info.type })
  });
  //below is for video chats

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

app.get('*', function(req, res) {
  res.status(404).render('404');
});


server.listen(3030);
