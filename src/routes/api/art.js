// The /art sub route for the base API route.

const dragondexLib = require('../../../lib');
const getUserById = require('./utils/general/get-user-by-id');
const validateArtId = require('./validators/art-id');
const APIRoute = dragondexLib.routes.APIRoute;

/*
  The GET Art API route that gets a piece of artwork with the specified valid ID.
*/


module.exports = class ArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'art/:artId';
    this.type = 'GET';
  }

  middleList() {
    return [
      (req, res, next) => {
        validateArtId(req, res, next, req.params.artId);
      }
    ];
  }

  async action(req, res, next) {
    let artDoc = req.artDoc;

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
