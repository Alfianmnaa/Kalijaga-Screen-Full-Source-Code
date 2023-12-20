import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import { Upload } from "./pages/Upload";
import Home from "./pages/Home";
import Movie from "./pages/Movie";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="upload" element={<Upload />} />
          <Route path="login" element={<Login />} />
          <Route path="movie/:movieId" element={<Movie />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}
