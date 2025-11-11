import User from "@/models/user";
import jwt from "jsonwebtoken";


export const authUser = async(req: Request) =>{
    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader?.split("; ").find((c) => c.startsWith("token="))?.split("=")[1];
    if(!token)
    {
       return { error: new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 }) };
    }  

    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as jwt.JwtPayload;
        const user = await User.findById(decoded._id);
        if (!user) {
            return { error: new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 }) };
        }
        return {user}

    } catch (error) {
       return { error: new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 }) };
    }
}
