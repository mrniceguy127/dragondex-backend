const dragondexLib = require('../../../../../lib');
const ArtModel = dragondexLib.db.models.Art;
const internalServerError = require('../responses/internal-server-error');

/*
  Get art from the database given a valid art ID.
*/

async function getArtById(id, res) {
  let query = { id: id };
  let post = await ArtModel.findOne(query) // Art by object ids (found though art references in user doc).
  .then(art => {
    if (art) {
      let postData = { // Format post data
        id: art.id.toString(),
        imageUrl: art.imageUrl,
        metadata: {
          title: art.metadata.title,
          description: art.metadata.description
        }
      };
      return postData;
    }
  })
  .catch((err) => {
    console.log(err.stack);
    internalServerError(res);
  });

  return post;
}

module.exports = getArtById;
