import express from 'express';
import { register, login, getAllUsers, getUser } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const route = express.Router();

// Regular routes
route.post("/register", register);
route.post("/login", login);
route.get("/users", verifyToken, getAllUsers);
route.get("/", verifyToken, getUser);


export default route;
