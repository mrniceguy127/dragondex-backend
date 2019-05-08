// The /upload/art sub route for the base API route.

/*
  ROUTE WILL REQUIRE AUTHENTICATION
  Request is of the Content-Type 'multi-part/formdata'
    files:
      artwork: An image file to be uploaded as the artwork. Max 4 MB.
*/

const mongoose = require('mongoose');
const dragondexLib = require('../../../../lib');
const multer = require('multer');
const multerS3 = require('multer-s3');
const APIRoute = dragondexLib.routes.APIRoute;
const ArtModel = dragondexLib.db.models.Art;

let s3 = require('./utils/aws-s3')

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
  artworkUploadOpts.fileFilter = validateFileData;
}

artworkUpload = multer(artworkUploadOpts).single('artwork');

module.exports = class UploadArtFileAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'upload/artfile/:id';
    this.type = 'POST';
  }

  middleList() {
    return [
      validateId,
      artworkUpload
    ];
  }

  async action(req, res, next) {
    let id = req.params.id;
    if (process.env.USE_AWS === 'true') {
      ArtModel.updateOne({ id: id }, { imageUrl: `https://s3.amazonaws.com/dragondex/artwork/${id}` })
      .then(() => {
        res.json({
          success: true
        });
      });
    } else {
      res.json({
        success: true
      });
    }
  }
}

function respondAsInvalidReqData(res) {
  res.status(400)
  res.json({
    error: "Invalid request data."
  });
}

function validateFileData(req, file, cb) {
  const validMimeTypes = [ // Valid file types
    'image/png',
    'image/jpg'
  ];

  if (file) { // Check for valid form data
    let valid = true;

    if (valid && !validMimeTypes.includes(file.mimetype)) { // Validate file type
      valid = false;
    }

    if (valid) {
      cb(null, true);
    } else {
      cb(new Error('Bad request data.'));
    }
  } else {
    cb(new Error('Bad request data.'));
  }
}

function validateId(req, res, next) {
  let id = req.params.id;
  ArtModel.findOne({ id: id })
  .then((artDoc) => {
    if (artDoc) {
      next();
    } else {
      respondAsInvalidReqData(res);
    }
  }).catch((err) => {
    console.log("Art doc failed search.\n" + err.stack);
    res.status(500);
    res.json({
      error: "Internal server error."
    });
  });
}

function multerValidator(req, res, next) {
  artworkUpload(req, res, (err) => {
    if (err) {
      respondAsInvalidReqData(res);
    } else {
      next();
    }
  });
}
