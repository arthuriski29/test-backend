const express = require('express')
const app = express()


require("dotenv").config({
  path: ".env",
})
const PORT = process.env.PORT


app.use(express.urlencoded({extended: false}))

// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   optionsSuccessStatus: 200
// }));

// var whitelist = [process.env.FRONTEND_URL];
// var corsOptions = {
//     origin: function (origin, callback) {
//         if (origin === undefined || whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error("Not allowed by CORS"));
//         }
//     },
// };
// app.use(cors(corsOptions));

app.use("/", require("./src/routers/index"))

app.listen(PORT, ()=>{
  console.log(`Backend App running on port: ${PORT}`)
})


