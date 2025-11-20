'use client';
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { Car } from '@/types/Car';
import axios from 'axios';
import { Star } from 'lucide-react';
import { Header } from './Header';
const VariantDetails = () => {
    const { brand, name, variant } = useParams();
    const [carVariant, setCarVariant] = useState<Car | null>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeTab, setActiveTab] = useState('Engine & Transmission');
    const [model, setModel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    const fetchVariant = async() => {
        try{
            const response = await axios.get(`/api/managecars/${variant?.toString().replace(/-/g, ' ')}`);
            if(response.status === 200){
                console.log(response.data);
                setCarVariant(response.data.car);
                setModel(response.data.model);
            }
        }catch(error){
            console.log(error);
        }
        setLoading(false);
    }
    useEffect(()=> {
        fetchVariant();
    },[]);

    if(loading){
        return(
            <div>Loading...</div>
        )
    }
  return (
    <div>
        <Header/>
        {carVariant && model ? (
            <div className='max-w-7xl mx-auto'>
                <div className='flex gap-5 py-4 px-2'>
                    <div className='w-[40%] h-[30%]'>
                        <img src={`${model.images[activeIndex]}`} alt="model" className='w-[100%] h-[100%] rounded-lg' />
                    </div>
                    <div className='flex flex-col gap-y-4'>
                        <h2 className='text-3xl font-semibold'>{model?.brand?.charAt(0).toUpperCase() + model.brand.slice(1)} {carVariant.name}</h2>
                        <div className='flex'>
                            <b>4.7</b>
                            <Star className='w-4 h-5 text-yellow-400'/>
                            <p>37 Reviews</p>
                        </div>
                        <p className="text-gray-900 font-bold">₹{(Number(carVariant.price)/100000).toFixed(2)} Lakh</p>
                        <button className='bg-orange-600 text-white px-4 py-2 rounded-lg mt-10'>Get Offers</button>
                        <p>Hurry up to lock festive offers!</p>
                    </div>
                </div>
                 <div className="overflow-x-auto">
            <div className="flex gap-3 max-w-4xl">
              {model?.images?.map((src: string, idx: number) => (
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

          <div className='border border-gray-200 rounded-2xl p-4 max-w-4xl mt-4'>
            <h2 className='text-2xl font-semibold'>{carVariant.name} overview</h2>
            <hr className='my-2'/>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-slate-50 rounded-lg">Engine:
            <p>{carVariant.engineAndTransmission.displacement}cc</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Power:
            <p>{carVariant.engineAndTransmission.maxPower}bhp</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Seating Capacity:
            <p>{carVariant.dimensionsAndCapacity.seatingCapacity}</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Torque: 
             <p>{carVariant.engineAndTransmission.maxTorque}Nm</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Mileage: 
            <p>{carVariant.fuelAndPerformance.petrolMileageARAI}kmpl</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg">Drive Type:
            <p>{carVariant.engineAndTransmission.driveType}</p>
          </div>
        </div>
          </div>


          <div className='border border-gray-200 rounded-2xl p-4 max-w-4xl mt-4'>
            <h2 className='text-2xl font-semibold'>{carVariant.name} description</h2>
            <hr className='my-2'/>
            <p className='text-slate-700'>{carVariant.description}</p>
          </div>
          {carVariant.priceBreakup && (
            <div className='border border-gray-200 rounded-2xl p-4 max-w-4xl mt-4'>
                 <h2 className='text-2xl font-semibold'>{carVariant.name} price</h2>
                 <div className='text-sm text-slate-700 flex flex-col gap-y-4 mt-2'>
                    <div className='flex justify-between'>
                        <p>Ex-Showroom price</p>
                        <p>₹{carVariant.priceBreakup.exShowroom}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Registration</p>
                        <p>₹{carVariant.priceBreakup.registration}</p>
                    </div>
                    <div className='flex justify-between'>
                        <p>Insurance</p>
                        <p>₹{carVariant.priceBreakup.insurance}</p>
                    </div>
                    {carVariant?.priceBreakup.other && (
                      <div className='flex justify-between'>
                        <p>Other</p>
                        <p>₹{carVariant.priceBreakup.other}</p>
                      </div>
                    )}
                 </div>
            </div>
          )}

          <div className='border border-gray-200 rounded-2xl max-w-4xl mt-4'>
            <div className='py-3 border-b'>
                <h2 className='text-2xl font-semibold ms-4'>{carVariant.name} specifications & features</h2>
            </div>
            <div className='p-2 flex'>
              <div className='flex flex-col items-start w-80 border bg-[#fafafa] divide-y rounded-bl-lg h-max text-sm'>
                {['Engine & Transmission','Fuel & Performance','Suspension, Steering & Brakes','Dimensions & Capacity',
                  'Comfort & Convenience','Interior','Exterior','Safety','Entertainment & Communication','ADAS Feature',
                  'Advance Internet Feature'
                  ].map((item,index)=>(
                    <a onClick={()=> setActiveTab(item)} href={`#${activeTab}`} className={`w-full ${activeTab === item && 'bg-[#24272c] text-white'} py-3 text-start px-2`} key={index}>{item}</a>
                  ))}
              </div>
              <div className='overflow-y-auto w-full h-[500px]'>
                  <div>
                    <p id='Engine & Transmission' className='ms-6'>Engine & Transmission</p>
                    <div className='flex flex-col gap-5 mt-8 text-slate-700'>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Engine Type</p>
                        <p>{carVariant.engineAndTransmission.engineType}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Displacement</p>
                        <p>{carVariant.engineAndTransmission.displacement}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Max Power</p>
                        <p>{carVariant.engineAndTransmission.maxPower}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Max Torque</p>
                        <p>{carVariant.engineAndTransmission.maxTorque}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>No. of Cylinders</p>
                        <p>{carVariant.engineAndTransmission.NumOfCylinders}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Valves Per Cylinder</p>
                        <p>{carVariant.engineAndTransmission.valvesPerCylinder}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Fuel Supply System</p>
                        <p>{carVariant.engineAndTransmission.fuelSupplySystem}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Turbo Charger</p>
                        <p>{carVariant.engineAndTransmission.turboCharger}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Transmission Type</p>
                        <p>{carVariant.engineAndTransmission.transmissionType}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Gearbox</p>
                        <p>{carVariant.engineAndTransmission.gearbox}</p>
                      </div>
                      <div className='flex justify-between ms-6 w-[70%]'>
                        <p>Drive Type</p>
                        <p>{carVariant.engineAndTransmission.driveType}</p>
                      </div>
                    </div>

                    <p id='Fuel & Performance' className='ms-6 mt-10'>Fuel & Performance</p>
                      <div className='flex flex-col gap-5 mt-8 text-slate-700 w-[70%]'>
                        <div className='flex justify-between ms-6'>
                          <p>Fuel Type</p>
                          <p>{carVariant.fuelAndPerformance.fuelType}</p>
                        </div>
                        <div className='flex justify-between ms-6'>
                          <p>Petrol Mileage ARAI</p>
                          <p>{carVariant.fuelAndPerformance.petrolMileageARAI}</p>
                        </div>
                        <div className='flex justify-between ms-6'>
                          <p>Petrol Fuel Tank Capacity</p>
                          <p>{carVariant.fuelAndPerformance.petrolFuelTankCapacity}</p>
                        </div>
                        <div className='flex justify-between ms-6'>
                          <p>Emission Norm Compliance</p>
                          <p>{carVariant.fuelAndPerformance.emissionNormCompliance}</p>
                        </div>
                      </div>

                    <p id='Suspension, Steering & Brakes' className='ms-6 mt-10'>Suspension, Steering & Brakes</p>
                    <div className='flex flex-col gap-5 mt-8 text-slate-700 w-[70%]'>
                        <div className='flex justify-between ms-6'>
                          <p>Front Suspension</p>
                          <p>{carVariant.suspensionAndSteeringAndBrakes.frontSuspension}</p>
                        </div>
                        <div className='flex justify-between ms-6'>
                          <p>Rear Suspension</p>
                          <p>{carVariant.suspensionAndSteeringAndBrakes.rearSuspension}</p>
                        </div>
                        <div className='flex justify-between ms-6'>
                          <p>Steering Type</p>
                          <p>{carVariant.suspensionAndSteeringAndBrakes.steeringType}</p>
                        </div>
                        <div className='flex justify-between ms-6'>
                          <p>Steering Column</p>
                          <p>{carVariant.suspensionAndSteeringAndBrakes.steeringColumn}</p>
                        </div>
                        <div className='flex justify-between ms-6'>
                          <p>Front Brake Type</p>
                          <p>{carVariant.suspensionAndSteeringAndBrakes.frontBrakeType}</p>
                        </div>
                        <div className='flex justify-between ms-6'>
                          <p>Rear Brake Type</p>
                          <p>{carVariant.suspensionAndSteeringAndBrakes.rearBrakeType}</p>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

            </div>
        ) : (
            <div>No Car found</div>
        )}
    </div>
  )
}

export default VariantDetails
