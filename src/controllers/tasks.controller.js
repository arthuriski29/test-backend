const Tasks = require("../models/tasks.model")
const { default: mongoose } = require("mongoose")

exports.getAll = async(req, res) => {
  try {
    const {projectId} = req.params
    console.log('projectId', projectId)

    const data = await Tasks.find({projectId: projectId})
    if(!data) throw new Error('Failed to Get All Tasks')
    
    return res.status(200).json({
      success: true,
      message: `Get All Tasks Success for project with id ${projectId}`,
      results: data
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `${err}`
    })
  } 
}

// exports.getOneById = async(req, res) => {
//   try {
//     const {id} = req.params

//     //Check valid casting parameter sesuai type ObjectId jika mencari id yang tidak ada
//     if(!mongoose.Types.ObjectId.isValid(id)){
//       return res.status(404).json({
//         success: false,
//         message: `Task with id ${req.params.id} was not found`,
//       })
//     }

//     const data = await Tasks.findById(id)
    
//     return res.status(200).json({
//       success: true,
//       message: `Get One Task Success`,
//       results: data
//     })
//   } catch (err) {
    
//     return res.status(400).json({
//       success: false,
//       message: `${err}`
//     })
//   } 
// }

exports.createOne = async(req, res) => {
  try {
    const {projectId} = req.params
    
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).send({ error: 'Invalid Project ID format' });
    }
    const { title, description, startTime, endTime } = req.body

    if(!title) throw new Error('Title is required')
    if(!startTime) throw new Error('startTime is required')
    if(!endTime) throw new Error('endTime is required')

    // startTime tidak boleh lebih telat dari endTime
    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).send({ error: 'startTime must be earlier than endTime' });
    }

    const data = await Tasks.create({title, description, startTime, endTime, projectId})
    if(!data){
      res.status(400).json({
        success: false,
        message: `Failed to create Task`
      })
    }
    return res.status(200).json({
      success: true,
      message: `Create Task Success for project with id: ${projectId}`,
      results: data
    })

  } catch (err) {
      res.status(400).json({
        success: false,
        message: `${err}`
      })
  }
  
}

exports.updateOneById = async(req, res) => {
  try {
    const {id} = req.params
    const update = {...req.body }
    if(!req.body.title) throw new Error('Title is required')
    if(!req.body.startTime) throw new Error('startTime is required')
    if(!req.body.endTime) throw new Error('endTime is required')

    //Check valid casting parameter sesuai type ObjectId jika mencari id yang tidak ada
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        success: false,
        message: `Task with id ${req.params.id} was not found`,
      })
    }

    //Update data dengan id yang ditemukan
    const updateData = await Tasks.findOneAndUpdate({_id: id}, update, {
        new: true,
        runValidators: true,
      }).exec()
    if(!updateData) throw new Error(`Failed to Update data with id: ${id}`) //pesan gagal

    
    return res.status(200).json({
      success: true,
      message: `Update Task Success`,
      results: updateData
    })

  } catch (err) {
    
    return res.status(400).json({
      success: false,
      message: `${err}`
    })
  } 
}

exports.deleteOne = async(req, res) => {
  try {
    const {id} = req.params

    //Check valid casting parameter sesuai type ObjectId jika mencari id yang tidak ada
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        success: false,
        message: `Task with id ${req.params.id} was not found`,
      })
    }

    //Delete project dengan id yang ditemukan
    const data = await Tasks.findOneAndDelete({_id: id})

    if(!data) throw new Error(`Failed to Delete data with id: ${id}`) //pesan gagal
    

    
    return res.status(200).json({
      success: true,
      message: `Get All Tasks Success`,
      results: data
    })

  } catch (err) {
    
    return res.status(400).json({
      success: false,
      message: `${err}`
    })
  } 
}


