import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const {email, password} = await req.json();
        console.log(email, password);
        return NextResponse.json({message: "User created successfully"}, {status: 201})
    }catch(err){
        return NextResponse.json({message: "User creation failed",err}, {status: 500})
    }
}