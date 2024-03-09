import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server.js";
import User from "../../../models/user.js";
import db from "../../../config/db.js";

export async function POST(request) {
  await db();
  const { phone,password,adhar_id,voter_id,fname,lname } = await request.json();

  const hashedPass = await bcrypt.hash(password, 10);
    const token = Math.floor(10000 + Math.random() * 90000);
    console.log(token)


  const user = await User.create({
    phone,
    password: hashedPass,
    adhar_id,
    voter_id,
    verification_token: token,
    first_name: fname,
    last_name: lname,
  });


  const accountSid = process.env.ACCOUNT_SID;
  const authToken = process.env.AUTH_TOKEN;
  const client = require("twilio")(accountSid, authToken);

  await client.messages.create({
    body: `🔐 Your OTP for platform access is: ${token}. Keep it confidential. Happy using our services! \n\n🔐 आपका OTP प्लेटफ़ॉर्म एक्सेस के लिए है: ${token}. इसे किसी से ना शेयर करें। हमारी सेवाओं का आनंद लें!`,
    from: "+18433001906",
    to: "+91"+phone,
  });

  return NextResponse.json({
    success: true,
    message: "Account Created! Please verify your OTP.",
  });
}
