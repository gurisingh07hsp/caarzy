'use client';

import React from 'react';

interface VariantFilterProps {
  selectedFuel: 'All' | 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
  onFuelChange: (fuel: VariantFilterProps['selectedFuel']) => void;
  selectedTransmission: 'All' | 'Manual' | 'Automatic' | 'Automatic (AMT)';
  onTransmissionChange: (t: VariantFilterProps['selectedTransmission']) => void;
}

export function VariantFilter({ selectedFuel, onFuelChange, selectedTransmission, onTransmissionChange }: VariantFilterProps) {
  const fuelOptions: VariantFilterProps['selectedFuel'][] = ['All','Petrol','Diesel','Electric','Hybrid','CNG'];
  const transmissionOptions: VariantFilterProps['selectedTransmission'][] = ['All','Manual','Automatic','Automatic (AMT)'];

  return (
    <div className="bg-white rounded-xl p-4">
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
        <span className="inline-flex items-center gap-2">
          <span className="text-gray-500">Filter</span>
          <span>By Fuel type & Transmission</span>
        </span>
      </div>

      <div className="flex gap-3">
        <div className="flex items-center gap-2 flex-wrap">

          <select
          value={selectedFuel}
          onChange={(e)=> onFuelChange(e.target.value as VariantFilterProps['selectedFuel'])}
          className='border px-2 py-1 rounded-sm'
          >
          {fuelOptions.map((opt)=>(
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>

        </div>
        <div className="flex items-center gap-2 flex-wrap">

        <select
          value={selectedTransmission}
          onChange={(e)=> onTransmissionChange(e.target.value as VariantFilterProps['selectedTransmission'])}
          className='border px-2 py-1 rounded-sm'
          >
          {transmissionOptions.map((opt)=>(
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        </div>
      </div>
    </div>
  );
}


