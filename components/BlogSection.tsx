'use client';

import React from 'react';
import { BlogPost } from '@/types/BlogPost';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export function BlogSection({ blogs }: BlogSectionProps) {
  const router = useRouter();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">From our blog</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest automotive trends, buying guides, and expert insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {blogs.map((blog, index) => (
          <div key={index} className='flex md:flex-row flex-col gap-4 lg:w-[600px] md:h-[200px]'>
            <div className='md:w-[400px] md:h-full relative h-[200px] rounded-2xl overflow-hidden'>
              <div className='bg-[#FF7101] text-white absolute top-2 left-2 rounded-full px-2 py-1'>{new Date(blog.publishDate).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric"
              })}</div>
              <img src={blog.featuredImage} alt={blog.title} className='rounded-2xl md:w-[400px] md:h-full hover:scale-105 transition-all duration-300' />
            </div>
            <div className='space-y-2'>
              <div className='flex gap-1 text-sm'>
                <p className='font-semibold'>{blog.author}</p>
                <p className='text-gray-300'> | </p>
                <p className='text-orange-600 font-semibold'>{blog.category}</p>
              </div>
              <p onClick={()=> router.push(`/blog/${blog.slug}`)} className='text-xl font-bold hover:text-orange-600 lg:w-[300px] w-full transition-colors duration-300 cursor-pointer'>{blog.title.length > 50 ? blog.title.slice(0,50) + '...' : blog.title}</p>
              <div className='lg:w-[260px] w-full text-sm'>{blog.excerpt.slice(0,110)}</div>
              <div>
                <Link href={`/blog/${blog.slug}`} className='font-semibold hover:text-orange-600 transition-colors duration-300'>Read more</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      {/* <div className="text-center mt-12">
        <button className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
          View All Articles
        </button>
      </div> */}
    </section>
  );
}




