const mongoose = require('mongoose');
const ArtSchema = require('../schemas/art.js');

const Art = mongoose.model('Art', ArtSchema);

module.exports = Art;
