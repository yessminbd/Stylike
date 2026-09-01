import mongoose from "mongoose";

const connectDB = async () => {
    try {
        console.log("MONGO_URL exists:", !!process.env.MONGO_URL);

        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000,
        });

        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:");
        console.error(error.message);
        throw error;
    }
};

export default connectDB;
