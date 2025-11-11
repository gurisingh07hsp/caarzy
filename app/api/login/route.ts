import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req: Request) {
    // Connect to the database
    await dbConnect();

  const body = await req.json();

  const {email,password} = body;
  console.log(email,password);

  const user = await User.findOne({email}).select('+password');
  console.log("user: ",user);

    if(!user)
    {
        return new Response(
            JSON.stringify({ message: "Invalid Email" }),
            { status: 401 }
          );
    }

    const validPassword = await (User as any).comparePassword(password,user.password);
    

    if(!validPassword){
      return new Response(
          JSON.stringify({ message: "Invalid Password" }),
          { status: 401 }
        );
    }

    const token = user.generateAuthToken();
    
    return new Response(
    JSON.stringify({ success: true, token, user }),
    {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": `token=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=604800`
    }
  }
);

}