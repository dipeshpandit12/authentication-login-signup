'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!email || !password){
            setError("Please fill in all fields");
            return;
        }
        try{
            console.log('Calling API:', `${process.env.NEXT_PUBLIC_LOCAL_URL}/api/register`);
            
            const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email, password})
            });

            console.log('Response status:', response.status);
            const data = await response.json();
            console.log('Response data:', data);

            if(!response.ok){
                throw new Error(data.message || "Failed to create user");
            }
            router.push("/login");
        }catch(err){
            console.error("Signup error details:", {
                error: err,
                url: process.env.NEXT_PUBLIC_LOCAL_URL,
                email: email
            });
            setError(err instanceof Error ? err.message : "Failed to create user");
        }
    }

    return (
        <div>
            <h1>Signup Page</h1>
            <form className="flex flex-col gap-2 items-center justify-center h-screen" onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="bg-blue-500 text-white p-2 rounded-md" >Submit</button>
            {
                error && <p className="text-red-500">{`${error}`}</p>
            }
            </form>
        </div>
    )
}