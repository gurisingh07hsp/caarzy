import { dbConnect } from "@/lib/dbConnect";
import Car from "@/models/car";
import Model from "@/models/model";
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

  const {carForm} = body;

  console.log(carForm);

    const { user, error } = await authUser(req);
    if (error) return error;

    if(user?.role !== 'admin'){
        return new Response(
        JSON.stringify({ success: false, message: 'Forbidden Access - Admins Only'}),
        {
            status: 400,
        })
    }

  const newCar = await Car.create(carForm);

  const model = await Model.findById(carForm.model);
  model.variant.push(newCar._id);

  await model.save();

    return new Response(
    JSON.stringify({ success: true, message: 'Car Added successfully'}),
    {
    status: 200,
  })
}

export async function PUT(req: Request){
    await dbConnect();
  const body = await req.json();

  const {id,carForm} = body;

  console.log(id,carForm);

    const { user, error } = await authUser(req);
    if (error) return error;

    if(user?.role !== 'admin'){
        return new Response(
        JSON.stringify({ success: false, message: 'Forbidden Access - Admins Only'}),
        {
            status: 400,
        })
    }

  const updatedCar = await Car.findByIdAndUpdate(
    id,
    {$set: carForm},
    { new: true, runValidators: true }
  )

    const model = await Model.findById(carForm.model);

    if (model) {
    const exists = model.variant.some(
        (id: any) => id.toString() === updatedCar._id.toString()
    );

    if (!exists) {
        model.variant.push(updatedCar._id);
        await model.save();
    }
    }


    return new Response(
    JSON.stringify({ success: true, message: 'Car updated successfully'}),
    {
    status: 200,
  })
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

        const isexist = await Car.findById(id);
        if(!isexist){
            return new Response(JSON.stringify({success: false, message: 'Car not found'}),
            {status: 400});
        }

        const deleted = await Car.findByIdAndDelete(id);
        if(deleted){
            return new Response(JSON.stringify({success: true, message: 'Car Deleted successfully'}),
            {status: 200});
        }

        return new Response(JSON.stringify({success: false, message: 'Faild to Delete Car'}),
            {status: 400});
    }catch(error){
        console.error(error);
    }
}