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
    
    socket.emit('countUpdated', count)

    socket.on('increment', () => {
        count++
        // socket.emit('countUpdated',count)

        io.emit('countUpdated',count)
    })
})

server.listen(Port, () => console.log(`server is up on port ${Port}`))