const mongoose = require("mongoose");
const Schema = mongoose.Schema;

class FavoriteModel {
  constructor(movieId, userId) {
    this.movieId = movieId;
    this.userId = userId;
  }

  // Getter for movieId
  getMovieId() {
    return this.movieId;
  }

  // Setter for movieId
  setMovieId(movieId) {
    this.movieId = movieId;
  }

  // Getter for userId
  getUserId() {
    return this.userId;
  }

  // Setter for userId
  setUserId(userId) {
    this.userId = userId;
  }
}

const FavoriteSchema = new Schema(
  {
    movieId: {
      type: Schema.Types.ObjectId,
      ref: "Movies", // Menghubungkan dengan model Movies
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Favorite", FavoriteSchema);
module.exports.FavoriteModel = FavoriteModel;
