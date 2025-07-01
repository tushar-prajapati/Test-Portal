import LandingModal from "../../components/LandingModal";
import { ArrowRight, ArrowLeft } from "lucide-react";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Landing.css";
import logo from "../../assets/images/logo.png";
import studentImg from "../../assets/images/student.png";
import teacherImg from "../../assets/images/teacher.png";

const Landing = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const handleStudent = () => {
    setIsOpen(false);
    navigate("/studentlogin");
  };
  const handleTeacher = () => {
    setIsOpen(false);
    navigate("/teacherlogin");
  };

  return (
    <div className="relative max-w-screen min-h-screen bg-cover bg-center bg-no-repeat container">
      <div className="absolute inset-0 bg-white/80 z-0">
        <LandingModal isOpen={isOpen}>
          <div className="flex flex-col items-center mb-6">
            <img src={logo} alt="Test Portal Logo" className="w-24 h-24" />
            <h1 className="text-4xl font-bold text-black mt-4 text-shadow-gray-350 text-shadow-lg">
              Test Portal
            </h1>
            <p className="text-gray-800 text-2xl mt-4">
              Sign in to your account
            </p>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"></div>

          <div className="grid grid-cols-3 gap-4 items-center mt-10">
            <div className="flex justify-center">
              <img
                src={studentImg}
                alt="Student Illustration"
                className="h-80"
              />
            </div>

            <div className="flex flex-col items-center gap-2">
              <p className="text-2xl text-black mb-10">SIGN IN AS?</p>

              <button className="mb-4 cursor-pointer flex items-center justify-center gap-2 bg-black text-white text-2xl px-12 py-2 rounded-md hover:bg-gray-800 transition"
              onClick={handleStudent}
              >
                Student <ArrowRight size={24} />
              </button>

              <span className="text-lg text-gray-600">or</span>

              <button className="mt-4 cursor-pointer flex items-center justify-center gap-2 bg-black text-white text-2xl px-12 py-2 rounded-md hover:bg-gray-800 transition"
              onClick={handleTeacher}
              >
                <ArrowLeft size={24} /> Teacher
              </button>
            </div>

            <div className="flex justify-center">
              <img
                src={teacherImg}
                alt="Teacher Illustration"
                className="h-80"
              />
            </div>
          </div>
        </LandingModal>
      </div>
    </div>
  );
};

export default Landing;
