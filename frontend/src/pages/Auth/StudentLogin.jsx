import React from 'react'
import LandingModal from '../../components/LandingModal.jsx'
import { useState, useEffect } from 'react'
import stackImage from '../../assets/images/stack.png'
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useLoginUserMutation } from '../../redux/api/userApiSlice.js'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../../redux/features/auth/authSlice.js'
import Loader from '../../components/Loader.jsx'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'

const StudentLogin = () => {
    const [isOpen, setIsOpen] = useState(true)
    const navigate = useNavigate();
    const [roll, setRoll] = useState('');
    const [dob, setDob] = useState(null);
    const [loginUser, {isLoading}] = useLoginUserMutation();

    const { userInfo } = useSelector((state) => state.auth);
    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/student/dashboard";
    const dispatch = useDispatch();
    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);


    const handleSubmit =async (e) => {
        e.preventDefault();
        if(!roll || !dob) {
            toast.error("All fields are required");
            return;
        }
        try {
          const res = await loginUser({roll, dob}).unwrap();
          if(res?.success) {          
            setRoll('');
            setDob(null);
            setIsOpen(false);
          dispatch(setCredentials({ ...res }));
          toast.success(`Welcome back ${res.name}`);
          }
          else {
            toast.error(res?.message || "Login failed");
          }

        } catch (error) {
          toast.error(error?.data?.messagen|| error?.error || "Something went wrong");
        }
        
    }

  return (
    <div className="relative max-w-screen min-h-screen bg-cover bg-center bg-no-repeat container">
      <div className="absolute inset-0 bg-white/80 z-0">
        <LandingModal isOpen={isOpen}>

        <div className="grid grid-cols-3 gap-6 items-center">
        
        <div className="col-span-1 flex w-full h-full items-end justify-center ">
          <img src={stackImage} alt="Illustration" className="h-56" />
        </div>

        <div className="col-span-2">
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Logo" className="w-24 h-24" />
            <h2 className="text-4xl  text-black mt-4 text-shadow-gray-350 text-shadow-md">Test Portal</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left">
              <label htmlFor="roll" className="text-sm font-medium text-gray-700">University roll number</label>
              <input
                value={roll}
                onChange={(e) => setRoll(e.target.value)}
                id="roll"
                type="number"
                placeholder="Roll number"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
              />
            </div>

            <div className="text-left">
              <label htmlFor="dob" className="text-sm font-medium text-gray-700">Date of birth</label>
              <input
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                id="dob"
                type="Date"
                placeholder="dd/mm/yyyy"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black focus:border-black text-sm"
              />
            </div>

            {isLoading ? <Loader/> :<button
              type="submit"
              className="cursor-pointer w-full mt-4 bg-black text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 transition"
            >
              Get started →
            </button>}
          </form>
        </div>
      </div>




        </LandingModal>
      </div>
    </div>
  )
}

export default StudentLogin