'use client'

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit= async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            const response = await fetch(`${process.env.LOCAL_URL}/api/login`, {
                method: "POST",
                body: JSON.stringify({email, password})
            })
            if(!response.ok){
                throw new Error("Failed to create user");
            }
            const data = await response.json();
            console.log(data);
            router.push("/dashboard");
        }catch(err){
            console.log(err);
        }
    }

    return (
        <div>
            <h1>Login Page</h1>
            <form className="flex flex-col gap-2 items-center justify-center h-screen" onSubmit={handleSubmit}>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            <button className="bg-blue-500 text-white p-2 rounded-md" >Submit</button>
            </form>
        </div>
    )
}