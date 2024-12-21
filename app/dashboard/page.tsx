'use client'
import { useRouter } from 'next/navigation';

export default function Dashboard(){

    const router = useRouter();

    const handleLogout = async (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const response = await fetch(`${process.env.NEXT_PUBLIC_LOCAL_URL}/api/logout`, {
            method: "GET",
        })
        if(response.ok){
            router.push('/login');
        }
    }
    return(
        <div>
            <h1 className="text-white">Dashboard</h1>
            <button className="bg-red-500 text-white p-2 rounded-md" onClick={handleLogout}>Logout</button>
        </div>
    )
}