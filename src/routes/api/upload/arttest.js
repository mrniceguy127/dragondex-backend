// The /upload/arttest sub route for the base API route.

/*
ROUTE WILL REQUIRE AUTHENTICATION AND WILL REQUIRE IMAGE

Example request data:

{
  "user": "someId",
  "title": "Mario",
  "description": "A statue of a dragon."
}
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
    this.path = 'upload/arttest/';
    this.type = 'POST';
  }

  middleList() {
    return [
      validateReqData
    ];
  }

  async action(req, res, next) {
    let newArtData = {
      user: req.body.user,
      id: snowflakeIDGenerator.gen(),
      imageUrl: 'https://i.imgur.com/GTy6a0L.png',
      metadata: {
        title: req.body.title || "",
        description: req.body.description || ""
      }
    };

    ArtModel.create(newArtData).then((artDoc) => {
      let artToAdd = [{ _id: artDoc._id }];
      return UserModel.updateOne({ id: newArtData.user }, { $push: { posts: { $each: artToAdd } } });
    })
    .then((userDoc) => {
      res.json(newArtData);
    })
    .catch(() => {
      res.status(400)
      res.json({
        error: "Invalid request data."
      });
    });
  }
}

function validateReqData(req, res, next) {
  if (req.body.user && req.body.title) {
    next();
  } else {
    res.status(400)
    res.json({
      error: "Invalid request data."
    });
  }
}
