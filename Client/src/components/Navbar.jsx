import React, { useState, useRef, useEffect, useContext } from "react";
import { IoMdArrowDropdown, IoMdNotificationsOutline, IoMdNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose, AiTwotoneSetting } from "react-icons/ai";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { axiosInstance } from "../config";
import logo from "../assets/logo.png";

export const Navbar = () => {
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    try {
      await axiosInstance.get("/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useContext(UserContext);
  const twoLettersSlice = user ? user.username.slice(0, 2).toUpperCase() : "";

  return (
    <header className={navbarClasses}>
      <nav className=" text-primary h-full flex justify-between items-center">
        <div className="logo ml-5 flex items-center py-3  ">
          <a href="/">
            <img src={logo} className="w-40 sm:w-64" alt="logo" />
          </a>
          <div className="nav-kiri hidden sm:text-tprimary text-smtprimary sm:ml-16 sm:flex items-center">
            <Link to="/" className={`ml-4 ${isLinkActive("/") ? "text-greenuin" : ""}`}>
              Home
            </Link>
            {user && (
              <Link to="favorite" className={`ml-4 ${isLinkActive("/favorite") ? "text-greenuin" : ""}`}>
                Mylist
              </Link>
            )}
            <Link to="about" className={`ml-4 ${isLinkActive("/about") ? "text-greenuin" : ""}`}>
              About
            </Link>
            <Link to="faq" className={`ml-4 ${isLinkActive("/faq") ? "text-greenuin" : ""}`}>
              FAQ
            </Link>
          </div>
        </div>
        {user && (
          <div className="nav-kanan mr-5 flex items-center">
            <div className="relative mr-3">
              <IoMdNotificationsOutline className="w-6 h-6 sm:w-7 sm:h-7 ml-6 cursor-pointer" onClick={() => setShowNotifDropdown(!showNotifDropdown)} />
              {showNotifDropdown && (
                <div ref={notifRef} className="absolute  bg-bgnetflix border-[1px] border-gray-300 sm:right-0 -right-20 mt-2 w-72 sm:w-80 shadow-lg rounded-md overflow-hidden">
                  <p className="flex items-center mt-2 text-white">
                    <IoMdNotifications className="mr-2 ml-2 w-6 h-6" /> Notification
                  </p>
                  <ul>
                    {/* Mock notifications */}
                    <li className="p-3 border-b text-primary">Your movie is now available!</li>
                    <li className="p-3 border-b text-primary">New series has been added.</li>
                    <li className="p-3 text-primary">You have a new friend request.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="profile relative mr-5">
              <div className="w-10 h-10 text-[14px] sm:text-tprimary sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-greenuin text-black cursor-pointer" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                <b>{twoLettersSlice.toUpperCase()}</b>
              </div>
              <IoMdArrowDropdown onClick={() => setShowProfileDropdown(!showProfileDropdown)} className="w-5 h-5 bottom-0 -right-5 sm:w-6 sm:h-6 absolute sm:bottom-0 sm:-right-6 cursor-pointer" />
              {showProfileDropdown && (
                <div ref={profileRef} className="absolute border-[1px] border-gray-300 bg-bgnetflix right-0 mt-2 w-48 shadow-lg rounded-md overflow-hidden">
                  <ul>
                    {/* Profile settings options */}
                    <Link to={`/settings/${user._id}`}>
                      <li className="flex items-center p-3 duration-100 hover:brightness-90 cursor-pointer">
                        <AiTwotoneSetting className="mr-2" />
                        <span>Profile Settings</span>
                      </li>
                    </Link>
                    <li onClick={handleLogout} className="flex items-center p-3 duration-100 hover:brightness-90 cursor-pointer">
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
        )}
      </nav>
      {/* Mobile Nav */}

      <div className={`fixed top-0 inset-x-0 h-auto bg-bgnetflix z-50 transform ${showMobileNav ? "translate-y-0" : "-translate-y-[109%]"} transition-transform duration-300 ease-in-out sm:hidden`}>
        {/* Close icon or back button could be placed here */}
        <AiOutlineClose className="text-white mt-5 w-5 h-5 absolute right-3" onClick={() => setShowMobileNav(false)} />
        <div className="overflow-hidden nav-kiri mt-20 sm:text-tprimary text-smtprimary flex flex-col items-center justify-center p-4">
          <Link to="/" className="text-primary mb-4 duration-100 hover:brightness-90">
            Home
          </Link>
          <Link to="about" className="text-primary mb-4 duration-100 hover:brightness-90">
            About
          </Link>
          <Link to="faq" className="text-primary mb-4 duration-100 hover:brightness-90">
            FAQ
          </Link>
          <Link to="favorite" className="text-primary mb-4 duration-100 hover:brightness-90">
            Mylist
          </Link>
          {user && (
            <Link onClick={handleLogout} className="ml-4 text-primary px-4 py-2 rounded-lg text-base bg-greenuin">
              Logout
            </Link>
          )}
          <a href="#" className="pt-8 pb-7">
            <img src={logo} className="w-52 sm:w-64 " alt="logo" />
          </a>
        </div>
      </div>
    </header>
  );
};
