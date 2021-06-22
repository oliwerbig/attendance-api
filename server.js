const express = require("express")
const cors = require("cors")

require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 8080;

app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded())

const db = require('./app/db')
db
  .sequelize
  .sync(/*{ force: true }*/)
  .then(() => console.log('done'))

require("./app/routes/groupRoutes")(app)
require("./app/routes/sessionRoutes")(app)
require("./app/routes/studentRoutes")(app)
require("./app/routes/attendanceRoutes")(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});