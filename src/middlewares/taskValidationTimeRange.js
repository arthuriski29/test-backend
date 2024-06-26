const Tasks = require("../models/tasks.model")

// Middleware to validate time range and check for overlaps
const validateTimeRange = async (req, res, next) => {
  console.log('validasi waktu jalan')
  try {
    const { startTime, endTime } = req.body;
    const projectId = req.params.projectId;

    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).send({ error: 'startTime must be earlier than endTime' });
    }

    // Check for overlapping tasks
    const overlappingTasks = await Tasks.find({
      projectId,
      $or: [
        { startTime: { $lt: new Date(endTime) }, endTime: { $gt: new Date(startTime) } },
        { startTime: { $gte: new Date(startTime), $lt: new Date(endTime) } },
        { endTime: { $gt: new Date(startTime), $lte: new Date(endTime) } }
      ]
    });

    if (overlappingTasks.length > 0) {
      return res.status(400).send({ error: 'Time range for task cannot be overlapped with the current Task' });
    }

    return next();
    } catch (err) {

      // handle input tanggal harus ISO 8061
      if(err.message.includes('Cast to date failed')){
        return res.status(400).json({
          success: false,
          message: 'Invalid input of date on startTime or endTime'
        })
      }
      res.json({
        message: `${err}`
      })
  }
};

module.exports = validateTimeRange