const express = require("express");
const router = express.Router();
const FavoriteController = require("../controllers/favorite");

// Save Movie
router.post("/movie", FavoriteController.saveMovies);

// Get all favorit films base on userId
router.get("/movie/:userId", FavoriteController.getAllFavorite);

// Delete
router.delete("/movie/:id", FavoriteController.deleteFavorite);

module.exports = router;
