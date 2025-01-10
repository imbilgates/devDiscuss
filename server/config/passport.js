import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { configDotenv } from "dotenv";
import userModel from "../models/userModel.js";

configDotenv();

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error("Missing Google Client ID or Secret in environment variables");
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: "http://localhost:5000/api/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await userModel.findOne({ email: profile.emails[0].value });
                if (!user) {
                    user = await userModel.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: null,
                        provider: "google",
                    });
                }
                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    )
);

export default passport;
