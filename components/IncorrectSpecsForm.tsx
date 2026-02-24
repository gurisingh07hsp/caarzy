import React, { useState } from 'react'

interface FormData {
  incorrectSpec: string
  field: string
  comment: string
}
const IncorrectSpecsForm = ({open, setOpen}: {open: boolean, setOpen: (open: boolean) => void}) => {
  const [formData, setFormData] = useState<FormData>({
    incorrectSpec: '',
    field: '',
    comment: '',
  })

  const FieldData = {
    'Engine & Transmission': ["Engine Type","Battery Capacity","Motor Power","Motor Type","Range","Battery Type",
        "Charging Time (A.C)","Charging Time (D.C)","Regenerative Braking","Regenerative Braking Levels","Charging Port",
        "Charging Options","Charger Type","Displacement","Max Power", "Max Torque","No. of Cylinders","Valves Per Cylinder",
        "Fuel Supply System","Turbo Charger","Transmission Type","Gearbox","Drive Type",],
    'Fuel & Performance': ["Fuel Type","Petrol Mileage ARAI","Petrol Fuel Tank Capacity","Emission Norm Compliance",],
    'Suspension, Steering & Brakes': ["Front Suspension","Rear Suspension","Steering Type","Steering Column","Turning Radius",
        "Front Brake Type","Rear Brake Type","Boot Space Rear Seat Folding",],
    'Dimensions & Capacity': ["Length","Width","Height","Boot Space","Seating Capacity","Ground Clearance Unladen",
        "Wheel Base","No. of Doors"],
    'Comfort & Convenience': ["Power Steering","Air Conditioner","Heater","Adjustable Steering","Height Adjustable Driver Seat","Ventilated Seats",
        "Electric Adjustable Seats","Automatic Climate Control","Air Quality Control","Accessory Power Outlet","Trunk Light",
        "Vanity Mirror","Rear Reading Lamp","Rear Seat Headrest","Adjustable Headrest","Rear Seat Centre Arm Rest",
        "Height Adjustable Front Seat Belts","Rear AC Vents","Cruise Control","Parking Sensors","Foldable Rear Seat",
        "Smart Access Card Entry","KeyLess Entry","Engine Start/Stop Button","Cooled Glovebox","Voice Commands",
        "Paddle Shifters","USB Charger","Central Console Armrest","Tailgate Ajar Warning","Hands-Free Tailgate",
        "Drive Modes","Idle Start-Stop System","Rear Window Sunblind","Automatic Headlamps","Follow Me Home Headlamps",
        "Voice assisted sunroof","Drive Mode Types","Power Windows","Cup Holders"],
    'Interior': ["Tachometer","Leather Wrapped Steering Wheel","Leather wrap gear-shift selector","Glove Box","Digital Cluster",
        "Digital Cluster Size","Upholstery"],
    'Exterior': ["Rain Sensing Wiper","Rear Window Wiper","Rear Window Washer","Rear Window Defogger","Wheel Covers",
        "Alloy Wheels","Power Antenna","Rear Spoiler","Outside Rear View Mirror Turn Indicators","Integrated Antenna",
        "Chrome Grille","Projector Headlamps","Cornering Foglamps","Roof Rails","Automatic Headlamps","Fog Lights",
        "Antenna","Sunroof","Boot Opening","Puddle Lamps","Outside Rear View Mirror (ORVM)","Tyre Size","Tyre Type",
        "Wheel Size","LED DRLs","LED Headlamps","LED Taillights","LED Fog Lamps","Additional Features"],
    'Safety': ["Anti-lock Braking System (ABS)","Brake Assist","Central Locking","Child Safety Locks","Anti-Theft Alarm",
        "No. of Airbags","Driver Airbag","Passenger Airbag","Side Airbag","Side Airbag-Rear","Day & Night Rear View Mirror",
        "Curtain Airbag","Electronic Brakeforce Distribution (EBD)","Seat Belt Warning","Door Ajar Warning","Traction Control",
        "Tyre Pressure Monitoring System (TPMS)","Engine Immobilizer","Electronic Stability Control (ESC)","Rear Camera",
        "Speed Alert","Speed Sensing Auto Door Lock","ISOFIX Child Seat Mounts","Heads-Up Display (HUD)","Pretensioners & Force Limiter Seatbelts",
        "Blind Spot Camera","Hill Descent Control","Hill Assist","Impact Sensing Auto Door Unlock","360 View Camera"],
    'Entertainment & Communication': ["Radio","Wireless Phone Charging","Bluetooth Connectivity","Touchscreen","Touchscreen Size",
        "Android Auto","Apple CarPlay","No. of Speakers","Usb Ports","Additional Features","Tweeters","Speakers"],
    'ADAS Feature': ["Blind Spot Monitor","Forward Collision Warning","Automatic Emergency Braking","Speed Assist System",
        "Traffic Sign Recognition","Blind Spot Collision Avoidance Assist","Lane Departure Warning","Lane Keep Assist",
        "Lane Departure Prevention Assist","Driver Attention Warning","Adaptive Cruise Control","Adaptive High Beam Assist",
        "Rear Cross Traffic Alert","Rear Cross Traffic Collision-Avoidance Assist",],
    'Advance Internet Feature': ["Over the Air (OTA) Updates","Remote Vehicle Ignition Start/Stop","Inbuilt APPs",
        "Navigation with Live Traffic","E-Call & I-Call","Google / Alexa Connectivity","SOS Button"],
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
            className="relative w-full max-w-lg mx-4 bg-white border rounded-2xl shadow-2xl backdrop-blur-xl p-8"
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
                Report Incorrect Specs
              </h2>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div className="flex gap-4">
                <div className="relative">
                  <select
                    name="incorrectSpec"
                    className="w-full border focus:border-red-500  rounded-xl px-4 py-3 placeholder text-sm outline-none"
                    value={formData.incorrectSpec}
                    onChange={handleChange}
                  >
                    <option value="Engine & Transmission">Engine & Transmission</option>
                    <option value="Fuel & Performance">Fuel & Performance</option>
                    <option value="Suspension, Steering & Brakes">Suspension, Steering & Brakes</option>
                    <option value="Dimensions & Capacity">Dimensions & Capacity</option>
                    <option value="Comfort & Convenience">Comfort & Convenience</option>
                    <option value="Interior">Interior</option>
                    <option value="Exterior">Exterior</option>
                    <option value="Safety">Safety</option>
                    <option value="Entertainment & Communication">Entertainment & Communication</option>
                    <option value="ADAS Feature">ADAS Feature</option>
                    <option value="Advance Internet Feature">Advance Internet Feature</option>
                  </select>
                </div>

                <div className="relative">
                  <select
                    name="field"
                    className="w-full border focus:border-red-500  rounded-xl px-4 py-3 placeholder text-sm outline-none"
                    value={formData.field}
                    onChange={handleChange}
                  >
                    <option disabled value="">Select Field</option>
                    {formData.incorrectSpec && FieldData[formData.incorrectSpec as keyof typeof FieldData]?.map((field) => (
                      <option key={field} value={field}>{field}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <div className="relative">
                    <textarea name="comment" placeholder='Comment' className="w-full border focus:border-red-500 h-28 rounded-xl px-4 py-3 placeholder text-sm outline-none" value={formData.comment} onChange={handleChange}></textarea>
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

export default IncorrectSpecsForm