const express = require("express")
const cors = require("cors")

require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded())

const db = require('./app/db')
db
  .sequelize
  .sync(/*{ force: true }*/)
  .then(() => console.log('done'))

require("./app/routes/group.routes")(app)
require("./app/routes/session.routes")(app)
require("./app/routes/student.routes")(app)
require("./app/routes/attendance.routes")(app)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
});