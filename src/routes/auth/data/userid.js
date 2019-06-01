// The /login/callback sub route for the base auth route.

const dragondexLib = require('../../../../lib');
const AuthRoute = dragondexLib.routes.AuthRoute;
const UserModel = dragondexLib.db.models.User;
const checkAuth = require('../../api/utils/auth/check-auth');
const internalServerError = require('../../api/utils/responses/internal-server-error');

const passport = require('passport');

/*
  The callback URL for the user to be sent to after being authorized.
*/

module.exports = class AuthSessionUserIdRoute extends AuthRoute {
  constructor(app) {
    super(app);
    this.path = '/session/userid';
    this.type = 'GET';
  }

  async action(req, res, next) {

    let query = {};
    let id;

    if (req.user){
      query = {
        connectedAccounts: {
          google: req.user.id
        }
      };

      id = await UserModel.findOne(query).then((userDoc) => {
        if (userDoc) {
          return userDoc.id;
        } else {
          return "";
        }
      })
      .catch((err) => {
        internalServerError(res);
      });
    }


    res.json({
      id: id
    });
  }
}
