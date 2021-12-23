const express = require("express")
const path = require("path")

const Port = process.env.Port || 3011


const app = express()

const publicDirectoryPath = path.resolve(__dirname, "./public")

app.use(express.static(publicDirectoryPath))


app.listen(Port, () => console.log(`server is up on port ${Port}`))