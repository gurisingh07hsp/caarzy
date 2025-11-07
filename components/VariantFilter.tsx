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
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center gap-3 text-sm text-gray-600 mb-3">
        <span className="inline-flex items-center gap-2">
          <span className="text-gray-500">Filter</span>
          <span>By Fuel type & Transmission</span>
        </span>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          {fuelOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => onFuelChange(opt)}
              className={`px-3 py-1.5 rounded-lg border text-sm ${
                selectedFuel === opt ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
        <div className="mx-2 h-6 w-px bg-gray-200" />
        <div className="flex items-center gap-2 flex-wrap">
          {transmissionOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => onTransmissionChange(opt)}
              className={`px-3 py-1.5 rounded-lg border text-sm ${
                selectedTransmission === opt ? 'bg-gray-900 text-white border-gray-900' : 'bg-white text-gray-700 hover:border-gray-300'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


