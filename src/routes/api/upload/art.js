const mongoose = require('mongoose');

const dragondexLib = require('../../../../lib');
const APIRoute = dragondexLib.routes.APIRoute;
const ArtModel = dragondexLib.db.models.Art;


// The /user sub route for the base API route.

/*
  ROUTE WILL REQUIRE AUTHENTICATION AND WILL REQUIRE IMAGE

  Example request data:

  {
    "title": "Mario",
    "description": "A statue of a dragon."
  }
*/

module.exports = class UploadArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'upload/art/';
    this.type = 'POST';
  }

  async action(req, res, next) {
    let newArtData = {};
    try {
      newArtData = {
        id: Date.now() + '',
        imageUrl: 'https://i.imgur.com/GTy6a0L.png',
        metadata: {
          title: req.body.title,
          description: req.body.description
        }
      };
    } catch {
      res.status(400)
      res.json({
        error: "Invalid request data."
      })
    }

    ArtModel.create(newArtData).then(() => {
      res.json(newArtData);
    }).catch(() => {
      res.status(400)
      res.json({
        error: "Invalid request data."
      })
    });
  }
}
