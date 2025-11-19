'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Car } from '@/types/Car';
import { Model } from '@/types/Car';
import { BlogPost } from '@/types/BlogPost';
import axios from 'axios';
import AddCar from './AddCar';
import toast from "react-hot-toast";

interface AdminPanelProps {
  cars: Model[];
  blogs: BlogPost[];
  onAddCar: (car: Car) => void;
  onUpdateCar: (car: Car) => void;
  onDeleteCar: (id: string) => void;
  onAddBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (id: string) => void;
}

export function AdminPanel({ cars, blogs, onAddCar }: AdminPanelProps) {
  const [formOpen, setFormOpen] = useState(true);
  const [form, setForm] = useState<{
    brand: string;
    modelName: string;
    bodyType: string;
    category: string;
    images: string[];
    description: string;
    colors: string[];
    pros: string[];
    cons: string[];
  }>({
    brand: '',
    modelName: '',
    bodyType: 'suv',
    category: '',
    images: [],
    description: '',
    colors: [],
    pros: [],
    cons: []
  })
  const [images, setImages] = useState<string>('');
  const [pros, setPros] = useState<string>('');
  const [cons, setCons] = useState<string>('');
  const [colors, setColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState('#ff6b00');
  const imageList = useMemo(() => images.split(/\s*,\s*/).filter(Boolean), [images]);
  const prosList = useMemo(() => pros.split(/\s*,\s*/).filter(Boolean), [pros]);
  const consList = useMemo(() => cons.split(/\s*,\s*/).filter(Boolean), [cons]);
  useEffect(()=> {
    setForm({...form, images: imageList});
  },[imageList]);

  useEffect(()=> {
    setForm({...form, colors: colors});
  },[colors]);

  useEffect(()=> {
    setForm({...form, pros: prosList});
  },[prosList]);
  useEffect(()=> {
    setForm({...form, cons: consList});
  },[consList]);

  function addColor() {
    if (!colors.includes(newColor)) setColors((c) => [...c, newColor]);
  }

  function removeColor(c: string) {
    setColors((list) => list.filter((x) => x !== c));
  }

  const resetData = ()=>{
    setForm({
      brand: '',
      modelName: '',
      bodyType: 'suv',
      category: '',
      images: [],
      description: '',
      colors: [],
      pros: [],
      cons: []
    })
  }

  const handleModelSubmit = async(e: any) => {
    e.preventDefault();
    try{
      const response = await axios.post('/api/managemodels', {form}, {withCredentials: true});
      if(response.status === 200){
        resetData();
         toast.success(response.data.message);
        console.log(response.data);
      }
    } catch(error){
      toast.error('Faild to Create Model');
      console.error(error);
    }
  }
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Cars</h2>
        <button
          onClick={() => setFormOpen((v) => !v)}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
        >
          {formOpen ? 'Hide Add Car' : 'Add Car'}
        </button>
      </div>

      <div className='bg-white rounded-lg border border-gary-200 p-6'>
        <form onSubmit={(e)=> handleModelSubmit(e)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input value={form.modelName} onChange={(e)=> setForm({...form, modelName: e.target.value.toLowerCase()})} placeholder="Model name" className="border rounded-lg px-3 py-2" required />
        <input value={form.brand} onChange={(e)=> setForm({...form, brand: e.target.value.toLowerCase()})}  placeholder="Brand" className="border rounded-lg px-3 py-2" required />
        <select value={form.bodyType} onChange={(e)=> setForm({...form, bodyType: e.target.value})}  className="border rounded-lg px-3 py-2">
          {['SUV','Hatchback','Sedan','Coupe','Convertible','Wagon', 'Luxury'].map((c) => (
            <option key={c} value={c.toLowerCase()}>{c}</option>
          ))}
        </select>
      </div>
      <textarea value={form.description} onChange={(e)=> setForm({...form, description: e.target.value})} placeholder="Description" className="border mt-4 rounded-lg px-3 py-2 w-full min-h-32" />
      <div>
        <label className="block mt-4 text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated)</label>
        <input value={images} onChange={(e) => setImages(e.target.value)} className="border rounded-lg px-3 py-2 w-full" placeholder="https://..., https://..." />
        {imageList.length > 0 && (
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {imageList.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="preview" className="w-16 h-16 object-cover rounded" />
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block mt-4 text-sm font-medium text-gray-700 mb-2">Colors</label>
        <div className="flex items-center gap-2">
          <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} className="w-10 h-10 p-0 border rounded" />
          <button type="button" onClick={addColor} className="px-3 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Add Color</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {colors.map((c) => (
            <button key={c} type="button" onClick={() => removeColor(c)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm">
              <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: c }} />
              {c}
              <span className="text-gray-500">×</span>
            </button>
          ))}
        </div>
        <div>
          <select required className='border px-3 py-2 rounded-lg' value={form.category} onChange={(e)=> setForm({...form, category: e.target.value})}>
            <option value={''}>Select Category</option>
            <option value={'Popular Cars'}>Popular Cars</option>
            <option value={'Electric Cars'}>Electric Cars</option>
            <option value={'Upcoming Cars'}>Upcoming Cars</option>
            <option value={'Latest Cars'}>Latest Cars</option>
            <option value={'Other'}>Other</option>
          </select>
        </div>
      </div>
      <textarea value={pros} onChange={(e)=> setPros(e.target.value)} placeholder="Pros" className="border mt-4 rounded-lg px-3 py-2 w-full min-h-24" />
      <textarea value={cons} onChange={(e)=> setCons(e.target.value)} placeholder="Cons" className="border mt-4 rounded-lg px-3 py-2 w-full min-h-24" />
      <div className='flex justify-end'>
        <input type="submit" value={'Create'} className=' bg-black rounded-md text-white py-2 px-3 cursor-pointer' />
      </div>
        </form>
      </div>

      {formOpen && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <AddCarForm onSubmit={onAddCar} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cars.map((car) => (
          <div key={car._id} className="p-4 bg-white rounded-lg border">
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={car.images[0]} alt={car.modelName} className="w-16 h-16 rounded object-cover mr-4" />
              <div>
                <p className="font-semibold text-gray-900">{car.brand} {car.modelName}</p>
                <p className="text-sm text-gray-600">{car.category}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {car.colors.map((c) => (
                    <span key={c} className="inline-flex items-center text-xs px-2 py-0.5 rounded-full border">
                      <span className="w-3 h-3 rounded-full mr-1 border" style={{ backgroundColor: c }} />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Manage Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 bg-white rounded-lg border">
            <p className="font-semibold text-gray-900">{blog.title}</p>
            <p className="text-sm text-gray-600">{blog.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddCarForm({ onSubmit }: { onSubmit: (car: Car) => void }) {
  return (
   <AddCar/>
  );
}




