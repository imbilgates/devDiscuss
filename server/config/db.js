import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Mongoose Connect: ${conn.connection.host}`);
        console.log(`Mongoose Connect: ${conn.connection.name}`);
    }catch (err) {
        console.log(err);
        process.exit(1);
    }
}
