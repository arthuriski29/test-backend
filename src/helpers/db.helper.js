const mongoose = require('mongoose');

//koneksi ke Database dengan credential MONGO_URI
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connected")
  } catch (err) {
    console.log(`Failed to Connect to Database: ${err}`)
  }
}

module.exports = main
