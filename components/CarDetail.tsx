'use client';
import React, { useState } from 'react';
import { VariantFilter } from './VariantFilter';
import { EmiCalculator } from './EmiCalculator';
import { Reviews } from './Reviews';
import { Model } from '@/types/Car';
import { CarIcon } from 'lucide-react';
import axios from 'axios';
import { useEffect} from 'react'
import { useParams } from "next/navigation";
import Link from 'next/link';

export function CarDetail() {
  const [selectedFuel, setSelectedFuel] = useState<'All' | 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG'>('All');
  const [selectedTransmission, setSelectedTransmission] = useState<'All' | 'Manual' | 'Automatic' | 'Automatic (AMT)'>('All');
  const [emiOpen, setEmiOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [variants, setVariants] = useState<any>([]);
  const [car, setCar] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [breakupOpen, setBreakupOpen] = useState(false);
  const [breakupFor, setBreakupFor] = useState<{name: string; price: number} | null>(null);
  const [loading, setLoading] = useState(true);
  const { brand, name } = useParams();
  const getCars = async()=> {
    try{
      const response = await axios.get(`/api/managemodels/${brand?.toString().replace(/-/g, ' ')}/${name?.toString().replace(/-/g, ' ')}`);
      if(response.status === 200){
        setCar(response.data.car);
        console.log(response.data.car);
      }
    }catch(error){
      console.error(error);
    }
      setLoading(false);
  }
  useEffect(() => {
    getCars();
    console.log(car);
  }, []);
  

  useEffect(()=> {
    let filterVariats = car?.variant;
    if(selectedFuel != 'All'){
      filterVariats = car.variant.filter((v:any)=> v.fuelAndPerformance.fuelType === selectedFuel);
    }
    if(selectedTransmission != 'All'){
      filterVariats = filterVariats.filter((v: any)=> v.engineAndTransmission.transmissionType === selectedTransmission);
    }
    setVariants(filterVariats);
    console.log("variants : ",filterVariats);
    
  },[car, selectedFuel, selectedTransmission]);

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
    const variant = car.variant.find((v:any)=> v.name == breakupFor.name);
    if (variant.priceBreakup) {
      const baseTotal = variant.priceBreakup.exShowroom + variant.priceBreakup.registration + variant.priceBreakup.insurance + variant.priceBreakup.other;
      console.log('baseTotal : ', baseTotal);
      const ratio = baseTotal > 0 ? (price / baseTotal) : 1;
      exShowroom = Math.round((variant.priceBreakup.exShowroom) * ratio);
      registration = Math.round((variant.priceBreakup.registration) * ratio);
      insurance = Math.round((variant.priceBreakup.insurance) * ratio);
      other = Math.max(0, price - exShowroom - registration - insurance);
    }
    const rows = [
      { label: 'Ex-Showroom Price', value: exShowroom },
      { label: 'Registration (RTO)', value: registration },
      { label: 'Insurance', value: insurance },
      { label: 'Other Charges', value: other },
    ];


    if(loading){
      return (
        <div>
          Loading....
        </div>
      )
    }
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-7">
      {loading ? (
        <div className='h-[100vh] w-[100%] flex justify-center items-center'>Loading...</div>
      ) : (
        <div>
          {car == null ? (
            <div>Car no found</div>
          ) : (
            <div>
                    {/* <button className="mb-6 text-orange-600 hover:underline">← Back to list</button> */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
        {/* Gallery */}
        <div className="mb-6">
          <div className="relative rounded-xl overflow-hidden bg-gray-100">
              <>
              {car?.images?.length > 0 ? (
                <img
                  src={(car?.images[activeIndex] || car?.images[0])}
                  alt={`${car.modelName} image ${activeIndex + 1}`}
                  className="w-full h-[360px] md:h-[460px] object-cover"
                />
              ) : (
                <div className='w-full h-[360px] md:h-[460px] flex items-center justify-center '>
                  <CarIcon className='w-20 h-20'/>
                </div>
              )}
              </>
            {/* <div className="absolute bottom-3 left-3 flex gap-3">
              <button onClick={() => setShowVideo(true)} className={`px-3 py-1.5 rounded-lg text-sm shadow ${showVideo ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-900'}`}>Video</button>
              <button onClick={() => setShowVideo(false)} className={`px-3 py-1.5 rounded-lg text-sm shadow ${!showVideo ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-900'}`}>All Image</button>
            </div> */}
          </div>
          {/* Thumbnails strip */}
          <div className="mt-3 overflow-x-auto">
            <div className="flex gap-3 w-max">
              {car?.images?.map((src: string, idx: number) => (
                <button
                  key={src + idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`relative rounded-xl overflow-hidden border ${activeIndex===idx ? 'border-gray-900' : 'border-transparent'}`}
                >
                    <img src={src} alt={`thumb ${idx+1}`} className="h-28 w-48 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">{car?.modelName?.charAt(0).toUpperCase() + car?.modelName?.slice(1)}</h1>
        <p className="text-slate-600 mb-4">{car?.brand?.charAt(0).toUpperCase() + car?.brand?.slice(1)} • {car.bodyType == 'suv' ? 'SUV' : car?.bodyType?.charAt(0).toUpperCase() + car?.bodyType?.slice(1)}</p>
                {/* Quick actions panel after description */}
        {car?.variant?.length > 0 && (
          <div className="rounded-2xl border border-gray-200 overflow-hidden mb-8">
            <div className="grid gap-0">
              <div className="p-4">
                <p className="text-sm text-gray-600 mb-1">On-Road Price</p>
                {(() => {
                  const min = Math.min(...car.variant.map((v: any) => v.price));
                  const max = Math.max(...car.variant.map((v: any) => v.price));
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
          <div className="p-3 bg-slate-50 rounded-lg">Engine:
            {(() => {
                  const min = Math.min(...car.variant.map((v: any) => v.engineAndTransmission.displacement));
                  const max = Math.max(...car.variant.map((v: any) => v.engineAndTransmission.displacement));
                  return <p>{min}cc - {max}cc</p>;
            })()}
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Power:
            {(() => {
                  const min = Math.min(...car.variant.map((v: any) => v.engineAndTransmission.maxPower));
                  const max = Math.max(...car.variant.map((v: any) => v.engineAndTransmission.maxPower));
                  return <p>{min} - {max}bhp</p>;
            })()}
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Seating Capacity:
            {(() => {
                  const max = Math.max(...car.variant.map((v: any) => v.dimensionsAndCapacity.seatingCapacity));
                  return <p>{max}</p>;
            })()}
             {car.variant[0].dimensionsAndCapacity.seatingCapacity}
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Torque: 
            {(() => {
                  const min = Math.min(...car.variant.map((v: any) => v.engineAndTransmission.maxTorque));
                  const max = Math.max(...car.variant.map((v: any) => v.engineAndTransmission.maxTorque));
                  return <p>{min}Nm - {max}Nm</p>;
            })()}
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Mileage: 
             {(() => {
                  const min = Math.min(...car.variant.map((v: any) => v.fuelAndPerformance.petrolMileageARAI));
                  const max = Math.max(...car.variant.map((v: any) => v.fuelAndPerformance.petrolMileageARAI));
                  return <p>{min} - {max}kmpl</p>;
            })()}
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Drive Type: {car.variant[0].engineAndTransmission.driveType}</div>
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
          {variants?.map((v: any, index: number) => (
            <div key={v.name} className="grid grid-cols-12 items-center px-4 py-4 border-t text-sm">
              <div className="col-span-6">
                <Link href={`${name}/${v.name.replace(/\s+/g, '-')}`} className="font-semibold text-gray-900">{v.name}</Link>
                <p className="text-gray-600 text-xs">{v.engineAndTransmission.displacement} cc, {v.engineAndTransmission.transmissionType}, {v.fuelAndPerformance.fuelType}, {v.fuelAndPerformance.petrolMileageARAI} kmpl </p>
              </div>
              <div className="col-span-3 font-semibold">₹{(v.price/100000).toFixed(2)} Lakh</div>
              <div className="col-span-3 flex justify-end gap-4">
                <button onClick={() => openBreakup(v.name, v.price)} className="text-orange-600 hover:underline">View Price Breakup</button>
                <button onClick={() => {setEmiOpen(true); setIndex(index)}} className="text-blue-600 hover:underline">EMI Options</button>
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

      <div className='mt-4 border border-gray-200 p-5 rounded-2xl'>
        <p className='text-lg font-semibold'>Description</p>
        <p className="text-slate-700">{car.description}</p>
      </div>
      
      <div className="mt-6 border border-gray-200 p-5 rounded-2xl max-w-2xl">
  <h2 className="text-xl font-semibold mb-4">
    Pros & Cons of{" "}
    <span className="capitalize">{car.brand}</span>{" "}
    <span className="capitalize">{car.modelName}</span>
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    
    {/* PROS */}
    <div className="bg-[#f5fbf8] p-4 rounded-xl border border-emerald-100">
      <h3 className="font-medium text-emerald-600 mb-2">Pros</h3>
      <ul className="space-y-2">
        {car.pros?.map((p: string, index: number) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600"></span>
            <span className="text-gray-700m w-[90%]">{p}</span>
          </li>
        ))}
      </ul>
    </div>

    {/* CONS */}
    <div className="bg-[#fff5f5] p-4 rounded-xl border border-red-100">
      <h3 className="font-medium text-red-600 mb-2">Cons</h3>
      <ul className="space-y-2">
        {car.cons?.map((c: string, index: number) => (
          <li key={index} className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-red-600"></span>
            <span className="text-gray-700 w-[90%]">{c}</span>
          </li>
        ))}
      </ul>
    </div>

  </div>
</div>

      {/* Similar price segment compare table */}
      {/* <div className="mt-12 bg-white rounded-xl border border-gray-200 overflow-hidden">
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
      </div> */}
      {breakupOpen && renderBreakup()}
      <Reviews carId={car?._id ?? ''} />
      <EmiCalculator open={emiOpen} onClose={() => setEmiOpen(false)} price={car?.variant[index]?.price} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}




