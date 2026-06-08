"use client";

import { ArrowRight, CarIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Model } from "@/types/Car";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function HeroSection() {
  const [searchInput, setSearchInput] = useState('');
  const [models, setModels] = useState<Model[]>([]);
  const [brand, setBrand] = useState('');
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    const handleSearch = async () => {
      const response = await axios.get(`/api/managemodels`, {params: {modelName: searchInput?.toString().toLowerCase(),limit: 8}});
      if(response.status == 200){
        console.log("search Models : ", response.data.models);
        setModels(response.data.models);
      }
    }
    handleSearch();
  },[searchInput]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative min-h-[90vh] mt-4 flex flex-col items-center justify-center px-4 overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 max-w-7xl md:mx-auto mx-2">
        <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            alt="Background"
            className="w-full h-full object-cover"
            src="/hero.jpg"
          />
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-10">
        <div className="space-y-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#F80A1D]/20 border border-[#F80A1D]/30 text-[#F80A1D] text-xs font-bold tracking-[0.25em] uppercase backdrop-blur-sm">
              The Precision Redline
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-sans font-black tracking-tighter leading-[1.1] md:leading-[1.05] text-white"
          >
            Car Intelligence <br />
            <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
              at Your Fingertips
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto font-medium"
          >
            Compare, explore, and choose your perfect ride with AI-driven insights and real-time market data.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full backdrop-blur-xl bg-white/10 p-3 rounded-2xl border border-white/20 shadow-2xl"
        >
          <div className="flex flex-col md:flex-row items-stretch gap-3">
            <div className="flex-grow flex items-center bg-white rounded-xl px-6 py-4 focus-within:ring-2 ring-[#F80A1D]/30 transition-all border border-transparent shadow-inner">
              <span className="mr-4">
                <CarIcon className="text-[#F80A1D] w-6 h-6"/>
              </span>
              <div ref={dropdownRef} className="relative w-full">
                <input
                  className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-lg font-medium placeholder:text-neutral-400 text-slate-900"
                  placeholder="Search car models (e.g. Tesla Model 3)"
                  type="text"
                  value={searchInput}
                  onChange={(e)=> setSearchInput(e.target.value)}
                  onFocus={()=> setOpen(true)}
                />
                <AnimatePresence>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute left-0 right-0 mt-4 bg-white border border-neutral-200 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto overflow-x-hidden p-2"
                    >
                      {models.length > 0 ? (
                        models.map((item, index) => (
                          <motion.li
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            key={index}
                            onClick={() => {
                              setSearchInput(item.modelName);
                              setBrand(item.brand);
                              setOpen(false);
                            }}
                            className="text-sm md:text-base p-3 hover:bg-[#F80A1D]/5 hover:text-[#F80A1D] rounded-lg cursor-pointer transition-colors font-medium flex items-center gap-3"
                          >
                            <CarIcon className="w-4 h-4 opacity-50" />
                            {item.modelName}
                          </motion.li>
                        ))
                      ) : (
                        <li className="p-4 text-center text-neutral-400 text-sm italic">
                          No models found...
                        </li>
                      )}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            </div>
         
            <motion.button
              whileHover={{ scale: 1.02, brightness: 1.1 }}
              whileTap={{ scale: 0.98 }}
              onClick={()=> router.push(`/${brand.toLowerCase().replace(/\s+/g, '-')}/${searchInput.toLowerCase().replace(/\s+/g, '-')}`)} 
              className="bg-[#F80A1D] text-white font-sans font-extrabold px-10 py-4 rounded-xl transition-all flex items-center justify-center gap-2 group shadow-lg shadow-[#F80A1D]/20"
            >
              SEARCH
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.span>
            </motion.button>
          </div>
        </motion.div>
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
    </section>
  );
}
