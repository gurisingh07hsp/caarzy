'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Car } from '@/types/Car';
import { Model } from '@/types/Car';
import axios from 'axios';
import AddCar from './AddCar';
import toast from "react-hot-toast";
import { Edit, Eye, Search, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { mockBrands } from '@/data/mockBrands';
import dynamic from 'next/dynamic';

const TiptapEditor = dynamic(() => import('@/components/TipTapEditor'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>
});

interface AdminPanelProps {
  models: Model[];
  cars: Car[];
}

export function AdminPanel({cars,models}: AdminPanelProps) {
  const router = useRouter();
  const [filteredModels, setFilteredModels] = useState<Model[]>(models);
  const [filteredCars, setFilteredCars] = useState<Car[]>(cars);
  const [modelFormOpen, setModelFormOpen] = useState(false);
  const [variantFormOpen, setVariantFormOpen] = useState(false);
  const [form, setForm] = useState<{
    brand: string;
    modelName: string;
    bodyType: string;
    category: string;
    images: string[];
    exteriorImages: string[];
    interiorImages: string[];
    description: string;
    colors: {colorCode: string, colorName: string}[];
    pros: string[];
    cons: string[];
    isFeatured: boolean,
    isLatest: boolean,
    launchDate: Date
  }>({
    brand: '',
    modelName: '',
    bodyType: 'suv',
    category: '',
    images: [],
    exteriorImages: [],
    interiorImages: [],
    description: '',
    colors: [{colorCode: '', colorName: ''}],
    pros: [],
    cons: [],
    isFeatured: false,
    isLatest: false,
    launchDate: new Date()
  })

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [operation, setOperation] = useState<'add' | 'update'>('add');
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [exteriorImageFiles, setExteriorImageFiles] = useState<File[]>([]);
  const [interiorImageFiles, setInteriorImageFiles] = useState<File[]>([]);
  const [pros, setPros] = useState<string>('');
  const [cons, setCons] = useState<string>('');
  const [colors, setColors] = useState<{colorCode: string, colorName: string}[]>([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [newColor, setNewColor] = useState({
    colorCode: '',
    colorName: '',
  });
  const [searchModelQuery, setSearchModelQuery] = useState('');
  const [searchCarQuery, setSearchCarQuery] = useState('');


  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [exteriorPreviews, setExteriorPreviews] = useState<string[]>([]);
  const [interiorPreviews, setInteriorPreviews] = useState<string[]>([]);
  
  const [uploadingImages, setUploadingImages] = useState(false);
  const prosList = useMemo(() => pros.split(/\s*,\s*/).filter(Boolean), [pros]);
  const consList = useMemo(() => cons.split(/\s*,\s*/).filter(Boolean), [cons]);

  useEffect(()=> {
    setForm({...form, colors: colors});
    console.log(form);
  },[colors]);

  useEffect(()=> {
    setForm({...form, pros: prosList});
  },[prosList]);

  useEffect(()=> {
    setForm({...form, cons: consList});
  },[consList]);

function addColor() {
  // prevent empty values
  if (newColor.colorName == '' || newColor.colorCode == '') return;

  // check if color already exists
  const exists = colors.some(
    (color) =>
      color.colorName.toLowerCase() === newColor.colorName.toLowerCase()
  );

  if (!exists) {
    setColors((prev) => [...prev, newColor]);
  }

  // reset input
  setNewColor({
    colorCode: '',
    colorName: '',
  });
}

function removeColor(colorName: string) {
  setColors((prev) =>
    prev.filter((color) => color.colorName !== colorName)
  );
}

  const resetData = ()=>{
    setForm({
      brand: '',
      modelName: '',
      bodyType: 'suv',
      category: '',
      images: [],
      exteriorImages: [],
      interiorImages: [],
      description: '',
      colors: [],
      pros: [],
      cons: [],
      isFeatured: false,
      isLatest: false,
      launchDate: new Date()
    });
    setImageFiles([]);
    setExteriorImageFiles([]);
    setInteriorImageFiles([]);
    setImagePreviews([]);
    setExteriorPreviews([]);
    setInteriorPreviews([]);
    setPros('');
    setCons('');
    setColors([]);
    setNewColor({
      colorCode: '',
      colorName: ''
    });
    setIsEditing(false);
    setId('');
  }

  useEffect(()=>{
    if(searchModelQuery == ''){
      setFilteredModels(models);
    }
    setFilteredModels(models.filter(m => m.modelName.includes(searchModelQuery)));
  },[searchModelQuery]);

  useEffect(()=>{
    if(searchCarQuery == ''){
      setFilteredCars(cars);
    }
    setFilteredCars(cars.filter(m => m.name.includes(searchCarQuery)));
  },[searchCarQuery]);


    // Upload single image to Cloudinary
  const uploadImageToCloudinary = async (file: File): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!); // Replace with your Cloudinary upload preset
    // formData.append('cloud_name', 'your_cloud_name'); // Replace with your Cloudinary cloud name

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, // Replace with your cloud name
        formData
      );

    let url = response.data.secure_url;
    url = url.replace(
      '/upload/',
      '/upload/f_webp,q_auto:best,w_1920/'
    );
    
    return url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
      return null;
    }
  };

  // Upload multiple images
  const uploadMultipleImages = async (files: File[]): Promise<string[]> => {
    const uploadPromises = files.map(file => uploadImageToCloudinary(file));
    const results = await Promise.all(uploadPromises);
    return results.filter((url): url is string => url !== null);
  };


