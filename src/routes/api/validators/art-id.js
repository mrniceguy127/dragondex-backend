const invalidReq = require('../utils/responses/invalid-req');
const internalServerError = require('../utils/responses/internal-server-error');
const dragondexLib = require('../../../../lib');
const ArtModel = dragondexLib.db.models.Art;

module.exports = (req, res, next) => {
  let id = req.body.artId;

  ArtModel.findOne({ id: id })
  .then((artDoc) => {
    if (artDoc) {
      next();
    } else {
      invalidReq(res);
    }
  }).catch((err) => {
    console.log("Art doc failed search.\n" + err.stack);
    internalServerError(res);
  });
}
