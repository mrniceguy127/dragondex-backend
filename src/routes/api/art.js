const dragondexLib = require('../../../lib');
const APIRoute = dragondexLib.routes.APIRoute;
const ArtManager = dragondexLib.db.documentManagers.ArtManager;

// The /art sub route for the base API route.

module.exports = class ArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'art';
    this.type = 'GET';
  }

  async action(req, res, next) {
    let resJSON = {};

    res.json(resJSON);
  }
}
