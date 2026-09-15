import mongoose from "mongoose";
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const connectDB = async ()=>{
    mongoose.connection.on(`connected`,()=> console.log("Database Connected"));

    while (mongoose.connection.readyState !== 1) {
        try{
            await mongoose.connect(`${process.env.MONGODB_URI}/Hotel-Booking`, {
                serverSelectionTimeoutMS: 10000,
            })
        }catch (error){
            console.error("Database connection failed. Retrying in 5 seconds:", error.message);
            await new Promise((resolve) => setTimeout(resolve, 5000));
        }
    }
}

export default connectDB;