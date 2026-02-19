'use client';
import { Brand } from '@/types/Brand';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface BrandShowcaseProps {
  brands: Brand[];
}

export function BrandShowcase({ brands }: BrandShowcaseProps) {
  const router = useRouter();
  const [num, setNum] = useState(6);
  return (
    <section id='brands' className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="md:text-2xl text-xl font-bold text-slate-900 mb-4 font-sans">Top Brands</h2>
      <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 md:gap-6">
        {brands.slice(0,num).map((brand,index) => (
          <div onClick={()=>router.push(`/brand/${brand.name.toLowerCase().replace(/\s+/, '-')}`)} key={index} className="bg-white hover:shadow-md rounded-xl border cursor-pointer border-gray-100 shadow-sm p-4 text-center">
            <img src={brand.logo} alt={brand.name} className="w-28 h-20 mx-auto mb-3 object-contain" />
            <p className="font-medium text-slate-900">{brand.name}</p>
          </div>
        ))}
      </div>
      <button
       onClick={()=> {num == 6 ? setNum(brands.length) : setNum(6); router.push('#brands')}}
       className='font-bold mt-2 flex items-center main-text-color'>{ num < 7 ? <>View All Brands <ArrowDown size={20}/></> : <>Less Brands <ArrowUp size={20}/></>}</button>
    </section>
  );
}




