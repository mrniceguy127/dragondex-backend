// Route class for v1 API routes.

const Route = require('../../route.js');

class APIRoute extends Route {
  constructor(app, path, type) {
    super(app, '/api/v1', path, type);
  }

  // Returns middleware for the route.
  middle() {
    return;
  }

  // What to do when a request is made.
  async action(req, res) {
    res.end();
  }
};

module.exports = APIRoute;
