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
    title: String,
    description: String
  }
}, {
  collection: 'Art'
});

module.exports = ArtSchema;
