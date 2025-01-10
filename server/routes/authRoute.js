import express from 'express';
import { register, login, getAllUsers, getUser, googleLogin } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
import passport from 'passport';

const route = express.Router();

// Regular routes
route.post("/register", register);
route.post("/login", login);
route.get("/users", verifyToken, getAllUsers);
route.get("/", verifyToken, getUser);

// Google OAuth routes
route.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

route.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    googleLogin
);

export default route;
