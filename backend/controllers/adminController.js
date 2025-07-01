import Admin from "../models/adminModel.js";
import asyncHandler from '../middlewares/asyncHandler.js';
import generateToken  from "../utils/generateToken.js";
import {ApiError} from "../utils/apiError.js";
import bcrypt from "bcryptjs";

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

export { createAdmin, loginAdmin, logoutAdmin };