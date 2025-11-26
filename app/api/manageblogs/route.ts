import Blog from "@/models/blog";
import { dbConnect } from "@/lib/dbConnect";
import {authUser} from '@/middleware/authMiddleware';


export async function GET(){
    await dbConnect();
    try{
        const blogs = await Blog.find({});
        if(blogs){
            return new Response(
            JSON.stringify({ success: true, blogs}),
            {
                status: 200,
            })
        }
        if(!blogs){
            return new Response(
            JSON.stringify({ success: false, message: 'no blog found'}),
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

  const newBlog = await Blog.create(form);

    return new Response(
    JSON.stringify({ success: true, message: 'Blog added successfully'}),
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

        const isexist = await Blog.findById(id);
        if(!isexist){
            return new Response(JSON.stringify({success: false, message: 'Blog not found'}),
            {status: 400});
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            {$set: form},
            { new: true, runValidators: true }
        )
        if(updatedBlog){
            return new Response(JSON.stringify({success: true, message: 'Blog updated successfully'}),
            {status: 200});
        }

        return new Response(JSON.stringify({success: false, message: 'Faild to update Blog'}),
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

        const isexist = await Blog.findById(id);
        if(!isexist){
            return new Response(JSON.stringify({success: false, message: 'Model not found'}),
            {status: 400});
        }

        const deleted = await Blog.findByIdAndDelete(id)
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