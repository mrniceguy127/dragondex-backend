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

const artDetailsValidator = require('./validators/artdetails');
const addArtToDB = require('./utils/artdetails/add-art-to-db');

let snowflakeIDGenerator = new Snowflake();

module.exports = class UploadArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'upload/artdetails';
    this.type = 'POST';
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
