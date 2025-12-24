import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Car } from '@/types/Car';
import { Model } from '@/types/Car';
import axios from 'axios';
import { ChevronDown, ChevronUp } from 'lucide-react';
import toast from "react-hot-toast";

interface AddCarProps {
  selectedCar: Car | null;
  operation: 'add' | 'update';
  setOperation: any;
}

const AddCar = ({selectedCar, operation, setOperation}: AddCarProps) => {
    const [carForm, setCarForm] = useState<Car>({
    model: '',
    name: '',
    price: '',
    originalPrice: '',
    engineAndTransmission: {
      engineType: '',
      displacement: '',
      maxPower: '',
      maxTorque: '',
      NumOfCylinders: '',
      valvesPerCylinder: '',
      fuelSupplySystem: '',
      transmissionType: '',
      gearbox: '',
      driveType: '',
      turboCharger: false,
    },
    fuelAndPerformance: {
      fuelType: '',
      petrolMileageARAI: '',
      petrolFuelTankCapacity: '',
      emissionNormCompliance: '',
    },
    suspensionAndSteeringAndBrakes: {
      frontSuspension: '',
      rearSuspension: '',
      steeringType: '',
      steeringColumn: '',
      turningRadius: '',
      frontBrakeType: '',
      rearBrakeType: '',
      bootSpaceRearSeatFolding: ''
    },
    dimensionsAndCapacity: {
      length: '',
      Width: '',
      height: '',
      bootSpace: '',
      seatingCapacity: '',
      groundClearanceUnladen: '',
      wheelBase: '',
      numOfDoors: 0,
    },
    comfortAndConvenience: {
      powerSteering: false,
      airConditioner: false,
      heater: false,
      adjustableSteering: '',
      heightAdjustableDriverSeat: false,
      ventilatedSeats: false,
      electricAdjustableSeats: false,
      automaticClimateControl: false,
      airQualityControl: false,
      accessoryPowerOutlet: false,
      trunkLight: false,
      vanityMirror: false,
      rearReadingLamp: false,
      rearSeatHeadrest: '',
      heightAdjustableFrontSeatBelts: false,
      adjustableHeadrest: false,
      rearSeatCentreArmRest: false,
      rearACVents: false,
      cruiseControl: false,
      parkingSensors: '',
      foldableRearSeat: '',
      smartAccessCardEntry : false,
      keyLessEntry: false,
      engineStartStopButton: false,
      cooledGlovebox: false,
      voiceCommands: false,
      paddleShifters: false,
      usbCharger: '',
      centralConsoleArmrest: false,
      tailgateAjarWarning: false,
      handsFreeTailgate: false,
      driveModes: false,
      idleStartStopSystem: false,
      rearWindowSunblind: false,
      automaticHeadlamps: false,
      followMeHomeHeadlamps: false,
      voiceassistedsunroof: false,
      driveModeTypes: false,
      powerWindows: '',
      cupholders: '',
    },
    interior: {
      tachometer: false,
      leatherWrappedSteeringWheel: false,
      leatherwrapgearshiftselector: false,
      gloveBox: false,
      digitalCluster: false,
      digitalClusterSize: '',
      upholstery: '',
    },
    exterior: {
      rainSensingWiper: false,
      rearWindowWiper: false,
      rearWindowWasher: false,
      rearWindowDefogger: false,
      wheelCovers: false,
      alloyWheels: false,
      powerAntenna: false,
      rearSpoiler: false,
      outsideRearViewMirrorTurnIndicators: false,
      integratedAntenna: false,
      chromeGrille: false,
      projectorHeadlamps: false,
      corneringFoglamps: false,
      roofRails: false,
      automaticHeadlamps: false,
      fogLights: false,
      antenna: '',
      sunroof: false,
      puddleLamps: false,
      bootOpening: '',
      outsideRearViewMirror: '',
      tyreSize: '',
      tyreType: '',
      wheelSize:'',
      ledDRLs: false,
      ledHeadlamps: false,
      ledTaillights: false,
      ledFogLamps: false,
      additionalFeatures: '',
    },
    safety: {
     antilockBrakingSystem: false,
      brakeAssist: false,
      centralLocking: false,
      childSafetyLocks: false,
      antiTheftAlarm: false,
      numOfAirbags: 0,
      driverAirbag: false,
      passengerAirbag: false,
      sideAirbag: false,
      sideAirbagRear: false,
      dayandNightRearViewMirror: false,
      curtainAirbag: false,
      electronicBrakeforceDistribution: false,
      seatBeltWarning: false,
      doorAjarWarning: false,
      tractionControl: false,
      tyrePressureMonitoringSystem: false,
      engineImmobilizer: false,
      electronicStabilityControl: false,
      rearCamera: false,
      speedAlert: false,
      speedSensingAutoDoorLock: false,
      iSOFIXChildSeatMounts: false,
      headsUpDisplay: false,
      pretensionersandForceLimiterSeatbelts: '',
      blindSpotCamera: false,
      hillDescentControl: false,
      hillAssist: false,
      impactSensingAutoDoorUnlock: false,
      _360ViewCamera: false,
    },
    entertainmentAndCommunication: {
      radio: false,
      wirelessPhoneCharging: false,
      bluetoothConnectivity: false,
      touchscreen: false,
      touchscreenSize: '',
      androidAuto: false,
      appleCarPlay: false,
      numOfSpeakers: 0,
      usbPorts: false,
      additionalFeatures: '',
      tweeters: '',
      speakers: '',
    },
    ADASFeature: {
      blindSpotMonitor: false,
      forwardCollisionWarning: false,
      automaticEmergencyBraking: false,
      speedAssistSystem: false,
      trafficSignRecognition: false,
      blindSpotCollisionAvoidanceAssist: false,
      laneDepartureWarning: false,
      laneKeepAssist: false,
      laneDeparturePreventionAssist: false,
      driverAttentionWarning: false,
      adaptiveCruiseControl: false,
      adaptiveHighBeamAssist: false,
      rearCrossTrafficAlert: false,
      rearCrossTrafficCollisionAvoidanceAssist: false,
    },
    advanceInternetFeature: {
      overAirUpdates: false,
      remoteVehicleIgnitionStartStop: false,
      inbuiltApps: false,
      navigationwithLiveTraffic: false,
      ecallAndIcall: false,
      googleAlexaConnectivity: false,
      SOSButton: false,
    },
    description: '',
    priceBreakup: {
      exShowroom: '',
      registration: '',
      insurance: '',
      other: '',
    },
    isLatest: false,
    isFeatured: false,
    reviews: [{rating: 0, username: '', title: '', experience: '', postedAt: new Date()}],
    launchDate: new Date(),
  })

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

  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState(''); 
  const [filteredModels, setFilteredModels] = useState<Model[]>(models || []);
  const [loading,setLoading] = useState(false);
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    const getModels = async()=> {
      try{
        const response = await axios.get('/api/managemodels');
        if(response.status === 200){
          setModels(response.data.models);
          console.log(response.data);
        }
      }catch(error){
        console.error(error);
      }
    }
    getModels();
  },[]);


    useEffect(()=>{
      setCarForm({...carForm, ...selectedCar});
    },[selectedCar]);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (modelRef.current && !modelRef.current.contains(event.target as Node)) {
          setShowModelDropdown(false);
        }
      };
  
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);

    const resetData = ()=> {
    setCarForm({
    model: '',
    name: '',
    price: '',
    originalPrice: '',
    engineAndTransmission: {
      engineType: '',
      displacement: '',
      maxPower: '',
      maxTorque: '',
      NumOfCylinders: '',
      valvesPerCylinder: '',
      fuelSupplySystem: '',
      turboCharger: false,
      transmissionType: '',
      gearbox: '',
      driveType: '',
    },
    fuelAndPerformance: {
      fuelType: '',
      petrolMileageARAI: '',
      petrolFuelTankCapacity: '',
      emissionNormCompliance: '',
    },
    suspensionAndSteeringAndBrakes: {
      frontSuspension: '',
      rearSuspension: '',
      steeringType: '',
      steeringColumn: '',
      turningRadius: '',
      frontBrakeType: '',
      rearBrakeType: '',
      bootSpaceRearSeatFolding: ''
    },
    dimensionsAndCapacity: {
      length: '',
      Width: '',
      height: '',
      bootSpace: '',
      seatingCapacity: '',
      groundClearanceUnladen: '',
      wheelBase: '',
      numOfDoors: 0,
    },
    comfortAndConvenience: {
      powerSteering: false,
      airConditioner: false,
      heater: false,
      adjustableSteering: '',
      heightAdjustableDriverSeat: false,
      ventilatedSeats: false,
      electricAdjustableSeats: false,
      automaticClimateControl: false,
      airQualityControl: false,
      accessoryPowerOutlet: false,
      trunkLight: false,
      vanityMirror: false,
      rearReadingLamp: false,
      rearSeatHeadrest: '',
      heightAdjustableFrontSeatBelts: false,
      adjustableHeadrest: false,
      rearSeatCentreArmRest: false,
      rearACVents: false,
      cruiseControl: false,
      parkingSensors: '',
      foldableRearSeat: '',
      smartAccessCardEntry : false,
      keyLessEntry: false,
      engineStartStopButton: false,
      cooledGlovebox: false,
      voiceCommands: false,
      paddleShifters: false,
      usbCharger: '',
      centralConsoleArmrest: false,
      tailgateAjarWarning: false,
      handsFreeTailgate: false,
      driveModes: false,
      idleStartStopSystem: false,
      rearWindowSunblind: false,
      automaticHeadlamps: false,
      followMeHomeHeadlamps: false,
      voiceassistedsunroof: false,
      driveModeTypes: false,
      powerWindows: '',
      cupholders: '',
    },
    interior: {
      tachometer: false,
      leatherWrappedSteeringWheel: false,
      leatherwrapgearshiftselector: false,
      gloveBox: false,
      digitalCluster: false,
      digitalClusterSize: '',
      upholstery: '',
    },
    exterior: {
      rainSensingWiper: false,
      rearWindowWiper: false,
      rearWindowWasher: false,
      rearWindowDefogger: false,
      wheelCovers: false,
      alloyWheels: false,
      powerAntenna: false,
      rearSpoiler: false,
      outsideRearViewMirrorTurnIndicators: false,
      integratedAntenna: false,
      chromeGrille: false,
      projectorHeadlamps: false,
      corneringFoglamps: false,
      roofRails: false,
      automaticHeadlamps: false,
      fogLights: false,
      antenna: '',
      sunroof: false,
      puddleLamps: false,
      bootOpening: '',
      outsideRearViewMirror: '',
      tyreSize: '',
      tyreType: '',
      wheelSize:'',
      ledDRLs: false,
      ledHeadlamps: false,
      ledTaillights: false,
      ledFogLamps: false,
    additionalFeatures: '',
    },
    safety: {
      antilockBrakingSystem: false,
      brakeAssist: false,
      centralLocking: false,
      childSafetyLocks: false,
      antiTheftAlarm: false,
      numOfAirbags: 0,
      driverAirbag: false,
      passengerAirbag: false,
      sideAirbag: false,
      sideAirbagRear: false,
      dayandNightRearViewMirror: false,
      curtainAirbag: false,
      electronicBrakeforceDistribution: false,
      seatBeltWarning: false,
      doorAjarWarning: false,
      tractionControl: false,
      tyrePressureMonitoringSystem: false,
      engineImmobilizer: false,
      electronicStabilityControl: false,
      rearCamera: false,
      speedAlert: false,
      speedSensingAutoDoorLock: false,
      iSOFIXChildSeatMounts: false,
      headsUpDisplay: false,
      pretensionersandForceLimiterSeatbelts: '',
      blindSpotCamera: false,
      hillDescentControl: false,
      hillAssist: false,
      impactSensingAutoDoorUnlock: false,
      _360ViewCamera: false,
    },
    entertainmentAndCommunication: {
      radio: false,
      wirelessPhoneCharging: false,
      bluetoothConnectivity: false,
      touchscreen: false,
      touchscreenSize: '',
      androidAuto: false,
      appleCarPlay: false,
      numOfSpeakers: 0,
      usbPorts: false,
      additionalFeatures: '',
      tweeters: '',
      speakers: '',
    },
    ADASFeature: {
      blindSpotMonitor: false,
      forwardCollisionWarning: false,
      automaticEmergencyBraking: false,
      speedAssistSystem: false,
      trafficSignRecognition: false,
      blindSpotCollisionAvoidanceAssist: false,
      laneDepartureWarning: false,
      laneKeepAssist: false,
      laneDeparturePreventionAssist: false,
      driverAttentionWarning: false,
      adaptiveCruiseControl: false,
      adaptiveHighBeamAssist: false,
      rearCrossTrafficAlert: false,
      rearCrossTrafficCollisionAvoidanceAssist: false,
    },
    advanceInternetFeature: {
      overAirUpdates: false,
      remoteVehicleIgnitionStartStop: false,
      inbuiltApps: false,
      navigationwithLiveTraffic: false,
      ecallAndIcall: false,
      googleAlexaConnectivity: false,
      SOSButton: false,
    },
    description: '',
    priceBreakup: {
      exShowroom: '',
      registration: '',
      insurance: '',
      other: '',
    },
    isLatest: false,
    isFeatured: false,
    reviews: [{rating: 0, username: '', title: '', experience: '', postedAt: new Date()}],
    launchDate: new Date(),
  });
  setOperation('add');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if(operation == 'add'){
      try{
        const response = await axios.post('/api/managecars', {carForm}, {withCredentials:true});
        if(response.status === 200){
          toast.success(response.data.message);
          resetData();
          console.log(response.data);
        }
      }catch(error){
        toast.error('Faild to add the car');
        console.error(error);
      }
    }
    else{
      try{
        const response = await axios.put('/api/managecars', {id: selectedCar?._id, carForm}, {withCredentials: true});
        if(response.status == 200){
          toast.success(response.data.message);
          resetData();
        }
      }catch(error){
        toast.error('Faild to update car')
        console.log(error);
      }
    }
    setLoading(false);
  };

  const handleModelChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
      const filtered = models.filter(model => 
        model.modelName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        model.brand.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setSelectedModel(e.target.value);
      setFilteredModels(filtered);
    setShowModelDropdown(true);
  };
  const handleModelSelect = (selectedModel: Model) => {
    setSelectedModel(selectedModel.modelName);
    setCarForm({...carForm, model: selectedModel?._id ?? ''});
    setShowModelDropdown(false);
  };
  const handleModelFocus = () => {
    setShowModelDropdown(true);
  };

  const updateCarField = (path: string, value: any) => {
    const keys = path.split(".");
    setCarForm((prev) => {
      const newForm: any = { ...prev };
      let cur: any = newForm;

      for (let i = 0; i < keys.length - 1; i++) {
        cur[keys[i]] = { ...cur[keys[i]] };
        cur = cur[keys[i]];
      }

      cur[keys[keys.length - 1]] = value;
      return newForm;
    });
  };

  const toggleSection = (section: SectionId) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (
     <div className="max-w-6xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6">Add New Car</h1>

      <div className="space-y-4">

        {/* BASIC DETAILS */}
        <Section title="Basic Details" id="basic" 
        expandedSections={expandedSections}
        toggleSection={toggleSection}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              value={carForm.name}
              onChange={(e) => updateCarField("name", e.target.value)}
              placeholder="Model Name"
              className="border rounded-lg px-3 py-2"
            />
            <div className="relative flex-1 min-w-0">
              <input
                type="text"
                placeholder="Select Car Model"
                value={selectedModel}
                onChange={handleModelChange}
                onFocus={handleModelFocus}
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
              />
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              
              
              {showModelDropdown && (
                <div ref={modelRef} className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {filteredModels.length > 0 ? (
                    filteredModels.filter((model, index, arr) => arr.indexOf(model) === index).map((model, index) => (
                      <button
                        key={index}
                        onClick={() => handleModelSelect(model)}
                        className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center">
                          <span className="text-gray-800">{model.modelName}</span>
                        </div>
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No models found
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              value={carForm.price}
              onChange={(e) => updateCarField("price", e.target.value)}
              placeholder="Price (₹)"
              type="text"
              className="border rounded-lg px-3 py-2"
            />
            <input
              value={carForm.originalPrice}
              onChange={(e) => updateCarField("originalPrice", e.target.value)}
              placeholder="Original Price (₹)"
              type="text"
              className="border rounded-lg px-3 py-2"
            />
          </div>

            <p>Price Breakdown</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
            <input
              type="text"
              value={carForm?.priceBreakup?.exShowroom}
              onChange={(e) => updateCarField("priceBreakup.exShowroom", e.target.value)}
              placeholder="Ex-Showroom (₹)"
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              value={carForm?.priceBreakup?.registration}
              onChange={(e) => updateCarField("priceBreakup.registration", e.target.value)}
              placeholder="Registration (₹)"
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="text"
              value={carForm?.priceBreakup?.insurance}
              onChange={(e) => updateCarField("priceBreakup.insurance", e.target.value)}
              placeholder="Insurance (₹)"
              className="border rounded-lg px-3 py-2"
            />
            <input
              type="number"
              value={carForm?.priceBreakup?.other}
              onChange={(e) => updateCarField("priceBreakup.other", e.target.value)}
              placeholder="Other (₹)"
              className="border rounded-lg px-3 py-2"
            />
          </div>

          <textarea
            value={carForm.description}
            onChange={(e) => updateCarField("description", e.target.value)}
            placeholder="Description"
            className="border rounded-lg px-3 py-2 w-full min-h-24"
          />

          <div className="grid md:grid-cols-3 gap-4 items-center mt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={carForm.isLatest}
                onChange={(e) => setCarForm({...carForm, isLatest:e.target.checked})}
              />
              Mark as Latest
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={carForm.isFeatured}
                onChange={(e) => updateCarField("isFeatured", e.target.checked)}
              />
              Featured
            </label>
              <div>
              <input
                type="date"
                value={carForm.launchDate instanceof Date ? carForm.launchDate.toISOString().slice(0,10) : ''}
                onChange={(e) => setCarForm({...carForm, launchDate: new Date(e.target.value)})}
                placeholder="Launch Date"
                className="border rounded-lg px-3 py-2 w-full"
              />
            </div>
          </div>
        </Section>

        {/* ENGINE & TRANSMISSION */}
        <Section title="Engine & Transmission" id="engine"
        expandedSections={expandedSections}
        toggleSection={toggleSection}>
          <div className="grid lg:grid-cols-4 gap-3">
            {(["engineType", "displacement", "maxPower", "maxTorque", "NumOfCylinders", "valvesPerCylinder", "fuelSupplySystem", "transmissionType", "gearbox", "driveType",] as const).map((key) => (
              <input
                key={key}
                value={carForm.engineAndTransmission[key]}
                onChange={(e) => updateCarField(`engineAndTransmission.${key}`, e.target.value)}
                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                className="border rounded-lg px-3 py-2"
              />
            ))}
            <label className="flex items-center gap-2 col-span-2">
              <input
                type="checkbox"
                checked={carForm.engineAndTransmission.turboCharger}
                onChange={(e) => updateCarField("engineAndTransmission.turboCharger", e.target.checked)}
              />
              Turbo Charger
            </label>
          </div>
        </Section>

        {/* FUEL & PERFORMANCE */}
        <Section title="Fuel & Performance" id="fuel"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
          <div className="grid lg:grid-cols-4 gap-3">
            {(["fuelType", "petrolMileageARAI", "petrolFuelTankCapacity", "emissionNormCompliance"] as const).map((key) => (
              <input
                key={key}
                value={carForm?.fuelAndPerformance[key]}
                onChange={(e) => updateCarField(`fuelAndPerformance.${key}`, e.target.value)}
                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                className="border rounded-lg px-3 py-2"
              />
            ))}
          </div>
        </Section>

        {/* SUSPENSION, STEERING & BRAKES */}
        <Section title="Suspension, Steering & Brakes" id="suspension"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
          <div className="grid lg:grid-cols-3 gap-3">
            {(["frontSuspension", "rearSuspension", "steeringType", "steeringColumn", "turningRadius", "frontBrakeType", "rearBrakeType", "bootSpaceRearSeatFolding"] as const).map((key) => (
              <input
                key={key}
                value={carForm?.suspensionAndSteeringAndBrakes[key]}
                onChange={(e) => updateCarField(`suspensionAndSteeringAndBrakes.${key}`, e.target.value)}
                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                className="border rounded-lg px-3 py-2"
              />
            ))}
          </div>
        </Section>

        {/* DIMENSIONS & CAPACITY */}
        <Section title="Dimensions & Capacity" id="dimensions"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
          <div className="grid lg:grid-cols-4 gap-3">
            {(["length", "Width", "height", "bootSpace", "seatingCapacity", "wheelBase","groundClearanceUnladen"] as const).map((key) => (
              <input
                key={key}
                value={carForm?.dimensionsAndCapacity[key]}
                onChange={(e) => updateCarField(`dimensionsAndCapacity.${key}`, e.target.value)}
                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                className="border rounded-lg px-3 py-2"
              />
            ))}
            <div className='flex flex-col'>
            <label className='text-xs text-gray-500'>No. of Doors</label>
            <input
              type="number"
              value={carForm?.dimensionsAndCapacity?.numOfDoors}
              onChange={(e) => updateCarField("dimensionsAndCapacity.numOfDoors", Number(e.target.value))}
              placeholder="Number of Doors"
              className="border rounded-lg px-3 py-2"
              />
            </div>
          </div>
        </Section>

        {/* COMFORT & CONVENIENCE */}
        <Section title="Comfort & Convenience" id="comfort"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
          <div className="grid lg:grid-cols-3 gap-3 mb-4">
            {(["adjustableSteering", "rearSeatHeadrest", "parkingSensors", "foldableRearSeat", "usbCharger", "powerWindows", "cupholders"] as const).map((key) => (
              <input
                key={key}
                value={carForm?.comfortAndConvenience[key]}
                onChange={(e) => updateCarField(`comfortAndConvenience.${key}`, e.target.value)}
                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                className="border rounded-lg px-3 py-2"
              />
            ))}
          </div>
          <div className="grid lg:grid-cols-4 gap-3">
            {(["powerSteering", "airConditioner", "heater", "heightAdjustableDriverSeat", "ventilatedSeats", "electricAdjustableSeats", "automaticClimateControl", "airQualityControl", "accessoryPowerOutlet", "trunkLight", "rearReadingLamp", "vanityMirror", "adjustableHeadrest", "heightAdjustableFrontSeatBelts", "rearSeatCentreArmRest", "rearACVents", "cruiseControl", "smartAccessCardEntry", "keyLessEntry", "engineStartStopButton", "cooledGlovebox", "voiceCommands", "paddleShifters", "centralConsoleArmrest", "tailgateAjarWarning", "handsFreeTailgate", "driveModes", "idleStartStopSystem", "rearWindowSunblind", "automaticHeadlamps", "followMeHomeHeadlamps", "voiceassistedsunroof", "driveModeTypes"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={carForm?.comfortAndConvenience[key]}
                  onChange={(e) => updateCarField(`comfortAndConvenience.${key}`, e.target.checked)}
                />
                <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* INTERIOR */}
        <Section title="Interior" id="interior"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
          <div className="grid lg:grid-cols-3 gap-3 mb-4">
            <input
              value={carForm.interior.digitalClusterSize}
              onChange={(e) => updateCarField("interior.digitalClusterSize", e.target.value)}
              placeholder="Digital Cluster Size"
              className="border rounded-lg px-3 py-2"
            />
            <input
              value={carForm.interior.upholstery}
              onChange={(e) => updateCarField("interior.upholstery", e.target.value)}
              placeholder="Upholstery"
              className="border rounded-lg px-3 py-2"
            />
          </div>
          <div className="grid lg:grid-cols-3 gap-3">
            {(["tachometer", "gloveBox", "leatherWrappedSteeringWheel", "leatherwrapgearshiftselector", "digitalCluster"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={carForm.interior[key]}
                  onChange={(e) => updateCarField(`interior.${key}`, e.target.checked)}
                />
                <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* EXTERIOR */}
        <Section title="Exterior" id="exterior"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
          <div className="grid lg:grid-cols-4 gap-3 mb-4">
            {(["antenna", "bootOpening", "outsideRearViewMirror", "tyreSize", "tyreType", "wheelSize", "additionalFeatures"] as const).map((key) => (
              <input
                key={key}
                value={carForm.exterior[key]}
                onChange={(e) => updateCarField(`exterior.${key}`, e.target.value)}
                placeholder={key.replace(/([A-Z])/g, ' $1').trim()}
                className="border rounded-lg px-3 py-2"
              />
            ))}
          </div>
          <div className="grid lg:grid-cols-4 gap-3">
            {(["rainSensingWiper","rearWindowWiper", "rearWindowWasher", "rearWindowDefogger", "wheelCovers", "alloyWheels", "integratedAntenna", "powerAntenna", "rearSpoiler", "corneringFoglamps", "fogLights", "outsideRearViewMirrorTurnIndicators", "chromeGrille", "projectorHeadlamps", "roofRails", "automaticHeadlamps", "sunroof","puddleLamps", "ledDRLs", "ledHeadlamps", "ledTaillights", "ledFogLamps"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={carForm.exterior[key]}
                  onChange={(e) => updateCarField(`exterior.${key}`, e.target.checked)}
                />
                <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* SAFETY */}
        <Section title="Safety" id="safety"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
        <p className='text-sm text-gray-500'>No. of airbags</p>
          <div className="grid lg:grid-cols-4 gap-3 mb-4">
            <input
              type="number"
              value={carForm.safety.numOfAirbags}
              onChange={(e) => updateCarField("safety.numOfAirbags", Number(e.target.value))}
              placeholder="Number of Airbags"
              className="border rounded-lg px-3 py-2"
            />
            <input
              value={carForm.safety.pretensionersandForceLimiterSeatbelts}
              onChange={(e) => updateCarField("safety.pretensionersandForceLimiterSeatbelts", e.target.value)}
              placeholder="Pretensioners & Force Limiter"
              className="border rounded-lg px-3 py-2 col-span-3"
            />
          </div>
          <div className="grid lg:grid-cols-4 gap-3">
            {(["antilockBrakingSystem", "brakeAssist", "centralLocking", "childSafetyLocks", "antiTheftAlarm", "driverAirbag", "passengerAirbag", "sideAirbag", "sideAirbagRear", "dayandNightRearViewMirror", "curtainAirbag", "electronicBrakeforceDistribution", "seatBeltWarning", "doorAjarWarning", "tractionControl", "tyrePressureMonitoringSystem", "engineImmobilizer", "electronicStabilityControl", "rearCamera", "speedAlert", "speedSensingAutoDoorLock", "iSOFIXChildSeatMounts", "headsUpDisplay", "blindSpotCamera", "hillDescentControl", "hillAssist", "impactSensingAutoDoorUnlock", "_360ViewCamera"] as const).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={carForm.safety[key]}
                  onChange={(e) => updateCarField(`safety.${key}`, e.target.checked)}
                />
                <span className="text-sm">{key.replace(/([A-Z_])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* ENTERTAINMENT & COMMUNICATION */}
        <Section title="Entertainment & Communication" id="entertainment"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
          <div className="grid lg:grid-cols-3 gap-3 mb-4">
            <input
              value={carForm.entertainmentAndCommunication.touchscreenSize}
              onChange={(e) => updateCarField("entertainmentAndCommunication.touchscreenSize", e.target.value)}
              placeholder="Touchscreen Size"
              className="border rounded-lg px-3 py-2"
            />
            
            <input
              value={carForm.entertainmentAndCommunication.speakers}
              onChange={(e) => updateCarField("entertainmentAndCommunication.speakers", e.target.value)}
              placeholder="Speakers Details"
              className="border rounded-lg px-3 py-2"
            />
            <input
              value={carForm.entertainmentAndCommunication.tweeters}
              onChange={(e) => updateCarField("entertainmentAndCommunication.tweeters", e.target.value)}
              placeholder="Tweeters Details"
              className="border rounded-lg px-3 py-2"
            />
            <div className='flex flex-col'>
            <label className='text-sm text-gray-500'>No. of speakers</label>
            <input
              type="number"
              value={carForm.entertainmentAndCommunication.numOfSpeakers}
              onChange={(e) => updateCarField("entertainmentAndCommunication.numOfSpeakers", Number(e.target.value))}
              placeholder="Number of Speakers"
              className="border rounded-lg px-3 py-2"
            />
            </div>
          </div>
          <textarea
            value={carForm.entertainmentAndCommunication.additionalFeatures}
            onChange={(e) => updateCarField("entertainmentAndCommunication.additionalFeatures", e.target.value)}
            placeholder="Additional Features"
            className="border rounded-lg px-3 py-2 w-full min-h-20 mb-4"
          />
          <div className="grid lg:grid-cols-4 gap-3">
            {(["radio", "wirelessPhoneCharging", "bluetoothConnectivity", "touchscreen", "androidAuto", "appleCarPlay", "usbPorts"]as const).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={carForm.entertainmentAndCommunication[key]}
                  onChange={(e) => updateCarField(`entertainmentAndCommunication.${key}`, e.target.checked)}
                />
                <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* ADAS FEATURES */}
        <Section title="ADAS Features" id="adas"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
          <div className="grid lg:grid-cols-4 gap-3">
            {(["blindSpotMonitor", "forwardCollisionWarning", "automaticEmergencyBraking", "speedAssistSystem", "trafficSignRecognition", "blindSpotCollisionAvoidanceAssist", "laneDepartureWarning", "laneKeepAssist","laneDeparturePreventionAssist","driverAttentionWarning","adaptiveCruiseControl","adaptiveHighBeamAssist","rearCrossTrafficAlert","rearCrossTrafficCollisionAvoidanceAssist"]as const).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={carForm.ADASFeature[key]}
                  onChange={(e) => updateCarField(`ADASFeature.${key}`, e.target.checked)}
                />
                <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* ADVANCED INTERNET FEATURES */}
        <Section title="Advanced Internet Features" id="internet"
        expandedSections={expandedSections}
        toggleSection={toggleSection}
        >
          <div className="grid lg:grid-cols-3 gap-3">
            {(["overAirUpdates", "remoteVehicleIgnitionStartStop", "inbuiltApps", "navigationwithLiveTraffic", "ecallAndIcall", "googleAlexaConnectivity", "SOSButton"]as const).map((key) => (
              <label key={key} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={carForm.advanceInternetFeature[key]}
                  onChange={(e) => updateCarField(`advanceInternetFeature.${key}`, e.target.checked)}
                />
                <span className="text-sm">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
              </label>
            ))}
          </div>
        </Section>

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end gap-2 pt-4">
          <button onClick={resetData} className='bg-gray-300 p-2 rounded-lg'>Reset Form</button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-lg bg-gray-900 text-white hover:bg-gray-800 font-semibold"
          >
          {loading ? 'Saving....' : 'Save Car Detail'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddCar

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

  type SectionProps = {
    title: string;
    id: SectionId;
    expandedSections: any;
    toggleSection: any;
    children?: React.ReactNode;
  };


//     const toggleSection = (section: SectionId) => {
//     setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
//   };

const Section: React.FC<SectionProps> = ({ title, id, children, expandedSections, toggleSection }) => (
  <div className="border rounded-xl overflow-hidden">
    <button
      type="button"
      onClick={() => toggleSection(id)}
      className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 flex justify-between items-center"
    >
      <h3 className="font-semibold text-left">{title}</h3>
      {expandedSections[id] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
    </button>
    {expandedSections[id] && <div className="p-4">{children}</div>}
  </div>
);
