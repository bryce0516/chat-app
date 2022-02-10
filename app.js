const express = require('express');

const path = require('path')
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require("socket.io");
const io = socketio(server)

const Port = process.env.Port || 3011



const publicDirectoryPath = path.resolve(__dirname, "./public")

app.use(express.static(publicDirectoryPath))



// server (emit) -> client(receive) countupdated
// client(emit) -> server(receive) increment
let count = 0

io.on('connection', (socket) =>{
    console.log('New WebSokect connection')

    socket.emit('message', "Welcome!")
    socket.broadcast.emit('message', 'A new user had joined')


    socket.on('sendMessage', (message, callback) => {
        io.emit('message', message)
        callback('Develived!')
    })

    socket.on('sendLocation', (coords) => {
        io.emit('message',`https://google.com/maps?q=${coords.lat},${coords.long}` )
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })

})

server.listen(Port, () => console.log(`server is up on port ${Port}`))