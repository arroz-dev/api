const path = require('path');
const crypto = require('crypto');
const multer = require('multer');

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '..', '..', 'tmp', 'uploads'));
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (error, hash) => {
      if (error) {
        cb(error);
      }

      file.key = `${hash.toString('hex')}-${file.originalname}`;
      cb(null, file.key);
    });
  },
});

module.exports = {
  dest: path.resolve(__dirname, '..', '..', 'tmp', 'uploads'),
  storage: localStorage,
};
