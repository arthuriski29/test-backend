// const {Pool} = require("pg")


// const db = new Pool({
//     connectionString: process.env.DATABASE
// })

// db.connect().then(()=>{
//     console.log("Database connected")
// }).catch((err)=>{
//     console.log(err)
//     console.log("Failed connect to Database!")
// })

// module.exports = db

//-----

// const { default: mongoose } = require("mongoose");

// //connect to database
// mongoose.connect(process.env.MONGO_URI)
//   .then(()=> {console.log("Database Connected")})
//   .catch((err)=>{console.log(`Failed to Connect to Database: ${err}`)})


  // getting-started.js
const mongoose = require('mongoose');

// main()
// .then(()=> {console.log("Database Connected")})
// .catch(err => console.log(`Failed to Connect to Database: ${err}`));

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected")
  } catch (err) {
    console.log(`Failed to Connect to Database: ${err}`)
  }
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = main
