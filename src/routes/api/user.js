// The /user sub route for the base API route.

/*
EXAMPLE RESPONSE DATA:
{
  "id":"testUser1",
  "username":"some_user_name",
  "displayName":"Some Name",
  "posts":[
    {
      "id":"1556660107287",
      "imageUrl":"https://some.url.toanimage",
      "metadata":{
        "title":"Example Title #2",
        "description": "Example description #1."
      }
    },
    {
      "id":"1556660930532",
      "imageUrl":"https://some.url.toanimage",
      "metadata":{
        "title":"Example Title #2",
        "description": "Example description #2."
      }
    }
  ]
}
*/

const mongoose = require('mongoose');

const dragondexLib = require('../../../lib');
const getArtById = require('./utils/general/get-art-by-id');
const validateUserId = require('./validators/user-id');
const APIRoute = dragondexLib.routes.APIRoute;
const UserModel = dragondexLib.db.models.User;
const ArtModel = dragondexLib.db.models.Art;

/*
  The GET User API route that gets a user object given a valid user ID.
*/

module.exports = class ArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'user/:userId';
    this.type = 'GET';
  }

  middleList() {
    return [
      (req, res, next) => {
        validateUserId(req, res, next, req.params.userId);
      }
    ];
  }

  async action(req, res, next) {
    let userDoc = req.userDoc;
    let posts = [];
    let i;

    // Get all posts from references
    for (i = 0; i < userDoc.posts.length; i++) {
      let post = await getArtById(userDoc.posts[i], res);
      posts.push(post);
    }

    let userDataRes = {
      id: userDoc.id.toString(),
      username: userDoc.username,
      displayName: userDoc.displayName,
      posts: posts,
      collectedArt: userDoc.collectedArt
    }

    res.json(userDataRes);
  }
}
