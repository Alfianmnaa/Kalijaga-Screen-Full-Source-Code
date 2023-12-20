const express = require("express");
const router = express.Router();
const verifyToken = require("../../verifyToken");
const userController = require("../controllers/user");

// UPDATE
router.put("/:id", verifyToken, userController.updateUser);

// DELETE
router.delete("/:id", verifyToken, userController.deleteUser);

// GET USER
router.get("/:id", userController.getUser);
module.exports = router;
