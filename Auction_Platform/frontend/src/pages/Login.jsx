import { login } from "@/store/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, isAuthenticated } = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    dispatch(login(formData));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, isAuthenticated, loading]);

  return (
    <>
    <section className="w-full h-screen flex items-center justify-center bg-[#da5e21] px-5">
      <div className="bg-white shadow-lg mx-auto w-full max-w-md p-6 flex flex-col gap-6 items-center rounded-lg">
        {/* Login Title */}
        <h1 className="text-[#00246B] text-4xl font-bold">Login</h1>
  
        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full">
          {/* Email Input */}
          <div className="flex flex-col gap-1">
            <label className="text-lg text-[#00246B] font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="text-lg py-2 px-3 bg-white border-2 border-[#8AB6F9] rounded-md focus:outline-none focus:border-[#00246B] transition"
              required
            />
          </div>
  
          {/* Password Input */}
          <div className="flex flex-col gap-1">
            <label className="text-lg text-[#00246B] font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="text-lg py-2 px-3 bg-white border-2 border-[#8AB6F9] rounded-md focus:outline-none focus:border-[#00246B] transition"
              required
            />
          </div>
  
          {/* Login Button */}
          <button
            className="bg-[#00246B] text-white font-semibold hover:bg-[#8AB6F9] transition-all duration-300 text-lg py-3 px-6 rounded-md mt-4"
            type="submit"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  </>
  
  );
};

export default Login;