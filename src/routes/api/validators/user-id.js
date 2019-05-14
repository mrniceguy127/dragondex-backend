const invalidReq = require('../utils/responses/invalid-req');
const internalServerError = require('../utils/responses/internal-server-error');
const dragondexLib = require('../../../../lib');
const UserModel = dragondexLib.db.models.User;

/*
  Middleware for express that validates that a user with the specified ID exists.
*/

module.exports = (req, res, next, userId = "") => {
  let query = { id: userId || req.body.id };

  UserModel.findOne(query)
  .then((doc) => {
    if (doc) {
      req.userDoc = doc;
      next();
    } else {
      invalidReq(res);
    }
  }).catch(err => {
    console.log(err.stack);
    internalServerError(res);
  });
}
