import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req: Request) {
  // Connect to the database
  await dbConnect();

  const body = await req.json();

  const {username,phone,email,password} = body;

  const isuser = await User.findOne({email});

  if(isuser)
  {
    return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
  }

  if(password.lenght < 6)
  {
    return new Response(
        JSON.stringify({ message: "Password should be atlest 6 character long" }),
        { status: 400 }
      );
  }

  const hashPassword = await (User as any).hashPassword(password);
  console.log(hashPassword);

  const user = await User.create({
      username: username,
      phone: phone,
      email: email,
      password: hashPassword,
      authProvider: "credentials",
  });

  const token = user.generateAuthToken();
    
    return new Response(
    JSON.stringify({ success: true, token, user }),
    {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
    }
  })
}