const Favorite = require("../models/favorite");

class FavoriteController {
  static async saveMovies(req, res) {
    try {
      const { movieId, userId } = req.body;

      // Membuat instance FavoriteModel
      const favoriteModel = new Favorite.FavoriteModel(movieId, userId);

      // Menyimpan data ke database
      const favorite = new Favorite(favoriteModel);
      const saveFavorite = await favorite.save();

      res.status(200).json({
        message: "Success Saved movie",
        saveFavorite,
      });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  static async getAllFavorite(req, res) {
    try {
      const { userId } = req.params;

      // Menemukan semua film favorit berdasarkan userId
      const favorites = await Favorite.find({ userId }).populate("movieId");

      res.status(200).json(favorites);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Terjadi kesalahan saat mengambil film favorit." });
    }
  }

  static async deleteFavorite(req, res) {
    try {
      await Favorite.findByIdAndDelete(req.params.id);
      res.status(200).json("Success Menghapus movie dari favorite");
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = FavoriteController;
