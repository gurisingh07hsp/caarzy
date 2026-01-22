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
  const [bodyTypeCounts, setBodyTypeCounts] = useState<Model[]>([]);
  const [popularCars, setPopularCars] = useState<Model[]>([]);
  const [upcomingCars, setUpcomingCars] = useState<Model[]>([]);
  const [electricCars, setElectricCars] = useState<Model[]>([]);
  const [comparisons, setComparisons] = useState<any>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Load cars from localStorage on component mount
  const getModels = async(category: string) => {
    try{
      const response = await axios.get('/api/managemodels',{
      params: {
        category: category,
        limit: 12
      }
    });
      if(response.status === 200){
        if(category === 'Popular Cars'){
          setPopularCars(response.data.models);
        }
        if(category === 'Upcoming Cars'){
          setUpcomingCars(response.data.models);
        }
        if(category === 'Electric Cars'){
          setElectricCars(response.data.models);
        }
      }
    }catch(error){
      console.error('Error fetching popular cars: ', error);
    }
  };
  const getBodyTypeCounts = async () => {
  try {
    const response = await axios.get('/api/managemodels/bodytypecounts');

    if (response.status === 200) {
      // console.log('Body Type Counts:', response.data.bodyTypeCounts);
      setBodyTypeCounts(response.data.bodyTypeCounts);
    }
  } catch (error) {
    console.error('Error fetching bodyType counts:', error);
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
    getModels('Popular Cars');
    getModels('Upcoming Cars');
    getModels('Electric Cars');
    getBodyTypeCounts();
    getComparisons();
    getBlogs();
  }, []);

 

  return (
    <div className="min-h-screen bg-white">
        <div>
          <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <HomeFilter/>
          <BrandShowcase brands={mockBrands} />
          <PopularCars cars={popularCars}/>
          <ElectricCars cars={electricCars}/>
          <UpcomingCars cars={upcomingCars}/>
          <Testimonials />
          <PopularQuestions/>
          <CompareSection comparisons={comparisons} />
          <PopularBrands bodyTypeCounts={bodyTypeCounts}/>
          <BlogSection blogs={blogs} />
        </div>
    </div>
  );
}