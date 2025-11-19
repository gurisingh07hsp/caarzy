import { dbConnect } from "@/lib/dbConnect";
import { Model } from "@/models";

export async function GET(
  req: Request,
  context: { params: Promise<{ brand: string; name: string }> }
) {
  try {
    await dbConnect();
    const { brand, name } = await context.params;
    console.log(brand, name);

    const car = await Model.findOne({ brand, modelName: name }).populate('variant');
    
    if(!car){
        return new Response(JSON.stringify({message: 'Car not found'}),{status: 404});
    }

    return new Response(JSON.stringify({car}), {status: 200});
  }catch(error){
    console.log(error);
  }
}