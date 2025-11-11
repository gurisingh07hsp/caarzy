import { dbConnect } from "@/lib/dbConnect";
import Car from "@/models/car";
import {authUser} from '@/middleware/authMiddleware';


export async function GET(){
    await dbConnect();
    try{
        const cars = await Car.find({});
        if(cars){
            return new Response(
            JSON.stringify({ success: true, cars}),
            {
                status: 200,
            })
        }
        if(!cars){
            return new Response(
            JSON.stringify({ success: false, message: 'no cars found'}),
            {
                status: 400,
            })
        }
    }catch(error){
        console.log('Error fetching cars: ', error);
    }
}

export async function POST(req: Request) {
  // Connect to the database
  await dbConnect();

  const body = await req.json();

  const {car} = body;

    const { user, error } = await authUser(req);
    if (error) return error;

    if(user?.role !== 'admin'){
        return new Response(
        JSON.stringify({ success: false, message: 'Forbidden Access - Admins Only'}),
        {
            status: 400,
        })
    }

  const newCar = await Car.create(car);

    return new Response(
    JSON.stringify({ success: true, newCar}),
    {
    status: 200,
  })
}