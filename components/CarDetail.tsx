'use client';
import { useMemo, useState } from 'react';
import { VariantFilter } from './VariantFilter';
import { EmiCalculator } from './EmiCalculator';
import { CarIcon } from 'lucide-react';
import axios from 'axios';
import { useEffect} from 'react'
import { useParams } from "next/navigation";
import { useRouter } from 'next/navigation';
import CarLoadingComponent from './CarLoadingComponent';
import Link from 'next/link';
import {capitalizeString, PriceFormatter} from '../hook/utils';

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
  const [sort, setSort] = useState<'latest' | 'top'>('latest');
  const [popularCars, setPopularCars] = useState([]);
  const { brand, name } = useParams();
  const [selectedtab, setSelectedTab] = useState<'description' | 'overview' | 'images' | 'pros&cons' | 'reviews'>('description');
  const router = useRouter();
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
  }, []);

  useEffect(()=> {
    const fetchPopularCars = async() => {
      if(car && car.bodyType){
        const response = await axios.get(`/api/managemodels`, {params: {bodyType: car.bodyType?.toString().replace('-', ' '),category: 'Popular Cars', limit: 5}});
        if(response.status == 200){
            setPopularCars(response.data.models);
        }
      }
    }
    fetchPopularCars();
  },[car]);

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!car?.variant) return;

    const reviews = car.variant.flatMap(
      (v: any) => v.reviews || []
    );
    setReviews(reviews);
  }, [car]);

    const avg = useMemo(() => {
      if (reviews.length === 0) return 0;
      return reviews.reduce((a, r: any) => a + r.rating, 0) / reviews.length;
    }, [reviews]);

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
          <CarLoadingComponent/>
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
    <div className="lg:max-w-7xl mx-auto lg:px-4 px-2">
      {loading ? (
        <CarLoadingComponent/>
        // <div className='h-[100vh] w-[100%] flex justify-center items-center'></div>
      ) : (
        <div>
          {car == null ? (
            <div>Car no found</div>
          ) : (
      <div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl p-2 lg:p-6">
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
        <div className='flex gap-2 my-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-2'>
          <button 
            onClick={() => {setSelectedTab('description'); router.push('#description')}} 
            className={`lg:px-4 px-2 min-w-[144px] lg:py-3 py-1 whitespace-nowrap snap-start flex-shrink-0 ${selectedtab === 'description' ? 'main-bg-color text-white' : 'border border-gray-300 text-gray-700'} rounded-full hover:bg-[#e8151f] hover:text-white transition-colors duration-200`}
          >
            Description
          </button>
          
          <button 
            onClick={() => {setSelectedTab('overview'); router.push('#overview')}} 
            className={`lg:px-4 px-2 min-w-[144px] lg:py-3 py-1 whitespace-nowrap snap-start flex-shrink-0 ${selectedtab === 'overview' ? 'main-bg-color text-white' : 'border border-gray-300 text-gray-700'} rounded-full hover:bg-[#e8151f] hover:text-white transition-colors duration-200`}
          >
            Overview
          </button>
          
          <button 
            onClick={() => {setSelectedTab('images'); router.push(`${car.modelName}/pictures`)}} 
            className={`lg:px-4 px-2 min-w-[144px] lg:py-3 py-1 whitespace-nowrap snap-start flex-shrink-0 ${selectedtab === 'images' ? 'main-bg-color text-white' : 'border border-gray-300 text-gray-700'} rounded-full hover:bg-[#e8151f] hover:text-white transition-colors duration-200`}
          >
            Images
          </button>
          
          <button 
            onClick={() => {setSelectedTab('pros&cons'); router.push('#pros&cons')}} 
            className={`lg:px-4 px-2 min-w-[144px] lg:py-3 py-1 whitespace-nowrap snap-start flex-shrink-0 ${selectedtab === 'pros&cons' ? 'main-bg-color text-white' : 'border border-gray-300 text-gray-700'} rounded-full hover:bg-[#e8151f] hover:text-white transition-colors duration-200`}
          >
            Pros & Cons
          </button>
          
          <button 
            onClick={() => {setSelectedTab('reviews'); router.push('#reviews')}} 
            className={`lg:px-4 min-w-[144px] lg:py-3 py-1 whitespace-nowrap snap-start flex-shrink-0 ${selectedtab === 'reviews' ? 'main-bg-color text-white' : 'border border-gray-300 text-gray-700'} rounded-full hover:bg-[#e8151f] hover:text-white transition-colors duration-200`}
          >
            Reviews
          </button>
        </div>
        <p className="text-slate-600 mb-2 px-4">{car?.brand?.charAt(0).toUpperCase() + car?.brand?.slice(1)} • {car.bodyType == 'suv' ? 'SUV' : car?.bodyType?.charAt(0).toUpperCase() + car?.bodyType?.slice(1)}</p>
        <h1 className="md:text-3xl text-xl font-bold text-slate-900 mb-2 px-4">{capitalizeString(car?.modelName)}</h1>

        <div className='flex items-center gap-4 px-4'>
          {car.category == 'Electric Cars' ? (
          <div className='flex items-center gap-1'>
            <svg width="17" height="17" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.14629 9.64624L13.1463 3.64624C13.1927 3.59979 13.2479 3.56294 13.3086 3.5378C13.3693 3.51265 13.4343 3.49971 13.5 3.49971C13.5657 3.49971 13.6308 3.51265 13.6915 3.5378C13.7522 3.56294 13.8073 3.59979 13.8538 3.64624C13.9002 3.6927 13.9371 3.74785 13.9622 3.80854C13.9874 3.86924 14.0003 3.93429 14.0003 3.99999C14.0003 4.06569 13.9874 4.13074 13.9622 4.19144C13.9371 4.25214 13.9002 4.30729 13.8538 4.35374L7.85379 10.3537C7.80733 10.4002 7.75218 10.437 7.69148 10.4622C7.63079 10.4873 7.56573 10.5003 7.50004 10.5003C7.43434 10.5003 7.36928 10.4873 7.30859 10.4622C7.24789 10.437 7.19274 10.4002 7.14629 10.3537C7.09983 10.3073 7.06298 10.2521 7.03784 10.1914C7.0127 10.1307 6.99976 10.0657 6.99976 9.99999C6.99976 9.93429 7.0127 9.86924 7.03784 9.80854C7.06298 9.74785 7.09983 9.6927 7.14629 9.64624ZM8.00004 5.49999C8.43435 5.49944 8.86585 5.56974 9.27754 5.70812C9.34004 5.73028 9.40633 5.73978 9.47254 5.73608C9.53876 5.73237 9.60357 5.71553 9.66322 5.68654C9.72286 5.65755 9.77614 5.61698 9.81995 5.56719C9.86377 5.51741 9.89724 5.45941 9.91842 5.39657C9.9396 5.33372 9.94807 5.26729 9.94334 5.20114C9.9386 5.135 9.92075 5.07045 9.89083 5.01127C9.86091 4.95208 9.81951 4.89944 9.76905 4.85641C9.71859 4.81338 9.66008 4.78082 9.59691 4.76062C8.80011 4.492 7.94844 4.42866 7.12067 4.57647C6.2929 4.72429 5.51579 5.07847 4.8612 5.60626C4.20662 6.13406 3.69571 6.81841 3.37575 7.59601C3.05578 8.37361 2.93709 9.21935 3.03066 10.055C3.04419 10.1772 3.10227 10.2902 3.19382 10.3722C3.28536 10.4543 3.40395 10.4998 3.52691 10.5C3.54504 10.5 3.56379 10.5 3.58254 10.4969C3.7143 10.4823 3.83488 10.4159 3.91774 10.3124C4.0006 10.2089 4.03897 10.0768 4.02441 9.94499C4.00814 9.79722 4 9.64866 4.00004 9.49999C4.00119 8.43948 4.42299 7.42274 5.17289 6.67284C5.92278 5.92295 6.93952 5.50115 8.00004 5.49999ZM14.2338 6.31249C14.2038 6.25405 14.1627 6.20209 14.1126 6.15956C14.0626 6.11704 14.0046 6.08478 13.9421 6.06465C13.8796 6.04451 13.8138 6.03688 13.7483 6.04219C13.6829 6.04751 13.6191 6.06566 13.5607 6.09562C13.5022 6.12557 13.4503 6.16675 13.4077 6.21679C13.3652 6.26683 13.333 6.32476 13.3128 6.38726C13.2927 6.44977 13.285 6.51563 13.2904 6.58108C13.2957 6.64654 13.3138 6.7103 13.3438 6.76874C13.7137 7.49516 13.9321 8.28918 13.9859 9.10259C14.0396 9.91601 13.9275 10.7319 13.6563 11.5006L2.33754 11.4962C2.02174 10.591 1.9269 9.6234 2.06093 8.67408C2.19496 7.72476 2.55397 6.82123 3.10804 6.03881C3.66211 5.25639 4.39518 4.61775 5.24614 4.17612C6.0971 3.73449 7.0413 3.50267 8.00004 3.49999H8.05504C8.98624 3.50585 9.90301 3.73065 10.7313 4.15624C10.7899 4.18849 10.8544 4.20866 10.9209 4.21554C10.9874 4.22243 11.0547 4.2159 11.1186 4.19633C11.1826 4.17677 11.242 4.14457 11.2933 4.10164C11.3446 4.05872 11.3867 4.00593 11.4172 3.94642C11.4478 3.88691 11.4661 3.82188 11.471 3.75517C11.4759 3.68847 11.4675 3.62145 11.446 3.55809C11.4246 3.49472 11.3907 3.4363 11.3463 3.38628C11.3019 3.33626 11.2479 3.29565 11.1875 3.26687C9.94064 2.62819 8.53078 2.37836 7.14035 2.54967C5.74991 2.72099 4.44286 3.30557 3.38828 4.22781C2.3337 5.15005 1.58011 6.3675 1.22498 7.72269C0.869846 9.07788 0.929523 10.5085 1.39629 11.8294C1.46523 12.0251 1.5931 12.1946 1.76232 12.3147C1.93154 12.4348 2.13379 12.4995 2.34129 12.5H13.6582C13.8655 12.5001 14.0678 12.4358 14.237 12.3158C14.4062 12.1959 14.534 12.0263 14.6025 11.8306C14.9179 10.9337 15.0478 9.98205 14.9844 9.03341C14.921 8.08476 14.6657 7.15887 14.2338 6.31187V6.31249Z" fill="#696665"/>
            </svg>
            {car.variant.length > 0 ? (
              <div>{(() => {
                const min = Math.min(...car.variant.map((v: any) => v?.engineAndTransmission?.Range.split(' ')[0] || 0));
                const max = Math.max(...car.variant.map((v: any) => v?.engineAndTransmission?.Range.split(' ')[0]));
                return <p>{min} - {max} km</p>;
              })()}</div>
            ) : (
              <div>
                <p>{'N/A'} - {'N/A'} km</p>
              </div>
            )}
          </div>
          ) : (
          <div className='flex items-center gap-1'>
            <svg width="17" height="17" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.14629 9.64624L13.1463 3.64624C13.1927 3.59979 13.2479 3.56294 13.3086 3.5378C13.3693 3.51265 13.4343 3.49971 13.5 3.49971C13.5657 3.49971 13.6308 3.51265 13.6915 3.5378C13.7522 3.56294 13.8073 3.59979 13.8538 3.64624C13.9002 3.6927 13.9371 3.74785 13.9622 3.80854C13.9874 3.86924 14.0003 3.93429 14.0003 3.99999C14.0003 4.06569 13.9874 4.13074 13.9622 4.19144C13.9371 4.25214 13.9002 4.30729 13.8538 4.35374L7.85379 10.3537C7.80733 10.4002 7.75218 10.437 7.69148 10.4622C7.63079 10.4873 7.56573 10.5003 7.50004 10.5003C7.43434 10.5003 7.36928 10.4873 7.30859 10.4622C7.24789 10.437 7.19274 10.4002 7.14629 10.3537C7.09983 10.3073 7.06298 10.2521 7.03784 10.1914C7.0127 10.1307 6.99976 10.0657 6.99976 9.99999C6.99976 9.93429 7.0127 9.86924 7.03784 9.80854C7.06298 9.74785 7.09983 9.6927 7.14629 9.64624ZM8.00004 5.49999C8.43435 5.49944 8.86585 5.56974 9.27754 5.70812C9.34004 5.73028 9.40633 5.73978 9.47254 5.73608C9.53876 5.73237 9.60357 5.71553 9.66322 5.68654C9.72286 5.65755 9.77614 5.61698 9.81995 5.56719C9.86377 5.51741 9.89724 5.45941 9.91842 5.39657C9.9396 5.33372 9.94807 5.26729 9.94334 5.20114C9.9386 5.135 9.92075 5.07045 9.89083 5.01127C9.86091 4.95208 9.81951 4.89944 9.76905 4.85641C9.71859 4.81338 9.66008 4.78082 9.59691 4.76062C8.80011 4.492 7.94844 4.42866 7.12067 4.57647C6.2929 4.72429 5.51579 5.07847 4.8612 5.60626C4.20662 6.13406 3.69571 6.81841 3.37575 7.59601C3.05578 8.37361 2.93709 9.21935 3.03066 10.055C3.04419 10.1772 3.10227 10.2902 3.19382 10.3722C3.28536 10.4543 3.40395 10.4998 3.52691 10.5C3.54504 10.5 3.56379 10.5 3.58254 10.4969C3.7143 10.4823 3.83488 10.4159 3.91774 10.3124C4.0006 10.2089 4.03897 10.0768 4.02441 9.94499C4.00814 9.79722 4 9.64866 4.00004 9.49999C4.00119 8.43948 4.42299 7.42274 5.17289 6.67284C5.92278 5.92295 6.93952 5.50115 8.00004 5.49999ZM14.2338 6.31249C14.2038 6.25405 14.1627 6.20209 14.1126 6.15956C14.0626 6.11704 14.0046 6.08478 13.9421 6.06465C13.8796 6.04451 13.8138 6.03688 13.7483 6.04219C13.6829 6.04751 13.6191 6.06566 13.5607 6.09562C13.5022 6.12557 13.4503 6.16675 13.4077 6.21679C13.3652 6.26683 13.333 6.32476 13.3128 6.38726C13.2927 6.44977 13.285 6.51563 13.2904 6.58108C13.2957 6.64654 13.3138 6.7103 13.3438 6.76874C13.7137 7.49516 13.9321 8.28918 13.9859 9.10259C14.0396 9.91601 13.9275 10.7319 13.6563 11.5006L2.33754 11.4962C2.02174 10.591 1.9269 9.6234 2.06093 8.67408C2.19496 7.72476 2.55397 6.82123 3.10804 6.03881C3.66211 5.25639 4.39518 4.61775 5.24614 4.17612C6.0971 3.73449 7.0413 3.50267 8.00004 3.49999H8.05504C8.98624 3.50585 9.90301 3.73065 10.7313 4.15624C10.7899 4.18849 10.8544 4.20866 10.9209 4.21554C10.9874 4.22243 11.0547 4.2159 11.1186 4.19633C11.1826 4.17677 11.242 4.14457 11.2933 4.10164C11.3446 4.05872 11.3867 4.00593 11.4172 3.94642C11.4478 3.88691 11.4661 3.82188 11.471 3.75517C11.4759 3.68847 11.4675 3.62145 11.446 3.55809C11.4246 3.49472 11.3907 3.4363 11.3463 3.38628C11.3019 3.33626 11.2479 3.29565 11.1875 3.26687C9.94064 2.62819 8.53078 2.37836 7.14035 2.54967C5.74991 2.72099 4.44286 3.30557 3.38828 4.22781C2.3337 5.15005 1.58011 6.3675 1.22498 7.72269C0.869846 9.07788 0.929523 10.5085 1.39629 11.8294C1.46523 12.0251 1.5931 12.1946 1.76232 12.3147C1.93154 12.4348 2.13379 12.4995 2.34129 12.5H13.6582C13.8655 12.5001 14.0678 12.4358 14.237 12.3158C14.4062 12.1959 14.534 12.0263 14.6025 11.8306C14.9179 10.9337 15.0478 9.98205 14.9844 9.03341C14.921 8.08476 14.6657 7.15887 14.2338 6.31187V6.31249Z" fill="#696665"/>
            </svg>
            {car.variant.length > 0 ? (
              <div>{(() => {
                const min = Math.min(...car.variant.map((v: any) => v?.fuelAndPerformance?.petrolMileageARAI.split(' ')[0] || 0));
                const max = Math.max(...car.variant.map((v: any) => v?.fuelAndPerformance.petrolMileageARAI.split(' ')[0]));
                return <p>{min} - {max} km</p>;
              })()}</div>
            ) : (
              <div>
                <p>{'N/A'} - {'N/A'} km</p>
              </div>
            )}
          </div>
          )}

          <div className='flex items-center gap-1'>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.125 10C7.93958 10 7.75833 9.94502 7.60416 9.842C7.44999 9.73899 7.32982 9.59257 7.25887 9.42126C7.18791 9.24996 7.16934 9.06146 7.20552 8.8796C7.24169 8.69775 7.33098 8.5307 7.46209 8.39959C7.5932 8.26848 7.76025 8.17919 7.94211 8.14301C8.12396 8.10684 8.31246 8.12541 8.48377 8.19636C8.65507 8.26732 8.80149 8.38748 8.90451 8.54165C9.00752 8.69582 9.0625 8.87708 9.0625 9.0625C9.0625 9.31114 8.96373 9.5496 8.78792 9.72541C8.6121 9.90123 8.37364 10 8.125 10ZM16.25 8.125C16.25 9.73197 15.7735 11.3029 14.8807 12.639C13.9879 13.9752 12.719 15.0166 11.2343 15.6315C9.74966 16.2465 8.11599 16.4074 6.5399 16.0939C4.9638 15.7804 3.51606 15.0065 2.37976 13.8702C1.24346 12.7339 0.469628 11.2862 0.156123 9.71011C-0.157382 8.13401 0.00352044 6.50035 0.618482 5.0157C1.23344 3.53105 2.27485 2.2621 3.611 1.36931C4.94714 0.476523 6.51803 0 8.125 0C10.2792 0.00227486 12.3445 0.85903 13.8677 2.38227C15.391 3.90551 16.2477 5.97081 16.25 8.125ZM1.25 8.125V8.15078C3.16963 6.52021 5.60632 5.625 8.125 5.625C10.6437 5.625 13.0804 6.52021 15 8.15078V8.125C15 6.30164 14.2757 4.55295 12.9864 3.26364C11.6971 1.97433 9.94837 1.25 8.125 1.25C6.30164 1.25 4.55296 1.97433 3.26364 3.26364C1.97433 4.55295 1.25 6.30164 1.25 8.125ZM6.52344 14.8109L5.19141 11.25H2.00235C2.45537 12.1339 3.09381 12.9096 3.87406 13.5241C4.65432 14.1387 5.55802 14.5776 6.52344 14.8109ZM8.125 15C8.18985 15 8.25469 15 8.31954 15L9.8875 10.8148C9.97749 10.5767 10.1378 10.3715 10.3471 10.2265C10.5564 10.0816 10.8048 10.0036 11.0594 10.0031H14.7406C14.7703 9.90078 14.7969 9.79687 14.8188 9.69062C13.9459 8.80008 12.9042 8.09261 11.7545 7.60964C10.6049 7.12667 9.37042 6.8779 8.12344 6.8779C6.87647 6.8779 5.64202 7.12667 4.49237 7.60964C3.34273 8.09261 2.30098 8.80008 1.42813 9.69062C1.45235 9.79531 1.47891 9.89922 1.50625 10.0031H5.19141C5.44608 10.0038 5.69452 10.0819 5.9038 10.227C6.11309 10.3721 6.27333 10.5774 6.36328 10.8156L7.92578 15C7.99297 15 8.0586 15 8.125 15ZM14.2477 11.25H11.0586L9.72344 14.8117C10.6895 14.5788 11.5939 14.1399 12.3747 13.5252C13.1556 12.9105 13.7944 12.1344 14.2477 11.25Z" fill="#B6B6B6"/>
            </svg>
            <div>
              {car?.variant[0]?.engineAndTransmission.driveType || 'N/A'}
            </div>
          </div>
        </div>

        {/* Quick actions panel after description */}
        {car?.variant?.length > 0 && (
          <div className="rounded-2xl overflow-hidden">
            <div className="grid gap-0">
              <div className="p-4">
                {(() => {
                  const min = Math.min(...car?.variant.map((v: any) => v.price));
                  const max = Math.max(...car?.variant.map((v: any) => v.price));
                  return <p className="text-2xl font-bold main-text-color">₹{PriceFormatter(min)} - {PriceFormatter(max)}</p>;
                })()}
                <p className="text-xs text-gray-600 mb-1">On-Road Price</p>
                <div id='overview' className="mt-3 flex items-center gap-3">
                  <button onClick={() => setEmiOpen(true)} className="text-blue-600 hover:underline">EMI Calculator</button>
                  <button className="px-3 py-2 rounded-lg main-bg-color text-white">Get Offers</button>
                </div>
              </div>
            </div>
          </div>
        )}

        <hr />

        <div className='mt-4'>
          <h2 className='lg:text-xl text-lg font-medium'>Car Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm mt-8">

        {car.category == 'Electric Cars' ? (
          <div className='flex items-center gap-2'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.75 8.125H17.7586L15 5.36641C14.8843 5.24983 14.7467 5.1574 14.595 5.0945C14.4433 5.0316 14.2806 4.99948 14.1164 5H10.9375V3.125H12.8125C12.9783 3.125 13.1372 3.05915 13.2544 2.94194C13.3717 2.82473 13.4375 2.66576 13.4375 2.5C13.4375 2.33424 13.3717 2.17527 13.2544 2.05806C13.1372 1.94085 12.9783 1.875 12.8125 1.875H7.8125C7.64674 1.875 7.48777 1.94085 7.37056 2.05806C7.25335 2.17527 7.1875 2.33424 7.1875 2.5C7.1875 2.66576 7.25335 2.82473 7.37056 2.94194C7.48777 3.05915 7.64674 3.125 7.8125 3.125H9.6875V5H5C4.66848 5 4.35054 5.1317 4.11612 5.36612C3.8817 5.60054 3.75 5.91848 3.75 6.25V10.3125H1.875V8.4375C1.875 8.27174 1.80915 8.11277 1.69194 7.99556C1.57473 7.87835 1.41576 7.8125 1.25 7.8125C1.08424 7.8125 0.925268 7.87835 0.808058 7.99556C0.690848 8.11277 0.625 8.27174 0.625 8.4375V13.4375C0.625 13.6033 0.690848 13.7622 0.808058 13.8794C0.925268 13.9967 1.08424 14.0625 1.25 14.0625C1.41576 14.0625 1.57473 13.9967 1.69194 13.8794C1.80915 13.7622 1.875 13.6033 1.875 13.4375V11.5625H3.75V13.1789C3.74948 13.3431 3.7816 13.5058 3.8445 13.6575C3.9074 13.8092 3.99983 13.9468 4.11641 14.0625L7.1875 17.1336C7.30315 17.2502 7.44082 17.3426 7.59251 17.4055C7.7442 17.4684 7.90688 17.5005 8.07109 17.5H14.1164C14.2806 17.5005 14.4433 17.4684 14.595 17.4055C14.7467 17.3426 14.8843 17.2502 15 17.1336L17.7586 14.375H18.75C19.0815 14.375 19.3995 14.2433 19.6339 14.0089C19.8683 13.7745 20 13.4565 20 13.125V9.375C20 9.04348 19.8683 8.72554 19.6339 8.49112C19.3995 8.2567 19.0815 8.125 18.75 8.125ZM18.75 13.125H17.5C17.4179 13.1249 17.3366 13.141 17.2607 13.1724C17.1848 13.2038 17.1159 13.2498 17.0578 13.3078L14.1164 16.25H8.07109L5 13.1789V6.25H14.1164L17.0578 9.19219C17.1159 9.25021 17.1848 9.29622 17.2607 9.32759C17.3366 9.35895 17.4179 9.37506 17.5 9.375H18.75V13.125Z" fill="#B6B6B6"/>
            </svg>
            <div className='flex items-center gap-16'>
              <p className='text-[#696665] w-20'>Battery Capacity:</p>
              {(() => {
                    const min = Math.min(...car?.variant.map((v: any) => v?.engineAndTransmission.batteryCapacity.split(' ')[0]));
                    const max = Math.max(...car?.variant.map((v: any) => v?.engineAndTransmission.batteryCapacity.split(' ')[0]));
                    return <p>{min as any == 'Infinity' ?'N/A' : min} Km - {max as any == '-Infinity' ?'N/A' : max} Km</p>;
              })()}
            </div>
          </div>
        ) : (
          <div className='flex items-center gap-2'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18.75 8.125H17.7586L15 5.36641C14.8843 5.24983 14.7467 5.1574 14.595 5.0945C14.4433 5.0316 14.2806 4.99948 14.1164 5H10.9375V3.125H12.8125C12.9783 3.125 13.1372 3.05915 13.2544 2.94194C13.3717 2.82473 13.4375 2.66576 13.4375 2.5C13.4375 2.33424 13.3717 2.17527 13.2544 2.05806C13.1372 1.94085 12.9783 1.875 12.8125 1.875H7.8125C7.64674 1.875 7.48777 1.94085 7.37056 2.05806C7.25335 2.17527 7.1875 2.33424 7.1875 2.5C7.1875 2.66576 7.25335 2.82473 7.37056 2.94194C7.48777 3.05915 7.64674 3.125 7.8125 3.125H9.6875V5H5C4.66848 5 4.35054 5.1317 4.11612 5.36612C3.8817 5.60054 3.75 5.91848 3.75 6.25V10.3125H1.875V8.4375C1.875 8.27174 1.80915 8.11277 1.69194 7.99556C1.57473 7.87835 1.41576 7.8125 1.25 7.8125C1.08424 7.8125 0.925268 7.87835 0.808058 7.99556C0.690848 8.11277 0.625 8.27174 0.625 8.4375V13.4375C0.625 13.6033 0.690848 13.7622 0.808058 13.8794C0.925268 13.9967 1.08424 14.0625 1.25 14.0625C1.41576 14.0625 1.57473 13.9967 1.69194 13.8794C1.80915 13.7622 1.875 13.6033 1.875 13.4375V11.5625H3.75V13.1789C3.74948 13.3431 3.7816 13.5058 3.8445 13.6575C3.9074 13.8092 3.99983 13.9468 4.11641 14.0625L7.1875 17.1336C7.30315 17.2502 7.44082 17.3426 7.59251 17.4055C7.7442 17.4684 7.90688 17.5005 8.07109 17.5H14.1164C14.2806 17.5005 14.4433 17.4684 14.595 17.4055C14.7467 17.3426 14.8843 17.2502 15 17.1336L17.7586 14.375H18.75C19.0815 14.375 19.3995 14.2433 19.6339 14.0089C19.8683 13.7745 20 13.4565 20 13.125V9.375C20 9.04348 19.8683 8.72554 19.6339 8.49112C19.3995 8.2567 19.0815 8.125 18.75 8.125ZM18.75 13.125H17.5C17.4179 13.1249 17.3366 13.141 17.2607 13.1724C17.1848 13.2038 17.1159 13.2498 17.0578 13.3078L14.1164 16.25H8.07109L5 13.1789V6.25H14.1164L17.0578 9.19219C17.1159 9.25021 17.1848 9.29622 17.2607 9.32759C17.3366 9.35895 17.4179 9.37506 17.5 9.375H18.75V13.125Z" fill="#B6B6B6"/>
            </svg>
            <div className='flex items-center gap-16'>
              <p className='text-[#696665] w-20'>Engine:</p>
              {(() => {
                    const min = Math.min(...car?.variant.map((v: any) => v?.engineAndTransmission.displacement.split(' ')[0]));
                    const max = Math.max(...car?.variant.map((v: any) => v?.engineAndTransmission.displacement.split(' ')[0]));
                    return <p>{min as any == 'Infinity' ?'N/A' : min} cc - {max as any == '-Infinity' ?'N/A' : max} cc</p>;
              })()}
            </div>
          </div>
        )}

          <div className='flex items-center gap-2'>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              
              <path d="M11.25 2.5L6.25 10H10L8.75 17.5L13.75 10H10L11.25 2.5Z" fill="#B6B6B6" stroke="#B6B6B6" strokeWidth="0.5" strokeLinejoin="round"/>
              <path d="M4.5 8.5C4.5 8.22386 4.72386 8 5 8H6C6.27614 8 6.5 8.22386 6.5 8.5V11.5C6.5 11.7761 6.27614 12 6 12H5C4.72386 12 4.5 11.7761 4.5 11.5V8.5Z" fill="#B6B6B6"/>
              
              <path d="M14.5 8.5C14.5 8.22386 14.7239 8 15 8H16C16.2761 8 16.5 8.22386 16.5 8.5V11.5C16.5 11.7761 16.2761 12 16 12H15C14.7239 12 14.5 11.7761 14.5 11.5V8.5Z" fill="#B6B6B6"/>
            </svg>
            <div className="flex items-center gap-16">
              <p className='text-[#696665] w-20'>Power:</p>
              {(() => {
                    const min = Math.min(...car.variant.map((v: any) => v?.engineAndTransmission.maxPower.split(' ')[0]));
                    const max = Math.max(...car.variant.map((v: any) => v?.engineAndTransmission.maxPower.split(' ')[0]));
                    return <p>{min as any == 'Infinity' ? 'N/A' : min} bhp - {max as any == '-Infinity' ? 'N/A' : max} bhp</p>;
              })()}
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.5 18.125C17.5 18.2908 17.4341 18.4498 17.3169 18.567C17.1997 18.6842 17.0407 18.75 16.875 18.75H8.74998C8.58422 18.75 8.42525 18.6842 8.30804 18.567C8.19083 18.4498 8.12498 18.2908 8.12498 18.125C8.12498 17.9593 8.19083 17.8003 8.30804 17.6831C8.42525 17.5659 8.58422 17.5 8.74998 17.5H16.875C17.0407 17.5 17.1997 17.5659 17.3169 17.6831C17.4341 17.8003 17.5 17.9593 17.5 18.125ZM17.5 12.5V15C17.5 15.3316 17.3683 15.6495 17.1339 15.8839C16.8994 16.1183 16.5815 16.25 16.25 16.25H8.91482C8.68238 16.2508 8.45439 16.1864 8.25666 16.0642C8.05893 15.942 7.89938 15.7669 7.79607 15.5586L3.25623 6.49614C3.16991 6.3223 3.125 6.13085 3.125 5.93676C3.125 5.74268 3.16991 5.55122 3.25623 5.37739L4.98435 1.93989C5.13103 1.64716 5.38671 1.42368 5.69642 1.31747C6.00613 1.21126 6.34515 1.23081 6.6406 1.37192L9.27263 2.48285L9.30935 2.50004C9.60567 2.64838 9.83097 2.90831 9.93571 3.22269C10.0405 3.53707 10.0161 3.88019 9.86795 4.1766C9.86555 4.18256 9.86268 4.18831 9.85935 4.19379L8.74998 6.25004L11.2328 11.25H16.25C16.5815 11.25 16.8994 11.3817 17.1339 11.6162C17.3683 11.8506 17.5 12.1685 17.5 12.5ZM16.25 12.5H11.232C10.9997 12.5008 10.7718 12.4364 10.5741 12.3142C10.3765 12.192 10.2171 12.0169 10.114 11.8086L7.63045 6.80864C7.54434 6.63516 7.49953 6.44411 7.49953 6.25043C7.49953 6.05676 7.54434 5.86571 7.63045 5.69223L7.63982 5.67504L8.74998 3.61879L6.13826 2.51645C6.12574 2.51163 6.11348 2.50616 6.10154 2.50004L4.37498 5.93754L8.91404 15H16.25V12.5Z" fill="#B6B6B6"/>
            </svg>
            <div className="flex items-center gap-16">
              <p className='text-[#696665] w-20'>Seats:</p>
              {car?.variant[0]?.dimensionsAndCapacity?.seatingCapacity }
            </div>
          </div>

          <div className='flex items-center gap-2'>
            <svg width="22" height="22" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 3.5C6.41015 3.5 3.5 6.41015 3.5 10C3.5 13.5899 6.41015 16.5 10 16.5C13.5899 16.5 16.5 13.5899 16.5 10C16.5 9.30964 16.3978 8.64314 16.2071 8.01472" stroke="#B6B6B6" strokeWidth="1.2" strokeLinecap="round"/>
              <path d="M16.2071 8.01472L14.5 6.5L15.5 9.5L16.2071 8.01472Z" fill="#B6B6B6"/>
              <circle cx="10" cy="10" r="1.5" fill="#B6B6B6"/>
              <path d="M9 10L7 8M7 8L6 9M7 8L8 7" stroke="#B6B6B6" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="flex items-center gap-16">
              <p className='text-[#696665] w-20'>Torque:</p>
              {(() => {
                const min = Math.min(...car.variant.map((v: any) => v.engineAndTransmission.maxTorque.split(' ')[0]));
                const max = Math.max(...car.variant.map((v: any) => v.engineAndTransmission.maxTorque.split(' ')[0]));
                return <p>{min as any == 'Infinity' ? 'N/A' : min} Nm - {max as any == '-Infinity' ? 'N/A' : max} Nm</p>;
              })()}
            </div>
          </div>

          {car.category == 'Electric Cars' ? (
          <div className='flex items-center gap-2'>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.14629 9.64624L13.1463 3.64624C13.1927 3.59979 13.2479 3.56294 13.3086 3.5378C13.3693 3.51265 13.4343 3.49971 13.5 3.49971C13.5657 3.49971 13.6308 3.51265 13.6915 3.5378C13.7522 3.56294 13.8073 3.59979 13.8538 3.64624C13.9002 3.6927 13.9371 3.74785 13.9622 3.80854C13.9874 3.86924 14.0003 3.93429 14.0003 3.99999C14.0003 4.06569 13.9874 4.13074 13.9622 4.19144C13.9371 4.25214 13.9002 4.30729 13.8538 4.35374L7.85379 10.3537C7.80733 10.4002 7.75218 10.437 7.69148 10.4622C7.63079 10.4873 7.56573 10.5003 7.50004 10.5003C7.43434 10.5003 7.36928 10.4873 7.30859 10.4622C7.24789 10.437 7.19274 10.4002 7.14629 10.3537C7.09983 10.3073 7.06298 10.2521 7.03784 10.1914C7.0127 10.1307 6.99976 10.0657 6.99976 9.99999C6.99976 9.93429 7.0127 9.86924 7.03784 9.80854C7.06298 9.74785 7.09983 9.6927 7.14629 9.64624ZM8.00004 5.49999C8.43435 5.49944 8.86585 5.56974 9.27754 5.70812C9.34004 5.73028 9.40633 5.73978 9.47254 5.73608C9.53876 5.73237 9.60357 5.71553 9.66322 5.68654C9.72286 5.65755 9.77614 5.61698 9.81995 5.56719C9.86377 5.51741 9.89724 5.45941 9.91842 5.39657C9.9396 5.33372 9.94807 5.26729 9.94334 5.20114C9.9386 5.135 9.92075 5.07045 9.89083 5.01127C9.86091 4.95208 9.81951 4.89944 9.76905 4.85641C9.71859 4.81338 9.66008 4.78082 9.59691 4.76062C8.80011 4.492 7.94844 4.42866 7.12067 4.57647C6.2929 4.72429 5.51579 5.07847 4.8612 5.60626C4.20662 6.13406 3.69571 6.81841 3.37575 7.59601C3.05578 8.37361 2.93709 9.21935 3.03066 10.055C3.04419 10.1772 3.10227 10.2902 3.19382 10.3722C3.28536 10.4543 3.40395 10.4998 3.52691 10.5C3.54504 10.5 3.56379 10.5 3.58254 10.4969C3.7143 10.4823 3.83488 10.4159 3.91774 10.3124C4.0006 10.2089 4.03897 10.0768 4.02441 9.94499C4.00814 9.79722 4 9.64866 4.00004 9.49999C4.00119 8.43948 4.42299 7.42274 5.17289 6.67284C5.92278 5.92295 6.93952 5.50115 8.00004 5.49999ZM14.2338 6.31249C14.2038 6.25405 14.1627 6.20209 14.1126 6.15956C14.0626 6.11704 14.0046 6.08478 13.9421 6.06465C13.8796 6.04451 13.8138 6.03688 13.7483 6.04219C13.6829 6.04751 13.6191 6.06566 13.5607 6.09562C13.5022 6.12557 13.4503 6.16675 13.4077 6.21679C13.3652 6.26683 13.333 6.32476 13.3128 6.38726C13.2927 6.44977 13.285 6.51563 13.2904 6.58108C13.2957 6.64654 13.3138 6.7103 13.3438 6.76874C13.7137 7.49516 13.9321 8.28918 13.9859 9.10259C14.0396 9.91601 13.9275 10.7319 13.6563 11.5006L2.33754 11.4962C2.02174 10.591 1.9269 9.6234 2.06093 8.67408C2.19496 7.72476 2.55397 6.82123 3.10804 6.03881C3.66211 5.25639 4.39518 4.61775 5.24614 4.17612C6.0971 3.73449 7.0413 3.50267 8.00004 3.49999H8.05504C8.98624 3.50585 9.90301 3.73065 10.7313 4.15624C10.7899 4.18849 10.8544 4.20866 10.9209 4.21554C10.9874 4.22243 11.0547 4.2159 11.1186 4.19633C11.1826 4.17677 11.242 4.14457 11.2933 4.10164C11.3446 4.05872 11.3867 4.00593 11.4172 3.94642C11.4478 3.88691 11.4661 3.82188 11.471 3.75517C11.4759 3.68847 11.4675 3.62145 11.446 3.55809C11.4246 3.49472 11.3907 3.4363 11.3463 3.38628C11.3019 3.33626 11.2479 3.29565 11.1875 3.26687C9.94064 2.62819 8.53078 2.37836 7.14035 2.54967C5.74991 2.72099 4.44286 3.30557 3.38828 4.22781C2.3337 5.15005 1.58011 6.3675 1.22498 7.72269C0.869846 9.07788 0.929523 10.5085 1.39629 11.8294C1.46523 12.0251 1.5931 12.1946 1.76232 12.3147C1.93154 12.4348 2.13379 12.4995 2.34129 12.5H13.6582C13.8655 12.5001 14.0678 12.4358 14.237 12.3158C14.4062 12.1959 14.534 12.0263 14.6025 11.8306C14.9179 10.9337 15.0478 9.98205 14.9844 9.03341C14.921 8.08476 14.6657 7.15887 14.2338 6.31187V6.31249Z" fill="#696665"/>
            </svg>
            <div className="flex items-center gap-16">
              <p className='text-[#696665] w-20'>Range:</p>
              {(() => {
                const min = Math.min(...car.variant.map((v: any) => v.engineAndTransmission.Range.split(' ')[0]));
                const max = Math.max(...car.variant.map((v: any) => v.engineAndTransmission.Range.split(' ')[0]));
                return <p>{min as any == 'Infinity' ? 'N/A' : min} - {max as any == '-Infinity' ? 'N/A' : max} km</p>;
                })()}
            </div>
          </div>
          ) : (
          <div className='flex items-center gap-2'>
            <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.14629 9.64624L13.1463 3.64624C13.1927 3.59979 13.2479 3.56294 13.3086 3.5378C13.3693 3.51265 13.4343 3.49971 13.5 3.49971C13.5657 3.49971 13.6308 3.51265 13.6915 3.5378C13.7522 3.56294 13.8073 3.59979 13.8538 3.64624C13.9002 3.6927 13.9371 3.74785 13.9622 3.80854C13.9874 3.86924 14.0003 3.93429 14.0003 3.99999C14.0003 4.06569 13.9874 4.13074 13.9622 4.19144C13.9371 4.25214 13.9002 4.30729 13.8538 4.35374L7.85379 10.3537C7.80733 10.4002 7.75218 10.437 7.69148 10.4622C7.63079 10.4873 7.56573 10.5003 7.50004 10.5003C7.43434 10.5003 7.36928 10.4873 7.30859 10.4622C7.24789 10.437 7.19274 10.4002 7.14629 10.3537C7.09983 10.3073 7.06298 10.2521 7.03784 10.1914C7.0127 10.1307 6.99976 10.0657 6.99976 9.99999C6.99976 9.93429 7.0127 9.86924 7.03784 9.80854C7.06298 9.74785 7.09983 9.6927 7.14629 9.64624ZM8.00004 5.49999C8.43435 5.49944 8.86585 5.56974 9.27754 5.70812C9.34004 5.73028 9.40633 5.73978 9.47254 5.73608C9.53876 5.73237 9.60357 5.71553 9.66322 5.68654C9.72286 5.65755 9.77614 5.61698 9.81995 5.56719C9.86377 5.51741 9.89724 5.45941 9.91842 5.39657C9.9396 5.33372 9.94807 5.26729 9.94334 5.20114C9.9386 5.135 9.92075 5.07045 9.89083 5.01127C9.86091 4.95208 9.81951 4.89944 9.76905 4.85641C9.71859 4.81338 9.66008 4.78082 9.59691 4.76062C8.80011 4.492 7.94844 4.42866 7.12067 4.57647C6.2929 4.72429 5.51579 5.07847 4.8612 5.60626C4.20662 6.13406 3.69571 6.81841 3.37575 7.59601C3.05578 8.37361 2.93709 9.21935 3.03066 10.055C3.04419 10.1772 3.10227 10.2902 3.19382 10.3722C3.28536 10.4543 3.40395 10.4998 3.52691 10.5C3.54504 10.5 3.56379 10.5 3.58254 10.4969C3.7143 10.4823 3.83488 10.4159 3.91774 10.3124C4.0006 10.2089 4.03897 10.0768 4.02441 9.94499C4.00814 9.79722 4 9.64866 4.00004 9.49999C4.00119 8.43948 4.42299 7.42274 5.17289 6.67284C5.92278 5.92295 6.93952 5.50115 8.00004 5.49999ZM14.2338 6.31249C14.2038 6.25405 14.1627 6.20209 14.1126 6.15956C14.0626 6.11704 14.0046 6.08478 13.9421 6.06465C13.8796 6.04451 13.8138 6.03688 13.7483 6.04219C13.6829 6.04751 13.6191 6.06566 13.5607 6.09562C13.5022 6.12557 13.4503 6.16675 13.4077 6.21679C13.3652 6.26683 13.333 6.32476 13.3128 6.38726C13.2927 6.44977 13.285 6.51563 13.2904 6.58108C13.2957 6.64654 13.3138 6.7103 13.3438 6.76874C13.7137 7.49516 13.9321 8.28918 13.9859 9.10259C14.0396 9.91601 13.9275 10.7319 13.6563 11.5006L2.33754 11.4962C2.02174 10.591 1.9269 9.6234 2.06093 8.67408C2.19496 7.72476 2.55397 6.82123 3.10804 6.03881C3.66211 5.25639 4.39518 4.61775 5.24614 4.17612C6.0971 3.73449 7.0413 3.50267 8.00004 3.49999H8.05504C8.98624 3.50585 9.90301 3.73065 10.7313 4.15624C10.7899 4.18849 10.8544 4.20866 10.9209 4.21554C10.9874 4.22243 11.0547 4.2159 11.1186 4.19633C11.1826 4.17677 11.242 4.14457 11.2933 4.10164C11.3446 4.05872 11.3867 4.00593 11.4172 3.94642C11.4478 3.88691 11.4661 3.82188 11.471 3.75517C11.4759 3.68847 11.4675 3.62145 11.446 3.55809C11.4246 3.49472 11.3907 3.4363 11.3463 3.38628C11.3019 3.33626 11.2479 3.29565 11.1875 3.26687C9.94064 2.62819 8.53078 2.37836 7.14035 2.54967C5.74991 2.72099 4.44286 3.30557 3.38828 4.22781C2.3337 5.15005 1.58011 6.3675 1.22498 7.72269C0.869846 9.07788 0.929523 10.5085 1.39629 11.8294C1.46523 12.0251 1.5931 12.1946 1.76232 12.3147C1.93154 12.4348 2.13379 12.4995 2.34129 12.5H13.6582C13.8655 12.5001 14.0678 12.4358 14.237 12.3158C14.4062 12.1959 14.534 12.0263 14.6025 11.8306C14.9179 10.9337 15.0478 9.98205 14.9844 9.03341C14.921 8.08476 14.6657 7.15887 14.2338 6.31187V6.31249Z" fill="#696665"/>
            </svg>
            <div className="flex items-center gap-16">
              <p className='text-[#696665] w-20'>Mileage:</p>
              {(() => {
                const min = Math.min(...car.variant.map((v: any) => v.fuelAndPerformance.petrolMileageARAI.split(' ')[0]));
                const max = Math.max(...car.variant.map((v: any) => v.fuelAndPerformance.petrolMileageARAI.split(' ')[0]));
                return <p>{min as any == 'Infinity' ? 'N/A' : min} - {max as any == '-Infinity' ? 'N/A' : max} kmpl</p>;
                })()}
            </div>
          </div>
          )}

          <div className='flex items-center gap-2'>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.125 10C7.93958 10 7.75833 9.94502 7.60416 9.842C7.44999 9.73899 7.32982 9.59257 7.25887 9.42126C7.18791 9.24996 7.16934 9.06146 7.20552 8.8796C7.24169 8.69775 7.33098 8.5307 7.46209 8.39959C7.5932 8.26848 7.76025 8.17919 7.94211 8.14301C8.12396 8.10684 8.31246 8.12541 8.48377 8.19636C8.65507 8.26732 8.80149 8.38748 8.90451 8.54165C9.00752 8.69582 9.0625 8.87708 9.0625 9.0625C9.0625 9.31114 8.96373 9.5496 8.78792 9.72541C8.6121 9.90123 8.37364 10 8.125 10ZM16.25 8.125C16.25 9.73197 15.7735 11.3029 14.8807 12.639C13.9879 13.9752 12.719 15.0166 11.2343 15.6315C9.74966 16.2465 8.11599 16.4074 6.5399 16.0939C4.9638 15.7804 3.51606 15.0065 2.37976 13.8702C1.24346 12.7339 0.469628 11.2862 0.156123 9.71011C-0.157382 8.13401 0.00352044 6.50035 0.618482 5.0157C1.23344 3.53105 2.27485 2.2621 3.611 1.36931C4.94714 0.476523 6.51803 0 8.125 0C10.2792 0.00227486 12.3445 0.85903 13.8677 2.38227C15.391 3.90551 16.2477 5.97081 16.25 8.125ZM1.25 8.125V8.15078C3.16963 6.52021 5.60632 5.625 8.125 5.625C10.6437 5.625 13.0804 6.52021 15 8.15078V8.125C15 6.30164 14.2757 4.55295 12.9864 3.26364C11.6971 1.97433 9.94837 1.25 8.125 1.25C6.30164 1.25 4.55296 1.97433 3.26364 3.26364C1.97433 4.55295 1.25 6.30164 1.25 8.125ZM6.52344 14.8109L5.19141 11.25H2.00235C2.45537 12.1339 3.09381 12.9096 3.87406 13.5241C4.65432 14.1387 5.55802 14.5776 6.52344 14.8109ZM8.125 15C8.18985 15 8.25469 15 8.31954 15L9.8875 10.8148C9.97749 10.5767 10.1378 10.3715 10.3471 10.2265C10.5564 10.0816 10.8048 10.0036 11.0594 10.0031H14.7406C14.7703 9.90078 14.7969 9.79687 14.8188 9.69062C13.9459 8.80008 12.9042 8.09261 11.7545 7.60964C10.6049 7.12667 9.37042 6.8779 8.12344 6.8779C6.87647 6.8779 5.64202 7.12667 4.49237 7.60964C3.34273 8.09261 2.30098 8.80008 1.42813 9.69062C1.45235 9.79531 1.47891 9.89922 1.50625 10.0031H5.19141C5.44608 10.0038 5.69452 10.0819 5.9038 10.227C6.11309 10.3721 6.27333 10.5774 6.36328 10.8156L7.92578 15C7.99297 15 8.0586 15 8.125 15ZM14.2477 11.25H11.0586L9.72344 14.8117C10.6895 14.5788 11.5939 14.1399 12.3747 13.5252C13.1556 12.9105 13.7944 12.1344 14.2477 11.25Z" fill="#B6B6B6"/>
            </svg>
            <div className="flex items-center gap-16">
              <p className='text-[#696665] w-20'>Drive Type:</p>
              {car?.variant[0]?.engineAndTransmission.driveType || 'N/A'}
            </div>
          </div>
        </div>
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
        <div className='overflow-x-auto max-h-96'>
        <div className="mt-6 overflow-hidden w-[665px] rounded-xl border border-gray-200">
          <div className="grid grid-cols-12 bg-gray-50 text-gray-600 text-sm font-medium px-4 py-3">
            <div className="col-span-6">Variants</div>
            <div className="col-span-3">On-Road Price</div>
            <div className="col-span-3 text-right">Actions</div>
          </div>
          {variants?.map((v: any, index: number) => (
            <div key={v.name} className="grid grid-cols-12 items-center px-4 py-4 border-t text-sm">
              <div className="col-span-6">
                <Link href={`${name}/${v.name.replace(/\s+/g, '-')}`} className="font-semibold text-gray-900">{v.name}</Link>
                <p className="text-gray-600 text-xs">{v.engineAndTransmission.displacement.split(' ')[0]} cc, {v.engineAndTransmission.transmissionType}, {v.fuelAndPerformance.fuelType}, {v.fuelAndPerformance.petrolMileageARAI.split(' ')[0]} kmpl</p>
              </div>
              <div className="col-span-3 font-semibold">₹{PriceFormatter(v.price)}</div>
              <div className="col-span-3 flex justify-end gap-4">
                <button onClick={() => openBreakup(v.name, v.price)} className="main-text-color hover:underline">View Price Breakup</button>
                <button onClick={() => {setEmiOpen(true); setIndex(index)}} className="text-blue-600 hover:underline">EMI Options</button>
              </div>
            </div>
          ))}
        </div>
        </div>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="sticky top-24 border border-gray-200 px-4 py-6 rounded-2xl">
            <div>
              <h2 className='lg:text-xl text-lg font-medium'>Popular Cars</h2>
              <p className='text-[#696665] mt-1'>showing more cars you might like</p>
            </div>

            <div className='mt-8 space-y-2'>
              {popularCars.map((pcar: any)=>(
                <div key={pcar._id} onClick={()=>router.push(`/${pcar.brand}/${pcar.modelName}`)} className={`flex gap-4 cursor-pointer hover:text-[#FF7101] ${car._id == pcar._id ? 'hidden' : 'block'}`}>
                  <div>
                    <img src={pcar.images[0]} alt={pcar.modelName} className='w-28 h-20 rounded-lg' />
                  </div>
                  <div>
                    <h2>{pcar.modelName}</h2>
                    <p className='main-text-color'>₹{PriceFormatter(pcar?.variant[0]?.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div id='description' className='mt-4 border border-gray-200 p-5 rounded-2xl'>
        <p className='lg:text-xl text-lg font-medium'>Description</p>
        <div
          className="quill-content prose prose-sm sm:prose lg:prose-lg w-full max-w-full"
          dangerouslySetInnerHTML={{
            __html: car.description,
          }}
        />
      </div>
      
  <div id='pros&cons' className="mt-6 border border-gray-200 p-5 rounded-2xl max-w-5xl">
    <h2 className="lg:text-xl text-lg font-medium mb-4">
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

  {car.colors && car.colors.length > 0 && (
    <div className='lg:max-w-2xl border mt-8 rounded-2xl p-4'>
    <h2 className='lg:text-xl text-lg font-medium'>Colours</h2>
    <div className='flex flex-col mt-4 space-x-2 space-y-2'>
    {car.colors.map((c: any) => (
      <div key={c.colorName} className="inline-flex items-center h-20 gap-2 px-3 py-1 rounded-full border">
        <span className="w-10 h-10 rounded-full border" style={{ backgroundColor: c.colorCode }} />
        {c.colorName}
      </div>
      ))}
    </div>
  </div>
  )}



        <aside className="lg:hidden block mt-4">
          <div className="sticky top-24 border border-gray-200 px-4 py-6 rounded-2xl">
            <div>
              <h2 className='lg:text-xl text-lg font-medium'>Popular Cars</h2>
              <p className='text-[#696665] mt-1'>showing more cars you might like</p>
            </div>

            <div className='mt-8 space-y-2'>
              {popularCars.map((pcar: any)=>(
                <div key={pcar._id} onClick={()=>router.push(`/${pcar.brand}/${pcar.modelName}`)} className={`flex gap-4 cursor-pointer hover:text-[#FF7101] ${car._id == pcar._id ? 'hidden' : 'block'}`}>
                  <div>
                    <img src={pcar.images[0]} alt={pcar.modelName} className='w-28 h-20 rounded-lg' />
                  </div>
                  <div>
                    <h2>{pcar.modelName}</h2>
                    <p className='text-[#FF7101]'>₹{PriceFormatter(pcar?.variant[0]?.price)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      {breakupOpen && renderBreakup()}


      <div id='reviews' className="mt-12 bg-white rounded-xl border border-gray-200 overflow-hidden mb-8">
      <div className="px-4 py-4 border-b flex items-center justify-between">
        <h3 className="text-lg font-semibold">User Reviews</h3>
        <div className="text-sm text-gray-600">Average Rating: <span className="font-semibold">{avg.toFixed(1)}</span> / 5 ({reviews.length})</div>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2"> */}
        <div className="p-4 max-h-96 overflow-y-auto">

          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">All Reviews ({reviews.length})</p>
            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="border rounded px-2 py-1 text-sm">
              <option value="latest">Latest</option>
              <option value="top">Top Rated</option>
            </select>
          </div>
          {reviews.length === 0 && <p className="text-sm text-gray-600">No reviews yet. Be the first to review.</p>}
          <ul className="space-y-3">
            {[...reviews]
              .sort((a: any,b: any) => sort==='latest' ? (new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime()) : (b.rating - a.rating))
              .map((r: any) => (
              <li key={r._id} className="p-3 border rounded-lg">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{r.username}</p>
                  <span className="text-sm">{r.rating} / 5</span>
                </div>
                <p>{r.title}</p>
                <p className="text-sm text-gray-700 mt-1">{r.experience}</p>
                <p className="text-xs text-gray-500 mt-1">{new Date(r.postedAt).toLocaleDateString()}</p>
              </li>
            ))}
          </ul>
        </div>
      {/* </div> */}
    </div>


      {/* <Reviews carId={car?._id ?? ''} reviews={reviews} /> */}
      <EmiCalculator open={emiOpen} onClose={() => setEmiOpen(false)} price={car?.variant[index]?.price} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}




