'use client';

import React, { useMemo, useState } from 'react';
import { VariantFilter } from './VariantFilter';
import { EmiCalculator } from './EmiCalculator';
import { Reviews } from './Reviews';
import { mockCars } from '@/data/mockCars';
import { Car } from '@/types/Car';
import { INDIA_LOCATIONS } from '@/data/indiaLocations';
import { div } from 'framer-motion/client';

interface CarDetailProps {
  car: Car
}

export function CarDetail({ car}: CarDetailProps) {
  const [selectedFuel, setSelectedFuel] = useState<'All' | 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG'>('All');
  const [selectedTransmission, setSelectedTransmission] = useState<'All' | 'Manual' | 'Automatic' | 'Automatic (AMT)'>('All');
  const [emiOpen, setEmiOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [quickFuel, setQuickFuel] = useState<'All' | 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG'>('All');
  const [selectedCity, setSelectedCity] = useState<string>('');

  const variants = useMemo(() => {
    const base = car.variants && car.variants.length > 0 ? car.variants : [
      { name: `${car.name} Sigma MT`, fuel: car.fuelType as any, transmission: 'Manual' as const, price: car.price * 0.95, specs: `${car.engineCapacity}, ${car.fuelType}, Manual` },
      { name: `${car.name} Delta MT`, fuel: car.fuelType as any, transmission: 'Manual' as const, price: car.price * 1.07, specs: `${car.engineCapacity}, ${car.fuelType}, Manual` },
      { name: `${car.name} Delta AGS`, fuel: car.fuelType as any, transmission: 'Automatic' as const, price: car.price * 1.2, specs: `${car.engineCapacity}, ${car.fuelType}, Automatic` },
      { name: `${car.name} Delta MT CNG`, fuel: 'CNG' as const, transmission: 'Manual' as const, price: car.price * 1.25, specs: `${car.engineCapacity}, CNG, Manual` },
    ];
    return base.filter(v => (selectedFuel === 'All' || v.fuel === selectedFuel) && (selectedTransmission === 'All' || v.transmission === selectedTransmission));
  }, [car, selectedFuel, selectedTransmission]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [breakupOpen, setBreakupOpen] = useState(false);
  const [breakupFor, setBreakupFor] = useState<{name: string; price: number} | null>(null);

  function openBreakup(name: string, price: number) {
    setBreakupFor({ name, price });
    setBreakupOpen(true);
  }

  function renderBreakup() {
    if (!breakupFor) return null;
    const price = breakupFor.price;
    // Simple illustrative breakup (can be wired to real APIs later)
    // If car has explicit breakup, proportionally scale to variant price if needed
    let exShowroom = Math.round(price * 0.86);
    let registration = Math.round(price * 0.08);
    let insurance = Math.round(price * 0.05);
    let other = Math.max(0, price - exShowroom - registration - insurance);
    if (car.priceBreakup) {
      const baseTotal = car.priceBreakup.exShowroom + car.priceBreakup.registration + car.priceBreakup.insurance + car.priceBreakup.other;
      const ratio = baseTotal > 0 ? (price / baseTotal) : 1;
      exShowroom = Math.round((car.priceBreakup.exShowroom) * ratio);
      registration = Math.round((car.priceBreakup.registration) * ratio);
      insurance = Math.round((car.priceBreakup.insurance) * ratio);
      other = Math.max(0, price - exShowroom - registration - insurance);
    }
    const rows = [
      { label: 'Ex-Showroom Price', value: exShowroom },
      { label: 'Registration (RTO)', value: registration },
      { label: 'Insurance', value: insurance },
      { label: 'Other Charges', value: other },
    ];
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={() => setBreakupOpen(false)} />
        <div className="relative bg-white rounded-xl shadow-xl border border-gray-200 w-full max-w-xl mx-4">
          <div className="px-6 py-4 border-b flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Price Breakup</p>
              <h3 className="text-lg font-semibold text-gray-900">{breakupFor.name}</h3>
            </div>
            <button onClick={() => setBreakupOpen(false)} className="text-gray-500 hover:text-gray-700">✕</button>
          </div>
          <div className="px-6 py-4">
            <div className="space-y-3">
              {rows.map(r => (
                <div key={r.label} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{r.label}</span>
                  <span className="font-medium">₹{(r.value/100000).toFixed(2)} Lakh</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t flex items-center justify-between">
              <span className="text-gray-900 font-semibold">On-Road Price</span>
              <span className="text-gray-900 font-bold">₹{(price/100000).toFixed(2)} Lakh</span>
            </div>
          </div>
          <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-end gap-3">
            <button onClick={() => setBreakupOpen(false)} className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100">Close</button>
            <button onClick={() => { setEmiOpen(true); setBreakupOpen(false); }} className="px-4 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">Check EMI</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button className="mb-6 text-orange-600 hover:underline">← Back to list</button>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {/* Gallery */}
        <div className="mb-6">
          <div className="relative rounded-xl overflow-hidden bg-gray-100">
            {showVideo && car.videos && car.videos[activeIndex] ? (
              <video controls className="w-full h-[360px] md:h-[460px] object-cover bg-black">
                <source src={car.videos[activeIndex]} />
              </video>
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <>
              {car?.images?.length !== 0 && (
                <></>
                // <img
                //   src={(car?.images[activeIndex] || car?.images[0])}
                //   alt={`${car.name} image ${activeIndex + 1}`}
                //   className="w-full h-[360px] md:h-[460px] object-cover"
                // />
              )}
              </>
            )}
            <div className="absolute bottom-3 left-3 flex gap-3">
              <button onClick={() => setShowVideo(true)} className={`px-3 py-1.5 rounded-lg text-sm shadow ${showVideo ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-900'}`}>Video</button>
              <button onClick={() => setShowVideo(false)} className={`px-3 py-1.5 rounded-lg text-sm shadow ${!showVideo ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-900'}`}>All Image</button>
            </div>
          </div>
          {/* Thumbnails strip */}
          <div className="mt-3 overflow-x-auto">
            <div className="flex gap-3 w-max">
              {/* {(showVideo && car.videos && car.videos.length ? car.videos : car.images).map((src, idx) => (
                <button
                  key={src + idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative rounded-xl overflow-hidden border ${activeIndex===idx ? 'border-gray-900' : 'border-transparent'}`}
                >
                  {showVideo ? (
                    <video className="h-28 w-48 object-cover bg-black" muted>
                      <source src={src} />
                    </video>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={src} alt={`thumb ${idx+1}`} className="h-28 w-48 object-cover" />
                  )}
                </button>
              ))} */}
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{car.name}</h1>
        <p className="text-slate-600 mb-4">{car.brand} • {car.category}</p>
        <p className="text-slate-700 mb-6">{car.description}</p>

        {/* Quick actions panel after description */}
        {variants.length > 0 && (
          <div className="rounded-2xl border border-gray-200 overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              <div className="p-4 border-b md:border-b-0 md:border-r">
                <p className="text-sm text-gray-600 mb-2">Variant</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <select value={quickFuel} onChange={(e) => setQuickFuel(e.target.value as any)} className="w-full border rounded-lg px-3 py-2">
                    {(['All','Petrol','Diesel','Electric','Hybrid','CNG'] as const).map(f => (
                      <option key={f} value={f}>{f}</option>
                    ))}
                  </select>
                  <select value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                    <option value="">Select Variant</option>
                    {variants
                      .filter(v => quickFuel==='All' || v.fuel===quickFuel)
                      .map(v => (
                        <option key={v.name} value={v.name}>{v.name}</option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="p-4 border-b md:border-b-0 md:border-r">
                <p className="text-sm text-gray-600 mb-2">Location</p>
                {(() => {
                  const allCities = Array.from(new Set(Object.values(INDIA_LOCATIONS).flat())).sort();
                  return (
                    <div className="grid grid-cols-1 gap-2">
                      <select value={selectedCity} onChange={(e) => setSelectedCity(e.target.value)} className="w-full border rounded-lg px-3 py-2">
                        <option value="">Select City</option>
                        {allCities.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  );
                })()}
              </div>
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">On-Road Price</p>
                {(() => {
                  const min = Math.min(...variants.map(v => v.price));
                  const max = Math.max(...variants.map(v => v.price));
                  return <p className="text-2xl font-bold">₹{(min/100000).toFixed(2)} - {(max/100000).toFixed(2)} Lakh</p>;
                })()}
                <div className="mt-3 flex items-center gap-3">
                  <button onClick={() => setEmiOpen(true)} className="text-blue-600 hover:underline">EMI Calculator</button>
                  <button className="px-3 py-2 rounded-lg bg-orange-500 text-white hover:bg-orange-600">Get Offers</button>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-slate-50 rounded-lg">Fuel: {car.fuelType}</div>
          <div className="p-3 bg-slate-50 rounded-lg">Transmission: {car.transmission}</div>
          <div className="p-3 bg-slate-50 rounded-lg">Seats: {car.seatingCapacity}</div>
          <div className="p-3 bg-slate-50 rounded-lg">Engine: {car.engineCapacity}</div>
          <div className="p-3 bg-slate-50 rounded-lg">Mileage: {car.mileage} km/l</div>
          <div className="p-3 bg-slate-50 rounded-lg">Price: ₹{(car.price / 100000).toFixed(2)}L</div>
        </div>

        {/* Variant filters like reference screenshot */}
        <div className="mt-8">
          <VariantFilter
            selectedFuel={selectedFuel}
            onFuelChange={setSelectedFuel}
            selectedTransmission={selectedTransmission}
            onTransmissionChange={setSelectedTransmission}
          />
        </div>

        {/* Variant list */}
        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
          <div className="grid grid-cols-12 bg-gray-50 text-gray-600 text-sm font-medium px-4 py-3">
            <div className="col-span-6">Variants</div>
            <div className="col-span-3">On-Road Price</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>
          {variants.map((v) => (
            <div key={v.name} className="grid grid-cols-12 items-center px-4 py-4 border-t text-sm">
              <div className="col-span-6">
                <p className="font-semibold text-gray-900">{v.name}</p>
                <p className="text-gray-600">{v.specs}</p>
              </div>
              <div className="col-span-3 font-semibold">₹{(v.price/100000).toFixed(2)} Lakh</div>
              <div className="col-span-3 flex justify-end gap-4">
                <button onClick={() => openBreakup(v.name, v.price)} className="text-orange-600 hover:underline">View Price Breakup</button>
                <button onClick={() => setEmiOpen(true)} className="text-blue-600 hover:underline">EMI Options</button>
              </div>
            </div>
          ))}
        </div>
          </div>
        </div>

        {/* Right Sidebar for Ads */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4">
            <div className="h-64 w-full bg-gray-100 border rounded-xl flex items-center justify-center text-gray-500">
              <span>Ad 300×600</span>
            </div>
            <div className="h-48 w-full bg-gray-100 border rounded-xl flex items-center justify-center text-gray-500">
              <span>Ad 300×250</span>
            </div>
            <div className="h-48 w-full bg-gray-100 border rounded-xl flex items-center justify-center text-gray-500">
              <span>Ad 300×250</span>
            </div>
          </div>
        </aside>
      </div>
      {/* Similar price segment compare table */}
      <div className="mt-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-4 py-4 border-b">
          <h3 className="text-lg font-semibold">Compare with similar price segment cars</h3>
        </div>
        {(() => {
          const similar = mockCars
            .filter(c => c._id !== car._id && Math.abs(c.price - car.price) <= car.price * 0.25)
            .sort((a,b) => a.price - b.price)
            .slice(0, 6);
          return (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50 text-gray-600">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Car</th>
                    <th className="text-left px-4 py-3 font-medium">Image</th>
                    <th className="text-left px-4 py-3 font-medium">On-Road Price</th>
                    <th className="text-left px-4 py-3 font-medium">Fuel</th>
                    <th className="text-left px-4 py-3 font-medium">Mileage</th>
                  </tr>
                </thead>
                <tbody>
                  {similar.map((s) => (
                    <tr key={s._id} className="border-t">
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-900">{s.brand} {s.name}</td>
                      <td className="px-4 py-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={s.images[0]} alt={s.name} className="w-28 h-16 object-cover rounded" />
                      </td>
                      <td className="px-4 py-3">₹{(s.price/100000).toFixed(2)} Lakh</td>
                      <td className="px-4 py-3">{s.fuelType}</td>
                      <td className="px-4 py-3">{s.mileage} km/l</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {similar.length === 0 && (
                <div className="px-4 py-6 text-sm text-gray-600">No similar cars found near this price.</div>
              )}
            </div>
          );
        })()}
      </div>
      {breakupOpen && renderBreakup()}
      <Reviews carId={car._id ?? ''} />
      <EmiCalculator open={emiOpen} onClose={() => setEmiOpen(false)} price={car.price} />
    </div>
  );
}




