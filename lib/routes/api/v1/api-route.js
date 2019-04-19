// Route class for v1 API routes.

const Route = require('../../route.js');

class APIRoute extends Route {
  constructor(app) {
    super(app);
    this.base = '/api/v1';
  }

  middleList(req, res, next) {
    // TODO - Add rate limiting.
    return [];
  }

  // What to do when a request is made.
  async action(req, res) {
    res.end();
  }
};

module.exports = APIRoute;
