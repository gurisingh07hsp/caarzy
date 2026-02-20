'use client';
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation';
import { mockBrands } from '@/data/mockBrands';
const HomeFilter = () => {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [modelName, setModelName] = useState('');

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
        <ul className="absolute w-full bg-white border rounded mt-1 shadow-md z-50 max-h-96 md:max-h-72 overflow-y-auto">
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
        {/* <select className='md:text-xl rounded-sm '
        value={brand}
        onChange={(e)=> setBrand(e.target.value)}>
          <option value='' disabled>Choose</option>
          {mockBrands.map((brand,index)=>(
            <option className='text-sm' key={index} value={brand.name.toLowerCase().replace(/\s+/, '-')}>{brand.name}</option>
          ))}
        </select> */}
      </div>
      <div className='flex flex-col gap-2 p-2 md:p-4'>
        <label className='text-[#595959] text-xs md:text-[14px]'>Enter Model</label>
        <input type="text" className='px-2 h-5 md:h-7 border-red-500 rounded-sm' value={modelName} onChange={(e)=> setModelName(e.target.value)}/>
      </div>
      <div className='lg:ms-8 ms-4'>
        <button className='w-full h-full main-bg-color rounded-r-2xl text-white'
        onClick={()=> router.push(`/${brand}/${modelName.toLowerCase()}`)}>Search Car</button>
      </div>
    </div>
  )
}

export default HomeFilter
