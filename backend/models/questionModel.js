import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionText: {
    type: String,
    required: true
  },
  options: [
    {
      text: String,
      _id: false
    }
  ],
  correctIndex: {
    type: Number, // Index of the correct option in the options array
    required: true
  },
  marks: {
    type: Number,
    default: 1
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Question', questionSchema);
