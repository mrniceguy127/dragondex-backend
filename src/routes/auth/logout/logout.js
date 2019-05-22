// The /login/googleauth subroute for the base auth route.

const dragondexLib = require('../../../../lib');
const AuthRoute = dragondexLib.routes.AuthRoute;

/*
  The actual authentication route for authenticating with passport for the Google strategy.
*/

module.exports = class LogoutRoute extends AuthRoute {
  constructor(app) {
    super(app);
    this.path = '/logout';
    this.type = 'GET';
  }

  async action(req, res, next) {
    req.logout();
    res.redirect('/');
  }
}
