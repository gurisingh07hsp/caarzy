'use client';

import { useState, useEffect } from 'react';
import { Model } from '@/types/Car';
import { BlogPost } from '@/types/BlogPost';
import { mockBrands } from '@/data/mockBrands';
import { HeroSection } from '@/components/HeroSection';
import { PopularCars } from '@/components/PopularCars';
import { BrandShowcase } from '@/components/BrandShowcase';
import Testimonials from '@/components/ui/testimonials';
import { BlogSection } from '@/components/BlogSection';
import { CompareSection } from '@/components/CompareSection';
import { UpcomingCars } from '@/components/UpcomingCars';
import axios from 'axios';
import HomeFilter from '@/components/HomeFilter';
import PopularBrands from '@/components/PopularBrands';
import PopularQuestions from '@/components/PopularQuestions';
import ElectricCars from '@/components/ElectricCars';

export default function HomePage() {
  const [models, setModels] = useState<Model[]>([]);
  const [comparisons, setComparisons] = useState<any>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
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
  const getBlogs = async() => {
    try{
      const response = await axios.get('/api/manageblogs');
      if(response.status === 200){
        setBlogs(response.data.blogs.slice(0,4));
      }
    }catch(error){
      console.error('Error fetching popular cars: ', error);
    }
  }
  const getComparisons = async() => {
    try{
      const response = await axios.get('/api/managecomparison');
      if(response.status === 200){
        setComparisons(response.data.comparisons.slice(0,4));
      }
    }catch(error){
      console.error('Error fetching popular cars: ', error);
    }
  }
  useEffect(() => {
    getModels();
    getComparisons();
    getBlogs();
  }, []);

 

  return (
    <div className="min-h-screen bg-white">
        <div>
          <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <HomeFilter/>
          <PopularBrands cars={models}/>
          <PopularCars cars={models}/>
          <ElectricCars cars={models}/>
          <UpcomingCars cars={models}/>
          <Testimonials />
          <PopularQuestions/>
          <CompareSection comparisons={comparisons} />
          <BrandShowcase brands={mockBrands} />
          <BlogSection blogs={blogs} />
        </div>
    </div>
  );
}