'use client';

import React, { useState, useEffect } from 'react';
import { Car } from '@/types/Car';
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
import { CarCard } from '@/components/CarCard';
import { CarDetail } from '@/components/CarDetail';

export default function HomePage() {
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  // Load cars from localStorage on component mount
  useEffect(() => {
    const savedCars = localStorage.getItem('carwale-cars');
    if (savedCars) {
      setCars(JSON.parse(savedCars));
    }
    const savedBlogs = localStorage.getItem('carwale-blogs');
    if (savedBlogs) {
      setBlogs(JSON.parse(savedBlogs));
    }
  }, []);

  // Save cars to localStorage whenever cars change
  useEffect(() => {
    localStorage.setItem('carwale-cars', JSON.stringify(cars));
  }, [cars]);

  // Save blogs to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem('carwale-blogs', JSON.stringify(blogs));
  }, [blogs]);


  const handleCarClick = (car: Car) => {
    setSelectedCar(car);
  };

  const handleBackToList = () => {
    setSelectedCar(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {selectedCar ? (
        <CarDetail car={selectedCar} onBack={handleBackToList} />
      ) : (
        <div>
          <HeroSection searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <PopularCars cars={cars} onCarClick={handleCarClick} />
          <CompareSection comparisons={mockComparisons} />
          <UpcomingCars cars={cars} onCarClick={handleCarClick} />
          <AdvertisementSection />
          <BrandShowcase brands={mockBrands} />
          <Testimonials />
          <BlogSection blogs={blogs} />
        </div>
      )}
    </div>
  );
}