const projectsRouter = require("express").Router()
const projectsController = require("../controllers/projects.controller")

const taskController = require("../controllers/tasks.controller")
const validateTimeRange = require("../middlewares/taskValidationTimeRange")


// Mendapatkan semua proyek
projectsRouter.get("/", projectsController.getAll)

// Mendapatkan proyek berdasarkan ID
projectsRouter.get("/:id", projectsController.getOneById)

// Mendapatkan semua tugas untuk sebuah proyek
projectsRouter.get("/:projectId/tasks", taskController.getAll)

// Mendapatkan semua tugas untuk sebuah proyek
projectsRouter.get("/:projectId/tasks/not-finished", taskController.getAllNotFinished)

// Membuat data proyek
projectsRouter.post("/", projectsController.createOne) 

// Membuat tugas untuk sebuah proyek
projectsRouter.post("/:projectId/tasks", validateTimeRange, taskController.createOne)

// Memperbaharui proyek
projectsRouter.put("/:id", projectsController.updateOneById)

// Menghapus proyek
projectsRouter.delete("/:id", projectsController.deleteOne)


module.exports = projectsRouter
