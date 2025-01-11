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
        required: false
    },
    googleId: {
        type: String,  // Store the Google ID as a string
        unique: true,
        sparse: true  // Ensures the googleId is unique but not required
    }
}, { timestamps: true });

export default mongoose.model("User", userModel);
