import mongoose from "mongoose";

const adminSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['admin', 'superadmin'],
        default: 'admin',
    },
    department: {
        type: String,
        required: true,
    },
    image: String,

},{timestamps: true});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;