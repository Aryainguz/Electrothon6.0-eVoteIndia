import User from "../../../models/user.js"
import db from "../../../config/db.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server.js"

export async function POST(request) {
    await db()
    const { phone, password } = await request.json()
    const user = await User.findOne({ phone: phone })
    if (!user) {
        return NextResponse.json({
            success: false,
            message: "User doesn't exists"
        })
    }
    else{
        const hashedPassword =user.password
        const isMatch = await bcrypt.compare(password, hashedPassword) 
        console.log(isMatch)
        if(!isMatch){
            return NextResponse.json({
                success: false,
                message: "Invalid Credentials"
            })
        }else{
            const token =await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "1d",
            })
            return NextResponse.json({
                success: true,
                message: "User Logged In",
                token: token
            })
        }
    }
}

