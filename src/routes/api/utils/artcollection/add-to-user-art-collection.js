const dragondexLib = require('../../../../../lib');
const UserModel = dragondexLib.db.models.User;
const internalServerError = require('../responses/internal-server-error');
const getUserById = require('../general/get-user-by-id');

/*
  Adds ONE piece of art with the specified art ID to the user with the given user ID's collection.
*/

async function addToUserArtCollection(userId, artId, res) {
  let userQuery = { id: userId };
  let artUpdateData = { $addToSet: { collectedArt: artId } };
  let newUserArtCollection = await UserModel.updateOne(userQuery, artUpdateData)
  .then(async () => {
    let userData = await getUserById(userQuery.id, res);
    return {
      collectedArt: userData.collectedArt
    };
  })
  .catch((err) => {
    internalServerError(res);
  });

  return newUserArtCollection;
}

module.exports = addToUserArtCollection;
