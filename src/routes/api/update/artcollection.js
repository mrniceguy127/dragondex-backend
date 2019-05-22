// The /art sub route for the base API route.

/*
  ROUTE WILL REQUIRE AUTHENTICATION
  Request is of content-type application/json:
  {
    "artId": "some id of art to add to collection",
    "userId": "some user id of a user adding to their collection." <-- currently being used for testing purposes.
  }
*/

const dragondexLib = require('../../../../lib');
const addToUserArtCollection = require('../utils/artcollection/add-to-user-art-collection');
const artIdValidator = require('../validators/art-id');
const userIdValidator = require('../validators/user-id');
const checkAuth = require('../utils/auth/check-auth');
const APIRoute = dragondexLib.routes.APIRoute;

/*
  This is the API route for use when a user wants to 'collect' and art piece.
  This adds the art piece with the given valid art id to the user with the given valid id.
*/

module.exports = class ArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'update/artcollection';
    this.type = 'POST';
  }

  middleList() {
    return [
      checkAuth,
      (req, res, next) => {
        artIdValidator(req, res, next, req.body.artId);
      },
      (req, res, next) => {
        userIdValidator(req, res, next, req.body.userId);
      }
    ];
  }

  async action(req, res, next) {
    let artId = req.body.id;
    let userId = process.env.USE_AUTH === "true" ? req.user.id : req.body.userId;

    let resData = await addToUserArtCollection(userId, artId, res);

    res.json(resData);
  }
}
