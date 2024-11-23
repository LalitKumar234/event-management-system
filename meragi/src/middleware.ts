import type { NextRequest } from "next/server";
import { NextResponse } from "next/server"

export default function middleware(req: NextRequest) {
    const token = req.cookies.get('access_token')
    const url = req.url 

    // if(!token && url.includes("/dashboard")){
    //     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`)
    // }

    // if(token && url === `${process.env.NEXT_PUBLIC_CLIENT_URL}/signin`){
    //     return NextResponse.redirect(`${process.env.NEXT_PUBLIC_CLIENT_URL}/dashboard`)
    // }
}