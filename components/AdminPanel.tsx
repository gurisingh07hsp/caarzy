'use client';

import React, { useMemo, useState } from 'react';
import { Car } from '@/types/Car';
import { BlogPost } from '@/types/BlogPost';

interface AdminPanelProps {
  cars: Car[];
  blogs: BlogPost[];
  onAddCar: (car: Car) => void;
  onUpdateCar: (car: Car) => void;
  onDeleteCar: (id: string) => void;
  onAddBlog: (blog: BlogPost) => void;
  onUpdateBlog: (blog: BlogPost) => void;
  onDeleteBlog: (id: string) => void;
}

export function AdminPanel({ cars, blogs, onAddCar }: AdminPanelProps) {
  const [formOpen, setFormOpen] = useState(true);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Manage Cars</h2>
        <button
          onClick={() => setFormOpen((v) => !v)}
          className="px-4 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800"
        >
          {formOpen ? 'Hide Add Car' : 'Add Car'}
        </button>
      </div>

      {formOpen && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <AddCarForm onSubmit={onAddCar} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cars.map((car) => (
          <div key={car._id} className="p-4 bg-white rounded-lg border">
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={car.images[0]} alt={car.name} className="w-16 h-16 rounded object-cover mr-4" />
              <div>
                <p className="font-semibold text-gray-900">{car.brand} {car.name}</p>
                <p className="text-sm text-gray-600">{car.category}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {car.colors.map((c) => (
                    <span key={c} className="inline-flex items-center text-xs px-2 py-0.5 rounded-full border">
                      <span className="w-3 h-3 rounded-full mr-1 border" style={{ backgroundColor: c }} />
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold text-gray-900">Manage Blogs</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="p-4 bg-white rounded-lg border">
            <p className="font-semibold text-gray-900">{blog.title}</p>
            <p className="text-sm text-gray-600">{blog.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddCarForm({ onSubmit }: { onSubmit: (car: Car) => void }) {
  const [name, setName] = useState('i20');
  const [brand, setBrand] = useState('hundai');
  const [category, setCategory] = useState<Car['category']>('SUV');
  const [price, setPrice] = useState('900000');
  const [mileage, setMileage] = useState('18');
  const [fuelType, setFuelType] = useState<Car['fuelType']>('Petrol');
  const [transmission, setTransmission] = useState<Car['transmission']>('Manual');
  const [seatingCapacity, setSeatingCapacity] = useState('5');
  const [engineCapacity, setEngineCapacity] = useState('1200cc');
  const [images, setImages] = useState<string>('');
  const [description, setDescription] = useState('klfjdkljfafjdf');
  const [keyFeatures, setKeyFeatures] = useState<string>('');
  const [colors, setColors] = useState<string[]>([]);
  const [newColor, setNewColor] = useState('#ff6b00');
  const [isLatest, setIsLatest] = useState(false);
  const [launchDate, setLaunchDate] = useState('');
  const [variants, setVariants] = useState<Car['variants']>([]);
  // Price breakup fields
  const [exShowroom, setExShowroom] = useState<string>('100000');
  const [registration, setRegistration] = useState<string>('100000');
  const [insurance, setInsurance] = useState<string>('50000');
  const [otherCharges, setOtherCharges] = useState<string>('50000');

  const imageList = useMemo(() => images.split(/\s*,\s*/).filter(Boolean), [images]);
  const featuresList = useMemo(() => keyFeatures.split(/\s*\n\s*|\s*,\s*/).filter(Boolean), [keyFeatures]);

  function addColor() {
    if (!colors.includes(newColor)) setColors((c) => [...c, newColor]);
  }

  function removeColor(c: string) {
    setColors((list) => list.filter((x) => x !== c));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const car: Car = {
      name,
      brand,
      category,
      price: Number(price) || 0,
      mileage: Number(mileage) || 0,
      fuelType,
      transmission,
      seatingCapacity: Number(seatingCapacity) || 5,
      engineCapacity,
      images: imageList.length ? imageList : [''],
      description,
      keyFeatures: featuresList,
      specifications: {
        length: '-',
        width: '-',
        height: '-',
        wheelbase: '-',
        groundClearance: '-',
        bootSpace: '-',
      },
      colors: colors.length ? colors : ['#ff6b00'],
      variants,
      isLatest,
      priceBreakup: (exShowroom || registration || insurance || otherCharges) ? {
        exShowroom: Number(exShowroom) || 0,
        registration: Number(registration) || 0,
        insurance: Number(insurance) || 0,
        other: Number(otherCharges) || 0,
      } : undefined,
      year: new Date().getFullYear(),
      imageCount: imageList.length || 1,
      seller: {
        name: 'Admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      },
      launchDate: launchDate || new Date().toISOString(),
    };

    onSubmit(car);
    // reset minimal fields
    setName('');
    setBrand('');
    setImages('');
    setColors([]);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Model name" className="border rounded-lg px-3 py-2" required />
        <input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Brand" className="border rounded-lg px-3 py-2" required />
        <select value={category} onChange={(e) => setCategory(e.target.value as Car['category'])} className="border rounded-lg px-3 py-2">
          {['SUV','Hatchback','Sedan','Coupe','Convertible','Wagon'].map((c) => (
            <option key={c} value={c as Car['category']}>{c}</option>
          ))}
        </select>
        <input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (₹)" type="number" className="border rounded-lg px-3 py-2" />
        <input value={mileage} onChange={(e) => setMileage(e.target.value)} placeholder="Mileage (km)" type="number" className="border rounded-lg px-3 py-2" />
        <input value={engineCapacity} onChange={(e) => setEngineCapacity(e.target.value)} placeholder="Engine capacity" className="border rounded-lg px-3 py-2" />
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value as Car['fuelType'])} className="border rounded-lg px-3 py-2">
          {['Petrol','Diesel','Electric','Hybrid'].map((f) => (
            <option key={f} value={f as Car['fuelType']}>{f}</option>
          ))}
        </select>
        <select value={transmission} onChange={(e) => setTransmission(e.target.value as Car['transmission'])} className="border rounded-lg px-3 py-2">
          {['Manual','Automatic','Automatic (AMT)'].map((t) => (
            <option key={t} value={t as Car['transmission']}>{t}</option>
          ))}
        </select>
        <input value={seatingCapacity} onChange={(e) => setSeatingCapacity(e.target.value)} placeholder="Seating Capacity" type="number" className="border rounded-lg px-3 py-2" />
      </div>

      {/* Price Breakup */}
      <div className="border rounded-xl p-4">
        <h3 className="font-semibold mb-3">Price Breakup (optional)</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input type="number" value={exShowroom} onChange={(e) => setExShowroom(e.target.value)} placeholder="Ex-Showroom (₹)" className="border rounded-lg px-3 py-2" />
          <input type="number" value={registration} onChange={(e) => setRegistration(e.target.value)} placeholder="Registration (₹)" className="border rounded-lg px-3 py-2" />
          <input type="number" value={insurance} onChange={(e) => setInsurance(e.target.value)} placeholder="Insurance (₹)" className="border rounded-lg px-3 py-2" />
          <input type="number" value={otherCharges} onChange={(e) => setOtherCharges(e.target.value)} placeholder="Other (₹)" className="border rounded-lg px-3 py-2" />
        </div>
        <p className="text-xs text-gray-500 mt-2">If provided, the price breakup will be used in the car detail &quot;View Price Breakup&quot; dialog.</p>
      </div>

      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="border rounded-lg px-3 py-2 w-full min-h-24" />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Key Features (comma or newline separated)</label>
        <textarea value={keyFeatures} onChange={(e) => setKeyFeatures(e.target.value)} className="border rounded-lg px-3 py-2 w-full min-h-20" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Image URLs (comma separated)</label>
        <input value={images} onChange={(e) => setImages(e.target.value)} className="border rounded-lg px-3 py-2 w-full" placeholder="https://..., https://..." />
        {imageList.length > 0 && (
          <div className="flex gap-2 mt-2 overflow-x-auto">
            {imageList.map((src) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={src} src={src} alt="preview" className="w-16 h-16 object-cover rounded" />
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Colors</label>
        <div className="flex items-center gap-2">
          <input type="color" value={newColor} onChange={(e) => setNewColor(e.target.value)} className="w-10 h-10 p-0 border rounded" />
          <button type="button" onClick={addColor} className="px-3 py-2 rounded bg-orange-500 text-white hover:bg-orange-600">Add Color</button>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {colors.map((c) => (
            <button key={c} type="button" onClick={() => removeColor(c)} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm">
              <span className="w-4 h-4 rounded-full border" style={{ backgroundColor: c }} />
              {c}
              <span className="text-gray-500">×</span>
            </button>
          ))}
        </div>
      </div>

      {/* Variants editor */}
      <div className="border rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">Variants / Trims</h3>
          <button
            type="button"
            onClick={() => setVariants((v) => [...(v || []), { name: '', fuel: 'Petrol', transmission: 'Manual', price: parseInt('')}])}
            className="px-3 py-1.5 rounded bg-gray-900 text-white hover:bg-gray-800"
          >
            Add Variant
          </button>
        </div>
        <div className="space-y-3">
          {(variants || []).map((v, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-5 gap-2 items-center">
              <input
                value={v.name}
                onChange={(e) => setVariants((list) => list?.map((x, i) => i===idx ? { ...x, name: e.target.value } : x))}
                placeholder="Variant name"
                className="border rounded-lg px-3 py-2"
              />
              <select
                value={v.fuel}
                onChange={(e) => setVariants((list) => list?.map((x, i) => i===idx ? { ...x, fuel: e.target.value as any } : x))}
                className="border rounded-lg px-3 py-2"
              >
                {['Petrol','Diesel','Electric','Hybrid','CNG'].map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
              <select
                value={v.transmission}
                onChange={(e) => setVariants((list) => list?.map((x, i) => i===idx ? { ...x, transmission: e.target.value as any } : x))}
                className="border rounded-lg px-3 py-2"
              >
                {['Manual','Automatic','Automatic (AMT)'].map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
              <input
                type="number"
                value={v.price}
                onChange={(e) => setVariants((list) => list?.map((x, i) => i===idx ? { ...x, price: Number(e.target.value) || 0 } : x))}
                placeholder="Price (₹)"
                className="border rounded-lg px-3 py-2"
              />
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setVariants((list) => list?.filter((_, i) => i!==idx))} className="px-3 py-2 rounded border">Remove</button>
              </div>
              <div className="md:col-span-5">
                <input
                  value={v.specs || ''}
                  onChange={(e) => setVariants((list) => list?.map((x, i) => i===idx ? { ...x, specs: e.target.value } : x))}
                  placeholder="Specs summary (e.g., 1197 cc, Petrol, Manual)"
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>
            </div>
          ))}
          {(!variants || variants.length === 0) && (
            <p className="text-sm text-gray-500">No variants yet. Click &quot;Add Variant&quot; to create trims.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label className="inline-flex items-center gap-2 text-sm text-gray-700">
          <input type="checkbox" checked={isLatest} onChange={(e) => setIsLatest(e.target.checked)} />
          Mark as Latest
        </label>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Launch Date</label>
          <input type="date" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className="border rounded-lg px-3 py-2 w-full" />
        </div>
        <div className="text-right">
          <button type="submit" className="px-5 py-2 rounded-lg bg-gray-900 text-white hover:bg-gray-800">Save Car</button>
        </div>
      </div>
    </form>
  );
}




