// The /upload/art sub route for the base API route.

/*
  ROUTE WILL REQUIRE AUTHENTICATION
  Request is of content-type application/json:
  {
    "title": "some title" <-- optional
    "description": "some description" <-- optional
  }
*/

const dragondexLib = require('../../../../lib');
const APIRoute = dragondexLib.routes.APIRoute;
const Snowflake = dragondexLib.utils.Snowflake;

const artDetailsValidator = require('../validators/artdetails');
const addArtToDB = require('../utils/artdetails/add-art-to-db');

let snowflakeIDGenerator = new Snowflake();

/*
  The API route for uploading the details about a piece of artwork. This upload comes BEFORE uploading an image of the artwork.
*/

module.exports = class UploadArtDetailsAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'upload/artdetails';
    this.type = 'POST';
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

  middleList() {
    return [
      genSnowflake,
      artDetailsValidator,
      addArtToDB
    ];
  }

  async action(req, res, next) {
    res.json(req.artData);
  }
}

function genSnowflake(req, res, next) {
  let id = snowflakeIDGenerator.gen();
  req.artworkId = id;
  next();
}
