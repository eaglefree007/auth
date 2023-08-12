const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
// const jwt = require('jsonwebtoken')
const {dbConnect} = require('./db/dbConnection')
require('dotenv').config()
dbConnect()
const PORT = 5000

const app = express()
app.use(express.json())
app.use(cors())


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/', require('./router/UserRouter'))


app.listen(PORT, () => {
  console.log(`app listen on ${PORT}`)
})