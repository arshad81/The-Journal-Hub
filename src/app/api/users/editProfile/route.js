import User from "@/models/userModel";
import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import bcrypt from "bcryptjs"

export async function GET(req){
    try {
        await connectDB()
        const token = req.cookies.get("token").value
        console.log(token)
        if(!token){
            return NextResponse.json({error:"Unautorized"},{status:403})
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await User.findById(decoded.id).select("-password")
        return NextResponse.json(user);
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Invalid token"},{status:403})
    }
}

export async function POST(req){
    try {
        await connectDB()
        const token = req.cookies.get("token").value
        console.log(token)
        if(!token){
            return NextResponse.json({error:"Unauthorized"})
        }
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        const {name,email,password,bio} = await req.json();
        const userExists = await User.findOne({email})
        if(userExists){
            return NextResponse.json({message:"Email Already in use"})
        }  
        const hashedPassword = await bcrypt.hash(password,10)
        const updateUser = await User.findByIdAndUpdate(
            decode.id,
            {name,email,hashedPassword,bio}
        )        
        return NextResponse.json({message:"User Updated",user:updateUser})
    } catch (error) {
        console.log(error)
        return NextResponse.json({error:"Error"})
    }
}