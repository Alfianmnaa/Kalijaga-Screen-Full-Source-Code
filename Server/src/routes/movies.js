const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");

// POST
router.post("/movie", moviesController.createMovie);
// GET ALL
router.get("/movies", moviesController.getAllMovies);
// GET ONE
router.get("/movie/:id", moviesController.getOneMovie);
// UPDATE
router.put("/movie/:id", moviesController.updateMovie);
// DELETE
router.delete("/movie/:id", moviesController.deleteMovie);

module.exports = router;
