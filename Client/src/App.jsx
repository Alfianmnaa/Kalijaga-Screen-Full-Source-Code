import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import { Post } from "./pages/Post";
import { Home } from "./pages/Home";
import Mylist from "./pages/Mylist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import { UserContextProvider } from "./context/UserContext";
import FAQ from "./pages/FAQ";
import About from "./pages/About";

export default function App() {
  return (
    <>
      <UserContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="watch/:id" element={<Post />} />
            <Route path="favorite" element={<Mylist />} />
            <Route path="about" element={<About />} />
            <Route path="faq" element={<FAQ />} />
            <Route path="settings/:id" element={<Settings />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </UserContextProvider>
    </>
  );
}
