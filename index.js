const express = require('express')
const main = require('./src/helpers/db.helper')
const app = express()

//Membaca credential pada .env file 
require("dotenv").config({
  path: ".env",
})
const PORT = process.env.PORT

// parsing url-encoded data
app.use(express.urlencoded({extended: false}))

// parsing data type json untuk api request
app.use(express.json())

//Connection ke Database
main()

//routing ke router/index.js
app.use("/", require("./src/routers/index"))

//listen server ke port 8888(.env)
app.listen(PORT, ()=>{
  console.log(`Backend App running on port: ${PORT}`)
})



