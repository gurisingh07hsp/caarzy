export interface Model {
  _id?: string;
  brand: string;
  modelName: string;
  bodyType: 'suv' | 'hatchback' | 'sedan' | 'coupe' | 'convertible' | 'wagon' | 'muv' | 'luxury' | 'pickup truck';
  category: 'Popular Cars' | 'Electric Cars' | 'Upcoming Cars' | 'Latest Cars' | 'Other'; 
  images: string[];
  variant: Car[];
  description: string;
  colors: string[];
  pros: string[];
  cons: string[];
  isFeatured: boolean;
  isLatest: boolean;
  launchDate: Date;
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
    turningRadius: string;
    frontBrakeType: string;
    rearBrakeType: string;
    bootSpaceRearSeatFolding: string;
   };
   dimensionsAndCapacity: {
    length: string;
    Width: string;
    height: string;
    bootSpace: string;
    seatingCapacity: string;
    groundClearanceUnladen: string;
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
    airQualityControl: boolean;
    accessoryPowerOutlet: boolean;
    trunkLight: boolean;
    vanityMirror: boolean;
    rearReadingLamp: boolean;
    rearSeatHeadrest: string;
    adjustableHeadrest: boolean;
    rearSeatCentreArmRest: boolean;
    heightAdjustableFrontSeatBelts: boolean;
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
    tailgateAjarWarning: boolean;
    handsFreeTailgate: boolean;
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
    leatherWrappedSteeringWheel: boolean;
    leatherwrapgearshiftselector: boolean;
    gloveBox: boolean;
    digitalCluster: boolean;
    digitalClusterSize: string;
    upholstery: string;
   };
   exterior: {
    rainSensingWiper: boolean;
    rearWindowWiper: boolean;
    rearWindowWasher: boolean;
    rearWindowDefogger: boolean;
    wheelCovers: boolean;
    alloyWheels: boolean;
    powerAntenna: boolean;
    rearSpoiler: boolean;
    outsideRearViewMirrorTurnIndicators: boolean;
    integratedAntenna: boolean;
    chromeGrille: boolean;
    projectorHeadlamps: boolean;
    corneringFoglamps: boolean;
    roofRails: boolean;
    automaticHeadlamps: boolean;
    fogLights: boolean;
    antenna: string;
    sunroof: boolean;
    bootOpening: string;
    puddleLamps: boolean;
    outsideRearViewMirror: string;
    tyreSize: string;
    tyreType: string;
    wheelSize: string;
    ledDRLs: boolean;
    ledHeadlamps: boolean;
    ledTaillights: boolean;
    ledFogLamps: boolean;
    additionalFeatures: string;
   };
   safety: {
    antilockBrakingSystem: boolean;
    brakeAssist: boolean;
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
    headsUpDisplay: boolean;
    pretensionersandForceLimiterSeatbelts: string;
    hillDescentControl: boolean;
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
    tweeters: string;
    additionalFeatures: string;
    speakers: string;
   };
   ADASFeature: {
    blindSpotMonitor: boolean;
    forwardCollisionWarning: boolean;
    automaticEmergencyBraking: boolean;
    speedAssistSystem: boolean;
    trafficSignRecognition: boolean;
    blindSpotCollisionAvoidanceAssist: boolean;
    laneDepartureWarning: boolean;
    laneKeepAssist: boolean;
    laneDeparturePreventionAssist: boolean;
    driverAttentionWarning: boolean;
    adaptiveCruiseControl: boolean;
    adaptiveHighBeamAssist: boolean;
    rearCrossTrafficAlert: boolean;
    rearCrossTrafficCollisionAvoidanceAssist: boolean;
   };
   advanceInternetFeature: {
    overAirUpdates: boolean;
    remoteVehicleIgnitionStartStop: boolean;
    inbuiltApps: boolean;
    navigationwithLiveTraffic: boolean;
    ecallAndIcall: boolean;
    googleAlexaConnectivity: boolean;
    SOSButton: boolean;
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
   reviews?: [{rating: number, username: string, title: string, experience: string, postedAt: Date}]
   launchDate: Date;
}

export interface CompareCar {
  _id?: string;
  car1: string;
  car2: string;
}