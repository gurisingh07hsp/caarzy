import { dbConnect } from "@/lib/dbConnect";
import {Model} from "@/models";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await context.params;
    // console.log(slug);
    const car1Name = slug.split(' and ')[0];
    const car2Name = slug.split(' and ')[1];
    console.log(car1Name, car2Name);
    const car1 = await Model.findOne({ modelName: car1Name}).populate('variant');
    const car2 = await Model.findOne({ modelName: car2Name }).populate('variant');
    
    if(!car1 || !car2){
        return new Response(JSON.stringify({message: 'Car not found'}),{status: 404});
    }

    return new Response(JSON.stringify({car1, car2}), {status: 200});
  }catch(error){
    console.log(error);
  }
}