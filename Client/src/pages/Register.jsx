import React, { useState } from "react";
import { axiosInstance } from "../config";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const newUser = {
      username,
      email,
      password,
    };
    try {
      const res = await axiosInstance.post("/auth/register", newUser);
      setUsername(res.data.username);
      setEmail(res.data.email);
      setPassword(res.data.password);
      setError(false);
      navigate("/login");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };

  return (
    <div className="login flex items-center justify-center w-full h-[100vh] object-cover bg-[url('../src/assets/hero.jpg')]">
      <form onSubmit={handleRegister} className="cont-register rounded-3xl shadow-sm shadow-neutral-600 p-10 w-[95%] sm:w-[420px] sm:h-[500px] bg-black  text-primary">
        <img src={logo} alt="logo" className="w-32 sm:w-48 mb-6 mx-auto" />
        <input onChange={(e) => setUsername(e.target.value)} type="text" placeholder="username" className="block w-[95%] mx-auto p-3   rounded-md bg-bgnetflix mb-4" />
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="block w-[95%] mx-auto p-3   rounded-md bg-bgnetflix mb-4" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="block w-[95%] mx-auto p-3 rounded-md bg-bgnetflix" />
        <button type="submit" className="block mt-12 border-[0.5px] border-yellowuin w-[95%] mx-auto p-3 rounded-md bg-greenuin hover:brightness-90 duration-150">
          Sign Up
        </button>
        {error && <p className="text-center mt-4 text-red-400">Something Went Wrong!</p>}
        {/* <div className="google flex justify-center mt-8 gap-2 items-center mx-auto hover:brightness-90 duration-150 cursor-pointer">
          <img src="../src/assets/google.png" alt="google" className="w-10" />
          <p className="text-[16px]">Sign-up With Google.</p>
        </div> */}
      </form>
    </div>
  );
};

export default Register;
