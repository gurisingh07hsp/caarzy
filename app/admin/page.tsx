'use client';

import React, { useState, useEffect } from 'react';
import { Car, Model } from '@/types/Car';
import { BlogPost } from '@/types/BlogPost';
import { mockCars } from '@/data/mockCars';
import { mockBlogs } from '@/data/mockBlogs';
import { AdminDashboard } from '@/components/AdminDashboard';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function AdminPage() {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [models, setModels] = useState<Model[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const fetchModels = async() => {
    try{
      const response = await axios.get('/api/managemodels');
      if(response.status == 200){
        setModels(response.data.models);
        console.log(response.data);
      }
    }catch(error){
      console.log(error);
    }
  }

  const fetchCars = async() => {
    try{
      const response = await axios.get('/api/managecars');
      if(response.status == 200){
        setCars(response.data.cars);
        console.log(response.data);
      }
    }catch(error){
      console.log(error);
    }
  }

  const fetchBlogs = async() => {
    try{
      const response = await axios.get('/api/manageblogs');
      if(response.status == 200){
        setBlogs(response.data.blogs);
        console.log(response.data);
      }
    }catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    fetchModels();
    fetchCars();
    fetchBlogs();
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

  const handleAddCar = async(car: Car) => {
    try{
      const response = await axios.post('/api/managecars', {car}, {withCredentials: true});
      if(response.status === 200){
        console.log('Car added successfully');
        // setCars(prev => [...prev, car]);
      }
    }
    catch(error){
      console.error('Error adding car: ', error);
    }
  };

  const handleUpdateCar = (updatedCar: Model) => {
    // setCars(prev => prev.map(car => car._id === updatedCar._id ? updatedCar : car));
  };

  const handleDeleteCar = (id: string) => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      setCars(prev => prev.filter(car => car._id !== id));
    }
  };

  const handleAddBlog = async(blog: BlogPost) => {
    try{
      const response = await axios.post('/api/manageblogs', {form: blog}, {withCredentials: true});
      if(response.status == 200){
        toast.success(response.data.message);
        setBlogs(prev => [...prev, blog]);
      }
    }catch(error){
      toast.error('Faild to Add Blog');
      console.error(error);
    }
  };

  const handleUpdateBlog = async(updatedBlog: BlogPost) => {
    try{
      const response = await axios.put('/api/manageblogs', {id: updatedBlog, form: updatedBlog}, {withCredentials: true});
      if(response.status == 200){
        toast.success(response.data.message);
        setBlogs(prev => prev.map(blog => blog._id === updatedBlog._id ? updatedBlog : blog));
      }
    }catch(error){
      toast.error('Faild to update blog');
      console.error(error);
    }
  };

  const handleDeleteBlog = async(id: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await axios.delete('/api/manageblogs', {
          data: { id: id },
          withCredentials: true
        });
        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error('Failed to delete blog');
        console.error(error);
      }
      setBlogs(prev => prev.filter(blog => blog._id !== id));
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
      models={models}
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