'use client'
import { CarCard } from '@/components/CarCard';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const page = () => {
  const [activeBrand, setActiveBrand] = useState<string>("All");
  const [activeTab, setActiveTab] = useState<"launched" | "upcoming">("launched");
  const [electricCars, setElectricCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState<string>("");

    const getElectricCars = async() => {
    try{
      const response = await axios.get('/api/managemodels',{
      params: {
        category: 'Electric Cars',
        limit: 12
      }
    });
      if(response.status === 200){
        setElectricCars(response.data.models);
      }
    }catch(error){
      console.error('Error fetching popular cars: ', error);
    }
  };

  useEffect(()=> {
    getElectricCars();
  },[]);

  const filteredCars = electricCars.filter((c: any) => {
    const brandMatch = activeBrand === "All" || c.brand === activeBrand;
    const searchMatch = c.modelName.toLowerCase().includes(searchQuery.toLowerCase());
    return brandMatch && searchMatch;
  });
  return (
    <div>
       <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-emerald-400 opacity-5"
              style={{
                width: (i + 1) * 80 + "px",
                height: (i + 1) * 80 + "px",
                left: (i * 13) % 100 + "%",
                top: (i * 17) % 100 + "%",
                filter: "blur(60px)",
              }}
            />
          ))}
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-14 md:py-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full mb-4 border border-emerald-500/30">
                🌿 GREEN INITIATIVE 2026
              </div>
              <h1 className="text-3xl md:text-5xl font-black text-white leading-tight mb-3">
                Electric Cars
                <br />
                <span className="text-emerald-400">in India</span>
              </h1>
              <p className="text-slate-300 text-sm md:text-base mb-6 max-w-lg">
                Explore 62+ electric vehicles. Compare prices, range, and features to find your perfect EV.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                  <input
                    type="text"
                    placeholder="Search electric cars..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
                  />
                </div>
                {/* <select className="px-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  <option className="text-slate-800">All Prices</option>
                  <option className="text-slate-800">Under ₹15L</option>
                  <option className="text-slate-800">₹15L - ₹30L</option>
                  <option className="text-slate-800">Above ₹30L</option>
                </select> */}
              </div>
            </div>
            {/* <div className="flex-shrink-0">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: "62+", label: "Electric Cars" },
                  { num: "₹3.25L", label: "Starting From" },
                  { num: "792km", label: "Max Range" },
                  { num: "10+", label: "Brands" },
                ].map(({ num, label }) => (
                  <div key={label} className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/10 text-center">
                    <div className="text-2xl font-black text-emerald-400">{num}</div>
                    <div className="text-xs text-slate-300 font-medium">{label}</div>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <h1 className='max-w-6xl mx-auto text-3xl font-bold mt-2'>Electric Cars</h1>
      <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-4 max-w-6xl mx-auto my-4'>
        {filteredCars.map((car, index)=> (
            <CarCard key={index} car={car}/>
        ))}
      </div>



        {/* <div className="max-w-7xl mx-auto px-4 py-8">
      
        <div className="mb-6">
          <h2 className="text-lg font-black text-slate-800 mb-3">Browse by Brand</h2>
          <div className="flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setActiveBrand(brand)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  activeBrand === brand
                    ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-emerald-400 hover:text-emerald-600"
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div> */}



    </div>
  )
}

export default page
