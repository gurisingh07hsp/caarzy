'use client';
import { BlogPost } from '@/types/BlogPost';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
const BlogPage = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const router = useRouter();

  useEffect(()=> {
    fetchBlogs();
  },[]);

  const fetchBlogs = async()=> {
    try{
      const response = await axios.get('/api/manageblogs');
      if(response.status === 200){
        setBlogs(response.data.blogs);
      }
    }catch(error){
      console.error('Error fetching popular cars: ', error);
    }
  }

  return (
    <div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Blog</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20">
        {blogs.map((blog, index) => (
          <div key={index} className='lg:w-[400px] h-[436px]'>
            <div className='w-full h-[250px] relative rounded-2xl overflow-hidden'>
              <div className='bg-[#FF7101] text-white absolute top-2 left-2 rounded-full px-2 py-1'>{new Date(blog.publishDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}</div>
              <img src={blog.featuredImage} alt={blog.title} className='rounded-2xl w-full h-full' />
            </div>
            <div className='space-y-2 mt-4'>
              <div className='flex gap-1 text-sm'>
                <p className='font-semibold'>{blog.author}</p>
                <p className='text-gray-300'> | </p>
                <p className='text-orange-600 font-semibold'>{blog.category}</p>
              </div>
              <p onClick={()=> router.push(`/blog/${blog.slug}`)} className='text-xl font-bold hover:text-orange-600 transition-colors duration-300 cursor-pointer'>{blog.title.length > 100 ? blog.title.slice(0,100) + '...' : blog.title}</p>
              <div className=' text-sm'>{blog.excerpt.slice(0,110)}</div>
              <div>
                <Link href={`/blog/${blog.slug}`} className='font-semibold hover:text-orange-600 transition-colors duration-300'>Read more</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
    </div>
  )
}

export default BlogPage
