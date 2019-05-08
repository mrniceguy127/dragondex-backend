const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SchemaTypes = mongoose.Schema.Types;

const UserSchema = new Schema({
  id: {
    type: SchemaTypes.Long,
    unique: true
  },
  username: String,
  displayName: String,
  posts: [{ type: SchemaTypes.Long }]
}, {
  collection: 'User'
});

module.exports = UserSchema;
