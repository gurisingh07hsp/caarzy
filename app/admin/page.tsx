'use client';
import { useState, useEffect } from 'react';
import { Car, Model } from '@/types/Car';
import { BlogPost } from '@/types/BlogPost';
import { AdminDashboard } from '@/components/AdminDashboard';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import CarLoadingComponent from '@/components/CarLoadingComponent';

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [models, setModels] = useState<Model[]>([]);
  const [cars, setCars] = useState<Car[]>([]);
  const [comparisons, setComparisons] = useState<any>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  const isAdmin = async() => {
    try{
      const response = await axios.get('/api/isadmin', {withCredentials: true});
      if(response.status != 200){
        router.push('/');
      }
    }catch(error){
        router.push('/');
    }
    
  }

  const fetchModels = async() => {
    try{
      const response = await axios.get('/api/managemodels');
      if(response.status == 200){
        setModels(response.data.models);
        console.log(response.data);
        setLoading(false);
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

  const fetchComparisons = async() => {
    try{
      const response = await axios.get('/api/managecomparison');
      if(response.status == 200){
        setComparisons(response.data.comparisons);
        console.log(response.data.comparisons);
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
    fetchComparisons();
    fetchBlogs();
    isAdmin();
   
  }, []);

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

  if (loading) {
    return (
      <CarLoadingComponent/>
    );
  }

  return (
    <AdminDashboard
      models={models}
      cars={cars}
      comparisons={comparisons}
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