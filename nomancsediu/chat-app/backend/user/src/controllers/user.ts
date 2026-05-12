import type { Request, Response, NextFunction } from "express"
import TryCatch from "../config/TryCatch.js"
import { redisClient } from "../index.js"
import { publishToQueue } from "../config/rabitmq.js";
import { User } from "../model/User.js";
import { generateToken } from "../config/generateToken.js";

// OTP Generation 
export const loginUser = TryCatch(async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body

  const rateLimitKey = `otp:ratelimit:${email}`
  const rateLimit = await redisClient.get(rateLimitKey)
  if(rateLimit)
  {
    res.status(429).json({
      success: false,
      message: "Too many requests. Please wait before requesting another OTP"
    });
    return;
  }


  const otp = Math.floor(100000 + Math.random() * 900000).toString()

  const otpKey = `otp:${email}`

  await redisClient.set(otpKey, otp,{
    EX: 300,
  });


  await redisClient.set(rateLimitKey, "true", {
    EX: 60,
  });

  const message = {
    to: email,
    subject: "Your OTP for Login",
    body: `Your OTP is ${otp}. It will expire in 5 minutes.`
  };

  await publishToQueue("send-otp", message)

  res.status(200).json({
    success: true,
    message: "OTP sent successfully"
  });
});


//OTP Verification 
export const verifyUser = TryCatch(async(req:Request, res:Response, next:NextFunction)=>
{
  const {email, otp:enteredOtp} = req.body

  if(!email || !enteredOtp)
  {
    res.status(400).json({
      message: "Email and OTP are required",
    });
    return;
  }

  const otpKey = `otp:${email}`

  const storedOtp = await redisClient.get(otpKey);

  if(!storedOtp || storedOtp != enteredOtp)
  {
    res.status(400).json({
      success: false,
      message: "Invalid or expired OTP",
    });

    return;
  }

  await redisClient.del(otpKey);

  let user = await User.findOne({email})

  if(!user)
  {
    const name = email.slice(0,8);
    user = await User.create({
      name,
      email
    });
  }
  else{
    const token = generateToken(user);
    res.json({
      message:"User Verified",
      token,
      user,
      success:true
    })
  }

});