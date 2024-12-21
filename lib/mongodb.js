import mongoose from "mongoose";


export default connectMongoDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err);
    }
}