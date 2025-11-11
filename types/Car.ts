export interface Car {
  _id?: string;
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
  launchDate: string;
}