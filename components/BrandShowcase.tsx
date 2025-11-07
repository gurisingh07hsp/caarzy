'use client';

import React from 'react';
import { Brand } from '@/types/Brand';

interface BrandShowcaseProps {
  brands: Brand[];
}

export function BrandShowcase({ brands }: BrandShowcaseProps) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-slate-900 mb-8 font-sans">Top Brands</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <div key={brand.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={brand.logo} alt={brand.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover" />
            <p className="font-medium text-slate-900">{brand.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}




