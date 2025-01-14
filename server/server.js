import express from "express";
import { configDotenv } from "dotenv";
configDotenv();
import cors from "cors";

import discussRoute from './routes/discussRoute.js'
import authRoute from './routes/authRoute.js';
import { connectDB } from './config/db.js';

import path from 'path';
import { fileURLToPath } from "url";

// RESOLVING Dirname for ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

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

// use the client app
app.use(express.static(path.join(__dirname, 'client', 'dist')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

app.listen(PORT, () => { //192.168.1.2
    connectDB();
    console.log(`Server listening on ${PORT}`)
});