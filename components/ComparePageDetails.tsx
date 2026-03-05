'use client';
import { CheckIcon, ChevronDown, ChevronUp, Image, XIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Car } from "@/types/Car";
import { useRouter } from "next/navigation";
import CarLoadingComponent from "./CarLoadingComponent";
import { capitalizeString, PriceFormatter } from "@/hook/utils";
const ComparePageDetails = () => {
    const { slug } = useParams();
          type SectionId =
            | 'basic'
            | 'engine'
            | 'fuel'
            | 'suspension'
            | 'dimensions'
            | 'comfort'
            | 'interior'
            | 'exterior'
            | 'safety'
            | 'entertainment'
            | 'adas'
            | 'internet';
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [car1, setCar1] = useState<any>();
    const [car2, setCar2] = useState<any>();
    const [selectedVariant1, setSelectedVariant1] = useState<Car>(car1?.variant[0]);
    const [selectedVariant2, setSelectedVariant2] = useState<Car>(car2?.variant[0]);
    const [selectedTab, setSelectedTab] = useState<'pros' | 'cons'>('pros')
        
          const [expandedSections, setExpandedSections] = useState<{ [K in SectionId]: boolean }>({
            basic: true,
            engine: false,
            fuel: false,
            suspension: false,
            dimensions: false,
            comfort: false,
            interior: false,
            exterior: false,
            safety: false,
            entertainment: false,
            adas: false,
            internet: false,
          });

      const fetchVariant = async() => {
        try{
            const response = await axios.get(`/api/managecomparison/${slug?.toString().replace(/-/g, ' ')}`);
            if(response.status === 200){
                console.log(response.data);
                setCar1(response.data.car1);
                setCar2(response.data.car2);
                setSelectedVariant1(response.data.car1.variant[0]);
                setSelectedVariant2(response.data.car2.variant[0]);
            }
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }
    useEffect(()=> {
        fetchVariant();
    },[]);



    const toggleSection = (section: SectionId) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };


    if(loading){
      return (
        <CarLoadingComponent/>
      )
    }

  return (
    <div className="max-w-7xl mx-auto mt-4">
      <div className="max-w-4xl grid grid-cols-2 mx-2 md:gap-20 gap-2 md:mx-auto">
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
          <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
            <img src={car1?.images[0]} alt={car1?.modelName} className="w-full h-full object-cover" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {car1.isFeatured && (
              <span className="main-bg-color text-white text-xs font-semibold px-2 py-1 rounded-2xl">
                Featured
              </span>
              )}
              {/* {isSold && ( */}
              <span className="bg-[#B9B9B9] text-white text-xs font-semibold px-3 py-1 rounded-2xl flex items-center gap-1">
                <Image size={12} />
                {car1.images.length || 0}
              </span>
              {/* )} */}
            </div>

          <div className="absolute top-3 right-3 flex gap-2">
          <span className="main-bg-color text-white text-xs font-semibold px-2 py-1 rounded-md">
            {car1 && car1.launchDate && new Date(car1.launchDate).getFullYear()}
          </span>
        </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Category */}
            <p className="main-text-color text-sm font-medium mb-1">{car1.bodyType === 'suv' ? 'SUV' : car1.category.charAt(0).toUpperCase() + car1.category.slice(1)}</p>

            {/* Car Name */}
            <h3 className="md:text-lg text-sm font-medium text-gray-900 mb-1">{capitalizeString(car1.brand)} {capitalizeString(car1.modelName)}</h3>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="main-text-color font-bold lg:text-xl">₹{PriceFormatter(selectedVariant1?.price)}</span>
            <span className="text-gray-400 text-sm line-through">₹{PriceFormatter(selectedVariant1?.originalPrice)}</span>
              </div>
            </div>

            <hr />

            <select
              className="border border-gray-300 w-full text-sm md:py-2 py-1 px-2 mt-2 rounded-lg"
              value={selectedVariant1?._id || ""}
              onChange={(e) => {
                const selected = car1.variant.find(
                  (v: any) => v._id === e.target.value
                );
                setSelectedVariant1(selected);
              }}
            >
              <option value="" disabled>
                Select Variant
              </option>

              {car1.variant.map((v: any) => (
                <option key={v._id} value={v._id}>
                  {v.name}
                </option>
              ))}
            </select>

            {/* View Button - Full Width */}
            <button
              onClick={(e) => { e.stopPropagation(); router.push(`/${car1.brand.replace(/\s+/g, '-')}/${car1.modelName.replace(/\s+/g, '-')}`)}}
              className="mt-4 w-full bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 lg:py-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View car
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden cursor-pointer">
          <div className="relative aspect-video w-full bg-gray-100 overflow-hidden">
            <img src={car2?.images[0]} alt={car2.modelName} className="w-full h-full object-cover" />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex gap-2">
              {car1.isFeatured && (
              <span className="main-bg-color text-white text-xs font-semibold px-2 py-1 rounded-2xl">
                Featured
              </span>
               )}
              {/* {isSold && ( */}
              <span className="bg-[#B9B9B9] text-white text-xs font-semibold px-3 py-1 rounded-2xl flex items-center gap-1">
                <Image size={12} />
                {car2.images.length || 0}
              </span>
              {/* )} */}
            </div>
            
            <div className="absolute top-3 right-3 flex gap-2">
              <span className="main-bg-color text-white text-xs font-semibold px-2 py-1 rounded-md">
                {car2 && car2.launchDate && new Date(car2.launchDate).getFullYear()}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-4">
            {/* Category */}
            <p className="main-text-color text-sm font-medium mb-1">{car2.bodyType === 'suv' ? 'SUV' : car2.category.charAt(0).toUpperCase() + car2.category.slice(1)}</p>

            {/* Car Name */}
            <h3 className="md:text-lg text-sm font-medium text-gray-900 mb-1">{capitalizeString(car2.brand)} {capitalizeString(car2.modelName)}</h3>

            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <span className="main-text-color font-bold lg:text-xl">₹{PriceFormatter(selectedVariant2?.price)}L</span>
            <span className="text-gray-400 text-sm line-through">₹{PriceFormatter(selectedVariant2?.originalPrice)}</span>
              </div>
            </div>

            <hr />


             <select
              className="border border-gray-300 w-full text-sm lg:py-2 py-1 px-2 mt-2 rounded-lg"
              value={selectedVariant2?._id || ""}
              onChange={(e) => {
                const selected = car2.variant.find(
                  (v: any) => v._id === e.target.value
                );
                setSelectedVariant2(selected);
              }}
            >
              <option value="" disabled>
                Select Variant
              </option>

              {car2.variant.map((v: any) => (
                <option key={v._id} value={v._id}>
                  {v.name}
                </option>
              ))}
            </select>

            {/* View Button - Full Width */}
            <button
              onClick={(e) => { e.stopPropagation(); router.push(`/${car2.brand.replace(/\s+/g, '-')}/${car2.modelName.replace(/\s+/g, '-')}`)}}
              className="mt-4 w-full bg-white border border-gray-300 text-gray-700 text-sm font-medium px-4 lg:py-2 py-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              View car
            </button>
          </div>
        </div>
      </div>


      <div className="max-w-4xl border mx-auto mt-8 rounded-2xl px-4">
        <div className="">
                    <Section title="Engine & Transmission" id="Engine & Transmission" 
              expandedSections={expandedSections}
              toggleSection={toggleSection}>
              <div className=''>
                    {[
                      ["Engine Type", selectedVariant1?.engineAndTransmission?.engineType, selectedVariant2.engineAndTransmission?.engineType],
                      ["Battery Capacity", selectedVariant1?.engineAndTransmission?.batteryCapacity, selectedVariant2.engineAndTransmission?.batteryCapacity],
                      ["Motor Power", selectedVariant1?.engineAndTransmission?.moterPower, selectedVariant2.engineAndTransmission?.moterPower],
                      ["Motor Type", selectedVariant1?.engineAndTransmission?.moterType, selectedVariant2.engineAndTransmission?.moterType],
                      ["Range", selectedVariant1?.engineAndTransmission?.Range, selectedVariant2.engineAndTransmission?.Range],
                      ["Battery Type", selectedVariant1?.engineAndTransmission?.batteryType, selectedVariant2.engineAndTransmission?.batteryType],
                      ["Charging Time (A.C)", selectedVariant1?.engineAndTransmission?.chargingTimeAC, selectedVariant2.engineAndTransmission.chargingTimeAC],
                      ["Charging Time (D.C)", selectedVariant1?.engineAndTransmission?.chargingTimeDC, selectedVariant2.engineAndTransmission.chargingTimeDC],
                      ["Regenerative Braking", selectedVariant1?.engineAndTransmission?.regenerativeBraking, selectedVariant2.engineAndTransmission.regenerativeBraking],
                      ["Regenerative Braking Levels", selectedVariant1?.engineAndTransmission?.regenerativeBrakingLevels, selectedVariant2.engineAndTransmission.regenerativeBrakingLevels],
                      ["Charging Port", selectedVariant1?.engineAndTransmission?.chargingPort, selectedVariant2.engineAndTransmission.chargingPort],
                      ["Charging Options", selectedVariant1?.engineAndTransmission?.chargingOptions, selectedVariant2.engineAndTransmission.chargingOptions],
                      ["Charger Type", selectedVariant1?.engineAndTransmission?.chargerType, selectedVariant2.engineAndTransmission.chargerType],
                      ["Displacement", selectedVariant1?.engineAndTransmission?.displacement, selectedVariant2.engineAndTransmission.displacement],
                      ["Max Power", selectedVariant1?.engineAndTransmission?.maxPower, selectedVariant2.engineAndTransmission?.maxPower],
                      ["Max Torque", selectedVariant1?.engineAndTransmission?.maxTorque, selectedVariant2.engineAndTransmission?.maxTorque],
                      ["No. of Cylinders", selectedVariant1?.engineAndTransmission?.NumOfCylinders, selectedVariant2.engineAndTransmission.NumOfCylinders],
                      ["Valves Per Cylinder", selectedVariant1.engineAndTransmission.valvesPerCylinder, selectedVariant2.engineAndTransmission.valvesPerCylinder],
                      ["Fuel Supply System", selectedVariant1.engineAndTransmission.fuelSupplySystem, selectedVariant2.engineAndTransmission.fuelSupplySystem],
                      ["Turbo Charger", selectedVariant1.engineAndTransmission.turboCharger, selectedVariant2.engineAndTransmission.turboCharger],
                      ["Transmission Type", selectedVariant1.engineAndTransmission.transmissionType, selectedVariant2.engineAndTransmission.transmissionType],
                      ["Gearbox", selectedVariant1.engineAndTransmission.gearbox, selectedVariant2.engineAndTransmission.gearbox],
                      ["Drive Type", selectedVariant1.engineAndTransmission.driveType, selectedVariant2.engineAndTransmission.driveType],
                    ].map(([label, value1, value2], idx) => (
                      (value1 !== null && value2 !== null) && (value1 !== undefined && value2 !== undefined) && (value1 !== "" || typeof value1 === "boolean") && (value2 !== "" || typeof value2 === "boolean") && (
                      <div key={idx} className="space-y-2 mb-4">
                        <p className="text-center py-1 text-sm md:text-[16px] rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                        <div className="px-4 py-2 text-xs md:text-[16px] border flex justify-around gap-2 rounded-lg">
                            <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                            <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                        </div>
                      </div>
                      ))

                    )}
                    </div>
              </Section>
        </div>

        <div>
          <Section title="Fuel & Performance" id="Fuel & Performance" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    ["Fuel Type", selectedVariant1.fuelAndPerformance.fuelType, selectedVariant2.fuelAndPerformance.fuelType],
                    ["Petrol Mileage ARAI", selectedVariant1.fuelAndPerformance.petrolMileageARAI, selectedVariant2.fuelAndPerformance.petrolMileageARAI],
                    ["Petrol Fuel Tank Capacity", selectedVariant1.fuelAndPerformance.petrolFuelTankCapacity, selectedVariant2.fuelAndPerformance.petrolFuelTankCapacity],
                    ["Emission Norm Compliance", selectedVariant1.fuelAndPerformance.emissionNormCompliance, selectedVariant2.fuelAndPerformance.emissionNormCompliance],
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center text-sm md:text-[16px] py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

        <div>
          <Section title="Suspension, Steering & Brakes" id="Suspension, Steering & Brakes" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Front Suspension",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.frontSuspension,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.frontSuspension
                    ],
                    [
                      "Rear Suspension",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.rearSuspension,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.rearSuspension
                    ],
                    [
                      "Steering Type",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.steeringType,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.steeringType
                    ],
                    [
                      "Steering Column",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.steeringColumn,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.steeringColumn
                    ],
                    ["Turning Radius",
                      selectedVariant1?.suspensionAndSteeringAndBrakes.turningRadius,
                      selectedVariant2?.suspensionAndSteeringAndBrakes.turningRadius
                    ],
                    [
                      "Front Brake Type",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.frontBrakeType,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.frontBrakeType
                    ],
                    [
                      "Rear Brake Type",
                      selectedVariant1?.suspensionAndSteeringAndBrakes?.rearBrakeType,
                      selectedVariant2?.suspensionAndSteeringAndBrakes?.rearBrakeType
                    ],
                     [
                      "Boot Space Rear Seat Folding", 
                      selectedVariant1?.suspensionAndSteeringAndBrakes.bootSpaceRearSeatFolding,
                      selectedVariant2?.suspensionAndSteeringAndBrakes.bootSpaceRearSeatFolding
                    ],
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center text-sm md:text-[16px] py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>


         <div>
          <Section title="Dimensions & Capacity" id="Dimensions & Capacity" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Length",
                      selectedVariant1?.dimensionsAndCapacity?.length,
                      selectedVariant2?.dimensionsAndCapacity?.length
                    ],
                    [
                      "Width",
                      selectedVariant1?.dimensionsAndCapacity?.Width,
                      selectedVariant2?.dimensionsAndCapacity?.Width
                    ],
                    [
                      "Height",
                      selectedVariant1?.dimensionsAndCapacity?.height,
                      selectedVariant2?.dimensionsAndCapacity?.height
                    ],
                    [
                      "Boot Space",
                      selectedVariant1?.dimensionsAndCapacity?.bootSpace,
                      selectedVariant2?.dimensionsAndCapacity?.bootSpace
                    ],
                    [
                      "Seating Capacity",
                      selectedVariant1?.dimensionsAndCapacity?.seatingCapacity,
                      selectedVariant2?.dimensionsAndCapacity?.seatingCapacity
                    ],
                    [
                      "Ground Clearance Unladen", 
                      selectedVariant1?.dimensionsAndCapacity.groundClearanceUnladen,
                      selectedVariant2?.dimensionsAndCapacity.groundClearanceUnladen
                    ],
                    [
                      "Wheel Base",
                      selectedVariant1?.dimensionsAndCapacity?.wheelBase,
                      selectedVariant2?.dimensionsAndCapacity?.wheelBase
                    ],
                    [
                      "No. of Doors",
                      selectedVariant1?.dimensionsAndCapacity?.numOfDoors,
                      selectedVariant2?.dimensionsAndCapacity?.numOfDoors
                    ]
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center text-sm md:text-[16px] py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Comfort & Convenience" id="Comfort & Convenience" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Power Steering",
                      selectedVariant1?.comfortAndConvenience?.powerSteering,
                      selectedVariant2?.comfortAndConvenience?.powerSteering
                    ],
                    [
                      "Air Conditioner",
                      selectedVariant1?.comfortAndConvenience?.airConditioner,
                      selectedVariant2?.comfortAndConvenience?.airConditioner
                    ],
                    [
                      "Heater",
                      selectedVariant1?.comfortAndConvenience?.heater,
                      selectedVariant2?.comfortAndConvenience?.heater
                    ],
                    [
                      "Adjustable Steering",
                      selectedVariant1?.comfortAndConvenience?.adjustableSteering,
                      selectedVariant2?.comfortAndConvenience?.adjustableSteering
                    ],
                    [
                      "Height Adjustable Driver Seat",
                      selectedVariant1?.comfortAndConvenience?.heightAdjustableDriverSeat,
                      selectedVariant2?.comfortAndConvenience?.heightAdjustableDriverSeat
                    ],
                    [
                      "Ventilated Seats",
                      selectedVariant1?.comfortAndConvenience?.ventilatedSeats,
                      selectedVariant2?.comfortAndConvenience?.ventilatedSeats
                    ],
                    [
                      "Electric Adjustable Seats",
                      selectedVariant1?.comfortAndConvenience?.electricAdjustableSeats,
                      selectedVariant2?.comfortAndConvenience?.electricAdjustableSeats
                    ],
                    [
                      "Automatic Climate Control",
                      selectedVariant1?.comfortAndConvenience?.automaticClimateControl,
                      selectedVariant2?.comfortAndConvenience?.automaticClimateControl
                    ],
                    [
                      "Air Quality Control", 
                      selectedVariant1?.comfortAndConvenience.airQualityControl,
                      selectedVariant2?.comfortAndConvenience.airQualityControl
                    ],
                    [
                      "Accessory Power Outlet",
                      selectedVariant1?.comfortAndConvenience?.accessoryPowerOutlet,
                      selectedVariant2?.comfortAndConvenience?.accessoryPowerOutlet
                    ],
                    [
                      "Trunk Light",
                      selectedVariant1?.comfortAndConvenience?.trunkLight,
                      selectedVariant2?.comfortAndConvenience?.trunkLight
                    ],
                    [
                      "Vanity Mirror",
                      selectedVariant1?.comfortAndConvenience?.vanityMirror,
                      selectedVariant2?.comfortAndConvenience?.vanityMirror
                    ],
                    ["Rear Reading Lamp", 
                      selectedVariant1?.comfortAndConvenience?.rearReadingLamp,
                      selectedVariant2?.comfortAndConvenience?.rearReadingLamp
                    ],
                    [
                      "Rear Seat Headrest",
                      selectedVariant1?.comfortAndConvenience?.rearSeatHeadrest,
                      selectedVariant2?.comfortAndConvenience?.rearSeatHeadrest
                    ],
                    [
                      "Adjustable Headrest",
                      selectedVariant1?.comfortAndConvenience?.adjustableHeadrest,
                      selectedVariant2?.comfortAndConvenience?.adjustableHeadrest
                    ],
                    [
                      "Rear Seat Centre Arm Rest",
                      selectedVariant1?.comfortAndConvenience?.rearSeatCentreArmRest,
                      selectedVariant2?.comfortAndConvenience?.rearSeatCentreArmRest
                    ],
                     [
                      "Height Adjustable Front Seat Belts", 
                      selectedVariant1?.comfortAndConvenience.heightAdjustableFrontSeatBelts,
                      selectedVariant2?.comfortAndConvenience.heightAdjustableFrontSeatBelts
                    ],
                    [
                      "Rear AC Vents",
                      selectedVariant1?.comfortAndConvenience?.rearACVents,
                      selectedVariant2?.comfortAndConvenience?.rearACVents
                    ],
                    [
                      "Cruise Control",
                      selectedVariant1?.comfortAndConvenience?.cruiseControl,
                      selectedVariant2?.comfortAndConvenience?.cruiseControl
                    ],
                    [
                      "Parking Sensors",
                      selectedVariant1?.comfortAndConvenience?.parkingSensors,
                      selectedVariant2?.comfortAndConvenience?.parkingSensors
                    ],
                    [
                      "Foldable Rear Seat",
                      selectedVariant1?.comfortAndConvenience?.foldableRearSeat,
                      selectedVariant2?.comfortAndConvenience?.foldableRearSeat
                    ],
                    [
                      "Smart Access Card Entry",
                      selectedVariant1?.comfortAndConvenience?.smartAccessCardEntry,
                      selectedVariant2?.comfortAndConvenience?.smartAccessCardEntry
                    ],
                    [
                      "KeyLess Entry",
                      selectedVariant1?.comfortAndConvenience?.keyLessEntry,
                      selectedVariant2?.comfortAndConvenience?.keyLessEntry
                    ],
                    [
                      "Engine Start/Stop Button",
                      selectedVariant1?.comfortAndConvenience?.engineStartStopButton,
                      selectedVariant2?.comfortAndConvenience?.engineStartStopButton
                    ],
                    [
                      "Cooled Glovebox",
                      selectedVariant1?.comfortAndConvenience?.cooledGlovebox,
                      selectedVariant2?.comfortAndConvenience?.cooledGlovebox
                    ],
                    [
                      "Voice Commands",
                      selectedVariant1?.comfortAndConvenience?.voiceCommands,
                      selectedVariant2?.comfortAndConvenience?.voiceCommands
                    ],
                    [
                      "Paddle Shifters",
                      selectedVariant1?.comfortAndConvenience?.paddleShifters,
                      selectedVariant2?.comfortAndConvenience?.paddleShifters
                    ],
                    [
                      "USB Charger",
                      selectedVariant1?.comfortAndConvenience?.usbCharger,
                      selectedVariant2?.comfortAndConvenience?.usbCharger
                    ],
                    [
                      "Central Console Armrest",
                      selectedVariant1?.comfortAndConvenience?.centralConsoleArmrest,
                      selectedVariant2?.comfortAndConvenience?.centralConsoleArmrest
                    ],
                    [
                      "Tailgate Ajar Warning", 
                      selectedVariant1?.comfortAndConvenience.tailgateAjarWarning,
                      selectedVariant2?.comfortAndConvenience.tailgateAjarWarning
                    ],
                    [
                      "Hands-Free Tailgate", 
                      selectedVariant1?.comfortAndConvenience.handsFreeTailgate,
                      selectedVariant2?.comfortAndConvenience.handsFreeTailgate
                    ],
                    [
                      "Drive Modes",
                      selectedVariant1?.comfortAndConvenience?.driveModes,
                      selectedVariant2?.comfortAndConvenience?.driveModes
                    ],
                    [
                      "Idle Start-Stop System",
                      selectedVariant1?.comfortAndConvenience?.idleStartStopSystem,
                      selectedVariant2?.comfortAndConvenience?.idleStartStopSystem
                    ],
                    [
                      "Rear Window Sunblind",
                      selectedVariant1?.comfortAndConvenience?.rearWindowSunblind,
                      selectedVariant2?.comfortAndConvenience?.rearWindowSunblind
                    ],
                    [
                      "Automatic Headlamps",
                      selectedVariant1?.comfortAndConvenience?.automaticHeadlamps,
                      selectedVariant2?.comfortAndConvenience?.automaticHeadlamps
                    ],
                    [
                      "Follow Me Home Headlamps",
                      selectedVariant1?.comfortAndConvenience?.followMeHomeHeadlamps,
                      selectedVariant2?.comfortAndConvenience?.followMeHomeHeadlamps
                    ],
                    [
                      "Voice assisted sunroof",
                      selectedVariant1?.comfortAndConvenience?.voiceassistedsunroof,
                      selectedVariant2?.comfortAndConvenience?.voiceassistedsunroof
                    ],
                    [
                      "Drive Mode Types",
                      selectedVariant1?.comfortAndConvenience?.driveModeTypes,
                      selectedVariant2?.comfortAndConvenience?.driveModeTypes
                    ],
                    [
                      "Power Windows",
                      selectedVariant1?.comfortAndConvenience?.powerWindows,
                      selectedVariant2?.comfortAndConvenience?.powerWindows
                    ],
                    [
                      "Cup Holders",
                      selectedVariant1?.comfortAndConvenience?.cupholders,
                      selectedVariant2?.comfortAndConvenience?.cupholders
                    ]
                  ]
                  .map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center text-sm md:text-[16px] py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Interior" id="Interior" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Tachometer",
                      selectedVariant1?.interior?.tachometer,
                      selectedVariant2?.interior?.tachometer
                    ],
                    [
                      "Leather Wrapped Steering Wheel", 
                      selectedVariant1?.interior.leatherWrappedSteeringWheel,
                      selectedVariant2?.interior.leatherWrappedSteeringWheel
                    ],
                    [
                      "Leather wrap gear-shift selector", 
                      selectedVariant1.interior.leatherwrapgearshiftselector,
                      selectedVariant2.interior.leatherwrapgearshiftselector
                    ],
                    [
                      "Glove Box",
                      selectedVariant1?.interior?.gloveBox,
                      selectedVariant2?.interior?.gloveBox
                    ],
                    [
                      "Digital Cluster",
                      selectedVariant1?.interior?.digitalCluster,
                      selectedVariant2?.interior?.digitalCluster
                    ],
                    [
                      "Digital Cluster Size",
                      selectedVariant1?.interior?.digitalClusterSize,
                      selectedVariant2?.interior?.digitalClusterSize
                    ],
                    [
                      "Upholstery",
                      selectedVariant1?.interior?.upholstery,
                      selectedVariant2?.interior?.upholstery
                    ]
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center text-sm md:text-[16px] py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
                  <div className="flex justify-around">
                    <div className="space-y-4">
                      {car1.interiorImages.map((src: string,index: number)=> (
                        <div key={index}>
                          <img src={src} alt='interior images' className="w-44 h-28" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {car2.interiorImages.map((src: string, index: number)=> (
                        <div key={index}>
                          <img src={src} alt='interior images' className="w-44 h-28" />
                        </div>
                      ))}
                    </div>
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Exterior" id="Exterior" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Rain Sensing Wiper", 
                      selectedVariant1?.exterior.rainSensingWiper,
                      selectedVariant2?.exterior.rainSensingWiper
                    ],
                    [
                      "Rear Window Wiper",
                      selectedVariant1?.exterior?.rearWindowWiper,
                      selectedVariant2?.exterior?.rearWindowWiper
                    ],
                    [
                      "Rear Window Washer",
                      selectedVariant1?.exterior?.rearWindowWasher,
                      selectedVariant2?.exterior?.rearWindowWasher
                    ],
                    [
                      "Rear Window Defogger",
                      selectedVariant1?.exterior?.rearWindowDefogger,
                      selectedVariant2?.exterior?.rearWindowDefogger
                    ],
                    [
                      "Wheel Covers",
                      selectedVariant1?.exterior?.wheelCovers,
                      selectedVariant2?.exterior?.wheelCovers
                    ],
                    [
                      "Alloy Wheels",
                      selectedVariant1?.exterior?.alloyWheels,
                      selectedVariant2?.exterior?.alloyWheels
                    ],
                    [
                      "Power Antenna",
                      selectedVariant1?.exterior?.powerAntenna,
                      selectedVariant2?.exterior?.powerAntenna
                    ],
                    [
                      "Rear Spoiler",
                      selectedVariant1?.exterior?.rearSpoiler,
                      selectedVariant2?.exterior?.rearSpoiler
                    ],
                    [
                      "Outside Rear View Mirror Turn Indicators",
                      selectedVariant1?.exterior?.outsideRearViewMirrorTurnIndicators,
                      selectedVariant2?.exterior?.outsideRearViewMirrorTurnIndicators
                    ],
                    [
                      "Integrated Antenna", 
                      selectedVariant1.exterior.integratedAntenna,
                      selectedVariant2.exterior.integratedAntenna
                    ],
                    [
                      "Chrome Grille",
                      selectedVariant1?.exterior?.chromeGrille,
                      selectedVariant2?.exterior?.chromeGrille
                    ],
                    [
                      "Projector Headlamps",
                      selectedVariant1?.exterior?.projectorHeadlamps,
                      selectedVariant2?.exterior?.projectorHeadlamps
                    ],
                    [
                      "Cornering Foglamps", 
                      selectedVariant1.exterior.corneringFoglamps,
                      selectedVariant2.exterior.corneringFoglamps
                    ],
                    [
                      "Roof Rails",
                      selectedVariant1?.exterior?.roofRails,
                      selectedVariant2?.exterior?.roofRails
                    ],
                    [
                      "Automatic Headlamps",
                      selectedVariant1?.exterior?.automaticHeadlamps,
                      selectedVariant2?.exterior?.automaticHeadlamps
                    ],
                    [
                      "Fog Lights", 
                      selectedVariant1.exterior.fogLights,
                      selectedVariant2.exterior.fogLights
                    ],
                    [
                      "Antenna",
                      selectedVariant1?.exterior?.antenna,
                      selectedVariant2?.exterior?.antenna
                    ],
                    [
                      "Sunroof",
                      selectedVariant1?.exterior?.sunroof,
                      selectedVariant2?.exterior?.sunroof
                    ],
                    ["Boot Opening", 
                      selectedVariant1?.exterior.bootOpening,
                      selectedVariant2?.exterior.bootOpening
                    ],
                    [
                      "Puddle Lamps",
                      selectedVariant1?.exterior?.puddleLamps,
                      selectedVariant2?.exterior?.puddleLamps
                    ],
                    [
                      "Outside Rear View Mirror (ORVM)",
                      selectedVariant1?.exterior?.outsideRearViewMirror,
                      selectedVariant2?.exterior?.outsideRearViewMirror
                    ],
                    [
                      "Tyre Size",
                      selectedVariant1?.exterior?.tyreSize,
                      selectedVariant2?.exterior?.tyreSize
                    ],
                    [
                      "Tyre Type",
                      selectedVariant1?.exterior?.tyreType,
                      selectedVariant2?.exterior?.tyreType
                    ],
                    [
                      "Wheel Size",
                      selectedVariant1?.exterior?.wheelSize,
                      selectedVariant2?.exterior?.wheelSize
                    ],
                    [
                      "LED DRLs",
                      selectedVariant1?.exterior?.ledDRLs,
                      selectedVariant2?.exterior?.ledDRLs
                    ],
                    [
                      "LED Headlamps", 
                      selectedVariant1?.exterior.ledHeadlamps,
                      selectedVariant2?.exterior.ledHeadlamps
                    ],
                    [
                      "LED Taillights",
                      selectedVariant1?.exterior?.ledTaillights,
                      selectedVariant2?.exterior?.ledTaillights
                    ],
                    [
                      "LED Fog Lamps", 
                      selectedVariant1?.exterior.ledFogLamps,
                      selectedVariant2?.exterior.ledFogLamps
                    ],
                    [
                      "Additional Features", 
                      selectedVariant1?.exterior.additionalFeatures,
                      selectedVariant2?.exterior.additionalFeatures
                    ],
                  ]
                  .map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center text-sm md:text-[16px] py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
                  <div className="flex gap-2 justify-around">
                    <div className="space-y-4">
                      {car1.exteriorImages.map((src: string,index: number)=> (
                        <div key={index}>
                          <img src={src} alt='interior images' className="w-44 h-28" />
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4">
                      {car2.exteriorImages.map((src: string, index: number)=> (
                        <div key={index}>
                          <img src={src} alt='interior images' className="w-44 h-28" />
                        </div>
                      ))}
                    </div>
                  </div>
            </Section>
        </div>


         <div>
          <Section title="Safety" id="Safety" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Anti-lock Braking System (ABS)",
                      selectedVariant1?.safety?.antilockBrakingSystem,
                      selectedVariant2?.safety?.antilockBrakingSystem
                    ],
                    [
                      "Brake Assist", 
                      selectedVariant1?.safety.brakeAssist,
                      selectedVariant2?.safety.brakeAssist
                    ],
                    [
                      "Central Locking",
                      selectedVariant1?.safety?.centralLocking,
                      selectedVariant2?.safety?.centralLocking
                    ],
                    [
                      "Child Safety Locks",
                      selectedVariant1?.safety?.childSafetyLocks,
                      selectedVariant2?.safety?.childSafetyLocks
                    ],
                    [
                      "Anti-Theft Alarm",
                      selectedVariant1?.safety?.antiTheftAlarm,
                      selectedVariant2?.safety?.antiTheftAlarm
                    ],
                    [
                      "No. of Airbags",
                      selectedVariant1?.safety?.numOfAirbags,
                      selectedVariant2?.safety?.numOfAirbags
                    ],
                    [
                      "Driver Airbag",
                      selectedVariant1?.safety?.driverAirbag,
                      selectedVariant2?.safety?.driverAirbag
                    ],
                    [
                      "Passenger Airbag",
                      selectedVariant1?.safety?.passengerAirbag,
                      selectedVariant2?.safety?.passengerAirbag
                    ],
                    [
                      "Side Airbag",
                      selectedVariant1?.safety?.sideAirbag,
                      selectedVariant2?.safety?.sideAirbag
                    ],
                    [
                      "Side Airbag-Rear",
                      selectedVariant1?.safety?.sideAirbagRear,
                      selectedVariant2?.safety?.sideAirbagRear
                    ],
                    [
                      "Day & Night Rear View Mirror",
                      selectedVariant1?.safety?.dayandNightRearViewMirror,
                      selectedVariant2?.safety?.dayandNightRearViewMirror
                    ],
                    [
                      "Curtain Airbag",
                      selectedVariant1?.safety?.curtainAirbag,
                      selectedVariant2?.safety?.curtainAirbag
                    ],
                    [
                      "Electronic Brakeforce Distribution (EBD)",
                      selectedVariant1?.safety?.electronicBrakeforceDistribution,
                      selectedVariant2?.safety?.electronicBrakeforceDistribution
                    ],
                    [
                      "Seat Belt Warning",
                      selectedVariant1?.safety?.seatBeltWarning,
                      selectedVariant2?.safety?.seatBeltWarning
                    ],
                    [
                      "Door Ajar Warning",
                      selectedVariant1?.safety?.doorAjarWarning,
                      selectedVariant2?.safety?.doorAjarWarning
                    ],
                    [
                      "Traction Control",
                      selectedVariant1?.safety?.tractionControl,
                      selectedVariant2?.safety?.tractionControl
                    ],
                    [
                      "Tyre Pressure Monitoring System (TPMS)",
                      selectedVariant1?.safety?.tyrePressureMonitoringSystem,
                      selectedVariant2?.safety?.tyrePressureMonitoringSystem
                    ],
                    [
                      "Engine Immobilizer",
                      selectedVariant1?.safety?.engineImmobilizer,
                      selectedVariant2?.safety?.engineImmobilizer
                    ],
                    [
                      "Electronic Stability Control (ESC)",
                      selectedVariant1?.safety?.electronicStabilityControl,
                      selectedVariant2?.safety?.electronicStabilityControl
                    ],
                    [
                      "Rear Camera",
                      selectedVariant1?.safety?.rearCamera,
                      selectedVariant2?.safety?.rearCamera
                    ],
                    [
                      "Speed Alert",
                      selectedVariant1?.safety?.speedAlert,
                      selectedVariant2?.safety?.speedAlert
                    ],
                    [
                      "Speed Sensing Auto Door Lock",
                      selectedVariant1?.safety?.speedSensingAutoDoorLock,
                      selectedVariant2?.safety?.speedSensingAutoDoorLock
                    ],
                    [
                      "ISOFIX Child Seat Mounts",
                      selectedVariant1?.safety?.iSOFIXChildSeatMounts,
                      selectedVariant2?.safety?.iSOFIXChildSeatMounts
                    ],
                    [
                      "Heads-Up Display (HUD)", 
                      selectedVariant1?.safety.headsUpDisplay,
                      selectedVariant2?.safety.headsUpDisplay
                    ],
                    [
                      "Pretensioners & Force Limiter Seatbelts",
                      selectedVariant1?.safety?.pretensionersandForceLimiterSeatbelts,
                      selectedVariant2?.safety?.pretensionersandForceLimiterSeatbelts
                    ],
                    [
                      "Blind Spot Camera",
                      selectedVariant1?.safety?.blindSpotCamera,
                      selectedVariant2?.safety?.blindSpotCamera
                    ],
                    [
                      "Hill Descent Control", 
                      selectedVariant1?.safety.hillDescentControl,
                      selectedVariant2?.safety.hillDescentControl
                    ],
                    [
                      "Hill Assist",
                      selectedVariant1?.safety?.hillAssist,
                      selectedVariant2?.safety?.hillAssist
                    ],
                    [
                      "Impact Sensing Auto Door Unlock",
                      selectedVariant1?.safety?.impactSensingAutoDoorUnlock,
                      selectedVariant2?.safety?.impactSensingAutoDoorUnlock
                    ],
                    [
                      "360 View Camera",
                      selectedVariant1?.safety?._360ViewCamera,
                      selectedVariant2?.safety?._360ViewCamera
                    ]
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center py-1 text-sm md:text-[16px] rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Entertainment & Communication" id="Entertainment & Communication" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Radio",
                      selectedVariant1?.entertainmentAndCommunication?.radio,
                      selectedVariant2?.entertainmentAndCommunication?.radio
                    ],
                    [
                      "Wireless Phone Charging",
                      selectedVariant1?.entertainmentAndCommunication?.wirelessPhoneCharging,
                      selectedVariant2?.entertainmentAndCommunication?.wirelessPhoneCharging
                    ],
                    [
                      "Bluetooth Connectivity",
                      selectedVariant1?.entertainmentAndCommunication?.bluetoothConnectivity,
                      selectedVariant2?.entertainmentAndCommunication?.bluetoothConnectivity
                    ],
                    [
                      "Touchscreen",
                      selectedVariant1?.entertainmentAndCommunication?.touchscreen,
                      selectedVariant2?.entertainmentAndCommunication?.touchscreen
                    ],
                    [
                      "Touchscreen Size",
                      selectedVariant1?.entertainmentAndCommunication?.touchscreenSize,
                      selectedVariant2?.entertainmentAndCommunication?.touchscreenSize
                    ],
                    [
                      "Android Auto",
                      selectedVariant1?.entertainmentAndCommunication?.androidAuto,
                      selectedVariant2?.entertainmentAndCommunication?.androidAuto
                    ],
                    [
                      "Apple CarPlay",
                      selectedVariant1?.entertainmentAndCommunication?.appleCarPlay,
                      selectedVariant2?.entertainmentAndCommunication?.appleCarPlay
                    ],
                    [
                      "No. of Speakers",
                      selectedVariant1?.entertainmentAndCommunication?.numOfSpeakers,
                      selectedVariant2?.entertainmentAndCommunication?.numOfSpeakers
                    ],
                    [
                      "Usb Ports",
                      selectedVariant1?.entertainmentAndCommunication?.usbPorts,
                      selectedVariant2?.entertainmentAndCommunication?.usbPorts
                    ],
                    [
                      "Additional Features",
                      selectedVariant1?.entertainmentAndCommunication?.additionalFeatures,
                      selectedVariant2?.entertainmentAndCommunication?.additionalFeatures
                    ],
                    [
                      "Tweeters", 
                      selectedVariant1?.entertainmentAndCommunication.tweeters,
                      selectedVariant2?.entertainmentAndCommunication.tweeters,
                    ],
                    [
                      "Speakers",
                      selectedVariant1?.entertainmentAndCommunication?.speakers,
                      selectedVariant2?.entertainmentAndCommunication?.speakers
                    ]
                  ].map(([label, value1, value2], idx) => (
                      <div key={idx} className="space-y-2 mb-4">
                      <p className="text-center text-sm md:text-[16px] py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                      <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                          <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                          <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                      </div>
                      </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="ADAS Feature" id="ADAS Feature" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    ["Blind Spot Monitor",
                      selectedVariant1?.ADASFeature?.blindSpotMonitor,
                      selectedVariant2?.ADASFeature?.blindSpotMonitor
                    ],
                    ["Forward Collision Warning",
                      selectedVariant1?.ADASFeature?.forwardCollisionWarning,
                      selectedVariant2?.ADASFeature?.forwardCollisionWarning
                    ],
                    ["Automatic Emergency Braking",
                      selectedVariant1?.ADASFeature?.automaticEmergencyBraking,
                      selectedVariant2?.ADASFeature?.automaticEmergencyBraking
                    ],
                    ["Speed Assist System",
                      selectedVariant1?.ADASFeature?.speedAssistSystem,
                      selectedVariant2?.ADASFeature?.speedAssistSystem
                    ],
                    ["Traffic Sign Recognition",
                      selectedVariant1?.ADASFeature?.trafficSignRecognition,
                      selectedVariant2?.ADASFeature?.trafficSignRecognition
                    ],
                    ["Blind Spot Collision Avoidance Assist",
                      selectedVariant1?.ADASFeature?.blindSpotCollisionAvoidanceAssist,
                      selectedVariant2?.ADASFeature?.blindSpotCollisionAvoidanceAssist
                    ],
                    ["Lane Departure Warning",
                      selectedVariant1?.ADASFeature?.laneDepartureWarning,
                      selectedVariant2?.ADASFeature?.laneDepartureWarning
                    ],
                    ["Lane Keep Assist",
                      selectedVariant1?.ADASFeature?.laneKeepAssist,
                      selectedVariant2?.ADASFeature?.laneKeepAssist
                    ],
                    ["Lane Departure Prevention Assist",
                      selectedVariant1?.ADASFeature?.laneDeparturePreventionAssist,
                      selectedVariant2?.ADASFeature?.laneDeparturePreventionAssist
                    ],
                    ["Driver Attention Warning",
                      selectedVariant1?.ADASFeature?.driverAttentionWarning,
                      selectedVariant2?.ADASFeature?.driverAttentionWarning
                    ],
                    ["Adaptive Cruise Control",
                      selectedVariant1?.ADASFeature?.adaptiveCruiseControl,
                      selectedVariant2?.ADASFeature?.adaptiveCruiseControl
                    ],
                    ["Adaptive High Beam Assist",
                      selectedVariant1?.ADASFeature?.adaptiveHighBeamAssist,
                      selectedVariant2?.ADASFeature?.adaptiveHighBeamAssist
                    ],
                    ["Rear Cross Traffic Alert",
                      selectedVariant1?.ADASFeature?.rearCrossTrafficAlert,
                      selectedVariant2?.ADASFeature?.rearCrossTrafficAlert
                    ],
                    ["Rear Cross Traffic Collision-Avoidance Assist",
                      selectedVariant1?.ADASFeature?.rearCrossTrafficCollisionAvoidanceAssist,
                      selectedVariant2?.ADASFeature?.rearCrossTrafficCollisionAvoidanceAssist
                    ],
                  ].map(([label, value1, value2], idx) => (
                    <div key={idx} className="space-y-2 mb-4">
                    <p className="text-center text-sm md:text-[16px] py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                    <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                        <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                        <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                    </div>
                    </div>
                  ))}
                  </div>
            </Section>
        </div>

         <div>
          <Section title="Advance Internet Feature" id="Advance Internet Feature" 
            expandedSections={expandedSections}
            toggleSection={toggleSection}>
            <div className=''>
                  {[
                    [
                      "Over the Air (OTA) Updates",
                      selectedVariant1?.advanceInternetFeature?.overAirUpdates,
                      selectedVariant2?.advanceInternetFeature?.overAirUpdates
                    ],
                    [
                      "Remote Vehicle Ignition Start/Stop",
                      selectedVariant1?.advanceInternetFeature?.remoteVehicleIgnitionStartStop,
                      selectedVariant2?.advanceInternetFeature?.remoteVehicleIgnitionStartStop
                    ],
                    [
                      "Inbuilt APPs",
                      selectedVariant1?.advanceInternetFeature?.inbuiltApps,
                      selectedVariant2?.advanceInternetFeature?.inbuiltApps
                    ],
                    [
                      "Navigation with Live Traffic", 
                      selectedVariant1?.advanceInternetFeature.navigationwithLiveTraffic,
                      selectedVariant2?.advanceInternetFeature.navigationwithLiveTraffic
                    ],
                    [
                      "E-Call & I-Call", 
                      selectedVariant1?.advanceInternetFeature.ecallAndIcall,
                      selectedVariant2?.advanceInternetFeature.ecallAndIcall
                    ],
                    [
                      "Google / Alexa Connectivity ", 
                      selectedVariant1?.advanceInternetFeature.googleAlexaConnectivity,
                      selectedVariant2?.advanceInternetFeature.googleAlexaConnectivity
                    ],
                    [
                      "SOS Button", 
                      selectedVariant1?.advanceInternetFeature.SOSButton,
                      selectedVariant2?.advanceInternetFeature.SOSButton
                    ],
                  ].map(([label, value1, value2], idx) => (
                    <div key={idx} className="space-y-2 mb-4">
                    <p className="text-center text-sm md:text-[16px] py-1 rounded-lg bg-[#F8F8F9] font-medium">{label}</p>
                    <div className="px-4 py-2 text-xs md:text-[16px] gap-2 border flex justify-around rounded-lg">
                        <div>{(value1 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value1 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value1}</div>
                        <div>{(value2 as any) == true ? <div className='bg-green-600 rounded-full flex justify-center items-center w-5 h-5'><CheckIcon className='text-white' size={13}/></div> : (value2 as any) == false ? <div className='bg-red-600 rounded-full flex justify-center items-center w-5 h-5'><XIcon className='text-white' size={13}/></div> : value2}</div>
                    </div>
                    </div>
                  ))}
                  </div>
            </Section>
        </div>
                      
      </div>

    <div className="mt-6 border border-gray-200 p-5 rounded-2xl mx-auto max-w-4xl">
    <h2 className="text-xl font-medium mb-2">
      Pros & Cons
    </h2>
    <div className="flex gap-4 mb-2">
      <button className={selectedTab == 'pros' ? 'border-b border-orange-600' : ''} onClick={()=> setSelectedTab('pros')}>Pros</button>
      <button className={selectedTab == 'cons' ? 'border-b border-orange-600' : ''} onClick={()=> setSelectedTab('cons')}>Cons</button>
    </div>

    {selectedTab == 'pros' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#f5fbf8] p-4 rounded-xl border border-emerald-100">
          <h3 className="font-medium text-emerald-600 mb-2">{car1.brand.charAt(0).toUpperCase() + car1.brand.slice(1)} {car1.modelName.charAt(0).toUpperCase() + car1.modelName.slice(1)}</h3>
        <ul className="space-y-2">
          {car1.pros?.map((p: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="text-gray-700m w-[90%]">{p}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-[#f5fbf8] p-4 rounded-xl border border-emerald-100">
        <h3 className="font-medium text-emerald-600 mb-2">{car2.brand.charAt(0).toUpperCase() + car2.brand.slice(1)} {car2.modelName.charAt(0).toUpperCase() + car2.modelName.slice(1)}</h3>
        <ul className="space-y-2">
          {car2.pros?.map((p: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-600"></span>
              <span className="text-gray-700m w-[90%]">{p}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[#fff5f5] p-4 rounded-xl border border-red-100">
        <h3 className="font-medium text-red-600 mb-2">{car1.brand.charAt(0).toUpperCase() + car1.brand.slice(1)} {car1.modelName.charAt(0).toUpperCase() + car1.modelName.slice(1)}</h3>
        <ul className="space-y-2">
          {car1.cons?.map((c: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-red-600"></span>
              <span className="text-gray-700 w-[90%]">{c}</span>
            </li>
          ))}
        </ul>
      </div>

        <div className="bg-[#fff5f5] p-4 rounded-xl border border-red-100">
        <h3 className="font-medium text-red-600 mb-2">{car2.brand.charAt(0).toUpperCase() + car2.brand.slice(1)} {car2.modelName.charAt(0).toUpperCase() + car2.modelName.slice(1)}</h3>
        <ul className="space-y-2">
          {car2.cons?.map((c: string, index: number) => (
            <li key={index} className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-red-600"></span>
              <span className="text-gray-700 w-[90%]">{c}</span>
            </li>
          ))}
        </ul>
      </div>
      </div>
    )}
  
</div>

    </div>
  );
};

export default ComparePageDetails;


  type SectionId =
    | 'Engine & Transmission'
    | 'Fuel & Performance'
    | 'Suspension, Steering & Brakes'
    | 'suspension'
    | 'Dimensions & Capacity'
    | 'Comfort & Convenience'
    | 'Interior'
    | 'Exterior'
    | 'Safety'
    | 'Entertainment & Communication'
    | 'ADAS Feature'
    | 'Advance Internet Feature';

  type SectionProps = {
    title: string;
    id: SectionId;
    expandedSections: any;
    toggleSection: any;
    children?: React.ReactNode;
  };

const Section: React.FC<SectionProps> = ({ title, id, children, expandedSections, toggleSection }) => (
  <div className="overflow-hidden">
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full border-b px-4 py-3 flex justify-between items-center"
    >
      <h3 className="text-sm md:text-[16px] font-semibold text-left">{title}</h3>
      {expandedSections[id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {expandedSections[id] && <div className="p-4">{children}</div>}
  </div>
);
