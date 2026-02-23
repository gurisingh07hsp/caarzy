import { Mail, Phone } from 'lucide-react'
import React, { useState } from 'react'

interface FormData {
  email: string
  phone: string
  location: string
}
const OfferForm = ({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    location: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev ) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
    setOpen(false)
  }

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
              <p className="main-text-color text-xs font-semibold tracking-widest uppercase mb-2">
                Exclusive Access
              </p>
              <h2 className="text-2xl font-bold tracking-tight">
                Claim Your Offer
              </h2>
              <p className="text-sm mt-1">
                Fill in your details to get started.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                    <Mail size={16}/>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className="w-full border focus:border-red-500  rounded-xl pl-9 pr-4 py-3 placeholder text-sm outline-none"
                  />
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest">
                  Phone Number
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm">
                    <Phone size={16}/>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 00000-00000"
                    required
                    className="w-full border focus:border-red-500 rounded-xl pl-9 pr-4 py-3 placeholder text-sm outline-none"
                  />
                </div>
              </div>

              {/* Location */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium uppercase tracking-widest">
                  Location
                </label>
                <div className="relative">
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
                    onChange={handleChange}
                    placeholder="City, Country"
                    required
                    className="w-full border focus:border-red-500 rounded-xl pl-9 pr-4 py-3 placeholder text-sm outline-none"
                  />
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
