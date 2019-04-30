const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArtSchema = new Schema({
  id: String,
  imageUrl: String,
  metadata: {
    title: String,
    description: String
  }
}, {
  collection: 'Art'
});

module.exports = ArtSchema;
