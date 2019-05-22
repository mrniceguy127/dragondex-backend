// The /login/callback sub route for the base auth route.

const dragondexLib = require('../../../../lib');
const AuthRoute = dragondexLib.routes.AuthRoute;
const UserModel = dragondexLib.db.models.User;

const passport = require('passport');

/*
  The callback URL for the user to be sent to after being authorized.
*/

module.exports = class AuthGoogleRoute extends AuthRoute {
  constructor(app) {
    super(app);
    this.path = '/login/callback';
    this.type = 'GET';
  }

  middleList() {
    if (process.env.USE_AUTH === 'true') {
      return [
        passport.authenticate('google', { failureRedirect: '/login' })
      ];
    } else {
      return [];
    }
  }

  async action(req, res, next) {
    res.redirect('/');
  }
}
