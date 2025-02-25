import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import User from "@/models/userModel";
import connectDB from "../../../../../lib/mongodb";
import jwt from "jsonwebtoken"

export async function POST(req) {
    try {
        await connectDB()
        const {email,password} = await req.json()
        if(!email || !password){
            return NextResponse.json({error:"Enter email and password"},{status:400})
        }
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User not found"},{status:400})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(isMatch){
            const token = jwt.sign({id: user._id},process.env.JWT_SECRET,{expiresIn:"1h"})

            const response = NextResponse.json({
                message: "Succesfull",
                user:{
                    id: user._id,
                    name: user.name,
                    email: user.email
                }
            },{status:200})

            response.cookies.set("token",token,{})
            return response;

        }
        else{
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

    } catch (error) {
        console.error("Login Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
} 