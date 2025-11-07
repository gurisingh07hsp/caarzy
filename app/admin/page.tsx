'use client';

import React, { useState, useEffect } from 'react';
import { Car } from '@/types/Car';
import { BlogPost } from '@/types/BlogPost';
import { mockCars } from '@/data/mockCars';
import { mockBlogs } from '@/data/mockBlogs';
import { AdminDashboard } from '@/components/AdminDashboard';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [cars, setCars] = useState<Car[]>(mockCars);
  const [blogs, setBlogs] = useState<BlogPost[]>(mockBlogs);

  // Load data from localStorage on component mount
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

  // read simple admin flag from localStorage
  useEffect(() => {
    const adminFlag = localStorage.getItem('autodeal-admin') === 'true';
    setIsAdmin(adminFlag);
  }, []);

  // Save cars to localStorage whenever cars change
  useEffect(() => {
    localStorage.setItem('carwale-cars', JSON.stringify(cars));
  }, [cars]);

  // Save blogs to localStorage whenever blogs change
  useEffect(() => {
    localStorage.setItem('carwale-blogs', JSON.stringify(blogs));
  }, [blogs]);

  const handleAddCar = (car: Car) => {
    setCars(prev => [...prev, car]);
  };

  const handleUpdateCar = (updatedCar: Car) => {
    setCars(prev => prev.map(car => car.id === updatedCar.id ? updatedCar : car));
  };

  const handleDeleteCar = (id: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(prev => prev.filter(car => car.id !== id));
    }
  };

  const handleAddBlog = (blog: BlogPost) => {
    setBlogs(prev => [...prev, blog]);
  };

  const handleUpdateBlog = (updatedBlog: BlogPost) => {
    setBlogs(prev => prev.map(blog => blog.id === updatedBlog.id ? updatedBlog : blog));
  };

  const handleDeleteBlog = (id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border rounded-xl p-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Admin Access Required</h1>
          <p className="text-gray-600 mb-6">Only admins can add or manage cars.</p>
          <button
            onClick={() => { localStorage.setItem('autodeal-admin','true'); setIsAdmin(true); }}
            className="px-5 py-3 rounded-lg bg-orange-500 text-white hover:bg-orange-600 w-full"
          >
            Continue as Admin (demo)
          </button>
        </div>
      </div>
    );
  }

  return (
    <AdminDashboard
      cars={cars}
      blogs={blogs}
      onAddCar={handleAddCar}
      onUpdateCar={handleUpdateCar}
      onDeleteCar={handleDeleteCar}
      onAddBlog={handleAddBlog}
      onUpdateBlog={handleUpdateBlog}
      onDeleteBlog={handleDeleteBlog}
    />
  );
}