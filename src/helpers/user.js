const validator = require('validator');
const multer = require('multer');

// VALIDATE USER INPUT
validateData = (user) => {
  //const image = !validator.isEmpty(user.image);
  const name = !validator.isEmpty(user.name) && validator.isLength(user.name, { min: 3, max: 30 });
  const email = !validator.isEmpty(user.email) && validator.isEmail(user.email);
  const phone = !validator.isEmpty(user.phone) && validator.isNumeric(user.phone);
  if (/*!image ||*/ !name || !email || !phone) throw new Error('Invalid data');
};

// UPLOAD USER IMAGE
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './src/media/images');
  },
  filename: (req, file, cb) => {
    cb(null, 'img' + Date.now() + Math.round(Math.random() * 1E9) + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
  }
});
const upload = multer({ storage });

module.exports = {
  validateData,
  upload
};