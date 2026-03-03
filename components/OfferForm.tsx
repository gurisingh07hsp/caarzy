import { Mail, Phone } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import { districtArray,capitalizeString } from '../hook/utils';
import { useRouter } from 'next/navigation';
import { useParams } from "next/navigation";

interface FormData {
  email: string
  phone: string
  location: string
}
const OfferForm = ({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) => {
  const locationRef = useRef<HTMLDivElement>(null);
  const { name } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    location: '',
  })
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [filteredDistricts, setFilteredDistricts] = useState<string[]>(districtArray.slice(0,10));

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (locationRef.current && !locationRef.current.contains(event.target as Node)) {
        setShowLocationDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev ) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('caarzyLocation', capitalizeString(formData.location).replace(/\s+/g, ''));
    router.push(`${name}/${'price-in-'+capitalizeString(formData.location).replace(/\s+/g, '')}`)
    console.log(formData)
    setOpen(false)
  }

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, location: value }));
    if (value.trim() === "") {
      setFilteredDistricts(districtArray.slice(0,10));
      return;
    }
    const filtered = districtArray.filter((district) =>
      district.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDistricts(filtered);
    setShowLocationDropdown(true);
  }
    const handleLocationSelect = (selectedCity: string) => {
    setFormData({ ...formData, location: selectedCity });
    setShowLocationDropdown(false);
  };

  const handleLocationFocus = () => {
    setShowLocationDropdown(true);
  };
  return (
    <div className="flex items-center justify-center">

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50"
          onClick={() => setOpen(false)}
        >
          {/* Modal */}
          <div
            className="relative w-full max-w-md mx-4 bg-white border rounded-2xl shadow-2xl backdrop-blur-xl p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/20 transition-all duration-200 text-lg leading-none"
            >
              ×
            </button>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold tracking-tight">
                Select Your Location
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">

                          {/* Location */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest">
                  Location
                </label>
                <div className="relative" ref={locationRef}>
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={(e) => handleChangeLocation(e)}
                    onFocus={handleLocationFocus}
                    placeholder="City, Country"
                    required
                    className="w-full border focus:border-red-500 rounded-xl pl-9 pr-4 py-3 placeholder text-sm outline-none"
                  />
                {showLocationDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredDistricts.length > 0 ? (
                    filteredDistricts.map((city, index) => (
                      <button
                        key={index}
                        onClick={() => handleLocationSelect(city)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          {/* <MapPin className="w-4 h-4 text-gray-400 mr-2" /> */}
                          <span className="text-gray-800">{city}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No cities found
                    </div>
                  )}
                </div>
              )}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full mt-2 main-bg-color text-white font-semibold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-red-900/40 tracking-wide"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default OfferForm
