const express = require("express")
const http = require('http')
const path = require("path")
const socketio = require('socket.io')
const Port = process.env.Port || 3011


const app = express()
const server = http.createServer(app)
const io = socketio(server)

const publicDirectoryPath = path.resolve(__dirname, "./public")

app.use(express.static(publicDirectoryPath))


io.on('connnection', () =>{
    console.log('New WebSokect connection')
})

server.listen(Port, () => console.log(`server is up on port ${Port}`))