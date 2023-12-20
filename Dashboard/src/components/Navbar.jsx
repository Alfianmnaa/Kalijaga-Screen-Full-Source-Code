import React, { useState, useRef, useEffect } from "react";
import { IoMdArrowDropdown, IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiTwotoneSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

export const Navbar = () => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const notifRef = useRef();
  const profileRef = useRef();

  // Close dropdowns when clicking outside of them
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [notifRef, profileRef]);

  // Handle scroll
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 1) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarClasses = `w-full absolute top-0 z-50 ${scrolling ? "bg-black shadow-sm shadow-slate-600 sticky top-0" : ""}`;
  const location = useLocation();

  // Fungsi untuk memeriksa apakah link sesuai dengan path URL saat ini
  const isLinkActive = (path) => (path === "/" ? location.pathname === path : location.pathname.startsWith(path));

  return (
    <header className={navbarClasses}>
      <nav className=" text-primary h-full flex justify-between items-center">
        <div className="logo ml-5 flex items-center py-3  ">
          <a href="">
            <img src={logo} className="w-40 sm:w-64" alt="logo" />
          </a>
          <div className="nav-kiri hidden text-tprimary md:ml-16 sm:ml-4 sm:flex items-center">
            <p className="ml-4 bg-greenuin px-6 py-2 rounded-lg ">KalijagaDashboard</p>
            <Link to="/" className={`ml-4 ${isLinkActive("/") ? "text-greenuin" : ""}`}>
              Home
            </Link>
            <Link to="/upload" className={`ml-4 ${isLinkActive("/upload") ? "text-greenuin" : ""}`}>
              Upload
            </Link>
          </div>
        </div>
        <div className="nav-kanan mr-5 flex items-center">
          <div className="profile relative mr-5">
            <div className="w-10 h-10 text-[14px] sm:text-tprimary sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-greenuin text-black cursor-pointer" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
              <b>AM</b>
            </div>
            <IoMdArrowDropdown onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="w-5 h-5 bottom-0 -right-5 sm:w-6 sm:h-6 absolute sm:bottom-0 sm:-right-6 cursor-pointer" />
            {showProfileDropdown && (
              <div ref={profileRef} className="absolute border-[1px] border-gray-300 bg-bgnetflix right-0 mt-2 w-48 shadow-lg rounded-md overflow-hidden">
                <ul>
                  {/* Profile settings options */}
                  <li className="flex items-center p-3 duration-100 hover:brightness-90 cursor-pointer">
                    <AiTwotoneSetting className="mr-2" />
                    <span>Profile Settings</span>
                  </li>
                  <li className="flex items-center p-3 duration-100 hover:brightness-90 cursor-pointer">
                    <FiLogOut className="mr-2" />
                    <span>Sign out</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="hamburger">
            <GiHamburgerMenu className="w-5 h-5 ml-5 sm:hidden" onClick={() => setShowMobileNav(!showMobileNav)} />
          </div>
        </div>
      </nav>
      {/* Mobile Nav */}
      <div className={`fixed top-0 inset-x-0 h-auto bg-bgnetflix z-50 transform ${showMobileNav ? "translate-y-0" : "-translate-y-[109%]"} transition-transform duration-300 ease-in-out sm:hidden`}>
        {/* Close icon or back button could be placed here */}
        <AiOutlineClose className="text-white mt-5 w-5 h-5 absolute right-3" onClick={() => setShowMobileNav(false)} />
        <div className="overflow-hidden nav-kiri mt-20 text-subtitle flex flex-col items-center p-4">
          <a href="#" className="text-primary mb-4 duration-100 hover:brightness-90">
            Kalijaga Dashboard
          </a>
          <a href="/" className="text-primary mb-4 duration-100 hover:brightness-90">
            Home
          </a>
          <a href="upload" className="text-primary mb-4 duration-100 hover:brightness-90">
            Upload
          </a>
          <a href="#" className="pt-8 pb-7">
            <img src={logo} className="w-52 sm:w-64 " alt="logo" />
          </a>
        </div>
      </div>
    </header>
  );
};
