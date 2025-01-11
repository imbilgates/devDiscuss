import express from 'express';
import { register, login, getAllUsers, getUser, googleLogin, profileEdit } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const route = express.Router();

// Regular routes
route.post("/register", register);
route.post("/login", login);
route.get("/users", verifyToken, getAllUsers);
route.get("/", verifyToken, getUser);
route.put("/profile-edit", verifyToken, profileEdit);

// Google auth
route.post('/google', googleLogin)


export default route;
