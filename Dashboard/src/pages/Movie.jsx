import React, { useEffect, useState } from "react";
import { axiosInstance } from "../config";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";

const Movie = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [updateMode, setUpdateMode] = useState(false);
  const [movies, setMovies] = useState([]);
  const [moviesName, setMoviesName] = useState("");
  const [duration, setDuration] = useState("");
  const [urlMovie, setUrlMovie] = useState("");
  const [genre, setGenre] = useState("");
  const [desc, setDesc] = useState("");

  // get one spesifik movie
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axiosInstance.get("/watch/movie/" + path);
      setMovies(res.data);
      setMoviesName(res.data.moviesName);
      setDuration(res.data.duration);
      setUrlMovie(res.data.urlMovie);
      setGenre(res.data.genre);
      setDesc(res.data.desc);
    };
    fetchMovies();
  }, [path]);

  // update
  const handleUpdate = async () => {
    try {
      await axiosInstance.put(`/watch/movie/${movies._id}`, { moviesName, duration, urlMovie, genre, desc });
      setUpdateMode(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-bgnetflix  py-24">
      {updateMode ? (
        ""
      ) : (
        <div className="w-[20%] flex justify-center mx-auto ">
          <button onClick={() => setUpdateMode(true)} className="text-white bg-greenuin py-2 px-8 rounded-md hover:brightness-90 duration-150">
            Update
          </button>
        </div>
      )}
      <form action="" className="md:w-[60%] w-[80%] mt-7 mx-auto">
        <div className="flex text-primary mb-7">
          <input defaultValue={moviesName} onChange={(e) => setMoviesName(e.target.value)} type="text" className="w-full ml-2 text-subtitle sm:text-smtitle font-semibold bg-transparent outline-none border-b-[2px] border-secondary" />
        </div>
        <div className="durasi">
          <label htmlFor="duration" className="text-smsubtitle text-white ">
            Duration in minute :
          </label>
          <input defaultValue={duration} onChange={(e) => setDuration(e.target.value)} type="text" id="duration" className="w-full  bg-[#343239] py-2 px-2 rounded-md my-2 block text-primary outline-gray-950 " />
        </div>
        <div className="url">
          <label htmlFor="url-film" className="text-smsubtitle text-white ">
            URL Film :
          </label>
          <input defaultValue={urlMovie} onChange={(e) => setUrlMovie(e.target.value)} type="text" id="url-film" className="w-full  bg-[#343239] py-2 px-2 rounded-md my-2 block text-primary outline-gray-950 " />
        </div>
        <div className="genre">
          <label htmlFor="Genre" className="text-smsubtitle text-white ">
            Genre :
          </label>
          <input defaultValue={genre} onChange={(e) => setGenre(e.target.value)} type="text" id="Genre" className="w-full  bg-[#343239] py-2 px-2 rounded-md my-2 block text-primary outline-gray-950 " />
        </div>
        <div className="writeformgroup">
          <label htmlFor="desc" className="text-smsubtitle text-white ">
            Description :
          </label>
          <textarea defaultValue={desc} onChange={(e) => setDesc(e.target.value)} name="" id="desc" cols="30" rows="10" className="w-full  bg-[#343239] py-2 px-2 rounded-md my-2 block text-primary outline-gray-950 "></textarea>
        </div>
        {updateMode ? (
          <button type="submit" onClick={handleUpdate} className="w-full mt-2  bg-greenuin py-2 rounded-md text-smsubtitle text-primary  hover:brightness-90 duration-150">
            Update
          </button>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default Movie;
