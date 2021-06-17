let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    username: { type: String, require: true, unique: true },
    image: { type: String },
  },
  { timestamps: true }
);

let User = mongoose.model('User', userSchema);

module.exports = User;
