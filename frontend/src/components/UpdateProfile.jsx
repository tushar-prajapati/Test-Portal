import React, { useEffect } from "react";
import OverlayModal from "./OverlayModal.jsx";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader.jsx";
import { useSelector, useDispatch } from "react-redux";
import { set } from "mongoose";
import { useUpdateAdminMutation } from "../redux/api/adminApiSlice.js";
import { setCredentials } from "../redux/features/auth/authSlice.js";



const UpdateProfile = ({ isOpen, onClose, userInfo }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [department, setDepartment] = useState("");
    const [updateAdmin, { isLoading }] = useUpdateAdminMutation();
    const dispatch = useDispatch();

    useEffect(() => {
        setName(userInfo?.name || "");
        setEmail(userInfo?.email || "");
        setDepartment(userInfo?.department || "");

    }, [userInfo]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (!name || !email || !department) {
            toast.error("All fields are required");
            return;
        }
        if (password && password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        const adminData = {
            name,
            email,
            department,
        };

        if (password) {
            adminData.password = password;
        }
        const id = userInfo?._id;
        try {
            const res = await updateAdmin({ id, adminData}).unwrap();
            console.log(res)
            if (res?.success) {
                toast.success("Profile updated successfully");
                dispatch(setCredentials({...res}))
                onClose();
                setPassword("");
                setConfirmPassword("");
            } else {
                toast.error(data.message || "Failed to update profile");
            }
        } catch (error) {
            toast.error(error?.data?.message || error.error || "Failed to update profile. Please try again.");
        }
    }



  return (
    
    <>
      <OverlayModal isOpen={isOpen} onClose={onClose}>
        <div className="px-24 text-lg  text-black mt-4">
          <h1 className="underline text-xl mb-4 navText">
            Update Profile
          </h1>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>


          <div className="space-y-4 mt-6">
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
            Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full mt-2 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
            />
            

            <label htmlFor="department" className="text-md">
              Department
            </label>

            <input
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              type="text"
              placeholder="eg. Computer Science"
              className="w-full cursor-pointer mt-2 px-4 text-sm bg-gray-100 py-2 border rounded-lg border-gray-300"
            />
            <span className="absolute left-2 top-2.5 text-xl">➕</span>



            <label htmlFor="password" className="text-md">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="......."
              className="w-full mt-2 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
            />
            <label htmlFor="confirmPassword" className="text-md">
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              placeholder="......."
              className="w-full mt-2 px-4 text-sm py-2 bg-gray-100 border rounded-lg border-gray-300"
            />
            
          </div>

          <div className="flex justify-end mt-6">
            {isLoading ? (
              <Loader />
              ) : (
              <button
                onClick={handleUpdate}
                className="mb-10 px-6 py-2 border  text-white bg-black cursor-pointer rounded-lg hover:bg-[#212121] flex items-center"
              >
                Update ↑
              </button>
            )} 
          </div>
        </div>
      </OverlayModal>
    </>
  );
};

export default UpdateProfile;
