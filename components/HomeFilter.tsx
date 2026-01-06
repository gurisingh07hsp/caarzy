'use client';
import { Model } from '@/types/Car'
import { useState } from 'react'
import { useRouter } from 'next/navigation';
import { mockBrands } from '@/data/mockBrands';
const HomeFilter = () => {
  const router = useRouter();
  const [brand, setBrand] = useState('');
  const [modelName, setModelName] = useState('');
  return (
    <div className='max-w-7xl mx-2 lg:h-24 grid md:grid-cols-3 grid-cols-3 lg:mx-auto bg-[#F6F6F6] rounded-2xl'>
      <div className='flex flex-col gap-2 p-4'>
        <label className='text-[#595959] text-xs md:text-[14px]'>Select Brand</label>
        <select className='text-xl'
        value={brand}
        onChange={(e)=> setBrand(e.target.value)}>
          <option value='' disabled>Choose</option>
          {mockBrands.map((brand,index)=>(
            <option key={index} value={brand.name.toLowerCase().replace(/\s+/, '-')}>{brand.name}</option>
          ))}
        </select>
      </div>
      <div className='flex flex-col gap-2 p-4'>
        <label className='text-[#595959] text-xs md:text-[14px]'>Enter Model</label>
        <input type="text" className='px-2' value={modelName} onChange={(e)=> setModelName(e.target.value)}/>
      </div>
      <div className='lg:ms-8 ms-4'>
        <button className='w-full h-full main-bg-color rounded-r-2xl text-white'
        onClick={()=> router.push(`/${brand}/${modelName.toLowerCase()}`)}>Search Car</button>
      </div>
    </div>
  )
}

export default HomeFilter
