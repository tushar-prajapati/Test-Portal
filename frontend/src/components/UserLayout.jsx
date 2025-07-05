import { Outlet } from "react-router-dom"; 
import {
  FaBell,
  FaEnvelope,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidNotepad } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import { GrScorecard } from "react-icons/gr";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useLogoutUserMutation } from "../redux/api/userApiSlice.js";


const UserLayout = () => {


    const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutUser, { isLoading: loggingOut }] = useLogoutUserMutation();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const logoutHandler = async (e) => {
    e.preventDefault();
    try {
        console.log("Logging out user");
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/studentlogin");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error.error || "Something went wrong"
      );
    }
  };

  
  function toTitleCase(str) {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleDashboardClick = () => {
    setActiveTab("dashboard");
    navigate("/student/dashboard");
  };
  const handleTestsClick = () => {
    setActiveTab("tests");
    navigate("/student/tests");
  };
  
  const handleResultsClick = () => {
    setActiveTab("results");
    navigate("/student/results");
  };

  




  return (
    <div className="flex h-screen w-screen bg-gray-100 ">
      <aside className="w-[15%] bg-[#0f0f10] text-white flex flex-col justify-between py-6 ">
        <div className="mt-24">
          <nav>
            <button
              onClick={handleDashboardClick}
              className={`${
                activeTab == "dashboard"
                  ? "text-[#2D6873] bg-[#fdf5e6]"
                  : "hover:bg-[#212121]"
              } cursor-pointer w-full flex  text-sm text-left px-6 py-6 rounded-tl-full rounded-bl-full  navText font-bold`}
            >
              <MdSpaceDashboard className="text-xl mx-2" />
              DASHBOARD
            </button>
            <button
              onClick={handleTestsClick}
              className={`${
                activeTab == "tests"
                  ? "text-[#2D6873] bg-[#fdf5e6]"
                  : "hover:bg-[#212121]"
              } cursor-pointer w-full flex text-sm text-left px-6 py-6 rounded-tl-full rounded-bl-full navText font-bold`}
            >
              <BiSolidNotepad className="text-xl mx-2" />
              TESTS
            </button>
            
            <button
              onClick={handleResultsClick}
              className={`${
                activeTab == "results"
                  ? "text-[#2D6873] bg-[#fdf5e6]"
                  : "hover:bg-[#212121]"
              } cursor-pointer w-full flex text-sm text-left px-6 py-6 rounded-tl-full rounded-bl-full navText font-bold`}
            >
              <GrScorecard className="text-xl mx-2" />
              RECENT/RESULTS
            </button>
          </nav>
        </div>

        <div className="space-y-2">
          
          
          <button
            onClick={logoutHandler}
            className="w-full text-sm text-left px-6 py-2 flex items-center gap-2 text-red-500 cursor-pointer"
          >
            <FaSignOutAlt /> LOGOUT
          </button>
        </div>
      </aside>
      {loggingOut ? (
        <Loader />
      ) : (
        <div className="h-full w-[85%] bg-[#0f0f10] flex items-center ">
          <div
            className="bg-cover bg-no-repeat container  h-[95%] w-[98%] rounded-4xl"
            style={{ boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.8)" }}
          >
            <div className="h-full w-full bg-white/90 p-4 rounded-4xl">
            <main className="flex-1 overflow-y-auto p-6 relative">
              <div className="flex justify-between items-center mb-6">
                <div>
                  {activeTab == "dashboard" ? (
                    <h2 className="text-lg  text-cyan-800 font-bold ">
                      Welcome back, {userInfo.name}
                    </h2>
                  ) : (
                    ""
                  )}
                  <h1 className="text-4xl text-gray-700 font-bold">
                    {toTitleCase(activeTab)}
                  </h1>
                </div>

                <div>
                  <div className="flex items-center gap-6">
                    <FaEnvelope className="text-gray-700 text-lg transition duration-300 ease-in-out hover:text-gray-900 cursor-pointer" />
                    <FaBell className="text-gray-700 text-lg transition duration-300 ease-in-out hover:text-gray-900 cursor-pointer" />
                    <div 
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <img
                        src="https://randomuser.me/api/portraits/men/75.jpg"
                        alt="Admin Avatar"
                        className="w-8 h-8 rounded-full"
                      />

                      <div className="text-sm">
                        <p>{userInfo.name}</p>
                        <p className="text-gray-500 text-xs">Student account</p>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

              <Outlet />
            </main>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserLayout