import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import { axiosInstance } from "../config";
import Swal from "sweetalert2";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  // Fetching data
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axiosInstance.get("/watch/movies");
      setMovies(res.data);
    };
    fetchMovies();
  }, []);

  // Delete
  const handleDelete = async (id) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "Movie ini akan dihapus!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (result.isConfirmed) {
        await axiosInstance.delete(`/watch/movie/${id}`);
        Swal.fire("Deleted!", "Your Movie has been deleted.", "success").then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire("Cancelled", "You have cancelled deleting the task.", "info");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-bgnetflix  py-24 px-6">
      <div className="search flex p-7 text-primary">
        <AiOutlineSearch className="sm:w-8 sm:h-8 w-6 h-6" />
        <input type="text" className="outline-none bg-transparent border-b-[1px] ml-5 sm:w-96 w-44 py-1 text-smtprimary " id="search" name="search" autoComplete="off" onChange={(e) => setQuery(e.target.value.toLowerCase())} />
      </div>
      <div className=" flex flex-wrap justify-center gap-4">
        {movies
          .filter((movie) => movie.moviesName.toLowerCase().includes(query))
          .map((movie) => {
            return (
              <div className="card-movie w-[270px]" key={movie._id}>
                <BsFillTrashFill onClick={() => handleDelete(movie._id)} className="text-red-600 w-5 h-5 cursor-pointer hover:brightness-50 duration-150" />
                <img src={movie.posterMovie} alt="thumb" className="w-full h-[150px] object-cover rounded-md my-4" />
                <Link to={`/movie/${movie._id}`}>
                  <p className="text-smsubtitle text-primary font-semibold">{movie.moviesName}</p>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
