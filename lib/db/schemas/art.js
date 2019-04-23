const mongoose = require('mongoose');

const ArtSchema = new mongoose.Schema({
  artworkId: String,
  metadata: {
    title: String,
    description: String
  }
}, {
  collection: 'Art'
});

module.exports = ArtSchema;
