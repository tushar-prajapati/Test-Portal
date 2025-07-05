import Admin from "../models/adminModel.js";
import asyncHandler from '../middlewares/asyncHandler.js';
import generateToken  from "../utils/generateToken.js";
import {ApiError} from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";

const createAdmin = asyncHandler(async (req, res) => {
        const { name, email, password, department } = req.body;
        if (!name || !email || !password || !department) {
            throw new ApiError(400, "All fields are required");
        }

        const adminExists = await Admin.findOne({ email });

        if(adminExists){
            throw new ApiError(400, "Admin already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const admin = new Admin({
            name,
            email,
            password: hashedPassword,
            department
        })

        try {
            await admin.save();
            generateToken(res, admin._id);
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                department: admin.department            
            });
        } catch (error) {
            throw new ApiError(500, "Server error");
            
        }

})

const loginAdmin = asyncHandler(async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const admin = await Admin.findOne({ email });

        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            throw new ApiError(401, "Invalid credentials");
        }

        generateToken(res, admin._id);
        res.status(200).json({
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            department: admin.department
        });
})

const logoutAdmin = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
});

const sendOtp = asyncHandler(async (req, res) => {
    try {
        const { email } = req.body;
    
        const admin = await Admin.findOne({email});
        if (!admin) {
            throw new ApiError(404, "Admin not found");
        }
        const otp = otpGenerator.generate(4, { digits: true, specialChars: false,lowerCaseAlphabets: false, upperCaseAlphabets: false });
    
        admin.otp = otp;
        admin.otpExpires = Date.now() + 5 * 60 * 1000;
        await admin.save();
        
        const transporter = nodemailer.createTransport({
            secure: true,
            host: "smtp.gmail.com",
            port: 465,
            service: "Gmail",
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASS,
            },
        });
    
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP for password reset",
            text: `Your OTP is ${otp}`,
          });
        
          res.status(200).json({ success:true, msg: "OTP sent successfully" });
    
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw new ApiError(500, "Failed to send OTP");
        
    }
});

const verifyOtp = asyncHandler(async (req, res) => {
    const {email, otp} = req.body;
    const admin = await Admin.findOne({ email });
    if(!admin){
        throw new ApiError(404, "Admin not found");
    }
    if(!admin.otp || admin.otp !== otp || admin.otpExpires < Date.now()){
        throw new ApiError(400, "Invalid or expired OTP");
    }
    admin.isOtpVerified = true;
    admin.otp = undefined;
    admin.otpExpires = undefined;
    await admin.save();
    res.status(200).json({ success: true, msg: "OTP verified successfully" });
})

const updatePassword = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        throw new ApiError(400, "Email and new password are required");
    }
    const admin = await Admin.findOne({ email });
    if(!admin.isOtpVerified){
        throw new ApiError(403, "OTP not verified");
    }
    if(!admin){
        throw new ApiError(404, "Admin not found");
    }
    const salt = await bcrypt.genSalt(10);
    admin.password = await bcrypt.hash(password, salt);
    admin.isOtpVerified = false; 
    await admin.save();
    res.status(200).json({ success: true, msg: "Password updated successfully" });
})

const updateAdmin = asyncHandler(async (req, res) => {
    const { name, email, department, password } = req.body;
    const { id } = req.params;

    if (!name || !email || !department) {
        throw new ApiError(400, "All fields are required");
    }

    const admin = await Admin.findById(id);
    if (!admin) {
        throw new ApiError(404, "Admin not found");
    }

    admin.name = name;
    admin.email = email.toLowerCase();
    admin.department = department;
    if(password){
        const salt = await bcrypt.genSalt(10);
        admin.password = await bcrypt.hash(password, salt);
    }
    

    try {
        await admin.save();
        res.status(200).json({
            success: true,
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            department: admin.department
        });
    } catch (error) {
        throw new ApiError(500, "Server error");
    }
})

export { createAdmin, loginAdmin, logoutAdmin, sendOtp, verifyOtp, updatePassword, updateAdmin };