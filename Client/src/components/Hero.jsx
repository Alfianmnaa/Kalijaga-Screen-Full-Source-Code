import React, { useContext } from "react";
import movies from "../utils/db";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { UserContext } from "../context/UserContext";

export const Hero = () => {
  const angkaAcak = Math.floor(Math.random() * 3);
  const random = movies[angkaAcak];
  const { user } = useContext(UserContext);
  const hrefValue = user ? "#watch" : "#login-btn";
  return (
    <div className="h-[450px] sm:h-[520px] w-full ">
      <video className="w-full h-[450px] sm:h-[520px] brightness-[60%] object-cover " autoPlay muted loop poster={`${random.thumbnailUrl}`} src={`${random.videoUrl}`}></video>
      <div className="desc-hero absolute lg:top-[20%] sm:top-[12%] top-[15%] left-[5%] max-w-xs sm:max-w-xl ">
        <p className="text-white text-smtitle sm:text-title font-bold">{random.title}</p>
        <p className="text-secondary text-xstprimary tprimary mt-2 sm:text-tprimary">{random.description}</p>
        <a href={hrefValue}>
          <button className="flex justify-center items-center text-white text-smtprimary sm:text-tprimary mt-3 py-1 px-3 rounded-md bg-secondary opacity-70 hover:opacity-90 duration-150">
            <AiOutlineExclamationCircle className="w-8 h8 pr-1" /> <span>Watch Now !</span>
          </button>
        </a>
      </div>
    </div>
  );
};
