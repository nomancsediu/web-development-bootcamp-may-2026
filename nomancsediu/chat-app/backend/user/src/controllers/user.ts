import type { Request, Response, NextFunction } from "express"
import TryCatch from "../config/TryCatch.js"
import { redisClient } from "../index.js"
import { publishToQueue } from "../config/rabitmq.js";

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