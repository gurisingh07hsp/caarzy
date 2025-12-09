'use client';

import React, { useState } from 'react';

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function HeroSection({ searchTerm, onSearchChange }: HeroSectionProps) {

  return (
    <div className="bg-white max-w-7xl lg:px-0 px-2 mx-auto mt-2">
      {/* Hero Background */}
      {/* url(https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg?auto=compress&cs=tinysrgb&w=1600) */}
      <div className='relative h-[530px] w-full'>
        <div 
          className="h-[500px] w-full inset-0 bg-cover bg-center bg-no-repeat rounded-3xl"
          style={{
            backgroundImage: 'url(/image.png)'
          }}
        >
        <div className='relative ms-4 w-max'>
          <div className='absolute top-10 ms-2'>
            <p className='font-semibold'>1 Year</p>
            <p>Warranty & Insurance</p>

            <div className='mt-5 flex gap-6'>
              <div className='text-[#595959] text-sm'>
                <p>Trusted by</p>
                <p>5000+ people</p>
              </div>
              <div className='flex mt-2'>
                <img src="#" alt="#" className='w-10 h-10 bg-gray-300 rounded-full'  />
                <img src="#" alt="#" className='w-10 h-10 bg-gray-300 rounded-full'/>
                <img src="#" alt="#" className='w-10 h-10 bg-gray-300 rounded-full'/>
              </div>
            </div>
          </div>
          <svg width="260" height="213" viewBox="0 0 360 213" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 25C0 11.1929 11.1929 0 25 0H207.488C212.074 0 216.572 1.26138 220.489 3.64611L251.511 22.5327C255.428 24.9174 259.926 26.1788 264.512 26.1788H335C348.807 26.1788 360 37.3717 360 51.1788V188C360 201.807 348.807 213 335 213H179.859C175.055 213 170.353 211.616 166.315 209.013L142.685 193.783C138.647 191.18 133.945 189.796 129.141 189.796H25C11.1929 189.796 0 178.603 0 164.796V25Z" fill="white"/>
          </svg>
        </div>


          <div className='w-12 lg:h-36 bg-white absolute top-72 right-0 rotate-45 border-none'></div>
          <div className='w-[70%] flex h-40 absolute bottom-0 lg:right-0 right-5'>
            <div className='relative w-full h-full flex'>
              <div className='h-36 w-9 bg-white rotate-[15deg] rounded-t-xl border-none'></div>
              <div className='w-full h-full absolute left-5 bg-white rounded-l-lg border-none'>
                <div className='lg:mt-8 mt-2 ms-6 flex lg:flex-row flex-col justify-between'>
                  <div className='max-w-80'>
                    <h1 className='lg:text-4xl'>Quality <b className='text-[#FF3F25]'>Cars</b> with <b className='text-[#FF3F25]'>Unbeatable</b> Deals</h1>
                  </div>
                  <div>
                    <div className='max-w-36 lg:text-sm text-xs lg:mt-0 mt-2 text-[#595959]'>We help you find the right car.</div>
                    <div className='text-xs lg:mt-5 mt-3'>4.9 star rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}