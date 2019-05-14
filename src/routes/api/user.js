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
      "imageUrl":"https://i.imgur.com/GTy6a0L.png",
      "metadata":{
        "title":"Example Title #2",
        "description": "Example description #1."
      }
    },
    {
      "id":"1556660930532",
      "imageUrl":"https://i.imgur.com/GTy6a0L.png",
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
const getPostById = require('./utils/general/get-post-by-id');
const APIRoute = dragondexLib.routes.APIRoute;
const UserModel = dragondexLib.db.models.User;
const ArtModel = dragondexLib.db.models.Art;



module.exports = class ArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'user/:userId';
    this.type = 'GET';
  }

  async action(req, res, next) {
    let userId = req.params.userId;
    let query = { id: userId };

    let userDoc = await UserModel.findOne(query)
    .then((doc) => {
      if (doc) {
        return doc;
      } else {
        res.status(400);
        res.json({ error: "No user found." });
      }
    }).catch(err => {
      console.log(err.stack);
      res.status(500);
      res.json({
        error: "Internal server error."
      });
    });

    if (userDoc) { // Check if db query was successful.
      let posts = [];
      let i;

      // Get all posts from references
      for (i = 0; i < userDoc.posts.length; i++) {
        let post = await getPostById(userDoc.posts[i], res);
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
}
