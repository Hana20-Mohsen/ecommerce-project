import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const connectDB= async()=>{
    try {
        
        const uri= process.env.CONNECTION_STRING;
        if(!uri){
            throw new Error("MONGODB_URI is missing. Check your .env file.");
        }
        await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error.message);
        process.exit(1);
    }
}


export default connectDB;