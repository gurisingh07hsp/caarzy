'use client';
import { Brand } from '@/types/Brand';
import { useRouter } from 'next/navigation';
interface BrandShowcaseProps {
  brands: Brand[];
}

export function BrandShowcase({ brands }: BrandShowcaseProps) {
  const router = useRouter();
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="md:text-3xl text-2xl font-bold text-slate-900 mb-8 font-sans">Top Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div onClick={()=>router.push(`/brand/${brand.name.toLowerCase().replace(/\s+/, ' ')}`)} key={brand.id} className="bg-white hover:shadow-md rounded-xl border cursor-pointer border-gray-100 shadow-sm p-4 text-center">
            <img src={brand.logo} alt={brand.name} className="w-28 h-20 mx-auto mb-3 object-contain" />
            <p className="font-medium text-slate-900">{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}