// Handle file selection with preview
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: 'featured' | 'exterior' | 'interior'
  ) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    // Create preview URLs
    const previewUrls = files.map(file => URL.createObjectURL(file));

    switch (type) {
      case 'featured':
        setImageFiles(prev => [...prev, ...files]);
        setImagePreviews(prev => [...prev, ...previewUrls]);
        break;
      case 'exterior':
        setExteriorImageFiles(prev => [...prev, ...files]);
        setExteriorPreviews(prev => [...prev, ...previewUrls]);
        break;
      case 'interior':
        setInteriorImageFiles(prev => [...prev, ...files]);
        setInteriorPreviews(prev => [...prev, ...previewUrls]);
        break;
    }
  };

  // Remove image from preview (before upload)
  const removePreviewImage = (
    index: number,
    type: 'featured' | 'exterior' | 'interior'
  ) => {
    switch (type) {
      case 'featured':
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => {
          URL.revokeObjectURL(prev[index]);
          return prev.filter((_, i) => i !== index);
        });
        break;
      case 'exterior':
        setExteriorImageFiles(prev => prev.filter((_, i) => i !== index));
        setExteriorPreviews(prev => {
          URL.revokeObjectURL(prev[index]);
          return prev.filter((_, i) => i !== index);
        });
        break;
      case 'interior':
        setInteriorImageFiles(prev => prev.filter((_, i) => i !== index));
        setInteriorPreviews(prev => {
          URL.revokeObjectURL(prev[index]);
          return prev.filter((_, i) => i !== index);
        });
        break;
    }
  };

  // Remove uploaded image (after upload)
  const removeUploadedImage = (
    index: number,
    type: 'featured' | 'exterior' | 'interior'
  ) => {
    switch (type) {
      case 'featured':
        setForm(prev => ({
          ...prev,
          images: prev.images.filter((_, i) => i !== index)
        }));
        break;
      case 'exterior':
        setForm(prev => ({
          ...prev,
          exteriorImages: prev.exteriorImages.filter((_, i) => i !== index)
        }));
        break;
      case 'interior':
        setForm(prev => ({
          ...prev,
          interiorImages: prev.interiorImages.filter((_, i) => i !== index)
        }));
        break;
    }
  };






  // Handle form submission
  const handleModelSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploadingImages(true);

    try {
      // Upload all new images to Cloudinary
      const [featuredUrls, exteriorUrls, interiorUrls] = await Promise.all([
        uploadMultipleImages(imageFiles),
        uploadMultipleImages(exteriorImageFiles),
        uploadMultipleImages(interiorImageFiles)
      ]);

      // Combine existing images with newly uploaded ones
      const updatedForm = {
        ...form,
        images: [...form.images, ...featuredUrls],
        exteriorImages: [...form.exteriorImages, ...exteriorUrls],
        interiorImages: [...form.interiorImages, ...interiorUrls],
        pros: pros.split('\n').filter(p => p.trim()),
        cons: cons.split('\n').filter(c => c.trim())
      };

      setUploadingImages(false);

      // Submit to backend
      if (!isEditing) {
        const response = await axios.post('/api/managemodels', 
          { form: updatedForm }, 
          { withCredentials: true }
        );
        
        if (response.status === 200) {
          toast.success(response.data.message);
          resetData();
        }
      } else {
        const response = await axios.put('/api/managemodels', 
          { id, form: updatedForm }, 
          { withCredentials: true }
        );
        
        if (response.status === 200) {
          toast.success(response.data.message);
          resetData();
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(isEditing ? 'Failed to update model' : 'Failed to create model');
    } finally {
      setLoading(false);
      setUploadingImages(false);
    }
  };

  // Edit Models
  const handleEditModel = (model: Model) => {
    const { colors, ...modelWithoutColors } = model;
    setForm({...form, ...modelWithoutColors})
    const pros = model.pros.join(',');
    const cons = model.cons.join(',');
    setIsEditing(true);
    setPros(pros);
    setCons(cons);
    const formattedColors = Array.isArray(model.colors) && typeof model.colors[0] === 'object' 
      ? (model.colors as unknown as {colorCode: string, colorName: string}[])
      : [{colorCode: '', colorName: ''}];
    setColors(formattedColors);
    setId(model._id as string);
  }

  // Delete Models
    const handleDelete = async(model: Model) => {
      if (!confirm(`Do you really want to delete ${model.brand} ${model.modelName} model`)) {
        return;
      }
      try {
        const response = await axios.delete('/api/managemodels', {
          data: { id: model._id },
          withCredentials: true
        });
        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error('Failed to delete model');
        console.error(error);
      }
    }

    const handleCarDelete = async(car: Car)=> {
      if (!confirm(`Do you really want to delete ${car.name}`)) {
        return;
      }
      try {
        const response = await axios.delete('/api/managecars', {
          data: { id: car._id },
          withCredentials: true
        });
        if (response.status === 200) {
          toast.success(response.data.message);
        }
      } catch (error) {
        toast.error('Failed to delete car');
        console.error(error);
      }
    }


  return (
    <div className="space-y-8">
      <div id='ModelForm' className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Models</h2>
        <button
          onClick={() => setModelFormOpen((v) => !v)}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
        >
          {modelFormOpen ? 'Hide Add Model' : 'Add Model'}
        </button>
      </div>

      {modelFormOpen && (
      <div className='bg-white rounded-lg border border-gary-200 p-6'>
        <form onSubmit={(e)=> handleModelSubmit(e)}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input value={form.modelName} onChange={(e)=> setForm({...form, modelName: e.target.value.toLowerCase()})} placeholder="Model name" className="border rounded-lg px-3 py-2" required />
        {/* <input value={form.brand} onChange={(e)=> setForm({...form, brand: e.target.value.toLowerCase()})}  placeholder="Brand" className="border rounded-lg px-3 py-2" required /> */}
        <select className='text-xl border rounded-lg px-3 py-2' required
        value={form.brand}
        onChange={(e)=> setForm({...form, brand: e.target.value})}>
          <option value='' disabled>Select Brand</option>
          {mockBrands.map((brand,index)=>(
            <option key={index} value={brand.name.toLowerCase().replace('-',' ')}>{brand.name}</option>
          ))}
        </select>
        <select value={form.bodyType} onChange={(e)=> setForm({...form, bodyType: e.target.value})}  className="border rounded-lg px-3 py-2">
          {['SUV','Hatchback','Sedan','Coupe','Convertible','Wagon', 'Luxury', 'Pickup truck'].map((c) => (
            <option key={c} value={c.toLowerCase()}>{c}</option>
          ))}
        </select>
      </div>
      
      <div className='mt-4'>
        <TiptapEditor
          value={form.description}
          onChange={(description: any) => setForm({ ...form, description: description })}
        />
      </div>
      {/* <textarea value={form.description} onChange={(e)=> setForm({...form, description: e.target.value})} placeholder="Description" className="border mt-4 rounded-lg px-3 py-2 w-full min-h-32" /> */}


        {/* Featured Images */}
        <div>
          <label className="block mt-4 text-sm font-medium text-gray-700 mb-1">
            Featured Images
          </label>
          <input 
            type='file' 
            multiple 
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'featured')} 
            className="border rounded-lg px-3 py-2 w-full" 
          />
          
          {/* Existing uploaded images */}
          {form.images.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mt-2">Uploaded Images:</p>
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {form.images.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={src} 
                      alt="uploaded" 
                      className="w-20 h-20 object-cover rounded border-2 border-green-500" 
                    />
                    <button
                      type="button"
                      onClick={() => removeUploadedImage(idx, 'featured')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Preview new images */}
          {imagePreviews.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mt-2">New Images (not uploaded yet):</p>
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={src} 
                      alt="preview" 
                      className="w-20 h-20 object-cover rounded border-2 border-blue-500" 
                    />
                    <button
                      type="button"
                      onClick={() => removePreviewImage(idx, 'featured')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Exterior Images */}
        <div>
          <label className="block mt-4 text-sm font-medium text-gray-700 mb-1">
            Exterior Images
          </label>
          <input 
            type='file' 
            multiple 
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'exterior')} 
            className="border rounded-lg px-3 py-2 w-full" 
          />
          
          {form.exteriorImages.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mt-2">Uploaded Images:</p>
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {form.exteriorImages.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={src} 
                      alt="uploaded" 
                      className="w-20 h-20 object-cover rounded border-2 border-green-500" 
                    />
                    <button
                      type="button"
                      onClick={() => removeUploadedImage(idx, 'exterior')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {exteriorPreviews.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mt-2">New Images (not uploaded yet):</p>
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {exteriorPreviews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={src} 
                      alt="preview" 
                      className="w-20 h-20 object-cover rounded border-2 border-blue-500" 
                    />
                    <button
                      type="button"
                      onClick={() => removePreviewImage(idx, 'exterior')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Interior Images */}
        <div>
          <label className="block mt-4 text-sm font-medium text-gray-700 mb-1">
            Interior Images
          </label>
          <input 
            type='file' 
            multiple 
            accept="image/*"
            onChange={(e) => handleFileChange(e, 'interior')} 
            className="border rounded-lg px-3 py-2 w-full" 
          />
          
          {form.interiorImages.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mt-2">Uploaded Images:</p>
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {form.interiorImages.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={src} 
                      alt="uploaded" 
                      className="w-20 h-20 object-cover rounded border-2 border-green-500" 
                    />
                    <button
                      type="button"
                      onClick={() => removeUploadedImage(idx, 'interior')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {interiorPreviews.length > 0 && (
            <div>
              <p className="text-xs text-gray-500 mt-2">New Images (not uploaded yet):</p>
              <div className="flex gap-2 mt-2 overflow-x-auto">
                {interiorPreviews.map((src, idx) => (
                  <div key={idx} className="relative group">
                    <img 
                      src={src} 
                      alt="preview" 
                      className="w-20 h-20 object-cover rounded border-2 border-blue-500" 
                    />
                    <button
                      type="button"
                      onClick={() => removePreviewImage(idx, 'interior')}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>



      <div>
        <label className="block mt-4 text-sm font-medium text-gray-700 mb-2">Colors</label>
        <div className="flex lg:flex-row flex-col lg:items-center gap-2">
          <input type="text" value={newColor.colorCode} onChange={(e) => setNewColor({...newColor, colorCode: e.target.value})} className="py-2 px-2 border rounded-lg" />
          <input type="text" value={newColor.colorName} onChange={(e) => setNewColor({...newColor, colorName: e.target.value})} className="py-2 px-2 border rounded-lg" />
          <button type="button" onClick={addColor} className="px-3 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Add Color</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {colors.map((c: any) => (
            <button key={c.colorName} type="button" onClick={() => removeColor(c.colorName)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm">
              <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: c.colorCode }} />
              {c.colorName}
              <span className="text-gray-500">×</span>
            </button>
          ))}
        </div>
        <div className='flex lg:flex-row flex-col gap-4 lg:items-center mt-2'>
          <select required className='border px-3 py-2 rounded-lg' value={form.category} onChange={(e)=> setForm({...form, category: e.target.value})}>
            <option value={''}>Select Category</option>
            <option value={'Popular Cars'}>Popular Cars</option>
            <option value={'Electric Cars'}>Electric Cars</option>
            <option value={'Upcoming Cars'}>Upcoming Cars</option>
            <option value={'Latest Cars'}>Latest Cars</option>
            <option value={'Other'}>Other</option>
          </select>

          <div>
            <input type="checkbox" checked={form.isFeatured} onChange={(e)=> setForm({...form, isFeatured: e.target.checked})} />
            <label className='ms-2'>isFeatured</label>
          </div>

          <div>
            <input type="checkbox" checked={form.isLatest} onChange={(e)=> setForm({...form, isLatest: e.target.checked})} />
            <label className='ms-2'>isLatest</label>
          </div>

          <div className='border p-1 rounded-lg'>
            <label className='ms-2'>Launch Date</label>
            <input type="date" value={form.launchDate instanceof Date ? form.launchDate.toISOString().split('T')[0] : ''} onChange={(e)=> setForm({...form, launchDate: new Date(e.target.value)})} />
          </div>
        </div>
      </div>
      <textarea value={pros} onChange={(e)=> setPros(e.target.value)} placeholder="Pros" className="border mt-4 rounded-lg px-3 py-2 w-full min-h-24" />
      <textarea value={cons} onChange={(e)=> setCons(e.target.value)} placeholder="Cons" className="border mt-4 rounded-lg px-3 py-2 w-full min-h-24" />
      <div className='flex justify-end'>
        <input type="submit" value={loading ? isEditing ? 'Updating...' : 'Creating...' : isEditing ? 'Update' : 'Create'} className=' bg-black rounded-md text-white py-2 px-3 cursor-pointer' />
      </div>
        </form>
        <div className='w-full flex justify-end mt-2'>
          <button onClick={resetData} className='bg-gray-300 p-2 rounded-lg'>Reset Form</button>
        </div>
      </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search models..."
              value={searchModelQuery }
              onChange={(e) => setSearchModelQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-80">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Car Model
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Car Brand
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Body Type
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Category
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredModels.map((model) => (
                <tr key={model._id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                        <img
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
                          src={model.images && model.images[0]}
                          alt={model.modelName}
                        />
                      </div>
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <div className="text-sm font-medium text-gray-900 break-words whitespace-normal">{model.modelName}</div>
                        <div className="sm:hidden text-xs text-gray-500">
                          {model.brand} • {model.bodyType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {model.brand.charAt(0).toUpperCase() + model.brand.slice(1)}
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center text-sm text-gray-900">
                      <span className="truncate">{model.bodyType.charAt(0).toUpperCase() + model.bodyType.slice(1)}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{model.category}</span>
                    </div>
                  </td>

                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <button
                        onClick={() => {handleEditModel(model); setModelFormOpen(true); router.push('#ModelForm')}}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                      onClick={(e) => { e.stopPropagation(); router.push(`/${model.brand.replace(/\s+/g, '-')}/${model.modelName.replace(/\s+/g, '-')}`)}}
                      className="text-gray-600 hover:text-gray-900 p-1" title="View">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button 
                      onClick={()=>handleDelete(model)}
                       className="text-red-600 hover:text-red-900 p-1" title="Delete">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div id='ModelForm' className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Cars</h2>
        <button
          onClick={() => setVariantFormOpen((v) => !v)}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
        >
          {variantFormOpen ? 'Hide Add Variant' : 'Add Variant'}
        </button>
      </div>

      {variantFormOpen && (
        <div id='CarForm' className="bg-white rounded-xl border border-gray-200 lg:p-6">
          <AddCar selectedCar={selectedCar} operation={operation} setOperation={setOperation}/>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 border border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
            <input
              type="text"
              placeholder="Search car variants..."
              value={searchCarQuery }
              onChange={(e) => setSearchCarQuery(e.target.value)}
              className="w-full pl-9 sm:pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-80">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Model Variant
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                  Engine Capacity
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                  Fule Type
                </th>
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                  Price
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCars.map((car) => (
                <tr key={car._id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <div className="text-sm font-medium text-gray-900 break-words whitespace-normal">{car.name}</div>
                        {/* <div className="text-xs sm:text-sm text-gray-500 truncate">{`${car?.description?.slice(0,25)}...`}</div> */}
                      </div>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        <span className="truncate">{car.engineAndTransmission.displacement} cc</span>
                    </span>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                    <div className="flex items-center text-sm text-gray-900">
                      <span className="truncate">{car.fuelAndPerformance.fuelType}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    <div className="flex items-center">
                      <span className="text-sm text-gray-900">{car.price}</span>
                    </div>
                  </td>
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <button
                        onClick={() => {setSelectedCar(car); setOperation('update'); setVariantFormOpen(true); router.push('#CarForm')}}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      {/* <button
                        onClick={()=>router.push(`${name}/${v.name.replace(/\s+/g, '-')}`)}
                        className="text-gray-600 hover:text-gray-900 p-1" title="View">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button> */}
                      <button 
                        onClick={()=>handleCarDelete(car)}
                        className="text-red-600 hover:text-red-900 p-1" title="Delete">
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


    </div>
  );
}

// function AddCarForm() {
//   return (
//   );
// }




