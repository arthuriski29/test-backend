const Projects = require("../models/projects.model")
const { default: mongoose } = require("mongoose")

// mendapatkan semua project
exports.getAll = async(req, res) => {
  try {
    const data = await Projects.find()
    if(!data) throw new Error('Failed to Get All Projects')
    
    return res.status(200).json({
      success: true,
      message: `Get All Project Success`,
      results: data
    })
  } catch (err) {
    res.status(400).json({
      success: false,
      message: `${err}`
    })
  } 
}

// mendapatkan 1 project by _id
exports.getOneById = async(req, res) => {
  try {
    const {id} = req.params

    //Check valid casting parameter sesuai type ObjectId jika mencari id yang tidak ada
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        success: false,
        message: `Project with id ${req.params.id} was not found`,
      })
    }

    const data = await Projects.findById(id)
    
    return res.status(200).json({
      success: true,
      message: `Get One Project Success`,
      results: data
    })
  } catch (err) {
    
    return res.status(400).json({
      success: false,
      message: `${err}`
    })
  } 
}

// membuat project
exports.createOne = async(req, res) => {
  try {
    const { name, description } = req.body
    if(!name) throw new Error('Name is required')

    const data = await Projects.create({name, description})
    if(!data){
      res.status(400).json({
        success: false,
        message: `Failed to create Project`
      })
    }
    return res.status(200).json({
      success: true,
      message: `Create Project Success`,
      results: data
    })

  } catch (err) {
      res.status(400).json({
        success: false,
        message: `${err}`
      })
  } 
}

// memperbaharui project
exports.updateOneById = async(req, res) => {
  try {
    const {id} = req.params
    const update = {...req.body }
    if(!req.body.name) throw new Error('Name is required')

    //Check valid casting parameter sesuai type ObjectId jika mencari id yang tidak ada
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        success: false,
        message: `Project with id ${req.params.id} was not found`,
      })
    }

    //Update data dengan id yang ditemukan
    const updateData = await Projects.findOneAndUpdate({_id: id}, update, {
        new: true,
        runValidators: true,
      }).exec()
    if(!updateData) throw new Error(`Failed to Update data with id: ${id}`) //pesan gagal

    
    return res.status(200).json({
      success: true,
      message: `Update Project Success`,
      results: updateData
    })

  } catch (err) {
    
    return res.status(400).json({
      success: false,
      message: `${err}`
    })
  } 
}

// menghapus project
exports.deleteOne = async(req, res) => {
  try {
    const {id} = req.params

    //Check valid casting parameter sesuai type ObjectId jika mencari id yang tidak ada
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(404).json({
        success: false,
        message: `Project with id ${req.params.id} was not found`,
      })
    }

    //Delete project dengan id yang ditemukan
    const data = await Projects.findOneAndDelete({_id: id})

    if(!data) throw new Error(`Failed to Delete data with id: ${id}`) //pesan gagal
    
    return res.status(200).json({
      success: true,
      message: `Delete a Project Success`,
      results: data
    })

  } catch (err) {
    
    return res.status(400).json({
      success: false,
      message: `${err}`
    })
  } 
}



