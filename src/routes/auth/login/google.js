// The /login/google sub route for the base auth route.

const dragondexLib = require('../../../../lib');
const AuthRoute = dragondexLib.routes.AuthRoute;

const { useStrat } = require('../utils/google-strat');

useStrat();

/*
  The authorize with Google route to allow users to login.
*/

module.exports = class AuthGoogleRoute extends AuthRoute {
  constructor(app) {
    super(app);
    this.path = '/login/google';
    this.type = 'GET';
  }

  async action(req, res, next) {
    res.redirect('/auth/login/googleauth');
  }
}
