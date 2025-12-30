import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";
export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const {email, otp} = body;
  let Otp = "";
  for (let i = 0; i < otp.length; i++) {
    Otp = Otp + otp[i];
  }

  const user = await User.findOne({ email });
  if (!user || !user.otp)
    return new Response(JSON.stringify({ message: "Invalid Request" }),{ status: 400 });

  const isMatch = await bcrypt.compare(Otp, user.otp.code);
  if (!isMatch || user.otp.expiresAt < new Date()) {
    return new Response(JSON.stringify({ message: "Invalid or expired OTP" }),{ status: 400 });
  }
  return new Response(JSON.stringify({ message: "OTP verified successfully!" }),{ status: 200 });
};