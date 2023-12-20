const User = require("../models/user");
const bcrypt = require("bcrypt");

class UserController {
  static async updateUser(req, res) {
    try {
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hashSync(req.body.password, salt);
      }
      const updatedUser = await User.model.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteUser(req, res) {
    try {
      await User.model.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted!");
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async getUser(req, res) {
    try {
      const user = await User.model.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  }
}

module.exports = UserController;
