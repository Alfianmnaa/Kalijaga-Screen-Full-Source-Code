import React, { useContext, useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlay, FaBookmark } from "react-icons/fa";
import { axiosInstance } from "../config";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export const Watchnow = () => {
  const [savedMovies, setSavedMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axiosInstance.get("/watch/movies");
      setMovies(res.data);
      setLoading(true);
    };
    fetchMovies();

    // Load daftar film yang sudah disimpan oleh pengguna
    if (user && user._id) {
      loadSavedMovies();
    }
  }, [user]); // Perubahan ini memastikan loadSavedMovies dipanggil ketika user berubah

  const loadSavedMovies = async () => {
    try {
      const response = await axiosInstance.get(`/favorite/movie/${user._id}`);
      const savedMovieIds = response.data.map((item) => item.movieId._id);
      setSavedMovies(savedMovieIds);
    } catch (error) {
      console.error("Error fetching saved movies:", error);
    }
  };

  const handleSave = async (movieId) => {
    try {
      if (user && user._id) {
        await axiosInstance.post("/favorite/movie", { movieId, userId: user._id });
        // Setelah menyimpan, perbarui daftar film yang sudah disimpan
        loadSavedMovies();
        navigate("/favorite");
      } else {
        console.error("User ID tidak tersedia.");
      }
    } catch (error) {
      console.error("Gagal menyimpan film ke dalam daftar favorit:", error);
    }
  };

  return (
    <main className="text-white bg-bgnetflix">
      {user ? (
        <>
          {" "}
          <div className="search flex p-7">
            <AiOutlineSearch className="sm:w-8 sm:h-8 w-6 h-6" />
            <input onChange={(e) => setQuery(e.target.value.toLowerCase())} type="text" className="outline-none bg-transparent border-b-[1px] ml-5 sm:w-96 w-full py-1 text-smtprimary " id="search" name="search" autoComplete="off" />
          </div>
          <div className=" pb-12">
            <p id="watch" className="font-bold text-subtitle px-8 py-5">
              Watch Now!
            </p>
            <div className="img-container flex flex-wrap gap-4 justify-center items-center px-7">
              {loading ? (
                (() => {
                  const filteredMovies = movies.filter((movie) => movie.moviesName.toLowerCase().includes(query));

                  if (filteredMovies.length === 0) {
                    return <p>Film tidak ditemukan.</p>;
                  }

                  return filteredMovies.map((movie) => {
                    const isSaved = savedMovies.includes(movie._id);

                    return (
                      <div key={movie._id} className="relative 2xl:w-80 sm:w-72 w-80 h-48 cursor-pointer">
                        <img src={movie.posterMovie} alt="thumbnail" className="object-cover w-full h-full rounded-xl" />
                        <div className="absolute inset-0 flex items-end justify-center rounded-xl overflow-hidden group">
                          {/* Overlay that slides up */}
                          <div className="absolute inset-x-0 bottom-0 bg-bgnetflix bg-opacity-60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                            <div className="flex justify-center items-center space-x-4 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                              <Link to={`/watch/${movie._id}`}>
                                <button className="flex items-center space-x-2 hover:text-greenuin transition-colors duration-200">
                                  <FaPlay className="text-xl" />
                                  <span>Watch</span>
                                </button>
                              </Link>
                              {!isSaved && (
                                <button onClick={() => handleSave(movie._id)} className="flex items-center space-x-2 hover:text-greenuin transition-colors duration-200">
                                  <FaBookmark className="text-xl" />
                                  <span>Save</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  });
                })()
              ) : (
                <p>Waiting for the movie...</p>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="lg:w-[60%] w-[90%] p-7">
          <h1 className="sm:text-3xl text-2xl my-4 font-bold">Welcome To Kalijaga Screen</h1>
          <p className="text-secondary lg:text-tprimary text-smtprimary ">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint fuga sed provident ullam, ipsum debitis doloremque rem quae quo! Quo adipisci optio deleniti odio tenetur, tempore officia vitae culpa incidunt, quam explicabo
            sapiente repellendus accusamus? Tempore ad sunt mollitia, fuga, odit animi, quo omnis repellat laborum quas accusamus possimus ab.
          </p>
          <div className="flex items-center my-3 gap-4" id="login-btn">
            <p className="sm:text-lg text-md font-bold">
              Mau Nonton?? <span className="underline">Eitss Login Dulu</span>{" "}
            </p>
            <Link to="/login">
              <button className="bg-greenuin px-12 py-2 rounded-lg">Login</button>
            </Link>
          </div>
        </div>
      )}
    </main>

    // <main className="text-white bg-bgnetflix">

    // </main>
  );
};
