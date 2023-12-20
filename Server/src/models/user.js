// user.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class User {
  static schema = new Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );

  static model = mongoose.model("User", User.schema);
}

module.exports = User;
