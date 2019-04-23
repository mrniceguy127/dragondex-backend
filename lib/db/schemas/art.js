const mongoose = require('mongoose');

const ArtSchema = new mongoose.Schema({
  metadata: {
    title: String,
    description: String
  }
}, {
  collection: 'Art'
});

module.exports = ArtSchema;
