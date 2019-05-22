// Route class for login related routes.

const Route = require('../route.js');

class AuthRoute extends Route {
  constructor(app) {
    super(app);
    this.base = '/auth';
  }

  middleList(req, res, next) {
    return [];
  }

  // What to do when a request is made.
  async action(req, res) {
    res.end();
  }
};

module.exports = AuthRoute;
