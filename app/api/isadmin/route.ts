import {authUser} from '@/middleware/authMiddleware';
import { dbConnect } from "@/lib/dbConnect";

export async function GET(req: Request) {
  // Connect to the database
  await dbConnect();

    const { user, error } = await authUser(req);
    if (error) return error;

    if(user?.role == 'admin'){
        return new Response(
        JSON.stringify({ success: true, message: 'Access'}),
        {
            status: 200,
        })
    }

    return new Response(
    JSON.stringify({ success: false, message: 'UnAthorized'}),
    {
    status: 400,
  })
}