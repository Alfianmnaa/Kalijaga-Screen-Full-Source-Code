import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // React Router history hook

  const handleLogin = () => {
    // Hardcoded username and password
    const validUsername = "Admin";
    const validPassword = "KalijagaAdmin";

    if (username === validUsername && password === validPassword) {
      // Set admin status to true on successful login
      setIsAdmin(true);

      // Redirect to the home page
      navigate("/");
    } else {
      // Display an error message
      setErrorMessage("Invalid username or password");
    }
  };

  return (
    <div className="login flex items-center justify-center w-full h-[100vh] object-cover bg-[url('../src/assets/hero.jpg')]">
      <div className="cont-login rounded-3xl shadow-sm shadow-neutral-600 p-10 sm:w-[420px] sm:h-[500px] bg-black  text-primary">
        <img src={logo} alt="logo" className="w-32 sm:w-48 mb-6 mx-auto" />
        <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} className="block w-[95%] mx-auto p-3   rounded-md bg-bgnetflix mb-4" />
        <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} className="block w-[95%] mx-auto p-3 rounded-md bg-bgnetflix" />
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        <button onClick={handleLogin} className="block mt-12 border-[0.5px] border-yellowuin w-[95%] mx-auto p-3 rounded-md bg-greenuin hover:brightness-90 duration-150">
          Login
        </button>
        <div className="google flex justify-center mt-8 gap-2 items-center mx-auto hover:brightness-90 duration-150 cursor-pointer">
          <p className="text-[16px]">Sign-in With Google.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
