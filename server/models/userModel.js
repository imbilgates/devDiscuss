import mongoose from 'mongoose';

const userModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "username is required"],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        lowercase: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"]
    }
}, { timestamps: true });

export default mongoose.model("User", userModel);