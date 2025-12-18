import React, { useEffect, useState } from 'react'
import { CompareCar, Model } from '@/types/Car';
import { ChevronDown, Edit, Eye, Search, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface ComparePanelProps {
  models: Model[];
  comparisons: any;
}
const AdminComparePage = ({models, comparisons}: ComparePanelProps) => {
      const [filteredComparison, setFilteredComparison] = useState<CompareCar[]>(comparisons || []);
      const [compareCarFormOpen, setCompareCarFormOpen] = useState(false);
      const [form, setForm] = useState<{
        car1: string;
        car2: string;
      }>({
        car1: '',
        car2: '',
      })
      const router = useRouter();
    
    //   const [selectedCar, setSelectedCar] = useState<Co | null>(null);
      const [loading, setLoading] = useState(false);
      const [id, setId] = useState<string>('');
      const [isEditing, setIsEditing] = useState(false);
      const [searchModelQuery, setSearchModelQuery] = useState('');
      const [selectedModel, setSelectedModel] = useState('');
      const [selectedModel2, setSelectedModel2] = useState('');
      const [showModelDropdown, setShowModelDropdown] = useState(false);
      const [showModelDropdown2, setShowModelDropdown2] = useState(false);
      const [filteredModels, setFilteredModels] = useState<Model[]>(models);
      const [filteredModels2, setFilteredModels2] = useState<Model[]>(models);
    
    
      const resetData = ()=>{
        setForm({
          car1: '',
          car2: '',  
        });
        setId('');
        setIsEditing(false);
        setSelectedModel('');
        setFilteredModels([]);
        setFilteredModels2([]);
        setSelectedModel2('');
      }
    
      useEffect(()=>{
        if(searchModelQuery == ''){
          setFilteredModels([]);
        }
        // setFilteredComparison(comparisons.filter((c: any) => c.car1.includes(searchModelQuery) || c.car2.includes(searchModelQuery)));
      },[searchModelQuery]);

        const handleModelSubmit = async(e: any) => {
          e.preventDefault();
          setLoading(true);
          if(!isEditing){
            try{
              const response = await axios.post('/api/managecomparison', {form}, {withCredentials: true});
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
              const response = await axios.put(`/api/managecomparison`, {id, form}, {withCredentials: true});
              if(response.status == 200){
                toast.success(response.data.message);
                resetData();
              }
            }catch(error){
              toast.error('Faild to Upated Comparison');
              console.log(error);
            }
            setIsEditing(false);
          }
      
          setLoading(false);
        }

          // Edit comparison
          const handleEditModel = (comparison: any) => {
            setForm({...form, ...comparison})
            setSelectedModel(comparison.car1.modelName);
            setSelectedModel2(comparison.car2.modelName);
            setIsEditing(true);
            setId(comparison._id as string);
          }


            // Delete Models
        const handleDelete = async(comparison: any) => {
            if (!confirm(`Do you really want to delete ${comparison.car1.modelName} VS ${comparison.car2.modelName} Comparison`)) {
                return;
            }
            try {
                const response = await axios.delete('/api/managecomparison', {
                data: { id: comparison._id },
                withCredentials: true
                });
                if (response.status === 200) {
                toast.success(response.data.message);
                }
            } catch (error) {
                toast.error('Failed to delete Comparison');
                console.error(error);
            }
        }


        const handleModelChange = async(e: React.ChangeEvent<HTMLInputElement>, no: number) => {
            const filtered = models.filter(model => 
            model.modelName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            model.brand.toLowerCase().includes(e.target.value.toLowerCase())
            );
            if(no == 1){
                setSelectedModel(e.target.value);
                setFilteredModels(filtered);
                setShowModelDropdown(true);
            }
            else{
                setSelectedModel2(e.target.value);
                setFilteredModels2(filtered);
                setShowModelDropdown2(true);
            }
        };


          const handleModelSelect = (selectedModel: Model, no: number) => {
            if(no == 1){
                setSelectedModel(selectedModel.modelName);
                setForm({...form, car1: selectedModel?._id ?? ''});
                setShowModelDropdown(false);
            }
            else{
                setSelectedModel2(selectedModel.modelName);
                setForm({...form, car2: selectedModel?._id ?? ''});
                setShowModelDropdown2(false);
            }
          };

          const handleModelFocus = (no: number) => {
            if(no == 1){
                setShowModelDropdown(true);
            }
            else{
                setShowModelDropdown2(true);
            }
          };
  return (
    <div className='space-y-4'>
      <div id='ModelForm' className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Compare Cars</h2>
        <button
          onClick={() => setCompareCarFormOpen((v) => !v)}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
        >
          {compareCarFormOpen ? 'Hide Add Comparison' : 'Add Comparison'}
        </button>
      </div>

      {compareCarFormOpen && (
    <div className='bg-white rounded-lg border border-gary-200 p-6'>
        <form onSubmit={(e)=> handleModelSubmit(e)}>
        <div>
            <h2 className='text-xl font-medium'>Add Comparison</h2>
        </div>
        <div className='grid grid-cols-2 gap-4 mt-4'>
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="Select Car Model"
                value={selectedModel}
                onChange={(e)=> handleModelChange(e,1)}
                onFocus={()=> handleModelFocus(1)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              
              
              {showModelDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredModels.length > 0 ? (
                    filteredModels.filter((model, index, arr) => arr.indexOf(model) === index).map((model, index) => (
                      <button
                        key={index}
                        onClick={() => handleModelSelect(model,1)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <span className="text-gray-800">{model.modelName}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No models found
                    </div>
                  )}
                </div>
              )}
            </div> 


            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="Select Car Model"
                value={selectedModel2}
                onChange={(e)=> handleModelChange(e,2)}
                onFocus={()=> handleModelFocus(2)}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              
              
              {showModelDropdown2 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredModels2.length > 0 ? (
                    filteredModels2.filter((model, index, arr) => arr.indexOf(model) === index).map((model, index) => (
                      <button
                        key={index}
                        onClick={() => handleModelSelect(model,2)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <span className="text-gray-800">{model.modelName}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No models found
                    </div>
                  )}
                </div>
              )}
            </div>  
        </div>
      <div className='flex justify-end mt-4'>
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
                <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-cell">
                
                </th>
                <th className="px-3 sm:px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider table-cell">
                  Car Model
                </th>
                <th className="px-3 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredComparison.map((comparison: any) => (
                <tr key={comparison._id} className="hover:bg-gray-50">
                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                        <img
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
                          src={comparison.car1.images && comparison.car1.images[0]}
                          alt={comparison.car1.modelName}
                        />
                      </div>
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <div className="text-sm font-medium text-gray-900 break-words whitespace-normal">{comparison.car1.modelName}</div>
                        <div className="text-xs text-gray-500">
                          {comparison.car1.brand} • {comparison.car1.bodyType}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 sm:px-6 py-4 text-left whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      V/S
                    </div>
                  </td>

                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10">
                        <img
                          className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg object-cover"
                          src={comparison.car2.images && comparison.car2.images[0]}
                          alt={comparison.car2.modelName}
                        />
                      </div>
                      <div className="ml-3 sm:ml-4 min-w-0">
                        <div className="text-sm font-medium text-gray-900 break-words whitespace-normal">{comparison.car2.modelName}</div>
                        <div className="text-xs text-gray-500">
                          {comparison.car2.brand} • {comparison.car2.bodyType}
                        </div>
                      </div>
                    </div>
                  </td>


                  <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-1 sm:space-x-2">
                      <button
                        onClick={() => {handleEditModel(comparison); setCompareCarFormOpen(true); router.push('#ModelForm')}}
                        className="text-blue-600 hover:text-blue-900 p-1"
                        title="Edit"
                      >
                        <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button
                    //   onClick={(e) => { e.stopPropagation(); router.push(`/${model.brand.replace(/\s+/g, '-')}/${model.modelName.replace(/\s+/g, '-')}`)}}
                      className="text-gray-600 hover:text-gray-900 p-1" title="View">
                        <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                      <button 
                      onClick={()=>handleDelete(comparison)}
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
  )
}

export default AdminComparePage
