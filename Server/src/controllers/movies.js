const Movie = require("../models/movies");
const Favorite = require("../models/favorite");

class MoviesController {
  async createMovie(req, res) {
    try {
      const newMovie = new Movie(req.body);
      const saveMovie = await newMovie.save();
      res.status(200).json({
        message: "Create movie success",
        saveMovie,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getAllMovies(req, res) {
    try {
      const getDataMovies = await Movie.find();
      res.status(200).json(getDataMovies);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async getOneMovie(req, res) {
    try {
      const getDataMovie = await Movie.findById(req.params.id);
      res.status(200).json(getDataMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteMovie(req, res) {
    try {
      const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

      // Check if the movie was deleted successfully
      if (!deletedMovie) {
        return res.status(404).json({ error: "Movie not found" });
      }

      // Delete only the corresponding entry in the Favorite collection
      await Favorite.findOneAndDelete({ movieId: req.params.id });

      res.status(200).json("Berhasil Menghapus Movie");
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  }

  async updateMovie(req, res) {
    try {
      const updateDataMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json({
        message: "Movie berhasil diupdate",
        updateDataMovie,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new MoviesController();
