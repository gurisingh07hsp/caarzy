'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Car } from '@/types/Car';
import { Model } from '@/types/Car';
import axios from 'axios';
import AddCar from './AddCar';
import toast from "react-hot-toast";
import { Edit, Eye, Filter, Search, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

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
    description: string;
    colors: string[];
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
    description: '',
    colors: [],
    pros: [],
    cons: [],
    isFeatured: false,
    isLatest: false,
    launchDate: new Date()
  })

  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [operation, setOperation] = useState<'add' | 'update'>('add');
  const [images, setImages] = useState<string>('');
  const [pros, setPros] = useState<string>('');
  const [cons, setCons] = useState<string>('');
  const [colors, setColors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<string>('');
  const [isEditing, setIsEditing] = useState(false);
  const [newColor, setNewColor] = useState('');
  const [searchModelQuery, setSearchModelQuery] = useState('');
  const [searchCarQuery, setSearchCarQuery] = useState('');

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
    setNewColor('');
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
      cons: [],
      isFeatured: false,
      isLatest: false,
      launchDate: new Date()
    });
    setImages('');
    setPros('');
    setPros('');
    setCons('');
    setColors([]);
    setId('');
    setIsEditing(false);
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

  const handleModelSubmit = async(e: any) => {
    e.preventDefault();
    setLoading(true);
    if(!isEditing){
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
    else{
      try{
        const response = await axios.put(`/api/managemodels`, {id, form}, {withCredentials: true});
        if(response.status == 200){
          toast.success(response.data.message);
          resetData();
        }
      }catch(error){
        toast.error('Faild to Upated Model');
        console.log(error);
      }
      setIsEditing(false);
    }

    setLoading(false);
  }

  // Edit Models
  const handleEditModel = (model: Model) => {
    setForm({...form, ...model})
    const imgs = model.images.join(",");
    const pros = model.pros.join(',');
    const cons = model.cons.join(',');
    setIsEditing(true);
    setImages(imgs);
    setPros(pros);
    setCons(cons);
    setColors(model.colors);
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
          // router.refresh();
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
          // router.refresh();
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
        <input value={form.brand} onChange={(e)=> setForm({...form, brand: e.target.value.toLowerCase()})}  placeholder="Brand" className="border rounded-lg px-3 py-2" required />
        <select value={form.bodyType} onChange={(e)=> setForm({...form, bodyType: e.target.value})}  className="border rounded-lg px-3 py-2">
          {['SUV','Hatchback','Sedan','Coupe','Convertible','Wagon', 'Luxury', 'Pickup truck'].map((c) => (
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
        <div className="flex lg:flex-row flex-col lg:items-center gap-2">
          <input type="text" value={newColor} onChange={(e) => setNewColor(e.target.value)} className="py-2 px-2 border rounded-lg" />
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
                        <div className="text-xs sm:text-sm text-gray-500 truncate">{`${car?.description?.slice(0,25)}...`}</div>
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




