import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    universityRoll: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
    },
    role: {
        type: String,
        enum: ['student'],
        default: 'student',
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    allowedTests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }],
    image: String,

    
    
},{timestamps: true});

const User = mongoose.model("User", userSchema);
export default User;