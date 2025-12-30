import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import bcrypt from "bcryptjs";
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    await dbConnect();
    const body = await req.json();
    const {email} = body;
    const user = await User.findOne({ email, authProvider: 'credentials' });
    if (!user){
        return new Response(JSON.stringify({ message: "User not found" }),{ status: 400 });
    }
        

  const min = Math.pow(10, 4 - 1);
  const max = Math.pow(10, 4) - 1;
  const otp = Math.floor(min + Math.random() * (max - min + 1)).toString();
  const hashedOtp = await bcrypt.hash(otp, 10);

  user.otp = {
    code: hashedOtp,
    expiresAt: new Date(Date.now() + 5 * 60 * 1000),
  };
  await user.save();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL!,
      pass: process.env.EMAIL_PASS!,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL!,
    to: email,
    subject: "OTP for Login",
    html: `
    <div style="font-family: Arial, sans-serif; background:#f9f9f9; padding:20px; border:1px solid white; border-radius:8px;">
      <div style="max-width:600px; margin:auto; background:#fff; border-radius:8px; overflow:hidden; box-shadow:0 2px 6px rgba(0,0,0,0.1);">
        
        <!-- Header with logo or banner 
        <div style="width:100%; text-align:center;">
          <img src="https://stordial-staging.vercel.app/stordialemail.png" alt="Entity Logo" style="max-width:100%; height:auto; display:block; margin:0 auto;" />
        </div> -->
        
        <!-- Body -->
        <div style="padding:30px;">
          <h2 style="color:#333; margin-bottom:10px;">OTP for Login</h2>
          <p style="font-size:18px">Hi <b>${user.username}</b>,</p>
          <p>
            Use the following <span style="background:yellow; font-weight:bold;">One-Time Password (OTP)</span> 
            to log in to your dashboard. This OTP is valid for <b>5 minutes</b>.
          </p>
          
          <div style="text-align:center; margin:30px 0;">
            <div style="font-size:28px; letter-spacing:5px; font-weight:bold; padding:15px 25px; display:inline-block; background:#f2f2f2; border-radius:8px; border:1px solid #ddd;">
              ${otp}
            </div>
          </div>
          <p><b>Regards</b><br/><b>Caarzy</b></p>
        </div>
      </div>
    </div>
  `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error);
  }
  return new Response(JSON.stringify({ message: "OTP sent to email" }),{ status: 200 });
};