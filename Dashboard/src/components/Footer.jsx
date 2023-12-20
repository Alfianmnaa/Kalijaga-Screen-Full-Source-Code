import React from "react";
import { AiFillLinkedin, AiFillGithub, AiFillInstagram } from "react-icons/ai";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <>
      <footer className="footer bg-[#020C0C] pt-9 px-6 sm:pb-36 pb-24 sm:flex justify-around items-center text-white">
        <img src={logo} alt="logo" className="w-44 sm:w-64 mb-5 cursor-pointer" />
        <div className="social-media flex sm:-mt-5">
          <a href="https://www.linkedin.com/in/alfian-maulana-76656b282/" target="_blank">
            <AiFillLinkedin className="w-6 h-6 mr-2 mt-2 hover:brightness-90 duration-150 cursor-pointer" />
          </a>
          <a href="https://github.com/Alfianmnaa" target="_blank">
            <AiFillGithub className="w-6 h-6 mr-2 mt-2 hover:brightness-90 duration-150 cursor-pointer" />
          </a>
          <a href="https://www.instagram.com/alfianmnaa/" target="_blank">
            <AiFillInstagram className="w-6 h-6 mr-2 mt-2 hover:brightness-90 duration-150 cursor-pointer" />
          </a>
        </div>
      </footer>
      <p className="text-center bg-[#020C0C] text-secondary py-5">Copyright 2023. KalijagaScreen</p>
    </>
  );
};

export default Footer;
