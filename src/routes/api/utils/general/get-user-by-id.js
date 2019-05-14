const dragondexLib = require('../../../../../lib');
const UserModel = dragondexLib.db.models.User;
const internalServerError = require('../responses/internal-server-error');

/*
  Gets a user from the database given a valid user ID.
*/

async function getUserById(id, res) {
  let query = { id: id };
  let postedBy = await UserModel.findOne(query) // User by id (in postedBy)
  .then(user => {
    if (user) {
      let userData = { // Format data
        id: user.id.toString(),
        username: user.username,
        displayName: user.displayName,
        collectedArt: user.collectedArt
      };
      return userData;
    }
  })
  .catch(() => {
    internalServerError(res);
  });

  return postedBy;
}

module.exports = getUserById;
