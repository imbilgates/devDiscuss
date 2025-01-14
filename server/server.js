import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";

import discussRoute from './routes/discussRoute.js'
import authRoute from './routes/authRoute.js';
import { connectDB } from './config/db.js';


const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));


app.use("/api/auth", authRoute)
app.use("/api/discussion", discussRoute)

app.listen(PORT, () => { //192.168.1.2
    connectDB();
    console.log(`Server listening on ${PORT}`)
});