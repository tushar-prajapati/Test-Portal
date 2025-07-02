import React from 'react'
import forgotImg from "../../assets/images/forgot.png";
import ForgotModal from '../../components/ForgotModal';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Title from '../../components/Title';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSendOtpMutation, useVerifyOtpMutation, useUpdatePasswordMutation } from '../../redux/api/adminApiSlice.js';
import Loader from '../../components/Loader';


const ForgotPassword = () => {
    const [isOpen1, setIsOpen1] = React.useState(true);
    const [isOpen2, setIsOpen2] = React.useState(false);
    const [isOpen3, setIsOpen3] = React.useState(false);
    const [isOpen4, setIsOpen4] = React.useState(false);
    const [timerExpired, setTimerExpired] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const [email, setEmail] = useState("");
    const [timer, setTimer] = useState(299);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const navigate = useNavigate();
    const [sendOtp, {isLoading}] = useSendOtpMutation();

    const [verifyOtp, {isLoading: isVerifying}] = useVerifyOtpMutation();
    const [updatePassoword,{isLoading: isUpdating}] = useUpdatePasswordMutation();  



    const handleSubmit1 = async(e) => {
        e.preventDefault();
        
       try {
        const res = await sendOtp({ email }).unwrap();
        console.log(res)
         if(res?.success){
            toast.success("OTP sent to your email");
            setIsOpen1(false);
            setIsOpen2(true);
         }
         else{
            toast.error("Failed to send OTP, please try again later");
         }

         
       } catch (error) {
         toast.error(error?.data?.message || error.error || "Something went wrong");
        
       }
    }

    const handleResend = async (e) => {
        e.preventDefault();
        
       try {
        const res = await sendOtp({ email }).unwrap();
        console.log(res)
         if(res?.success){
            toast.success("OTP resent successfully");
            setTimer(299);
         }
         else{
            toast.error("Failed to send OTP, please try again later");
         }

         
       } catch (error) {
         toast.error(error?.data?.message || error.error || "Something went wrong");
        
       }
    }



    const handleSubmit2 =async (e) => {
        e.preventDefault();
        try {
          const res =await verifyOtp({ email, otp: otp.join("") }).unwrap();
          if(res?.success){
            toast.success("OTP verified successfully");
            setIsOpen2(false);
            setIsOpen3(true);
          }
          else{
            toast.error("Invalid OTP, please try again");
          }
        } catch (error) {
            toast.error(error?.data?.message || error.error || "Something went wrong");
          
        }
        
    }
    const handleSubmit3 = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        try {
            const res = await updatePassoword({ email, password }).unwrap();
            if(res?.success){
                toast.success("Password updated successfully");
                setIsOpen3(false);
                setIsOpen4(true);
                setIsSuccess(true);
            }
            else{
                toast.error("Failed to update password, please try again later");
            }

            
          
        } catch (error) {
            toast.error(error?.data?.message || error.error || "Something went wrong");
          
        }
        
    }


    useEffect(() => {
        if (timer <= 0) {
            setTimerExpired(true);
            return;
        };
        const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
        return () => clearInterval(interval);
      }, [timer]);
    
    const formatTime = (sec) => {
        const m = String(Math.floor(sec / 60)).padStart(2, '0');
        const s = String(sec % 60).padStart(2, '0');
        return `${m}:${s}`;
      };

    const handleRetry =async (e) => {
      e.preventDefault();
        
      try {
       const res = await sendOtp({ email }).unwrap();
       console.log(res)
        if(res?.success){
           toast.success("OTP resent to your email");
           setTimer(299)
           setTimerExpired(false);
        }
        else{
           toast.error("Failed to send OTP, please try again later");
        }

        
      } catch (error) {
        toast.error(error?.data?.message || error.error || "Something went wrong");
       
      }
    }
    const handleOtpChange = (value, index) => {
        if (!/^[0-9]*$/.test(value)) {
            toast.error("Please enter a valid digit");
            return};
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        if (value && index < 3) document.getElementById(`otp-${index + 1}`).focus();
      };

  return (
    <div className="flex h-screen">
      
      <div className="bg-black text-white h-screen w-[40%] flex flex-col justify-center items-center px-6">
        <div className='group w-full h-1/2 flex flex-col items-center justify-end'>
        <h1 className="text-3xl font-bold mb-2">{isSuccess? "Success!": "Forgot Password"}</h1>
        <div className="group-hover:w-32 transition-all duration-300 ease-in-out w-24 h-[2px] bg-white mb-6" />
        </div>
        <div className='w-full h-1/2 flex items-end justify-center'>
        <img src={forgotImg} alt="Forgot Illustration" className="h-72 object-contain" />
        </div>
      </div>

      <div className="bg-black w-[60%] flex flex-col justify-center items-center h-full">
        <ForgotModal isOpen={isOpen1}>
        <Title/>

        <form className="w-full max-w-sm space-y-4" 
        onSubmit={handleSubmit1}
        >
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="mt-1 block bg-gray-100 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className='w-full flex justify-center'>
          {isLoading ? <Loader/> :(<button
            type="submit"
            className="w-1/2 hover:w-2/3 transition-all duration-300 ease-in-out cursor-pointer bg-black text-white py-2 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-gray-800 "
          >
            Reset →
          </button>)}
          </div>
        </form> 
        </ForgotModal>
        <ForgotModal isOpen={isOpen2}>

        <Title/>
        {timerExpired ?
        (
        isLoading ? <Loader/>: (<div className="w-full max-w-sm flex flex-col items-center mt-12">
            <h1 className='text-2xl'>Failed!</h1>
            <button onClick={handleRetry} className="text-xl mt-8 w-1/2 cursor-pointer bg-red-500 text-white py-3 rounded-md font-medium hover:bg-red-600 transition">
          Retry  ↻ 
        </button>
        </div>)
        )
        
        : (
        <div className="w-full max-w-sm">
        <label htmlFor="otp" className="block text-left mb-2 text-gray-700 font-medium mt-6">
          Enter Code
        </label>
        <div className="mt-6 flex justify-between gap-2 mb-4">
          {[...Array(4)].map((_, i) => (
            <input
              key={i}
              type="text"
              id={`otp-${i}`}
              maxLength="1"
              value={otp[i]}
              onChange={(e) => handleOtpChange(e.target.value, i)}
              className="bg-gray-100 w-16 h-16 border border-gray-300 rounded-md text-center text-xl focus:outline-none focus:ring-2 focus:ring-black"
            />
          ))}
        </div>

        <p className="text-sm text-red-500 text-center mb-1 mt-4"> <span className='text-black'>Expire in</span> {formatTime(timer)}</p>
        <p className={` ${timerExpired? "text-lg": "text-xs"}  text-gray-500 text-center mb-4 mt-6`}>
          If you didn’t receive a code!{" "}
          <span onClick={handleResend} className="text-red-500 font-medium cursor-pointer hover:underline">Resend</span>
        </p>

        <div className='w-full flex justify-center'>
        {isLoading? (<Loader/>): <button onClick={handleSubmit2} className="mt-1 w-1/2 cursor-pointer bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition">
          {isVerifying ? <Loader/> : ("Verify →")}
        </button>}
        </div>
      </div>)}
        
        </ForgotModal>
        <ForgotModal isOpen={isOpen3}>
        <Title/>
        <div className="mt-4 flex flex-col items-center justify-center text-center w-full px-4">
     

      <div className="w-full max-w-sm space-y-4">
        <div className="text-left">
          <label className="block mb-1 text-gray-700 text-md font-medium">New Password</label>
          <input
            type="password"
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className="text-left">
          <label className="block mb-1 text-gray-700 text-md font-medium">Confirm Password</label>
          <input
            type="password"
            placeholder="••••••"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div className='w-full'>
        {isUpdating ? <Loader/>:(<button onClick={handleSubmit3} className="w-1/2 cursor-pointer mt-4 bg-black text-white py-2 rounded-md font-medium hover:bg-gray-800 transition">
          Update Password →
        </button>)}
        </div>
      </div>
    </div>
        </ForgotModal>
        <ForgotModal isOpen={isOpen4}>
        <div className="flex flex-col items-center justify-center text-center w-full h-full px-4">
      {/* Success Icon */}
      <div className="w-20 h-20 mb-6 flex items-center justify-center rounded-full border-4 border-black">
        <svg
          className="w-10 h-10 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <p className="text-sm text-gray-800 mb-6">
        Your password has been reset successfully
      </p>

      <button
      onClick={() => navigate('/teacherlogin')}
      className="w-full max-w-sm bg-black text-white cursor-pointer py-2 rounded-md font-medium hover:bg-gray-800 transition">
        Continue →
      </button>
    </div>
        </ForgotModal>
      </div>
    </div>
  )
}

export default ForgotPassword



        

        