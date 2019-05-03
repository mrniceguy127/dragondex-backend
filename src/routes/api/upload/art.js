// The /upload/art sub route for the base API route.

/*
  ROUTE WILL REQUIRE AUTHENTICATION
  Request is of the Content-Type 'multi-part/formdata'
    fields:
      jsonData: A string of json data of the art work being uploaded (ex. title, description, etc.)
    files:
      artwork: An image file to be uploaded as the artwork. Max 4 MB.
*/

const mongoose = require('mongoose');
const dragondexLib = require('../../../../lib');
const multer = require('multer');
const APIRoute = dragondexLib.routes.APIRoute;
const ArtModel = dragondexLib.db.models.Art;
const UserModel = dragondexLib.db.models.User;
const Snowflake = dragondexLib.utils.Snowflake;

let snowflakeIDGenerator = new Snowflake();

// Used for handling file uploads with limitations.
const artworkUpload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024 * 1024,
    fields: 1,
    files: 1
  }
}).single('artwork');

module.exports = class UploadArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'upload/art/';
    this.type = 'POST';
  }

  middleList() {
    return [
      multerValidator,
      validateReqData
    ];
  }

  async action(req, res, next) {
    let jsonData = JSON.parse(req.body.jsonData);

    const artworkFile = req.file;

    let newArtData = { // Request data formatted for database.
      user: jsonData.user,
      id: snowflakeIDGenerator.gen(),
      imageUrl: 'https://i.imgur.com/GTy6a0L.png',
      metadata: {
        title: jsonData.title,
        description: jsonData.description
      }
    };

    ArtModel.create(newArtData).then((artDoc) => {
      let artToAdd = [{ _id: artDoc._id }];
      let query = { id: newArtData.user };
      let updateData = { $push: { posts: { $each: artToAdd } } };
      return UserModel.updateOne(query, updateData); // Add artwork reference to the user requesting's User document.
    })
    .then((userDoc) => {
      res.json(newArtData);
    })
    .catch(() => {
      respondAsInvalidReqData(res);
    });
  }
}

function respondAsInvalidReqData(res) {
  res.status(400)
  res.json({
    error: "Invalid request data."
  });
}

function validateReqData(req, res, next) {
  const validMimeTypes = [ // Valid file types
    'image/png',
    'image/jpg'
  ];

  if (req.body && req.file) { // Check for valid form data
    let valid = true;
    let jsonData;
    let file = req.file;

    try { // Validate json
      jsonData = JSON.parse(req.body.jsonData);
    } catch (err) {
      valid = false;
    }

    if (valid && !validMimeTypes.includes(file.mimetype)) { // Validate file type
      valid = false;
    }

    if (valid && !jsonData.user) {
      valid = false;
    }

    if (valid) {
      next();
    } else {
      respondAsInvalidReqData(res);
    }
  } else {
    respondAsInvalidReqData(res);
  }
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
