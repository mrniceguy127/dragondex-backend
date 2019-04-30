const mongoose = require('mongoose');

const dragondexLib = require('../../../lib');
const APIRoute = dragondexLib.routes.APIRoute;
// const UserModel = dragondexLib.db.models.User;


// The /user sub route for the base API route.

module.exports = class ArtAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'user/:userId';
    this.type = 'GET';
  }

  async action(req, res, next) {
    let userId = req.params.userId;
    let userData = {
      id: userId,
      artwork: [
        'testId1',
        'testId2',
        'testId3',
        'testId4'
      ],
      name: "Jim Son",
      username: "js203"
    }

    res.json(userData);
  }
}
