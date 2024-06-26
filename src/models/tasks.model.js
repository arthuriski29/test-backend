const mongoose = require('mongoose')

const Schema = mongoose.Schema //penggunaan Schema dari module mongoose

// Membuat Schema dengan isi yang sudah ditetapkan tipe nya
const taskSchema = new Schema({
  
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  projectId: {    // relation ke projects._id
    type: Schema.Types.ObjectId,
    ref: 'Project',
  },
  isFinished: {   // fitur task selesai/belum
    type: Boolean,
    default: false
  }

}, {timestamps: true})

module.exports = mongoose.model('Tasks', taskSchema) //nama schema di export sebagai 'Tasks'