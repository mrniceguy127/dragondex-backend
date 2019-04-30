const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  id: String,
  username: String,
  displayName: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Art' }]
}, {
  collection: 'User'
});

module.exports = UserSchema;
