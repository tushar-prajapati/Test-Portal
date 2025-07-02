import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import teacherImg from "../../assets/images/teacher.gif";
import { useState, useEffect } from "react";
import { useLocation, useNavigate  } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from '../../redux/features/auth/authSlice.js';
import { useLoginAdminMutation } from "../../redux/api/adminApiSlice.js";
import Loader from "../../components/Loader.jsx";

const TeacherLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/admin/dashboard";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginAdmin, { isLoading }] = useLoginAdminMutation();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if(userInfo){
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginAdmin({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success(`Welcome back ${res.name}`);
    } catch (error) {
      toast.error(error?.data?.message || error.error || "Something went wrong");
      
    }
  }

  return (
    <div className="flex min-h-screen h-screen w-screen items-center justify-center bg-white">
      <div className="flex items-end h-[100%] w-[50%] justify-end">
        <img
          src={teacherImg}
          loading="lazy"
          alt="Teacher"
          className="w-[80%] object-contain"
        />
      </div>

      <div className="flex flex-col  justify-center w-[40%]">
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="Logo" className="w-24 h-24" />
        </div>

        <h2 className="text-2xl font-bold text-center mb-1 mt-4">
          Sign in to your account
        </h2>
        <p className="mt-4  text-sm text-center text-gray-500 mb-6">
          Don’t have an account?{" "}
          <NavLink
              to={redirect? `/register?redirect=${redirect}`: '/register'}
              className="font-semibold text-black hover:underline cursor-pointer"
            >
            Create an account
            </NavLink>
        </p>

        <form onSubmit={handleSubmit} className="px-10 space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Email"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          <div className="text-right">
          <NavLink
              to={'/forgotpassword'}
              className="cursor-pointer text-sm text-gray-500 hover:underline"
            >
            Forgot Password?
            </NavLink>
            
          </div>

          <button
            disabled={isLoading}
            type="submit"
            className="cursor-pointer w-full bg-black text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition"
          >
            {isLoading ? "Signing in..." : "Login →"}
          </button>
          {isLoading && <Loader />}
        </form>
      </div>
    </div>
  );
};

export default TeacherLogin;
