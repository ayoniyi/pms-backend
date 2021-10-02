const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

// import Routes
const patientRoutes = require('./routes/patient')

//Middleware
app.use(cors())
app.use(bodyParser.json())
app.use('/patients', patientRoutes)
app.use('/uploads', express.static('uploads'))

// Routes
app.get('/', (req, res) => {
  res.send('You are on the PMS API')
})

// Connect DB
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  },
  () => console.log('Connected DB'),
)

//Listen
// app.listen(4000)

const port = 5000
app.listen(port, console.log(`Listening on ${port}`))
