const express = require("express")
const path = require("path")


const port = process.eng.PORT || 3000
const app = express()

const publicDirectoryPath = path.join(__dirname+ '../public')




app.listen(port,() => {
    console.log(`server is runnin on port ${port}`)
})

 