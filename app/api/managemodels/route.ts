import Model from "@/models/model";
import { dbConnect } from "@/lib/dbConnect";
import {authUser} from '@/middleware/authMiddleware';


export async function GET(){
    await dbConnect();
    try{
        const models = await Model.find({});
        if(models){
            return new Response(
            JSON.stringify({ success: true, models}),
            {
                status: 200,
            })
        }
        if(!models){
            return new Response(
            JSON.stringify({ success: false, message: 'no models found'}),
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

  const {form} = body;
  const modelName = form.modelName;
  const brand = form.brand;

  try{
    const { user, error } = await authUser(req);
    if (error) return error;

    if(user?.role !== 'admin'){
        return new Response(
        JSON.stringify({ success: false, message: 'Forbidden Access - Admins Only'}),
        {
            status: 400,
        })
    }

    const isexist = await Model.findOne({modelName, brand});
    if(isexist){
        return new Response(JSON.stringify({success: false, message: 'Model already exist'}),
        {status: 400});
    }

  const newModel = await Model.create(form);

    return new Response(
    JSON.stringify({ success: true, message: 'Car Model added successfully'}),
    {
    status: 200,
  })
  }catch(error){
    console.error(error);
  }
}

export async function PUT(req: Request){
    await dbConnect();
    const body = await req.json();
    const {id, form} = body;

    try{
        const { user, error } = await authUser(req);
        if (error) return error;

        if(user?.role !== 'admin'){
            return new Response(
            JSON.stringify({ success: false, message: 'Forbidden Access - Admins Only'}),
            {
                status: 400,
            })
        }

        const isexist = await Model.findById(id);
        if(!isexist){
            return new Response(JSON.stringify({success: false, message: 'Model not found'}),
            {status: 400});
        }

        const updatedModel = await Model.findByIdAndUpdate(
            id,
            {$set: form},
            { new: true, runValidators: true }
        )
        if(updatedModel){
            return new Response(JSON.stringify({success: true, message: 'Model updated successfully'}),
            {status: 200});
        }

        return new Response(JSON.stringify({success: false, message: 'Faild to update model'}),
            {status: 400});
    }catch(error){
        console.error(error);
    }
}

export async function DELETE(req: Request){
    await dbConnect();
    const body = await req.json();
    const {id} = body;
    console.log(id);

    try{
        const { user, error } = await authUser(req);
        if (error) return error;

        if(user?.role !== 'admin'){
            return new Response(
            JSON.stringify({ success: false, message: 'Forbidden Access - Admins Only'}),
            {
                status: 400,
            })
        }

        const isexist = await Model.findById(id);
        if(!isexist){
            return new Response(JSON.stringify({success: false, message: 'Model not found'}),
            {status: 400});
        }

        const deleted = await Model.findByIdAndDelete(id)
        if(deleted){
            return new Response(JSON.stringify({success: true, message: 'Model Deleted successfully'}),
            {status: 200});
        }

        return new Response(JSON.stringify({success: false, message: 'Faild to Delete model'}),
            {status: 400});
    }catch(error){
        console.error(error);
    }
}