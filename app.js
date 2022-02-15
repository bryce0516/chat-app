const express = require("express");
const path = require("path");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server);
const {
  generateMessage,
  generateLocationMessage,
} = require("./src/util/messages");
const {
  addUser,
  removeUser,
  getUser,
  getUserInRoom,
} = require("./src/util/users");
const Filter = require("bad-words");

const Port = process.env.Port || 3011;

const publicDirectoryPath = path.resolve(__dirname, "./public");

app.use(express.static(publicDirectoryPath));

// server (emit) -> client(receive) countupdated
// client(emit) -> server(receive) increment
let count = 0;

io.on("connection", (socket) => {
  console.log("New WebSokect connection");

  // socket.emit('message', generateMessage("Welcome!"))

  // socket.broadcast.emit('message', generateMessage('A new user had joined'))

  socket.on("join", (options, callback) => {
    const { error, user } = addUser({ id: socket.id, ...options });

    if (error) {
      return callback(error);
    }

    socket.join(user.room);

    socket.emit("message", generateMessage("Welcome!"));
    socket.broadcast
      .to(user.room)
      .emit("message", generateMessage(`${user.username} has joined!`));

    io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUserInRoom(user.room)
    })
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id)
      
    const filter = new Filter();

    if (filter.isProfane(message)) {
      return callback("Profanity is not allowed");
    }

    io.to(user.room).emit("message", generateMessage(user.username, message));
    callback();
  });

  socket.on("sendLocation", (coords, callback) => {
    const user = getUser(socket.id)
    io.to(user.room).emit(
      "locationMessage",
      generateLocationMessage(user.username,
        `https://google.com/maps?q=${coords.lat},${coords.long}`
      )
    );
    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", generateMessage(`${user.username} has left!`));
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUserInRoom(user.room)
    })
    }
  });
});

server.listen(Port, () => console.log(`server is up on port ${Port}`));
