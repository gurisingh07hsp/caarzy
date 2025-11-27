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
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">From our blog</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest automotive trends, buying guides, and expert insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className='flex gap-4 w-[600px] h-[200px]'>
            <div className='w-[400px] h-full rounded-2xl overflow-hidden'>
              <img src={blog.featuredImage} alt={blog.title} className='rounded-2xl w-[400px] h-full hover:scale-105 transition-all duration-300' />
            </div>
            <div className='space-y-2'>
              <div className='flex gap-1 text-sm'>
                <p className='font-semibold'>{blog.author}</p>
                <p className='text-gray-300'> | </p>
                <p className='text-orange-600 font-semibold'>{blog.category}</p>
              </div>
              <p onClick={()=> router.push(`/blog/${blog.slug}`)} className='text-xl font-bold hover:text-orange-600 w-[300px] transition-colors duration-300 cursor-pointer'>{blog.title.length > 50 ? blog.title.slice(0,50) + '...' : blog.title}</p>
              <div className='w-[260px] text-sm'>{blog.excerpt.slice(0,110)}</div>
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
