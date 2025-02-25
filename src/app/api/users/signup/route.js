import { NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import connectDB from "../../../../../lib/mongodb";
import User from "../../../../models/userModel"

export async function POST(req) {
    try {
        await connectDB();
        const {name,email,password} = await req.json();

        const existingUser = await User.findOne({email})
        if(existingUser){
            return NextResponse.json({error: "User already exists"},{status:400})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({name,email,password: hashedPassword})
        await newUser.save();

        return NextResponse.json({message:"User created successfully"},{status:201})

    } catch (error) {
        return NextResponse.json({message:"Error"+error},{status:500})
    }
}