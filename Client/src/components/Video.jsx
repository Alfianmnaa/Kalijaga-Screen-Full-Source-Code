import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../config";

export const Video = ({ src }) => {
  const [movies, setMovies] = useState([]);
  const path = location.pathname.split("/")[2];
  useEffect(() => {
    const fetchMovies = async () => {
      const res = await axiosInstance.get("/watch/movie/" + path);
      setMovies(res.data);
    };
    fetchMovies();
  }, [path]);
  return (
    <div className="relative w-full py-20 lg:px-10 px-4 bg-bgnetflix">
      <div className="lg:w-[760px] lg:h-auto sm:w-[608px] sm:h-auto m-auto ">
        <div className="video-wrapper lg:w-[760px] lg:h-auto sm:w-[608px] sm:h-auto sm:border-[15px] border-[8px] border-greenuin ">
          <video
            src={src} // Make sure src is provided
            className="w-full h-[25vh]  lg:w-[760px] lg:h-[60vh] sm:w-[608px] sm:h-auto"
            controls
          />
        </div>
        <div className="detail mt-4">
          <div className="post-title flex items-center my-2">
            <img src={movies.posterMovie} alt="poster" className="w-36 rounded-md " />
            <p className="text-primary lg:text-2xl md:text-xl sm:text-lg ml-2 font-bold">{movies.moviesName}</p>
          </div>
          <p className="text-primary my-2">Durasi : {movies.duration} menit</p>
          <p className="text-primary">Genre : {movies.genre}</p>
          <p className="text-secondary md:text-smtprimary text-[13px] mt-2">{movies.desc}</p>
        </div>
      </div>
    </div>
  );
};
// import React, { useRef, useState } from "react";
// import { FaPlay } from "react-icons/fa";

// export const Video = ({ src }) => {
//   // Make sure src is passed as a prop or define it inside the component
//   const videoRef = useRef(null);
//   const [playing, setPlaying] = useState(false);

//   const togglePlay = () => {
//     if (videoRef.current) {
//       if (playing) {
//         videoRef.current.pause();
//       } else {
//         videoRef.current.play();
//       }
//       setPlaying(!playing);
//     }
//   };

//   return (
//     <div className="relative w-3/4">
//       <div className="video-wrapper h-full w-full relative overflow-hidden">
//         <video ref={videoRef} src={src} className="w-full h-auto" onClick={togglePlay} controls />
//         {!playing && (
//           <button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" onClick={togglePlay}>
//             <FaPlay className="text-white text-6xl" />
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };
