import asyncHandler from '../middlewares/asyncHandler.js';
import User from "../models/userModel.js";
import {ApiError} from "../utils/apiError.js";
import bcrypt from "bcryptjs";

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



export { createUser };