import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FaPlay, FaBookmark } from "react-icons/fa";
import movies from "../utils/db";
import { Hero } from "../components/Hero";

const Series = () => {
  return (
    <>
      <Hero />
      <main className="text-white bg-bgnetflix">
        <div className="search flex p-7">
          <AiOutlineSearch className="sm:w-8 sm:h-8 w-6 h-6" />
          <input type="text" className="outline-none bg-transparent border-b-[1px] ml-5 sm:w-96 w-44 py-1 text-smtprimary " id="search" name="search" autoComplete="off" />
        </div>
        <div className=" pb-12">
          <p className="font-bold text-subtitle px-8 py-5">Series!</p>
          <div className="img-container flex flex-wrap gap-4 justify-center items-center px-7 ">
            {movies.map((item, index) => {
              return (
                <div key={index} className="relative w-72 h-48 cursor-pointer">
                  <img src={`${item.thumbnailUrl}`} alt="thumbnail" className="object-cover w-full h-full rounded-xl" />
                  <div className="absolute inset-0 flex items-end justify-center rounded-xl overflow-hidden group">
                    {/* Overlay that slides up */}
                    <div className="absolute inset-x-0 bottom-0 bg-bgnetflix bg-opacity-60 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
                      <div className="flex justify-center items-center space-x-4 w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                        <button className="flex items-center space-x-2 hover:text-greenuin transition-colors duration-200">
                          <FaPlay className="text-xl" />
                          <span>Watch</span>
                        </button>
                        <button className="flex items-center space-x-2 hover:text-greenuin transition-colors duration-200">
                          <FaBookmark className="text-xl" />
                          <span>Save</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Series;
