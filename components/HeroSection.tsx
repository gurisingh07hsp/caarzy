// "use client";

// import { ArrowRight, CarIcon } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import { Model } from "@/types/Car";
// import { useRouter } from "next/navigation";

// export function HeroSection() {
//   const [searchInput, setSearchInput] = useState('');
//   const [models, setModels] = useState<Model[]>([]);
//   const [brand, setBrand] = useState('');
//   const router = useRouter();
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   useEffect(()=> {
//     const handleSearch = async () => {
//       const response = await axios.get(`/api/managemodels`, {params: {modelName: searchInput?.toString().toLowerCase(),limit: 8}});
//       if(response.status == 200){
//         console.log("search Models : ", response.data.models);
//         setModels(response.data.models);
//       }
//     }
//     handleSearch();
//   },[searchInput]);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     // <div className="bg-white max-w-7xl lg:px-0 px-2 mx-auto mt-2">
//     //   <div className='relative h-[530px] w-full'>
//     //     <div
//     //       className="h-[500px] w-full inset-0 bg-cover bg-center bg-no-repeat rounded-3xl"
//     //       style={{
//     //         backgroundImage: 'url(/image.png)'
//     //       }}
//     //     >
//     //     <div className='relative ms-4 w-max'>
//     //       <div className='absolute top-10 ms-2'>
//     //         <p className='font-semibold'>1 Year</p>
//     //         <p>Warranty & Insurance</p>

//     //         <div className='mt-5 flex gap-6'>
//     //           <div className='text-[#595959] text-sm'>
//     //             <p>Trusted by</p>
//     //             <p>5000+ people</p>
//     //           </div>
//     //           <div className='flex mt-2'>
//     //             <img src="#" alt="#" className='w-10 h-10 bg-gray-300 rounded-full'  />
//     //             <img src="#" alt="#" className='w-10 h-10 bg-gray-300 rounded-full'/>
//     //             <img src="#" alt="#" className='w-10 h-10 bg-gray-300 rounded-full'/>
//     //           </div>
//     //         </div>
//     //       </div>
//     //       <svg width="260" height="213" viewBox="0 0 360 213" fill="none" xmlns="http://www.w3.org/2000/svg">
//     //         <path d="M0 25C0 11.1929 11.1929 0 25 0H207.488C212.074 0 216.572 1.26138 220.489 3.64611L251.511 22.5327C255.428 24.9174 259.926 26.1788 264.512 26.1788H335C348.807 26.1788 360 37.3717 360 51.1788V188C360 201.807 348.807 213 335 213H179.859C175.055 213 170.353 211.616 166.315 209.013L142.685 193.783C138.647 191.18 133.945 189.796 129.141 189.796H25C11.1929 189.796 0 178.603 0 164.796V25Z" fill="white"/>
//     //       </svg>
//     //     </div>

//     //       <div className='w-12 lg:h-36 bg-white absolute top-72 right-0 rotate-45 border-none'></div>
//     //       <div className='w-[70%] flex h-40 absolute bottom-0 lg:right-0 right-5'>
//     //         <div className='relative w-full h-full flex'>
//     //           <div className='h-36 w-9 bg-white rotate-[15deg] rounded-t-xl border-none'></div>
//     //           <div className='w-full h-full absolute left-5 bg-white rounded-l-lg border-none'>
//     //             <div className='lg:mt-8 mt-2 ms-6 flex lg:flex-row flex-col justify-between'>
//     //               <div className='max-w-80'>
//     //                 <h1 className='lg:text-4xl'>Quality <b className='main-text-color'>Cars</b> with <b className='main-text-color'>Unbeatable</b> Deals</h1>
//     //               </div>
//     //               <div>
//     //                 <div className='max-w-36 lg:text-sm text-xs lg:mt-0 mt-2 text-[#595959]'>We help you find the right car.</div>
//     //                 <div className='text-xs lg:mt-5 mt-3'>4.9 star rating</div>
//     //               </div>
//     //             </div>
//     //           </div>
//     //         </div>
//     //       </div>
//     //     </div>
//     //   </div>
//     // </div>

//     <section className="relative min-h-[80vh] mt-8 flex flex-col items-center justify-center px-6 overflow-hidden bg-white">
//       <div className="absolute inset-0 z-0 max-w-7xl md:mx-auto mx-2">
//         <img
//           alt="Background"
//           className="w-full h-full object-cover rounded-3xl"
//           data-alt="Subtle architectural grid or automotive blueprint lines"
//           src="/hero.jpg"
//         />
//         {/* <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div> */}
//       </div>
//       <div className="relative z-10 w-full max-w-4xl space-y-12">
//         <div className="space-y-4 text-center">
//           <span className="inline-block px-4 py-1 rounded-full bg-[#F80A1D]/10 border border-[#F80A1D]/20 text-[#F80A1D] font-headline text-xs font-bold tracking-[0.2em] uppercase">
//             The Precision Redline
//           </span>
//           <h1 className="text-4xl md:text-6xl font-headline text-white font-bold tracking-tighter leading-2 md:leading-1 text-on-background">
//             Car Intelligence <br />
//             <span className="text-white">at Your Fingertips</span>
//           </h1>
//         </div>

//         <div className="w-full glass-panel p-2 rounded-2xl border border-neutral-200 shadow-xl">
//           <div className="flex flex-col md:flex-row items-stretch gap-2">
//             <div className="flex-grow flex items-center bg-neutral-50 rounded-xl px-6 py-4 focus-within:ring-2 ring-[#F80A1D]/20 transition-all border border-neutral-100">
//               <span
//                 className="material-symbols-outlined mr-4"
//                 data-icon="directions_car"
//               >
//                 <CarIcon className="text-[#F80A1D]"/>
//               </span>
//               <div ref={dropdownRef} className="relative w-full">
//               <input
//                 className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-lg font-medium placeholder:text-neutral-400 text-on-background"
//                 placeholder="Search car models"
//                 type="text"
//                 value={searchInput}
//                 onChange={(e)=> setSearchInput(e.target.value)}
//                 onFocus={()=> setOpen(true)}
//               />
//               {open && (
//                 <ul className="absolute w-full bg-white border rounded mt-1 shadow-md z-50 max-h-96 md:max-h-72 overflow-y-auto">
//                   {models.map((item, index) => (
//                     <li
//                       key={index}
//                       onClick={() => {
//                         setSearchInput(item.modelName);
//                         setBrand(item.brand);
//                         setOpen(false); // ✅ Close after selecting
//                       }}
//                       className="text-sm md:text-base p-2 hover:bg-gray-100 cursor-pointer"
//                     >
//                       {item.modelName}
//                     </li>
//                   ))}
//                 </ul>
//               )}

//               </div>
//             </div>
         
//             <button onClick={()=> router.push(`/${brand.toLowerCase().replace(/\s+/g, '-')}/${searchInput.toLowerCase().replace(/\s+/g, '-')}`)} className="bg-[#F80A1D] hover:brightness-110 text-white font-headline font-bold px-10 py-4 rounded-xl transition-all flex items-center justify-center gap-2 group">
//               SEARCH
//               <span
//                 className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
//                 data-icon="arrow_forward"
//               >
//                 <ArrowRight/>
//               </span>
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
//         <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-background">
//           Scroll to Explore
//         </span>
//         <div className="w-px h-12 bg-gradient-to-b from-[#F80A1D] to-transparent"></div>
//       </div>
//     </section>
//   );
// }


"use client";

import { ArrowRight, CarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import axios from "axios";
import { Model } from "@/types/Car";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    image: "/hero-slides/kia-syros.jpg",
    badge: "Launched",
    title: "Kia Syros EV",
    subtitle: "Small Car, Big Range!",
    ctaLabel: "Know More",
    ctaHref: "/kia/syros-ev",
  },
  {
    id: 2,
    image: "/hero-slides/tata-nexon.jpg",
    badge: "New Arrival",
    title: "Tata Nexon EV",
    subtitle: "Power Meets Efficiency",
    ctaLabel: "Know More",
    ctaHref: "/tata/nexon-ev",
  },
  {
    id: 3,
    image: "/hero-slides/hyundai-creta.jpg",
    badge: "Best Seller",
    title: "Hyundai Creta",
    subtitle: "Bold. Built. Beloved.",
    ctaLabel: "Know More",
    ctaHref: "/hyundai/creta",
  },
];

const AUTOPLAY_MS = 5000;

export function HeroSection() {
  const [searchInput, setSearchInput] = useState("");
  const [models, setModels] = useState<Model[]>([]);
  const [brand, setBrand] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleSearch = async () => {
      const response = await axios.get(`/api/managemodels`, {
        params: { modelName: searchInput?.toString().toLowerCase(), limit: 8 },
      });
      if (response.status == 200) {
        setModels(response.data.models);
      }
    };
    handleSearch();
  }, [searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [paused, next]);

  const slide = slides[current];

  return (
    <section className="relative max-w-7xl mx-auto mt-8 px-2 md:px-0">
      <div
        className="relative h-[560px] md:h-[600px] w-full rounded-3xl overflow-hidden"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {/* Slides */}
        {slides.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img src={s.image} alt={s.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </div>
        ))}

        {/* Slide copy */}
        <div className="absolute z-20 top-10 left-6 md:left-12 max-w-md">
          <span className="inline-block px-4 py-1.5 rounded-md bg-[#F80A1D] text-white font-headline text-xs font-bold tracking-[0.15em] uppercase">
            {slide.badge}
          </span>
          <h1 className="mt-4 text-4xl md:text-6xl font-headline font-extrabold text-white tracking-tight leading-[1.05]">
            {slide.title}
          </h1>
          <p className="mt-2 text-lg md:text-xl text-white/90">{slide.subtitle}</p>
          <button
            onClick={() => router.push(slide.ctaHref)}
            className="mt-6 bg-white hover:bg-neutral-100 text-neutral-900 font-headline font-bold px-6 py-3 rounded-xl transition-all"
          >
            {slide.ctaLabel}
          </button>
        </div>

        {/* Arrows */}
        <button
          aria-label="Previous slide"
          onClick={prev}
          className="absolute z-20 left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur flex items-center justify-center text-white transition-colors"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          aria-label="Next slide"
          onClick={next}
          className="absolute z-20 right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur flex items-center justify-center text-white transition-colors"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dots — persistent across every slide */}
        <div className="absolute z-20 bottom-44 md:bottom-48 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-8 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>

        {/* Heading — persistent across every slide */}
        <h2 className="absolute z-20 bottom-32 md:bottom-36 left-1/2 -translate-x-1/2 text-2xl md:text-4xl font-headline font-bold text-white text-center whitespace-nowrap">
          Find Your Dream Car or Bike
        </h2>

        <div className="absolute z-30 bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-[92%] md:w-[85%]">
          <div className="w-[85%] mx-auto bg-white rounded-2xl border border-neutral-200 shadow-xl p-2 flex flex-col md:flex-row items-stretch gap-2">

            <div className="flex-grow flex items-center bg-neutral-50 rounded-xl px-6 py-4 focus-within:ring-2 ring-[#F80A1D]/20 transition-all border border-neutral-100">
              <CarIcon className="text-[#F80A1D] mr-4 shrink-0" />
              <div ref={dropdownRef} className="relative w-full">
  <input
    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-lg font-medium placeholder:text-neutral-400"
    placeholder="Search Car"
    type="text"
    value={searchInput}
    onChange={(e) => setSearchInput(e.target.value)}
    onFocus={() => setOpen(true)}
  />
  {open && models.length > 0 && (
    <ul className="absolute bottom-full mb-2 w-full bg-white border border-neutral-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
      {models.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            setSearchInput(item.modelName);
            setBrand(item.brand);
            setOpen(false);
          }}
          className="text-sm md:text-base px-4 py-2.5 hover:bg-neutral-100 cursor-pointer first:rounded-t-xl last:rounded-b-xl"
        >
          {item.modelName}
        </li>
      ))}
    </ul>
  )}
</div>
            </div>

            <button
              onClick={() =>
                router.push(
                  `/${brand.toLowerCase().replace(/\s+/g, "-")}/${searchInput
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`
                )
              }
              className="bg-[#F80A1D] hover:brightness-110 text-white font-headline font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2 group"
            >
              <span className="hidden md:inline">SEARCH</span>
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
      </div>


      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-900">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-[#F80A1D] to-transparent"
        />
      </motion.div>
      </div>
    </section>
  );
}
