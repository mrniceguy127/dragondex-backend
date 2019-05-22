// The /login/googleauth subroute for the base auth route.

const dragondexLib = require('../../../../lib');
const AuthRoute = dragondexLib.routes.AuthRoute;

const passport = require('passport');

/*
  The actual authentication route for authenticating with passport for the Google strategy.
*/

module.exports = class AuthGoogleRoute extends AuthRoute {
  constructor(app) {
    super(app);
    this.path = '/login/googleauth';
    this.type = 'GET';
  }

  middleList() {
    if (process.env.USE_AUTH === 'true') {
      return [
        passport.authenticate('google', { scope: ['profile', 'email'] })
      ];
    } else {
      return [];
    }
  }

  async action(req, res, next) {
    // Do nothing after middleware is executed.
  }
}
