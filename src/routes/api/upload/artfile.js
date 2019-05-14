// The /upload/art sub route for the base API route.

/*
  ROUTE WILL REQUIRE AUTHENTICATION
  Request is of the Content-Type 'multi-part/formdata'
    files:
      artwork: An image file to be uploaded as the artwork. Max 4 MB.
*/

const dragondexLib = require('../../../../lib');
const APIRoute = dragondexLib.routes.APIRoute;
const ArtModel = dragondexLib.db.models.Art;

const validateArtId = require('../validators/art-id');
const artworkUpload = require('../utils/artfile/multer-upload');

module.exports = class UploadArtFileAPIRoute extends APIRoute {
  constructor(app) {
    super(app);
    this.path = 'upload/artfile/:id';
    this.type = 'POST';
  }

  middleList() {
    return [
      validateArtId,
      artworkUpload
    ];
  }

  async action(req, res, next) {
    let id = req.params.id;
    if (process.env.USE_AWS === 'true') {
      ArtModel.updateOne({ id: id }, { imageUrl: `https://s3.amazonaws.com/dragondex/artwork/${id}` })
      .then(() => {
        res.json({
          success: true
        });
      });
    } else {
      res.json({
        success: true
      });
    }
  }
}
