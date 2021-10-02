const mongoose = require('mongoose')

/* Data needed
  - First Name
  - Middle Name
  - Last Name
  - Gender
  - D.O.B / Age
  - Marital Status
  - Phone
  - Email
  - N.O.K
  - Blood type
  - Health Conditions
*/

const PatientSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    min: 3,
  },
  lastName: {
    type: String,
    required: true,
    min: 3,
  },
  slug: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    max: 255,
  },
  healthBio: {
    type: String,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('Patients', PatientSchema)
