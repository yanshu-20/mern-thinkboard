import mongoose from 'mongoose'

export const connectDB= async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MONGODB CONNECTED SUCCESSFULLY")

        
    } catch (error) {
        console.error("Eroor contecinng to MongoDB",error);
        process.exit(1);
        
    }
}