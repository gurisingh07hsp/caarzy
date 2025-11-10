import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/user";
import jwt from "jsonwebtoken";
export async function GET(req: Request) {
    // Connect to the database
    await dbConnect();


    const cookieHeader = req.headers.get("cookie");
    const token = cookieHeader
        ?.split("; ")
        .find((c) => c.startsWith("token="))
        ?.split("=")[1];
    console.log("token : ", token);
    if (!token) {
        return new Response(
            JSON.stringify({ message: 'Unauthorized' }),
            { status: 400 }
        );
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);

        let user = null;
        if (typeof decoded !== "string" && decoded && (decoded as any)._id) {
            user = await User.findById((decoded as any)._id);
        }

        if (user) {

            return new Response(
                JSON.stringify({ user }),
                { status: 200 }
            );
        }

    } catch (err: any) {
        if (err.name === "TokenExpiredError") {
            return new Response(
                JSON.stringify({ message: "Token expired. Please log in again." }),
                { status: 401 }
            );
        } else if (err.name === "JsonWebTokenError") {
            return new Response(
                JSON.stringify({ message: "Invalid token" }),
                { status: 401 }
            );
        } else {
            console.error("JWT error:", err);
            return new Response(
                JSON.stringify({ message: "Internal server error" }),
                { status: 500 }
            );
        }
    }

    return new Response(
        JSON.stringify({ message: 'Unauthorized' }),
        { status: 400 }
    );


}