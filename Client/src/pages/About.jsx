import React from "react";
import bg from "../assets/about-img.png";

const About = () => {
  return (
    <div>
      <img src={bg} alt="about-img" className="w-[100%] sm:h-auto h-[600px]  object-cover object-top" />
    </div>
  );
};

export default About;
