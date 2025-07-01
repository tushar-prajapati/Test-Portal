import mongoose from "mongoose";

const testSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question'
  }],
  durationMinutes: {
    type: Number,
    default: 30
  },
  testCode: {
    type: String,
    unique: true,
    required: true,  
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// testSchema.pre('validate', function (next) {
//   if (!this.testCode) {
//     this.testCode = Math.random().toString(36).substring(2, 8).toUpperCase();
//   }
//   next();
// });

const Test = mongoose.model('Test', testSchema);
export default Test;
