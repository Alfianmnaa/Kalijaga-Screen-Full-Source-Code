import React, { useContext, useState } from "react";
import { axiosInstance } from "../config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { email, password }, { withCredentials: true });
      setUser(res.data);
      console.log("login success");
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  return (
    <div className="login flex items-center justify-center w-full h-[100vh] object-cover bg-[url('../src/assets/hero.jpg')]">
      <form onSubmit={handleLogin} className="cont-login rounded-3xl shadow-sm shadow-neutral-600 p-10 m-3 mt-16 sm:w-[420px] sm:h-[500px] bg-black  text-primary">
        <img src={logo} alt="logo" className="w-32 sm:w-48 mb-6 mx-auto" />
        <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" className="block w-[95%] mx-auto p-3   rounded-md bg-bgnetflix mb-4" />
        <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password" className="block w-[95%] mx-auto p-3 rounded-md bg-bgnetflix" />
        <button type="submit" className="block mt-12 border-[0.5px] border-yellowuin w-[95%] mx-auto p-3 rounded-md bg-greenuin hover:brightness-90 duration-150">
          Login
        </button>
        {/* <div className="google flex justify-center mt-8 gap-2 items-center mx-auto hover:brightness-90 duration-150 cursor-pointer">
          <img src="../src/assets/google.png" alt="google" className="w-10" />
          <p className="text-[16px]">Sign-in With Google.</p>
        </div> */}
        <p className="w-full align-middle mt-12 text-[13px] mx-auto">
          <span className="text-secondary">First time using kalijagascreen?</span>
          <Link to="/register">
            <span className="hover:text-yellowuin cursor-pointer duration-150"> create an account.</span>
          </Link>
        </p>
        {error && <p className="text-center mt-4 text-red-400">Something Went Wrong!</p>}
      </form>
    </div>
  );
};

export default Login;
