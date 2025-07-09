import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [
    {
      type: String,
      _id: false
    }
  ],
  correctIndex: {
    type: Number, 
    required: true
  },
  marks: {
    type: Number,
    default: 1
  },
  testId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Test'
  },
  answered: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const Question = mongoose.model('Question', questionSchema);
export default Question;
