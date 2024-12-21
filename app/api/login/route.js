import { NextResponse } from "next/server";
export async function POST(req){
    try{
        const {email, password} = await req.json();
        if(email === "admin@gmail.com" && password === "admin"){
            return NextResponse.json({message: "User logged in successfully"}, {status: 200})
        }else{
            return NextResponse.json({message: "Invalid credentials"}, {status: 401})
        }
    }catch(err){
        return NextResponse.json({message: "User login failed", err}, {status: 500})
    }
}