import Test from "../models/testModel.js";
import asyncHandler from '../middlewares/asyncHandler.js';
import Question from "../models/questionModel.js";
import User from "../models/userModel.js";
import { ApiError } from "../utils/apiError.js";


const createTest = asyncHandler(async (req, res) => {
    const { title, description, questions, durationMinutes, durationHours, id, testDateTime } = req.body;
    const durationMin = Number(durationMinutes);
    const durationHr = Number(durationHours);
    if (!title || !Array.isArray(questions) || questions.length === 0 || !id) {
            return res.status(400).json({ message: "All fields are required" });
    }
    const testCode = `t_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`


    const savedQuestionDocs = await Promise.all(
        questions.map(async (q) => {
            q.testCode = testCode;
            q.correctIndex = Number(q.correctIndex);
            q.marks = Number(q.marks);
          const newQuestion = new Question(q);
          const saved = await newQuestion.save();
          return saved._id;
        })
      );
  


    const duration = durationMin + durationHr * 60;


    
  
    const newTest = new Test({
        title,
        description,
        questions: savedQuestionDocs,
        durationMinutes: duration,
        testCode,
        createdBy: id,
        testDateTime: testDateTime,
    });


    
    const test = await newTest.save();

    savedQuestionDocs.map(async(id)=>{
        const question = await Question.findById(id);
        question.testId = test._id;
        await question.save();
    })


    
    res.status(201).json({
        success: true,
        message: "Test created successfully",
        test: newTest
    });
})

const getUpcomingTestsAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tests = await Test.find({ createdBy: id , isActive: true, testDateTime: { $gte: new Date() } })
        .populate('questions', 'questionText options correctIndex marks')
        .sort({ testDateTime: 1 });

    res.status(200).json({
        success: true,
        tests
    });
})

const getRecentTestsAdmin = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const tests = await Test.find({ createdBy: id, isActive: true, testDateTime: { $lt: new Date() } })
        .populate('questions', 'questionText options correctIndex marks')
        .sort({ testDateTime: -1 });

    res.status(200).json({
        success: true,
        tests
    });
})

const deleteTestById = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const test = await Test.findByIdAndDelete(testId);
    if (!test) {
        return res.status(404).json({ message: "Test not found" });
    }
    await Question.deleteMany({ _id: { $in: test.questions } });

    res.status(200).json({
        success: true,
        message: "Test deleted successfully"
    });
})

const fetchTestById = asyncHandler(async (req, res) => {
    const { testId } = req.params;
    const test = await Test.findById(testId)
        

    if (!test) {
        return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({
        success: true,
        test
    });
})

const updateTestById = asyncHandler(async(req, res)=>{
    const {testId} = req.params;
    const { title, description, questions, durationMinutes, durationHours, testDateTime}  = req.body;
    if (!title || !Array.isArray(questions) ) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const durationMin = Number(durationMinutes);
    const durationHr = Number(durationHours);
    const duration = durationMin + durationHr * 60;

    const test = await Test.findByIdAndUpdate(testId, {
        title,
        description,
        questions,
        durationMinutes: duration,
        testDateTime
    })

    if(!test){
        return res.status(404).json({message: "Test not found"})
    }
    res.status(200).json({
        success: true,
        message: "Test updated successfully"
    })
})

 const getAllowedLiveTestsForUser = asyncHandler(async (req, res) => {
    const { userId } = req.params;

  const user = await User.findById(userId).populate('allowedTests');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const now = new Date();

  const liveTests = user.allowedTests.filter((test) => {
    const startTime = new Date(test.testDateTime);
    const endTime = new Date(startTime.getTime() + test.durationMinutes * 60000);
    return now >= startTime && now <= endTime;
  });

  res.status(200).json({success: true, allowedTests: liveTests });
    });


const getAllowedUpcomingTestsForUser = asyncHandler(async (req, res) => {

    const { userId } = req.params;

  const user = await User.findById(userId).populate('allowedTests');

  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  const now = new Date();

  const upcomingTests = user.allowedTests.filter((test) => {
    const startTime = new Date(test.testDateTime);
    return now < startTime;
  });

  res.status(200).json({success:true, upcomingTests});
})

const getAllowedRecentTestsForUser = asyncHandler(async (req, res) => {
    const {userId} = req.params;

  const user = await User.findById(userId).populate('allowedTests');
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  const tests = user.allowedTests

  const now = new Date();

  const recentTests = tests.filter((test) => {
    const startTime = new Date(test.testDateTime);
    const endTime = new Date(startTime.getTime() + test.durationMinutes * 60000);
    return endTime < now;
  });

  res.status(200).json({
    success: true,
    recentTests,
  });
})

const deleteTestForUser = asyncHandler(async(req,res)=> {
    const {userId, testId} = req.body;
    const user = await User.findById(userId);
    if(!user){
        throw new ApiError(404, "User not found");
    }
    
    const allowedTests = user.allowedTests.filter((test) => test.toString() !== testId);
    console.log(allowedTests, testId)
    user.allowedTests = allowedTests;
    await user.save();
    res.status(200).json({
        success: true,
        message: "Test deleted successfully"
    });

})


export {createTest,
     getUpcomingTestsAdmin,
      getRecentTestsAdmin,
       deleteTestById,
        fetchTestById, 
        updateTestById,
         getAllowedLiveTestsForUser,
         getAllowedUpcomingTestsForUser,
         getAllowedRecentTestsForUser,
            deleteTestForUser
        };