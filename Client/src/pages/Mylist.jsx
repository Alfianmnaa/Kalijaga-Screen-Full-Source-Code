import React, { useEffect, useContext, useState } from "react";
import { FaPlay, FaBookmark } from "react-icons/fa";
import { axiosInstance } from "../config";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

const Mylist = () => {
  const { user } = useContext(UserContext);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      try {
        setLoading(true);
        if (user && user._id) {
          const response = await axiosInstance.get(`/favorite/movie/${user._id}`);
          setFavoriteMovies(response.data);
        }
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavoriteMovies();
  }, [user]);

  // if (loading) {
  //   return <p className="text-primary">Loading...</p>;
  // }
  const removeFavorite = async (id) => {
    try {
      await axiosInstance.delete(`/favorite/movie/${id}`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="text-white bg-bgnetflix">
      <div className="py-14">
        <p className="font-bold text-subtitle flex items-center px-8 py-5">
          <FaBookmark className="mr-2" /> Mylist!
        </p>
        <div className="img-container flex flex-wrap gap-4 justify-center items-center px-7">
          {loading ? (
            <p className="p-36">Waiting load movies..</p>
          ) : favoriteMovies.length != 0 ? (
            favoriteMovies.map((item, index) => {
              return (
                <div key={index} className="relative 2xl:w-80 sm:w-72 w-80 h-48 cursor-pointer">
                  <img src={`${item.movieId.posterMovie}`} alt="thumbnail" className="object-cover w-full h-full rounded-xl" />
                  <div className="absolute inset-0 flex items-end justify-center rounded-xl overflow-hidden group">
                    <div className="absolute inset-x-0 bottom-0 bg-bgnetflix bg-opacity-60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                      <div className="flex justify-center items-center space-x-4 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <Link to={`/watch/${item.movieId._id}`}>
                          <button className="flex items-center space-x-2 hover:text-greenuin transition-colors duration-200">
                            <FaPlay className="text-xl" />
                            <span>Watch</span>
                          </button>
                        </Link>
                        <button onClick={() => removeFavorite(item._id)} className="flex items-center space-x-2 hover:text-greenuin transition-colors duration-200">
                          <FaBookmark className="text-xl" />
                          <span>Unsave</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="p-36">Tidak ada film favorite..</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default Mylist;
