import { dbConnect } from "@/lib/dbConnect";
import {Car} from "@/models";
import {Model} from "@/models";

export async function POST(
  req: Request,
  context: { params: Promise<{ CarId: string }> }
) {
  try {
    await dbConnect();
    const { CarId } = await context.params;
    console.log(CarId);

    const body = await req.json();

    const car = await Car.findById(CarId);
    
    if(!car){
        return new Response(JSON.stringify({message: 'Car not found'}),{status: 404});
    }
    const newCar = await Car.findByIdAndUpdate(
        CarId,
        { $push: { reviews: body } },
        { new: true }
    );
    return new Response(JSON.stringify({newCar}), {status: 200});
  }catch(error){
    console.log(error);
  }
}