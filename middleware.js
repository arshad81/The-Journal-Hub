import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export function middleware(req){
    const token = req.cookies.get(token)

    if(!token){
        return Response.json({message:"Unauthorized"},{status:401})
    }

    try {
    jwt.verify(token,process.env.JWT_SECRET)
    return NextResponse.next();        
    } catch (error) {
        return NextResponse.json({error:"Error"},{status:403})
    }
}