'use client';
import React, { useEffect, useState } from 'react'
import { useParams } from "next/navigation";
import { Car } from '@/types/Car';
import axios from 'axios';
import { Star, CheckIcon, XIcon, User } from 'lucide-react';
import { Header } from './Header';
const VariantDetails = () => {
    const { variant } = useParams();
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
            <div className='py-3 border-b border-gray-200'>
                <h2 className='text-2xl font-semibold ms-4'>{carVariant.name} specifications & features</h2>
            </div>
            <div className='p-2 flex'>
              <div className='flex flex-col items-start w-80 border bg-[#fafafa] divide-y rounded-bl-lg h-max text-sm'>
                {['Engine & Transmission','Fuel & Performance','Suspension, Steering & Brakes','Dimensions & Capacity',
                  'Comfort & Convenience','Interior','Exterior','Safety','Entertainment & Communication','ADAS Feature',
                  'Advance Internet Feature'
                  ].map((item,index)=>(
                    <button onClick={()=> setActiveTab(item)} className={`w-full ${activeTab === item && 'bg-[#24272c] text-white'} py-3 text-start px-2`} key={index}>{item}</button>
                  ))}
              </div>
              <div className='overflow-y-auto w-full h-[500px]'>
                  <div className='px-4'>
                    {activeTab == 'Engine & Transmission' &&
                      <div>
                        <p className='ms-4 text-lg font-bold'>Engine & Transmission</p>
                        <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                          <tbody>
                            {[
                              ["Engine Type", carVariant.engineAndTransmission.engineType],
                              ["Displacement", carVariant.engineAndTransmission.displacement],
                              ["Max Power", carVariant.engineAndTransmission.maxPower],
                              ["Max Torque", carVariant.engineAndTransmission.maxTorque],
                              ["No. of Cylinders", carVariant.engineAndTransmission.NumOfCylinders],
                              ["Valves Per Cylinder", carVariant.engineAndTransmission.valvesPerCylinder],
                              ["Fuel Supply System", carVariant.engineAndTransmission.fuelSupplySystem],
                              ["Turbo Charger", carVariant.engineAndTransmission.turboCharger ? "Yes" : "No"],
                              ["Transmission Type", carVariant.engineAndTransmission.transmissionType],
                              ["Gearbox", carVariant.engineAndTransmission.gearbox],
                              ["Drive Type", carVariant.engineAndTransmission.driveType],
                            ].map(([label, value], idx) => (
                              <tr key={idx} className="border-b last:border-none">
                                <td className="border-r px-4 py-2 font-medium">{label}</td>
                                <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    }

                    {activeTab == 'Fuel & Performance' &&
                      <div>
                        <p className='ms-4 text-lg font-bold'>Fuel & Performance</p>
                        <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                          <tbody>
                            {[
                              ["Fuel Type", carVariant.fuelAndPerformance.fuelType],
                              ["Petrol Mileage ARAI", carVariant.fuelAndPerformance.petrolMileageARAI],
                              ["Petrol Fuel Tank Capacity", carVariant.fuelAndPerformance.petrolFuelTankCapacity],
                              ["Emission Norm Compliance", carVariant.fuelAndPerformance.emissionNormCompliance],
                            ].map(([label, value], idx) => (
                              <tr key={idx} className="border-b last:border-none">
                                <td className="border-r px-4 py-2 font-medium">{label}</td>
                                <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div> 
                    }

                    {activeTab == 'Suspension, Steering & Brakes' &&
                    <div>
                      <p className='ms-4 text-lg font-bold'>Suspension, Steering & Brakes</p>
                      <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                        <tbody>
                          {[
                            ["Front Suspension", carVariant.suspensionAndSteeringAndBrakes.frontSuspension],
                            ["Rear Suspension", carVariant.suspensionAndSteeringAndBrakes.rearSuspension],
                            ["Steering Type", carVariant.suspensionAndSteeringAndBrakes.steeringType],
                            ["Steering Column", carVariant.suspensionAndSteeringAndBrakes.steeringColumn],
                            ["Front Brake Type", carVariant.suspensionAndSteeringAndBrakes.frontBrakeType],
                            ["Rear Brake Type", carVariant.suspensionAndSteeringAndBrakes.rearBrakeType]
                          ].map(([label, value], idx) => (
                            <tr key={idx} className="border-b last:border-none">
                              <td className="border-r px-4 py-2 font-medium">{label}</td>
                              <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    }

                    {activeTab == 'Dimensions & Capacity' &&
                      <div>
                        <p className='ms-4 text-lg font-bold'>Dimensions & Capacity</p>
                        <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                          <tbody>
                            {[
                              ["Length", carVariant.dimensionsAndCapacity.length],
                              ["Width", carVariant.dimensionsAndCapacity.Width],
                              ["Height", carVariant.dimensionsAndCapacity.height],
                              ["Boot Space", carVariant.dimensionsAndCapacity.bootSpace],
                              ["Seating Capacity", carVariant.dimensionsAndCapacity.seatingCapacity],
                              ["Wheel Base", carVariant.dimensionsAndCapacity.wheelBase],
                              ["No. of Doors", carVariant.dimensionsAndCapacity.numOfDoors]
                            ].map(([label, value], idx) => (
                              <tr key={idx} className="border-b last:border-none">
                                <td className="border-r px-4 py-2 font-medium">{label}</td>
                                <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    }

                    {activeTab == 'Comfort & Convenience' &&
                      <div>
                        <p className='ms-4 text-lg font-bold'>Comfort & Convenience</p>
                    <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                      <tbody>
                        {[
                          ["Power Steering", carVariant.comfortAndConvenience.powerSteering],
                          ["Air Conditioner", carVariant.comfortAndConvenience.airConditioner],
                          ["Heater", carVariant.comfortAndConvenience.heater],
                          ["Adjustable Steering", carVariant.comfortAndConvenience.adjustableSteering],
                          ["Height Adjustable Driver Seat", carVariant.comfortAndConvenience.heightAdjustableDriverSeat],
                          ["Ventilated Seats", carVariant.comfortAndConvenience.ventilatedSeats],
                          ["Electric Adjustable Seats", carVariant.comfortAndConvenience.electricAdjustableSeats],
                          ["Automatic Climate Control", carVariant.comfortAndConvenience.automaticClimateControl],
                          ["Accessory Power Outlet", carVariant.comfortAndConvenience.accessoryPowerOutlet],
                          ["Trunk Light", carVariant.comfortAndConvenience.trunkLight],
                          ["Vanity Mirror", carVariant.comfortAndConvenience.vanityMirror],
                          ["Rear Seat Headrest", carVariant.comfortAndConvenience.rearSeatHeadrest],
                          ["Adjustable Headrest", carVariant.comfortAndConvenience.adjustableHeadrest],
                          ["Rear Seat Centre Arm Rest", carVariant.comfortAndConvenience.rearSeatCentreArmRest],
                          ["Rear AC Vents", carVariant.comfortAndConvenience.rearACVents],
                          ["Cruise Control", carVariant.comfortAndConvenience.cruiseControl],
                          ["Parking Sensors", carVariant.comfortAndConvenience.parkingSensors],
                          ["Foldable Rear Seat", carVariant.comfortAndConvenience.foldableRearSeat],
                          ["Smart Access Card Entry", carVariant.comfortAndConvenience.smartAccessCardEntry],
                          ["KeyLess Entry", carVariant.comfortAndConvenience.keyLessEntry],
                          ["Engine Start/Stop Button", carVariant.comfortAndConvenience.engineStartStopButton],
                          ["Cooled Glovebox", carVariant.comfortAndConvenience.cooledGlovebox],
                          ["Voice Commands", carVariant.comfortAndConvenience.voiceCommands],
                          ["Paddle Shifters", carVariant.comfortAndConvenience.paddleShifters],
                          ["USB Charger", carVariant.comfortAndConvenience.usbCharger],
                          ["Central Console Armrest", carVariant.comfortAndConvenience.centralConsoleArmrest],
                          ["Drive Modes", carVariant.comfortAndConvenience.driveModes],
                          ["Idle Start-Stop System", carVariant.comfortAndConvenience.idleStartStopSystem],
                          ["Rear Window Sunblind", carVariant.comfortAndConvenience.rearWindowSunblind],
                          ["Automatic Headlamps", carVariant.comfortAndConvenience.automaticHeadlamps],
                          ["Follow Me Home Headlamps", carVariant.comfortAndConvenience.followMeHomeHeadlamps],
                          ["Voice assisted sunroof", carVariant.comfortAndConvenience.voiceassistedsunroof],
                          ["Drive Mode Types", carVariant.comfortAndConvenience.driveModeTypes],
                          ["Power Windows", carVariant.comfortAndConvenience.powerWindows],
                          ["Cup Holders", carVariant.comfortAndConvenience.cupholders],
                        ].map(([label, value], idx) => (
                          <tr key={idx} className="border-b last:border-none">
                            <td className="border-r px-4 py-2 font-medium">{label}</td>
                            <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                      </div>
                    }  

                    {activeTab == 'Interior' &&
                      <div>
                        <p className='ms-4 text-lg font-bold'>Interior</p>
                        <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                          <tbody>
                            {[
                              ["Tachometer", carVariant.interior.tachometer],
                              ["Glove Box", carVariant.interior.gloveBox],
                              ["Digital Cluster", carVariant.interior.digitalCluster],
                              ["Digital Cluster Size", carVariant.interior.digitalClusterSize],
                              ["Upholstery", carVariant.interior.upholstery],
                            ].map(([label, value], idx) => (
                              <tr key={idx} className="border-b last:border-none">
                                <td className="border-r px-4 py-2 font-medium">{label}</td>
                                <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>
                    }

                    {activeTab == 'Exterior' &&
                      <div>
                         <p className='ms-4 text-lg font-bold'>Exterior</p>
                    <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                      <tbody>
                        {[
                          ["Rear Window Wiper", carVariant.exterior.rearWindowWiper],
                          ["Rear Window Washer", carVariant.exterior.rearWindowWasher],
                          ["Rear Window Defogger", carVariant.exterior.rearWindowDefogger],
                          ["Wheel Covers", carVariant.exterior.wheelCovers],
                          ["Alloy Wheels", carVariant.exterior.alloyWheels],
                          ["Power Antenna", carVariant.exterior.powerAntenna],
                          ["Rear Spoiler", carVariant.exterior.rearSpoiler],
                          ["Outside Rear View Mirror Turn Indicators", carVariant.exterior.outsideRearViewMirrorTurnIndicators],
                          ["Chrome Grille", carVariant.exterior.chromeGrille],
                          ["Projector Headlamps", carVariant.exterior.projectorHeadlamps],
                          ["Roof Rails", carVariant.exterior.roofRails],
                          ["Automatic Headlamps", carVariant.exterior.automaticHeadlamps],
                          ["Antenna", carVariant.exterior.antenna],
                          ["Sunroof", carVariant.exterior.sunroof],
                          ["Puddle Lamps", carVariant.exterior.puddleLamps],
                          ["Outside Rear View Mirror (ORVM)", carVariant.exterior.outsideRearViewMirror],
                          ["Tyre Size", carVariant.exterior.tyreSize],
                          ["Tyre Type", carVariant.exterior.tyreType],
                          ["Wheel Size", carVariant.exterior.wheelSize],
                          ["LED DRLs", carVariant.exterior.ledDRLs],
                          ["LED Taillights", carVariant.exterior.ledTaillights],
                        ].map(([label, value], idx) => (
                          <tr key={idx} className="border-b last:border-none">
                            <td className="border-r px-4 py-2 font-medium">{label}</td>
                            <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                      </div>
                    }

                    {activeTab == 'Safety' &&
                      <div>
                        <p className='ms-4 text-lg font-bold'>Safety</p>
                    <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                      <tbody>
                        {[
                          ["Anti-lock Braking System (ABS)", carVariant.safety.antilockBrakingSystem],
                          ["Central Locking", carVariant.safety.centralLocking],
                          ["Child Safety Locks", carVariant.safety.childSafetyLocks],
                          ["Anti-Theft Alarm", carVariant.safety.antiTheftAlarm],
                          ["No. of Airbags", carVariant.safety.numOfAirbags],
                          ["Driver Airbag", carVariant.safety.driverAirbag],
                          ["Passenger Airbag", carVariant.safety.passengerAirbag],
                          ["Side Airbag", carVariant.safety.sideAirbag],
                          ["Side Airbag-Rear", carVariant.safety.sideAirbagRear],
                          ["Day & Night Rear View Mirror", carVariant.safety.dayandNightRearViewMirror],
                          ["Curtain Airbag", carVariant.safety.curtainAirbag],
                          ["Electronic Brakeforce Distribution (EBD)", carVariant.safety.electronicBrakeforceDistribution],
                          ["Seat Belt Warning", carVariant.safety.seatBeltWarning],
                          ["Door Ajar Warning", carVariant.safety.doorAjarWarning],
                          ["Traction Control", carVariant.safety.tractionControl],
                          ["Tyre Pressure Monitoring System (TPMS)", carVariant.safety.tyrePressureMonitoringSystem],
                          ["Engine Immobilizer", carVariant.safety.engineImmobilizer],
                          ["Electronic Stability Control (ESC)", carVariant.safety.electronicStabilityControl],
                          ["Rear Camera", carVariant.safety.rearCamera],
                          ["Speed Alert", carVariant.safety.speedAlert],
                          ["Speed Sensing Auto Door Lock", carVariant.safety.speedSensingAutoDoorLock],
                          ["ISOFIX Child Seat Mounts", carVariant.safety.iSOFIXChildSeatMounts],
                          ["Pretensioners & Force Limiter Seatbelts", carVariant.safety.pretensionersandForceLimiterSeatbelts],
                          ["Blind Spot Camera", carVariant.safety.blindSpotCamera],
                          ["Hill Assist", carVariant.safety.hillAssist],
                          ["Impact Sensing Auto Door Unlock", carVariant.safety.impactSensingAutoDoorUnlock],
                          ["360 View Camera", carVariant.safety._360ViewCamera],
                        ].map(([label, value], idx) => (
                          <tr key={idx} className="border-b last:border-none">
                            <td className="border-r px-4 py-2 font-medium">{label}</td>
                            <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                      </div>
                    }

                    {activeTab == 'Entertainment & Communication' &&
                      <div>
                         <p className='ms-4 text-lg font-bold'>Entertainment & Communication</p>
                    <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                      <tbody>
                        {[
                          ["Radio", carVariant.entertainmentAndCommunication.radio],
                          ["Wireless Phone Charging", carVariant.entertainmentAndCommunication.wirelessPhoneCharging],
                          ["Bluetooth Connectivity", carVariant.entertainmentAndCommunication.bluetoothConnectivity],
                          ["Touchscreen", carVariant.entertainmentAndCommunication.touchscreen],
                          ["Touchscreen Size", carVariant.entertainmentAndCommunication.touchscreenSize],
                          ["Android Auto", carVariant.entertainmentAndCommunication.androidAuto],
                          ["Apple CarPlay", carVariant.entertainmentAndCommunication.appleCarPlay],
                          ["No. of Speakers", carVariant.entertainmentAndCommunication.numOfSpeakers],
                          ["Usb Ports", carVariant.entertainmentAndCommunication.usbPorts],
                          ["Additional Features", carVariant.entertainmentAndCommunication.additionalFeatures],
                          ["Speakers", carVariant.entertainmentAndCommunication.speakers],
                        ].map(([label, value], idx) => (
                          <tr key={idx} className="border-b last:border-none">
                            <td className="border-r px-4 py-2 font-medium">{label}</td>
                            <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                      </div>
                    }

                   {activeTab == 'ADAS Feature' &&
                    <div>
                      <p className='ms-4 text-lg font-bold'>ADAS Feature</p>
                    <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                      <tbody>
                        {[
                          ["Blind Spot Monitor", carVariant.ADASFeature.blindSpotMonitor],
                        ].map(([label, value], idx) => (
                          <tr key={idx} className="border-b last:border-none">
                            <td className="border-r px-4 py-2 font-medium">{label}</td>
                            <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                   }
                    
                   {activeTab == 'Advance Internet Feature' &&
                    <div>
                       <p className='ms-4 text-lg font-bold'>Advance Internet Feature</p>
                    <table className="w-full border border-slate-300 rounded-lg overflow-hidden mt-6 text-slate-700">
                      <tbody>
                        {[
                          ["Over the Air (OTA) Updates", carVariant.advanceInternetFeature.overAirUpdates],
                          ["Remote Vehicle Ignition Start/Stop", carVariant.advanceInternetFeature.remoteVehicleIgnitionStartStop],
                          ["Inbuilt APPs", carVariant.advanceInternetFeature.inbuiltApps],
                        ].map(([label, value], idx) => (
                          <tr key={idx} className="border-b last:border-none">
                            <td className="border-r px-4 py-2 font-medium">{label}</td>
                            <td className="px-4 py-2">{(value as any) == true ? <CheckIcon className='text-green-600'/> : (value as any) == false ? <XIcon className='text-red-600'/> : value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    </div>
                   }

                  </div>
              </div>
            </div>
          </div>


          <div className='border border-gray-200 rounded-2xl p-4 max-w-4xl mt-4'>
            <h2 className='text-2xl font-semibold'>{carVariant.name} user reviews</h2>
            <div className='flex mt-4 items-center'>
              <span className='text-3xl font-bold'>4.7</span>
              <Star className='w-[30px] h-[30px] text-yellow-400 ms-1'/>
              <p className='text-sm ms-1'>Based on 40 User reviews</p>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4'>
              <div className='border p-4 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <div className='bg-gray-400 flex justify-center items-center rounded-full w-8 h-8'>
                      <User/>
                    </div>
                    <div>
                      <p className='text-xs'>Arijit On Nov 22, 2025</p>
                      <div className='flex items-center'>
                        <p className='text-sm font-semibold'>5</p>
                        <Star className='w-3 h-4'/>
                      </div>
                    </div>
                  </div>
                  <p className='mt-2 font-semibold'>Excellent Car</p>
                  <div className='text-[13px] mt-2'>Good car, Modern design in a reasonable & budget friendly price, I recommend people to
                     buy it as its newly launched & hyundai services are good & their resale value is 
                     considered one of the best in the world. Dont think twice & go for it with some new gen
                      technology & new modern fit for the people. Thank you
                  </div>
              </div>
              <div className='border p-4 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <div className='bg-gray-400 flex justify-center items-center rounded-full w-8 h-8'>
                      <User/>
                    </div>
                    <div>
                      <p className='text-xs'>Arijit On Nov 22, 2025</p>
                      <div className='flex items-center'>
                        <p className='text-sm font-semibold'>5</p>
                        <Star className='w-3 h-4'/>
                      </div>
                    </div>
                  </div>
                  <p className='mt-2 font-semibold'>Excellent Car</p>
                  <div className='text-[13px] mt-2'>Good car, Modern design in a reasonable & budget friendly price, I recommend people to
                     buy it as its newly launched & hyundai services are good & their resale value is 
                     considered one of the best in the world. Dont think twice & go for it with some new gen
                      technology & new modern fit for the people. Thank you
                  </div>
              </div>
              <div className='border p-4 rounded-lg'>
                  <div className='flex items-center gap-2'>
                    <div className='bg-gray-400 flex justify-center items-center rounded-full w-8 h-8'>
                      <User/>
                    </div>
                    <div>
                      <p className='text-xs'>Arijit On Nov 22, 2025</p>
                      <div className='flex items-center'>
                        <p className='text-sm font-semibold'>5</p>
                        <Star className='w-3 h-4'/>
                      </div>
                    </div>
                  </div>
                  <p className='mt-2 font-semibold'>Excellent Car</p>
                  <div className='text-[13px] mt-2'>Good car, Modern design in a reasonable & budget friendly price, I recommend people to
                     buy it as its newly launched & hyundai services are good & their resale value is 
                     considered one of the best in the world. Dont think twice & go for it with some new gen
                      technology & new modern fit for the people. Thank you
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
