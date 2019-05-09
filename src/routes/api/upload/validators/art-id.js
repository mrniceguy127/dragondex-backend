const respondAsInvalidReqData = require('../utils/responses/invalid-req');

module.exports = (req, res, next) => {
  let id = req.params.id;
  ArtModel.findOne({ id: id })
  .then((artDoc) => {
    if (artDoc) {
      next();
    } else {
      respondAsInvalidReqData(res);
    }
  }).catch((err) => {
    console.log("Art doc failed search.\n" + err.stack);
    res.status(500);
    res.json({
      error: "Internal server error."
    });
  });
}
