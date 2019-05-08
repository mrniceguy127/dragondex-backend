// The /art sub route for the base API route.

const mongoose = require('mongoose');

const dragondexLib = require('../../../lib');
const APIRoute = dragondexLib.routes.APIRoute;
const UserModel = dragondexLib.db.models.User;
const ArtModel = dragondexLib.db.models.Art;


module.exports = class ArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'art/:artId';
    this.type = 'GET';
  }

  async action(req, res, next) {
    let artId = req.params.artId;
    let query = { id: artId };

    let artDoc = await ArtModel.findOne(query)
    .then((doc) => {
      if (doc) {
        return doc;
      } else {
        res.status(400);
        res.json({ error: "No user found." });
        return undefined;
      }
    }).catch(err => {
      res.status(500);
      res.json({
        error: "Internal server error."
      });
      return undefined;
    })

    if (artDoc) {
      let artPostedBy = await getUserById(artDoc.postedBy, res);

      let artDocRes = {
        id: artDoc.id.toString(),
        imageUrl: artDoc.imageUrl,
        metadata: {
          title: artDoc.metadata.title,
          description: artDoc.metadata.description
        },
        postedBy: artPostedBy
      }

      res.json(artDocRes);
    }
  }
}

async function getUserById(id, res) {
  let query = { id: id };
  let postedBy = await UserModel.findOne(query) // User by id (in postedBy)
  .then(user => {
    let userData = { // Format data
      id: user.id.toString(),
      username: user.username,
      displayName: user.displayName
    };
    return userData;
  })
  .catch(() => {
    res.status(500);
    res.json({
      error: "Internal server error."
    });
  });

  return postedBy;
}
