import { number } from "framer-motion";
import mongoose from "mongoose";

export interface ICar extends mongoose.Document {
  name: string;
  brand: string;
  category: 'SUV' | 'Hatchback' | 'Sedan' | 'Coupe' | 'Convertible' | 'Wagon';
  price: number;
  originalPrice?: number;
  mileage: number;
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  transmission: 'Manual' | 'Automatic';
  seatingCapacity: number;
  engineCapacity: string;
  images: string[];
  videos?: string[];
  description: string;
  keyFeatures: string[];
  // Optional detailed price breakup used by admin to specify on-road calculation
  priceBreakup?: {
    exShowroom: number;
    registration: number;
    insurance: number;
    other: number;
  };
  specifications: {
    length: string;
    width: string;
    height: string;
    wheelbase: string;
    groundClearance: string;
    bootSpace: string;
  };
  colors: string[];
  variants?: Array<{
    name: string;
    fuel: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid' | 'CNG';
    transmission: 'Manual' | 'Automatic' | 'Automatic (AMT)';
    price: number;
    specs?: string;
  }>;
  isLatest: boolean;
  isFeatured?: boolean;
  isSold?: boolean;
  year: number;
  imageCount: number;
  seller: {
    name: string;
    avatar: string;
  };
  launchDate: Date;
}


const carSchema = new mongoose.Schema<ICar>({
  name: { type: String, required: true, trim: true},
  brand: {type: String, required: true, trim: true},
  category: {type: String, required: true, enum: ['SUV','Hatchback','Sedan','Coupe','Convertible','Wagon']},
  price: {type: Number, required: true},
  originalPrice: {type: String},
  mileage: {type: Number, required: true},
  fuelType: {type: String, required: true, enum: ['Petrol','Diesel','Electric','Hybrid']},
  transmission: {type: String, required: true, enum: ['Manual','Automatic']},
  seatingCapacity: {type: Number, required: true, },
  engineCapacity: {type: String},
  images: [{type: String}],
  videos: [{type: String}],
  description: {type: String},
  keyFeatures: [{type: String}],
  // Optional detailed price breakup used by admin to specify on-road calculation
  priceBreakup: {
    exShowroom: {type: Number},
    registration: {type: Number},
    insurance: {type: Number},
    other: {type: Number}
  },
  specifications: {
    length: {type: String},
    width: {type: String},
    height: {type: String},
    wheelbase: {type: String},
    groundClearance: {type: String},
    bootSpace: {type: String}
  },
  colors: [{type: String}],
  variants: [{
    name: {type: String, required: true},
    fuel: {type: String, required: true, enum: ['Petrol','Diesel','Electric','Hybrid','CNG']},
    transmission: {type: String, required: true, enum: ['Manual','Automatic','Automatic (AMT)']},
    price: {type: Number, required: true},
    specs: {type: String}
  }],
  isLatest: {type: Boolean},
  isFeatured: {type: Boolean},
  isSold: {type: Boolean},
  year: {type: Number},
  imageCount: {type: Number},
  seller: {
    name: {type: String, required: true},
    avatar: {type: String, required: true},
  },
  launchDate: {type: Date},
})

const Car = mongoose.models.Car || mongoose.model<ICar>("Car", carSchema);
export default Car;
