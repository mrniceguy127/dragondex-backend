const dragondexLib = require('../../../../../lib');
const ArtModel = dragondexLib.db.models.Art;
const UserModel = dragondexLib.db.models.User;
const internalServerError = require('../responses/internal-server-error');

/*
  Express middleware for adding PRE-VALIDATED (VALIDATED BEFORE THIS FUNCTION IS CALLED) art details to the database.
*/

module.exports = (req, res, next) => {
  let jsonData = req.body;

  let newArtData = { // Request data formatted for database.
    postedBy: jsonData.postedBy,
    id: req.artworkId,
    imageUrl: '',
    metadata: {
      title: jsonData.title,
      description: jsonData.description
    }
  };

  let userId = process.env.USE_AUTH === "true" ? req.user.id : newArtData.postedBy;

  ArtModel.create(newArtData)
  .then((artDoc) => {
    let artToAdd = [artDoc.id];
    let query = { id: userId };
    let updateData = { $push: { posts: { $each: artToAdd } } };
    req.artData = newArtData;
    return UserModel.updateOne(query, updateData); // Add artwork reference to the user requesting's User document.
  })
  .then((userDoc) => {
    next();
  })
  .catch(() => {
    console.log("Art doc faile creation.");
    internalServerError(res);
  });
}
