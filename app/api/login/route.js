import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req){
    try{
        const {email, password} = await req.json();
        if(email && password){
            await connectMongoDB();
            const user = await User.findOne({email});
            if(!user){
                return NextResponse.json({message: "User not found"}, {status: 404})
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if(!passwordMatch){
                return NextResponse.json({message: "Invalid credentials"}, {status: 401})
            }
            const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"});
            const response= NextResponse.json({message: "User logged in successfully", token}, {status: 200})
            response.cookies.set('token', token, {httpOnly: true});
            return response;
        }else{
            return NextResponse.json({message: "Invalid credentials"}, {status: 401})
        }
    }catch(err){
        console.error("Login error:", err);
        return NextResponse.json({message: "User login failed", error: err.message}, {status: 500})
    }
}