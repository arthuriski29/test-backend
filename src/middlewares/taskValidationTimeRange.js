const Tasks = require("../models/tasks.model")

// Middleware untuk validasi agar tidak ada tumpang tindih task dalam project dalam waktu sama
const validateTimeRange = async (req, res, next) => {
  console.log('validasi waktu jalan')
  try {
    const { startTime, endTime } = req.body;
    const projectId = req.params.projectId;


    // Check memasukkan task baru, awal tidak boleh melebihi akhir
    if (new Date(startTime) >= new Date(endTime)) {
      return res.status(400).send({ error: 'startTime must be earlier than endTime' });
    }

    // Check tasks overlap(tumpang tindih) dengan kondisi $or
    const overlappingTasks = await Tasks.find({
      projectId,
      $or: [ //salah satu benar maka error diterima

        // jika project lama mulai sebelum project baru berakhir, dan project lama berakhir setelah project baru mulai 
        { startTime: { $lt: new Date(endTime) }, endTime: { $gt: new Date(startTime) } },

        // jika project lama mulai dalam interval project baru
        { startTime: { $gte: new Date(startTime), $lt: new Date(endTime) } },

        // jika project lama berakhir dalam interval project baru
        { endTime: { $gt: new Date(startTime), $lte: new Date(endTime) } }
      ]
    });

    //mendeteksi overlap lebih dari 0 ('pelanggaran' >=1 error overlap berjalan)
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