const tasksRouter = require("express").Router()


const taskController = require("../controllers/tasks.controller")
const validateTimeRange = require("../middlewares/taskValidationTimeRange")


//ROUTING untuk TUGAS (endpoint=/tasks)

// Memperbaharui tugas
tasksRouter.put("/:id", validateTimeRange, taskController.updateOneById) 

// Menandai tugas selesai
tasksRouter.put("/:id/done", taskController.updateOneDone) 

// Menghapus tugas
tasksRouter.delete("/:id", taskController.deleteOne) 



module.exports = tasksRouter
