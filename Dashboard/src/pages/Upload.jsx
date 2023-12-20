import React, { useState } from "react";
import { axiosInstance } from "../config";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import upload from "../utils/upload";

export const Upload = () => {
  const [moviesName, setMoviesName] = useState("");
  const [duration, setDuration] = useState("");
  const [posterMovie, setPosterMovie] = useState("");
  const [urlMovie, setUrlMovie] = useState("");
  const [genre, setGenre] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  // handle submit --> mengirim data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = await upload(file);
    const newMovies = {
      moviesName,
      duration,
      posterMovie: url,
      urlMovie,
      genre,
      desc,
    };
    try {
      await axiosInstance.post("/watch/movie", newMovies);
      Swal.fire(moviesName, "Berhasil Ditambahkan!", "success").then(() => {
        window.location.replace("/");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-full bg-bgnetflix h-full md:py-24 py-12 md:px-10 px-5">
      {file && <img src={URL.createObjectURL(file)} alt="pic" className="object-cover md:w-[80%] max-h-[450px] mx-auto rounded-xl" />}
      <form onSubmit={handleSubmit} className="md:w-[80%] w-full mt-7  mx-auto">
        <div className="flex text-primary mb-7">
          <label htmlFor="fileInput">
            <AiOutlinePlusCircle className="sm:w-12 sm:h-12 w-9 h-9 cursor-pointer" />
          </label>
          <input type="file" id="fileInput" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
          <input onChange={(e) => setMoviesName(e.target.value)} type="text" className="w-full ml-2 text-subtitle sm:text-smtitle font-semibold bg-transparent outline-none border-b-[2px] border-secondary" />
        </div>
        <div className="durasi">
          <label htmlFor="duration" className="text-smsubtitle text-white ">
            Duration in minute :
          </label>
          <input onChange={(e) => setDuration(e.target.value)} type="text" id="duration" className="w-full sm:w-[80%] bg-[#343239] py-2 px-2 rounded-md my-2 block text-primary outline-gray-950 " />
        </div>
        <div className="url">
          <label htmlFor="url-film" className="text-smsubtitle text-white ">
            URL Film :
          </label>
          <input onChange={(e) => setUrlMovie(e.target.value)} type="text" id="url-film" className="w-full sm:w-[80%] bg-[#343239] py-2 px-2 rounded-md my-2 block text-primary outline-gray-950 " />
        </div>
        <div className="genre">
          <label htmlFor="Genre" className="text-smsubtitle text-white ">
            Genre :
          </label>
          <input onChange={(e) => setGenre(e.target.value)} type="text" id="Genre" className="w-full sm:w-[80%] bg-[#343239] py-2 px-2 rounded-md my-2 block text-primary outline-gray-950 " />
        </div>
        <div className="writeformgroup">
          <label htmlFor="desc" className="text-smsubtitle text-white ">
            Description :
          </label>
          <textarea onChange={(e) => setDesc(e.target.value)} name="" id="desc" cols="30" rows="10" className="w-full sm:w-[80%] bg-[#343239] py-2 px-2 rounded-md my-2 block text-primary outline-gray-950 "></textarea>
        </div>
        <button type="submit" className="w-full mt-2 sm:w-[80%] bg-greenuin py-2 rounded-md text-smsubtitle text-primary  hover:brightness-90 duration-150">
          Submit
        </button>
      </form>
    </div>
  );
};
