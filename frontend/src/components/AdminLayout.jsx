import { Outlet } from "react-router-dom"; 
import {
  FaUser,
  FaBell,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { BiSolidNotepad } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import { GrScorecard } from "react-icons/gr";
import { FaEdit } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";
import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useLogoutAdminMutation } from "../redux/api/adminApiSlice.js";
import {
  useDeleteUserMutation,
  useGetUserMutation,
  useUpdateUserMutation,
} from "../redux/api/userApiSlice.js";
import { logout } from "../redux/features/auth/authSlice.js";
import { toast } from "react-toastify";
import Loader from "./Loader";
import OverlayModal from "./OverlayModal.jsx";
import UpdateProfile from "./UpdateProfile.jsx";
import { RiDeleteBin6Line } from "react-icons/ri";


const AdminLayout = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutAdmin, { isLoading: loggingOut }] = useLogoutAdminMutation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [updateModal1, setUpdateModal1] = useState(false);
  const [updateModal2, setUpdateModal2] = useState(false);
  const [roll, setRoll] = useState("");
  const [id, setId] = useState("");
  const [getUser, { isLoading: isFetching }] = useGetUserMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [section, setSection] = useState("");
  const [semester, setSemester] = useState("");
  const [dob, setDob] = useState(null);
  const [newRoll, setNewRoll] = useState("");
  const [updateProfileModal, setUpdateProfileModal] = useState(false);
  const [deleteUser, {isLoading: isDeleting}]  = useDeleteUserMutation();

  const logoutHandler = async () => {
    try {
      await logoutAdmin().unwrap();
      setIsDropdownOpen(false);
      dispatch(logout());
      navigate("/teacherlogin");
      toast.success("Logged out successfully");
    } catch (error) {
      console.log(error);
      toast.error(
        error?.data?.message || error.error || "Something went wrong"
      );
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
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
    navigate("/admin/dashboard");
    setIsDropdownOpen(false);
  };
  const handleTestsClick = () => {
    setActiveTab("tests");
    navigate("/admin/tests");
    setIsDropdownOpen(false);
  };
  const handleStudentsClick = () => {
    setActiveTab("students");
    navigate("/admin/students");
    setIsDropdownOpen(false);
  };
  const handleResultsClick = () => {
    setActiveTab("results");
    navigate("/admin/results");
    setIsDropdownOpen(false);
  };

  const updateUserHandler1 = () => {
    setUpdateModal2(false);
    setUpdateModal1(true);
    setIsDropdownOpen(false);
  };
  const updateUserHandler2 = async (e) => {
    e.preventDefault();
    if (!roll) {
      toast.error("Please enter the student's university roll number");
      return;
    }
    try {
      const res = await getUser({ roll }).unwrap();

      if (res?.success) {

        const date = new Date(res.dob)
        const dateValue = date.toISOString().split("T")[0];
        setId(res._id);
        setRoll(res.universityRoll);
        toast.success(`User found: ${res.name}`);
        setUpdateModal1(false);
        setUpdateModal2(true);
        setIsDropdownOpen(false);
        setName(res.name || "");
        setEmail(res.email || "");
        setNewRoll(res.universityRoll || "");
        setSection(res.section || "");
        setSemester(res.semester || "");
        setDob(dateValue || null);
      } else {
        toast.error(
          res?.error?.data?.message || res?.error.error || "User not found"
        );
        setUpdateModal1(false);
        setUpdateModal2(false);
      }
    } catch (error) {
      toast.error(
        error?.data?.message || error.error || "Something went wrong"
      );
      return;
    }
  };

  const updateUserHandler3 = async (e) => {
    e.preventDefault();
    if (!name || !email || !newRoll || !section || !semester || !dob) {
      toast.error("All fields are required");
      return;
    }
    try {
      const userData = {
        name,
        email,
        universityRoll: newRoll,
        section,
        semester,
        dob,
      };
      const res = await updateUser({ id, userData }).unwrap();
      if (res?.success) {
        toast.success("User updated successfully");
        setUpdateModal2(false);
        setUpdateModal1(false);
        setName("");
        setEmail("");
        setNewRoll("");
        setSection("");
        setSemester("");
        setDob(null);
        setRoll("");
        setId("");
      }
    } catch (error) {
      toast.error(
        error?.data?.message || error.error || "Something went wrong"
      );
      return;
    }
  };

  const updateProfileHandler = () => {
    setUpdateProfileModal(true);
    setIsDropdownOpen(false);
  };

  const deleteHandler = async(e)=>{
    e.preventDefault();
    try {
      const res = await deleteUser(id).unwrap();
      if (res?.success) {
        toast.success("User deleted successfully");
        setUpdateModal2(false);
        setUpdateModal1(false);
        setName("");
        setEmail("");
        setNewRoll("");
        setSection("");
        setSemester("");
        setDob(null);
        setRoll("");
        setId("");
      }
      
    } catch (error) {
      toast.error(error?.data?.message || error.error || "Something went wrong");
    }

  }

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
              onClick={handleStudentsClick}
              className={`${
                activeTab == "students"
                  ? "text-[#2D6873] bg-[#fdf5e6]"
                  : "hover:bg-[#212121]"
              } cursor-pointer w-full flex text-sm text-left px-6 py-6 rounded-tl-full rounded-bl-full navText font-bold`}
            >
              <PiStudentFill className="text-xl mx-2" />
              STUDENTS
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
              RESULTS
            </button>
          </nav>
        </div>

        <div className="space-y-2">
          <button
            onClick={updateUserHandler1}
            className="w-full text-sm text-left px-6 py-2 flex items-center gap-2 text-white cursor-pointer"
          >
            <FaEdit /> UPDATE STUDENT
          </button>
          <OverlayModal
            isOpen={updateModal1}
            onClose={() => setUpdateModal1(false)}
          >
            <div className="px-24 text-lg navText text-black mt-4">
              <h2>Enter Student's University Rollnumber</h2>
              <input
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                placeholder="eg. 2200270xxxxxx"
                type="number"
                className=" w-full mt-4 px-4 text-sm bg-gray-100 py-2 border rounded-lg border-gray-300"
              />
              <div className="pt-6 mb-10 flex justify-center">
                {isFetching ? (
                  <Loader />
                ) : (
                  <button
                    onClick={updateUserHandler2}
                    className=" w-1/2 hover:w-6/10 transition-all duration-300 ease-in-out cursor-pointer bg-black text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 "
                  >
                    Check →
                  </button>
                )}
              </div>
            </div>
          </OverlayModal>
          <OverlayModal
            isOpen={updateModal2}
            onClose={() => setUpdateModal2(false)}
          >
            <div className="px-24 text-lg  text-black mt-4">
              <h1 className="underline text-xl mb-4 navText">
                Update Student Details
              </h1>

              <div className="space-y-4">
                <label htmlFor="name" className="text-md">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Name"
                  className="w-full mt-2 px-4 text-sm bg-gray-100 py-2 border rounded-lg border-gray-300"
                />
                <label htmlFor="email" className="text-md">
                  College Email
                </label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Studentstudentno@akgec.ac.in"
                  className="w-full mt-2 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
                />
                <label htmlFor="roll" className="text-md">
                  University Roll number
                </label>
                <input
                  value={newRoll}
                  onChange={(e) => setNewRoll(e.target.value)}
                  type="number"
                  placeholder="2200270xxxxxx"
                  className="w-full mt-2 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
                />
                <div className="flex">
                  <div>
                    <label htmlFor="section" className="text-md">
                      Section:
                    </label>
                    <input
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      type="text"
                      placeholder="eg. CS-2"
                      className="w-1/2 mx-3 mt-2 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
                    />
                  </div>
                  <div>
                    <label htmlFor="semester" className="text-md">
                      Semester:
                    </label>
                    <input
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      type="number"
                      placeholder="eg. 6"
                      className="w-1/2 mt-2 mx-3 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
                    />
                  </div>
                </div>

                <label htmlFor="dob" className="text-md">
                  Date Of Birth
                </label>

                <input
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  type="Date"
                  placeholder="date of birth"
                  className="w-full cursor-pointer mt-2 px-4 text-sm bg-gray-100 py-2 border rounded-lg border-gray-300"
                />
                <span className="absolute left-2 top-2.5 text-xl">➕</span>
              </div>

              <div className="flex justify-between mt-6">
              {isDeleting? <Loader/>:<button
                onClick={deleteHandler}
                className="mb-10 px-6 py-2 border  text-white bg-red-500 cursor-pointer rounded-lg hover:bg-red-600 flex items-center"><RiDeleteBin6Line /></button>}
                {isUpdating ? (
                  <Loader />
                ) : (
                  <button
                    onClick={updateUserHandler3}
                    className="mb-10 px-6 py-2 border  text-white bg-black cursor-pointer rounded-lg hover:bg-[#212121] flex items-center"
                  >
                    Update ↑
                  </button>
                )}
              </div>
            </div>
          </OverlayModal>
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
            className="bg-[#f4f4f4] p-4 h-[95%] w-[98%] rounded-4xl"
            style={{ boxShadow: "inset 0 0 20px rgba(0, 0, 0, 0.8)" }}
          >
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
                      onClick={toggleDropdown}
                      className="cursor-pointer flex items-center gap-2"
                    >
                      <img
                        src="https://randomuser.me/api/portraits/men/75.jpg"
                        alt="Admin Avatar"
                        className="w-8 h-8 rounded-full"
                      />

                      <div className="text-sm">
                        <p>{userInfo.name}</p>
                        <p className="text-gray-500 text-xs">Admin account</p>
                      </div>
                    </div>
                  </div>
                  {isDropdownOpen && (
                    <div
                      onClick={updateProfileHandler}
                      className="hover:bg-gray-200 cursor-pointer transition ease-in-out duration-300 absolute right-0 mt-2 w-36 bg-white text-black rounded-lg shadow-lg z-10"
                    >
                      <ul className="py-2">
                        <li className="px-4   text-xs  flex items-center gap-2">
                          <FaUser /> Update Profile
                        </li>
                      </ul>
                    </div>
                  )}

                  <UpdateProfile
                    isOpen={updateProfileModal}
                    onClose={() => setUpdateProfileModal(false)}
                    userInfo={userInfo}
                  />
                </div>
              </div>

              <Outlet />
            </main>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLayout;
