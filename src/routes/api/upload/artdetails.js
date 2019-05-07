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
const APIRoute = dragondexLib.routes.APIRoute;
const ArtModel = dragondexLib.db.models.Art;
const UserModel = dragondexLib.db.models.User;
const Snowflake = dragondexLib.utils.Snowflake;

let snowflakeIDGenerator = new Snowflake();

module.exports = class UploadArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'upload/artdetails';
    this.type = 'POST';
  }

  middleList() {
    return [
      genSnowflake,
      validateJSONData,
      addArtToDB
    ];
  }

  async action(req, res, next) {
    res.json(req.artData);
  }
}

function respondAsInvalidReqData(res) {
  res.status(400)
  res.json({
    error: "Invalid request data."
  });
}

function validateJSONData(req, res, next) {
  let jsonData = req.body;
  let valid = true;

  if (valid && !jsonData.user) {
    valid = false;
  }

  if (valid) {
    next();
  } else {
    respondAsInvalidReqData(res);
  }
}

function genSnowflake(req, res, next) {
  let id = snowflakeIDGenerator.gen();
  req.artworkId = id;
  next();
}

function addArtToDB(req, res, next) {

  let jsonData = req.body;

  let newArtData = { // Request data formatted for database.
    user: jsonData.user,
    id: req.artworkId,
    imageUrl: '',
    metadata: {
      title: jsonData.title,
      description: jsonData.description
    }
  };


  ArtModel.create(newArtData)
  .then((artDoc) => {
    let artToAdd = [{ _id: artDoc._id }];
    let query = { id: newArtData.user };
    let updateData = { $push: { posts: { $each: artToAdd } } };
    req.artData = newArtData;
    return UserModel.updateOne(query, updateData); // Add artwork reference to the user requesting's User document.
  })
  .then((userDoc) => {
    next();
  })
  .catch(() => {
    console.log("Art doc faile creation.");
    respondAsInvalidReqData(res);
  });
}