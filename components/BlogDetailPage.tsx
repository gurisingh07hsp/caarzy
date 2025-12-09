'use client';
import { BlogPost } from '@/types/BlogPost';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { Calendar, User } from 'lucide-react';

const BlogDetailPage = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
      fetchBlog();
    },[]);

    const fetchBlog = async() => {
        try{
            const response = await axios.get(`/api/manageblogs/${slug}`);
            if(response.status == 200){
                setBlog(response.data.blog);
            }
        }catch(error){
            console.error(error);
        }
        setLoading(false);
    }

    if(loading){
        return (
        <div className='h-[100vh] flex justify-center items-center text-2xl'>
            Loading...
        </div>
        )
    }

  return (
    <div className='w-[90vw] mb-8 mx-auto'>
        {blog != null ? (
            <div className='flex lg:flex-row flex-col gap-x-20 mt-6 w-full'>
              <div className='lg:w-[55vw] w-full min-h-[100vh] rounded-lg'>
                <h1 className='lg:text-4xl text-2xl font-semibold'>{blog.title}</h1>
                  <div className="flex items-center font-medium text-sm mt-4 ms-3 text-gray-900">
                    <div className='flex flex-wrap items-center gap-5'>
                      <div className='flex items-center gap-1'>
                        <User className='w-4 h-4 text-gray-400'/>
                        <p className='text-[#FF7101]'>{blog.author}</p>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Calendar className="w-3 h-3 ms-2 sm:w-4 sm:h-4 mr-1 text-gray-400 flex-shrink-0" />
                        <span>{new Date(blog?.publishDate || '').toLocaleDateString()}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 8.5V8C1.5 7.60218 1.65804 7.22064 1.93934 6.93934C2.22064 6.65804 2.60218 6.5 3 6.5H13C13.3978 6.5 13.7794 6.65804 14.0607 6.93934C14.342 7.22064 14.5 7.60218 14.5 8V8.5M8.70667 4.20667L7.29333 2.79333C7.20048 2.70037 7.09022 2.62661 6.96886 2.57628C6.84749 2.52595 6.71739 2.50003 6.586 2.5H3C2.60218 2.5 2.22064 2.65804 1.93934 2.93934C1.65804 3.22064 1.5 3.60218 1.5 4V12C1.5 12.3978 1.65804 12.7794 1.93934 13.0607C2.22064 13.342 2.60218 13.5 3 13.5H13C13.3978 13.5 13.7794 13.342 14.0607 13.0607C14.342 12.7794 14.5 12.3978 14.5 12V6C14.5 5.60218 14.342 5.22064 14.0607 4.93934C13.7794 4.65804 13.3978 4.5 13 4.5H9.414C9.14887 4.49977 8.89402 4.39426 8.70667 4.20667Z" stroke="#B6B6B6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <p>{blog.category}</p>
                      </div>
                      <p className='ms-6'>{blog.readTime} min Read time</p>
                    </div>
                </div>
                <hr className='my-6' />
                <div className='w-[100%] flex justify-center items-center h-64 lg:h-[400px]'>
                    <img src={blog.featuredImage} alt={blog.title} className='object-cover w-full h-full rounded-4xl' />
                </div>
                  <div className="flex flex-wrap gap-1 mt-4 ms-3">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                <p className='lg:text-[25px] text-lg mt-2 ms-3'>{blog?.excerpt}</p>
                <div
                className="
                    my-6 space-y-4 ms-3 text-gray-500
                    [&_h1]:text-3xl [&_h1]:font-bold
                    [&_h2]:text-2xl [&_h2]:font-bold
                    [&_h3]:text-xl [&_h3]:font-semibold
                    [&_h4]:text-xl [&_h4]:font-medium
                    [&_h5]:text-lg [&_h5]:font-medium
                    [&_h6]:text-base [&_h6]:font-medium
                    [&_p]:text-base [&_p]:leading-relaxed
                    [&_ol]:list-decimal [&_ol]:ml-6
                    [&_ul]:list-disc [&_ul]:ml-6
                    [&_li]:mb-1
                    [&_strong]:font-semibold
                    [&_u]:underline
                    [&_blockquote]:border-l-4 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-600
                    [&_a]:text-blue-600 [&_a]:underline [&_a]:hover:text-blue-800
                    [&_img]:rounded-lg [&_img]:my-4 [&_img]:max-w-full
                "
                dangerouslySetInnerHTML={{ __html: blog?.content || "" }}
                />
                </div>


                <div className='lg:w-[30%]'>
                  <h2 className='text-2xl font-medium mt-6'>Categories</h2>
                  <div className='divide divide-y-2 mt-8 space-y-4'>
                    <p>Market Updates</p>
                    <p className='pt-2'>Buying Tips</p>
                    <p className='pt-2'>Interior Inspiration</p>
                    <p className='pt-2'>Investment Insights</p>
                    <p className='pt-2'>Home Construction</p>
                    <p className='pt-2'>Legal Guidance</p>
                    <p className='pt-2'>Community Spotlight</p>
                  </div>

                  <div className='mt-10'>
                    <h3 className='text-2xl font-medium'>Featured Cars</h3>
                    <div>
                      <div className='flex gap-4 border-t mt-4 py-4'>
                        <div>
                          <img src={blog.image} alt="" className='w-28 h-20 object-cover rounded-lg' />
                        </div>
                        <div>
                          <h2 className='cursor-pointer'>{blog.title}</h2>
                          <div className='flex items-center gap-1'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.5 8.5V8C1.5 7.60218 1.65804 7.22064 1.93934 6.93934C2.22064 6.65804 2.60218 6.5 3 6.5H13C13.3978 6.5 13.7794 6.65804 14.0607 6.93934C14.342 7.22064 14.5 7.60218 14.5 8V8.5M8.70667 4.20667L7.29333 2.79333C7.20048 2.70037 7.09022 2.62661 6.96886 2.57628C6.84749 2.52595 6.71739 2.50003 6.586 2.5H3C2.60218 2.5 2.22064 2.65804 1.93934 2.93934C1.65804 3.22064 1.5 3.60218 1.5 4V12C1.5 12.3978 1.65804 12.7794 1.93934 13.0607C2.22064 13.342 2.60218 13.5 3 13.5H13C13.3978 13.5 13.7794 13.342 14.0607 13.0607C14.342 12.7794 14.5 12.3978 14.5 12V6C14.5 5.60218 14.342 5.22064 14.0607 4.93934C13.7794 4.65804 13.3978 4.5 13 4.5H9.414C9.14887 4.49977 8.89402 4.39426 8.70667 4.20667Z" stroke="#B6B6B6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p>{new Date(blog?.publishDate || '').toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      <div className='flex gap-4 border-t mt-4 py-4'>
                        <div>
                          <img src="#" alt="" className='w-28 h-20 rounded-lg' />
                        </div>
                        <div>
                          <h2>{blog.title}</h2>
                          <div className='flex items-center gap-1'>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1.5 8.5V8C1.5 7.60218 1.65804 7.22064 1.93934 6.93934C2.22064 6.65804 2.60218 6.5 3 6.5H13C13.3978 6.5 13.7794 6.65804 14.0607 6.93934C14.342 7.22064 14.5 7.60218 14.5 8V8.5M8.70667 4.20667L7.29333 2.79333C7.20048 2.70037 7.09022 2.62661 6.96886 2.57628C6.84749 2.52595 6.71739 2.50003 6.586 2.5H3C2.60218 2.5 2.22064 2.65804 1.93934 2.93934C1.65804 3.22064 1.5 3.60218 1.5 4V12C1.5 12.3978 1.65804 12.7794 1.93934 13.0607C2.22064 13.342 2.60218 13.5 3 13.5H13C13.3978 13.5 13.7794 13.342 14.0607 13.0607C14.342 12.7794 14.5 12.3978 14.5 12V6C14.5 5.60218 14.342 5.22064 14.0607 4.93934C13.7794 4.65804 13.3978 4.5 13 4.5H9.414C9.14887 4.49977 8.89402 4.39426 8.70667 4.20667Z" stroke="#B6B6B6" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <p>{new Date(blog?.publishDate || '').toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
            </div>
        ) : (
            <div className='h-[100vh] flex justify-center items-center text-2xl'>
                Blog not found
            </div>
        )}
    </div>
  )
}

export default BlogDetailPage
