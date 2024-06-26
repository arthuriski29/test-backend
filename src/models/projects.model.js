const mongoose = require('mongoose')

const Schema = mongoose.Schema //penggunaan Schema dari module mongoose

// Membuat Schema dengan isi yang sudah ditetapkan tipe nya
const projectSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  }
}, {timestamps: true})

module.exports = mongoose.model('Projects', projectSchema) //nama schema di export sebagai 'Projects'