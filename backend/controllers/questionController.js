import asyncHandler from "../middlewares/asyncHandler.js";
import Question from "../models/questionModel.js";
import { ApiError } from "../utils/apiError.js";

const fetchQuestionById = asyncHandler(async(req,res)=>{
    const {quesId} = req.params;
    const question = await Question.findById(quesId);
    if(!question){
        throw new ApiError(403, "Question not found")
    }
    res.status(201).json({
        success:true,
        question
    })
})

export {fetchQuestionById}