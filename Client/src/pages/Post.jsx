import React, { useEffect, useState } from "react";
import { Video } from "../components/Video";
import { axiosInstance } from "../config";
import { Link } from "react-router-dom";

export const Post = () => {
  const [movies, setMovies] = useState([]);
  const [recommend, setRecommend] = useState([]);
  const path = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axiosInstance.get("/watch/movie/" + path);
      setMovies(res.data);
    };
    fetchMovies();
  }, [path]);

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axiosInstance.get("/watch/movies");
      setRecommend(res.data.filter((item) => item._id !== path));
    };
    fetchMovies();
  }, []);
  return (
    <main className="lg:flex ">
      <Video src={movies.urlMovie} />
      <div className="text-white  w-full bg-bgnetflix py-20 pl-2 pr-5">
        <p className="text-subtitle  text-wh mb-4 font-semibold flex justify-center">Tonton Juga!</p>
        {recommend.map((item, index) => {
          return (
            <Link
              key={item._id}
              onClick={() => {
                window.location.href = `/watch/${item._id}`;
              }}
            >
              <div className="rekomendasi md:flex md:gap-9 md:flex-wrap lg:ml-0 ml-5">
                <div className="border-t-[1px] border-gray-600">
                  <div className="judul mt-2 flex items-center">
                    <p className="border-[1px] py-1 px-3 rounded-md border-gray-200 mr-2">{index + 1}</p>
                    <p>{item.moviesName}</p>
                  </div>
                  <div className="poster my-4 flex flex-wrap items-center">
                    <img src={item.posterMovie} alt="poster" className="w-36 mr-2 rounded-md " />
                    <p>Genre : {item.genre}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
};
