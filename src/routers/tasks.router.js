const tasksRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")


const taskController = require("../controllers/tasks.controller")
const validateTimeRange = require("../middlewares/taskValidationTimeRange")
// const authMiddleware = require('../middlewares/auth.middleware');


//ROUTING untuk TUGAS (endpoint=/tasks)
tasksRouter.put("/:id", validateTimeRange, taskController.updateOneById) // Memperbaharui tugas
tasksRouter.delete("/:id", taskController.deleteOne) // Menghapus tugas



module.exports = tasksRouter
