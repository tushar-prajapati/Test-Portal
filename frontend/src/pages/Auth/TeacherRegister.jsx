import React from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import teacherImg from "../../assets/images/teacher.gif";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import Loader from "../../components/Loader.jsx";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from '../../redux/features/auth/authSlice.js'
import { useCreateAdminMutation } from "../../redux/api/adminApiSlice.js";



const TeacherRegister = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [department, setDepartment] = useState("");
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {search} = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/admindashboard'
 const [createAdmin, {isLoading}] = useCreateAdminMutation();

 const {userInfo} = useSelector((state) => state.auth);

 useEffect(()=>{
    if(userInfo){
        navigate(redirect);
    }
},[navigate, userInfo, redirect])


  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!name || !email || !password || !confirmPassword || !department) {
      toast.error("All fields are required");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    else{
        try {
            const res = await createAdmin({name, email, password, department}).unwrap();
            dispatch(setCredentials({...res}));
            navigate(redirect);
            toast.success(`${res.name} registered successfully`);
        } catch (error) {
          toast.error(error?.data?.message || error.error);
            
        }
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
          Register as a Teacher
        </h2>
        <p className="mt-4  text-sm text-center text-gray-500 mb-6">
          Already have an account?{" "}
          <NavLink
              to={redirect? `/teacherlogin?redirect=${redirect}`: '/teacherlogin'}
              className="font-semibold text-black hover:underline cursor-pointer"
            >
            Login
            </NavLink>
        </p>

        <form onSubmit={handleSubmit} className="px-10 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              type="text"
              placeholder="Name"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
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
              placeholder="example@gmail.com"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>
          <div>
            <label
              htmlFor="department"
              className="block text-sm font-medium text-gray-700"
            >
              Department
            </label>
            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              id="department"
              type="text"
              placeholder="Eg. Computer Science"
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
            />
          </div>

          

          <button
            disabled={isLoading}
            type="submit"
            className="mt-10 cursor-pointer w-3/4 hover:w-full transition-all duration-300 ease-in-out bg-black text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 "
          >{isLoading? "Getting Started...": "Get Started →"}
          </button>
        {isLoading && <Loader />}

        </form>
      </div>
    </div>
  );
};

export default TeacherRegister;
