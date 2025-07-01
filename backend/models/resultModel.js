import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  test: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test',
    required: true
  },
  score: {
    type: Number,
    required: true
  },
  totalMarks: {
    type: Number,
    required: true
  },
  answers: [
    {
      question: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Question' 
        },
      selectedIndex: Number,
      isCorrect: Boolean,
    }
  ],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const Result = mongoose.model('Result', resultSchema);
export default Result;
