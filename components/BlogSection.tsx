'use client';

import React from 'react';
import { BlogPost } from '@/types/BlogPost';

interface BlogSectionProps {
  blogs: BlogPost[];
}

export function BlogSection({ blogs }: BlogSectionProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">From our blog</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest automotive trends, buying guides, and expert insights
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog, index) => (
          <article 
            key={blog.id} 
            className={`bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${
              index === 0 ? 'lg:col-span-2' : ''
            }`}
          >
            {/* Image Container */}
            <div className="relative overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
              />
              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-white/90 backdrop-blur-sm text-gray-700 text-xs font-semibold px-3 py-1 rounded-full">
                  {blog.category}
                </span>
              </div>
              {/* Read Time Badge */}
              <div className="absolute top-4 right-4">
                <span className="bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full">
                  {blog.readTime} min read
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                {blog.excerpt}
              </p>
              
              {/* Author and Date */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span className="font-medium">{blog.author}</span>
                <span>{new Date(blog.publishDate).toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}</span>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {blog.tags.slice(0, 3).map((tag) => (
                  <span 
                    key={tag}
                    className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Read More Button */}
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors group-hover:shadow-md">
                Read More
              </button>
            </div>
          </article>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button className="bg-white border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl">
          View All Articles
        </button>
      </div>
    </section>
  );
}




