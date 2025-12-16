export interface Model {
  _id?: string;
  brand: string;
  modelName: string;
  bodyType: 'suv' | 'hatchback' | 'sedan' | 'coupe' | 'convertible' | 'wagon' | 'muv' | 'luxury';
  category: 'Popular Cars' | 'Electric Cars' | 'Upcoming Cars' | 'Latest Cars' | 'Other'; 
  images: string[];
  variant: Car[];
  description: string;
  colors: string[];
  pros: string[];
  cons: string[];
}

export interface Car {
  _id?: string;
  model: string;
   name: string;
   price: string;
   originalPrice?: string;
   engineAndTransmission: {
     engineType: string;
     displacement: string;
     maxPower: string;
     maxTorque: string;
     NumOfCylinders: string;
     valvesPerCylinder: string;
     fuelSupplySystem: string;
     transmissionType: string;
     gearbox: string;
     driveType: string;
     turboCharger: boolean;
   };
   fuelAndPerformance: {
     fuelType: string;
     petrolMileageARAI: string;
     petrolFuelTankCapacity: string;
     emissionNormCompliance: string;
   };
   suspensionAndSteeringAndBrakes: {
     frontSuspension: string;
     rearSuspension: string;
     steeringType: string;
     steeringColumn: string;
     frontBrakeType: string;
     rearBrakeType: string;
   };
   dimensionsAndCapacity: {
     length: string;
     Width: string;
     height: string;
     bootSpace: string;
     seatingCapacity: string;
     wheelBase: string;
     numOfDoors: number;
   };
   comfortAndConvenience: {
     powerSteering: boolean;
     airConditioner: boolean;
     heater: boolean;
     adjustableSteering: string;
     heightAdjustableDriverSeat: boolean;
     ventilatedSeats: boolean;
     electricAdjustableSeats: boolean;
     automaticClimateControl: boolean;
     accessoryPowerOutlet: boolean;
     trunkLight: boolean;
     vanityMirror: boolean;
     rearSeatHeadrest: string;
     adjustableHeadrest: boolean;
     rearSeatCentreArmRest: boolean;
     rearACVents: boolean;
     cruiseControl: boolean;
     parkingSensors: string;
     foldableRearSeat: string;
     smartAccessCardEntry : boolean;
     keyLessEntry: boolean;
     engineStartStopButton: boolean;
     cooledGlovebox: boolean;
     voiceCommands: boolean;
     paddleShifters: boolean
     usbCharger: string;
     centralConsoleArmrest: boolean;
     driveModes: boolean;
     idleStartStopSystem: boolean;
     rearWindowSunblind: boolean;
     automaticHeadlamps: boolean;
     followMeHomeHeadlamps: boolean;
     voiceassistedsunroof: boolean;
     driveModeTypes: boolean;
     powerWindows: string;
     cupholders: string;
   };
   interior: {
     tachometer: boolean;
     gloveBox: boolean;
     digitalCluster: boolean;
     digitalClusterSize: string;
     upholstery: string;
   };
   exterior: {
     rearWindowWiper: boolean;
     rearWindowWasher: boolean;
     rearWindowDefogger: boolean;
     wheelCovers: boolean;
     alloyWheels: boolean;
     powerAntenna: boolean;
     rearSpoiler: boolean;
     outsideRearViewMirrorTurnIndicators: boolean;
     chromeGrille: boolean;
     projectorHeadlamps: boolean;
     roofRails: boolean;
     automaticHeadlamps: boolean;
     antenna: string;
     sunroof: boolean;
     puddleLamps: boolean;
     outsideRearViewMirror: string;
     tyreSize: string;
     tyreType: string;
     wheelSize: string;
     ledDRLs: boolean;
     ledTaillights: boolean;
   };
   safety: {
     antilockBrakingSystem: boolean;
     centralLocking: boolean
     childSafetyLocks: boolean;
     antiTheftAlarm: boolean;
     numOfAirbags: number;
     driverAirbag: boolean;
     passengerAirbag: boolean;
     sideAirbag: boolean;
     sideAirbagRear: boolean;
     dayandNightRearViewMirror: boolean;
     curtainAirbag: boolean;
     electronicBrakeforceDistribution: boolean;
     seatBeltWarning: boolean;
     doorAjarWarning: boolean;
     tractionControl: boolean;
     tyrePressureMonitoringSystem: boolean;
     engineImmobilizer: boolean;
     electronicStabilityControl: boolean;
     rearCamera: boolean;
     speedAlert: boolean;
     speedSensingAutoDoorLock: boolean;
     iSOFIXChildSeatMounts: boolean;
     pretensionersandForceLimiterSeatbelts: string;
     blindSpotCamera: boolean;
     hillAssist: boolean;
     impactSensingAutoDoorUnlock: boolean;
     _360ViewCamera: boolean;
   };
   entertainmentAndCommunication: {
     radio: boolean;
     wirelessPhoneCharging: boolean;
     bluetoothConnectivity: boolean;
     touchscreen: boolean;
     touchscreenSize: string;
     androidAuto: boolean;
     appleCarPlay: boolean;
     numOfSpeakers: number;
     usbPorts: boolean;
     additionalFeatures: string;
     speakers: string;
   };
   ADASFeature: {
     blindSpotMonitor: boolean;
   };
   advanceInternetFeature: {
     overAirUpdates: boolean;
     remoteVehicleIgnitionStartStop: boolean;
     inbuiltApps: boolean;
   };
   description: string;
   priceBreakup?: {
     exShowroom: '';
     registration: '';
     insurance: '';
     other: '';
   };
   isLatest: boolean;
   isFeatured?: boolean;
   reviews: [{rating: number, username: string, title: string, experience: string, postedAt: Date}]
   launchDate: Date;
}

export interface CompareCar {
  _id?: string;
  car1: string;
  car2: string;
}