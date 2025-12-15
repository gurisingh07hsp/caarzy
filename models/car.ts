import mongoose from "mongoose";

export interface ICar extends Omit<mongoose.Document, 'model'> {
  model: mongoose.Types.ObjectId;
  name: string;
  price: number;
  originalPrice?: number;
  engineAndTransmission: {
    engineType: string;
    displacement: string;
    maxPower: string;
    maxTorque: string;
    NumOfCylinders: string;
    valvesPerCylinder: string;
    fuelSupplySystem: string;
    turboChanger: boolean;
    transmissionType: string;
    gearbox: string;
    driveType: string;
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
    exShowroom: number;
    registration: number;
    insurance: number;
    other: number;
  };
  isLatest: boolean;
  isFeatured?: boolean;
  year: number;
  seller: {
    name: string;
    avatar: string;
  };
  reviews: [{rating: number, username: string, title: string, experience: string, postedAt: Date}]
  launchDate: Date;
}


const carSchema = new mongoose.Schema<ICar>({
  model: {type: mongoose.Schema.Types.ObjectId, ref: 'Model', required: true, trim: true},
  name: { type: String, required: true, trim: true},
  price: {type: Number, required: true},
  originalPrice: {type: Number},
  description: {type: String},
  engineAndTransmission: {
    engineType: {type: String},
    displacement: {type: String},
    maxPower: {type: String},
    maxTorque: {type: String},
    NumOfCylinders: {type: String},
    valvesPerCylinder: {type: String},
    fuelSupplySystem: {type: String},
    turboChanger: {type: Boolean},
    transmissionType: {type: String},
    gearbox: {type: String},
    driveType: {type: String},
  },
  fuelAndPerformance: {
    fuelType: {type: String},
    petrolMileageARAI: {type: String},
    petrolFuelTankCapacity: {type: String},
    emissionNormCompliance: {type: String},
  },
  suspensionAndSteeringAndBrakes: {
    frontSuspension: {type: String},
    rearSuspension: {type: String},
    steeringType: {type: String},
    steeringColumn: {type: String},
    frontBrakeType: {type: String},
    rearBrakeType: {type: String},
  },
  dimensionsAndCapacity: {
    length: {type: String},
    Width: {type: String},
    height: {type: String},
    bootSpace: {type: String},
    seatingCapacity: {type: String},
    wheelBase: {type: String},
    numOfDoors: {type: Number},
  },
  comfortAndConvenience: {
    powerSteering: {type: Boolean},
    airConditioner: {type: Boolean},
    heater: {type: Boolean},
    adjustableSteering: {type: String},
    heightAdjustableDriverSeat: {type: Boolean},
    ventilatedSeats: {type: Boolean},
    electricAdjustableSeats: {type: Boolean},
    automaticClimateControl: {type: Boolean},
    accessoryPowerOutlet: {type: Boolean},
    trunkLight: {type: Boolean},
    vanityMirror: {type: Boolean},
    rearSeatHeadrest: {type: String},
    adjustableHeadrest: {type: Boolean},
    rearSeatCentreArmRest: {type: Boolean},
    rearACVents: {type: Boolean},
    cruiseControl: {type: Boolean},
    parkingSensors: {type: String},
    foldableRearSeat: {type: String},
    smartAccessCardEntry : {type: Boolean},
    keyLessEntry: {type: Boolean},
    engineStartStopButton: {type: Boolean},
    cooledGlovebox: {type: Boolean},
    voiceCommands: {type: Boolean},
    paddleShifters: {type: Boolean},
    usbCharger: {type: String},
    centralConsoleArmrest: {type: Boolean},
    driveModes: {type: Boolean},
    idleStartStopSystem: {type: Boolean},
    rearWindowSunblind: {type: Boolean},
    automaticHeadlamps: {type: Boolean},
    followMeHomeHeadlamps: {type: Boolean},
    voiceassistedsunroof: {type: Boolean},
    driveModeTypes: {type: Boolean},
    powerWindows: {type: String},
    cupholders: {type: String},
  },
  interior: {
    tachometer: { type: Boolean },
    gloveBox: { type: Boolean },
    digitalCluster: { type: Boolean },
    digitalClusterSize: { type: String },
    upholstery: { type: String },
  },
  exterior: {
    rearWindowWiper: { type: Boolean },
    rearWindowWasher: { type: Boolean },
    rearWindowDefogger: { type: Boolean },
    wheelCovers: { type: Boolean },
    alloyWheels: { type: Boolean },
    powerAntenna: { type: Boolean },
    rearSpoiler: { type: Boolean },
    outsideRearViewMirrorTurnIndicators: { type: Boolean },
    chromeGrille: { type: Boolean },
    projectorHeadlamps: { type: Boolean },
    roofRails: { type: Boolean },
    automaticHeadlamps: { type: Boolean },
    antenna: { type: String },
    sunroof: { type: Boolean },
    puddleLamps: { type: Boolean },
    outsideRearViewMirror: { type: String },
    tyreSize: { type: String },
    tyreType: { type: String },
    wheelSize: { type: String },
    ledDRLs: { type: Boolean },
    ledTaillights: { type: Boolean },
  },
  safety: {
    antilockBrakingSystem: { type: Boolean },
    centralLocking: { type: Boolean },
    childSafetyLocks: { type: Boolean },
    antiTheftAlarm: { type: Boolean },
    numOfAirbags: { type: Number },
    driverAirbag: { type: Boolean },
    passengerAirbag: { type: Boolean },
    sideAirbag: { type: Boolean },
    sideAirbagRear: { type: Boolean },
    dayandNightRearViewMirror: { type: Boolean },
    curtainAirbag: { type: Boolean },
    electronicBrakeforceDistribution: { type: Boolean },
    seatBeltWarning: { type: Boolean },
    doorAjarWarning: { type: Boolean },
    tractionControl: { type: Boolean },
    tyrePressureMonitoringSystem: { type: Boolean },
    engineImmobilizer: { type: Boolean },
    electronicStabilityControl: { type: Boolean },
    rearCamera: { type: Boolean },
    speedAlert: { type: Boolean },
    speedSensingAutoDoorLock: { type: Boolean },
    iSOFIXChildSeatMounts: { type: Boolean },
    pretensionersandForceLimiterSeatbelts: { type: String },
    blindSpotCamera: { type: Boolean },
    hillAssist: { type: Boolean },
    impactSensingAutoDoorUnlock: { type: Boolean },
    _360ViewCamera: { type: Boolean },
  },
  entertainmentAndCommunication: {
    radio: { type: Boolean },
    wirelessPhoneCharging: { type: Boolean },
    bluetoothConnectivity: { type: Boolean },
    touchscreen: { type: Boolean },
    touchscreenSize: { type: String },
    androidAuto: { type: Boolean },
    appleCarPlay: { type: Boolean },
    numOfSpeakers: { type: Number },
    usbPorts: { type: Boolean },
    additionalFeatures: { type: String },
    speakers: { type: String },
  },
  ADASFeature: {
    blindSpotMonitor: { type: Boolean },
  },
  advanceInternetFeature: {
    overAirUpdates: { type: Boolean },
    remoteVehicleIgnitionStartStop: { type: Boolean },
    inbuiltApps: { type: Boolean },
  },
  priceBreakup: {
    exShowroom: {type: Number},
    registration: {type: Number},
    insurance: {type: Number},
    other: {type: Number}
  },
  isLatest: {type: Boolean},
  isFeatured: {type: Boolean},
  year: {type: Number},
  seller: {
    name: {type: String},
    avatar: {type: String},
  },
  reviews: [{rating: {type: Number}, username: {type: String}, title: {type: String}, experience: {type: String}, postedAt: {type: Date}}],
  launchDate: {type: Date},
})

const Car = mongoose.models.Car || mongoose.model<ICar>("Car", carSchema);
export default Car;
