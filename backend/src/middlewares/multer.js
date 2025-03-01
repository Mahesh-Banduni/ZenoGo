const multer = require('multer');
const path =require('path');

// Initialize multer with the storage engine
const upload = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size 5MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only images are allowed!'));
    }
    cb(null, true);
  },
}).array('images', 10);

const uploadPic = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size 5MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only images are allowed!'));
    }
    cb(null, true);
  },
}).single('profilePic', 1);

const uploadReviewImage = multer({
  limits: {
    fileSize: 5 * 1024 * 1024, // Max file size 5MB
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
      return cb(new Error('Only images are allowed!'));
    }
    cb(null, true);
  },
}).array('reviewImages', 5);

module.exports = {upload,uploadPic, uploadReviewImage};