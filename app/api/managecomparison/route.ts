import { CompareCar } from "@/models";
import { dbConnect } from "@/lib/dbConnect";
import {authUser} from '@/middleware/authMiddleware';


export async function GET(){
    await dbConnect();
    try{
        const comparisons = await CompareCar.find({}).populate('car1').populate('car2');
        if(comparisons){
            return new Response(
            JSON.stringify({ success: true, comparisons}),
            {
                status: 200,
            })
        }
        if(!comparisons){
            return new Response(
            JSON.stringify({ success: false, message: 'no comparisons found'}),
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

    const isexist = await CompareCar.findOne({form});
    if(isexist){
        return new Response(JSON.stringify({success: false, message: 'Comparison already exist'}),
        {status: 400});
    }

  const newModel = await CompareCar.create(form);

    return new Response(
    JSON.stringify({ success: true, message: 'Car Comparison added successfully'}),
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

        const isexist = await CompareCar.findById(id);
        if(!isexist){
            return new Response(JSON.stringify({success: false, message: 'Comparison not found'}),
            {status: 400});
        }

        const updatedComparison = await CompareCar.findByIdAndUpdate(
            id,
            {$set: form},
            { new: true, runValidators: true }
        )
        if(updatedComparison){
            return new Response(JSON.stringify({success: true, message: 'Comparison updated successfully'}),
            {status: 200});
        }

        return new Response(JSON.stringify({success: false, message: 'Faild to update comparison'}),
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

        const isexist = await CompareCar.findById(id);
        if(!isexist){
            return new Response(JSON.stringify({success: false, message: 'Comparison not found'}),
            {status: 400});
        }

        const deleted = await CompareCar.findByIdAndDelete(id)
        if(deleted){
            return new Response(JSON.stringify({success: true, message: 'Comparison Deleted successfully'}),
            {status: 200});
        }

        return new Response(JSON.stringify({success: false, message: 'Faild to Delete comparison'}),
            {status: 400});
    }catch(error){
        console.error(error);
    }
}