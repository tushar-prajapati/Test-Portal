import { isValidObjectId } from "mongoose";
import { ApiError } from "../utils/apiError.js";

function checkId(req,res,next){
    if(!isValidObjectId(req.params.id)){
        throw new ApiError(403, `Invalid Object of: ${req.params.id}`)
    }
    next();
}

export default checkId;