import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if email already exists
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const existingUsername = await userModel.findOne({ name });
        if (existingUsername) {
            return res.status(400).json({ error: "username is alredy taken." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            message: "User registered successfully",
            user: {
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt,
                updatedAt: newUser.updatedAt,
                _id: newUser._id
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Find the user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = createToken(user);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                _id: user._id
            }
        });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong", details: error.message });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find().select("-password");
        res.status(200).json({
            message: "successfully fetched all users",
            users
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "there was an error fetching all users",
            details: error.message
        })
    }
};

export const getUser = async (req, res) => {
    const userId = req.user.id;
    try {
        const user = await userModel.findById(userId).select("-password");
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.status(200).json({
            message: "successfully fetched user",
            user
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "there was an error fetching user",
            details: error.message
        })
    }
};


const createToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};