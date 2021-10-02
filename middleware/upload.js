const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: async (req, file, cb) => {
    let ext = path.extname(file.originalname)
    cb(null, Date.now() + ext)
  },
})

const upload = multer({
  storage: storage,
  fileFilter: async (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpg' ||
      file.mimetype == 'image/jpeg'
    ) {
      cb(null, true)
    } else {
      console.log('only jpg & png file supported!')
      cb(null, false)
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
})

module.exports = upload
