import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";

export async function POST(req: Request) {
    // Connect to the database
    await dbConnect();
        const body = await req.json();
    const { username, email} = body;

    let user = await User.findOne({ email });

    console.log("user : ", user);

    if (!user) {
      user = await User.create({
        username,
        email,
        authProvider: "google", // <-- new field
      });
    } else if (user.authProvider !== "google") {
    return new Response(
      JSON.stringify({ message: "Email already registered with credentials login" }),
      { status: 400 }
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