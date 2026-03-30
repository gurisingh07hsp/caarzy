"use client";

import { ArrowRight, CarIcon } from "lucide-react";
import HomeFilter from "./HomeFilter";

interface HeroSectionProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function HeroSection({ searchTerm, onSearchChange }: HeroSectionProps) {
  return (
    // <div className="bg-white max-w-7xl lg:px-0 px-2 mx-auto mt-2">
    //   <div className='relative h-[530px] w-full'>
    //     <div
    //       className="h-[500px] w-full inset-0 bg-cover bg-center bg-no-repeat rounded-3xl"
    //       style={{
    //         backgroundImage: 'url(/image.png)'
    //       }}
    //     >
    //     <div className='relative ms-4 w-max'>
    //       <div className='absolute top-10 ms-2'>
    //         <p className='font-semibold'>1 Year</p>
    //         <p>Warranty & Insurance</p>

    //         <div className='mt-5 flex gap-6'>
    //           <div className='text-[#595959] text-sm'>
    //             <p>Trusted by</p>
    //             <p>5000+ people</p>
    //           </div>
    //           <div className='flex mt-2'>
    //             <img src="#" alt="#" className='w-10 h-10 bg-gray-300 rounded-full'  />
    //             <img src="#" alt="#" className='w-10 h-10 bg-gray-300 rounded-full'/>
    //             <img src="#" alt="#" className='w-10 h-10 bg-gray-300 rounded-full'/>
    //           </div>
    //         </div>
    //       </div>
    //       <svg width="260" height="213" viewBox="0 0 360 213" fill="none" xmlns="http://www.w3.org/2000/svg">
    //         <path d="M0 25C0 11.1929 11.1929 0 25 0H207.488C212.074 0 216.572 1.26138 220.489 3.64611L251.511 22.5327C255.428 24.9174 259.926 26.1788 264.512 26.1788H335C348.807 26.1788 360 37.3717 360 51.1788V188C360 201.807 348.807 213 335 213H179.859C175.055 213 170.353 211.616 166.315 209.013L142.685 193.783C138.647 191.18 133.945 189.796 129.141 189.796H25C11.1929 189.796 0 178.603 0 164.796V25Z" fill="white"/>
    //       </svg>
    //     </div>

    //       <div className='w-12 lg:h-36 bg-white absolute top-72 right-0 rotate-45 border-none'></div>
    //       <div className='w-[70%] flex h-40 absolute bottom-0 lg:right-0 right-5'>
    //         <div className='relative w-full h-full flex'>
    //           <div className='h-36 w-9 bg-white rotate-[15deg] rounded-t-xl border-none'></div>
    //           <div className='w-full h-full absolute left-5 bg-white rounded-l-lg border-none'>
    //             <div className='lg:mt-8 mt-2 ms-6 flex lg:flex-row flex-col justify-between'>
    //               <div className='max-w-80'>
    //                 <h1 className='lg:text-4xl'>Quality <b className='main-text-color'>Cars</b> with <b className='main-text-color'>Unbeatable</b> Deals</h1>
    //               </div>
    //               <div>
    //                 <div className='max-w-36 lg:text-sm text-xs lg:mt-0 mt-2 text-[#595959]'>We help you find the right car.</div>
    //                 <div className='text-xs lg:mt-5 mt-3'>4.9 star rating</div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <img
          alt="Background Pattern"
          className="w-full h-full object-cover grayscale"
          data-alt="Subtle architectural grid or automotive blueprint lines"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHOelQ75D9JdP20TCXd-EyKvVdm3VpiGUq8zOLMfKzd0m3yMuEZwMml_JN9EB3A8PKdT-ces4yONec-Q-Hfl79kN9XGHI8Eyx0JuGbNP-wIEtvINIeM_xteiG0qIatJ-0A-bFghwv1ntp66s8U6KIlmqUE8ssFdPgmVJUeZjqvbd_XAJ4AsYqcAYFCmvQ-gHTm3JHwDu-jiM19n8r-t55TH3exosxAWb85HKitGfxut8rrjvo9fc6QWMxeF2n7pqrwPlIYoYGB2hZ4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white"></div>
      </div>
      <div className="relative z-10 w-full max-w-4xl space-y-12">
        <div className="space-y-4 text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-[#F80A1D]/10 border border-[#F80A1D]/20 text-[#F80A1D] font-headline text-xs font-bold tracking-[0.2em] uppercase">
            The Precision Redline
          </span>
          <h1 className="text-6xl md:text-8xl font-headline font-bold tracking-tighter leading-[0.9] text-on-background">
            Car Intelligence <br />
            <span className="text-neutral-400">at Your Fingertips</span>
          </h1>
        </div>

        {/* <div className="w-full glass-panel p-2 rounded-2xl border border-neutral-200 shadow-xl">
          <div className="flex flex-col md:flex-row items-stretch gap-2">
            <div className="flex-grow flex items-center bg-neutral-50 rounded-xl px-6 py-4 focus-within:ring-2 ring-primary/20 transition-all border border-neutral-100">
              <span
                className="material-symbols-outlined text-primary mr-4"
                data-icon="directions_car"
              >
                <CarIcon className="text-[#F80A1D]"/>
              </span>
              <input
                className="w-full bg-transparent border-none focus:ring-0 text-lg font-medium placeholder:text-neutral-400 text-on-background"
                placeholder="Search car models, specs, or average prices..."
                type="text"
              />
            </div>
         
            <button className="bg-[#F80A1D] hover:brightness-110 text-white font-headline font-bold px-10 py-4 rounded-xl transition-all flex items-center justify-center gap-2 group">
              ANALYZE
              <span
                className="material-symbols-outlined group-hover:translate-x-1 transition-transform"
                data-icon="arrow_forward"
              >
                <ArrowRight/>
              </span>
            </button>
          </div>
        </div> */}

             <HomeFilter/>

        {/* <div className="flex flex-wrap justify-center gap-6 pt-4">
          <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">
            Trending:
          </span>
          <a
            className="text-on-background hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-primary pb-0.5"
            href="#"
          >
            Porsche 911 GT3 RS
          </a>
          <a
            className="text-on-background hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-primary pb-0.5"
            href="#"
          >
            Tesla Model S Plaid
          </a>
          <a
            className="text-on-background hover:text-primary transition-colors text-xs font-bold uppercase tracking-widest border-b border-transparent hover:border-primary pb-0.5"
            href="#"
          >
            BMW M4 Competition
          </a>
        </div> */}
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-on-background">
          Scroll to Explore
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-[#F80A1D] to-transparent"></div>
      </div>
    </section>
  );
}
