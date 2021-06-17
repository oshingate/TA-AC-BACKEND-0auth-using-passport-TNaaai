let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String, require: true },
  photo: { type: String },
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true, unique: true },
});

let User = mongoose.model('User', userSchema);

module.exports = User;
