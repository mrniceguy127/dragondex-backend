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
  //   const artId = 'this-is-an-art-id';
  //   let artManager = new ArtManager({ id: artId });
  //
  //   await artManager.downloadData();

    let resJSON = {} ;//artManager.getFormattedData();

    res.json(resJSON);
  }
}
