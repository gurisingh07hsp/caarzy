import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";

export async function PUT(req: Request) {
  await dbConnect();
  const body = await req.json();
  const {email, newPassword} = body;
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return new Response(JSON.stringify({ message: "User not found" }),{ status: 404 });
  }
  const hashPassword = await (User as any).hashPassword(newPassword);
  user.password = hashPassword;
  await user.save();
  return new Response(JSON.stringify({ message: "Password has been Changed Successfully" }),{ status: 200 });
};