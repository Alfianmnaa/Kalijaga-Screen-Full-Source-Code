const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class Movie {
  constructor(movieData) {
    this.moviesName = movieData.moviesName;
    this.duration = movieData.duration;
    this.posterMovie = movieData.posterMovie;
    this.urlMovie = movieData.urlMovie;
    this.genre = movieData.genre;
    this.desc = movieData.desc;
  }
}

const MovieSchema = new Schema(
  {
    moviesName: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    posterMovie: {
      type: String,
      required: true,
    },
    urlMovie: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Movies", MovieSchema);
