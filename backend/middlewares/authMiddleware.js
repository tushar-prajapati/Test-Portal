import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import asyncHandler from "./asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const authenticateAdmin = asyncHandler( async (req,res,next)=>{
    let token;

    token = req.cookies.jwt;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await Admin.findById(decoded.userId)
            next();
            
        } catch (error) {
            throw new ApiError(401, "Not Authorized, Please Login Again")
        }
    } else{
        throw new ApiError(402, "Not Authorized, Please Login Again")
    }

})




export {authenticateAdmin}