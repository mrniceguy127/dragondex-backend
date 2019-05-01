const mongoose = require('mongoose');

const dragondexLib = require('../../../lib');
const APIRoute = dragondexLib.routes.APIRoute;
const ArtModel = dragondexLib.db.models.Art;

// The /art sub route for the base API route.

module.exports = class ArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'art/:artId';
    this.type = 'GET';
  }

  async action(req, res, next) {
    let artId = req.params.artId;

    ArtModel.find({
      id: artId
    }).exec(function(err, result) {
      if (err) {
        console.log("Error!");
      } else {
        let resJSON = {};
        
        let art = result[0];
        if (art && art.id) {
          resJSON = {
            id: art.id,
            imageUrl: art.imageUrl,
            metadata: {
              title: art.metadata.title,
              description: art.metadata.description
            }
          };
        }
        res.json(resJSON);
      }
    });
  }
}
