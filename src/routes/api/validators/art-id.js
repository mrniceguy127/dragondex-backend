const invalidReq = require('../utils/responses/invalid-req');
const internalServerError = require('../utils/responses/internal-server-error');
const dragondexLib = require('../../../../lib');
const ArtModel = dragondexLib.db.models.Art;

/*
  Express middleware that validates whether artwork with the specified ID exists.
*/

module.exports = (req, res, next, artId = "") => {
  let id = artId || req.body.id;

  ArtModel.findOne({ id: id })
  .then((artDoc) => {
    if (artDoc) {
      req.artDoc = artDoc;
      next();
    } else {
      invalidReq(res);
    }
  }).catch((err) => {
    console.log("Art doc failed search.\n" + err.stack);
    internalServerError(res);
  });
}
