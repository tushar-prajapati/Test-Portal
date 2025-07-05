import asyncHandler from '../middlewares/asyncHandler.js';
import User from "../models/userModel.js";
import {ApiError} from "../utils/ApiError.js";
import bcrypt from "bcryptjs";
import generateToken from '../utils/generateToken.js';
import Test from '../models/testModel.js';

const createUser = asyncHandler(async (req, res) => {
    const { name, email, universityRoll, dob, section, semester } = req.body;
    if (!name || !email || !universityRoll || !dob || !section || !semester) {
        throw new ApiError(400, "All fields are required");
    }
    const userExists = await User.findOne({
        $or: [
            { email: email.toLowerCase() },
            { universityRoll: universityRoll }
        ]
    })
    if (userExists) {
        throw new ApiError(400, "Student already exists");
    }
    const user = new User({
        name,
        email,
        universityRoll,
        dob,
        section,
        semester
    });
    try {
        await user.save();
        res.status(201).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            universityRoll: user.universityRoll,
            dob: user.dob,
            section: user.section,
            semester: user.semester
        });
    } catch (error) {
        throw new ApiError(500, "Server error");
    }
})

const getUser = asyncHandler(async (req, res) => {
        const { roll} = req.body;
        if (!roll) {
            throw new ApiError(400, "Roll number is required");
        }
        const user = await User.findOne({ universityRoll: Number(roll) });
        
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            universityRoll: user.universityRoll,
            dob: user.dob,
            section: user.section,
            semester: user.semester
        });
    
})

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, universityRoll, dob, section, semester } = req.body;

    if (!name || !email || !universityRoll || !dob || !section || !semester) {
        throw new ApiError(400, "All fields are required");
    }

    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user.name = name;
    user.email = email.toLowerCase();
    user.universityRoll = universityRoll;
    user.dob = dob;
    user.section = section;
    user.semester = semester;

    try {
        await user.save();
        res.status(200).json({
            success: true,
            _id: user._id,
            name: user.name,
            email: user.email,
            universityRoll: user.universityRoll,
            dob: user.dob,
            section: user.section,
            semester: user.semester
        });
    } catch (error) {
        throw new ApiError(500, "Server error");
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({}).sort({ updatedAt: -1 });
    res.status(200).json(users)
})

const loginUser = asyncHandler(async (req, res) => {
    const { roll, dob } = req.body;
    if (!roll || !dob) {
        throw new ApiError(400, "Roll number and DOB are required");
    }

    const user = await User.findOne({ universityRoll: roll });
    if (!user) {
        throw new ApiError(401, "Invalid credentials");
    }
   const userDobString = user.dob.toISOString().split('T')[0]; 

    const isMatch = userDobString == dob;
    if (!isMatch) {
        throw new ApiError(401, "Invalid credentials");
    }
    
    generateToken(res, user._id);

    res.status(200).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        universityRoll: user.universityRoll,
        dob: user.dob,
        section: user.section,
        semester: user.semester
    });
})

const toggleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        throw new ApiError(404, "User not found");
    }
    user.isActive = !user.isActive;
    await user.save();
    res.status(200).json({
        success: true,
        isActive: user.isActive
    });
}) 

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
});

const addTestForUser = asyncHandler(async(req,res)=>{
    const { testCode} = req.body;
    const {userId} = req.params;
    console.log(userId)
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404, "User not found");
    }
    const test = await Test.findOne({testCode});
    if(!test){
        throw new ApiError(404, "Test not found");
    }
    user.allowedTests.push(test._id);
    await user.save();
    res.status(200).json({
        success: true,
        message: "Test added successfully"
    })
})





export { createUser, getUser, updateUser,deleteUser , getAllUsers, toggleUser, loginUser, logoutUser, addTestForUser };