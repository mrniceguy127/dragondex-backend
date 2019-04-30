const mongoose = require('mongoose');

const dragondexLib = require('../../../lib');
const APIRoute = dragondexLib.routes.APIRoute;
const UserModel = dragondexLib.db.models.User;
const ArtModel = dragondexLib.db.models.Art;


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

module.exports = class ArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'user/:userId';
    this.type = 'GET';
  }

  async action(req, res, next) {
    let userId = req.params.userId;
    let query = { id: userId }
    let userDataRes = {};

    let userDoc = await UserModel.findOne(query)
    .then((doc) => {
      if (!doc) {
        res.status(400);
        res.json({ error: "No user found." });
      } else {
        return doc;
      }
    }).catch(err => {
      res.status(500);
      res.json({
        error: "Internal server error."
      });
      return undefined;
    });

    if (userDoc) { // Check if db query was successful.
      let posts = [];
      let i;

      // Get all posts from references
      for (i = 0; i < userDoc.posts.length; i++) {
        let post = await getPostByReference(userDoc.posts[i], res);
        posts.push(post);
      }

      userDataRes = {
        id: userDoc.id,
        username: userDoc.username,
        displayName: userDoc.displayName,
        posts: posts
      }

      res.json(userDataRes);
    }
  }
}

async function getPostByReference(ref, res) {
  let post = await ArtModel.findById(ref) // Art by object ids (found though art references in user doc).
  .then(art => {
    let postData = { // Format post data
      id: art.id,
      imageUrl: art.imageUrl,
      metadata: {
        title: art.metadata.title,
        description: art.metadata.description
      }
    };

    return postData;
  })
  .catch(() => {
    res.status(500);
    res.json({
      error: "Internal server error."
    });
  });

  return post;
}
