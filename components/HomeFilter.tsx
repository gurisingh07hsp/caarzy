'use client';
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { mockBrands } from '@/data/mockBrands';
import axios from 'axios';
const HomeFilter = () => {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [models, setModels] = useState<string[]>([]);
  const [upcomingModels, setUpcomingModels] = useState<string[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);
  const [modelName, setModelName] = useState('');

  useEffect(()=> {
    const fetchModels = async() => {
      if(!brand) return;
        const response = await axios.get(`/api/managemodels`, {params: {brand: brand?.toString().toLowerCase().replace('-', ' ')}});
        if(response.status == 200){
          setModels(response.data.models.filter((car: any) => car.category !== 'Upcoming Cars').map((model: any) => model.modelName));
          setUpcomingModels(response.data.models.filter((car: any) => car.category === 'Upcoming Cars').map((model: any) => model.modelName));
            // setModels(response.data.models.map((model: any) => model.modelName));
        }
    }
    fetchModels();
  },[brand]);

  console.log("models new : ", models);

    useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideModel = (event: MouseEvent) => {
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target as Node)
      ) {
        setOpenModel(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideModel);
    return () => document.removeEventListener("mousedown", handleClickOutsideModel);
  }, []);


  return (
    <div className='max-w-5xl mx-2 lg:h-24 grid md:grid-cols-3 grid-cols-3 lg:mx-auto bg-[#F6F6F6] rounded-2xl'>
      <div className='flex flex-col gap-2 p-2 md:p-4'>
        <label className='text-[#595959] text-xs md:text-[14px]'>Select Brand</label>
    <div ref={dropdownRef} className="relative w-full">
      
      {/* Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-sm md:text-xl border rounded-sm px-2 flex justify-between items-center bg-white"
      >
        {brand || "Choose"}
        <span className="text-xs">▼</span>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute w-32 md:w-full bg-white border rounded mt-1 shadow-md z-50 max-h-96 md:max-h-72 overflow-y-auto">
          {mockBrands.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setBrand(item.name);
                setOpen(false); // ✅ Close after selecting
              }}
              className="text-sm md:text-base p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
      </div>
      <div className='flex flex-col gap-2 p-2 md:p-4'>
        <label className='text-[#595959] text-xs md:text-[14px]'>Select Model</label>
        <div ref={modelDropdownRef} className="relative w-full">
      
      {/* Button */}
      <button
        onClick={() => setOpenModel(!openModel)}
        disabled={!brand}
        className="w-full text-sm md:text-xl border rounded-sm px-2 flex justify-between items-center bg-white"
      >
        {modelName || "Choose"}
        <span className="text-xs">▼</span>
      </button>

      {/* Dropdown */}
      {openModel && (
        <ul className="absolute w-32 md:w-full bg-white border rounded mt-1 shadow-md z-50 max-h-96 md:max-h-72 overflow-y-auto">
          {models.length > 0 ? (models.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                setModelName(item);
                setOpenModel(false); // ✅ Close after selecting
              }}
              className="text-sm md:text-base p-2 hover:bg-gray-100 cursor-pointer"
            >
              {item}
            </li>
          ))) : (
              <li className="text-sm md:text-base p-2 text-gray-500">No models found</li>
            )
          }

          {upcomingModels.length > 0 && <div>
            <hr />
            <p className="text-center text-sm md:text-lg md:font-medium my-2">Upcoming Cars</p>
            <hr />
              {upcomingModels.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setModelName(item);
                  setOpenModel(false); // ✅ Close after selecting
                }}
                className="text-sm md:text-base p-2 hover:bg-gray-100 cursor-pointer"
              >
                {item}
              </li>
            ))}
            </div>
          }
        </ul>
      )}
    </div>
      </div>
      <div className='lg:ms-8 ms-4'>
        <button className='w-full h-full main-bg-color rounded-r-2xl text-white'
        onClick={()=> router.push(`/${brand.toLowerCase().replace(/\s+/g, '-')}/${modelName.toLowerCase().replace(/\s+/g, '-')}`)}>Search Car</button>
      </div>
    </div>
  )
}

export default HomeFilter
