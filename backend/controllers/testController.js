import Test from "../models/testModel.js";
import asyncHandler from '../middlewares/asyncHandler.js';
import Question from "../models/questionModel.js";


const createTest = asyncHandler(async (req, res) => {
    const { title, description, questions, durationMinutes, durationHours, id, testDateTime } = req.body;
    const durationMin = Number(durationMinutes);
    const durationHr = Number(durationHours);
    if (!title || !Array.isArray(questions) || questions.length === 0 || !id) {
            return res.status(400).json({ message: "All fields are required" });
    }

    const savedQuestionDocs = await Promise.all(
        questions.map(async (q) => {
            q.correctIndex = Number(q.correctIndex);
            q.marks = Number(q.marks);
          const newQuestion = new Question(q);
          const saved = await newQuestion.save();
          return saved._id;
        })
      );
  


    const duration = durationMin + durationHr * 60;


    
    const testCode = `t_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`
  
    const newTest = new Test({
        title,
        description,
        questions: savedQuestionDocs,
        durationMinutes: duration,
        testCode,
        createdBy: id,
        testDateTime: testDateTime,
    });
    
    await newTest.save();
    
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
        .populate('questions', 'questionText options correctIndex marks')

    if (!test) {
        return res.status(404).json({ message: "Test not found" });
    }

    res.status(200).json({
        success: true,
        test
    });
})


export {createTest, getUpcomingTestsAdmin, getRecentTestsAdmin, deleteTestById, fetchTestById};