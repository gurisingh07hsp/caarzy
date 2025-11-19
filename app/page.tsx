'use client';

import React, { useState, useEffect } from 'react';
import { Car } from '@/types/Car';
import { Model } from '@/types/Car';
import { BlogPost } from '@/types/BlogPost';
import { mockCars } from '@/data/mockCars';
import { mockBrands } from '@/data/mockBrands';
import { mockBlogs } from '@/data/mockBlogs';
import { mockComparisons } from '@/data/mockComparisons';
import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { PopularCars } from '@/components/PopularCars';
import { BrandShowcase } from '@/components/BrandShowcase';
import Testimonials from '@/components/ui/testimonials';
import { BlogSection } from '@/components/BlogSection';
import { CompareSection } from '@/components/CompareSection';
import { AdvertisementSection } from '@/components/AdvertisementSection';
import { UpcomingCars } from '@/components/UpcomingCars';
import axios from 'axios';

export default function HomePage() {
  const [models, setModels] = useState<Model[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);
  const [searchTerm, setSearchTerm] = useState('');

  // Load cars from localStorage on component mount
  const getModels = async() => {
    try{
      const response = await axios.get('/api/managemodels');
      if(response.status === 200){
        setModels(response.data.models);
      }
    }catch(error){
      console.error('Error fetching popular cars: ', error);
    }
  };
  useEffect(() => {
    getModels();
  }, []);

  // Save cars to localStorage whenever cars change
  useEffect(() => {
    localStorage.setItem('carwale-cars', JSON.stringify(models));
  }, [models]);

  // Save blogs to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem('carwale-blogs', JSON.stringify(blogs));
  }, [blogs]);


  return (
    <div className="min-h-screen bg-white">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
        <div>
          <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <PopularCars cars={models}/>
          <CompareSection comparisons={mockComparisons} />
          <UpcomingCars cars={cars}/>
          <AdvertisementSection />
          <BrandShowcase brands={mockBrands} />
          <Testimonials />
          <BlogSection blogs={blogs} />
        </div>
    </div>
  );
}