const express = require('express')
const router = express.Router()
//const Post = require('../models/Post')
const Patient = require('../models/Patient')
const upload = require('../middleware/upload')

// Get All
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find()
    res.json(patients)
  } catch (err) {
    res.json({ message: err })
  }
})

//  Create
router.post('/', upload.single('avatar'), async (req, res) => {
  const firstNameCapital =
    req.body.firstName.charAt(0).toUpperCase() + req.body.firstName.slice(1)
  const lastNameCapital =
    req.body.lastName.charAt(0).toUpperCase() + req.body.lastName.slice(1)

  //const imgPath = process.env.BASE_URL + req.file.path;

  const patient = new Patient({
    firstName: firstNameCapital,
    lastName: lastNameCapital,
    slug: firstNameCapital + lastNameCapital,
    email: req.body.email,
    healthBio: req.body.healthBio,
  })
  if (req.file) {
    patient.avatar = req.file.path
  }
  try {
    const newPatient = await patient.save()
    res.json(newPatient)
  } catch (err) {
    res.json({ messages: err, description: err.data })
  }
})

//Get patient by Id
router.get('/id/:patientId', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.patientId)
    res.json(patient)
  } catch (err) {
    res.json({ message: err })
  }
})

// Get patient by name
router.get('/:patientName', async (req, res) => {
  try {
    const nameCapital =
      req.params.patientName.charAt(0).toUpperCase() +
      req.params.patientName.slice(1)
    const nameFormat = new RegExp(nameCapital)
    const patient = await Patient.find({
      slug: { $regex: nameFormat },
      //lastName: nameFormat,
    })
    res.json(patient)
  } catch (err) {
    res.json({ message: err })
    console.log(nameFormat, ' 2nd ')
  }
})

//Update
router.patch('/id/:patientId', async (req, res) => {
  //console.log(req.params.postId);
  try {
    const updatedPatient = await Patient.updateMany(
      { _id: req.params.patientId },
      {
        $set: {
          email: req.body.email,
          healthBio: req.body.healthBio,
          //avatar: req.file.path,
        },
      },
    )
    res.json(updatedPatient)
  } catch (err) {
    res.json({
      message: err,
    })
  }
})

// Update, but for photos
router.patch(
  '/id/:patientId/photo',
  upload.single('avatar'),
  async (req, res) => {
    //console.log(req.params.postId);
    try {
      const updatedPhoto = await Patient.updateOne(
        { _id: req.params.patientId },
        {
          $set: {
            avatar: req.file.path,
          },
        },
      )
      res.json(updatedPhoto)
    } catch (err) {
      res.json({
        message: err,
      })
    }
  },
)

// Delete
router.delete('/id/:patientId', async (req, res) => {
  //console.log(req.params.postId);
  try {
    const removedPatient = await Patient.remove({ _id: req.params.patientId })
    res.json(removedPatient)
  } catch (err) {
    res.json({
      message: err,
    })
  }
})

module.exports = router
