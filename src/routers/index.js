const router = require('express').Router()

router.get("/", (req, res) => {
  return res.json({
      success: true,
      message: "Backend is running well"
  })
})

// Untuk Semua Endpoint yang diawali -->  /projects
router.use("/projects", require("./projects.router.js"))

// Untuk Semua Endpoint yang diawali -->  /tasks 
router.use("/tasks", require("./tasks.router.js"))


router.use("*", (req, res) => {
  return res.status(404).json({
      success: false,
      message: "Resource not found"
  })
})

module.exports = router