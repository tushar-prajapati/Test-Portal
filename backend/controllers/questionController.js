import asyncHandler from "../middlewares/asyncHandler.js";
import Question from "../models/questionModel.js";
import { ApiError } from "../utils/apiError.js";
import Test from '../models/testModel.js'

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

const fetchQuestionsByTestId = asyncHandler(async(req,res)=>{
    const {testId} = req.params;
    const questions = await Question.find({testId});
    res.status(201).json({
        success:true,
        questions
    })
})

const updateQuestionById = asyncHandler(async(req,res)=>{
    const {quesId} = req.params;
    const {questionText,options, marks, correctIndex} = req.body;
    const question = await Question.findByIdAndUpdate(quesId,{
        questionText,
        options,
        marks,
        correctIndex        
    })
    res.status(201).json({
        success:true,
        question
    })
})

const deleteQuestionById = asyncHandler(async(req,res)=>{
    const {quesId} = req.params;
    const question = await Question.findByIdAndDelete(quesId);
    if(!question){
        throw new ApiError(403, "Question not found")
    }

    const test = await Test.findById(question.testId);

    if(!test){
        throw new ApiError(403, "Test not found")
    }

    const questions = test.questions.filter((q)=>q!=quesId);
    test.questions = questions;
    await test.save();
    
    res.status(201).json({
        success:true,
        message:"Question deleted successfully"
    })

})


export {fetchQuestionById, fetchQuestionsByTestId, updateQuestionById, deleteQuestionById}