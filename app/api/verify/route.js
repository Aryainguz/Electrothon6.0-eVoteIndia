import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { NextResponse } from "next/server.js"
import User from "../../../models/user.js"
import db from "../../../config/db.js"




export async function POST(request) {
    await db() 
    const { token } = await request.json()

    const user = await User.findOne({ verification_token: token })
    
    if(user){
        await user.updateOne({
            verified: true
        })
        console.log(user)
        return NextResponse.json({
            success: true,
            message: "Account Verified!"
        })
    
    }
    else{
        return NextResponse.json(
            {
                success:false,
                message:"OTP is invalid"
            }
        )
    }
}

