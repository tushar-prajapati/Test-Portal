import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";
import { ApiError } from "../utils/apiError.js";

const authenticate = asyncHandler( async (req,res,next)=>{
    let token;

    token = req.cookies.jwt;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId)
            next();
            
        } catch (error) {
            throw new ApiError(401, "Not Authorized, Please Login Again")
        }
    } else{
        throw new ApiError(401, "Not Authorized, Please Login Again")
    }

})


const authorizeAdmin = (req,res,next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401).send("Not an Admin")
    }
}

export {authenticate, authorizeAdmin}