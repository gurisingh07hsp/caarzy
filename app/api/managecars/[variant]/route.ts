import { dbConnect } from "@/lib/dbConnect";
import {Car} from "@/models";
import {Model} from "@/models";

export async function GET(
  req: Request,
  context: { params: Promise<{ variant: string }> }
) {
  try {
    await dbConnect();
    const { variant } = await context.params;
    console.log(variant);

    const car = await Car.findOne({ name: variant}).populate('model');
     const model = await Model.findOne({ brand: car.model.brand, modelName: car.model.modelName }).populate('variant');
    
    if(!car){
        return new Response(JSON.stringify({message: 'Car not found'}),{status: 404});
    }

    return new Response(JSON.stringify({car, model}), {status: 200});
  }catch(error){
    console.log(error);
  }
}