const multer = require('multer');
const multerS3 = require('multer-s3');
const artFileValidator = require('../../validators/artfile');

let s3 = require('../aws-s3')

/*
  Multer middleware that is setup before being exported from the file.
*/

// Used for handling file uploads with limitations.
let artworkUpload;

let artworkUploadOpts = {
  limits: {
    fileSize: 4 * 1024 * 1024 * 1024,
    fields: 1,
    files: 1
  }
};

if ((process.env.USE_AWS === "true")) {
  artworkUploadOpts.storage = multerS3({
    s3: s3,
    bucket: 'dragondex/artwork',
    acl: 'public-read',
    key: (req, file, cb) => {
      let id = req.params.id;
      cb(null, id);
    }
  });
  artworkUploadOpts.fileFilter = artFileValidator;
}

artworkUpload = multer(artworkUploadOpts).single('artwork');

module.exports = artworkUpload;
