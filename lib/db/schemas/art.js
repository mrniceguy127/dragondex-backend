const mongoose = require('mongoose');

const ArtSchema = new mongoose.Schema({
  artworkId: String,
  imageUrl: String,
  metadata: {
    title: String,
    description: String
  }
}, {
  collection: 'Art'
});

module.exports = ArtSchema;
