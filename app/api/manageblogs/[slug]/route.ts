import { dbConnect } from "@/lib/dbConnect";
import Blog from "@/models/blog";

export async function GET(
  req: Request,
  context: { params: Promise<{ slug: string }> }
) {
  try {
    await dbConnect();
    const { slug } = await context.params;
    console.log(slug);

    const blog = await Blog.findOne({ slug: slug});
    
    if(!blog){
        return new Response(JSON.stringify({message: 'Blog not found'}),{status: 404});
    }

    return new Response(JSON.stringify({blog}), {status: 200});
  }catch(error){
    console.log(error);
  }
}