const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaTypes = mongoose.Schema.Types;

const ArtSchema = new Schema({
  id: {
    type: SchemaTypes.Long,
    unique: true
  },
  imageUrl: String,
  metadata: {
    title: {
      type: String,
      default: "New Artwork"
    },
    description: {
      type: String,
      default: "Original content."
    }
  },
  postedBy: {
    type: SchemaTypes.Long
  }
}, {
  collection: 'Art'
});

module.exports = ArtSchema;
