"use client"
import { useRouter } from 'next/navigation'
import { Button } from "./ui/button";
import Cookies from "js-cookie"

export default function TopNav (props: any){
    const router = useRouter()
    const handleLogout = () => {
        Cookies.remove('access_token')
        router.push('/signin')
    }
    return (
        <div {...props}>
            <p className="text-xl font-semibold text-secondary-foreground">Dashboard</p>
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
        </div>
    )
}