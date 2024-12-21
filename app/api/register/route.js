import { NextResponse } from "next/server";
import User from "@/models/user";
import {connectMongoDB} from "@/lib/mongodb";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        const {email, password} = await req.json();
        console.log("Attempting to connect to MongoDB...");

        await connectMongoDB();
        console.log("MongoDB connected successfully");
        console.log("Checking for existing user...");
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
        console.log("Creating new user...");
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({email, password: hashedPassword});
        console.log("User created successfully");
        return NextResponse.json({message: "User created successfully"}, {status: 201})
    }catch(err){
        console.error("Error details:", err);
        return NextResponse.json(
            {
                message: "User creation failed",
                error: err.message,
                stack: err.stack
            }, 
            {status: 500}
        );
    }
}